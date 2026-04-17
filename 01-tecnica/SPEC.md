# Especificación Técnica - Dashboard VeriTest.LAB

## Resumen

Especificación técnica para el dashboard de seguimiento del proyecto y KPIs operativos de VeriTest.LAB.

---

## 1. STACK TECNOLÓGICO

### 1.1 Stack Recomendado

| Componente | Tecnología | Justificación |
|------------|------------|---------------|
| **Frontend** | React + Vite | Rápido, moderno |
| **Charts** | Recharts / Chart.js | Gráficos modernos |
| **Backend** | Next.js API | Serverless, rápido |
| **Database** | PostgreSQL (Supabase) | SQL, gratis tier |
| **Auth** | Supabase Auth | Integrado |
| **Hosting** | Vercel | CDN, SSL |

### 1.2 Alternativas

| Opción | Stack | Pros | Contras |
|--------|-------|------|------|--------|
| **Astro** | Astro + Islands | Rápido | Less charts libs |
| **Streamlit** | Streamlit | Python-only | Menor control |
| **Metabase** | Metabase | Embeddable | Menos custom |

### 1.3 Selección: React + Next.js

| Criterio | Puntuación |
|---------|----------|
| Flexibilidad | ⭐⭐⭐⭐⭐ |
| Charts | ⭐⭐⭐⭐⭐ |
| Coste | ⭐⭐⭐⭐ |
| Mantenimiento | ⭐⭐⭐⭐ |
| **TOTAL** | **4.5/5** |

---

## 2. REQUISITOS FUNCIONALES

### 2.1 Dashboards

| Dashboard | Función | Acceso |
|-----------|---------|--------|
| **Proyecto** | Seguimiento implementación | Interno |
| **Operativo** | KPIs laboratorio | Interno |
| **Marketing** | Métricas campañas | Interno |
| **Financeiro** | Ingresos,gastos | Interno |

### 2.2 Vistas

| Vista | Contenido |
|-------|----------|
| **Resumen** | KPIs principales, grafico timeline |
| **Proyecto** | Fases, tareas, hitos |
| **Operativo** | Muestras, resultados, tiempos |
| **Chatbot** | Usage stats, feedback |

### 2.3 Roles

| Rol | Dashboard acceso |
|-----|-------------|
| **Admin** | Todo |
| **Técnico** | Operativo |
| **Comercial** | Marketing |
| **Viewer** | Solo lectura |

---

## 3. ARQUITECTURA

### 3.1 Base de Datos (Supabase)

```sql
-- Tablas principales
projects (id, name, status, start_date, end_date)
phases (id, project_id, name, status, start_date, end_date)
tasks (id, phase_id, name, status, assignee)
kpis (id, name, value, target, date)
samples (id, date, type, result, turnaround_time)
chatbot_conversations (id, date, user_query, response, feedback)
```

### 3.2 API Endpoints

```
/api/phases - CRUD fases proyecto
/api/tasks - CRUD tareas
/api/kpis - KPIs operativos
/api/samples - Muestras/procesadas
/api/chatbot - Chatbot conversations
```

### 3.3 Estructura Frontend

```
/dashboard
├── /components
│   ├── Sidebar.astro
│   ├── KPICard.astro
│   ├── ProjectTimeline.astro
│   └── ChartSection.astro
├── /pages
│   ├── index.astro (resumen)
│   ├── proyecto.astro
│   ├── operativo.astro
│   └── chatbot-stats.astro
└── /lib
    └── supabase.js
```

---

## 4. INTEGRACIONES

### 4.1 Con Web (Fase 4)

| Integración | Methode |
|------------|--------|
| **Google Analytics** | GA4 API |
| **Formularios** | Formspree webhooks |

### 4.2 Con Marketing (Fase 3)

| Integración | Methode |
|------------|--------|
| **Ads** | Google Ads API |
| **Email** | Mailchimp API |

### 4.3 Externas

| Servicio | Uso |
|---------|-----|
| **LIMS** | Datos muestras (future) |
| **Contabilidad** | Facturación (future) |

---

## 5. CHATBOT RAG

### 5.1 Integración

```
Chatbot → API → RAG Pipeline → Knowledge Base → LLM → Response
```

### 5.2 Knowledge Base

| Fuente | Contenido |
|--------|-----------|
| **Normativas** | ISO 15189, 15190, BMBL |
| **Protocolos** | SOPs laboratorio |
| **FAQs** | Preguntas frecuentes |
| **Resultados** | Interpretación |

### 5.3 Tech Stack chatbot

| Componente | Tecnología |
|------------|-------------|
| **Embeddings** | OpenAI ada-002 |
| **Vector DB** | Pinecone / Supabase pgvector |
| **LLM** | GPT-4o o GPT-4o-mini |
| **Framework** | Vercel AI SDK |

---

## 6. DISEÑO UI

### 6.1 Colores

| Usage | Color | HEX |
|-------|-------|-----|
| **Primary** | Azul ciencia | #0066CC |
| **Secondary** | Verde vida | #00A36C |
| **Background** | Gris claro | #F8F9FA |
| **Cards** | Blanco | #FFFFFF |
| **Text** | Gris | #2D3436 |

### 6.2 Layout

```
┌──────────────────────────────────────────────────┐
│ Sidebar │              Main Content              │
│        │ ┌────────────────────────────────┐   │
│ Logo   │ │ KPIs Cards (4 columns)           │   │
│ Nav    │ └────────────────────────────────┘   │
│        │ ┌────────────────────────────────┐   │
│ -----  │ │      Chart / Timeline           │   │
│ User   │ └────────────────────────────────┘   │
│        │ ┌──────────┐ ┌──────────┐          │
│        │ │ Table   │ │ Details │          │
│        │ └──────────┘ └──────────┘          │
└──────────────────────────────────────────────────┘
```

---

## 7. PRESUPUESTO ESTIMADO

| Componente | Estimación |
|-----------|------------|
| **Diseño UI** | 2.000-4.000€ |
| **Desarrollo frontend** | 4.000-6.000€ |
| **Base datos + API** | 2.000-4.000€ |
| **Chatbot RAG** | 5.000-8.000€ |
| **Hosting año 1** | 500€ (Vercel) |
| **Chatbot API** | 2.000€/año OpenAI |
| **Total** | **15.500-26.500€** |

**Nota**: Dentro del presupuesto Web + Dashboard (300.000€)

---

## 8. SEGURIDAD

| Medida | Implementación |
|--------|--------------|
| **Auth** | Supabase Auth (email, MFA) |
| **RLS** | Row Level Security |
| **SSL** | HTTPS automático |
| **Backups** | Automáticos Supabase |
| **Logs** | Acceso logging |

---

## 9. PLAZO DEentrega

| Fase | Duración | Entregable |
|------|----------|-----------|
| **Spec + DB** | 1 semana | Esquema, mocks |
| **Dashboard** | 2 semanas | Beta |
| **Chatbot** | 2 semanas | Beta |
| **Testing** | 1 semana | Lanzamiento |

**Total: 6 semanas**

---

*Especificación técnica para Proyecto VeriTest.LAB*
*Versión 1.0 — Abril 2026*