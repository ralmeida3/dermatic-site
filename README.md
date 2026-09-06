# Dermatic — site institucional

Landing page única, estática, com a **análise de pele** (quiz de 9 perguntas) rodando
inteiramente no navegador. Sem back-end, sem banco de dados, sem build step, sem npm.
Publica em qualquer lugar: Vercel, Netlify, GitHub Pages ou hospedagem comum.

Identidade seguindo o **Dermatic Brand Guide 2026**: paleta oficial, tokens de espaçamento,
raio, sombra e motion, limites clínicos da página 36.

---

## 1. O que você precisa preencher antes de publicar

Tudo está centralizado no topo de **`assets/js/main.js`**, no objeto `CONFIG`:

```js
const CONFIG = {
  whatsapp: "5500000000000",                      // 55 + DDD + número, só dígitos
  facebook: "https://www.facebook.com/profile.php?id=61594012530244",  // já preenchido
  instagram: "",                                  // opcional
  tiktok: "",                                     // opcional
  email: "contato@dermatic.com.br",
  site: "https://dermatic.com.br",                // domínio final
  pixelId: "",                                    // Meta Pixel; vazio = sem rastreamento e sem banner
  leadEndpoint: "",                               // para onde vai o contato do fim da análise
  sendAnswers: false                              // enviar junto as respostas do quiz? (leia a seção 3)
};
```

A mensagem que já vai digitada no WhatsApp fica logo abaixo, em `WHATS_MSG` (PT e EN).

**Domínio.** Além do `CONFIG.site`, o domínio aparece em quatro arquivos, para as metatags
e para o robô de busca. Faça uma substituição de `dermatic.com.br` pelo domínio real em:

- `index.html` — canonical, hreflang, Open Graph, Twitter Card e JSON-LD
- `privacidade.html` e `termos.html` — canonical
- `sitemap.xml` e `robots.txt`

> Atenção: `dermatic.net` está registrado por terceiro. Confirme o domínio antes de publicar.

**Facebook.** Já está preenchido em três lugares: `CONFIG.facebook`, os links do rodapé e o
`sameAs` do JSON-LD. Se a página mudar de endereço, troque no `CONFIG` **e** no JSON-LD do
`index.html` — esse último é lido pelo Google antes do JavaScript rodar.

---

## 2. Como trocar textos

Todo texto visível tem uma chave `data-i18n` no HTML e o conteúdo correspondente em
`assets/js/main.js`, no objeto `I18N` (seção 2 do arquivo), com uma entrada `pt` e uma `en`.

- Para mudar uma frase: edite **nos dois lugares** — no HTML (que é o que o Google lê) e na
  chave `pt` do `I18N` (que é o que aparece quando o visitante volta para o português).
- O inglês vive só no `I18N.en`.
- As perguntas do quiz estão em `QUESTIONS` (seção 3) e os produtos em `CATALOG` (seção 4),
  ambos com `{pt: "...", en: "..."}` em cada campo.

Regra de copy da marca: nada de promessa de cura, prazo de resultado, número de usuários,
depoimento ou parceria que não exista. A página não inventa prova social.

---

## 3. O contato no fim da análise (CRM)

Antes de mostrar a rotina, a última tela pede **nome, e-mail e WhatsApp (opcional)**, com um
aceite obrigatório para contato. Só depois de preencher é que o resultado aparece.

Para o contato chegar em algum lugar, preencha `CONFIG.leadEndpoint` com uma URL que aceite
`POST` em JSON. Enquanto estiver vazio, **nada é enviado** — a pessoa preenche e vê a rotina,
mas o dado não vai para lugar nenhum.

