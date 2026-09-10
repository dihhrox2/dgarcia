# Portfólio Diego Garcia

Site estático local de marca pessoal de Diego Garcia, desenvolvido com HTML, CSS e JavaScript puro.

## Estado atual

- Página única com oito abas: Sobre, Experiência, Formação, Habilidades, Projetos, Serviços, Informações adicionais e Contato.
- Navegação por hash, histórico do navegador, foco por teclado e tema claro/escuro persistente.
- Perfil com retrato autorizado, cartão integrado com contornos azuis, carrossel de dez logos em ordem aleatória e troca automática por fade.
- Acordeões acessíveis para experiências, habilidades, serviços e cursos; timeline cronológica de formação com marcadores anuais.
- Navegação móvel responsiva, com entrada inicial animada, reaparição flutuante ao rolar para cima e bloqueio durante alinhamentos automáticos.
- Cases publicados de RPE6 Strength Academy e Essentia Health em HTML estático; serviços de TI, criação de conteúdo e soluções web com valores públicos.
- WhatsApp, e-mail, cidade e currículo em PDF publicados; o currículo abre em uma página visualizadora local, em nova aba.
- Base de SEO preparada para `https://dgarcia.com.br/`: canônica, `robots.txt`, sitemap da homepage e do PDF, e dados estruturados de site e pessoa.

## Como executar

Abra `index.html` por um servidor HTTP local. Não há dependências, etapa de build, backend ou configuração de publicação no repositório.

## Estrutura técnica

- `index.html`: conteúdo, semântica e abas da página.
- `styles.css`: base visual do layout.
- CSS especializado para navegação, perfil, experiência, formação, habilidades, serviços, tema, acessibilidade, superfícies, animações, carrossel e barra de rolagem.
- Scripts para abas, tema, fundo visual, acordeões, carrossel, animações e navegação móvel.
- `assets/`: fontes originais e variantes WebP responsivas do retrato e dos logos, logos dos cases e currículo em PDF publicado.
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

O repositório confirma somente o funcionamento local. A configuração de domínio, HTTPS, redirecionamento de `www`, cabeçalhos HTTP e Google Search Console ainda exige acesso ao provedor e à conta; analytics, pixels e cookies não foram adicionados.
