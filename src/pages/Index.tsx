import heroImg from "@/assets/hero-achadourado.jpg";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import Testimonials from "@/components/Testimonials";
import PropertyCard from "@/components/PropertyCard";
import { featuredProperties } from "@/data/mockProperties";

const Index = () => {
  return (
    <main className="min-h-screen">
      <SEO
        title="Imóveis de valor, preços que surpreendem"
        description="No Achadourado, você encontra oportunidades únicas: imóveis selecionados com preços abaixo da média e total transparência."
        canonicalPath="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Achadourado.com.br",
          url: typeof window !== 'undefined' ? window.location.origin : 'https://achadourado.com.br',
          sameAs: ["https://wa.me/551100000000"],
        }}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Sala moderna com luz dourada e vista para a cidade" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 to-background" />
          <div className="pointer-events-none absolute inset-0 [background-image:var(--gradient-hero)]" />
        </div>
        <div className="relative container mx-auto px-6 py-24 md:py-36">
          <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">Imóveis de valor, preços que surpreendem.</h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">No Achadourado, você encontra oportunidades únicas no mercado imobiliário: imóveis selecionados com preços abaixo da média e toda a transparência que você precisa para fechar o melhor negócio.</p>
          <div className="mt-10 flex gap-4 items-center">
            <Link to="/imoveis">
              <Button variant="hero" size="xl" aria-label="Encontrar meu próximo imóvel">Encontrar meu próximo imóvel</Button>
            </Link>
            <Link to="/como-funciona" className="text-primary underline-offset-4 hover:underline">Como funciona</Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 md:py-20">
        <header className="mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold">Como funciona</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl">Curadoria rigorosa, transparência e documentação revisada para você comprar com segurança.</p>
        </header>
        <div className="grid md:grid-cols-3 gap-6">
          <article className="p-6 rounded-lg border bg-card shadow-sm">
            <h3 className="font-semibold text-xl">Curadoria abaixo da média</h3>
            <p className="mt-2 text-muted-foreground">Selecionamos imóveis com preços comprovadamente abaixo da média da região.</p>
          </article>
          <article className="p-6 rounded-lg border bg-card shadow-sm">
            <h3 className="font-semibold text-xl">Transparência total</h3>
            <p className="mt-2 text-muted-foreground">Dados claros de comparação de preço e histórico de anúncio.</p>
          </article>
          <article className="p-6 rounded-lg border bg-card shadow-sm">
            <h3 className="font-semibold text-xl">Documentação revisada</h3>
            <p className="mt-2 text-muted-foreground">Equipe especializada revisa documentação para uma compra segura.</p>
          </article>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 md:py-20">
        <header className="mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold">Oportunidades em Destaque</h2>
          <p className="mt-2 text-muted-foreground">Atualizadas dinamicamente pela área administrativa.</p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/imoveis">
            <Button variant="cta" size="lg">Ver todos os imóveis</Button>
          </Link>
        </div>
      </section>

      <Testimonials />

      <section className="container mx-auto px-6 py-16 md:py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">Pronto para encontrar seu próximo imóvel?</h2>
        <p className="mt-2 text-muted-foreground">Fale com nosso time e receba oportunidades sob medida.</p>
        <div className="mt-8">
          <Link to="/contato">
            <Button variant="hero" size="lg">Falar com um especialista</Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Index;
