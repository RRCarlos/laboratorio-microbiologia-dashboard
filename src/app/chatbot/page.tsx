"use client";

import { useConversations, useChatbotStats } from "@/lib/hooks";
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
  Bot,
  MessageSquare,
  Users,
  ThumbsUp,
  ThumbsDown,
  Clock,
  TrendingUp,
  Zap,
  AlertCircle,
  FileText,
  HelpCircle,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const usageData = [
  { dia: "Lun", conversaciones: 45, usuarios: 12 },
  { dia: "Mar", conversaciones: 52, usuarios: 15 },
  { dia: "Mié", conversaciones: 48, usuarios: 14 },
  { dia: "Jue", conversaciones: 65, usuarios: 18 },
  { dia: "Vie", conversaciones: 58, usuarios: 16 },
  { dia: "Sáb", conversaciones: 22, usuarios: 8 },
  { dia: "Dom", conversaciones: 15, usuarios: 5 },
];

const categoryData = [
  { name: "Normativas ISO", value: 35, color: "#00f0ff" },
  { name: "Protocolos", value: 25, color: "#00ff88" },
  { name: "Equipamiento", value: 20, color: "#ff00aa" },
  { name: "General", value: 20, color: "#ffaa00" },
];

const topQuestions = [
  { pregunta: "Requisitos ISO 15189", consultas: 145 },
  { pregunta: "Protocolo de bioseguridad BSL-2", consultas: 98 },
  { pregunta: "Calibración equipos", consultas: 76 },
  { pregunta: "Tiempo de resultados", consultas: 65 },
  { pregunta: "Tipos de muestras aceptadas", consultas: 52 },
];

const feedbackConfig = {
  positive: { color: "bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]", icon: ThumbsUp, label: "Positivo" },
  neutral: { color: "bg-[var(--muted)]/50 text-[var(--muted-foreground)] border border-[var(--border)]", icon: HelpCircle, label: "Neutral" },
  negative: { color: "bg-[var(--destructive)]/20 text-[var(--destructive)] border border-[var(--destructive)]", icon: ThumbsDown, label: "Negativo" },
};

