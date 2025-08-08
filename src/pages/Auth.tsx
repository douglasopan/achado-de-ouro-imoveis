import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const cleanupAuthState = () => {
  try {
    localStorage.removeItem('supabase.auth.token');
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    if (typeof sessionStorage !== 'undefined') {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          sessionStorage.removeItem(key);
        }
      });
    }
  } catch (_) {}
};

const Auth = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect authenticated users to dashboard
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        window.location.href = '/admin/dashboard';
      }
    });
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      cleanupAuthState();
      try { await supabase.auth.signOut({ scope: 'global' }); } catch (_) {}

      if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.user) {
          window.location.href = '/admin/dashboard';
          return;
        }
      } else {
        const redirectUrl = `${window.location.origin}/admin/dashboard`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectUrl }
        });
        if (error) throw error;
        toast.success('Cadastro realizado! Verifique seu e-mail para confirmar o login.');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Erro de autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-6 py-16">
      <SEO title={mode === 'login' ? 'Entrar' : 'Criar conta'} description="Acesse a área administrativa" canonicalPath="/auth" />
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{mode === 'login' ? 'Entrar' : 'Criar conta'}</h1>
        <p className="mt-2 text-muted-foreground">Use e-mail e senha para acessar.</p>
      </header>

      <div className="max-w-md">
        <div className="mb-6 flex gap-2">
          <Button variant={mode === 'login' ? 'cta' : 'outline'} onClick={() => setMode('login')}>Entrar</Button>
          <Button variant={mode === 'signup' ? 'cta' : 'outline'} onClick={() => setMode('signup')}>Criar conta</Button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" variant="cta" disabled={loading}>{loading ? 'Aguarde...' : (mode === 'login' ? 'Entrar' : 'Criar conta')}</Button>
          {mode === 'signup' && (
            <p className="text-xs text-muted-foreground">Você receberá um e-mail de confirmação. Se estiver testando, considere desabilitar a confirmação no painel do Supabase.</p>
          )}
        </form>
      </div>
    </main>
  );
};

export default Auth;
