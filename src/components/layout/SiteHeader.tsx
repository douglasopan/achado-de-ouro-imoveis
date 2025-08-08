import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg tracking-tight">
          <span className="mr-2">🏡</span>
          Achadourado
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/como-funciona" className={({isActive}) => isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}>Como funciona</NavLink>
          <NavLink to="/imoveis" className={({isActive}) => isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}>Imóveis</NavLink>
          <NavLink to="/blog" className={({isActive}) => isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}>Blog</NavLink>
          <NavLink to="/sobre" className={({isActive}) => isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}>Sobre nós</NavLink>
          <NavLink to="/contato" className={({isActive}) => isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}>Contato</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/imoveis" className="hidden md:inline-block">
            <Button variant="cta" size="sm">Encontrar imóveis</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
