# SEO, lançamento e QA

## Estado técnico confirmado localmente

- A página única declara `https://dgarcia.com.br/` como URL canônica absoluta. As oito abas usam hashes apenas para navegação da interface; hashes não entram na canônica nem no sitemap.
- `robots.txt` permite rastreamento público e aponta para `https://dgarcia.com.br/sitemap.xml`.
- `sitemap.xml` lista somente a homepage e o arquivo original `assets/Diego-Garcia-Analista-TI-Curriculo.pdf`.
- `curriculo.html` continua com `noindex`. Ele serve exclusivamente como página local de visualização; o PDF original permanece indexável e sem alteração de nome, bytes ou metadados.
- O cabeçalho contém JSON-LD de `WebSite` e `Person`, com URL, retrato, descrição e contatos já publicados. Dados estruturados melhoram a compreensão do conteúdo, mas não garantem destaque ou posicionamento.
- O título e a meta description existentes foram preservados. Não foram adicionados Open Graph, Twitter Card, favicon ou imagem social porque assets e textos correspondentes ainda não foram aprovados.
- Os cases RPE6 Strength Academy e Essentia Health estão no HTML estático, preservando textos e links publicados; os scripts permanecem responsáveis pelas interações.
- O retrato tem dimensões explícitas, variante WebP priorizada e fallback PNG. Os logos do carrossel mantêm os PNGs originais com canal alpha, dimensões explícitas e carregamento sob demanda do item atual e do próximo.
- O canvas de fundo não é iniciado quando `prefers-reduced-motion: reduce` está ativo. As animações e comportamentos de abas, hashes, tema e carrossel permanecem independentes dessa melhoria.
- Não há dependências, backend, formulário, cookies não essenciais, analytics, pixels ou eventos de conversão.

## Propostas pendentes de aprovação de copy e assets

Nenhuma destas propostas foi inserida no site. Elas servem apenas para aprovação posterior.

| Item | Proposta | Dependência |
| --- | --- | --- |
| Título | `Diego Rafael Garcia | Tecnologia, suporte e operações` | Aprovação de copy |
| Meta description | `Portfólio de Diego Rafael Garcia: tecnologia, suporte, infraestrutura, operação e soluções web.` | Aprovação de copy |
| Open Graph e Twitter Card | Mesmo título e descrição aprovados, com imagem social dedicada | Aprovação de copy e asset |
| Favicon | Ícone de marca pessoal em formatos de navegador | Asset aprovado |

## Validação local executada

- [x] HTML com título, description, canônica absoluta, robots e JSON-LD sintaticamente verificáveis.
- [x] Sitemap XML e `robots.txt` presentes e coerentes com a URL preferida.
- [x] Homepage e PDF são as únicas URLs listadas para descoberta; `curriculo.html` mantém `noindex`.
- [x] Cards de projetos presentes na fonte HTML sem depender de JavaScript.
- [x] Recursos essenciais possuem dimensões explícitas onde aplicável; retrato, logo atual e próximo logo carregam sem bloquear todos os logos.
- [x] Redução de movimento evita o canvas de fundo, além dos controles de movimento existentes.
- [ ] Auditorias de LCP, CLS, INP, acessibilidade e boas práticas em navegador mobile e desktop após publicação.

## Publicação e validação em produção

- [ ] Apontar `dgarcia.com.br` para a hospedagem com HTTPS válido.
- [ ] Configurar redirecionamento permanente de `www.dgarcia.com.br` para `https://dgarcia.com.br/`.
- [ ] Confirmar status HTTP, canônica, `robots.txt`, sitemap e PDF em URLs públicas.
- [ ] Configurar MIME correto: PDF como `application/pdf`; CSS como `text/css`; JavaScript como `text/javascript` ou `application/javascript`.
- [ ] Configurar cache de longa duração para assets versionados, sem reter HTML desatualizado.
- [ ] Confirmar que nenhum recurso essencial está bloqueado para rastreadores.
- [ ] Criar e verificar a propriedade de domínio `dgarcia.com.br` no Google Search Console.
- [ ] Enviar o sitemap, inspecionar homepage e PDF, solicitar indexação e acompanhar cobertura, consultas, impressões, cliques, CTR e Core Web Vitals.
- [ ] Testar visualmente desktop, 956 px, 393 px e 320 px nos dois temas; testar todas as abas, hashes diretos, histórico, foco por teclado, acordeões, entrada inicial, fades, carrossel e navegação móvel.

## Limites de evidência

O repositório confirma apenas a preparação local. Não há evidência de hospedagem pública, DNS, HTTPS, redirecionamento, cabeçalhos HTTP, resultados de auditoria em produção ou propriedade verificada no Search Console.
