# Chatbot RAG - Diseño VeriTest.LAB

## Resumen

Diseño del chatbot con RAG para el dashboard de VeriTest.LAB.

---

## 1. ARQUITECTURA

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    USER                             │
│              (Chat Interface)                    │
└─────────────────────────┬───────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   API GATEWAY                            │
│            (Vercel AI SDK / FastAPI)               │
└─────────────────────────┬───────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                 RAG PIPELINE                            │
│  1. Query → Embeddings (OpenAI ada-002)            │
│  2. Search → Vector DB (Pinecone/pgvector)         │
│  3. Context → top-k results                      │
│  4. Prompt → Format with context                 │
└─────────────────────────┬───────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                 LLM GENERATOR                         │
│           (GPT-4o o GPT-4o-mini)              │
└─────────────────────────┬───────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                 RESPONSE                             │
│        (Grounded, cited, helpful)                │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. KNOWLEDGE BASE

### 2.1 Contenido

| Fuente | Documentos | Embeddings |
|--------|------------|-----------|
| **Normativas** | ISO 15189, 15190 | ✅ |
| **Protocolos** | 20 SOPs | ✅ |
| **FAQs** | 50 preguntas | ✅ |
| **Resultados** | Interpretaciones | ✅ |
| **Equipamiento** | Fichas técnicas | ✅ |

### 2.2 Chunking Strategy

| Tipo | Tamaño | Overlap |
|------|--------|-------|
| Normativas | 1000 tokens | 100 tokens |
| SOPs | 500 tokens | 50 tokens |
| FAQs | 200 tokens | 0 tokens |

### 2.3 Metadata

```json
{
  "source": "ISO 15189",
  "page": 42,
  "section": "5.2",
  "type": "requirement",
  "last_updated": "2026-04-17"
}
```

---

## 3. PROMPT DESIGN

### 3.1 System Prompt

```
You are VeriTest.LAB Assistant, a helpful AI assistant for VeriTest.LAB 
microbiology laboratory. You help users with:
- Understanding test results
- Sample preparation instructions
- Interpreting reports
- General microbiology questions

Guidelines:
- Always cite your sources
- If unsure, say so
- Recommend consulting a specialist for medical advice
- Be concise and helpful
```

### 3.2 Few-Shot Examples

```
Q: ¿Qué significa un cultivo positivo?
A: Un cultivo positivo indica que se detectó crecimiento 
del microorganismo buscado en la muestra. Esto puede significar:
1. Presencia de infección
2. Colonización
3. Contaminación ( según contexto)

Fuentes: ISO 15189 Sección 8.2, Protocolo de cultivos

Q: ¿Cómo debo preparar la muestra?
A: [Respuesta basada en SOP correspondiente]

Nota: Siempre citar fuentes de la KB
```

---

## 4. CASOS DE USO

### 4.1 Pre-Analytics

| Pregunta | Respuesta |
|---------|----------|
| "¿Qué muestra necesito?" | Tipo de muestra según prueba |
| "¿Cómo recolectar?" | Instrucciones de recolección |
| "¿Cuánto necesito?" | Volumen mínimo |
| "¿Cómo transportar?" | Condiciones de transporte |

### 4.2 Post-Analytics

| Pregunta | Respuesta |
|---------|----------|
| "¿Qué significa mi resultado?" | Interpretación del resultado |
| "¿Qué hacer?" | Siguientes pasos |
| "¿Cuándo repeat?" | Nueva muestra |

### 4.3 General

| Pregunta | Respuesta |
|---------|----------|
| "¿Tienen ISO 15189?" | Sí, somos certificados |
| "¿Cuánto cuesta?" | Precios de servicios |
| "¿Cuándo tengo resultados?" | Tiempos de entrega |

---

## 5. CONFIGURACIÓN TÉCNICA

### 5.1 Stack

| Componente | Tecnología | Coste |
|-----------|------------|-------|
| **Embeddings** | OpenAI ada-002 | $0.0001/1K |
| **LLM** | GPT-4o-mini | $0.15/1K input |
| **Vector DB** | Pinecone | $0/25K vectors |
| **Framework** | Vercel AI SDK | $0/mes |
| **Hosting** | Vercel | $0/mes |

### 5.2 Cost Estimation

| Input | Estimación |
|-------|----------|
| **Embeddings (50 doc)** | $0.01 |
| **Queries (500/mes)** | $0.50 |
| **Tokens (1K/query)** | $0.02 |
| **Total/mes** | **$15-25€** |

---

## 6. EVALUACIÓN

### 6.1 Métricas

| Métrica | Objetivo |
|---------|--------|
| **Answer rate** | >95% |
| **Accuracy** | >85% (human eval) |
| **Citation rate** | 100% |
| **Escalation rate** | <15% |

### 6.2 Red Teaming

| Prueba | Descripción |
|--------|-----------|
| **Hallucination** | ¿Cita fuentes falsas? |
| **Safety** | ¿Respuestas peligrosas? |
| **Privacy** | ¿Expone datos? |
| ** jailbreak** | ¿Inyección prompts? |

---

## 7. UI/UX

### 7.1 Chat Interface

```
┌────────────────────────────────────────────────┐
│ VeriTest.LAB Asistente      [_][X]        │
├────────────────────────────────────────────────┤
│                                        │
│  👤 ¿Qué significa un cultivo positivo?      │
│                                        │
│  🤖 Un cultivo positivo indica...         │
│  📚 [ISO 15189:8.2]                      │
│                                        │
│  [ typing... ]                            │
├────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────┐  │
│ │ Escribe tu pregunta...              │  │ Enviar │
│ └──────────────────────────────────────┘  │
└────────────────────────────────────────────────┘
```

### 7.2 Features

| Feature | Descripción |
|---------|-----------|
| **Typing indicator** | Show正在.escribiendo |
| **Sources** | Citas clicables |
| **Feedback** | 👍👎 rating |
| **Handoff** | Escalar a humano |

---

## 8. IMPLEMENTACIÓN ROADMAP

### Fase 1: Base (Semanas 1-2)

- [ ] Setup Pinecone/PGVector
- [ ] Embed documentos normativos
- [ ] Basic prompt + API

### Fase 2: enhance (Semanas 3-4)

- [ ] Mejorar chunks
- [ ] Few-shot examples
- [ ] Basic UI

### Fase 3: Production (Semanas 5-6)

- [ ] Testing interno
- [ ] Red teaming
- [ ] Deploy

---

*Diseño del chatbot para Proyecto VeriTest.LAB*
*Versión 1.0 — Abril 2026*