export default function ChatbotPage() {
  const { conversations, loading: convLoading } = useConversations();
  const { stats, loading: statsLoading } = useChatbotStats();

  if (convLoading || statsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center relative">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-[var(--primary)] border-t-transparent mx-auto glow-pulse-cyan"></div>
          <p className="mt-6 text-[var(--muted-foreground)] text-sm tracking-widest">CONECTANDO</p>
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
              CHATBOT RAG
            </h2>
            <p className="text-[var(--muted-foreground)] text-sm mt-1">
              Estadísticas y conversaciones
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-[var(--accent)] animate-pulse" />
            <span className="text-[var(--accent)] text-xs tracking-wider">INTELIGENCIA ACTIVA</span>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden hover-lift-glow group">
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--primary)]"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
              Conversaciones
            </CardTitle>
            <MessageSquare className="h-5 w-5 text-[var(--primary)]" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[var(--foreground)]">{stats.total_conversations}</p>
            <p className="text-xs text-[var(--accent)]">+18% esta semana</p>
          </CardContent>
        </Card>

        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden hover-lift-glow group">
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--secondary)]"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
              Usuarios únicos
            </CardTitle>
            <Users className="h-5 w-5 text-[var(--secondary)]" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[var(--foreground)]">{stats.unique_users}</p>
            <p className="text-xs text-[var(--muted-foreground)]">este mes</p>
          </CardContent>
        </Card>

        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden hover-lift-glow group">
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--accent)]"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
              Accuracy
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-[var(--accent)]" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[var(--foreground)]">{stats.accuracy}%</p>
            <p className="text-xs text-[var(--accent)]">+2% vs semana pasada</p>
          </CardContent>
        </Card>

        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden hover-lift-glow group">
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#ffaa00]"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
              Escalaciones
            </CardTitle>
            <AlertCircle className="h-5 w-5 text-[#ffaa00]" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[var(--foreground)]">{stats.escalations}%</p>
            <p className="text-xs text-[var(--accent)]">Objetivo &lt;15%</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--primary)]"></div>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[var(--foreground)] flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[var(--primary)]" />
              Uso del chatbot (últimos 7 días)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData}>
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
                  <Area
                    type="monotone"
                    dataKey="conversaciones"
                    stroke="var(--primary)"
                    fill="var(--primary)"
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="usuarios"
                    stroke="var(--secondary)"
                    fill="var(--secondary)"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--secondary)]"></div>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[var(--foreground)] flex items-center gap-2">
              <Bot className="h-4 w-4 text-[var(--secondary)]" />
              Consultas por categoría
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center">
              <div className="flex items-center gap-8">
                <ResponsiveContainer width={150} height={150}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {categoryData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-[var(--foreground)]">{item.name}</span>
                      <span className="text-sm font-medium text-[var(--foreground)]">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Questions */}
        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--primary)]"></div>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[var(--foreground)] flex items-center gap-2">
              <FileText className="h-5 w-5 text-[var(--primary)]" />
              Preguntas más frecuentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topQuestions.map((q, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-[var(--border)] p-3 hover:bg-[var(--muted)]/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-[var(--primary)]/20 text-xs font-medium text-[var(--primary)]">
                      {index + 1}
                    </span>
                    <span className="text-sm text-[var(--foreground)]">{q.pregunta}</span>
                  </div>
                  <Badge variant="secondary">{q.consultas}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)]"></div>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[var(--foreground)] flex items-center gap-2">
              <Zap className="h-5 w-5 text-[var(--accent)]" />
              Estadísticas rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-[var(--border)] p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[var(--muted-foreground)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      Tiempo promedio
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Duración de conversación
                    </p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-[var(--foreground)]">2.3 min</p>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-[var(--border)] p-4">
                <div className="flex items-center gap-3">
                  <ThumbsUp className="h-5 w-5 text-[var(--accent)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      Satisfacción
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">Basado en feedback</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-[var(--foreground)]">4.2/5</p>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-[var(--border)] p-4">
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5 text-[var(--primary)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      Base de conocimiento
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">Documentos indexados</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-[var(--foreground)]">350+</p>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-[var(--border)] p-4">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-[var(--secondary)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      Topics cubiertos
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">Categorías disponibles</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-[var(--foreground)]">44</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Conversations */}
      <Card className="relative bg-[var(--card)] border-[var(--border)] overflow-hidden">
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--primary)]"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--primary)]"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--primary)]"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--primary)]"></div>
        
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[var(--foreground)] flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-[var(--primary)]" />
            Conversaciones recientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[var(--border)] hover:bg-transparent">
                <TableHead className="text-[var(--muted-foreground)]">ID</TableHead>
                <TableHead className="text-[var(--muted-foreground)]">Pregunta</TableHead>
                <TableHead className="text-[var(--muted-foreground)]">Categoría</TableHead>
                <TableHead className="text-[var(--muted-foreground)]">Fecha</TableHead>
                <TableHead className="text-[var(--muted-foreground)]">Feedback</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conversations.slice(0, 5).map((conv) => {
                const config = feedbackConfig[conv.feedback as keyof typeof feedbackConfig] || feedbackConfig.neutral;
                const FeedbackIcon = config.icon;
                return (
                  <TableRow key={conv.id} className="border-[var(--border)] hover:bg-[var(--muted)]/30">
                    <TableCell className="font-medium text-[var(--foreground)] font-mono">
                      {conv.id}
                    </TableCell>
                    <TableCell className="max-w-md truncate text-[var(--foreground)]">
                      {conv.question}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{conv.category}</Badge>
                    </TableCell>
                    <TableCell className="text-[var(--muted-foreground)]">
                      {new Date(conv.created_at).toLocaleDateString("es-ES")}
                    </TableCell>
                    <TableCell>
                      <Badge className={config.color}>
                        <FeedbackIcon className="mr-1 h-3 w-3" />
                        {config.label}
                      </Badge>
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