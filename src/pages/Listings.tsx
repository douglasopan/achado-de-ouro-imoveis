import SEO from "@/components/SEO";
import { useMemo, useState } from "react";
import type { Property, PropertyType } from "@/data/mockProperties";
import PropertyCard from "@/components/PropertyCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const Listings = () => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState<PropertyType | "">("");
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");

  const {
    data: properties = [],
    isLoading,
    error,
    refetch,
  } = useQuery<Property[]>({
    queryKey: ["properties", "published"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select(
            "id, title, location, price, type, badge, discount_percent, published, main_image_url, image_urls, created_at"
          )
          .eq("published", true)
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        if (!data) {
          return [];
        }

        return data.map((row) => ({
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
      } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
      }
    },
  });

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesLocation = location
        ? property.location.toLowerCase().includes(location.toLowerCase())
        : true;
      const matchesType = type ? property.type === type : true;
      const minPrice = priceMin ? parseInt(priceMin) : 0;
      const maxPrice = priceMax ? parseInt(priceMax) : Infinity;
      const matchesPrice =
        property.price >= minPrice && property.price <= maxPrice;

      return matchesLocation && matchesType && matchesPrice;
    });
  }, [properties, location, type, priceMin, priceMax]);

  const resetFilters = () => {
    setLocation("");
    setType("");
    setPriceMin("");
    setPriceMax("");
  };

  return (
    <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <SEO
        title="Imóveis à venda"
        description="Lista de imóveis selecionados com preços abaixo da média do mercado."
        canonicalPath="/imoveis"
      />

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Nossos Imóveis
        </h1>
        <p className="mt-2 text-muted-foreground">
          Encontre o imóvel perfeito para você
        </p>
      </header>

      <section className="mb-8 grid gap-4 md:grid-cols-4">
        <div className="grid gap-2">
          <Label htmlFor="location">Localização</Label>
          <Input
            id="location"
            placeholder="Bairro, cidade..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label>Tipo</Label>
          <Select
            value={type}
            onValueChange={(value) => setType(value as PropertyType)}
          >
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
          <Input
            id="priceMin"
            inputMode="numeric"
            placeholder="R$ 0"
            value={priceMin}
            onChange={(e) =>
              setPriceMin(e.target.value.replace(/[^0-9]/g, ""))
            }
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="priceMax">Preço máximo (R$)</Label>
          <Input
            id="priceMax"
            inputMode="numeric"
            placeholder="R$ Máximo"
            value={priceMax}
            onChange={(e) =>
              setPriceMax(e.target.value.replace(/[^0-9]/g, ""))
            }
          />
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-64 w-full rounded-lg" />
          ))
        ) : error ? (
          <div className="col-span-full flex flex-col items-center justify-center space-y-4 py-12 text-center">
            <span className="text-destructive">
              Ocorreu um erro ao carregar os imóveis
            </span>
            <button
              onClick={() => refetch()}
              className="text-primary underline underline-offset-4"
            >
              Tentar novamente
            </button>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center space-y-4 py-12 text-center">
            <span className="text-muted-foreground">
              Nenhum imóvel encontrado com os filtros atuais
            </span>
            <button
              onClick={resetFilters}
              className="text-primary underline underline-offset-4"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        )}
      </section>
    </main>
  );
};

export default Listings;
