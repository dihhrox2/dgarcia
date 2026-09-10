# Changelog

- Recriado o contorno do perfil com uma borda externa de 1 px no agrupamento e uma divisória de 1 px na identificação; removida a camada sobreposta anterior.
- Aumentados para 2 px o contorno externo e a divisória do perfil para melhorar a estabilidade visual em diferentes painéis e larguras.

## 2026-09-10

### Adicionado

- Adicionado ao cartão de perfil um carrossel de logos fornecidos, com ordem aleatória a cada carregamento e transições de fade.
- Incluído na timeline de 2026 o curso “Segurança da Informação para todos: Proteja você e sua empresa contra ameaças cibernéticas”, da Alura.
- Publicados os itens, valores e observações de cobrança dos serviços de TI, criação de conteúdo e soluções web.
- Publicado no primeiro cartão do portfólio o case RPE6 Strength Academy, com logo fornecido, acesso ao site e descrição aprovada.
- Registrados no case uma página, estimativa de cinco dias de produção e investimento de R$ 700; os criativos foram fornecidos pelo proprietário.
- Publicado no segundo cartão do portfólio o case Essentia Health, com logo fornecido, acesso ao site e descrição aprovada.
- Registrados no case seis páginas, estimativa de 20 dias de produção, investimento de R$ 1.500 e criação integral dos criativos por Diego Garcia.

### Alterado

- Substituída a série de logos do carrossel por arquivos padronizados em 1942 × 809 px e removidos os ajustes de escala individuais.
- Ajustada a grade de projetos em largura intermediária para preservar a legibilidade dos cartões.
- Removidos do cartão de perfil os atalhos de telefone e e-mail; os canais continuam publicados na aba Contato.
- Ampliado o nome no cartão de perfil e aplicado contorno azul interno de 2 px ao retrato.
- Substituído o link de telefone da aba Contato por WhatsApp, com mensagem inicial preenchida.
- Adicionadas animações de entrada do menu e do painel Sobre a partir de trás do perfil; os fades de abas e conteúdos expansíveis duram 0,3 s e respeitam a redução de movimento.
- Tornada imediata a saída de abas e conteúdos expansíveis, mantendo apenas o fade-in de 0,3 s; o botão Contato do perfil agora abre a aba Contato.
- Ajustada a entrada inicial no celular para revelar menu e painel por recorte, sem deslocar a composição durante a animação.
- Restaurado o movimento puro na entrada móvel: menu e conteúdo partem de trás da foto em qualquer aba aberta diretamente; fora da aba Sobre, o perfil é exibido apenas durante a animação inicial.
- Sincronizada a entrada inicial com o menu flutuante no celular, fixado o viewport no topo e limitado a 80 px o deslocamento inicial do painel de conteúdo.
- Movidos os marcadores anuais para o fim de cada grupo de cursos e bloqueado o menu flutuante durante alinhamentos automáticos do viewport.
- Reorganizada a cronologia de cursos e certificações para encerrar os grupos nos anos 2026, 2025, 2024, 2021, 2011 e 2004; os marcadores foram alinhados às datas em desktop e mobile.
- Padronizados os espaçamentos e a posição móvel de todas as datas e bolinhas da timeline.
- Integrados visualmente foto e cartão de identificação, com contornos azuis compartilhados, junção de 1 px e fundo do cartão igual ao painel.
- Ajustado o menu móvel flutuante para conservar a largura e o alinhamento do menu em fluxo durante sua entrada.
- Refinada a entrada da aba Sobre: o painel faz fade em 0,1 s e, em seguida, os dois blocos de apresentação e as seis competências aparecem juntos em 0,2 s, respeitando a redução de movimento.
- Estendida a entrada em camadas para todas as abas, com fade simultâneo de 0,2 s apenas nos conteúdos visíveis de cada painel.
- Configurado o recarregamento explícito para retornar à aba Sobre e atualizar a URL para `#sobre`, preservando os links diretos por hash em novas navegações.
- Reduzidos para 1 px os contornos azuis do retrato e do cartão de identificação, preservando a junção visual entre ambos.
- Removida a borda superior duplicada do cartão de identificação para manter uma única linha azul de 1 px na divisão com o retrato.
- Unificada a largura calculada e o eixo horizontal do retrato e do cartão de identificação para preservar o alinhamento dos contornos em todas as larguras.
- Consolidado o retrato e a identificação em um único contorno azul de 1 px, com uma única linha interna entre os dois blocos.
- Movido o contorno compartilhado do perfil para uma camada sobreposta, mantendo sua visibilidade sobre o retrato nos temas claro e escuro.

