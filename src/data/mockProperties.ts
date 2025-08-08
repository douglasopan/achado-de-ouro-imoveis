import p1 from "@/assets/property-1.jpg";
import p2 from "@/assets/property-2.jpg";
import p3 from "@/assets/property-3.jpg";
import p4 from "@/assets/property-4.jpg";

export type PropertyBadge = "gold" | "verified" | null;
export type PropertyType = "Apartamento" | "Casa" | "Cobertura" | "Studio";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  type: PropertyType;
  mainImage: string;
  images: string[];
  badge: PropertyBadge;
  discountPercent?: number;
  published?: boolean;
}

export const allProperties: Property[] = [
  {
    id: "1",
    title: "Apartamento amplo com varanda gourmet",
    location: "Moema, São Paulo - SP",
    price: 1350000,
    type: "Apartamento",
    mainImage: p1,
    images: [p1, p3, p4],
    badge: "gold",
    discountPercent: 12,
    published: true,
  },
  {
    id: "2",
    title: "Casa moderna com quintal e home office",
    location: "Vila Mariana, São Paulo - SP",
    price: 1680000,
    type: "Casa",
    mainImage: p2,
    images: [p2, p3, p1],
    badge: "verified",
    discountPercent: 7,
    published: true,
  },
  {
    id: "3",
    title: "Studio mobiliado perto do metrô",
    location: "Pinheiros, São Paulo - SP",
    price: 540000,
    type: "Studio",
    mainImage: p3,
    images: [p3, p1, p4],
    badge: null,
    discountPercent: 5,
    published: true,
  },
  {
    id: "4",
    title: "Cobertura com terraço e vista panorâmica",
    location: "Brooklin, São Paulo - SP",
    price: 2750000,
    type: "Cobertura",
    mainImage: p4,
    images: [p4, p1, p2],
    badge: "gold",
    discountPercent: 15,
    published: true,
  },
];

export const featuredProperties = allProperties.slice(0, 3);
