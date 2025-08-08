import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminDashboard = () => {
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Apartamento");
  const [price, setPrice] = useState("");
  const [badge, setBadge] = useState<string>("");
  const [discount, setDiscount] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [imageUrls, setImageUrls] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["properties", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("id, title, location, price, type, badge, discount_percent, published, main_image_url, image_urls")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const priceNumber = Number(price);
      if (Number.isNaN(priceNumber)) throw new Error("Preço inválido");
      const imgArray = imageUrls
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const { error } = await supabase.from("properties").insert([
        {
          title,
          location,
          type,
          price: priceNumber,
          badge: badge || null,
          discount_percent: discount ? Number(discount) : null,
          published: true,
          main_image_url: mainImageUrl || (imgArray[0] ?? null),
          image_urls: imgArray,
        },
      ]);
      if (error) throw error;
      toast.success("Imóvel criado");
      setTitle(""); setLocation(""); setPrice(""); setBadge(""); setDiscount(""); setMainImageUrl(""); setImageUrls("");
      await qc.invalidateQueries({ queryKey: ["properties", "all"] });
    } catch (err: any) {
      toast.error(err?.message || "Erro ao criar imóvel");
    }
  };

  const togglePublish = async (id: string, current: boolean) => {
    try {
      const { error } = await supabase.from("properties").update({ published: !current }).eq("id", id);
      if (error) throw error;
      await qc.invalidateQueries({ queryKey: ["properties", "all"] });
      toast.success(!current ? "Publicado" : "Despublicado");
    } catch (err: any) {
      toast.error(err?.message || "Erro ao atualizar");
    }
  };

  const remove = async (id: string) => {
    try {
      const { error } = await supabase.from("properties").delete().eq("id", id);
      if (error) throw error;
      await qc.invalidateQueries({ queryKey: ["properties", "all"] });
      toast.success("Imóvel removido");
    } catch (err: any) {
      toast.error(err?.message || "Erro ao remover");
    }
  };

  return (
    <main className="container mx-auto px-6 py-16">
      <SEO title="Dashboard" description="Gerencie seus imóveis" canonicalPath="/admin/dashboard" />
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Gerencie imóveis publicados no site.</p>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <form onSubmit={handleCreate} className="p-6 rounded-lg border bg-card shadow-sm grid gap-3">
          <h2 className="font-semibold text-lg">Novo imóvel</h2>
          <div className="grid gap-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Localização</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label>Tipo</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Apartamento">Apartamento</SelectItem>
                <SelectItem value="Casa">Casa</SelectItem>
                <SelectItem value="Cobertura">Cobertura</SelectItem>
                <SelectItem value="Studio">Studio</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Preço (R$)</Label>
            <Input id="price" inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="badge">Selo</Label>
            <Select value={badge} onValueChange={setBadge}>
              <SelectTrigger><SelectValue placeholder="Nenhum" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="">Nenhum</SelectItem>
                <SelectItem value="gold">Achado de Ouro</SelectItem>
                <SelectItem value="verified">Preço Verificado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="discount">Desconto (%)</Label>
            <Input id="discount" inputMode="numeric" value={discount} onChange={(e) => setDiscount(e.target.value.replace(/\D/g, ""))} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="main">Imagem principal (URL)</Label>
            <Input id="main" value={mainImageUrl} onChange={(e) => setMainImageUrl(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="images">Galeria (URLs separadas por vírgula)</Label>
            <Input id="images" value={imageUrls} onChange={(e) => setImageUrls(e.target.value)} />
          </div>
          <Button type="submit" variant="cta">Criar</Button>
        </form>

        <div className="p-6 rounded-lg border bg-card shadow-sm">
          <h2 className="font-semibold text-lg mb-4">Imóveis</h2>
          {isLoading && <div className="text-muted-foreground">Carregando...</div>}
          {error && <div className="text-destructive">Erro ao carregar.</div>}
          <div className="grid gap-3">
            {data?.map((row: any) => (
              <div key={row.id} className="border rounded-md p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{row.title}</div>
                  <div className="text-sm text-muted-foreground">{row.location} • {row.type} • R$ {Number(row.price).toLocaleString("pt-BR")}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant={row.published ? "secondary" : "outline"} onClick={() => togglePublish(row.id, row.published)}>
                    {row.published ? "Despublicar" : "Publicar"}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => remove(row.id)}>Excluir</Button>
                </div>
              </div>
            ))}
            {data?.length === 0 && <div className="text-muted-foreground">Nenhum imóvel cadastrado.</div>}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
