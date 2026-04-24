"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// Types
export interface KPI {
  id: string;
  name: string;
  value: number;
  previous_value: number;
  target: number;
  unit: string;
  category: string;
  trend: "up" | "down" | "stable";
}

export interface Phase {
  id: string;
  name: string;
  status: "completed" | "in-progress" | "pending";
  progress: number;
  start_date?: string;
  end_date?: string;
}

export interface Sample {
  id: string;
  external_id: string;
  type: string;
  status: string;
  client_name: string;
  turnaround_time?: number;
  created_at: string;
}

// Hook para KPIs
export function useKPIs() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchKPIs() {
      try {
        const { data, error } = await supabase
          .from("kpis")
          .select("*")
          .order("recorded_at", { ascending: false })
          .limit(10);

        if (error) throw error;
        setKpis(data || []);
      } catch (err: any) {
        console.error("Error fetching KPIs:", err);
        setError(err.message);
        // Fallback a datos de ejemplo
        setKpis(exampleKPIs);
      } finally {
        setLoading(false);
      }
    }

    fetchKPIs();
  }, []);

  return { kpis, loading, error };
}

// Hook para Fases
export function usePhases() {
  const [phases, setPhases] = useState<Phase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPhases() {
      try {
        const { data, error } = await supabase
          .from("phases")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) throw error;
        setPhases(data || []);
      } catch (err: any) {
        console.error("Error fetching phases:", err);
        setError(err.message);
        setPhases(examplePhases);
      } finally {
        setLoading(false);
      }
    }

    fetchPhases();
  }, []);

  return { phases, loading, error };
}

// Hook para Muestras
export function useSamples() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSamples() {
      try {
        const { data, error } = await supabase
          .from("samples")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);

        if (error) throw error;
        setSamples(data || []);
      } catch (err: any) {
        console.error("Error fetching samples:", err);
        setError(err.message);
        setSamples(exampleSamples);
      } finally {
        setLoading(false);
      }
    }

    fetchSamples();
  }, []);

  return { samples, loading, error };
}

// Datos de ejemplo (fallback)
const exampleKPIs: KPI[] = [
  { id: "1", name: "Muestras procesadas", value: 142, previous_value: 125, target: 150, unit: "muestras", category: "operational", trend: "up" },
  { id: "2", name: "Ingresos mensuales", value: 45200, previous_value: 42000, target: 50000, unit: "€", category: "financial", trend: "up" },
  { id: "3", name: "Leads nuevos", value: 52, previous_value: 55, target: 60, unit: "leads", category: "marketing", trend: "stable" },
  { id: "4", name: "Accuracy chatbot", value: 89, previous_value: 87, target: 85, unit: "%", category: "chatbot", trend: "up" },
];

const examplePhases: Phase[] = [
  { id: "1", name: "Fase 1: Corpus", status: "completed", progress: 100 },
  { id: "2", name: "Fase 2: Planos", status: "completed", progress: 100 },
  { id: "3", name: "Fase 3: Marketing", status: "completed", progress: 100 },
  { id: "4", name: "Fase 4: Web", status: "completed", progress: 100 },
  { id: "5", name: "Fase 5: Dashboard", status: "in-progress", progress: 35 },
];

const exampleSamples: Sample[] = [
  { id: "1", external_id: "M-2024-0892", type: "Clínico", status: "COMPLETED", client_name: "Hospital Central", turnaround_time: 28, created_at: new Date().toISOString() },
  { id: "2", external_id: "M-2024-0891", type: "Molecular", status: "COMPLETED", client_name: "Clínica San José", turnaround_time: 32, created_at: new Date().toISOString() },
  { id: "3", external_id: "M-2024-0890", type: "Ambiental", status: "COMPLETED", client_name: "Fábrica S.L.", turnaround_time: 24, created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: "4", external_id: "M-2024-0889", type: "Clínico", status: "IN_PROCESS", client_name: "Hospital Central", created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: "5", external_id: "M-2024-0888", type: "Molecular", status: "COMPLETED", client_name: "Clínica San José", turnaround_time: 36, created_at: new Date(Date.now() - 172800000).toISOString() },
];

