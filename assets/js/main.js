/* ==========================================================================
   DERMATIC — main.js
   Índice:
     1. CONFIGURAÇÃO      — tudo que você precisa trocar está aqui
     2. TEXTOS (i18n)     — PT-BR e EN
     3. PERGUNTAS         — as 9 etapas da análise
     4. CATÁLOGO          — ativos, neutro de marca
     5. MOTOR             — cruza respostas e monta a rotina (roda no navegador)
     6. QUIZ              — controle das etapas
     7. RESULTADO         — renderização
     8. IDIOMA            — troca PT/EN e persistência
     9. INTERFACE         — WhatsApp, UTM, animações, header, consentimento
   ========================================================================== */
"use strict";

/* ==========================================================================
   1. CONFIGURAÇÃO — [PREENCHER] antes de publicar
   ========================================================================== */
const CONFIG = {
  /* Número no formato internacional, só dígitos: 55 + DDD + número */
  whatsapp: "5500000000000",                       /* [PREENCHER] */
  facebook: "https://www.facebook.com/profile.php?id=61594012530244",
  instagram: "",                                   /* [PREENCHER] ou deixe vazio */
  tiktok: "",                                      /* [PREENCHER] ou deixe vazio */
  email: "contato@dermatic.com.br",                /* [PREENCHER] */
  site: "https://dermatic.com.br",                 /* [PREENCHER] domínio final */
  pixelId: "",                                     /* [PREENCHER] Meta Pixel; vazio = sem rastreamento */

  /* Para onde vai o contato preenchido no fim da análise.
     Aceita qualquer endpoint que receba POST em JSON — Formspree, Netlify Forms,
     Make, Zapier, n8n ou o webhook do seu CRM. Vazio = nada é enviado. */
  leadEndpoint: "",                                /* [PREENCHER] ex.: https://formspree.io/f/xxxxxxx */

  /* Enviar junto as respostas do questionário?
     Fica FALSE de propósito: queixa de pele é dado de saúde e, pela LGPD, dado
     pessoal sensível — exige consentimento específico e destacado. Só ligue
     depois de tratar isso com o jurídico e de ajustar o texto do aceite. */
  sendAnswers: false
};

/* Mensagem que já vai digitada no WhatsApp */
const WHATS_MSG = {
  pt: "Oi! Vim pelo site da Dermatic e quero saber mais sobre a análise de pele.",
  en: "Hi! I came from the Dermatic website and I'd like to know more about the skin analysis."
};

/* ==========================================================================
   2. TEXTOS
   ========================================================================== */
