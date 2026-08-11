/**
 * Project data — single source of truth for the Projects section.
 * To add a new project: add an object to `featuredProjects` (rich card + dialog)
 * or `otherProjects` (compact card) and it will render automatically.
 * `spotlightProject` is a single, larger showcase slot for the most complete
 * public project — currently iFriends, which spans three repositories.
 * All facts here are verifiable in the linked repositories — keep it that way.
 */

/** Full-width showcase project, rendered above the featured grid. */
export const spotlightProject = {
  id: "ifriends",
  name: "iFriends",
  mark: "iF",
  period: "2022",
  status: "TCC — IFSP",
  tagline: "Comunidade de perguntas, respostas e mentorias para o IFSP",
  summary:
    "Plataforma web criada como Trabalho de Conclusão de Curso: uma comunidade onde estudantes do IFSP tiram dúvidas entre si, encontram mentores por assunto e descobrem eventos de monitoria — com reputação, moderação de conteúdo e suporte a múltiplos idiomas.",
  role: "TCC em equipe de 5 pessoas (Bunka Bytes). Fui responsável pela supervisão do back-end, incluindo a administração do banco de dados.",
  highlights: [
    "API REST em Spring Boot com autenticação via JWT, Spring Security e documentação OpenAPI/Swagger",
    "Perguntas e respostas com tags, busca, filtros, curtidas e marcação como resolvida",
    "Gestão de eventos de mentoria, moderação com denúncias e gamificação por reputação",
    "Front-end em React com Redux Toolkit, Ant Design e internacionalização (i18next)",
  ],
  stack: ["Java", "Spring Boot", "Spring Security", "PostgreSQL", "React", "Redux Toolkit", "Ant Design", "i18next"],
  links: {
    github: "https://github.com/Bunka-Bytes",
  },
  repos: [
    { label: "Backend (API)", href: "https://github.com/Bunka-Bytes/ifriends-api" },
    { label: "Frontend (Web)", href: "https://github.com/Bunka-Bytes/ifriends-web" },
    { label: "Documentação (TCC)", href: "https://github.com/Bunka-Bytes/ifriends-documentos" },
  ],
};

export const featuredProjects = [
  {
    id: "proeventos",
    name: "ProEventos",
    mark: "PE",
    period: "2022",
    status: "Projeto de estudo concluído",
    tagline: "API + SPA para gestão de eventos",
    summary:
      "Sistema para cadastro e gestão de eventos, com API REST em C#/.NET separada por camadas e um front-end em Angular consumindo essa API.",
    role: "Desenvolvimento individual, construído camada por camada — banco de dados, API e SPA — acompanhando um curso completo de Full-Stack .NET + Angular.",
    highlights: [
      "API REST em ASP.NET Core organizada em controllers, services e repositórios",
      "Persistência e migrations com Entity Framework Core",
      "Front-end SPA em Angular (TypeScript) consumindo a API",
      "Projeto dividido em back/ (Web API) e front/ (Angular CLI)",
    ],
    stack: ["C#", "ASP.NET Core", "Web API", "Entity Framework Core", "Angular", "TypeScript", "SCSS"],
    links: {
      github: "https://github.com/koekoki/ProEventos",
    },
  },
  {
    id: "minhasfinancas-api",
    name: "API de Controle Financeiro",
    mark: "R$",
    period: "2022",
    status: "Projeto de estudo concluído",
    tagline: "Backend Java para lançamentos financeiros",
    summary:
      "API REST em Java e Spring Boot para controle financeiro pessoal: cadastro de usuários e lançamentos (receitas e despesas), com filtros por mês, ano, tipo e descrição.",
    role: "Projeto individual: modelagem do banco de dados, regras de negócio, API REST e testes unitários.",
    highlights: [
      "Entidades Usuario e Lancamento mapeadas com JPA, com enums para tipo e status do lançamento",
      "Endpoints REST completos (busca com filtros, criação, atualização e remoção)",
      "Endpoint dedicado para atualizar apenas o status de um lançamento",
      "Camadas separadas em model, service, api (DTO + resource) e exception, com testes unitários das regras de negócio",
    ],
    stack: ["Java", "Spring Boot", "Spring Data JPA", "PostgreSQL", "H2", "Lombok"],
    links: {
      github: "https://github.com/koekoki/minhasfinancas-api",
    },
  },
  {
    id: "kuarasy",
    name: "Kuarasy — E-commerce",
    mark: "K",
    period: "2021",
    status: "Projeto em equipe (escolar)",
    tagline: "Loja virtual para produtos artesanais de imigrantes",
    summary:
      "E-commerce construído em equipe de 5 pessoas para um projeto escolar do IFSP: uma loja virtual para produtos artesanais de origem étnica feitos por imigrantes no Brasil.",
    role: "Desenvolvimento em equipe; atuei no back-end em ASP.NET MVC e na integração com o banco de dados SQL Server.",
    highlights: [
      "Arquitetura MVC (Controllers, Models e Views) em ASP.NET",
      "Carrinho de compras e página de pagamento",
      "Validação de pedido por e-mail",
      "Persistência em SQL Server com CRUD completo de produtos",
    ],
    stack: ["C#", "ASP.NET MVC", "SQL Server", "Handlebars", "SCSS", "JavaScript"],
    links: {
      github: "https://github.com/IFSPKuarasy/kuarasy",
    },
  },
];

export const otherProjects = [
  {
    id: "site-daka",
    name: "Site DAKA",
    mark: "DK",
    period: "2021",
    summary:
      "Banco de questões para preparação de vestibular, pensado para ensinar através dos próprios erros. Foi meu primeiro site funcional, construído em equipe com documento de visão do projeto.",
    stack: ["PHP", "HTML", "CSS"],
    links: {
      github: "https://github.com/koekoki/Site-DAKA",
    },
  },
  {
    id: "jogo-maguinho",
    name: "Mage — Jogo de Probabilidade",
    mark: "JS",
    period: "2020",
    summary:
      "Jogo de probabilidade em JavaScript puro, construído durante a Imersão JavaScript da Alura.",
    stack: ["JavaScript", "CSS"],
    links: {
      github: "https://github.com/koekoki/jogoDoMaguinho",
    },
  },
  {
    id: "calculadora-aw1",
    name: "Calculadora",
    mark: "AW1",
    period: "2021",
    summary:
      "Calculadora simples em JavaScript, feita durante as aulas de Aplicações Web 1 (AW1) no IFSP.",
    stack: ["JavaScript", "HTML", "CSS"],
    links: {
      github: "https://github.com/koekoki/AW1",
      demo: "https://koekoki.github.io/AW1/Projeto/PB3/Calculadora/",
    },
  },
];
