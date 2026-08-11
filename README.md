# koekoki.github.io

Código-fonte do meu portfólio pessoal: [koekoki.github.io](https://koekoki.github.io).

## Stack

HTML, CSS e JavaScript puros (sem framework, sem build step) — servidos diretamente pelo GitHub Pages.

- **CSS** organizado em camadas: `tokens` (design tokens/tema claro-escuro) → `base` (reset e utilitários) → `components` (peças reutilizáveis: botões, cards, badges, timeline) → `main` (layout das seções e responsividade).
- **JavaScript** em módulos ES nativos (`type="module"`, sem bundler): tema claro/escuro com persistência, menu mobile acessível, revelação de conteúdo no scroll via `IntersectionObserver`, e renderização dos cards de projeto a partir de um arquivo de dados.
- **Dados dos projetos** centralizados em [`assets/js/data/projects.js`](assets/js/data/projects.js) — adicionar um projeto novo é só adicionar um objeto nesse arquivo.

## Estrutura

```
index.html
assets/
  css/    tokens.css · base.css · components.css · main.css
  js/
    data/       projects.js
    modules/    theme.js · nav.js · reveal.js · render-projects.js · back-to-top.js
    main.js
  img/    imagens otimizadas (web)
  fotos/  foto original e favicon
  fonts/  ícones (IcoMoon)
```

## Rodando localmente

Como não há build step, qualquer servidor estático funciona:

```bash
python -m http.server 4173
```

Depois é só abrir `http://localhost:4173`.
