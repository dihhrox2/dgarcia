# Arquitetura do site

## Base técnica

| Tema | Estado atual |
| --- | --- |
| Tipo | Site estático de página única com abas internas |
| Tecnologias | HTML, CSS e JavaScript puro |
| Execução | Servidor HTTP local |
| Publicação | Arquivos prontos para `https://dgarcia.com.br/`; hospedagem não configurada no repositório |
| Dados | Conteúdo mantido diretamente nos arquivos estáticos |

## Estrutura e comportamento

`main.app-shell` organiza navegação, cartão de perfil e painel de conteúdo. Em desktop, a composição usa três colunas; até 900 px passa a uma coluna.

- Navegação: oito abas, hashes diretos, histórico e teclado.
- Perfil: retrato WebP priorizado com fallback, cartão conectado, atuação rotativa, cidade, carrossel de dez logos WebP carregados sob demanda, link para página visualizadora local do currículo em PDF em nova aba e atalho para Contato.
- Conteúdo: uma aba visível por vez, retorno ao topo do painel e fade-in de 0,3 s nas trocas e conteúdos expansíveis quando permitido pelo sistema.
- Tema: alternância claro/escuro persistida em `localStorage`.
- Mobile: perfil permanente apenas em Sobre; em links diretos para outras abas ele aparece temporariamente como origem da animação inicial. O menu flutuante preserva a largura do menu em fluxo e fica oculto durante rolagens automáticas.

## Abas e interações

| Aba | Conteúdo e estado |
| --- | --- |
| Sobre | Apresentação, informações pessoais e seis competências centrais. |
| Experiência | Sete registros em acordeões exclusivos, todos fechados inicialmente. |
| Formação | Três registros acadêmicos e timeline cronológica em acordeão fechado. |
| Habilidades | Dois grupos exclusivos, fechados inicialmente; a abertura pode alinhar o viewport no mobile. |
| Projetos | Cases publicados RPE6 Strength Academy e Essentia Health, presentes no HTML estático. |
| Serviços | Três acordeões exclusivos com itens, valores e observações publicados. |
| Informações adicionais | Quatro itens descritivos. |
| Contato | WhatsApp, e-mail e cidade; canais ativos onde aplicável. |

Os controles expansíveis usam botões, `aria-expanded`, `aria-controls`, regiões vinculadas e conteúdo oculto fora da navegação por teclado. O carrossel expõe somente o logo visível à leitura assistiva.

## Arquivos

- `index.html`: estrutura, conteúdo e semântica.
- `robots.txt` e `sitemap.xml`: descoberta pública da homepage canônica e do PDF do currículo.
- `styles.css`: base visual.
- CSS especializado: `navigation.css`, `about.css`, `experience.css`, `education.css`, `skills.css`, `services.css`, `theme.css`, `accessibility.css`, `semantic-surfaces.css`, `logo-carousel.css`, `motion.css`, `scrollbar.css` e `background-network.css`.
- Scripts: `script.js`, `motion.js`, `mobile-navigation.js`, `experience-accordion.js`, `skills-accordion.js` e `education-accordion.js`.

O cabeçalho de `index.html` declara a canônica `https://dgarcia.com.br/`, rastreamento público e JSON-LD de `WebSite` e `Person`, usando apenas fatos já públicos. `curriculo.html` continua `noindex`; o PDF original é descoberto pelo sitemap. Não há API, backend, CMS, formulário, analytics ou integração externa.
