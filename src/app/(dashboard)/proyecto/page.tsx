"use client";

import { useProjectPhases } from "@/lib/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  DollarSign,
  Target,
  Activity,
} from "lucide-react";

const statusConfig = {
  completed: {
    label: "Completada",
    color: "bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]",
    icon: CheckCircle2,
  },
  "in-progress": {
    label: "En progreso",
    color: "bg-[var(--secondary)]/20 text-[var(--secondary)] border border-[var(--secondary)]",
    icon: Clock,
  },
  pending: {
    label: "Pendiente",
    color: "bg-[var(--muted)]/50 text-[var(--muted-foreground)] border border-[var(--border)]",
    icon: AlertCircle,
  },
};

const taskStatusConfig = {
  completed: { color: "text-[var(--accent)]", icon: CheckCircle2 },
  "in-progress": { color: "text-[var(--secondary)]", icon: Clock },
  pending: { color: "text-[var(--muted-foreground)]", icon: AlertCircle },
};

export default function ProyectoPage() {
  const { phases, loading } = useProjectPhases();

  const completedPhases = phases.filter((p) => p.status === "completed").length;
  const totalBudget = phases.reduce((acc, p) => acc + (p.budget || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center relative">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-[var(--primary)] border-t-transparent mx-auto glow-pulse-cyan"></div>
          <p className="mt-6 text-[var(--muted-foreground)] text-sm tracking-widest">CARGANDO</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-lg bg-[var(--card)] border border-[var(--border)] p-6 gradient-header">
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--primary)]"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--primary)]"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--primary)]"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--primary)]"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h2 className="text-2xl font-bold text-[var(--foreground)] text-glow-cyan">
              PROYECTO
            </h2>
            <p className="text-[var(--muted-foreground)] text-sm mt-1">
              Seguimiento de fases y presupuesto
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-[var(--accent)] animate-pulse" />
            <span className="text-[var(--accent)] text-xs tracking-wider">{phases.length} FASES</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden hover-lift-glow group">
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--primary)]"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[var(--primary)]"></div>
          <CardContent className="flex items-center gap-4 p-6">
            <div 
              className="rounded-lg p-3"
              style={{ background: "rgba(0, 240, 255, 0.1)", border: "1px solid var(--primary)" }}
            >
              <Target className="h-6 w-6 text-[var(--primary)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">Progreso total</p>
              <p className="text-2xl font-bold text-[var(--foreground)]">
                {Math.round((completedPhases / phases.length) * 100)}%
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">
                {completedPhases} de {phases.length} fases completadas
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden hover-lift-glow group">
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--accent)]"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[var(--accent)]"></div>
          <CardContent className="flex items-center gap-4 p-6">
            <div 
              className="rounded-lg p-3"
              style={{ background: "rgba(0, 255, 136, 0.1)", border: "1px solid var(--accent)" }}
            >
              <DollarSign className="h-6 w-6 text-[var(--accent)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">Presupuesto total</p>
              <p className="text-2xl font-bold text-[var(--foreground)]">
                {totalBudget.toLocaleString("es-ES")}€
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">Inversión acumulada</p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden hover-lift-glow group">
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--secondary)]"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[var(--secondary)]"></div>
          <CardContent className="flex items-center gap-4 p-6">
            <div 
              className="rounded-lg p-3"
              style={{ background: "rgba(255, 0, 170, 0.1)", border: "1px solid var(--secondary)" }}
            >
              <Calendar className="h-6 w-6 text-[var(--secondary)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">Fecha inicio</p>
              <p className="text-2xl font-bold text-[var(--foreground)]">17/04/2026</p>
              <p className="text-xs text-[var(--muted-foreground)]">Primera fase iniciada</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Phases List */}
      <div className="space-y-4">
        {phases.map((phase) => {
          const config = statusConfig[phase.status] || statusConfig.pending;
          const StatusIcon = config.icon;

          return (
            <Card 
              key={phase.id} 
              className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden hover-lift-glow group"
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--primary)]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--primary)]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--primary)]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--primary)]"></div>
              
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.color}`}
                    >
                      <StatusIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-[var(--foreground)]">{phase.name}</CardTitle>
                      <p className="text-sm text-[var(--muted-foreground)]">{phase.description}</p>
                    </div>
                  </div>
                  <Badge className={config.color}>{config.label}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-wrap gap-4 text-sm text-[var(--muted-foreground)]">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Inicio: {phase.start_date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Fin: {phase.end_date || "—"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>Presupuesto: {phase.budget?.toLocaleString("es-ES") || "0"}€</span>
                  </div>
                </div>
                {phase.tasks && phase.tasks.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-[var(--foreground)]">Tareas:</p>
                    <div className="grid gap-2 md:grid-cols-2">
                      {phase.tasks.map((task, index) => {
                        const taskConfig = taskStatusConfig[task.status] || taskStatusConfig.pending;
                        const TaskIcon = taskConfig.icon;
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <TaskIcon className={`h-4 w-4 ${taskConfig.color}`} />
                            <span
                              className={
                                task.status === "pending"
                                  ? "text-[var(--muted-foreground)]"
                                  : "text-[var(--foreground)]"
                              }
                            >
                              {task.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}