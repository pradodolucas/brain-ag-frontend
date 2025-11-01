# Brain Agriculture - Frontend

Sistema web para gestão de produtores rurais, suas propriedades e safras, desenvolvido com Next.js e TypeScript.

## 📚 Estrutura do Projeto

```
src/
├── app/                    # Rotas e páginas (Next.js App Router)
│   ├── layout.tsx         # Layout principal da aplicação
│   ├── page.tsx           # Página inicial (Dashboard)
│   ├── producer/          # Rotas de produtores
│   └── farm/             # Rotas de fazendas
├── components/            # Componentes reutilizáveis
│   ├── Button/
│   ├── Form/
│   ├── List/
│   ├── Modal/
│   └── Panel/
├── features/             # Funcionalidades específicas
│   └── Dashboard/
│       ├── ProducerOverview/
│       └── CropsAnalytic/
├── hooks/               # Hooks personalizados
├── libs/               # Utilitários e funções auxiliares
├── provider/           # Providers React (Theme, etc)
├── store/             # Estado global (Redux)
├── styles/            # Estilos globais e tema
├── templates/         # Layouts de página
└── types/             # Tipagem TypeScript
```

## 🛠 Tecnologias

- **Framework:** Next.js 16
- **Linguagem:** TypeScript
- **Estilização:** Emotion (CSS-in-JS)
- **Formulários:** React Hook Form + Zod
- **Estado Global:** Redux Toolkit
- **Gráficos:** Recharts

## 🚀 Principais Funcionalidades

### Gestão de Produtores
- Cadastro de Pessoa Física (CPF) e Jurídica (CNPJ)
- Edição e exclusão de produtores

### Gestão de Propriedades
- Cadastro de fazendas
- Registro de área total e área agricultável

### Dashboard
- Visão geral de produtores e propriedades
- Gráficos de distribuição de áreas
- Estatísticas gerais

## 💻 Como Executar

1. **Instalação de dependências:**
\`\`\`bash
npm install
\`\`\`

2. **Desenvolvimento:**
\`\`\`bash
npm run dev
\`\`\`

3. **Build:**
\`\`\`bash
npm run build
npm start
\`\`\`

## Docker

O projeto inclui configurações Docker para desenvolvimento e produção:

### Desenvolvimento
Para rodar em modo desenvolvimento com hot-reload:
```bash
docker-compose -f docker-compose.dev.yml up --build
```

### Produção
Para rodar em modo produção:
```bash
docker-compose up --build
```

## 📋 Padrões de Código

### Organização de Imports
```typescript
// React e Next.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Components
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'

// Hooks e Utils
import { useForm } from 'react-hook-form'
import { callApi } from '@/libs/utils/webservice'

// Types
import { ProducerProps } from '@/types/producer'
```

### Estrutura de Componentes
- Cada componente em sua pasta
- index.tsx para o componente
- styles.ts para estilização
- types.ts quando necessário

### Formulários
- Validação com Zod
- React Hook Form para gerenciamento
- Feedback visual de erros