### Documentado

- Sincronizados README e documentos internos com os recursos, conteúdo publicado, QA e pendências atuais; a matriz de evidências Sabesp foi preservada sem alterações.

## 2026-09-09

### Alterado

- Reorganizada a experiência móvel para manter todo o conteúdo dentro da viewport e exibir o perfil apenas na aba Sobre.
- Ajustada a foto de perfil, o cartão de identidade e as superfícies contrastantes com cartões arredondados.
- Transformadas as experiências, habilidades, serviços e cursos em acordeões acessíveis; todos carregam fechados.
- Compactada a formação acadêmica e incluída a timeline de cursos em acordeão próprio.
- Adicionadas as competências Gestão de serviços de TI e IA aplicada, totalizando seis competências centrais.
- Aplicada superfície semântica de contraste a conteúdos explicativos e padronizados os cartões de Formação, Contato e Informações adicionais.
- Removidas as introduções provisórias das abas Projetos e Serviços.
- Criada navegação móvel flutuante ao rolar para cima, sem alterar a composição de desktop.
- Ajustado o contato para impedir extravasamento do e-mail em painéis estreitos.
- Atualizados títulos e rótulos principais para branco, mantendo indicadores de interação em azul.

### Documentado

- Sincronizados README e documentos internos com o estado atual da implementação local, pendências e limites de publicação.

## 2026-09-08

### Alterado

- Substituída a imagem de perfil pelo retrato autorizado mais recente.
- Transformados os cartões de Serviços em menus expansíveis exclusivos e acessíveis.
- Adicionada a aba Serviços, com cartões editáveis para TI, criação e IA e campos de preço inicial.
- Convertida visualmente a assinatura pessoal para letras maiúsculas.
- Adicionado marcador central do ano vigente no topo da timeline de cursos.
- Movidos os marcadores anuais para o último cartão de cada grupo da timeline de cursos.
- Agrupados os indicadores anuais da timeline de cursos e alinhado o título Cursos e certificações ao cabeçalho da Formação.
- Consolidado o título da aba como Formação acadêmica, com remoção do cabeçalho interno duplicado.
- Reordenada a Formação acadêmica e removida a borda do último item.
- Substituídas as colunas de cursos por timeline cronológica alternada, com eixo lateral em telas pequenas.
- Ajustado o título visual do cartão de perfil para Diego Garcia, preservando o nome completo em metadados e acessibilidade.
- Unificada a antiga aba Cursos e certificações à aba Formação, com preservação do endereço legado `#cursos`.
- Substituído o monograma provisório pelo retrato profissional autorizado de Diego Garcia.
- Remodelada a aba Habilidades em grupos de Tecnologia e operação e Criação e inovação.
- Adicionados cartões públicos para atendimentos e incidentes, sistemas e endpoints, identidade e acessos, aplicativos corporativos, redes e conectividade, ativos e operação de campo, e documentação e procedimentos.
- Adicionada a competência Programação com IA, com referência a vibe coding e uso do Codex.
- Incluída em Informações adicionais uma síntese genérica de experiência em operação de TI corporativa.

### Documentado

- Registrada a auditoria sanitizada da base relacionada à Sabesp como evidência interna para a curadoria de competências.
- Mantida a restrição de não publicar conversas, contatos, protocolos, arquivos, dados operacionais ou outros detalhes confidenciais.

## 2026-09-07

### Adicionado