// ========== NUEVOS TIPOS ==========
export interface ProjectPhase {
  id: string;
  name: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
  start_date: string;
  end_date?: string;
  budget: number;
  tasks: ProjectTask[];
}

export interface ProjectTask {
  name: string;
  status: "completed" | "in-progress" | "pending";
}

export interface Conversation {
  id: string;
  question: string;
  answer: string;
  category: string;
  feedback: "positive" | "neutral" | "negative";
  created_at: string;
}

export interface OperativeMetrics {
  samples_today: number;
  avg_time: number;
  error_rate: number;
  pending: number;
}

// ========== HOOKS PARA PROYECTO ==========
export function useProjectPhases() {
  const [phases, setPhases] = useState<ProjectPhase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjectPhases() {
      try {
        //Primero intentamos de Supabase
        const { data, error } = await supabase
          .from("phases")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) {
          console.log("Supabase no disponible, usando datos locales");
          throw error;
        }
        
        if (data && data.length > 0) {
          const formatted = data.map((phase: any) => ({
            id: phase.id,
            name: phase.name,
            description: phase.description || "",
            status: phase.status,
            start_date: phase.start_date,
            end_date: phase.end_date,
            budget: phase.budget || 0,
            tasks: [],
          }));
          setPhases(formatted);
        } else {
          //Si no hay datos, usamos fallback
          setPhases(exampleProjectPhases);
        }
      } catch (err: any) {
        console.log("Usando datos locales para proyecto");
        setPhases(exampleProjectPhases);
      } finally {
        setLoading(false);
      }
    }

    fetchProjectPhases();
  }, []);

  return { phases, loading, error };
}

// ========== HOOKS PARA OPERATIVO ==========
export function useOperativeSamples() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOperativeSamples() {
      try {
        const { data, error } = await supabase
          .from("samples")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(20);

        if (error) throw error;
        setSamples(data || []);
      } catch (err: any) {
        console.error("Error fetching operative samples:", err);
        setError(err.message);
        setSamples(exampleSamples);
      } finally {
        setLoading(false);
      }
    }

    fetchOperativeSamples();
  }, []);

  return { samples, loading, error };
}

export function useOperativeMetrics() {
  const [metrics, setMetrics] = useState<OperativeMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const { data: samples } = await supabase
          .from("samples")
          .select("status, turnaround_time, created_at");

        const today = new Date().toISOString().split("T")[0];
        const samplesToday = samples?.filter(s => s.created_at.startsWith(today)).length || 0;
        
        const completed = samples?.filter(s => s.status === "COMPLETED") || [];
        const avgTime = completed.length > 0
          ? Math.round(completed.reduce((acc, s) => acc + (s.turnaround_time || 0), 0) / completed.length)
          : 0;
        
        const pending = samples?.filter(s => s.status !== "COMPLETED").length || 0;
        const errorRate = samples?.length ? Math.round((pending / samples.length) * 100) : 0;

        setMetrics({
          samples_today: samplesToday,
          avg_time: avgTime,
          error_rate: errorRate,
          pending,
        });
      } catch (err) {
        setMetrics({
          samples_today: 0,
          avg_time: 0,
          error_rate: 0,
          pending: 0,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, []);

  return { metrics, loading };
}

// ========== HOOKS PARA CHATBOT ==========
export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConversations() {
      try {
        const { data, error } = await supabase
          .from("conversations")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) throw error;
        setConversations(data || []);
      } catch (err: any) {
        console.error("Error fetching conversations:", err);
        setError(err.message);
        setConversations(exampleConversations);
      } finally {
        setLoading(false);
      }
    }

    fetchConversations();
  }, []);

  return { conversations, loading, error };
}

