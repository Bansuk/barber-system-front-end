# Barber System - Front-End 💈

Interface moderna e responsiva para o sistema completo de gestão de barbearias, desenvolvida com Next.js 16, React 19, TypeScript e TailwindCSS.

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
  - [Arquitetura do Sistema](#arquitetura-do-sistema)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [Integração com Back-End](#-integração-com-back-end)
  - [Comunicação entre Front-End e Back-End](#comunicação-entre-front-end-e-back-end)
- [Pré-requisitos](#-pré-requisitos)
  - [Para Execução Local](#para-execução-local)
  - [Para Execução com Docker](#para-execução-com-docker)
- [Instalação e Configuração](#-instalação-e-configuração)
  - [Execução Local](#execução-local)
  - [Execução com Docker (Recomendado)](#execução-com-docker-recomendado)
- [Uso](#-uso)
  - [Acessando a Aplicação](#acessando-a-aplicação)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Imagens do Sistema](#-imagens-do-sistema)
- [Contato](#-contato)

## 🎯 Sobre o Projeto

O **Barber System Front-End** é a interface de usuário do sistema de gestão de barbearias.

### Arquitetura do Sistema

O sistema é composto por três módulos principais que se comunicam através de APIs REST:

<img width="601" height="266" alt="Diagrama sem nome drawio" src="https://github.com/user-attachments/assets/c97c9fea-b850-41e0-8d10-dfec23dd0f84" />

**Legenda:**
- **Interface (Front-End)**: Esta aplicação - Next.js que consome a API
- **API (Back-End)**: API Flask com toda a lógica de negócio ([barber-system-back-end](https://github.com/Bansuk/barber-system-back-end))
- **Banco de Dados**: SQLite para persistência de dados
- **API Externa**: NumVerify para validação de números de telefone

## ✨ Funcionalidades

- **📊 Dashboard Interativo**: Visão geral com métricas e estatísticas em tempo real
- **👥 Gestão de Clientes**: Interface completa para cadastro, edição e visualização de clientes
- **💼 Gestão de Funcionários**: Controle de profissionais com serviços associados
- **✂️ Gestão de Serviços**: Cadastro e gerenciamento de serviços oferecidos
- **📅 Sistema de Agendamentos**: Interface intuitiva para criar e gerenciar agendamentos

## 🛠️ Tecnologias Utilizadas

[![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React_Query-5.90.12-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query/latest)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

**Principais Dependências:**
- **Next.js 16.0.7**: Framework React para produção com App Router
- **React 19.2.0**: Biblioteca para construção de interfaces
- **TypeScript 5**: Superset JavaScript com tipagem estática
- **TailwindCSS 4**: Framework CSS utility-first
- **React Query 5.90.12**: Gerenciamento de estado assíncrono e cache
- **React Query Devtools**: Ferramentas de desenvolvimento para React Query

## 🔗 Integração com Back-End

### Comunicação entre Front-End e Back-End

O front-end se comunica com o back-end através de uma API REST. A arquitetura segue o padrão cliente-servidor:

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONT-END (Next.js)                    │
│                                                             │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────┐    │
│  │  Components │ -> │ Custom Hooks │ -> │   Services   │    │
│  └─────────────┘    └──────────────┘    └──────────────┘    │
│                                                   │         │
└───────────────────────────────────────────────────┼─────────┘
                                                    │
                                         HTTP/REST (JSON)
                                                    │
┌───────────────────────────────────────────────────┼─────────┐
│                       BACK-END (Flask)            │         │
│                                                   ▼         │
│  ┌──────────┐    ┌──────────┐    ┌────────────┐             │
│  │  Routes  │ -> │ Business │ -> │ Repository │             │
│  └──────────┘    └──────────┘    └────────────┘             │
│                                          │                  │
│                                          ▼                  │
│                                   ┌────────────┐            │
│                                   │  Database  │            │
│                                   │  (SQLite)  │            │
│                                   └────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Pré-requisitos

### Para Execução Local

- **Node.js**: Versão 20 ou superior
```bash
$ node --version
v20.x.x
```
- **npm**: Gerenciador de pacotes (incluído com Node.js)
```bash
$ npm --version
10.x.x
```
- **Git**: Para clonar o repositório
```bash
$ git --version
git version 2.x.x
```
- **Back-End**: API rodando em `http://localhost:5000`

### Para Execução com Docker

- **Docker**: Versão 20.10 ou superior
```bash
$ docker --version
Docker version 20.10.x
```
- **Docker Compose**: Versão 2.0 ou superior
```bash
$ docker-compose --version
Docker Compose version v2.x.x
```

## 🚀 Instalação e Configuração

### Execução Local

**1. Clone o repositório:**
```bash
git clone https://github.com/Bansuk/barber-system-front-end.git
cd barber-system-front-end
```

**2. Instale as dependências:**
```bash
npm install
```

**43. Certifique-se de que o back-end está rodando:**

O back-end deve estar rodando em `http://localhost:5000`. Se você ainda não configurou o back-end, siga as instruções em [barber-system-back-end](https://github.com/Bansuk/barber-system-back-end).

**4. Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

**6. Acesse a aplicação:**

Abra seu navegador e acesse: [http://localhost:3000](http://localhost:3000)

### Execução com Docker (Recomendado)

A maneira mais fácil de executar todo o sistema (front-end + back-end) é usando Docker Compose. O arquivo `docker-compose.yml` já está configurado para iniciar ambos os serviços.

**1. Clone ambos os repositórios:**
```bash
# Clonar back-end
git clone https://github.com/Bansuk/barber-system-back-end.git

# Clonar front-end
git clone https://github.com/Bansuk/barber-system-front-end.git
```

Certifique-se de que ambos os projetos estão no mesmo diretório:
```
Projects/
├── barber-system-back-end/
└── barber-system-front-end/
```

**2. Configure as variáveis de ambiente do back-end:**

Crie um arquivo `.env` no diretório `barber-system-back-end/`:
```env
# API Key para validação de números de telefone (numverify)
API_KEY=sua_chave_api_aqui

# URL da API de validação
URL=https://apilayer.net/api/validate

# Formatação de resposta JSON (opcional)
PRETTIFY_JSON_RESPONSE=1
```

> **Nota**: Para obter uma chave API do NumVerify, consulte a [documentação do back-end](https://github.com/Bansuk/barber-system-back-end#-integração-com-numverify).

**3. Inicie os containers:**

A partir do diretório `barber-system-front-end`, execute:
```bash
docker-compose up --build
```

Ou para executar em background:
```bash
docker-compose up -d --build
```

**4. Aguarde a inicialização:**

O Docker Compose irá:
- Construir as imagens do back-end e front-end
- Iniciar o container do back-end na porta `5000`
- Iniciar o container do front-end na porta `3000`
- Criar uma rede para comunicação entre os containers

## 💻 Uso

### Acessando a Aplicação

Após iniciar o servidor de desenvolvimento (local ou Docker), acesse:
- **URL**: [http://localhost:3000](http://localhost:3000)
- **Documentação da API**: [http://localhost:5000/swagger-ui](http://localhost:5000/swagger-ui)

## 📁 Estrutura do Projeto

```
barber-system-front-end/
│
├── app/                          # App Router do Next.js
│   ├── (dashboard)/              # Grupo de rotas do dashboard
│   │   ├── appointments/         # Página de agendamentos
│   │   │   └── page.tsx
│   │   ├── customers/            # Página de clientes
│   │   │   └── page.tsx
│   │   ├── dashboard/            # Página do dashboard
│   │   │   └── page.tsx
│   │   ├── employees/            # Página de funcionários
│   │   │   └── page.tsx
│   │   └── services/             # Página de serviços
│   │       └── page.tsx
│   ├── layout.tsx                # Layout raiz
│   ├── page.tsx                  # Página inicial
│   └── globals.css               # Estilos globais
│
├── components/                   # Componentes React
│   ├── appointments/             # Componentes de agendamentos
│   │   ├── AddAppointmentModal.tsx
│   │   ├── AppointmentContent.tsx
│   │   ├── AppointmentForm.tsx
│   │   ├── AppointmentFormModal.tsx
│   │   ├── AppointmentTable.tsx
│   │   └── EditAppointmentModal.tsx
│   ├── customers/                # Componentes de clientes
│   ├── dashboard/                # Componentes do dashboard
│   ├── employees/                # Componentes de funcionários
│   ├── services/                 # Componentes de serviços
│   ├── layout/                   # Componentes de layout
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── MainLayout.tsx
│   ├── shared/                   # Componentes compartilhados
│   └── ui/                       # Componentes de UI base
│
├── hooks/                        # Custom Hooks
│   ├── useAppointmentForm.ts     # Hook para formulário de agendamentos
│   ├── useAppointments.ts        # Hook para gestão de agendamentos
│   ├── useCustomerForm.ts        # Hook para formulário de clientes
│   ├── useCustomers.ts           # Hook para gestão de clientes
│   ├── useDashboard.ts           # Hook para dados do dashboard
│   ├── useEmployeeForm.ts        # Hook para formulário de funcionários
│   ├── useEmployees.ts           # Hook para gestão de funcionários
│   ├── useServiceForm.ts         # Hook para formulário de serviços
│   ├── useServices.ts            # Hook para gestão de serviços
│   └── useEntityForm.ts          # Hook genérico para formulários
│
├── services/                     # Camada de serviços
│   ├── appointmentService.ts     # Serviço de agendamentos
│   ├── customerService.ts        # Serviço de clientes
│   ├── dashboardService.ts       # Serviço do dashboard
│   ├── employeeService.ts        # Serviço de funcionários
│   └── serviceService.ts         # Serviço de serviços
│
├── types/                        # Definições TypeScript
│   ├── appointment.ts            # Tipos de agendamentos
│   ├── customer.ts               # Tipos de clientes
│   ├── employee.ts               # Tipos de funcionários
│   ├── service.ts                # Tipos de serviços
│   ├── dashboard.ts              # Tipos do dashboard
│   ├── common.ts                 # Tipos comuns
│   └── index.ts                  # Exportações centralizadas
│
├── contexts/                     # React Contexts
│   └── ToastContext.tsx          # Context de notificações
│
├── providers/                    # React Providers
│   └── QueryProvider.tsx         # Provider do React Query
│
├── lib/                          # Utilitários
│   ├── api.ts                    # Configuração da API
│   ├── translations.ts           # Traduções e mensagens
│   └── utils/                    # Funções utilitárias
│
├── .env                          # Variáveis de ambiente (não versionado)
├── .gitignore                    # Arquivos ignorados pelo Git
├── docker-compose.yml            # Configuração Docker Compose
├── Dockerfile                    # Dockerfile para o front-end
├── eslint.config.mjs             # Configuração do ESLint
├── next-env.d.ts                 # Definições de tipos do Next.js
├── next.config.ts                # Configuração do Next.js
├── package.json                  # Dependências do projeto
├── package-lock.json             # Lock file do npm
├── postcss.config.mjs            # Configuração do PostCSS
├── README.md                     # Este arquivo
└── tsconfig.json                 # Configuração do TypeScript
```

## 📸 Imagens do Sistema

<!-- Adicione aqui capturas de tela da sua aplicação -->

### Dashboard
![Dashboard](https://github.com/user-attachments/assets/a35a486f-a1cd-4732-a011-3b74c3143f92)

### Gestão de Clientes
![Gestão de Clientes](https://github.com/user-attachments/assets/79f10c2e-d3c9-4bb3-bac9-cbe6514d37db)

### Gestão de Funcionários
![Gestão de Funcionários](https://github.com/user-attachments/assets/e591800a-4d27-4a54-bd1f-47ed7bf373e3)

### Gestão de Agendamentos
![Gestão de Agendamentos](https://github.com/user-attachments/assets/9292dee5-6707-473c-81be-e1f8aff982a5)
![Gestão de Agendamentos](https://github.com/user-attachments/assets/d60ad70e-1b46-42b7-b791-63b3284743f6)

### Gestão de Serviços
![Gestão de Serviços](https://github.com/user-attachments/assets/64795453-165d-4801-b490-9d0da0cca540)

## 📞 Contato

[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:brunobalbuena@gmail.com)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bruno-balbuena-778336138/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Bansuk)
