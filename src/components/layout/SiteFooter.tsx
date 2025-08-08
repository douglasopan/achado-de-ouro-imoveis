const currentYear = new Date().getFullYear();

const SiteFooter = () => {
  return (
    <footer className="mt-20 border-t bg-background">
      <div className="container mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-semibold text-lg">Achadourado</h3>
          <p className="mt-2 text-sm text-muted-foreground">Imóveis de valor, com curadoria e transparência para você comprar melhor.</p>
        </div>
        <nav className="grid gap-2 text-sm">
          <a className="text-muted-foreground hover:text-foreground" href="/imoveis">Imóveis</a>
          <a className="text-muted-foreground hover:text-foreground" href="/como-funciona">Como funciona</a>
          <a className="text-muted-foreground hover:text-foreground" href="/blog">Blog</a>
          <a className="text-muted-foreground hover:text-foreground" href="/sobre">Sobre nós</a>
          <a className="text-muted-foreground hover:text-foreground" href="/contato">Contato</a>
        </nav>
        <div className="text-sm">
          <p><a className="hover:underline" href="mailto:contato@achadourado.com.br">contato@achadourado.com.br</a></p>
          <p className="mt-1"><a className="hover:underline" href="https://wa.me/550000000000" target="_blank" rel="noreferrer">WhatsApp</a></p>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">© {currentYear} Achadourado.com.br. Todos os direitos reservados.</div>
    </footer>
  );
};

export default SiteFooter;
