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
- A Caveat é servida localmente em WOFF2, com pesos 500–600, cobertura latina e latina estendida e `font-display: swap`; não há dependência do Google Fonts.
- O canvas de fundo permanece ativo mesmo quando `prefers-reduced-motion: reduce` está ativo, por ser parte essencial da identidade visual. As demais animações e comportamentos preservam suas regras próprias de redução de movimento.
- Não há dependências, backend, formulário, cookies não essenciais, analytics, pixels ou eventos de conversão.

## Regra de manutenção da identidade visual

O canvas de fundo deve continuar animado independentemente de `prefers-reduced-motion`. Refatorações de performance, acessibilidade ou movimento não devem incluir esse canvas em bloqueios, pausas ou simplificações de redução de movimento. A exceção se limita ao fundo; os demais efeitos seguem respeitando a preferência do sistema.

## Contraste preservado por requisito visual

Os rótulos azuis do resumo permanecem com as cores atuais. O contraste exigiria modificar de forma perceptível o texto ou o fundo dos rótulos, o que não está autorizado. Esta exceção deve ser reavaliada somente com aprovação visual explícita.

A auditoria final também sinalizou contraste em abas ativas, atuação rotativa, empregadores, anos, tipos de projeto, rótulos de contato e rodapé, dependendo do tema. As cores foram preservadas; não se declara conformidade WCAG integral.

## Entrega final — 10/09/2026

**Versão de entrega finalizada; manutenção evolutiva para novas informações curriculares.** Validação executada em Chrome headless sobre `http://127.0.0.1:8080/`, sem publicação ou alteração de infraestrutura.

| Verificação | Resultado observado |
| --- | --- |
| Comparação antes/depois | 80 capturas: oito abas × cinco larguras (393, 560, 900, 1097 e 1440 px) × dois temas; nenhuma diferença de pixels nas áreas estáveis nem de métricas de geometria/estilo capturadas |
| Estados variáveis | Canvas, carrossel e texto rotativo mascarados na comparação estática; funcionamento validado separadamente, sem alegação de igualdade entre quadros aleatórios |
| Navegação funcional em 393 e 1097 px | Oito links diretos e reload de cada um; menu, histórico voltar/avançar, Contato, aliases, hash malformado, setas/Enter e 24 trocas rápidas aprovados |
| Acordeões | Todos os controles dos quatro grupos testados em 393 e 1097 px; abertura, fechamento, exclusividade e fade de 300 ms preservados |
| Movimento | Entrada inicial de 500 ms; painel 100 ms + itens 200 ms; limpeza de classes após transições e ao ativar redução de movimento durante a troca |
| Mobile | Menu flutuante, rolagem automática e controle de tema fixo no canto inferior verificados; sem reposicionamento indevido observado |
| Robustez | Tema e navegação funcionam com leitura/gravação de armazenamento bloqueadas; nenhum erro JavaScript não tratado capturado no fluxo funcional |
| Assets | SHA-256 de todos os assets, PDF e documento 08 igual à referência anterior; Caveat local carregada sem requisições ao Google Fonts; carrossel e visualizador Blob do currículo funcionando |
| Semântica | Axe nas oito abas e dois temas: somente alertas de contraste, sem violações ARIA nos testes executados |
| Fonte do código | Todos os scripts passam na verificação de sintaxe; HTML não referencia os três controladores removidos; versões dos arquivos alterados atualizadas |

### Lighthouse local (13.4.1)

| Perfil | Performance | Acessibilidade | Boas práticas | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile | 74 | 96 | 77 | 100 | 5,1 s | 0 | 10 ms |
| Desktop | 98 | 96 | 77 | 100 | 1,0 s | 0 | 0 ms |

Resultados de laboratório, não métricas de campo nem comparação equivalente ao relatório anterior do usuário. O ambiente injetou requisições HTTP do Kaspersky e o navegador solicitou `/favicon.ico` inexistente, apontados em boas práticas. O favicon depende de asset aprovado e não foi criado. Não há base para atribuir a nota mobile exclusivamente à refatoração ou ao antivírus. Repetir em produção e ambiente sem interferência antes de concluir sobre desempenho real; INP não foi medido e TBT não o substitui.

Os relatórios JSON/HTML foram gerados; algumas execuções do Lighthouse terminaram com erro de permissão ao limpar seu perfil temporário no Windows, inclusive após repetição com permissão. O JSON usado não contém `runtimeError`. As notas não representam um certificado de ausência absoluta de regressões.

Evidências desta execução estão em `C:/Users/Diego/AppData/Local/Temp/dgarcia-final-qa/`: capturas antes/depois, métricas, testes funcionais e relatórios Lighthouse. São arquivos temporários, não dependências do site; esta seção mantém o resumo durável.

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
- [x] Canvas de fundo permanece animado sob redução de movimento; os demais controles de movimento mantêm suas regras próprias.
- [x] Navegação, link de Contato e texto rotativo usam ARIA compatível sem mudança visual.
- [x] Fonte Caveat carregada de assets locais, sem chamadas ao Google Fonts.
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

Esta rodada confirma a entrega e os testes locais, não o estado atual da publicação pública. DNS, HTTPS, redirecionamento, cabeçalhos HTTP, versão em produção e propriedade no Search Console não foram consultados nem modificados. Relatórios anteriores fornecidos pelo usuário não substituem uma verificação da versão final publicada.