const I18N = {
  pt: {
    "skip":"Ir direto para a análise",
    "topbar.strong":"Análise gratuita, resultado na hora.",
    "topbar.text":"A Dermatic orienta cuidados cosméticos. Não faz diagnóstico e não substitui consulta com dermatologista.",
    "nav.how":"Como funciona","nav.what":"O que entra na conta","nav.limits":"Limites","nav.faq":"Dúvidas",
    "cta.analyze":"Analisar minha pele","cta.how":"Ver como funciona","cta.whats":"Falar no WhatsApp",
    "hero.eyebrow":"Inteligência aplicada à sua pele",
    "hero.h1":"Sua pele,<br><em>decodificada.</em>",
    "hero.lead":"Nove perguntas. A Dermatic cruza suas respostas com o que a dermatologia já sabe sobre cada ativo e devolve a rotina da manhã, a da noite e o que procurar no rótulo de cada produto.",
    "hero.scanAlt":"Ilustração de uma amostra de pele sob leitura, com tipo de pele mista, sensibilidade moderada e fotoproteção irregular.",
    "hero.chip1":"Tipo de pele","hero.chip1v":"mista","hero.chip2":"Sensibilidade","hero.chip2v":"moderada",
    "hero.chip3":"Fotoproteção","hero.chip3v":"irregular",
    "facts.l1":"para a sua rotina ficar pronta",
    "facts.l2":"ativos cruzados na sua análise",
    "facts.l3":"preocupações de pele cobertas",
    "facts.l4":"independente de marcas",
    "problem.eyebrow":"Menos achismo. Mais ciência.",
    "problem.title":"O problema não é o produto. É não conhecer a sua pele.",
    "problem.lead":"Quase todo mundo compra pelo rótulo, pelo vídeo ou pela indicação de alguém — sem saber se aquela pele se parece com a sua. E o mesmo ativo que resolve a acne de uma pele oleosa é o que quebra a barreira de uma pele seca e sensível.",
    "problem.c1t":"Oleosa ou desidratada?",
    "problem.c1d":"Pele que brilha e repuxa ao mesmo tempo quase nunca é só oleosa — costuma estar desidratada. Quem trata como oleosa resseca mais, a pele responde produzindo mais sebo, e o ciclo se fecha.",
    "problem.c2t":"O mesmo ativo, respostas opostas",
    "problem.c2d":"Ácido salicílico limpa o poro de uma pele oleosa e arrasa a barreira de uma pele sensível. Não existe produto bom ou ruim: existe o produto certo para o tipo de pele certo.",
    "problem.c3t":"Sem ponto de partida, tudo vira teste",
    "problem.c3d":"Sem saber de onde parte, cada compra vira um experimento de três meses. É assim que a gaveta enche de frasco pela metade e a pele continua igual.",
    "how.eyebrow":"Como funciona","how.title":"Três passos, dois minutos.",
    "how.s1t":"Você responde",
    "how.s1d":"Nove perguntas sobre tipo de pele, o que mais incomoda, sensibilidade, sol, experiência com ativos e restrições. No fim há um campo livre para o que não coube nas alternativas.",
    "how.s2t":"A Dermatic cruza as respostas",
    "how.s2d":"Combina as queixas com os ativos indicados, corta o que é incompatível com a sua sensibilidade ou com gestação, e ordena o que entra primeiro na rotina.",
    "how.s3t":"Você recebe a rotina",
    "how.s3d":"Manhã e noite passo a passo, com o que procurar no rótulo de cada produto, a faixa de preço e os cuidados na introdução de cada ativo.",
    "how.note":"A Dermatic oferece recomendações de cuidados cosméticos e produtos de venda livre. Não realiza diagnóstico, não substitui avaliação médica e não trata doenças de pele. Em caso de lesão, dor, alteração súbita ou piora, procure um dermatologista.",
    "quiz.eyebrow":"Análise gratuita","quiz.title":"Vamos ler a sua pele.",
    "quiz.lead":"Nove perguntas rápidas. No fim você recebe a rotina da manhã, a da noite e a lista do que procurar em cada produto.",
    "quiz.mark":"Análise Dermatic",
    "quiz.foot":"Orientação educativa sobre cuidados cosméticos. Não é diagnóstico nem prescrição médica.",
    "quiz.continue":"Continuar","quiz.finish":"Ver minha rotina","quiz.back":"Voltar",
    "quiz.thinking":"Cruzando suas respostas com os ativos indicados e cortando o que não combina com o seu caso…",
    "quiz.max":"Você já escolheu 3. Desmarque uma para trocar.",
    "factors.eyebrow":"O que entra na conta","factors.title":"Seis coisas mudam a recomendação.",
    "factors.f1t":"Tipo de pele","factors.f1d":"Define a textura da limpeza e do hidratante antes de qualquer ativo entrar.",
    "factors.f2t":"Queixa principal","factors.f2d":"Acne, manchas, linhas, poros, oleosidade ou ressecamento puxam ativos diferentes.",
    "factors.f3t":"Sensibilidade","factors.f3d":"Pele que arde muda concentração, frequência e a ordem de introdução.",
    "factors.f4t":"Exposição solar","factors.f4d":"Determina o FPS, a reaplicação e se o protetor precisa ter cor.",
    "factors.f5t":"Experiência com ativos","factors.f5d":"Quem nunca usou ácido começa com um produto só, não com cinco.",
    "factors.f6t":"Restrições","factors.f6d":"Gestação, rosácea diagnosticada ou isotretinoína bloqueiam ativos automaticamente.",
    "limits.eyebrow":"Confiança também é saber o limite","limits.title":"O que a Dermatic faz — e o que ela não faz.",
    "limits.yes":"A Dermatic faz","limits.no":"A Dermatic não faz",
    "limits.y1":"Organiza uma rotina diária coerente, na ordem certa de aplicação",
    "limits.y2":"Explica cada ativo: para que serve, quando usar, o que não combinar",
    "limits.y3":"Traduz rótulo — o que procurar e o que ignorar na embalagem",
    "limits.y4":"Ajusta a recomendação ao seu orçamento e à sua experiência",
    "limits.y5":"Diz com todas as letras quando o caso é de dermatologista",
    "limits.n1":"Não dá diagnóstico — lesão, mancha que muda ou ferida que não fecha é caso de médico",
    "limits.n2":"Não prescreve medicamento nem substitui receita",
    "limits.n3":"Não trata doença de pele nem promete cura",
    "limits.n4":"Não vende produto e não recebe por indicação de marca",
    "limits.n5":"Não promete prazo de resultado: pele responde em semanas, não em dias",
    "who.eyebrow":"Para quem é","who.title":"Preocupações que a análise cobre.",
    "who.t1":"Acne e cravos","who.t2":"Oleosidade e poros","who.t3":"Manchas e melasma","who.t4":"Sensibilidade e barreira",
    "who.t5":"Textura e viço","who.t6":"Linhas finas","who.t7":"Olheiras","who.t8":"Fotoproteção",
    "faq.eyebrow":"Dúvidas","faq.title":"Perguntas frequentes.",
    "faq.q1":"A Dermatic vende os produtos que indica?",
    "faq.a1":"Não. A recomendação é por ativo e concentração, não por marca. Nenhuma marca paga para aparecer, e a Dermatic não recebe comissão por indicação.",
    "faq.q2":"Isso substitui uma consulta com dermatologista?",
    "faq.a2":"Não substitui. A Dermatic trabalha com cosméticos e produtos de venda livre. Diagnóstico, prescrição e tratamento de doença de pele são do médico — e a própria análise avisa quando o seu caso pede essa consulta.",
    "faq.q3":"O que acontece com as minhas respostas?",
    "faq.a3":"A análise é calculada dentro do próprio navegador — as respostas sobre a sua pele não são enviadas para servidor nem usadas para treinar modelo. O que sai daqui é apenas o contato que você digita no fim, e só para a Dermatic falar com você.",
    "faq.q4":"Preciso informar meus dados?",
    "faq.a4":"Nome e e-mail, no último passo, para a gente enviar a sua rotina e poder responder suas dúvidas. Não pedimos senha, não criamos conta e você pode pedir a exclusão dos seus dados quando quiser.",
    "faq.q5":"Posso usar se estiver grávida ou amamentando?",
    "faq.a5":"Pode, e existe uma pergunta específica sobre isso. Ao marcar gestação ou amamentação, a análise já sai sem retinóides e sem os ativos contraindicados. Ainda assim, confirme a rotina com quem acompanha o seu pré-natal.",
    "faq.q6":"Em quanto tempo eu vejo resultado?",
    "faq.a6":"Depende do ativo e da sua pele, e ninguém honesto promete prazo. A maior parte dos ativos cosméticos pede semanas de uso constante — não dias. Constância vale mais que concentração.",
    "faq.q7":"Posso refazer a análise depois?",
    "faq.a7":"Quantas vezes quiser. A pele muda com estação, rotina e idade — refazer quando algo mudar é justamente o uso certo.",
    "faq.q8":"O aplicativo já está disponível?",
    "faq.a8":"Ainda não. A Dermatic está em desenvolvimento, e esta análise é a primeira parte dela funcionando de forma aberta. Para acompanhar o lançamento, fale com a gente no WhatsApp ou siga a página no Facebook.",
    "final.title":"Duas perguntas você já respondeu lendo até aqui.",
    "final.lead":"Faltam nove. No fim você sai com uma rotina de manhã, uma de noite e a lista do que procurar em cada produto. Se preferir conversar antes, é só chamar no WhatsApp.",
    "footer.bio":"A Dermatic usa IA para analisar sua pele e montar uma rotina de skincare personalizada — produtos certos, na ordem certa, para o seu tipo de pele.",
    "footer.nav":"Navegação","footer.contact":"Contato e transparência",
    "footer.privacy":"Política de privacidade","footer.terms":"Termos de uso",
    "footer.disclaimer":"<strong>Aviso médico.</strong> A Dermatic oferece recomendações de cuidados cosméticos e produtos de venda livre. Não realiza diagnóstico, não substitui avaliação médica e não trata doenças de pele. Em caso de lesão, dor, alteração súbita ou piora, procure um dermatologista.",
    "footer.tagline":"Sua pele, decodificada.",
    "consent.text":"Usamos cookies de medição para entender de onde vêm as visitas. Nada é carregado antes de você aceitar.",
    "consent.yes":"Aceitar","consent.no":"Recusar",
    /* resultado */
    "res.eyebrow":"Sua análise","res.redo":"Refazer análise",
    "res.am":"Rotina da manhã","res.pm":"Rotina da noite","res.prods":"Produtos indicados",
    "res.before":"Antes de começar","res.avoid":"O que evitar","res.doctor":"Procure um dermatologista se",
    "res.active":"Ativo","res.label":"O que procurar no rótulo","res.when":"Quando usar",
    "res.ctaTitle":"Ficou com dúvida na rotina?",
    "res.ctaText":"Manda a sua dúvida no WhatsApp. A gente responde e você acompanha o lançamento da Dermatic por lá.",
    /* passo de contato */
    "lead.step":"Último passo",
    "lead.title":"Para onde enviamos a sua rotina?",
    "lead.help":"Sua análise já está pronta. Deixe seu contato para receber a rotina e poder tirar dúvidas com a gente.",
    "lead.name":"Seu nome",
    "lead.email":"Seu e-mail",
    "lead.phone":"WhatsApp",
    "lead.optional":"(opcional)",
    "lead.consent":"Aceito receber a minha rotina e conteúdos da Dermatic por e-mail ou WhatsApp. Posso cancelar quando quiser.",
    "lead.privacy":"Política de privacidade",
    "lead.submit":"Ver minha rotina",
    "lead.note":"Não pedimos senha e não criamos conta. Você pode pedir a exclusão dos seus dados quando quiser.",
    "lead.errName":"Escreva o seu nome.",
    "lead.errEmail":"Escreva um e-mail válido.",
    "lead.errConsent":"Marque a autorização para continuar."
  },
  en: {
    "skip":"Skip to the analysis",
    "topbar.strong":"Free analysis, instant result.",
    "topbar.text":"Dermatic guides cosmetic skincare. It does not diagnose and does not replace a dermatologist.",
    "nav.how":"How it works","nav.what":"What counts","nav.limits":"Limits","nav.faq":"FAQ",
    "cta.analyze":"Analyze my skin","cta.how":"See how it works","cta.whats":"Chat on WhatsApp",
    "hero.eyebrow":"Intelligence applied to your skin",
    "hero.h1":"Your skin,<br><em>decoded.</em>",
    "hero.lead":"Nine questions. Dermatic matches your answers with what dermatology already knows about each active and gives you a morning routine, a night routine and what to look for on every label.",
    "hero.scanAlt":"Illustration of a skin sample being read, showing combination skin type, moderate sensitivity and inconsistent sun protection.",
    "hero.chip1":"Skin type","hero.chip1v":"combination","hero.chip2":"Sensitivity","hero.chip2v":"moderate",
    "hero.chip3":"Sun protection","hero.chip3v":"inconsistent",
    "facts.l1":"to get your routine ready",
    "facts.l2":"actives cross-checked in your analysis",
    "facts.l3":"skin concerns covered",
    "facts.l4":"independent from brands",
    "problem.eyebrow":"Less hearsay. More science.",
    "problem.title":"The problem isn't the product. It's not knowing your own skin.",
    "problem.lead":"Almost everyone buys by the label, by a video or by someone's recommendation — without knowing whether that skin is anything like theirs. And the same active that clears acne on oily skin is the one that breaks the barrier of dry, sensitive skin.",
    "problem.c1t":"Oily or dehydrated?",
    "problem.c1d":"Skin that shines and feels tight at the same time is rarely just oily — it's usually dehydrated. Treat it as oily and you dry it further, the skin answers with more sebum, and the cycle closes.",
    "problem.c2t":"Same active, opposite answers",
    "problem.c2d":"Salicylic acid clears the pore on oily skin and wrecks the barrier on sensitive skin. There's no good or bad product: there's the right product for the right skin.",
    "problem.c3t":"No starting point, everything is a test",
    "problem.c3d":"Without knowing where you start, every purchase becomes a three-month experiment. That's how the drawer fills with half-used bottles while the skin stays the same.",
    "how.eyebrow":"How it works","how.title":"Three steps, two minutes.",
    "how.s1t":"You answer",
    "how.s1d":"Nine questions about skin type, what bothers you most, sensitivity, sun, experience with actives and restrictions. There's a free field at the end for anything the options missed.",
    "how.s2t":"Dermatic cross-checks",
    "how.s2d":"It matches your concerns with the indicated actives, removes what conflicts with your sensitivity or with pregnancy, and orders what comes into the routine first.",
    "how.s3t":"You get the routine",
    "how.s3d":"Morning and night, step by step, with what to look for on each label, the price range and how to introduce each active.",
    "how.note":"Dermatic offers cosmetic and over-the-counter skincare guidance. It does not diagnose, does not replace medical assessment and does not treat skin disease. In case of a lesion, pain, sudden change or worsening, see a dermatologist.",
    "quiz.eyebrow":"Free analysis","quiz.title":"Let's read your skin.",
    "quiz.lead":"Nine quick questions. At the end you get a morning routine, a night routine and the list of what to look for in each product.",
    "quiz.mark":"Dermatic analysis",
    "quiz.foot":"Educational guidance on cosmetic skincare. Not a diagnosis or a medical prescription.",
    "quiz.continue":"Continue","quiz.finish":"See my routine","quiz.back":"Back",
    "quiz.thinking":"Matching your answers with the indicated actives and removing what doesn't fit your case…",
    "quiz.max":"You already picked 3. Unselect one to change.",
    "factors.eyebrow":"What counts","factors.title":"Six things change the recommendation.",
    "factors.f1t":"Skin type","factors.f1d":"Sets the texture of the cleanser and the moisturiser before any active comes in.",
    "factors.f2t":"Main concern","factors.f2d":"Acne, dark spots, lines, pores, oiliness or dryness pull different actives.",
    "factors.f3t":"Sensitivity","factors.f3d":"Skin that stings changes concentration, frequency and the order of introduction.",
    "factors.f4t":"Sun exposure","factors.f4d":"Determines SPF, reapplication and whether the sunscreen needs a tint.",
    "factors.f5t":"Experience with actives","factors.f5d":"Someone who never used an acid starts with one product, not five.",
    "factors.f6t":"Restrictions","factors.f6d":"Pregnancy, diagnosed rosacea or oral isotretinoin block actives automatically.",
    "limits.eyebrow":"Trust means knowing the limit","limits.title":"What Dermatic does — and what it doesn't.",
    "limits.yes":"Dermatic does","limits.no":"Dermatic doesn't",
    "limits.y1":"Builds a coherent daily routine, in the right order of application",
    "limits.y2":"Explains each active: what it's for, when to use it, what not to combine",
    "limits.y3":"Translates the label — what to look for and what to ignore",
    "limits.y4":"Adjusts the recommendation to your budget and your experience",
    "limits.y5":"Says plainly when the case belongs to a dermatologist",
    "limits.n1":"No diagnosis — a lesion, a changing spot or a wound that won't heal is a doctor's case",
    "limits.n2":"No prescription medicine and no replacement for one",
    "limits.n3":"No treatment of skin disease and no promise of cure",
    "limits.n4":"No product sales and no commission from brands",
    "limits.n5":"No promised timeline: skin responds in weeks, not days",
    "who.eyebrow":"Who it's for","who.title":"Concerns the analysis covers.",
    "who.t1":"Acne and blackheads","who.t2":"Oiliness and pores","who.t3":"Dark spots and melasma","who.t4":"Sensitivity and barrier",
    "who.t5":"Texture and glow","who.t6":"Fine lines","who.t7":"Under-eye circles","who.t8":"Sun protection",
    "faq.eyebrow":"FAQ","faq.title":"Frequently asked questions.",
    "faq.q1":"Does Dermatic sell the products it recommends?",
    "faq.a1":"No. Recommendations are by active and concentration, not by brand. No brand pays to appear, and Dermatic takes no commission.",
    "faq.q2":"Does this replace a dermatologist?",
    "faq.a2":"It does not. Dermatic works with cosmetics and over-the-counter products. Diagnosis, prescription and treatment of skin disease belong to a doctor — and the analysis itself tells you when your case calls for that visit.",
    "faq.q3":"What happens to my answers?",
    "faq.a3":"The analysis runs inside your own browser — your answers about your skin are never sent to a server or used to train a model. The only thing that leaves this page is the contact you type at the end, and only so Dermatic can talk to you.",
    "faq.q4":"Do I have to give my details?",
    "faq.a4":"Name and email, on the last step, so we can send your routine and answer your questions. No password, no account, and you can ask us to delete your data whenever you want.",
    "faq.q5":"Can I use it while pregnant or breastfeeding?",
    "faq.a5":"Yes, and there's a specific question about it. If you mark pregnancy or breastfeeding, the analysis comes out without retinoids and without the contraindicated actives. Still, confirm the routine with the professional following your prenatal care.",
    "faq.q6":"How long until I see results?",
    "faq.a6":"It depends on the active and on your skin, and nobody honest promises a date. Most cosmetic actives ask for weeks of consistent use — not days. Consistency beats concentration.",
    "faq.q7":"Can I redo the analysis later?",
    "faq.a7":"As often as you like. Skin changes with season, routine and age — redoing it when something changes is exactly the right use.",
    "faq.q8":"Is the app available yet?",
    "faq.a8":"Not yet. Dermatic is in development, and this analysis is the first part of it working in the open. To follow the launch, message us on WhatsApp or follow the Facebook page.",
    "final.title":"You've already answered two questions just by reading this far.",
    "final.lead":"Nine to go. At the end you walk away with a morning routine, a night routine and the list of what to look for in each product. If you'd rather talk first, message us on WhatsApp.",
    "footer.bio":"Dermatic uses AI to analyze your skin and build a personalized skincare routine — the right products, in the right order, for your skin.",
    "footer.nav":"Navigation","footer.contact":"Contact and transparency",
    "footer.privacy":"Privacy policy","footer.terms":"Terms of use",
    "footer.disclaimer":"<strong>Medical notice.</strong> Dermatic offers cosmetic and over-the-counter skincare guidance. It does not diagnose, does not replace medical assessment and does not treat skin disease. In case of a lesion, pain, sudden change or worsening, see a dermatologist.",
    "footer.tagline":"Your skin, decoded.",
    "consent.text":"We use measurement cookies to understand where visits come from. Nothing loads before you accept.",
    "consent.yes":"Accept","consent.no":"Decline",
    "res.eyebrow":"Your analysis","res.redo":"Redo analysis",
    "res.am":"Morning routine","res.pm":"Night routine","res.prods":"Recommended products",
    "res.before":"Before you start","res.avoid":"What to avoid","res.doctor":"See a dermatologist if",
    "res.active":"Active","res.label":"What to look for on the label","res.when":"When to use",
    "res.ctaTitle":"Stuck on the routine?",
    "res.ctaText":"Send your question on WhatsApp. We answer there — and that's where you follow the Dermatic launch.",
    "lead.step":"Last step",
    "lead.title":"Where should we send your routine?",
    "lead.help":"Your analysis is ready. Leave your contact so we can send the routine and answer your questions.",
    "lead.name":"Your name",
    "lead.email":"Your email",
    "lead.phone":"WhatsApp",
    "lead.optional":"(optional)",
    "lead.consent":"I agree to receive my routine and Dermatic content by email or WhatsApp. I can unsubscribe at any time.",
    "lead.privacy":"Privacy policy",
    "lead.submit":"See my routine",
    "lead.note":"No password, no account. You can ask us to delete your data at any time.",
    "lead.errName":"Please enter your name.",
    "lead.errEmail":"Please enter a valid email.",
    "lead.errConsent":"Please tick the authorisation to continue."
  }
};

