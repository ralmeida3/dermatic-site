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
  facebook: "https://www.facebook.com/PREENCHER", // página oficial
  instagram: "",                                  // opcional
  tiktok: "",                                     // opcional
  email: "contato@dermatic.com.br",
  site: "https://dermatic.com.br",                // domínio final
  pixelId: ""                                     // Meta Pixel; vazio = sem rastreamento e sem banner
};
```

A mensagem que já vai digitada no WhatsApp fica logo abaixo, em `WHATS_MSG` (PT e EN).

**Domínio.** Além do `CONFIG.site`, o domínio aparece em quatro arquivos, para as metatags
e para o robô de busca. Faça uma substituição de `dermatic.com.br` pelo domínio real em:

- `index.html` — canonical, hreflang, Open Graph, Twitter Card e JSON-LD
- `privacidade.html` e `termos.html` — canonical
- `sitemap.xml` e `robots.txt`

> Atenção: `dermatic.net` está registrado por terceiro. Confirme o domínio antes de publicar.

**Facebook.** O endereço da página aparece também no JSON-LD (`sameAs`) e nos links do rodapé
do HTML. O JavaScript sobrescreve os links pelo valor de `CONFIG.facebook`; ajuste o JSON-LD
manualmente, porque ele é lido pelo Google antes do JavaScript rodar.

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

## 3. Como funciona a análise

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

## 4. Estrutura

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

## 5. Publicar

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

## 6. Fontes

O brand guide define **Neue Montreal** no display, que é uma fonte comercial da Pangram Pangram.
No lugar dela usamos **General Sans** (Fontshare, licença livre), que é a grotesca livre mais
próxima. **Inter** é a fonte de corpo, como o guia manda.

Se você comprar a licença web da Neue Montreal: coloque os `.woff2` em `assets/fonts/` e ajuste
os blocos `@font-face` no topo de `assets/css/styles.css`. Nada mais muda.

Licenças em `assets/fonts/LICENSES.txt`.

---

## 7. Imagens

As imagens saíram do próprio brand guide (foto do hero, orbe, assinatura) e a `og-image.jpg`
foi montada com a paleta e a tipografia oficiais.

Este Mac não tinha codificador WebP disponível, então as fotos estão em JPEG otimizado e os
logos em PNG. Se quiser converter depois:

```bash
brew install webp && cwebp -q 82 assets/img/hero-skin.jpg -o assets/img/hero-skin.webp
```

Depois troque o `src` no `index.html` — ou use `<picture>` com os dois formatos.

---

## 8. Pendências que dependem de decisão sua

- [ ] Número do WhatsApp, URL do Facebook, e-mail de contato e domínio final
- [ ] Meta Pixel ID, se quiser medir origem das visitas (sem ele, o banner de cookies nem aparece)
- [ ] Revisão jurídica de `privacidade.html` e `termos.html` — os pontos estão marcados com
      `<!-- TODO: revisão jurídica -->` e `[PREENCHER]`: razão social, CNPJ, endereço, encarregado
      de dados, operadores contratados, prazos de retenção e foro
- [ ] Confirmar se a marca sai como `Dermatic®` — o símbolo de registro está na assinatura
- [ ] Arquivos vetoriais (SVG) do logo, se existirem: hoje a assinatura é um PNG extraído do
      brand guide, com fundo transparente
- [ ] Instagram e TikTok, se a marca tiver perfil
