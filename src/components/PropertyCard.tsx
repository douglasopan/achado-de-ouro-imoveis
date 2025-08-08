import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { Property } from "@/data/mockProperties";

const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const PropertyCard = ({ property }: { property: Property }) => {
  return (
    <article className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md">
      <Link to={`/imovel/${property.id}`} className="block relative aspect-[16/10] overflow-hidden">
        <img
          src={property.mainImage}
          alt={`Imagem do imóvel: ${property.title}`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {property.badge === "gold" && <Badge variant="gold">Achado de Ouro</Badge>}
          {property.badge === "verified" && <Badge variant="verified">Preço Verificado</Badge>}
        </div>
        <h3 className="font-semibold leading-tight">{property.title}</h3>
        <p className="text-sm text-muted-foreground">{property.location} • {property.type}</p>
        <div className="mt-3 flex items-center justify-between">
          <strong className="text-lg">{formatPrice(property.price)}</strong>
          <Link to={`/imovel/${property.id}`}>
            <Button variant="ghost" size="sm">Ver detalhes</Button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
