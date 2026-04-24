"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Activity, Mail, Lock, LogIn, AlertCircle } from "lucide-react";

// Crear cliente solo una vez
const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  console.log("Supabase URL:", supabaseUrl);
  console.log("Supabase Key:", supabaseAnonKey ? "_configured" : "missing");
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Faltan variables de entorno");
  }
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
    global: {
      headers: {
        "apikey": supabaseAnonKey,
      },
    },
  });
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState("");

  // Verificar conexión a Supabase al montar
  useEffect(() => {
    console.log("=== LOGIN PAGE MOUNTED ===");
    console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "presente" : "ausente");
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setDebugInfo("");

    console.log("=== INTENTANDO LOGIN ===");
    console.log("Email:", email);

    try {
      const supabase = getSupabaseClient();
      
      console.log("Llamando a signInWithPassword...");
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      console.log("Respuesta:", { data: data?.user, error: authError });

      if (authError) {
        console.error("Auth error:", authError);
        setError(authError.message);
        setDebugInfo(`Código: ${authError.code}`);
        return;
      }

      if (!data?.user) {
        setError("No se recibió información del usuario");
        return;
      }

      console.log("Login exitoso para:", data.user.email);
      router.push("/");
      
    } catch (err: any) {
      console.error("Excepción:", err);
      setError(err.message || "Error al conectar con Supabase");
      setDebugInfo(err.stack || "");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-mesh-gradient pointer-events-none"></div>
      
      {/* Login Card */}
      <div className="relative w-full max-w-md">
        {/* Corner decorations */}
        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--primary)]"></div>
        <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[var(--primary)]"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[var(--primary)]"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--primary)]"></div>
        
        <div className="bg-[var(--card)] border border-[var(--border)] p-8 form-card">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[var(--primary)] neon-border-cyan mb-4">
              <Activity className="h-8 w-8 text-[var(--primary-foreground)]" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--foreground)] text-glow-cyan">
              VeriTest.LAB
            </h1>
            <p className="text-[var(--muted-foreground)] text-sm mt-1">
              Inicia sesión para continuar
            </p>
          </div>

          {/* Debug info - solo en desarrollo */}
          {debugInfo && (
            <div className="mb-4 p-2 rounded bg-yellow-500/10 border border-yellow-500 text-xs text-yellow-500 font-mono">
              DEBUG: {debugInfo}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm text-[var(--muted-foreground)]">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-lg py-2.5 pl-10 pr-4 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm text-[var(--muted-foreground)]">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-lg py-2.5 pl-10 pr-4 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                  required
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 rounded-lg bg-[var(--destructive)]/10 border border-[var(--destructive)] text-[var(--destructive)] text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/80 text-[var(--primary-foreground)] font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-[var(--primary-foreground)] border-t-transparent"></div>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  <span>Iniciar sesión</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-[var(--muted-foreground)]">
              Solo personal autorizado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}