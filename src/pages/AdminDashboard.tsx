import SEO from "@/components/SEO";

const AdminDashboard = () => {
  return (
    <main className="container mx-auto px-6 py-16">
      <SEO title="Dashboard" description="Gerencie seus imóveis" canonicalPath="/admin/dashboard" />
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-muted-foreground max-w-2xl">
        Esta é uma prévia da área administrativa. Para ficar totalmente funcional (cadastro/edição de imóveis, categorias, depoimentos),
        conecte sua conta Supabase no Lovable e voltaremos para implementar autenticação segura e CRUD com políticas RLS.
      </p>
    </main>
  );
};

export default AdminDashboard;