let lang = "pt";
const t = k => (I18N[lang] && I18N[lang][k]) || (I18N.pt[k] || k);
const L = o => (o && (o[lang] !== undefined ? o[lang] : o.pt)) || "";

/* ==========================================================================
   3. PERGUNTAS
   ========================================================================== */
const QUESTIONS = [
  { id:"tipo", kind:"one", cols:1,
    q:{pt:"Como sua pele costuma estar no fim do dia?", en:"How does your skin usually feel at the end of the day?"},
    help:{pt:"Pense num dia comum, sem maquiagem pesada.", en:"Think of an ordinary day, without heavy makeup."},
    options:[
      {v:"oleosa", l:{pt:"Brilhosa no rosto inteiro", en:"Shiny all over"}, d:{pt:"Pele oleosa", en:"Oily skin"}},
      {v:"mista",  l:{pt:"Brilhosa só na testa, nariz e queixo", en:"Shiny only on forehead, nose and chin"}, d:{pt:"Pele mista", en:"Combination skin"}},
      {v:"normal", l:{pt:"Confortável, sem brilho nem repuxo", en:"Comfortable, neither shiny nor tight"}, d:{pt:"Pele normal", en:"Normal skin"}},
      {v:"seca",   l:{pt:"Repuxando, áspera ou descamando", en:"Tight, rough or flaking"}, d:{pt:"Pele seca", en:"Dry skin"}}
    ]},
  { id:"queixas", kind:"many", max:3, cols:2,
    q:{pt:"O que mais te incomoda hoje?", en:"What bothers you most right now?"},
    help:{pt:"Escolha até 3 — a ordem não importa.", en:"Pick up to 3 — order doesn't matter."},
    options:[
      {v:"acne",        l:{pt:"Espinhas e cravos", en:"Pimples and blackheads"}},
      {v:"oleosidade",  l:{pt:"Oleosidade e brilho", en:"Oiliness and shine"}},
      {v:"poros",       l:{pt:"Poros dilatados", en:"Enlarged pores"}},
      {v:"manchas",     l:{pt:"Manchas escuras", en:"Dark spots"}},
      {v:"melasma",     l:{pt:"Melasma", en:"Melasma"}},
      {v:"linhas",      l:{pt:"Linhas finas e flacidez", en:"Fine lines and laxity"}},
      {v:"olheiras",    l:{pt:"Olheiras e inchaço", en:"Dark circles and puffiness"}},
      {v:"vermelhidao", l:{pt:"Vermelhidão e ardência", en:"Redness and stinging"}},
      {v:"textura",     l:{pt:"Textura irregular e falta de viço", en:"Uneven texture and dullness"}},
      {v:"ressecamento",l:{pt:"Ressecamento e repuxo", en:"Dryness and tightness"}}
    ]},
  { id:"sensibilidade", kind:"one", cols:1,
    q:{pt:"Sua pele arde, coça ou fica vermelha com produto novo?", en:"Does your skin sting, itch or redden with a new product?"},
    help:{pt:"Isso define concentração e frequência dos ativos.", en:"This sets the concentration and frequency of actives."},
    options:[
      {v:"baixa", l:{pt:"Quase nunca", en:"Almost never"}, d:{pt:"Tolera bem produtos novos", en:"Tolerates new products well"}},
      {v:"media", l:{pt:"Às vezes, e passa em pouco tempo", en:"Sometimes, and it passes quickly"}, d:{pt:"Sensibilidade moderada", en:"Moderate sensitivity"}},
      {v:"alta",  l:{pt:"Com frequência, e demora a passar", en:"Often, and it takes a while to pass"}, d:{pt:"Pele sensível", en:"Sensitive skin"}}
    ]},
  { id:"idade", kind:"one", cols:2,
    q:{pt:"Sua faixa etária", en:"Your age range"},
    help:{pt:"Muda a prioridade entre prevenção e correção.", en:"Shifts the priority between prevention and correction."},
    options:[
      {v:"-20", l:{pt:"Menos de 20", en:"Under 20"}},{v:"20", l:{pt:"20 a 29", en:"20 to 29"}},
      {v:"30", l:{pt:"30 a 39", en:"30 to 39"}},{v:"40", l:{pt:"40 a 49", en:"40 to 49"}},
      {v:"50", l:{pt:"50 ou mais", en:"50 or older"}}
    ]},
  { id:"sol", kind:"one", cols:1,
    q:{pt:"Como é a sua relação com o sol hoje?", en:"What's your relationship with the sun like today?"},
    help:{pt:"O protetor decide se o resto da rotina funciona.", en:"Sunscreen decides whether the rest of the routine works."},
    options:[
      {v:"protegido", l:{pt:"Pouco sol e uso protetor todo dia", en:"Little sun and I wear sunscreen daily"}, d:{pt:"Fotoproteção consistente", en:"Consistent protection"}},
      {v:"parcial",   l:{pt:"Uso protetor, mas esqueço bastante", en:"I use sunscreen but forget a lot"}, d:{pt:"Fotoproteção irregular", en:"Inconsistent protection"}},
      {v:"exposto",   l:{pt:"Pego sol com frequência", en:"I'm in the sun often"}, d:{pt:"Exposição alta", en:"High exposure"}},
      {v:"nenhum",    l:{pt:"Não uso protetor solar", en:"I don't use sunscreen"}, d:{pt:"Sem fotoproteção", en:"No protection"}}
    ]},
  { id:"experiencia", kind:"one", cols:1,
    q:{pt:"Qual sua experiência com ácidos e retinóides?", en:"How much experience do you have with acids and retinoids?"},
    help:{pt:"Determina quantos ativos entram de uma vez.", en:"Determines how many actives come in at once."},
    options:[
      {v:"nenhuma", l:{pt:"Nunca usei", en:"Never used them"}, d:{pt:"Começar por um ativo só", en:"Start with a single active"}},
      {v:"alguma",  l:{pt:"Já usei alguns, sem rotina fixa", en:"Used a few, no fixed routine"}, d:{pt:"Dá para combinar dois", en:"Two can be combined"}},
      {v:"muita",   l:{pt:"Uso com frequência e tolero bem", en:"I use them often and tolerate them"}, d:{pt:"Rotina completa", en:"Full routine"}}
    ]},
  { id:"restricoes", kind:"many", cols:1, none:"nenhuma",
    q:{pt:"Alguma dessas situações se aplica a você?", en:"Do any of these apply to you?"},
    help:{pt:"Marque todas que valerem. Isso bloqueia ativos automaticamente.", en:"Check all that apply. This blocks actives automatically."},
    options:[
      {v:"gestante",     l:{pt:"Estou grávida ou amamentando", en:"I'm pregnant or breastfeeding"}},
      {v:"dermatite",    l:{pt:"Tenho rosácea, dermatite ou eczema diagnosticados", en:"I have diagnosed rosacea, dermatitis or eczema"}},
      {v:"isotretinoina",l:{pt:"Estou em tratamento com isotretinoína oral", en:"I'm on oral isotretinoin"}},
      {v:"acompanhada",  l:{pt:"Faço acompanhamento com dermatologista", en:"I'm followed by a dermatologist"}},
      {v:"nenhuma",      l:{pt:"Nenhuma das anteriores", en:"None of the above"}}
    ]},
  { id:"orcamento", kind:"one", cols:2,
    q:{pt:"Quanto você pretende gastar por mês com a rotina?", en:"How much do you plan to spend monthly on the routine?"},
    help:{pt:"A recomendação se ajusta ao que cabe no bolso.", en:"The recommendation adapts to what fits your budget."},
    options:[
      {v:"baixo", l:{pt:"Até R$ 60", en:"Up to R$ 60"}},{v:"medio", l:{pt:"R$ 60 a R$ 150", en:"R$ 60 to R$ 150"}},
      {v:"alto", l:{pt:"Acima de R$ 150", en:"Above R$ 150"}},{v:"livre", l:{pt:"Tanto faz", en:"No preference"}}
    ]},
  { id:"extra", kind:"text",
    q:{pt:"Quer contar mais alguma coisa sobre a sua pele?", en:"Anything else you'd like to tell us about your skin?"},
    help:{pt:"Opcional. Ex.: o que você já usa hoje, o que deu errado, alguma alergia.", en:"Optional. E.g. what you use today, what went wrong, any allergy."},
    placeholder:{pt:"Uso sabonete comum e um hidratante de farmácia. Tentei ácido salicílico e descamou muito…", en:"I use a regular cleanser and a drugstore moisturiser. I tried salicylic acid and it peeled a lot…"}}
];

