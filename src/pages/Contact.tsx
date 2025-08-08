import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Contact = () => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Mensagem enviada! Em breve entraremos em contato.");
  };

  return (
    <main className="container mx-auto px-6 py-16">
      <SEO
        title="Contato"
        description="Fale com nosso time e receba oportunidades sob medida."
        canonicalPath="/contato"
      />
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Contato</h1>
        <p className="mt-2 text-muted-foreground">Envie sua mensagem ou fale diretamente pelo WhatsApp.</p>
      </header>
      <section className="grid gap-8 md:grid-cols-2">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" inputMode="tel" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea id="message" rows={5} required />
          </div>
          <Button type="submit" variant="cta">Enviar</Button>
        </form>
        <aside className="space-y-2 text-sm">
          <a href="https://wa.me/550000000000" target="_blank" rel="noreferrer" className="underline">Falar no WhatsApp</a>
          <p>
            Ou envie um e-mail para <a href="mailto:contato@achadourado.com.br" className="underline">contato@achadourado.com.br</a>
          </p>
        </aside>
      </section>
    </main>
  );
};

export default Contact;
