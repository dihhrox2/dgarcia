# Marca e assets

## Direção visual implementada

- Marca pessoal: Diego Garcia.
- Tema escuro predominante, painel grafite e acento azul reservado a estados, indicadores e contornos do perfil.
- Tema claro disponível pelo seletor persistente.
- O retrato e o cartão de identificação formam um bloco conectado: a foto mantém o contorno azul, o cartão usa o mesmo fundo do painel e ambos compartilham uma junção de 2 px.
- Carrossel compacto de logos com arquivos padronizados, centralizados e sem corte.
- Assinatura visual: “O DESTINO É INEXORÁVEL”.

O site de Paulo Drefahl permanece somente como referência de atmosfera e estrutura. Não há reutilização de seus textos, código, imagens, ícones ou marca.

## Inventário de retratos e logos

| Arquivo ou grupo | Uso atual | Situação |
| --- | --- | --- |
| `assets/diego-garcia-profile-20260908.png` e `assets/diego-garcia-profile-800.webp` | Retrato exibido no cartão de perfil | PNG original preservado; WebP responsivo priorizado com fallback no HTML |
| `assets/diego-garcia-profile.png` | Arquivo mantido no repositório | Não é o retrato referenciado atualmente pelo HTML |
| Dez logos em `assets/logo-*.png` | Carrossel do perfil | PNGs originais com canal alpha, carregados sob demanda para Cisco, Cruzeiro do Sul, Cimcorp, Alura, Microsoft 365 Certified, Solutis, Caixa, Sabesp, Codex e Fundacc |
| `assets/fonts/caveat-latin*.woff2` | Assinatura visual no rodapé | Arquivos oficiais da Caveat, servidos localmente nos pesos 500–600 com cobertura latina e latina estendida |
| Logos dos cases | Cartões RPE6 Strength Academy e Essentia Health | Publicados com os respectivos cases |

## Política de manutenção

Na entrega final de 10/09/2026, todos os assets e o PDF permaneceram byte a byte idênticos à referência anterior à refatoração, verificados por SHA-256. PNGs originais transparentes são a fonte definitiva dos logos; não substituir por variantes degradadas. Retrato, Caveat local, cores e tempos de animação foram preservados. Nova copy depende de aprovação prévia.

Todo novo asset exige origem, autorização de uso, finalidade e registro no changelog. Não há logotipo independente aprovado; o nome tipográfico é apenas texto de interface.