/* ==========================================================================
   4. CATÁLOGO — por ativo, nunca por marca
   ========================================================================== */
const CATALOG = {
  limpezaOleosa:{
    cat:{pt:"Limpeza",en:"Cleanser"}, nome:{pt:"Gel de limpeza para pele oleosa",en:"Gel cleanser for oily skin"},
    ativo:{pt:"Tensoativos suaves, com ou sem ácido salicílico 0,5–2%",en:"Mild surfactants, with or without 0.5–2% salicylic acid"},
    rotulo:{pt:"Procure “salicylic acid”, “cocamidopropyl betaine”, “zinc PCA”. Fuja de sabonete em barra e de álcool no topo da lista.",en:"Look for “salicylic acid”, “cocamidopropyl betaine”, “zinc PCA”. Avoid bar soap and alcohol high in the list."},
    quando:{pt:"Manhã e noite",en:"Morning and night"}, faixa:{pt:"R$ 25–70",en:"R$ 25–70"}},
  limpezaSuave:{
    cat:{pt:"Limpeza",en:"Cleanser"}, nome:{pt:"Sabonete líquido suave, sem sulfato agressivo",en:"Gentle liquid cleanser, no harsh sulfate"},
    ativo:{pt:"Tensoativos de aminoácidos + glicerina",en:"Amino-acid surfactants + glycerin"},
    rotulo:{pt:"Procure “glycerin”, “coco-glucoside”. Evite “sodium lauryl sulfate” e fragrância forte.",en:"Look for “glycerin”, “coco-glucoside”. Avoid “sodium lauryl sulfate” and strong fragrance."},
    quando:{pt:"À noite — de manhã, só água",en:"At night — water only in the morning"}, faixa:{pt:"R$ 25–60",en:"R$ 25–60"}},
  niacinamida:{
    cat:{pt:"Sérum",en:"Serum"}, nome:{pt:"Sérum de niacinamida 5–10%",en:"Niacinamide serum 5–10%"},
    ativo:{pt:"Niacinamida (+ zinco PCA quando houver oleosidade)",en:"Niacinamide (+ zinc PCA when oiliness is present)"},
    rotulo:{pt:"“niacinamide” entre 5% e 10%. Acima disso não melhora e irrita mais.",en:"“niacinamide” between 5% and 10%. Above that it doesn't help and irritates more."},
    quando:{pt:"De manhã, antes do hidratante",en:"Morning, before the moisturiser"}, faixa:{pt:"R$ 40–90",en:"R$ 40–90"}},
  salicilico:{
    cat:{pt:"Tratamento",en:"Treatment"}, nome:{pt:"Ácido salicílico 2% (BHA)",en:"Salicylic acid 2% (BHA)"},
    ativo:{pt:"Ácido salicílico — entra no poro e dissolve o sebo",en:"Salicylic acid — gets into the pore and dissolves sebum"},
    rotulo:{pt:"“salicylic acid 2%”, em loção ou sérum leve — não em solução alcoólica.",en:"“salicylic acid 2%”, in a lotion or light serum — not in an alcohol solution."},
    quando:{pt:"À noite, 3x por semana no começo",en:"At night, 3x a week at first"}, faixa:{pt:"R$ 45–95",en:"R$ 45–95"}},
  mandelico:{
    cat:{pt:"Tratamento",en:"Treatment"}, nome:{pt:"Ácido mandélico 5–10%",en:"Mandelic acid 5–10%"},
    ativo:{pt:"AHA de molécula grande — esfolia devagar e irrita menos",en:"Large-molecule AHA — exfoliates slowly, irritates less"},
    rotulo:{pt:"“mandelic acid”. É a opção para quem tem pele sensível e acne ao mesmo tempo.",en:"“mandelic acid”. The option for sensitive skin with acne at the same time."},
    quando:{pt:"À noite, 2 a 3x por semana",en:"At night, 2–3x a week"}, faixa:{pt:"R$ 50–100",en:"R$ 50–100"}},
  glicolico:{
    cat:{pt:"Tratamento",en:"Treatment"}, nome:{pt:"Ácido glicólico ou lático 5–10%",en:"Glycolic or lactic acid 5–10%"},
    ativo:{pt:"AHA para textura, viço e marca superficial",en:"AHA for texture, glow and superficial marks"},
    rotulo:{pt:"“glycolic acid” ou “lactic acid” até 10% para uso em casa.",en:"“glycolic acid” or “lactic acid” up to 10% for home use."},
    quando:{pt:"À noite, 2x por semana, alternando",en:"At night, 2x a week, alternating"}, faixa:{pt:"R$ 45–95",en:"R$ 45–95"}},
  vitaminaC:{
    cat:{pt:"Sérum",en:"Serum"}, nome:{pt:"Vitamina C 10–15%",en:"Vitamin C 10–15%"},
    ativo:{pt:"Ácido ascórbico ou derivado estável, com vitamina E e ferúlico",en:"Ascorbic acid or a stable derivative, with vitamin E and ferulic"},
    rotulo:{pt:"“ascorbic acid”, “ethyl ascorbic acid”. Frasco opaco e bico dosador — vitamina C oxida na luz.",en:"“ascorbic acid”, “ethyl ascorbic acid”. Opaque bottle with a dropper — vitamin C oxidises in light."},
    quando:{pt:"De manhã, antes do protetor",en:"Morning, before sunscreen"}, faixa:{pt:"R$ 60–150",en:"R$ 60–150"}},
  clareador:{
    cat:{pt:"Tratamento",en:"Treatment"}, nome:{pt:"Clareador sem hidroquinona",en:"Brightening serum without hydroquinone"},
    ativo:{pt:"Ácido tranexâmico, alfa-arbutin ou niacinamida",en:"Tranexamic acid, alpha-arbutin or niacinamide"},
    rotulo:{pt:"“tranexamic acid”, “alpha-arbutin”. Constância vale mais que concentração.",en:"“tranexamic acid”, “alpha-arbutin”. Consistency beats concentration."},
    quando:{pt:"À noite",en:"At night"}, faixa:{pt:"R$ 60–140",en:"R$ 60–140"}},
  retinoide:{
    cat:{pt:"Tratamento",en:"Treatment"}, nome:{pt:"Retinóide de uso noturno",en:"Night-time retinoid"},
    ativo:{pt:"Retinol 0,3%, retinaldeído ou granactive retinoid",en:"0.3% retinol, retinaldehyde or granactive retinoid"},
    rotulo:{pt:"“retinol”, “retinal”, “hydroxypinacolone retinoate”. Comece pela menor concentração.",en:"“retinol”, “retinal”, “hydroxypinacolone retinoate”. Start at the lowest concentration."},
    quando:{pt:"À noite, 2x por semana nas 3 primeiras semanas",en:"At night, 2x a week for the first 3 weeks"}, faixa:{pt:"R$ 70–180",en:"R$ 70–180"}},
  bakuchiol:{
    cat:{pt:"Tratamento",en:"Treatment"}, nome:{pt:"Bakuchiol ou peptídeos",en:"Bakuchiol or peptides"},
    ativo:{pt:"Alternativa ao retinóide quando ele está contraindicado",en:"Alternative to retinoid when it's contraindicated"},
    rotulo:{pt:"“bakuchiol”, “matrixyl”, “palmitoyl tripeptide”.",en:"“bakuchiol”, “matrixyl”, “palmitoyl tripeptide”."},
    quando:{pt:"À noite",en:"At night"}, faixa:{pt:"R$ 60–140",en:"R$ 60–140"}},
  hialuronico:{
    cat:{pt:"Hidratação",en:"Hydration"}, nome:{pt:"Sérum de ácido hialurônico",en:"Hyaluronic acid serum"},
    ativo:{pt:"Hialurônico em pesos moleculares diferentes + pantenol",en:"Hyaluronic acid in different molecular weights + panthenol"},
    rotulo:{pt:"“sodium hyaluronate”. Aplique com a pele ainda úmida e sele com hidratante.",en:"“sodium hyaluronate”. Apply on damp skin and seal with a moisturiser."},
    quando:{pt:"Manhã e noite",en:"Morning and night"}, faixa:{pt:"R$ 35–90",en:"R$ 35–90"}},
  ceramidas:{
    cat:{pt:"Hidratação",en:"Hydration"}, nome:{pt:"Hidratante com ceramidas",en:"Moisturiser with ceramides"},
    ativo:{pt:"Ceramidas + colesterol + ácidos graxos — reconstrói a barreira",en:"Ceramides + cholesterol + fatty acids — rebuilds the barrier"},
    rotulo:{pt:"“ceramide NP”, “cholesterol”, “squalane”.",en:"“ceramide NP”, “cholesterol”, “squalane”."},
    quando:{pt:"Manhã e noite, por cima dos séruns",en:"Morning and night, over the serums"}, faixa:{pt:"R$ 40–120",en:"R$ 40–120"}},
  gelHidratante:{
    cat:{pt:"Hidratação",en:"Hydration"}, nome:{pt:"Gel hidratante oil-free",en:"Oil-free moisturising gel"},
    ativo:{pt:"Textura leve para pele oleosa que ainda precisa de água",en:"Light texture for oily skin that still needs water"},
    rotulo:{pt:"“oil free”, “non-comedogenic”, glicerina no começo da lista.",en:"“oil free”, “non-comedogenic”, glycerin early in the list."},
    quando:{pt:"Manhã e noite",en:"Morning and night"}, faixa:{pt:"R$ 35–90",en:"R$ 35–90"}},
  olhos:{
    cat:{pt:"Área dos olhos",en:"Eye area"}, nome:{pt:"Creme para área dos olhos com cafeína",en:"Eye cream with caffeine"},
    ativo:{pt:"Cafeína + peptídeos + vitamina K",en:"Caffeine + peptides + vitamin K"},
    rotulo:{pt:"“caffeine”, “peptides”. Aplique batendo de leve com o dedo anelar.",en:"“caffeine”, “peptides”. Tap gently with your ring finger."},
    quando:{pt:"De manhã",en:"In the morning"}, faixa:{pt:"R$ 45–120",en:"R$ 45–120"}},
  calmante:{
    cat:{pt:"Calmante",en:"Soothing"}, nome:{pt:"Sérum calmante para pele reativa",en:"Soothing serum for reactive skin"},
    ativo:{pt:"Bisabolol, alantoína, centella asiática, pantenol",en:"Bisabolol, allantoin, centella asiatica, panthenol"},
    rotulo:{pt:"“centella asiatica”, “bisabolol”, “panthenol”. Sem fragrância e sem álcool.",en:"“centella asiatica”, “bisabolol”, “panthenol”. Fragrance-free and alcohol-free."},
    quando:{pt:"Sempre que a pele estiver reativa",en:"Whenever the skin is reactive"}, faixa:{pt:"R$ 40–110",en:"R$ 40–110"}},
  protetor:{
    cat:{pt:"Proteção",en:"Protection"}, nome:{pt:"Protetor solar facial FPS 30–50",en:"Facial sunscreen SPF 30–50"},
    ativo:{pt:"Filtros UVA/UVB de amplo espectro",en:"Broad-spectrum UVA/UVB filters"},
    rotulo:{pt:"“FPS 30” ou mais e “PPD” ou “UVA” em círculo. A textura certa é a que você usa todo dia.",en:"“SPF 30” or higher and “PPD” or circled “UVA”. The right texture is the one you'll wear daily."},
    quando:{pt:"De manhã, último passo. Reaplique a cada 3h se pegar sol",en:"Morning, last step. Reapply every 3h with sun exposure"}, faixa:{pt:"R$ 45–130",en:"R$ 45–130"}},
  protetorCor:{
    cat:{pt:"Proteção",en:"Protection"}, nome:{pt:"Protetor solar FPS 50+ com cor",en:"Tinted sunscreen SPF 50+"},
    ativo:{pt:"Filtros UVA/UVB + pigmento (barreira contra luz visível)",en:"UVA/UVB filters + pigment (visible-light barrier)"},
    rotulo:{pt:"“FPS 50+”, “com cor” ou “tinted”. O pigmento é o que segura a luz visível, que piora melasma.",en:"“SPF 50+”, “tinted”. Pigment is what holds back visible light, which worsens melasma."},
    quando:{pt:"De manhã, todos os dias. Reaplique a cada 3h",en:"Every morning. Reapply every 3h"}, faixa:{pt:"R$ 60–160",en:"R$ 60–160"}}
};

