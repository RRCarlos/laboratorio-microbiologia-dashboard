"use client";

import { useKPIs, usePhases, useSamples } from "@/lib/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  FlaskConical,
  DollarSign,
  Users,
  Bot,
  CheckCircle2,
  Clock,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Datos de tendencia simulados
const trendData = [
  { mes: "Ene", muestras: 98, ingresos: 32000 },
  { mes: "Feb", muestras: 112, ingresos: 38000 },
  { mes: "Mar", muestras: 125, ingresos: 42000 },
  { mes: "Abr", muestras: 142, ingresos: 45200 },
];

const colorMap: Record<string, { icon: any; border: string; glow: string }> = {
  operational: { icon: FlaskConical, border: "border-[var(--primary)]", glow: "glow-pulse-cyan" },
  financial: { icon: DollarSign, border: "border-[var(--accent)]", glow: "glow-pulse-green" },
  marketing: { icon: Users, border: "border-[var(--secondary)]", glow: "glow-pulse-magenta" },
  chatbot: { icon: Bot, border: "border-[#ffaa00]", glow: "glow-pulse-magenta" },
};

const statusColors: Record<string, string> = {
  completed: "bg-[var(--accent)]",
  "in-progress": "bg-[var(--primary)]",
  pending: "bg-[var(--muted-foreground)]",
};