Caminho mais rápido: crie um formulário no [Formspree](https://formspree.io), copie a URL
(`https://formspree.io/f/xxxxxxx`) e cole em `leadEndpoint`. Funciona igual com Netlify Forms,
Make, Zapier, n8n ou o webhook do seu CRM.

O que é enviado:

```json
{
  "nome": "...", "email": "...", "whatsapp": "...",
  "aceite": true, "idioma": "pt",
  "origem": "utm_source=facebook&utm_campaign=...", "pagina": "https://...",
  "rotina": "Uma rotina para controlar cravos e espinhas",
  "momento": "2026-09-05T22:10:00.000Z"
}
```

Repare que **as respostas do questionário não vão junto**. Isso é proposital: queixa de pele é
dado de saúde e, pela LGPD (art. 5º, II) e pelo GDPR (art. 9), dado pessoal sensível — exige
consentimento específico e destacado, não o aceite genérico que está no formulário hoje.
Se você quiser esses dados no CRM, ligue `sendAnswers: true` **depois** de ajustar o texto do
aceite e a política de privacidade com apoio jurídico.

Se o envio falhar (rede caiu, endpoint fora do ar), a pessoa vê a rotina do mesmo jeito — o
resultado nunca fica preso a uma requisição.

Para tornar o passo opcional (mostrar a rotina mesmo sem contato), basta trocar a chamada de
`renderLead()` por `finish()` no fim da função `next()`, em `assets/js/main.js`.

## 4. Como funciona a análise

`analyze()` (seção 5 do `main.js`) é um motor de regras, não um modelo de IA. Ele:

1. lê as respostas guardadas em `answers`;
2. escolhe limpeza, tratamento, hidratação e proteção de acordo com tipo de pele, queixas,
   sensibilidade, sol, experiência e restrições;
3. bloqueia ativos quando há gestação, isotretinoína oral ou dermatite diagnosticada;
4. corta a lista para caber no orçamento informado;
5. monta rotina da manhã e da noite e a lista de "procure um dermatologista se".

Nada é enviado para servidor. Nada é gravado. Ao recarregar a página, as respostas somem.
A única coisa guardada no `localStorage` é a preferência de idioma e, se você configurar o
Pixel, a resposta ao banner de consentimento.

Para acrescentar um ativo: adicione uma entrada em `CATALOG` e cite a chave dentro de
`analyze()` (nas regras por queixa e, se for o caso, em `POR_QUEIXA`, que define a ordem).

---

## 5. Estrutura

```
/
├── index.html              página única
├── privacidade.html        LGPD + GDPR, com marcações de revisão jurídica
├── termos.html             termos de uso, idem
├── favicon.ico             16/32/48
├── og-image.jpg            1200×630, gerada a partir do brand guide
├── site.webmanifest
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/styles.css      tokens do brand guide + estilos
    ├── js/main.js          config, i18n, quiz, motor, interface
    ├── fonts/              General Sans + Inter, self-hosted
    ├── img/                foto do hero e ícones
    └── logo/               orbe e assinatura
```

---

## 6. Publicar

**Vercel ou Netlify:** arraste a pasta, ou conecte o repositório. Não há build — o comando de
build fica vazio e o diretório de saída é a raiz.

**GitHub Pages:** suba os arquivos na branch `main` e aponte o Pages para a raiz.

**Hospedagem comum:** envie a pasta inteira por FTP para o diretório público.

**Testar localmente** (o `file://` quebra as fontes por causa de CORS):

```bash
python3 -m http.server 8080
```

Depois abra `http://localhost:8080`.

---

## 7. Fontes

O brand guide define **Neue Montreal** no display, que é uma fonte comercial da Pangram Pangram.
No lugar dela usamos **General Sans** (Fontshare, licença livre), que é a grotesca livre mais
próxima. **Inter** é a fonte de corpo, como o guia manda.

Se você comprar a licença web da Neue Montreal: coloque os `.woff2` em `assets/fonts/` e ajuste
os blocos `@font-face` no topo de `assets/css/styles.css`. Nada mais muda.

Licenças em `assets/fonts/LICENSES.txt`.

---

## 8. Imagens

O visual do hero — o disco de pele com a lente de leitura, os anéis e os chips — é feito
inteiramente em CSS e SVG: não há foto, nada para otimizar e ele reage ao ponteiro (o disco
inclina, a lente segue o cursor, as marcas acendem sob a lente e os chips deslocam em
profundidades diferentes). Sem mouse, ou com "reduzir movimento" ligado no sistema, a lente
apenas deriva devagar. Para mudar as marcas na pele, edite os `<span class="skin-mark">` no
`index.html` — cada um tem `--x` e `--y` em porcentagem.

O orbe e a assinatura saíram do brand guide, e a `og-image.jpg` foi montada com a paleta e a
tipografia oficiais.

Este Mac não tinha codificador WebP disponível, então os logos e ícones estão em PNG e a
`og-image` em JPEG. Se quiser converter depois:

```bash
brew install webp && cwebp -q 82 assets/logo/wordmark.png -o assets/logo/wordmark.webp
```

---

## 9. Pendências que dependem de decisão sua

- [ ] Número do WhatsApp, e-mail de contato e domínio final (Facebook já está ligado)
- [ ] Meta Pixel ID, se quiser medir origem das visitas (sem ele, o banner de cookies nem aparece)
- [ ] `leadEndpoint`: para onde o contato do fim da análise deve ir (Formspree, CRM, automação)
- [ ] Decidir, com apoio jurídico, se as respostas do quiz vão junto do contato (`sendAnswers`)
- [ ] Revisão jurídica de `privacidade.html` e `termos.html` — os pontos estão marcados com
      `<!-- TODO: revisão jurídica -->` e `[PREENCHER]`: razão social, CNPJ, endereço, encarregado
      de dados, operadores contratados, prazos de retenção e foro
- [ ] Confirmar se a marca sai como `Dermatic®` — o símbolo de registro está na assinatura
- [ ] Arquivos vetoriais (SVG) do logo, se existirem: hoje a assinatura é um PNG extraído do
      brand guide, com fundo transparente
- [ ] Instagram e TikTok, se a marca tiver perfil