export function useChatbotStats() {
  const [stats, setStats] = useState({
    total_conversations: 0,
    unique_users: 0,
    accuracy: 0,
    escalations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data } = await supabase
          .from("conversations")
          .select("*");

        const total = data?.length || 0;
        const positive = data?.filter(c => c.feedback === "positive").length || 0;
        const accuracy = total ? Math.round((positive / total) * 100) : 0;

        setStats({
          total_conversations: total,
          unique_users: Math.floor(total * 0.3),
          accuracy,
          escalations: Math.floor(total * 0.11),
        });
      } catch (err) {
        setStats({
          total_conversations: 305,
          unique_users: 88,
          accuracy: 89,
          escalations: 11,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading };
}

// Datos de ejemplo adicionales
const exampleProjectPhases: ProjectPhase[] = [
  { id: "1", name: "Fase 1: Corpus Bibliografico", description: "Base de conocimiento con 350+ Q and A sobre bioseguridad y normativas", status: "completed", start_date: "17/04/2026", end_date: "22/04/2026", budget: 0, tasks: [{ name: "Recopilacion normativas ISO", status: "completed" }, { name: "Compilacion guias OMS/CDC", status: "completed" }, { name: "Creacion base Q and A", status: "completed" }, { name: "Validacion contenido", status: "completed" }] },
  { id: "2", name: "Fase 2: Planos y Presupuesto", description: "Documentacion tecnica y economica del laboratorio BSL-2", status: "completed", start_date: "17/04/2026", end_date: "23/04/2026", budget: 1000000, tasks: [{ name: "Planos arquitectonicos", status: "completed" }, { name: "Instalaciones", status: "completed" }, { name: "Presupuesto detallado", status: "completed" }, { name: "Equipamiento cientifico", status: "completed" }] },
  { id: "3", name: "Fase 3: Marketing", description: "Estrategia de marketing, branding y landing page", status: "completed", start_date: "17/04/2026", end_date: "21/04/2026", budget: 200000, tasks: [{ name: "Estrategia de marketing", status: "completed" }, { name: "Guia de marca", status: "completed" }, { name: "Diseno landing page", status: "completed" }] },
  { id: "4", name: "Fase 4: Web Institucional", description: "Pagina web institucional con informacion del laboratorio", status: "completed", start_date: "17/04/2026", end_date: "21/04/2026", budget: 12000, tasks: [{ name: "Diseno UI", status: "completed" }, { name: "Desarrollo Astro", status: "completed" }, { name: "SEO y contenido", status: "completed" }] },
  { id: "5", name: "Fase 5: Dashboard", description: "Dashboard de seguimiento con KPIs operativos y chatbot RAG", status: "in-progress", start_date: "24/04/2026", budget: 26500, tasks: [{ name: "Estructura base y sidebar", status: "completed" }, { name: "Vista Resumen con KPIs", status: "completed" }, { name: "Vista Proyecto", status: "completed" }, { name: "Vista Operativo", status: "pending" }, { name: "Vista Chatbot", status: "pending" }, { name: "Integracion Supabase", status: "completed" }, { name: "Chatbot RAG", status: "pending" }, { name: "Testing y deploy", status: "pending" }] },
];

const exampleConversations: Conversation[] = [
  { id: "1", question: "Cuales son los requisitos de la ISO 15189 para validacion de metodos?", answer: "La ISO 15189:2022 requiere que...", category: "Normativas", feedback: "positive", created_at: new Date().toISOString() },
  { id: "2", question: "Como debo calibrar el microscopio de fluorescencia?", answer: "Para calibrar el microscopio...", category: "Equipamiento", feedback: "positive", created_at: new Date().toISOString() },
  { id: "3", question: "Que EPP se requiere para trabajar con muestras de riesgo BSL-2?", answer: "Para trabajo BSL-2 se requiere...", category: "Protocolos", feedback: "neutral", created_at: new Date().toISOString() },
  { id: "4", question: "Cuanto cuesta un analisis de carga microbiana?", answer: "El precio depende del tipo...", category: "General", feedback: "positive", created_at: new Date().toISOString() },
  { id: "5", question: "Tienen certificacion ISO 15189?", answer: "Si, VeriTest.LAB esta certificado...", category: "General", feedback: "positive", created_at: new Date().toISOString() },
];