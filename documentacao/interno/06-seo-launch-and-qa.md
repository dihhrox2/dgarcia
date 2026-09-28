# SEO, lançamento e QA

## Polimento visual — 28/09/2026

Este passe refinou interação e espaçamento sem alterar copy, paleta, assets, proporções identitárias ou configuração externa. O intervalo móvel entre navegação, perfil e painel passou de 12 px para 16 px; o desktop permaneceu inalterado. Controles principais recebem escala de pressionamento de 0,98× para ponteiro, enquanto teclado e redução de movimento permanecem sem movimento. Hover é restrito a ponteiro fino, e links de ação usam transição explícita de cor. No tema claro, botões inativos do menu agora acompanham o destaque azul no hover; o estado da aba ativa continua igual.

Foram capturadas 80 combinações antes e depois (oito abas × cinco larguras de 393, 560, 900, 1097 e 1440 px × dois temas), com transições CSS concluídas para estabilizar a geometria. O canvas permaneceu ativo por requisito de identidade. A matriz foi inspecionada visualmente em amostras representativas; diferenças geométricas intencionais limitam-se ao novo espaçamento móvel. Os dois testes acrescentados verificam o intervalo móvel, hover nos temas claro/escuro, feedback por ponteiro e ausência de escala na ativação por teclado e com movimento reduzido. A suíte completa (34/34) e a verificação de formatação foram executadas após o ajuste.

## Refatoração completa — 28/09/2026

**Estado do produto:** versão de entrega finalizada; manutenção evolutiva para futuras informações curriculares. Esta rodada não alterou copy, estrutura pública, aparência, domínio, hospedagem ou integrações externas.

| Verificação               | Resultado observado                                                                                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Testes automatizados      | 32 testes Playwright aprovados: abas/hash/histórico/teclado/ARIA; acordeões; tempos de movimento; redução de movimento; menu móvel; temas; breakpoints; carrossel; fonte local e visualizador do currículo.  |
| Comparação visual         | 80 estados: oito abas × cinco larguras (393, 560, 900, 1097 e 1440 px) × dois temas. Nenhum pixel diferente fora das máscaras de canvas, carrossel e texto rotativo.                                         |
| CSS e rede                | Mantida a ordem exata das 16 folhas de estilo; Lighthouse identificou 16 folhas locais render-blocking no snapshot e uma após a consolidação. Os estilos agora vêm de `styles.css`.                          |
| JavaScript                | `script.js` foi dividido em módulos nativos, coordenados por `app.js`; sem framework, bundler ou dependência de execução. Todos os arquivos JS passaram por `node --check`.                                  |
| Integridade               | Os 17 assets e o documento 08 têm hashes Git idênticos ao snapshot `de47817`; PDF original: SHA-256 `AD97732722C3BBF6C90BD14C9FCC5F7A67E07BA6CE60212361B651C7A086DF09`.                                      |
| Fonte e site estático     | Caveat local, sem pedidos a Google Fonts; currículo e carregamento Blob aprovados na suíte. Uma única folha CSS local.                                                                                       |
| Formatação e dependências | `npm run format:check` aprovado. Playwright 1.63.0 e Prettier são somente dependências de desenvolvimento; os testes usam o Chromium associado ao lockfile, instalado com `npx playwright install chromium`. |

### Lighthouse comparativo local (13.5.0)

O snapshot `de47817` e a versão refatorada foram servidos em duas portas locais e medidos no mesmo Chrome 154 e na mesma máquina. São dados de laboratório; os avisos do Chrome e do antivírus limitam a interpretação.

| Perfil  | Versão     | Performance | Acessibilidade | Boas práticas | SEO |   LCP |   CLS |  TBT |
| ------- | ---------- | ----------: | -------------: | ------------: | --: | ----: | ----: | ---: |
| Mobile  | Snapshot   |          46 |             96 |            77 | 100 | 7,1 s | 0,766 | 0 ms |
| Mobile  | Refatorada |          49 |             96 |            77 | 100 | 5,6 s | 0,766 | 0 ms |
| Desktop | Snapshot   |          98 |             96 |            77 | 100 | 1,0 s | 0,002 | 0 ms |
| Desktop | Refatorada |          99 |             96 |            77 | 100 | 0,9 s | 0,002 | 0 ms |

O CLS mobile de `0,766` reproduziu no snapshot anterior, portanto não foi introduzido por esta refatoração. O tempo de render-blocking estimado pelo Lighthouse foi influenciado por uma extensão do Kaspersky que injeta aproximadamente 203 KB de JavaScript HTTP; a única folha local consolidada ainda aparece como render-blocking (~607 ms no relatório mobile). O `/favicon.ico` ausente e os pedidos HTTP injetados contribuem para os alertas de boas práticas. Não foram adicionados favicon nem configuração externa, pois estão fora do escopo aprovado. INP não é medido por este teste de laboratório; TBT não o substitui. Esses números não representam desempenho de campo nem atestam publicação em produção.

Os relatórios brutos estão temporariamente em `C:/Users/Diego/AppData/Local/Temp/` (`dgarcia-refactor-baseline-live-*.json` e `dgarcia-refactor-after-*.json`); as capturas de comparação também são temporárias. Não são dependências do site. O servidor de comparação e a pasta extraída do snapshot foram usados somente na validação local.

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
- Não há dependências de execução, backend, formulário, cookies não essenciais, analytics, pixels ou eventos de conversão. Playwright e Prettier constam apenas como ferramentas de desenvolvimento no `package.json`.