- Pacote inicial de documentação interna para o portfólio Diego Garcia.
- Brief, arquitetura, marca e assets, conteúdo, funil, SEO/QA e backlog.
- README com estado do projeto e navegação documental.

### Impacto

O projeto passa a ter uma base única para registrar decisões confirmadas, pendências e critérios da futura implementação. Nenhum código, asset ou configuração de publicação foi criado ou alterado.

### Alterado

- Revisada a estrutura do portfólio com base no currículo fornecido por Diego Garcia e na referência visual indicada.
- Incluídas previsões para hero com foto, competências, trajetória, formação, habilidades, projetos pessoais, certificações/conquistas, tema e blocos expansíveis.
- Registrada a direção visual de tema escuro, painéis grafite e acento azul, sem reutilização de conteúdo ou assets da referência.
- Mantidos dados pessoais e canais de contato fora do conteúdo público até aprovação explícita.

### Impacto da revisão

A documentação agora orienta um portfólio completo de tecnologia ampla, preservando projetos, foto, contato e itens de conquista como pendências de aprovação. Nenhum código, asset, link público ou configuração de publicação foi criado ou alterado.

### Implementado

- Criada a primeira página estática em `index.html`, `styles.css` e `script.js`.
- Implementadas as seções de apresentação, competências, trajetória, formação, habilidades, projetos em curadoria, formação contínua e contato pendente.
- Adicionados tema escuro/claro, cartões com rolagem por teclado e toque, e blocos expansíveis semânticos.

### Impacto da implementação

O portfólio já pode ser visualizado localmente. Foto, projetos pessoais, contatos públicos, links sociais e itens de certificações/conquistas permanecem pendentes e não foram publicados.

### Redesenhado

- Substituída a composição vertical por um painel de três colunas inspirado na referência aprovada.
- Adicionadas barra lateral por abas, cartão de perfil fixo e painel interno rolável para conteúdo.
- Mantidos monograma provisório, dados profissionais aprovados e ausência de contatos, links e projetos fictícios.

### Ampliado

- Integradas as informações do currículo em abas de experiência, formação, cursos, habilidades, informações adicionais e contato.
- Adicionado cálculo de idade a partir de 29/09/1989 e links públicos de telefone e e-mail.
- Criada vitrine de projetos com estrutura de dados para itens online e offline, mantendo exemplos desativados até aprovação de destinos.
- Excluído o endereço físico e adicionados marcadores `A confirmar` para vínculos profissionais incompletos.
- Confirmados no currículo os sete vínculos profissionais com empresa e período, de Caixa Econômica Federal (2004–2006) a Solutis (2021–2026).
- Reestruturados os registros profissionais para destacar empresa e período, com o cargo em uma segunda linha; a experiência complementar foi movida para Informações adicionais.
- Registrada a atuação terceirizada em TI na Sabesp nos vínculos com Solutis e Cimcorp.
- Adicionados links diretos por âncora para cada aba do painel, com compatibilidade para `#inicio` e sincronização com o histórico do navegador.
- Substituídos os ícones da navegação lateral pelos nomes das seções.
- Compactada a largura da navegação textual e fixadas as quebras de linha em Cursos e certificações e Informações adicionais.
- Refinada a aba Sobre: rótulos compactos, remoção da instrução redundante e texto de atuação rotativo com efeito de digitação.
- Uniformizada a largura dos rótulos do resumo e mantido o carrossel de atuação ativo independentemente da preferência de redução de movimento do sistema.
- Ampliada a aba Habilidades com criação audiovisual, design e conteúdo visual, IA generativa e LLMs, e conteúdo para redes sociais.
- Personalizada a barra de rolagem com trilho preto e indicador azul.
- Substituído o controle único de tema por seletores de sol e lua com destaque azul para o tema ativo.
- Ajustado o seletor de tema para dispor os ícones horizontalmente e aplicar azul diretamente ao ícone ativo.
- Consolidado o seletor em um único botão que alterna os temas e sinaliza o estado por meio dos ícones de sol e lua.
