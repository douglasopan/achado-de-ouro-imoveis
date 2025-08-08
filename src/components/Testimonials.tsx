import { Badge } from "@/components/ui/badge";
import { mockTestimonials } from "@/data/mockTestimonials";

const Testimonials = () => {
  return (
    <section className="container mx-auto px-6 py-16 md:py-20 bg-secondary rounded-xl">
      <header className="mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold">Depoimentos</h2>
        <p className="mt-2 text-muted-foreground">Clientes que já encontraram seu achado de ouro.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {mockTestimonials.map((t, i) => (
          <article key={i} className="p-6 rounded-lg border bg-card shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="verified">Compra realizada</Badge>
            </div>
            <p className="text-sm leading-relaxed">“{t.text}”</p>
            <p className="mt-3 text-xs text-muted-foreground">{t.name} • {t.location}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