## Regra de manutenção da identidade visual

O canvas de fundo deve continuar animado independentemente de `prefers-reduced-motion`. Refatorações de performance, acessibilidade ou movimento não devem incluir esse canvas em bloqueios, pausas ou simplificações de redução de movimento. A exceção se limita ao fundo; os demais efeitos seguem respeitando a preferência do sistema.

## Contraste preservado por requisito visual

Os rótulos azuis do resumo permanecem com as cores atuais. O contraste exigiria modificar de forma perceptível o texto ou o fundo dos rótulos, o que não está autorizado. Esta exceção deve ser reavaliada somente com aprovação visual explícita.

A auditoria final também sinalizou contraste em abas ativas, atuação rotativa, empregadores, anos, tipos de projeto, rótulos de contato e rodapé, dependendo do tema. As cores foram preservadas; não se declara conformidade WCAG integral.

## Validação anterior — 10/09/2026 (histórico)

**Versão de entrega finalizada; manutenção evolutiva para novas informações curriculares.** Validação executada em Chrome headless sobre `http://127.0.0.1:8080/`, sem publicação ou alteração de infraestrutura.

| Verificação                          | Resultado observado                                                                                                                                                                        |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Comparação antes/depois              | 80 capturas: oito abas × cinco larguras (393, 560, 900, 1097 e 1440 px) × dois temas; nenhuma diferença de pixels nas áreas estáveis nem de métricas de geometria/estilo capturadas        |
| Estados variáveis                    | Canvas, carrossel e texto rotativo mascarados na comparação estática; funcionamento validado separadamente, sem alegação de igualdade entre quadros aleatórios                             |
| Navegação funcional em 393 e 1097 px | Oito links diretos e reload de cada um; menu, histórico voltar/avançar, Contato, aliases, hash malformado, setas/Enter e 24 trocas rápidas aprovados                                       |
| Acordeões                            | Todos os controles dos quatro grupos testados em 393 e 1097 px; abertura, fechamento, exclusividade e fade de 300 ms preservados                                                           |
| Movimento                            | Entrada inicial de 500 ms; painel 100 ms + itens 200 ms; limpeza de classes após transições e ao ativar redução de movimento durante a troca                                               |
| Mobile                               | Menu flutuante, rolagem automática e controle de tema fixo no canto inferior verificados; sem reposicionamento indevido observado                                                          |
| Robustez                             | Tema e navegação funcionam com leitura/gravação de armazenamento bloqueadas; nenhum erro JavaScript não tratado capturado no fluxo funcional                                               |
| Assets                               | SHA-256 de todos os assets, PDF e documento 08 igual à referência anterior; Caveat local carregada sem requisições ao Google Fonts; carrossel e visualizador Blob do currículo funcionando |
| Semântica                            | Axe nas oito abas e dois temas: somente alertas de contraste, sem violações ARIA nos testes executados                                                                                     |
| Fonte do código                      | Todos os scripts passam na verificação de sintaxe; HTML não referencia os três controladores removidos; versões dos arquivos alterados atualizadas                                         |

### Lighthouse local — 13.4.1 (histórico)

| Perfil  | Performance | Acessibilidade | Boas práticas | SEO | LCP   | CLS | TBT   |
| ------- | ----------- | -------------- | ------------- | --- | ----- | --- | ----- |
| Mobile  | 74          | 96             | 77            | 100 | 5,1 s | 0   | 10 ms |
| Desktop | 98          | 96             | 77            | 100 | 1,0 s | 0   | 0 ms  |

Resultados de laboratório, não métricas de campo nem comparação equivalente ao relatório anterior do usuário. O ambiente injetou requisições HTTP do Kaspersky e o navegador solicitou `/favicon.ico` inexistente, apontados em boas práticas. O favicon depende de asset aprovado e não foi criado. Não há base para atribuir a nota mobile exclusivamente à refatoração ou ao antivírus. Repetir em produção e ambiente sem interferência antes de concluir sobre desempenho real; INP não foi medido e TBT não o substitui.

Os relatórios JSON/HTML foram gerados; algumas execuções do Lighthouse terminaram com erro de permissão ao limpar seu perfil temporário no Windows, inclusive após repetição com permissão. O JSON usado não contém `runtimeError`. As notas não representam um certificado de ausência absoluta de regressões.

Evidências desta execução estão em `C:/Users/Diego/AppData/Local/Temp/dgarcia-final-qa/`: capturas antes/depois, métricas, testes funcionais e relatórios Lighthouse. São arquivos temporários, não dependências do site; esta seção mantém o resumo durável.

## Propostas pendentes de aprovação de copy e assets

Nenhuma destas propostas foi inserida no site. Elas servem apenas para aprovação posterior.

| Item                      | Proposta                                                                                          | Dependência                      |
| ------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------- |
| Título                    | `Diego Rafael Garcia                                                                              | Tecnologia, suporte e operações` | Aprovação de copy |
| Meta description          | `Portfólio de Diego Rafael Garcia: tecnologia, suporte, infraestrutura, operação e soluções web.` | Aprovação de copy                |
| Open Graph e Twitter Card | Mesmo título e descrição aprovados, com imagem social dedicada                                    | Aprovação de copy e asset        |
| Favicon                   | Ícone de marca pessoal em formatos de navegador                                                   | Asset aprovado                   |

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