/* ==========================================================================
   5. MOTOR — roda inteiro no navegador, sem enviar nada
   ========================================================================== */
function analyze(a){
  const q = a.queixas || [], r = a.restricoes || [];
  const has = v => q.includes(v);
  const restr = v => r.includes(v);
  const sens = a.sensibilidade === "alta";
  const sensMed = a.sensibilidade === "media";
  const novato = a.experiencia === "nenhuma";
  const gestante = restr("gestante");
  const isotret = restr("isotretinoina");
  const dermatite = restr("dermatite");

  /* chips de leitura */
  const tipoLbl = QUESTIONS[0].options.find(o => o.v === a.tipo);
  const chips = [];
  if(tipoLbl) chips.push({t:L(tipoLbl.d), key:true});
  if(sens) chips.push({t:lang === "pt" ? "Pele sensível" : "Sensitive skin"});
  else if(sensMed) chips.push({t:lang === "pt" ? "Reativa às vezes" : "Sometimes reactive"});
  q.slice(0,3).forEach(v => {
    const o = QUESTIONS[1].options.find(x => x.v === v);
    if(o) chips.push({t:L(o.l)});
  });

  const alertas = [], evitar = [], produtos = [];
  const add = k => { if(!produtos.includes(k)) produtos.push(k); };
  const T = (pt,en) => lang === "pt" ? pt : en;

  /* limpeza */
  if(a.tipo === "oleosa" || a.tipo === "mista") add(sens ? "limpezaSuave" : "limpezaOleosa");
  else add("limpezaSuave");

  /* situações que travam a rotina */
  if(isotret){
    alertas.push(T(
      "Você marcou tratamento com isotretinoína oral. Durante o tratamento a pele fica fina e reativa: ácidos, retinóides tópicos e esfoliantes ficam de fora. A rotina aqui é limpeza suave, hidratação generosa e protetor solar — e qualquer mudança passa antes pelo seu dermatologista.",
      "You marked oral isotretinoin. During treatment the skin is thin and reactive: acids, topical retinoids and exfoliants are out. This routine is gentle cleansing, generous moisturising and sunscreen — and any change goes through your dermatologist first."));
    evitar.push(T("Ácidos esfoliantes (AHA e BHA), retinóides tópicos, esfoliação física e cera no rosto.",
                  "Exfoliating acids (AHA and BHA), topical retinoids, physical scrubs and facial waxing."));
  }
  if(dermatite){
    alertas.push(T(
      "Rosácea, dermatite ou eczema diagnosticados mudam o jogo: barreira comprometida não tolera ácido nem retinóide na frequência habitual. Trate a inflamação com seu dermatologista antes de introduzir ativos.",
      "Diagnosed rosacea, dermatitis or eczema change the picture: a compromised barrier doesn't tolerate acids or retinoids at the usual frequency. Treat the inflammation with your dermatologist before introducing actives."));
  }
  if(gestante){
    alertas.push(T(
      "Na gestação e na amamentação, retinóides tópicos estão contraindicados e o ácido salicílico deve ficar em concentração baixa e área pequena. A rotina abaixo já sai sem eles — confirme com quem acompanha o seu pré-natal.",
      "During pregnancy and breastfeeding, topical retinoids are contraindicated and salicylic acid should stay at low concentration on small areas. The routine below already excludes them — confirm with the professional following your prenatal care."));
    evitar.push(T("Retinol, retinaldeído, tretinoína, adapaleno e hidroquinona.",
                  "Retinol, retinaldehyde, tretinoin, adapalene and hydroquinone."));
  }

  const travado = isotret;

  /* tratamento por queixa */
  if(!travado){
    if(has("acne")){
      add(sens || dermatite ? "mandelico" : "salicilico");
      if(!sens && !dermatite) alertas.push(T(
        "Espinha inflamada, dolorida e profunda não é caso de cosmético: é caso de dermatologista. O que está aqui ajuda cravo e espinha superficial.",
        "Inflamed, painful, deep cystic acne is not a cosmetic case: it's a dermatologist's. What's here helps blackheads and superficial breakouts."));
    }
    if(has("oleosidade") || has("poros")) add("niacinamida");
    if(has("manchas") || has("melasma")){
      add("vitaminaC"); add("clareador");
      if(has("melasma")) alertas.push(T(
        "Melasma é condição crônica e recidivante. Sem protetor com cor todos os dias nenhum clareador funciona — e o acompanhamento com dermatologista faz diferença real no resultado.",
        "Melasma is chronic and recurrent. Without a tinted sunscreen every day no brightener works — and dermatologist follow-up makes a real difference."));
    }
    if(has("linhas")) add(gestante || dermatite ? "bakuchiol" : "retinoide");
    if(has("textura") && !has("acne")) add(sens ? "mandelico" : "glicolico");
    if(has("olheiras")) add("olhos");
    if(has("vermelhidao")){
      add("calmante");
      evitar.push(T("Ácidos em concentração alta, esfoliante físico, água quente no rosto e fragrância.",
                    "High-concentration acids, physical scrubs, hot water on the face and fragrance."));
    }
    if(has("ressecamento")) add("hialuronico");
  }

  /* hidratação */
  if(a.tipo === "seca" || has("ressecamento") || has("vermelhidao") || travado || dermatite) add("ceramidas");
  else add("gelHidratante");
  if(has("linhas") && !produtos.includes("hialuronico") && !travado) add("hialuronico");

  /* proteção */
  add(has("melasma") || has("manchas") ? "protetorCor" : "protetor");
  if(a.sol === "nenhum" || a.sol === "exposto") alertas.push(T(
    "Sem fotoproteção diária, clareador e antissinais viram desperdício: o sol desfaz em uma manhã o que o produto levou semanas para construir. Se for começar por um passo só, comece pelo protetor.",
    "Without daily sun protection, brighteners and anti-ageing actives are wasted: the sun undoes in one morning what a product took weeks to build. If you start with one step only, start with sunscreen."));

  /* ordem: essencial primeiro, depois os ativos na ordem das queixas */
  const ESSENCIAL = ["limpezaOleosa","limpezaSuave","protetorCor","protetor","gelHidratante","ceramidas"];
  const POR_QUEIXA = {
    acne:["salicilico","mandelico"], oleosidade:["niacinamida"], poros:["niacinamida"],
    manchas:["vitaminaC","clareador"], melasma:["protetorCor","clareador","vitaminaC"],
    linhas:["retinoide","bakuchiol","hialuronico"], olheiras:["olhos"], vermelhidao:["calmante"],
    textura:["glicolico","mandelico"], ressecamento:["hialuronico","ceramidas"]
  };
  let lista = ESSENCIAL.filter(k => produtos.includes(k));
  q.forEach(qz => (POR_QUEIXA[qz] || []).forEach(k => {
    if(produtos.includes(k) && !lista.includes(k)) lista.push(k);
  }));
  produtos.forEach(k => { if(!lista.includes(k)) lista.push(k); });

  const limite = travado ? 3 : (a.orcamento === "baixo" ? 4 : a.orcamento === "medio" ? 6 : 8);
  const cortados = lista.slice(limite);
  lista = lista.slice(0, limite);
  if(cortados.length) alertas.push(T(
    "Cortamos " + cortados.length + " item(ns) para caber no orçamento e na rotina. Comece pelo que está na lista; o resto entra quando os primeiros estiverem funcionando.",
    "We trimmed " + cortados.length + " item(s) to fit your budget and routine. Start with what's listed; the rest comes in once the first ones are working."));
  if(novato && !travado) alertas.push(T(
    "Como você nunca usou ácido ou retinóide: entre com um ativo por vez, 2x na primeira semana, e só adicione o próximo depois de 3 semanas sem ardência.",
    "Since you've never used an acid or a retinoid: introduce one active at a time, 2x in the first week, and only add the next after 3 weeks without stinging."));

  /* rotinas */
  const nomeLimpeza = lista.includes("limpezaOleosa") ? T("Gel de limpeza","Gel cleanser") : T("Sabonete líquido suave","Gentle liquid cleanser");
  const nomeHidra = lista.includes("ceramidas") ? T("Hidratante com ceramidas","Moisturiser with ceramides") : T("Gel hidratante oil-free","Oil-free moisturising gel");
  const peleDelicada = a.tipo === "seca" || has("vermelhidao");

  const am = [];
  am.push(peleDelicada
    ? {t:T("Água corrente, sem sabonete","Water only, no cleanser"), d:T("De manhã a pele não está suja: lavar de novo tira a barreira que se refez à noite.","In the morning skin isn't dirty: washing again strips the barrier rebuilt overnight.")}
    : {t:nomeLimpeza, d:T("Massagem rápida, água morna, sem esfregar.","Quick massage, lukewarm water, no scrubbing.")});
  if(lista.includes("vitaminaC")) am.push({t:T("Vitamina C","Vitamin C"), d:T("3 a 4 gotas no rosto seco. Espere 1 minuto antes do próximo passo.","3–4 drops on dry skin. Wait a minute before the next step.")});
  if(lista.includes("niacinamida")) am.push({t:T("Niacinamida","Niacinamide"), d:T("Controla oleosidade e melhora o aspecto do poro ao longo das semanas.","Controls oiliness and improves pore appearance over the weeks.")});
  if(lista.includes("hialuronico") && !lista.includes("vitaminaC")) am.push({t:T("Ácido hialurônico","Hyaluronic acid"), d:T("Na pele ainda úmida — em pele seca ele puxa água de dentro.","On damp skin — on dry skin it pulls water from within.")});
  if(lista.includes("olhos")) am.push({t:T("Creme para os olhos","Eye cream"), d:T("Dedo anelar, batidinhas leves, do canto interno para fora.","Ring finger, light taps, from the inner corner outwards.")});
  am.push({t:nomeHidra, d:T("Sela tudo que veio antes.","Seals everything that came before.")});
  am.push({t:lista.includes("protetorCor") ? T("Protetor solar FPS 50+ com cor","Tinted sunscreen SPF 50+") : T("Protetor solar FPS 30–50","Sunscreen SPF 30–50"),
           d:T("Dois dedos de produto para rosto e pescoço. É o passo que não pode faltar.","Two fingers of product for face and neck. This is the step that can't be skipped.")});

  const pm = [];
  pm.push({t:nomeLimpeza, d:T("Se usou protetor ou maquiagem, lave duas vezes: uma para remover, outra para limpar.","If you wore sunscreen or makeup, cleanse twice: once to remove, once to clean.")});
  const ativosPM = [];
  if(lista.includes("salicilico")) ativosPM.push(T("Ácido salicílico 2%","Salicylic acid 2%"));
  if(lista.includes("mandelico")) ativosPM.push(T("Ácido mandélico","Mandelic acid"));
  if(lista.includes("glicolico")) ativosPM.push(T("Ácido glicólico ou lático","Glycolic or lactic acid"));
  if(lista.includes("retinoide")) ativosPM.push(T("Retinóide","Retinoid"));
  if(lista.includes("bakuchiol")) ativosPM.push(T("Bakuchiol ou peptídeos","Bakuchiol or peptides"));
  if(lista.includes("clareador")) ativosPM.push(T("Clareador (tranexâmico ou alfa-arbutin)","Brightener (tranexamic or alpha-arbutin)"));
  if(ativosPM.length === 1){
    pm.push({t:ativosPM[0], d:T("Pele seca, camada fina. Comece 2x por semana e aumente conforme a pele aceitar.","Dry skin, thin layer. Start 2x a week and increase as your skin accepts it.")});
  } else if(ativosPM.length > 1){
    pm.push({t:ativosPM[0], d:T("Em noites alternadas — nunca no mesmo dia que " + ativosPM.slice(1).join(T(" ou "," or ")) + ".",
                                "On alternate nights — never the same night as " + ativosPM.slice(1).join(" or ") + ".")});
    pm.push({t:ativosPM.slice(1).join(" / "), d:T("Nas outras noites. Ácido e retinóide na mesma noite é a receita mais comum de barreira quebrada.","On the other nights. Acid and retinoid on the same night is the most common way to break the barrier.")});
  }
  if(lista.includes("calmante")) pm.push({t:T("Sérum calmante","Soothing serum"), d:T("Nos dias em que a pele estiver reativa, ele entra no lugar do ativo.","On days when skin is reactive, it takes the active's place.")});
  if(lista.includes("hialuronico")) pm.push({t:T("Ácido hialurônico","Hyaluronic acid"), d:T("Na pele levemente úmida.","On slightly damp skin.")});
  pm.push({t:nomeHidra, d:T("Camada generosa. Se usou ativo, o hidratante amortece a irritação.","Generous layer. If you used an active, the moisturiser cushions the irritation.")});

  const medico = lang === "pt" ? [
    "Lesão que muda de cor, tamanho ou formato, ou que sangra sem motivo",
    "Acne com nódulos dolorosos, que deixa marca ou não responde a nada",
    "Vermelhidão persistente com ardência, calor ou vasinhos aparentes",
    "Ferida que não cicatriza em duas semanas",
    "Qualquer quadro que piore depois de 6 a 8 semanas de rotina constante"
  ] : [
    "A lesion that changes colour, size or shape, or bleeds for no reason",
    "Acne with painful nodules, that scars or responds to nothing",
    "Persistent redness with burning, heat or visible vessels",
    "A wound that doesn't heal within two weeks",
    "Anything that worsens after 6 to 8 weeks of a consistent routine"
  ];

  /* título honesto, derivado da primeira queixa */
  const titulos = {
    acne:T("Uma rotina para controlar cravos e espinhas","A routine to control blackheads and breakouts"),
    oleosidade:T("Uma rotina para segurar a oleosidade","A routine to hold oiliness in check"),
    poros:T("Uma rotina para refinar textura e poros","A routine to refine texture and pores"),
    manchas:T("Uma rotina para uniformizar as manchas","A routine to even out dark spots"),
    melasma:T("Uma rotina de manejo do melasma","A routine to manage melasma"),
    linhas:T("Uma rotina antissinais para começar agora","An anti-ageing routine to start now"),
    olheiras:T("Uma rotina para a área dos olhos","A routine for the eye area"),
    vermelhidao:T("Uma rotina para acalmar a pele reativa","A routine to calm reactive skin"),
    textura:T("Uma rotina para devolver viço e textura","A routine to bring back glow and texture"),
    ressecamento:T("Uma rotina para reconstruir a barreira","A routine to rebuild the barrier")
  };
  const titulo = titulos[q[0]] || T("A sua rotina de cuidados","Your skincare routine");

  return {titulo, chips, produtos:lista, alertas, evitar, am, pm, medico};
}

