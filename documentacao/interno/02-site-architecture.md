# Arquitetura do site

## Base técnica

| Tema        | Estado atual                                                                               |
| ----------- | ------------------------------------------------------------------------------------------ |
| Tipo        | Site estático de página única com abas internas                                            |
| Tecnologias | HTML, CSS e módulos nativos de JavaScript                                                  |
| Execução    | Servidor HTTP local                                                                        |
| Validação   | Playwright e Prettier como dependências apenas de desenvolvimento                          |
| Publicação  | Arquivos prontos para `https://dgarcia.com.br/`; hospedagem não configurada no repositório |
| Dados       | Conteúdo mantido diretamente nos arquivos estáticos                                        |

## Estrutura e comportamento

`main.app-shell` organiza navegação, cartão de perfil e painel de conteúdo. Em desktop, a composição usa três colunas; até 900 px passa a uma coluna.

- Navegação: oito abas com padrão ARIA de tablist/tab/tabpanel, hashes diretos, histórico e teclado.
- Perfil: retrato WebP priorizado com fallback, cartão conectado, atuação rotativa, cidade, carrossel de dez PNGs originais transparentes carregados sob demanda, link para página visualizadora local do currículo em PDF em nova aba e atalho para Contato.
- Conteúdo: uma aba visível por vez, retorno ao topo do painel, entrada inicial de 500 ms, painel de 100 ms seguido dos itens simultâneos de 200 ms; expansíveis de 300 ms. A redução de movimento é respeitada nesses efeitos.
- Tema: alternância claro/escuro persistida em `localStorage` quando permitido; falhas de armazenamento não impedem a troca durante a sessão.
- Mobile: perfil permanente apenas em Sobre; em links diretos para outras abas ele aparece temporariamente como origem da animação inicial. O menu flutuante preserva a largura do menu em fluxo e fica oculto durante rolagens automáticas.

## Abas e interações

| Aba                    | Conteúdo e estado                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| Sobre                  | Apresentação, informações pessoais e seis competências centrais.                             |
| Experiência            | Sete registros em acordeões exclusivos, todos fechados inicialmente.                         |
| Formação               | Três registros acadêmicos e timeline cronológica em acordeão fechado.                        |
| Habilidades            | Dois grupos exclusivos, fechados inicialmente; a abertura pode alinhar o viewport no mobile. |
| Projetos               | Cases publicados RPE6 Strength Academy e Essentia Health, presentes no HTML estático.        |
| Serviços               | Três acordeões exclusivos com itens, valores e observações publicados.                       |
| Informações adicionais | Quatro itens descritivos.                                                                    |
| Contato                | WhatsApp, e-mail e cidade; canais ativos onde aplicável.                                     |

Os controles expansíveis usam botões, `aria-expanded`, `aria-controls`, regiões vinculadas e conteúdo oculto fora da navegação por teclado. O carrossel expõe somente o logo visível à leitura assistiva.

## Arquivos

- `index.html`: estrutura, conteúdo e semântica.
- `robots.txt` e `sitemap.xml`: descoberta pública da homepage canônica e do PDF do currículo.
- `styles.css`: agrega as regras das 16 folhas anteriores, preservando sua ordem de cascata e versão de cache; a página agora solicita uma folha em vez de 16.
- `app.js`: ponto de inicialização e coordenação dos módulos locais; não adiciona framework, bundler nem etapa de build.
- `navigation.js`: seleção exclusiva de aba, hash, histórico, estado ARIA, teclado e link de Contato. Hash malformado é tolerado, aliases são preservados e reload retorna a Sobre.
- `theme.js`: escolha persistente de tema, com funcionamento em sessão quando o armazenamento é bloqueado.
- `profile.js`: idade, texto rotativo, carrossel aleatório com PNGs originais sob demanda e posição da assinatura.
- `background-network.js`: canvas interativo, cor em cache atualizada no evento `portfolio:theme-change`, animação independente de redução de movimento e pausa com documento oculto.
- `motion.js`: duração e limpeza dos fades, animação inicial e rolagem automática; recebe `portfolio:tab-change` e expõe a API `PortfolioMotion` para `accordions.js`.
- `accordions.js`: estado compartilhado dos quatro grupos, com exclusividade e apresentação delegada a `motion.js`.
- `mobile-navigation.js`: posição/visibilidade do menu móvel e tratamento dos eventos de animação inicial e rolagem automática.
- `tests/portfolio.spec.js`: testes Playwright repetíveis para navegação, ARIA, quatro acordeões, efeitos, tema, breakpoints, carrossel, fonte e currículo. Instalação: `npm install` e `npx playwright install chromium`; execução: `npm test`; formatação: `npm run format:check`.

O canvas armazena a cor azul e a atualiza no evento `portfolio:theme-change`, sem consultar estilos a cada quadro. Continua animado sob redução de movimento e mantém a pausa existente quando o documento está oculto. Trocas rápidas de aba e mudanças da preferência de movimento limpam temporizadores de transição.

O cabeçalho de `index.html` declara a canônica `https://dgarcia.com.br/`, rastreamento público e JSON-LD de `WebSite` e `Person`, usando apenas fatos já públicos. A fonte Caveat local é declarada em `styles.css` e servida de `assets/fonts/`. `curriculo.html` continua `noindex`; o PDF original é descoberto pelo sitemap. Não há API, backend, CMS, formulário, analytics ou dependências de execução.
