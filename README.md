# Portfólio Diego Garcia

Site estático de marca pessoal de Diego Garcia, desenvolvido com HTML, CSS e JavaScript puro.

## Estado atual

**Versão de entrega finalizada; manutenção evolutiva para novas informações curriculares.** Refatoração estrutural, polimento visual e validação local concluídos em 28/09/2026; resultados e limites estão registrados no documento de QA. Novas experiências, cursos, certificações e cases poderão ser incorporados mediante aprovação de conteúdo.

- Página única com oito abas: Sobre, Experiência, Formação, Habilidades, Projetos, Serviços, Informações adicionais e Contato.
- Navegação por hash, histórico do navegador, foco por teclado e tema claro/escuro persistente.
- Perfil com retrato autorizado, cartão integrado com contornos azuis, carrossel de dez logos em ordem aleatória e troca automática por fade.
- Acordeões acessíveis para experiências, habilidades, serviços e cursos; timeline cronológica de formação com marcadores anuais.
- Navegação móvel responsiva, com entrada inicial animada, reaparição flutuante ao rolar para cima e bloqueio durante alinhamentos automáticos.
- Cases publicados de RPE6 Strength Academy e Essentia Health em HTML estático; serviços de TI, criação de conteúdo e soluções web com valores públicos.
- WhatsApp, e-mail, cidade e currículo em PDF publicados; o currículo abre em uma página visualizadora local, em nova aba.
- Base de SEO preparada para `https://dgarcia.com.br/`: canônica, `robots.txt`, sitemap da homepage e do PDF, e dados estruturados de site e pessoa.

## Desenvolvimento e validação

O site não tem dependências de execução, framework, backend ou etapa de build. Para instalar as ferramentas de desenvolvimento e rodar a suíte Playwright, use `npm install`, `npx playwright install chromium` e `npm test`. Os testes iniciam um servidor local em `http://127.0.0.1:8080/` quando necessário. `npm run format:check` verifica a formatação.

## Estrutura técnica

- `index.html`: conteúdo, semântica e abas da página.
- `styles.css`: estilos visuais consolidados na ordem original das 16 folhas de estilo.
- `app.js`: inicialização explícita de módulos nativos do navegador — `navigation.js` (abas, hashes, histórico e ARIA), `theme.js`, `profile.js` (atuação, carrossel e assinatura), `background-network.js`, `motion.js`, `accordions.js` e `mobile-navigation.js`.
- `tests/portfolio.spec.js`: 34 verificações de navegação, semântica, interações, movimento, layout, fonte e currículo.
- `assets/`: PNGs transparentes originais dos logos, retrato original e variante WebP, fonte Caveat local, logos dos cases e currículo em PDF preservado.
- `robots.txt` e `sitemap.xml`: instruções públicas de rastreamento e descoberta para `dgarcia.com.br`.

## Documentação interna

- [Brief do projeto](documentacao/interno/01-project-brief.md)
- [Arquitetura do site](documentacao/interno/02-site-architecture.md)
- [Marca e assets](documentacao/interno/03-brand-and-assets.md)
- [Conteúdo e copy](documentacao/interno/04-content-and-copy.md)
- [Funil e ofertas](documentacao/interno/05-funnel-and-offers.md)
- [SEO, lançamento e QA](documentacao/interno/06-seo-launch-and-qa.md)
- [Backlog](documentacao/interno/07-backlog.md)
- [Matriz de evidências Sabesp](documentacao/interno/08-matriz-evidencias-sabesp.md)
- [Changelog](documentacao/interno/CHANGELOG.md)

Esta entrega confirma o funcionamento local; não certifica uma nova publicação em produção. Domínio, HTTPS, redirecionamento de `www`, cabeçalhos HTTP e Google Search Console não foram modificados nem verificados nesta rodada. Analytics, pixels e cookies não foram adicionados. A auditoria Lighthouse local comparada ao snapshot Git inicial está no documento 06; é uma medição de laboratório, não dado de campo.

Preservar em futuras refatorações: canvas animado mesmo sob redução de movimento (com pausa quando a página está oculta), qualidade e transparência dos PNGs, contraste aprovado e aprovação prévia para qualquer nova copy.