/* ==========================================================================
   6. QUIZ
   ========================================================================== */
const answers = {};
const lead = {};
let step = 0;
let onLead = false;   /* true enquanto o passo de contato está na tela */
const qBody = document.getElementById("quizBody");
const qCount = document.getElementById("quizCount");
const qBar = document.getElementById("quizBar");
const resultEl = document.getElementById("result");

const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const CHECK = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M3.5 8.5 6.4 11.3 12.5 4.8"/></svg>';

function renderStep(){
  const Q = QUESTIONS[step];
  qCount.textContent = (step + 1) + " / " + QUESTIONS.length;
  qBar.style.width = (step / QUESTIONS.length * 100) + "%";

  let html = '<h3 class="quiz-q">' + esc(L(Q.q)) + "</h3>";
  if(Q.help) html += '<p class="quiz-help">' + esc(L(Q.help)) + "</p>";

  if(Q.kind === "text"){
    html += '<label class="sr-only" for="quizText">' + esc(L(Q.q)) + "</label>" +
      '<textarea class="quiz-field" id="quizText" placeholder="' + esc(L(Q.placeholder)) + '">' + esc(answers[Q.id] || "") + "</textarea>";
  } else {
    const multi = Q.kind === "many";
    const sel = multi ? (answers[Q.id] || []) : answers[Q.id];
    html += '<div class="opts' + (Q.cols === 2 ? " cols-2" : "") + '" role="' + (multi ? "group" : "radiogroup") + '" aria-label="' + esc(L(Q.q)) + '">';
    Q.options.forEach(o => {
      const on = multi ? sel.includes(o.v) : sel === o.v;
      const attr = multi ? 'aria-pressed="' + on + '"' : 'role="radio" aria-checked="' + on + '"';
      html += '<button type="button" class="opt' + (multi ? " multi" : "") + '" data-v="' + o.v + '" ' + attr + '>' +
        '<span class="box">' + CHECK + "</span>" +
        '<span class="txt"><b>' + esc(L(o.l)) + "</b>" + (o.d ? "<span>" + esc(L(o.d)) + "</span>" : "") + "</span></button>";
    });
    html += "</div>";
  }

  const last = step === QUESTIONS.length - 1;
  html += '<div class="quiz-actions">';
  if(step > 0) html += '<button type="button" class="quiz-back" id="quizBack">← ' + esc(t("quiz.back")) + "</button>";
  html += '<button type="button" class="btn btn-primary" id="quizNext">' + esc(last ? t("quiz.finish") : t("quiz.continue")) + "</button></div>";

  qBody.innerHTML = html;

  const opts = [...qBody.querySelectorAll(".opt")];
  opts.forEach(btn => btn.addEventListener("click", () => choose(btn)));

  /* setas navegam entre as alternativas de escolha única, como manda o padrão de radiogroup */
  if(Q.kind === "one"){
    opts.forEach((btn, i) => btn.addEventListener("keydown", ev => {
      const k = ev.key;
      if(k !== "ArrowDown" && k !== "ArrowRight" && k !== "ArrowUp" && k !== "ArrowLeft") return;
      ev.preventDefault();
      const dir = (k === "ArrowDown" || k === "ArrowRight") ? 1 : -1;
      opts[(i + dir + opts.length) % opts.length].focus();
    }));
  }
  const back = document.getElementById("quizBack");
  if(back) back.addEventListener("click", () => { if(step > 0){ step--; renderStep(); } });
  document.getElementById("quizNext").addEventListener("click", next);

  const first = qBody.querySelector(".opt, .quiz-field");
  if(first && step > 0) first.focus({preventScroll:true});
}

