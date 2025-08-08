import { useParams, Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MapPlaceholder from "@/components/MapPlaceholder";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: property, isLoading, error } = useQuery({
    queryKey: ["property", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("id, title, location, price, type, badge, discount_percent, published, main_image_url, image_urls")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      if (!data || (!data.published)) return null; // respect public access
      return {
        id: data.id,
        title: data.title,
        location: data.location,
        price: Number(data.price),
        type: data.type,
        mainImage: data.main_image_url || (data.image_urls?.[0] ?? ""),
        images: (data.image_urls ?? []) as string[],
        badge: (data.badge as "gold" | "verified" | null) ?? null,
        discountPercent: data.discount_percent ?? undefined,
      } as const;
    },
  });

  if (isLoading) {
    return (
      <main className="container mx-auto px-6 py-16">
        <div className="animate-pulse h-8 w-48 bg-muted rounded" />
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className="container mx-auto px-6 py-16">
        <h1 className="text-2xl font-semibold">Imóvel não encontrado</h1>
        <p className="mt-2 text-muted-foreground">O imóvel que você procura não está disponível.</p>
        <Link to="/imoveis" className="mt-4 inline-block">
          <Button variant="cta">Voltar para listagem</Button>
        </Link>
      </main>
    );
  }

  const waMessage = encodeURIComponent(`Olá! Tenho interesse no imóvel: ${property.title} (ID ${property.id}).`);
  const waLink = `https://wa.me/550000000000?text=${waMessage}`;

  return (
    <main className="container mx-auto px-6 py-16">
      <SEO
        title={property.title}
        description={`Imóvel em ${property.location} por ${formatPrice(property.price)}. Oportunidade ${property.discountPercent ? `${property.discountPercent}% abaixo da média` : "verificada"}.`}
        canonicalPath={`/imovel/${property.id}`}
      />

      <header className="mb-6">
        <h1 className="text-4xl font-bold">{property.title}</h1>
        <p className="mt-2 text-muted-foreground">{property.location} • {property.type}</p>
        <div className="mt-3 flex items-center gap-2">
          {property.badge === "gold" && <Badge variant="gold">Achado de Ouro</Badge>}
          {property.badge === "verified" && <Badge variant="verified">Preço Verificado</Badge>}
        </div>
      </header>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="grid gap-3">
          {property.images.map((src, i) => (
            <img key={i} src={src} alt={`${property.title} imagem ${i+1}`} className="w-full rounded-lg border object-cover" loading={i === 0 ? "eager" : "lazy"} />
          ))}
        </div>
        <aside className="space-y-6">
          <div className="p-6 rounded-lg border bg-card shadow-sm">
            <div className="text-sm text-muted-foreground">Preço</div>
            <div className="text-3xl font-semibold">{formatPrice(property.price)}</div>
            {property.discountPercent && (
              <div className="mt-2 text-sm">≈ {property.discountPercent}% abaixo da média da região</div>
            )}
            <div className="mt-6 grid gap-3">
              <Button variant="cta">Agendar visita</Button>
              <a href={waLink} target="_blank" rel="noreferrer" className="block">
                <Button variant="hero" className="w-full">Falar no WhatsApp</Button>
              </a>
            </div>
          </div>
          <div className="p-6 rounded-lg border bg-card shadow-sm">
            <h2 className="font-semibold">Localização</h2>
            <p className="text-sm text-muted-foreground">{property.location}</p>
            <div className="mt-3">
              <MapPlaceholder />
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-10 prose max-w-3xl">
        <h2>Descrição do imóvel</h2>
        <p>
          Imóvel selecionado por nossa curadoria com excelente relação custo-benefício. Documentação revisada e pronta para
          fechamento, com características ideais para quem busca qualidade com preço competitivo.
        </p>
      </section>
    </main>
  );
};

export default PropertyDetail;
