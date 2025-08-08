import SEO from "@/components/SEO";

const Blog = () => {
  const posts = [
    { id: 1, title: "Como avaliar o preço de um imóvel?", excerpt: "Entenda os principais fatores que impactam o preço." },
    { id: 2, title: "5 dicas para negociar melhor", excerpt: "Técnicas para conseguir descontos reais na compra." },
    { id: 3, title: "Documentação: o que conferir", excerpt: "Checklist essencial antes de fechar negócio." },
  ];

  return (
    <main className="container mx-auto px-6 py-16">
      <SEO
        title="Blog"
        description="Artigos sobre mercado imobiliário, investimentos e dicas de compra."
        canonicalPath="/blog"
      />
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="mt-2 text-muted-foreground">Conteúdos para você tomar a melhor decisão.</p>
      </header>
      <section className="grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <article key={p.id} className="p-6 rounded-lg border bg-card shadow-sm">
            <h2 className="font-semibold text-xl">{p.title}</h2>
            <p className="mt-2 text-muted-foreground text-sm">{p.excerpt}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Blog;
