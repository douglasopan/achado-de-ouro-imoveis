import SEO from "@/components/SEO";

const HowItWorks = () => {
  return (
    <main className="container mx-auto px-6 py-16">
      <SEO
        title="Como funciona"
        description="Passo a passo: pesquisa, curadoria, negociação e fechamento com transparência."
        canonicalPath="/como-funciona"
      />
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Como funciona</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Um processo claro e seguro para encontrar imóveis de valor.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <article className="p-6 rounded-lg border bg-card shadow-sm">
          <h2 className="font-semibold text-xl">1. Pesquisa</h2>
          <p className="mt-2 text-muted-foreground">Você nos conta o que procura. Nós mapeamos o mercado e os dados da região.</p>
        </article>
        <article className="p-6 rounded-lg border bg-card shadow-sm">
          <h2 className="font-semibold text-xl">2. Curadoria</h2>
          <p className="mt-2 text-muted-foreground">Selecionamos imóveis com preço abaixo da média e com alto potencial de valor.</p>
        </article>
        <article className="p-6 rounded-lg border bg-card shadow-sm">
          <h2 className="font-semibold text-xl">3. Negociação</h2>
          <p className="mt-2 text-muted-foreground">Negociamos de forma estratégica para você pagar menos pelo que vale mais.</p>
        </article>
        <article className="p-6 rounded-lg border bg-card shadow-sm">
          <h2 className="font-semibold text-xl">4. Fechamento</h2>
          <p className="mt-2 text-muted-foreground">Documentação revisada e apoio até a assinatura do contrato.</p>
        </article>
      </div>
    </main>
  );
};

export default HowItWorks;