function choose(btn){
  const Q = QUESTIONS[step];
  const v = btn.dataset.v;
  if(Q.kind === "many"){
    const cur = answers[Q.id] || [];
    const on = cur.includes(v);
    let novo;
    if(on) novo = cur.filter(x => x !== v);
    else if(Q.none && v === Q.none) novo = [v];                       /* "nenhuma" limpa o resto */
    else {
      novo = cur.filter(x => x !== Q.none);
      if(Q.max && novo.length >= Q.max){ flash(t("quiz.max")); return; }
      novo = novo.concat(v);
    }
    answers[Q.id] = novo;
    qBody.querySelectorAll(".opt").forEach(b => b.setAttribute("aria-pressed", novo.includes(b.dataset.v)));
  } else {
    answers[Q.id] = v;
    qBody.querySelectorAll(".opt").forEach(b => b.setAttribute("aria-checked", b.dataset.v === v));
    setTimeout(next, 220);   /* avança sozinho na escolha única */
  }
}

function flash(msg){
  let el = qBody.querySelector(".quiz-flash");
  if(!el){
    el = document.createElement("p");
    el.className = "quiz-flash quiz-help";
    el.setAttribute("role","status");
    el.style.color = "var(--color-graphite)";
    qBody.querySelector(".opts").after(el);
  }
  el.textContent = msg;
}

function next(){
  const Q = QUESTIONS[step];
  if(Q.kind === "text"){
    const f = document.getElementById("quizText");
    if(f) answers[Q.id] = f.value.trim();
  }
  if(Q.kind === "one" && !answers[Q.id]) return;
  if(Q.kind === "many" && (!answers[Q.id] || !answers[Q.id].length)) return;

  if(step < QUESTIONS.length - 1){ step++; renderStep(); }
  else renderLead();
}

/* ==========================================================================
   6b. PASSO DE CONTATO — a rotina aparece depois que a pessoa se identifica
   ========================================================================== */
function renderLead(){
  onLead = true;
  qCount.textContent = t("lead.step");
  qBar.style.width = "96%";

  const campo = (id, label, type, opt) =>
    '<div class="field" id="f-' + id + '">' +
      '<label for="lead-' + id + '">' + esc(label) + (opt ? ' <span>' + esc(t("lead.optional")) + "</span>" : "") + "</label>" +
      '<input id="lead-' + id + '" name="' + id + '" type="' + type + '" ' +
        'autocomplete="' + (id === "name" ? "name" : id === "email" ? "email" : "tel") + '" ' +
        (opt ? "" : 'required aria-required="true" ') +
        'aria-describedby="e-' + id + '" value="' + esc(lead[id] || "") + '">' +
      '<p class="err" id="e-' + id + '" role="alert"></p></div>';

  qBody.innerHTML =
    '<h3 class="quiz-q">' + esc(t("lead.title")) + "</h3>" +
    '<p class="quiz-help">' + esc(t("lead.help")) + "</p>" +
    '<form class="lead" id="leadForm" novalidate>' +
      '<div class="row-2">' + campo("name", t("lead.name"), "text") + campo("email", t("lead.email"), "email") + "</div>" +
      campo("phone", t("lead.phone"), "tel", true) +
      '<div class="field" id="f-consent">' +
        '<label class="consent-line" for="lead-consent">' +
          '<input type="checkbox" id="lead-consent"' + (lead.consent ? " checked" : "") + ' aria-describedby="e-consent">' +
          "<span>" + esc(t("lead.consent")) + ' <a href="privacidade.html" target="_blank" rel="noopener">' + esc(t("lead.privacy")) + "</a>.</span>" +
        "</label><p class=\"err\" id=\"e-consent\" role=\"alert\"></p></div>" +
      '<p class="lead-note">' + esc(t("lead.note")) + "</p>" +
      '<div class="quiz-actions">' +
        '<button type="button" class="quiz-back" id="leadBack">← ' + esc(t("quiz.back")) + "</button>" +
        '<button type="submit" class="btn btn-primary">' + esc(t("lead.submit")) + "</button>" +
      "</div></form>";

  document.getElementById("leadBack").addEventListener("click", () => {
    onLead = false; renderStep();
  });
  document.getElementById("leadForm").addEventListener("submit", ev => {
    ev.preventDefault();
    submitLead();
  });
  const first = document.getElementById("lead-name");
  if(first) first.focus({preventScroll:true});
}

function markErr(id, msg){
  const box = document.getElementById("f-" + id);
  const input = document.getElementById("lead-" + id);
  box.classList.toggle("is-bad", !!msg);
  document.getElementById("e-" + id).textContent = msg || "";
  if(input) input.setAttribute("aria-invalid", msg ? "true" : "false");
  return !msg;
}

function submitLead(){
  const nome = document.getElementById("lead-name").value.trim();
  const email = document.getElementById("lead-email").value.trim();
  const fone = document.getElementById("lead-phone").value.trim();
  const aceite = document.getElementById("lead-consent").checked;

  const okNome = markErr("name", nome.length >= 2 ? "" : t("lead.errName"));
  const okMail = markErr("email", /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "" : t("lead.errEmail"));
  const okAceite = markErr("consent", aceite ? "" : t("lead.errConsent"));
  if(!okNome || !okMail || !okAceite){
    const alvo = document.querySelector(".field.is-bad input");
    if(alvo) alvo.focus();
    return;
  }

  lead.name = nome; lead.email = email; lead.phone = fone; lead.consent = true;
  onLead = false;
  finish();
}

/* Envia o contato para o endpoint configurado. Nunca bloqueia o resultado:
   se a rede falhar, a pessoa vê a rotina do mesmo jeito. */
function sendLead(plan){
  if(!CONFIG.leadEndpoint){
    /* TODO: preencher CONFIG.leadEndpoint para o contato chegar em algum lugar */
    return;
  }
  const payload = {
    nome: lead.name, email: lead.email, whatsapp: lead.phone || "",
    aceite: !!lead.consent, idioma: lang,
    origem: UTM || "direto", pagina: location.href,
    rotina: plan.titulo, momento: new Date().toISOString()
  };
  if(CONFIG.sendAnswers) payload.respostas = Object.assign({}, answers);
  try{
    fetch(CONFIG.leadEndpoint, {
      method:"POST",
      headers:{"Content-Type":"application/json", "Accept":"application/json"},
      body: JSON.stringify(payload)
    }).catch(()=>{});
  }catch(e){}
  if(window.fbq) window.fbq("track", "Lead");
}

function finish(){
  qBar.style.width = "100%";
  qCount.textContent = QUESTIONS.length + " / " + QUESTIONS.length;
  qBody.innerHTML = '<div class="thinking"><div class="dots"><i></i><i></i><i></i></div><p>' + esc(t("quiz.thinking")) + "</p></div>";
  const plan = analyze(answers);
  sendLead(plan);
  setTimeout(() => renderResult(plan), 900);
}

/* ==========================================================================
   7. RESULTADO
   ========================================================================== */
