"use client";

import { useOperativeSamples, useOperativeMetrics, useSamples } from "@/lib/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FlaskConical,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Timer,
  Shield,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const dailyData = [
  { dia: "Lun", muestras: 45, tiempoMedio: 28 },
  { dia: "Mar", muestras: 52, tiempoMedio: 32 },
  { dia: "Mié", muestras: 48, tiempoMedio: 30 },
  { dia: "Jue", muestras: 55, tiempoMedio: 34 },
  { dia: "Vie", muestras: 42, tiempoMedio: 26 },
  { dia: "Sáb", muestras: 18, tiempoMedio: 24 },
  { dia: "Dom", muestras: 8, tiempoMedio: 22 },
];

const typeDistribution = [
  { tipo: "Clínico", cantidad: 145, porcentaje: 45 },
  { tipo: "Molecular", cantidad: 98, porcentaje: 30 },
  { tipo: "Ambiental", cantidad: 52, porcentaje: 16 },
  { tipo: "Alimento", cantidad: 28, porcentaje: 9 },
];

const qualityMetrics = [
  { metric: "Precisión", value: "99.2%", target: "99%", status: "success" },
  { metric: "Trazabilidad", value: "100%", target: "100%", status: "success" },
  { metric: "Tasa de error", value: "1.2%", target: "<2%", status: "success" },
  { metric: "No conformidades", value: "3", target: "<5", status: "success" },
  { metric: "Tiempo medio", value: "28h", target: "<48h", status: "success" },
];

const statusConfig = {
  COMPLETED: { color: "bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]", icon: CheckCircle2 },
  IN_PROCESS: { color: "bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]", icon: Clock },
  Error: { color: "bg-[var(--destructive)]/20 text-[var(--destructive)] border border-[var(--destructive)]", icon: AlertTriangle },
};

export default function OperativoPage() {
  const { samples, loading: samplesLoading } = useOperativeSamples();
  const { metrics, loading: metricsLoading } = useOperativeMetrics();

  const pending = samples.filter(s => s.status !== "COMPLETED").length;

  if (samplesLoading || metricsLoading) {
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
              OPERATIVO
            </h2>
            <p className="text-[var(--muted-foreground)] text-sm mt-1">
              Control de muestras y calidad
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-[var(--accent)] animate-pulse" />
            <span className="text-[var(--accent)] text-xs tracking-wider">EN VIVO</span>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden hover-lift-glow group">
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--primary)]"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
              Muestras hoy
            </CardTitle>
            <FlaskConical className="h-5 w-5 text-[var(--primary)]" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[var(--foreground)]">{metrics?.samples_today || 0}</p>
            <p className="text-xs text-[var(--primary)]">+15% vs ayer</p>
          </CardContent>
        </Card>

        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden hover-lift-glow group">
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--accent)]"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
              Tiempo medio
            </CardTitle>
            <Timer className="h-5 w-5 text-[var(--accent)]" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[var(--foreground)]">{metrics?.avg_time || 0}h</p>
            <p className="text-xs text-[var(--accent)]">✓ Dentro del objetivo</p>
          </CardContent>
        </Card>

        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden hover-lift-glow group">
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--secondary)]"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
              Tasa de error
            </CardTitle>
            <Shield className="h-5 w-5 text-[var(--secondary)]" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[var(--foreground)]">{metrics?.error_rate || 0}%</p>
            <p className="text-xs text-[var(--accent)]">✓ Objetivo &lt;2%</p>
          </CardContent>
        </Card>

        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden hover-lift-glow group">
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#ffaa00]"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
              Pendientes
            </CardTitle>
            <Clock className="h-5 w-5 text-[#ffaa00]" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[var(--foreground)]">{pending}</p>
            <p className="text-xs text-[var(--muted-foreground)]">para hoy</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--primary)]"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--primary)]"></div>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[var(--foreground)]">
              Muestras por día
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="dia" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} stroke="var(--border)" />
                  <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} stroke="var(--border)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--primary)",
                      borderRadius: "4px",
                      color: "var(--foreground)",
                    }}
                  />
                  <Bar dataKey="muestras" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)]"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--accent)]"></div>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[var(--foreground)]">
              Tiempo medio de entrega (horas)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="dia" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} stroke="var(--border)" />
                  <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} stroke="var(--border)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--accent)",
                      borderRadius: "4px",
                      color: "var(--foreground)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="tiempoMedio"
                    stroke="var(--accent)"
                    strokeWidth={2}
                    dot={{ fill: "var(--accent)", strokeWidth: 0, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribution & Quality */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--secondary)]"></div>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[var(--foreground)]">
              Distribución por tipo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {typeDistribution.map((item) => (
                <div key={item.tipo} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-[var(--foreground)]">{item.tipo}</span>
                    <span className="text-[var(--muted-foreground)]">
                      {item.cantidad} ({item.porcentaje}%)
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--muted)]">
                    <div
                      className="h-full rounded-full bg-[var(--primary)] transition-all"
                      style={{ width: `${item.porcentaje}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)]"></div>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[var(--foreground)]">
              Métricas de calidad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {qualityMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-[var(--border)] p-3 hover:bg-[var(--muted)]/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-[var(--muted-foreground)]" />
                    <span className="font-medium text-[var(--foreground)]">
                      {metric.metric}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[var(--muted-foreground)]">
                      Meta: {metric.target}
                    </span>
                    <Badge
                      className={
                        metric.status === "success"
                          ? "bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]"
                          : "bg-[var(--destructive)]/20 text-[var(--destructive)] border border-[var(--destructive)]"
                      }
                    >
                      {metric.value}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Samples Table */}
      <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden">
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--primary)]"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--primary)]"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--primary)]"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--primary)]"></div>
        
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[var(--foreground)] flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-[var(--primary)]" />
            Últimas muestras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[var(--border)] hover:bg-transparent">
                <TableHead className="text-[var(--muted-foreground)]">ID</TableHead>
                <TableHead className="text-[var(--muted-foreground)]">Tipo</TableHead>
                <TableHead className="text-[var(--muted-foreground)]">Cliente</TableHead>
                <TableHead className="text-[var(--muted-foreground)]">Estado</TableHead>
                <TableHead className="text-[var(--muted-foreground)]">Tiempo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {samples.slice(0, 5).map((sample) => {
                const config = statusConfig[sample.status as keyof typeof statusConfig] || statusConfig.IN_PROCESS;
                const StatusIcon = config.icon;
                return (
                  <TableRow key={sample.id} className="border-[var(--border)] hover:bg-[var(--muted)]/30">
                    <TableCell className="font-medium text-[var(--foreground)] font-mono">
                      {sample.external_id}
                    </TableCell>
                    <TableCell className="text-[var(--muted-foreground)]">{sample.type}</TableCell>
                    <TableCell className="text-[var(--muted-foreground)]">{sample.client_name}</TableCell>
                    <TableCell>
                      <Badge className={config.color}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {sample.status === "COMPLETED" ? "Completado" : "En proceso"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[var(--muted-foreground)]">
                      {sample.turnaround_time ? `${sample.turnaround_time}h` : "—"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}