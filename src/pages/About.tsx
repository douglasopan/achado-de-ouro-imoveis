import SEO from "@/components/SEO";

const About = () => {
  return (
    <main className="container mx-auto px-6 py-16">
      <SEO
        title="Sobre nós"
        description="Missão, valores e experiência da equipe Achadourado. Curadoria de imóveis e transparência para você comprar melhor."
        canonicalPath="/sobre"
      />
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Sobre nós</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Nossa missão é democratizar o acesso a oportunidades reais no mercado imobiliário, com curadoria de imóveis abaixo da média, transparência e documentação revisada.</p>
      </header>
      <section className="prose max-w-3xl">
        <p>
          No Achadourado, acreditamos que informação e curadoria são essenciais para uma compra segura e vantajosa. Nossa equipe combina
          análise de dados com experiência de mercado para selecionar imóveis com preços realmente competitivos.
        </p>
        <p>
          Valores que nos guiam: transparência, excelência e foco total nas necessidades do cliente. Estamos aqui para ajudar você a
          encontrar o seu próximo imóvel com confiança e sofisticação.
        </p>
      </section>
    </main>
  );
};

export default About;