function renderResult(plan){
  const routine = arr => arr.map((s,i) =>
    '<div class="rstep"><b>' + String(i+1).padStart(2,"0") + "</b><div><strong>" + esc(s.t) + "</strong><span>" + esc(s.d) + "</span></div></div>").join("");

  let html = '<div class="result-head">' +
    '<div><span class="eyebrow">' + esc(t("res.eyebrow")) + "</span>" +
    '<h3 class="h-section">' + esc(plan.titulo) + "</h3>" +
    '<div class="chips">' + plan.chips.map(c => '<span class="chip' + (c.key ? " is-key" : "") + '">' + esc(c.t) + "</span>").join("") + "</div></div>" +
    '<button type="button" class="btn btn-ghost btn-sm" id="redo">' + esc(t("res.redo")) + "</button></div>";

  html += '<div class="result-grid"><div>';
  html += '<div class="block"><h4>' + esc(t("res.am")) + '</h4><div class="routine">' + routine(plan.am) + "</div></div>";
  html += '<div class="block"><h4>' + esc(t("res.pm")) + '</h4><div class="routine">' + routine(plan.pm) + "</div></div>";
  html += '<div class="block"><h4>' + esc(t("res.prods")) + '</h4><div class="prods">' +
    plan.produtos.map(k => {
      const p = CATALOG[k];
      return '<article class="prod"><div class="prod-top"><span class="prod-cat">' + esc(L(p.cat)) + '</span>' +
        '<span class="prod-price">' + esc(L(p.faixa)) + "</span></div>" +
        "<h5>" + esc(L(p.nome)) + "</h5><dl>" +
        "<div><dt>" + esc(t("res.active")) + "</dt><dd>" + esc(L(p.ativo)) + "</dd></div>" +
        "<div><dt>" + esc(t("res.label")) + "</dt><dd>" + esc(L(p.rotulo)) + "</dd></div>" +
        "<div><dt>" + esc(t("res.when")) + "</dt><dd>" + esc(L(p.quando)) + "</dd></div>" +
        "</dl></article>";
    }).join("") + "</div></div>";
  html += "</div><aside>";

  if(plan.alertas.length){
    html += '<div class="aside-card is-alert"><h4>' + esc(t("res.before")) + "</h4><ul>" +
      plan.alertas.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul></div>";
  }
  if(plan.evitar.length){
    html += '<div class="aside-card"><h4>' + esc(t("res.avoid")) + "</h4><ul>" +
      plan.evitar.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul></div>";
  }
  html += '<div class="aside-card"><h4>' + esc(t("res.doctor")) + "</h4><ul>" +
    plan.medico.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul></div>";
  html += "</aside></div>";

  html += '<div class="result-cta"><h4>' + esc(t("res.ctaTitle")) + "</h4>" +
    "<p>" + esc(t("res.ctaText")) + "</p>" +
    '<a class="btn btn-ghost" href="#" data-wa target="_blank" rel="noopener">' + esc(t("cta.whats")) + "</a></div>";

  resultEl.innerHTML = html;
  resultEl.classList.add("is-on");
  applyWhatsLinks();

  document.getElementById("redo").addEventListener("click", () => {
    step = 0;
    onLead = false;
    Object.keys(answers).forEach(k => delete answers[k]);
    resultEl.classList.remove("is-on");
    resultEl.innerHTML = "";
    renderStep();
    document.getElementById("quiz").scrollIntoView({block:"start"});
  });

  resultEl.focus({preventScroll:true});
  resultEl.scrollIntoView({behavior:"smooth", block:"start"});
}

/* ==========================================================================
   8. IDIOMA
   ========================================================================== */
function applyLang(next){
  lang = next;
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.dataset.i18n, v = I18N[lang][k];
    if(v === undefined) return;
    if(/<[a-z]/i.test(v)) el.innerHTML = v; else el.textContent = v;
  });
  const h1 = document.querySelector(".hero h1");
  if(h1) h1.innerHTML = I18N[lang]["hero.h1"];
  document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === lang));
  try{ localStorage.setItem("dermatic-lang", lang); }catch(e){}
  applyWhatsLinks();
  if(resultEl.classList.contains("is-on")) renderResult(analyze(answers));
  else if(onLead) renderLead();
  else renderStep();
}

function initLang(){
  document.querySelectorAll(".lang button").forEach(b =>
    b.addEventListener("click", () => { if(b.dataset.lang !== lang) applyLang(b.dataset.lang); }));
  let saved = null;
  try{ saved = localStorage.getItem("dermatic-lang"); }catch(e){}
  const url = new URLSearchParams(location.search).get("lang");
  const nav = (navigator.language || "pt").toLowerCase();
  const start = url || saved || (nav.startsWith("pt") ? "pt" : nav.startsWith("en") ? "en" : "pt");
  applyLang(start === "en" ? "en" : "pt");
}

/* ==========================================================================
   9. INTERFACE
   ========================================================================== */
/* UTM: preserva os parâmetros da campanha entre páginas e no link do WhatsApp */
const UTM = (() => {
  const p = new URLSearchParams(location.search);
  const keep = new URLSearchParams();
  ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","fbclid"].forEach(k => {
    if(p.get(k)) keep.set(k, p.get(k));
  });
  return keep.toString();
})();

function whatsHref(){
  let msg = WHATS_MSG[lang] || WHATS_MSG.pt;
  if(UTM) msg += " (" + UTM.replace(/&/g, ", ") + ")";
  return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg);
}

function applyWhatsLinks(){
  document.querySelectorAll("[data-wa]").forEach(a => {
    a.href = whatsHref();
    a.target = "_blank";
    a.rel = "noopener";
  });
}

function applyConfig(){
  document.querySelectorAll('[data-social="facebook"]').forEach(a => { a.href = CONFIG.facebook; });
  document.querySelectorAll("[data-email]").forEach(a => { a.href = "mailto:" + CONFIG.email; a.textContent = CONFIG.email; });
  if(UTM) document.querySelectorAll('a[href$=".html"]').forEach(a => { a.href = a.getAttribute("href") + "?" + UTM; });
  const y = document.getElementById("year");
  if(y) y.textContent = new Date().getFullYear();
}

/* hero interativo: o ponteiro inclina o disco, move a lente de leitura,
   acende as marcas que passam sob ela e desloca os chips em profundidades
   diferentes. Sem ponteiro (toque, teclado, reduced motion), a lente
   continua derivando sozinha pelo CSS. */
function initScan(){
  const scan = document.getElementById("scan");
  const skin = document.getElementById("skin");
  if(!scan || !skin) return;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const marks = [...scan.querySelectorAll(".skin-mark")];
  const chips = [...scan.querySelectorAll(".scan-chip")];
  let raf = null, ponto = null;

  const desenha = () => {
    raf = null;
    if(!ponto) return;
    const r = scan.getBoundingClientRect();
    const s = skin.getBoundingClientRect();

    /* -1 a 1 a partir do centro do conjunto */
    scan.style.setProperty("--px", ((ponto.x - (r.left + r.width/2)) / (r.width/2)).toFixed(3));
    scan.style.setProperty("--py", ((ponto.y - (r.top + r.height/2)) / (r.height/2)).toFixed(3));

    /* a lente não sai do disco: prende o ponto dentro do raio útil */
    const cx = s.left + s.width/2, cy = s.top + s.height/2, raio = s.width/2 * 0.72;
    let dx = ponto.x - cx, dy = ponto.y - cy;
    const dist = Math.hypot(dx, dy);
    if(dist > raio){ dx = dx / dist * raio; dy = dy / dist * raio; }
    const lx = (s.width/2 + dx) / s.width * 100;
    const ly = (s.height/2 + dy) / s.height * 100;
    scan.style.setProperty("--lx", lx.toFixed(2) + "%");
    scan.style.setProperty("--ly", ly.toFixed(2) + "%");

    /* marcas sob a lente */
    marks.forEach(m => {
      const mx = parseFloat(m.style.getPropertyValue("--x")) / 100 * s.width;
      const my = parseFloat(m.style.getPropertyValue("--y")) / 100 * s.height;
      const perto = Math.hypot(mx - (s.width/2 + dx), my - (s.height/2 + dy)) < 52;
      m.classList.toggle("is-read", perto);
    });

    /* chip mais próximo do ponteiro */
    let melhor = null, menor = Infinity;
    chips.forEach(c => {
      const b = c.getBoundingClientRect();
      const d = Math.hypot(ponto.x - (b.left + b.width/2), ponto.y - (b.top + b.height/2));
      if(d < menor){ menor = d; melhor = c; }
    });
    chips.forEach(c => c.classList.toggle("is-near", c === melhor && menor < 220));
  };

  scan.addEventListener("pointermove", e => {
    if(e.pointerType === "touch") return;
    scan.classList.add("is-live");
    ponto = {x:e.clientX, y:e.clientY};
    if(!raf) raf = requestAnimationFrame(desenha);
  });

  scan.addEventListener("pointerleave", () => {
    ponto = null;
    scan.classList.remove("is-live");
    scan.style.setProperty("--px", 0);
    scan.style.setProperty("--py", 0);
    marks.forEach(m => m.classList.remove("is-read"));
    chips.forEach(c => c.classList.remove("is-near"));
  });
}

/* animações de entrada — fade + 14px, respeitando reduced motion */
function initReveal(){
  const els = document.querySelectorAll(".reveal");
  if(!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches){
    els.forEach(el => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add("is-in"); obs.unobserve(e.target); }
    });
  }, {rootMargin:"0px 0px -8% 0px", threshold:.08});
  els.forEach(el => io.observe(el));
}

/* borda do header só depois do scroll */
function initHeader(){
  const h = document.getElementById("header");
  const onScroll = () => h.classList.toggle("is-stuck", window.scrollY > 8);
  onScroll();
  addEventListener("scroll", onScroll, {passive:true});
}

/* consentimento — nada de rastreamento antes do aceite */
function initConsent(){
  const el = document.getElementById("consent");
  if(!CONFIG.pixelId){ el.remove(); return; }   /* sem pixel configurado, sem banner */
  let ok = null;
  try{ ok = localStorage.getItem("dermatic-consent"); }catch(e){}
  if(ok === "yes"){ loadPixel(); return; }
  if(ok === "no") return;
  el.classList.add("is-on");
  document.getElementById("consentYes").addEventListener("click", () => {
    try{ localStorage.setItem("dermatic-consent","yes"); }catch(e){}
    el.classList.remove("is-on"); loadPixel();
  });
  document.getElementById("consentNo").addEventListener("click", () => {
    try{ localStorage.setItem("dermatic-consent","no"); }catch(e){}
    el.classList.remove("is-on");
  });
}

/* Meta Pixel — só carrega depois do consentimento e com ID preenchido.
   O evento Contact dispara no clique do WhatsApp. */
function loadPixel(){
  if(!CONFIG.pixelId || window.fbq) return;
  /* eslint-disable */
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
  (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  window.fbq("init", CONFIG.pixelId);
  window.fbq("track", "PageView");
}

document.addEventListener("click", e => {
  const a = e.target.closest("[data-wa]");
  if(a && window.fbq) window.fbq("track", "Contact");
});

/* ==========================================================================
   BOOT
   ========================================================================== */
applyConfig();
initLang();          /* já chama renderStep() e applyWhatsLinks() */
initReveal();
initScan();
initHeader();
initConsent();
