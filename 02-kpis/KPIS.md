# KPIs - Dashboard VeriTest.LAB

## Resumen

Definición de KPIs para seguimiento del proyecto y operación del laboratorio.

---

## 1. KPIs DEL PROYECTO (IMPLEMENTACIÓN)

### 1.1 Fases del Proyecto

| KPI | Descripción | Meta | Frecuencia |
|-----|-----------|------|-----------|
| **Fases completadas** | % fases finalizadas | 100% | Mensual |
| **Tareas pendientes** | # tareas abiertas | 0 al final | Semanal |
| **Presupuesto gastado** | % vs presupuesto | <100% | Mensual |
| **Días de retraso** | Desviación timeline | 0 días | Semanal |

### 1.2 Progreso por Fase

| Fase | Estado | Completado |
|------|--------|------------|
| Fase 1: Corpus | ✅ | 100% |
| Fase 2: Planos | ✅ | 100% |
| Fase 3: Marketing | ✅ | 100% |
| Fase 4: Web | ✅ | 100% |
| Fase 5: Dashboard | ⏳ | X% |

---

## 2. KPIs OPERATIVOS (LABORATORIO)

### 2.1 Volumen

| KPI | Descripción | Meta | Frecuencia |
|-----|-----------|------|-----------|
| **Muestras procesadas** | # muestras/mes | Crecer 10%/mes | Mensual |
| **Tiempo medio** | Horas promedio | <48h | Diario |
| **Tasa de error** | % recolociones | <2% | Mensual |

### 2.2 Calidad

| KPI | Descripción | Meta | Frecuencia |
|-----|-----------|------|-----------|
| **Precisión** | % resultados correctos | >99% | Mensual |
| **Trazabilidad** | % trazable | 100% | Mensual |
| **No conformidades** | # incidencias | <5/mes | Mensual |

### 2.3 Cliente

| KPI | Descripción | Meta | Frecuencia |
|-----|-----------|------|-----------|
| **Satisfacción** | NPS | >50 | Trimestral |
| **Tiempos de respuesta** | % respuestas <24h | >90% | Semanal |
| **Reclamaciones** | # reclamaciones | <3/mes | Mensual |

---

## 3. KPIs DE MARKETING

### 3.1 Adquisición

| KPI | Descripción | Meta | Frecuencia |
|-----|-----------|------|-----------|
| **Visitas web** | # visitas/mes | 5.000 | Mensual |
| **Leads** | # leads nuevos/mes | 50 | Mensual |
| **CTR** |Click-through rate | >3% | Mensual |
| **CPL** | Coste por lead | <50€ | Mensual |

### 3.2 Conversión

| KPI | Descripción | Meta | Frecuencia |
|-----|-----------|------|-----------|
| **Lead → Cliente** | % conversión | >15% | Mensual |
| **Ticket medio** | Ingreso/cliente | >500€ | Mensual |
| **CAC** | Coste adquisición | <200€ | Trimestral |
| **LTV** | Valor lifetime | >1.500€ | Anual |

### 3.3 Engagement

| KPI | Descripción | Meta | Frecuencia |
|-----|-----------|------|-----------|
| **Open rate** | % emails abiertos | >25% | Mensual |
| **Social followers** | # seguidores | 1.000 | Anual |

---

## 4. KPIs FINANCIEROS

### 4.1 Ingresos

| KPI | Descripción | Meta |
|-----|-----------|------|
| **Ingresos mensuales** | €facturado/mes | Crecer |
| **Ingresos acumulados** | €año | 150.000€ (A1) |
| **Facturación promedio** | €/factura | >200€ |

### 4.2 Gastos

| KPI | Descripción | Meta |
|-----|-----------|------|
| **Gasto marketing** | €/mes ads | <15.000€ |
| **Gasto operativo** | €/mes | Decrecer |
| **Margen** | % beneficio | >30% |

---

## 5. KPIs DEL CHATBOT

### 5.1 Uso

| KPI | Descripción | Meta |
|-----|-----------|------|
| **Conversaciones** | # chats/mes | 500 |
| **Usuarios únicos** | # usuarios/mes | 100 |
| **Duración media** | Minutos chat | <3 min |

### 5.2 Efectividad

| KPI | Descripción | Meta |
|-----|-----------|------|
| **Accuracy** | % respuestas útiles | >85% |
| **Escalation** | % a humano | <15% |
| **Satisfacción** | Rating promedio | >4/5 |

### 5.3 Cost

| KPI | Descripción | Meta |
|-----|-----------|------|
| **Costo por chat** | €OpenAI/chat | <0.10€ |
| **Costo mensual** | €total chatbot | <500€ |

---

## 6. DASHBOARD VIEWS

### 6.1 Vista Resumen

```
┌──────────────────────────────────────────────────────────────┐
│              DASHBOARD VERITEST.LAB                        │
├──────────────────────────────────────────────────────────────┤
│  Muestras    │  Ingresos   │  Leads    │  Chatbot   │
│  142        │  45.200€   │  52       │  89%      │
├──────────────────────────────────────────────────────────────┤
│              GRÁFICO TENDENCIA (12 meses)                  │
│   ↑ +15% vs mes anterior                                │
├──────────────────────────────────────────────────────────────┤
│  Fase 1 ✅ Phase 2 ✅ Phase 3 ✅ Phase 4 ✅ Phase 5   │
└──────────────────────────────────────────────────────────────┘
```

### 6.2 Vista Operativo

```
┌──────────────────────────────────────────────────────────────┐
│  OPERATIVO                                          │
├──────────────────────────────────────────────────────────────┤
│  TODAY: 23 muestras | Avg: 32h | 0 errors             │
├──────────────────────────────────────────────────────────────┤
│  [Chart: Muestras por tipo]                          │
│  [Chart: Tiempo medio por día]                       │
├──────────────────────────────────────────────────────────────┤
│  Tipo         │ Hoy │ Meta │ % Logro                  │
│  Clínico     │ 15 │ 20  │ 75%                    │
│  Molecular  │ 8  │ 10  │ 80%                    │
└──────────────────────────────────────────────────────────────┘
```

---

## 7. IMPLEMENTACIÓN

### 7.1 Data Sources

| KPI | Source | Frecuencia |
|-----|--------|-----------|
| Proyecto | Manual | Semanal |
| Marketing | GA4 API | Diario |
| muestras | LIMS (future) | Diario |
| Chatbot | Logs API | Diario |

### 7.2 Alerts

| Condición | Notificación |
|----------|-------------|
| <90% meta | Email |
| Error >5% | Slack |
| downtime | SMS |

---

*Definición de KPIs para Proyecto VeriTest.LAB*
*Versión 1.0 — Abril 2026*