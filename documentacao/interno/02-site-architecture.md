# Arquitetura do site

## Decisões técnicas confirmadas

| Tema | Decisão |
| --- | --- |
| Tipo de site | Estático, página única |
| Base técnica | HTML, CSS e JavaScript puro |
| Publicação prevista | GitHub Pages |
| Atualização futura | Edição manual de arquivos versionados no repositório |

## Estrutura futura

A página única deverá usar navegação por âncoras e seguir a hierarquia abaixo, inspirada de perto na referência indicada pelo usuário, mas construída com identidade própria:

1. Hero: foto profissional, nome, posicionamento em tecnologia ampla, redes/links somente quando aprovados e CTA de contato.
2. Apresentação: bio curta e resumo de competências.
3. Competências: cartões horizontais navegáveis para frentes de atuação.
4. Trajetória e formação: blocos expansíveis, com itens selecionados do currículo e textos aprovados.
5. Habilidades: categorias e tecnologias/ferramentas aprovadas.
6. Projetos pessoais: cartões horizontais; nenhum item será publicado antes do fornecimento dos dados exigidos.
7. Certificações e conquistas: seção prevista, inicialmente sem itens públicos.
8. Contato: CTA sem URL, e-mail, telefone ou formulário até definição posterior.

Os cartões horizontais devem oferecer alternativa acessível à rolagem por toque. Os blocos expansíveis e a alternância de tema precisam manter navegação por teclado, foco visível e estado compreensível por leitores de tela.

## Componentes e dados

A implementação estática usa `index.html` para conteúdo e estrutura, `styles.css` para tema e responsividade e `script.js` para alternância de tema, rolagem dos cartões e ano do rodapé. Não há API, backend ou modelo de dados.

O conteúdo futuro será mantido diretamente em arquivos do site até que uma mudança de escopo aprove outra solução. Para cada projeto pessoal, a fonte de conteúdo deverá conter: título, contexto, contribuição de Diego, tecnologias, resultado aprovado, imagem autorizada e link opcional.

## Integrações

- Canal de contato: pendente; não incluir URL, e-mail, telefone ou mensageria antes de fornecimento e aprovação.
- Formulários, CRM e automações: não se aplicam na primeira versão, pois não haverá coleta no site.
- Analytics: não se aplica inicialmente; não há ferramenta definida.
- Redes profissionais e currículo para download: pendentes; não criar destinos ou arquivos provisórios.

## Ambientes e publicação

- Desenvolvimento: ambiente local a ser definido na implementação.
- Produção: GitHub Pages.
- Domínio próprio e hospedagem complementar: pendentes; GitHub Pages não autoriza presumir domínio final.

Antes do primeiro deploy, definir repositório de publicação, ramo/origem de deploy e domínio, se houver. Veja o checklist em [SEO, lançamento e QA](06-seo-launch-and-qa.md).
