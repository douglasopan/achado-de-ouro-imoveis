import SEO from "@/components/SEO";
import { useMemo, useState } from "react";
import type { Property, PropertyType } from "@/data/mockProperties";
import PropertyCard from "@/components/PropertyCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Listings = () => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState<PropertyType | "">("");
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["properties", "published"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("id, title, location, price, type, badge, discount_percent, published, main_image_url, image_urls")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      // Map to our UI Property shape
      const mapped: Property[] = (data || []).map((row: any) => ({
        id: row.id,
        title: row.title,
        location: row.location,
        price: Number(row.price),
        type: row.type as PropertyType,
        mainImage: row.main_image_url || (row.image_urls?.[0] ?? ""),
        images: (row.image_urls ?? []) as string[],
        badge: (row.badge as "gold" | "verified" | null) ?? null,
        discountPercent: row.discount_percent ?? undefined,
        published: row.published ?? true,
      }));
      return mapped;
    },
  });

  const filtered = useMemo(() => {
    const list = data || [];
    return list.filter((p) => {
      const matchLocation = location ? p.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchType = type ? p.type === type : true;
      const min = priceMin ? parseInt(priceMin) : 0;
      const max = priceMax ? parseInt(priceMax) : Number.MAX_SAFE_INTEGER;
      const matchPrice = p.price >= min && p.price <= max;
      return matchLocation && matchType && matchPrice;
    });
  }, [data, location, type, priceMin, priceMax]);

  return (
    <main className="container mx-auto px-6 py-16">
      <SEO
        title="Imóveis à venda"
        description="Lista de imóveis selecionados com preços abaixo da média do mercado."
        canonicalPath="/imoveis"
      />
      <header className="mb-6">
        <h1 className="text-4xl font-bold">Imóveis</h1>
        <p className="mt-2 text-muted-foreground">Use os filtros para refinar sua busca.</p>
      </header>

      <section className="mb-8 grid gap-4 md:grid-cols-4">
        <div className="grid gap-2">
          <Label htmlFor="location">Localização</Label>
          <Input id="location" placeholder="Bairro, cidade..." value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label>Tipo</Label>
          <Select value={type} onValueChange={(v) => setType(v as PropertyType)}>
            <SelectTrigger>
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              <SelectItem value="Apartamento">Apartamento</SelectItem>
              <SelectItem value="Casa">Casa</SelectItem>
              <SelectItem value="Cobertura">Cobertura</SelectItem>
              <SelectItem value="Studio">Studio</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="priceMin">Preço mínimo (R$)</Label>
          <Input id="priceMin" inputMode="numeric" value={priceMin} onChange={(e) => setPriceMin(e.target.value.replace(/\D/g, ""))} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="priceMax">Preço máximo (R$)</Label>
          <Input id="priceMax" inputMode="numeric" value={priceMax} onChange={(e) => setPriceMax(e.target.value.replace(/\D/g, ""))} />
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && <div className="col-span-full text-muted-foreground">Carregando imóveis...</div>}
        {error && <div className="col-span-full text-destructive">Erro ao carregar imóveis.</div>}
        {!isLoading && !error && filtered.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
        {!isLoading && !error && filtered.length === 0 && (
          <div className="col-span-full text-muted-foreground">Nenhum imóvel encontrado com os filtros selecionados.</div>
        )}
      </section>
    </main>
  );
};

export default Listings;
