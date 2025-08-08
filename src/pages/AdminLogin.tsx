import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminLogin = () => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.warning("Conecte o Supabase para ativar autenticação e área administrativa.");
  };

  return (
    <main className="container mx-auto px-6 py-16">
      <SEO title="Área Administrativa" description="Acesso restrito" canonicalPath="/admin" />
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Área Administrativa</h1>
        <p className="mt-2 text-muted-foreground">Faça login para gerenciar os imóveis e depoimentos.</p>
      </header>
      <form onSubmit={onSubmit} className="max-w-md space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" variant="cta">Entrar</Button>
        <p className="text-xs text-muted-foreground mt-2">Para habilitar o login real, conecte a integração Supabase no Lovable (botão verde no topo direito) e retornaremos para configurar autenticação e banco de dados.</p>
      </form>
    </main>
  );
};

export default AdminLogin;