export default function ResumenPage() {
  const { kpis, loading: kpisLoading } = useKPIs();
  const { phases, loading: phasesLoading } = usePhases();
  const { samples, loading: samplesLoading } = useSamples();

  const isLoading = kpisLoading || phasesLoading || samplesLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center relative">
          <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-[var(--primary)] opacity-20"></div>
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-[var(--primary)] border-t-transparent mx-auto glow-pulse-cyan"></div>
          <p className="mt-6 text-[var(--muted-foreground)] text-sm tracking-widest">CONECTANDO</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header decorativo */}
      <div className="relative overflow-hidden rounded-lg bg-[var(--card)] border border-[var(--border)] p-6 gradient-header">
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--primary)]"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--primary)]"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--primary)]"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--primary)]"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h2 className="text-2xl font-bold text-[var(--foreground)] text-glow-cyan">
              RESUMEN GENERAL
            </h2>
            <p className="text-[var(--muted-foreground)] text-sm mt-1">
              Panel de control en tiempo real
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-[var(--accent)] animate-pulse" />
            <span className="text-[var(--accent)] text-xs tracking-wider">LIVE</span>
          </div>
        </div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
      </div>

      {/* KPIs Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.slice(0, 4).map((kpi, index) => {
          const config = colorMap[kpi.category] || colorMap.operational;
          const Icon = config.icon;
          const change = kpi.previous_value > 0
            ? Math.round(((kpi.value - kpi.previous_value) / kpi.previous_value) * 100)
            : 0;
          const isPositive = kpi.trend === "up" || (kpi.trend === "down" && kpi.category === "operational");
          const accentColor = kpi.category === "operational" ? "var(--primary)" : kpi.category === "financial" ? "var(--accent)" : kpi.category === "marketing" ? "var(--secondary)" : "#ffaa00";

          return (
            <Card 
              key={kpi.id} 
              className="relative bg-[var(--card)] border-[var(--border)] hover-lift-glow group"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(${kpi.category === 'operational' ? '0,240,255' : kpi.category === 'financial' ? '0,255,136' : '255,0,170'}, 0.05) 0%, transparent 50%)`
              }}
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: accentColor }}></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: accentColor }}></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: accentColor }}></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: accentColor }}></div>
              
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-widest">
                  {kpi.name}
                </CardTitle>
                <div 
                  className="rounded-sm p-2"
                  style={{ 
                    background: `rgba(${kpi.category === 'operational' ? '0,240,255' : kpi.category === 'financial' ? '0,255,136' : '255,0,170'}, 0.1)`,
                    border: `1px solid ${accentColor}30`
                  }}
                >
                  <Icon 
                    className="h-4 w-4" 
                    style={{ color: accentColor }} 
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span 
                    className="text-3xl font-bold"
                    style={{ color: accentColor }}
                  >
                    {kpi.unit === "€" ? "€" : ""}
                    {kpi.value.toLocaleString("es-ES")}
                    {kpi.unit !== "€" ? ` ${kpi.unit}` : ""}
                  </span>
                  <span
                    className={`flex items-center text-sm font-medium ${
                      isPositive ? "text-[var(--accent)]" : "text-[var(--destructive)]"
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {change > 0 ? "+" : ""}{change}%
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-px flex-1 bg-[var(--border)]"></div>
                  <p className="text-xs text-[var(--muted-foreground)]">vs mes anterior</p>
                  <div className="h-px flex-1 bg-[var(--border)]"></div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Trend Chart */}
        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--primary)]"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--primary)]"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--primary)]"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--primary)]"></div>
          
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[var(--foreground)] flex items-center gap-2">
              <Activity className="h-4 w-4 text-[var(--primary)]" />
              Tendencia mensual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} stroke="var(--border)" />
                  <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} stroke="var(--border)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--primary)",
                      borderRadius: "4px",
                      color: "var(--foreground)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="muestras"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={{ fill: "var(--primary)", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: "var(--primary)", stroke: "var(--background)", strokeWidth: 2 }}
                    name="Muestras"
                  />
                  <Line
                    type="monotone"
                    dataKey="ingresos"
                    stroke="var(--accent)"
                    strokeWidth={2}
                    dot={{ fill: "var(--accent)", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: "var(--accent)", stroke: "var(--background)", strokeWidth: 2 }}
                    name="Ingresos (€)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Phases Progress */}
        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--secondary)]"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--secondary)]"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--secondary)]"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--secondary)]"></div>
          
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[var(--foreground)] flex items-center gap-2">
              <FlaskConical className="h-4 w-4 text-[var(--secondary)]" />
              Progreso del proyecto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {phases.map((phase) => (
              <div key={phase.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${statusColors[phase.status]}`}
                    />
                    <span className="text-sm font-medium text-[var(--foreground)]">
                      {phase.name}
                    </span>
                  </div>
                  <Badge
                    variant={phase.status === "completed" ? "default" : "secondary"}
                    className={
                      phase.status === "completed"
                        ? "bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]"
                        : "bg-[var(--secondary)]/20 text-[var(--secondary)] border border-[var(--secondary)]"
                    }
                  >
                    {phase.status === "completed"
                      ? "Completado"
                      : `${phase.progress}%`}
                  </Badge>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-[var(--muted)]">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      phase.status === "completed"
                        ? "bg-[var(--accent)]"
                        : "bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)]"
                    }`}
                    style={{ width: `${phase.progress}%` }}
                  >
                    {phase.status !== "completed" && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden">
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)]"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--accent)]"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--accent)]"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--accent)]"></div>
        
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[var(--foreground)] flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-[var(--accent)]" />
            Últimas muestras procesadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[var(--border)] hover:bg-transparent">
                <TableHead className="text-[var(--muted-foreground)]">ID Muestra</TableHead>
                <TableHead className="text-[var(--muted-foreground)]">Tipo</TableHead>
                <TableHead className="text-[var(--muted-foreground)]">Cliente</TableHead>
                <TableHead className="text-[var(--muted-foreground)]">Estado</TableHead>
                <TableHead className="text-[var(--muted-foreground)]">Tiempo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {samples.map((sample, index) => (
                <TableRow 
                  key={sample.id} 
                  className="border-[var(--border)] hover:bg-[var(--muted)]/30 transition-colors"
                >
                  <TableCell className="font-medium text-[var(--foreground)] font-mono">
                    {sample.external_id}
                  </TableCell>
                  <TableCell className="text-[var(--muted-foreground)]">{sample.type}</TableCell>
                  <TableCell className="text-[var(--muted-foreground)]">{sample.client_name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {sample.status === "COMPLETED" ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />
                          <span className="text-sm text-[var(--accent)]">
                            Completado
                          </span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 text-[var(--primary)] animate-pulse" />
                          <span className="text-sm text-[var(--primary)]">
                            En proceso
                          </span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-[var(--muted-foreground)]">
                    {sample.turnaround_time ? `${sample.turnaround_time}h` : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}