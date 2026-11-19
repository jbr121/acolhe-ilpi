// Gera a apresentação final da M3 (Design de Interfaces) em .pptx.
// Projeto: Acolhe — Plataforma de Gestão e Segurança Assistencial para ILPIs.
// Estilo: slides limpos (uma ideia por slide), fonte grande e roteiro nas notas.
// Uso: npm run ppt
import pptxgen from "pptxgenjs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const img = (name) => join(here, "img", name);

// ---- Paleta da casa (mesma do protótipo) ----
const C = {
  tealDark: "0C3331",
  teal: "0F5E5B",
  tealSoft: "E5F3F1",
  terra: "B85A32",
  terraSoft: "F8ECE4",
  bg: "F3EFE6",
  surface: "FFFDF8",
  ink: "1C2430",
  inkSoft: "4E5966",
  line: "E4DCCB",
  crit: "9F2C22",
  critSoft: "FDECEB",
  warn: "8A4B08",
  warnSoft: "FBF1DC",
  ok: "0D6B45",
  okSoft: "E7F6EE",
  white: "FFFFFF",
  sand: "B7D0CB",
  peach: "E7A07A",
};
const HEAD = "Georgia"; // display serif (evoca a Fraunces do protótipo)
const BODY = "Segoe UI"; // sans legível (evoca a Atkinson Hyperlegible)

const pptx = new pptxgen();
pptx.defineLayout({ name: "W", width: 13.333, height: 7.5 });
pptx.layout = "W";
pptx.author = "José Eduardo, Kaio Otávio, Carlos Serena, João Pedro Ferreira e Arthur Magni";
pptx.company = "UNIVALI — Sistemas para Internet";
pptx.subject = "Avaliação M3 — Design de Interfaces";
pptx.title = "Acolhe — Gestão e Segurança Assistencial para ILPIs";

const W = 13.333;
const H = 7.5;
let page = 0;

// Slide de conteúdo: fundo creme, faixa, título grande, rodapé discreto.
function base(kicker, title) {
  page += 1;
  const s = pptx.addSlide();
  s.background = { color: C.bg };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.25, h: H, fill: { color: C.teal } });
  if (kicker) {
    s.addText(kicker.toUpperCase(), {
      x: 0.75, y: 0.5, w: 11.8, h: 0.3, fontFace: BODY, fontSize: 13, bold: true, color: C.terra, charSpacing: 2,
    });
  }
  if (title) {
    s.addText(title, { x: 0.7, y: 0.82, w: 12.1, h: 1.0, fontFace: HEAD, fontSize: 34, bold: true, color: C.tealDark });
  }
  s.addText(String(page), { x: W - 1.0, y: H - 0.45, w: 0.5, h: 0.3, align: "right", fontFace: BODY, fontSize: 10, color: C.inkSoft });
  return s;
}

// Slide divisor de seção (fundo teal, número grande).
function divider(num, title) {
  page += 1;
  const s = pptx.addSlide();
  s.background = { color: C.tealDark };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.16, fill: { color: C.terra } });
  s.addText(num, { x: 0.9, y: 2.3, w: 3, h: 2.0, fontFace: HEAD, fontSize: 120, bold: true, color: "17514E" });
  s.addText(title, { x: 0.95, y: 4.1, w: 11, h: 1.2, fontFace: HEAD, fontSize: 40, bold: true, color: C.white });
  s.addShape(pptx.ShapeType.line, { x: 1.0, y: 4.0, w: 1.4, h: 0, line: { color: C.peach, width: 3 } });
  return s;
}

function card(s, x, y, w, h, opts = {}) {
  s.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.1,
    fill: { color: opts.fill || C.surface },
    line: opts.line === "none" ? { type: "none" } : { color: opts.line || C.line, width: 1 },
    shadow: opts.shadow === false ? undefined : { type: "outer", color: "7A7A7A", opacity: 0.18, blur: 6, offset: 2, angle: 90 },
  });
}

// =================================================================
// 1. CAPA
// =================================================================
{
  const s = pptx.addSlide();
  s.background = { color: C.tealDark };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.16, fill: { color: C.terra } });
  s.addShape(pptx.ShapeType.roundRect, { x: 0.9, y: 0.85, w: 0.7, h: 0.7, rectRadius: 0.14, fill: { color: C.teal }, line: { type: "none" } });
  s.addText("A", { x: 0.9, y: 0.85, w: 0.7, h: 0.7, align: "center", valign: "middle", fontFace: HEAD, fontSize: 34, bold: true, color: C.white });
  s.addText("Acolhe", { x: 1.75, y: 0.82, w: 6, h: 0.75, fontFace: HEAD, fontSize: 32, bold: true, color: C.white });
  s.addText("Gestão e segurança assistencial", { x: 1.78, y: 1.46, w: 7, h: 0.3, fontFace: BODY, fontSize: 13, color: C.sand });

  s.addText("Uma plataforma que\nprotege a vida do idoso\nno plantão do asilo.", {
    x: 0.9, y: 2.5, w: 11.5, h: 2.4, fontFace: HEAD, fontSize: 46, bold: true, color: C.white, lineSpacingMultiple: 1.0,
  });
  s.addText("Avaliação M3 · Design de Interfaces · Protótipo de alta fidelidade", {
    x: 0.95, y: 5.0, w: 11.4, h: 0.4, fontFace: BODY, fontSize: 16, color: C.peach,
  });
  s.addShape(pptx.ShapeType.line, { x: 0.95, y: 5.6, w: 11.4, h: 0, line: { color: "1E4E4B", width: 1.5 } });
  s.addText(
    [
      { text: "UNIVALI — Sistemas para Internet · Prof. Rodrigo Ramos Martins, Msc\n", options: { fontFace: BODY, fontSize: 12, color: C.sand } },
      { text: "José Eduardo · Kaio Otávio · Carlos Serena · João Pedro Ferreira · Arthur Magni", options: { fontFace: BODY, fontSize: 12, color: C.sand } },
    ],
    { x: 0.95, y: 5.75, w: 9.8, h: 1.0, valign: "top", lineSpacingMultiple: 1.2 },
  );
  s.addText("19/11", { x: 10.9, y: 6.5, w: 1.5, h: 0.4, align: "right", fontFace: HEAD, fontSize: 18, bold: true, color: C.peach });
  s.addNotes("Olá, somos o grupo do projeto Acolhe. Vou apresentar uma plataforma de gestão e segurança para asilos (ILPIs). A ideia central: evitar que um idoso se machuque por erro humano no plantão. O que vou mostrar é um protótipo funcional de alta fidelidade, não só telas paradas.");
}

// =================================================================
// SEÇÃO 1 — O PROBLEMA
// =================================================================
divider("1", "O problema").addNotes("Começamos pela dor que investigamos na imersão.");

{
  const s = base("Imersão", "O problema em uma frase");
  card(s, 0.7, 2.0, 11.95, 1.75, { fill: C.critSoft, line: "EFC9C4" });
  s.addText("Depender da memória e do papel no asilo coloca a vida do idoso em risco e esgota a equipe de enfermagem.", {
    x: 1.1, y: 2.1, w: 11.2, h: 1.55, valign: "middle", fontFace: HEAD, fontSize: 24, bold: true, color: "7C231B", lineSpacingMultiple: 1.05,
  });
  const chip = (x, title, sub) => {
    card(s, x, 4.2, 3.85, 2.2, { shadow: false });
    s.addText(title, { x: x + 0.25, y: 4.5, w: 3.4, h: 0.5, fontFace: HEAD, fontSize: 19, bold: true, color: C.crit });
    s.addText(sub, { x: x + 0.25, y: 5.05, w: 3.4, h: 1.2, valign: "top", fontFace: BODY, fontSize: 14, color: C.ink, lineSpacingMultiple: 1.05 });
  };
  chip(0.7, "Acidentes", "Erro de dose ou horário pode ser fatal.");
  chip(4.74, "Processos", "A equipe responde na justiça por negligência.");
  chip(8.78, "Burnout", "Exaustão de anotar tudo em papel.");
  s.addNotes("Três consequências que mais pesam, segundo a Matriz de Definição do Problema: acidentes fatais com idosos; asilos processados por negligência; e equipes adoecidas de estresse. O responsável — enfermeiro-chefe, gestor e cuidadores — responde inclusive na justiça. A frase em destaque resume tudo.");
}

{
  const s = base("Imersão — 5 Porquês", "Por que isso acontece?");
  // strip dos 5 porquês
  const steps = ["Não se sabe quem deu qual remédio", "Tudo em papel ou “de boca”", "Chefe sem painel central", "Sistemas genéricos ou hospitalares", "Sem alarme nem trava para asilo"];
  let x = 0.7;
  steps.forEach((t, i) => {
    card(s, x, 2.05, 2.25, 1.5, { shadow: false, fill: i % 2 ? C.surface : "FBF8F2" });
    s.addText(String(i + 1), { x: x + 0.15, y: 2.15, w: 1, h: 0.5, fontFace: HEAD, fontSize: 22, bold: true, color: C.terra });
    s.addText(t, { x: x + 0.15, y: 2.6, w: 1.95, h: 0.9, valign: "top", fontFace: BODY, fontSize: 11.5, color: C.ink, lineSpacingMultiple: 1.0 });
    x += 2.4;
  });
  card(s, 0.7, 4.0, 11.95, 2.3, { fill: C.tealDark, line: "none" });
  s.addText("CAUSA-RAIZ", { x: 1.1, y: 4.25, w: 10, h: 0.4, fontFace: BODY, fontSize: 14, bold: true, color: C.peach, charSpacing: 2 });
  s.addText("Falta uma ferramenta à prova de burla, feita para o asilo, que barre o erro na hora e registre quem fez o quê.", {
    x: 1.1, y: 4.7, w: 11.1, h: 1.5, valign: "middle", fontFace: HEAD, fontSize: 24, bold: true, color: C.white, lineSpacingMultiple: 1.05,
  });
  s.addNotes("Fizemos os 5 Porquês. Resumindo a cadeia: a equipe se perde entre pacientes (1) porque tudo é anotado em papel ou passado de boca na troca de turno (2); o chefe não tem um painel central e imediato (3); os programas usados são genéricos, financeiros ou de hospital (4); e nenhum deles tem o essencial para o asilo — alarme de atraso e trava de medicação (5). A causa-raiz, no cartão escuro, guia todo o projeto.");
}

{
  const s = base("Imersão — Mapa de Empatia", "Para quem é: a Camila");
  card(s, 0.7, 2.0, 4.6, 4.4, { fill: C.terraSoft, line: "F0D7C8" });
  s.addShape(pptx.ShapeType.ellipse, { x: 2.3, y: 2.35, w: 1.4, h: 1.4, fill: { color: C.teal }, line: { type: "none" } });
  s.addText("CR", { x: 2.3, y: 2.35, w: 1.4, h: 1.4, align: "center", valign: "middle", fontFace: HEAD, fontSize: 34, bold: true, color: C.white });
  s.addText("Camila Ribeiro", { x: 0.8, y: 3.9, w: 4.4, h: 0.5, align: "center", fontFace: HEAD, fontSize: 22, bold: true, color: C.tealDark });
  s.addText("Enfermeira responsável pelo turno da tarde. Responde pela casa inteira.", {
    x: 1.0, y: 4.5, w: 4.0, h: 1.6, align: "center", valign: "top", fontFace: BODY, fontSize: 15, color: C.ink, lineSpacingMultiple: 1.1,
  });
  s.addText("Ela precisa de:", { x: 5.7, y: 2.0, w: 7, h: 0.5, fontFace: HEAD, fontSize: 20, bold: true, color: C.tealDark });
  const need = (y, title, sub, tone, toneSoft) => {
    card(s, 5.7, y, 6.95, 1.15, { fill: toneSoft, line: "none", shadow: false });
    s.addText(title, { x: 6.0, y, w: 6.4, h: 1.15, valign: "middle", fontFace: BODY, fontSize: 17, bold: true, color: tone });
    s.addText(sub, { x: 6.0, y: y + 0.52, w: 6.4, h: 0.6, valign: "top", fontFace: BODY, fontSize: 12.5, color: C.ink });
  };
  need(2.6, "Alarme alto de atraso", "avisar na hora quando a medicação passa do horário", C.warn, C.warnSoft);
  need(3.9, "Registro nominal", "gravar exatamente quem fez cada tarefa", C.teal, C.tealSoft);
  need(5.2, "Trava de medicação", "impedir dose perigosa antes que aconteça", C.crit, C.critSoft);
  s.addNotes("Toda a interface foi desenhada para a persona Camila, a enfermeira-chefe do turno. No Mapa de Empatia ela sente pavor de um idoso morrer no seu plantão e medo de processo; vê prontuários ilegíveis e remédios sumindo; ouve a família cobrando relatório. As três necessidades da direita viram, uma a uma, as funções do sistema — e é a Camila que aparece logada no protótipo.");
}

// =================================================================
// SEÇÃO 2 — PROPOSTA DE VALOR
// =================================================================
divider("2", "A proposta de valor").addNotes("O que oferecemos e o que nos diferencia.");

{
  const s = base("Ideação", "O que nos diferencia");
  card(s, 0.7, 2.0, 11.95, 1.4, { fill: C.tealDark, line: "none" });
  s.addText("Uma ferramenta que previne o erro humano — não apenas um prontuário digital.", {
    x: 1.1, y: 2.0, w: 11.1, h: 1.4, valign: "middle", fontFace: HEAD, fontSize: 23, bold: true, color: C.white,
  });
  const feat = (x, y, title, desc, tone, toneSoft) => {
    card(s, x, y, 5.85, 1.5, { fill: toneSoft, line: "none", shadow: false });
    s.addText(title, { x: x + 0.3, y: y + 0.18, w: 5.3, h: 0.5, fontFace: HEAD, fontSize: 18, bold: true, color: tone });
    s.addText(desc, { x: x + 0.3, y: y + 0.72, w: 5.3, h: 0.7, valign: "top", fontFace: BODY, fontSize: 14, color: C.ink });
  };
  feat(0.7, 3.6, "🔒 Trava de medicação", "Bloqueia dose que conflita com alergia ou interação.", C.crit, C.critSoft);
  feat(6.8, 3.6, "⏰ Alarme de atraso", "Apito visual quando a dose passa 30 min do horário.", C.warn, C.warnSoft);
  feat(0.7, 5.25, "✍️ Rastreabilidade", "Registra quem fez cada tarefa, com data e hora.", C.teal, C.tealSoft);
  feat(6.8, 5.25, "👪 Rotina e família", "Banho, sono, lazer e contato com a família juntos.", C.ok, C.okSoft);
  s.addNotes("Nossa promessa, no cartão escuro: uma ferramenta ativa de prevenção ao erro, não só um prontuário bonito. Quatro diferenciais: a trava de medicação e o alarme de atraso (os dois que ninguém entrega junto e que vou demonstrar ao vivo), a rastreabilidade nominal e a integração da rotina e da família. Em uma frase para a Camila: paz de espírito no plantão e menos papel.");
}

// =================================================================
// SEÇÃO 3 — ARQUITETURA DE INFORMAÇÃO
// =================================================================
divider("3", "Arquitetura de informação").addNotes("Como o conteúdo está organizado.");

{
  const s = base("5 Planos de Garrett", "Árvore de conteúdo");
  card(s, 0.7, 1.95, 4.3, 0.8, { fill: C.tealDark, line: "none", shadow: false });
  s.addText("Login do funcionário", { x: 0.7, y: 1.95, w: 4.3, h: 0.8, align: "center", valign: "middle", fontFace: BODY, fontSize: 14, bold: true, color: C.white });
  card(s, 0.7, 2.9, 4.3, 0.8, { fill: C.teal, line: "none", shadow: false });
  s.addText("Painel do plantão + alarme", { x: 0.7, y: 2.9, w: 4.3, h: 0.8, align: "center", valign: "middle", fontFace: BODY, fontSize: 14, bold: true, color: C.white });

  const nodes = [
    ["1 · Idosos", "Ficha médica e alergias"],
    ["2 · Remédios", "Horários + trava de mistura"],
    ["3 · Rotina do dia", "Banho, sono, lazer"],
    ["4 · Família", "Resumo e avisos"],
    ["5 · Chefia", "Histórico e estoque"],
  ];
  let y = 1.95;
  nodes.forEach(([t, d]) => {
    card(s, 5.6, y, 7.05, 0.88, { shadow: false });
    s.addShape(pptx.ShapeType.rect, { x: 5.6, y, w: 0.12, h: 0.88, fill: { color: C.terra } });
    s.addText(t, { x: 5.9, y, w: 2.9, h: 0.88, valign: "middle", fontFace: HEAD, fontSize: 17, bold: true, color: C.tealDark });
    s.addText(d, { x: 8.7, y, w: 3.75, h: 0.88, valign: "middle", fontFace: BODY, fontSize: 14, color: C.inkSoft });
    y += 0.98;
  });
  s.addNotes("A navegação nasce do login — assim o sistema sabe quem está no turno. Dali cai no Painel do Plantão, que já mostra o alarme de remédio atrasado. Abaixo, as cinco seções: Idosos, Remédios, Rotina do dia, Família e Chefia. Isso é o 'esqueleto' dos 5 Planos de Garrett que virou o menu do protótipo.");
}

// =================================================================
// SEÇÃO 4 — O PROTÓTIPO
// =================================================================
divider("4", "O protótipo").addNotes("Da baixa para a alta fidelidade.");

{
  const s = base("Prototipagem", "Baixa fidelidade: estrutura primeiro");
  s.addText("Antes da cor, validamos em cinza onde cada coisa fica e o fluxo de cada tarefa.", {
    x: 0.7, y: 1.95, w: 12, h: 0.5, fontFace: BODY, fontSize: 15, color: C.inkSoft,
  });
  const wire = (x) => {
    const y = 2.7, w = 2.78, h = 3.3;
    card(s, x, y, w, h, { fill: C.white, line: "CFCFCF" });
    s.addShape(pptx.ShapeType.rect, { x: x + 0.12, y: y + 0.12, w: 0.55, h: h - 0.24, fill: { color: "E3E3E3" }, line: { type: "none" } });
    for (let i = 0; i < 4; i++) s.addShape(pptx.ShapeType.rect, { x: x + 0.2, y: y + 0.32 + i * 0.4, w: 0.38, h: 0.12, fill: { color: "C9C9C9" }, line: { type: "none" } });
    s.addShape(pptx.ShapeType.rect, { x: x + 0.8, y: y + 0.2, w: w - 1.0, h: 0.22, fill: { color: "D9D9D9" }, line: { type: "none" } });
    return { x, y };
  };
  wire(0.7);
  for (let i = 0; i < 4; i++) s.addShape(pptx.ShapeType.rect, { x: 1.55 + i * 0.47, y: 3.25, w: 0.4, h: 0.5, fill: { color: "ECECEC" }, line: { color: "D2D2D2", width: 1 } });
  s.addShape(pptx.ShapeType.rect, { x: 1.55, y: 3.9, w: 0.9, h: 1.85, fill: { color: "F0F0F0" }, line: { color: "D2D2D2", width: 1 } });
  s.addShape(pptx.ShapeType.rect, { x: 2.52, y: 3.9, w: 0.85, h: 1.85, fill: { color: "F0F0F0" }, line: { color: "D2D2D2", width: 1 } });
  wire(3.75);
  s.addShape(pptx.ShapeType.ellipse, { x: 4.6, y: 3.2, w: 0.5, h: 0.5, fill: { color: "E0E0E0" }, line: { type: "none" } });
  for (let i = 0; i < 4; i++) s.addShape(pptx.ShapeType.rect, { x: 4.6, y: 3.9 + i * 0.44, w: 1.75, h: 0.3, fill: { color: "F0F0F0" }, line: { color: "D2D2D2", width: 1 } });
  wire(6.8);
  for (let i = 0; i < 3; i++) s.addShape(pptx.ShapeType.rect, { x: 7.65, y: 3.2 + i * 0.58, w: 1.75, h: 0.44, fill: { color: "F0F0F0" }, line: { color: "D2D2D2", width: 1 } });
  s.addShape(pptx.ShapeType.rect, { x: 7.65, y: 5.0, w: 1.75, h: 0.55, fill: { color: "F3DCDC" }, line: { color: "D98B8B", width: 1 } });
  wire(9.85);
  s.addShape(pptx.ShapeType.rect, { x: 10.7, y: 3.2, w: 1.75, h: 0.5, fill: { color: "F0F0F0" }, line: { color: "D2D2D2", width: 1 } });
  s.addShape(pptx.ShapeType.rect, { x: 10.7, y: 3.85, w: 1.75, h: 1.0, fill: { color: "F0F0F0" }, line: { color: "D2D2D2", width: 1 } });
  s.addShape(pptx.ShapeType.roundRect, { x: 10.7, y: 5.05, w: 1.2, h: 0.35, rectRadius: 0.05, fill: { color: "DADADA" }, line: { type: "none" } });
  [["Painel", 0.7], ["Idosos", 3.75], ["Remédios", 6.8], ["Família", 9.85]].forEach(([t, x]) => {
    s.addText(t, { x, y: 6.1, w: 2.78, h: 0.35, align: "center", fontFace: BODY, fontSize: 13, bold: true, color: C.tealDark });
  });
  s.addNotes("Começamos pela baixa fidelidade: rascunhos em cinza das quatro telas. Sem cor, a gente foca na diagramação e no fluxo — onde ficam os indicadores, a ficha, o bloco da trava (em vermelho) e a área da família. Comparando com os próximos slides, dá pra ver a evolução até a alta fidelidade.");
}

function telaAlta(numero, nome, arquivo, pontos) {
  const s = base(`Alta fidelidade · tela ${numero} de 4`, nome);
  const iw = 8.3, ih = iw * 1080 / 1920; // 4.67
  card(s, 0.6, 1.95, iw + 0.3, ih + 0.3);
  s.addImage({ path: img(arquivo), x: 0.75, y: 2.1, w: iw, h: ih });
  card(s, 9.3, 1.95, 3.35, ih + 0.3, { fill: C.surface });
  s.addText("Destaques", { x: 9.55, y: 2.2, w: 2.9, h: 0.4, fontFace: HEAD, fontSize: 17, bold: true, color: C.terra });
  s.addText(
    pontos.map((t) => ({ text: t, options: { bullet: { code: "2022", indent: 14 }, fontFace: BODY, fontSize: 14, color: C.ink, paraSpaceAfter: 14 } })),
    { x: 9.55, y: 2.7, w: 2.95, h: ih - 0.7, valign: "top" },
  );
  return s;
}

telaAlta(1, "Painel do plantão", "tela-painel.png", [
  "Abre no que é urgente.",
  "Alarme de atraso em laranja.",
  "4 indicadores do turno.",
]).addNotes("Esta é a tela inicial, o Painel do Plantão. Em três segundos a Camila sabe o que exige ação: os quatro indicadores no topo, os alertas à esquerda e os cuidados do turno à direita. Clicar num alerta leva direto à pessoa. Repare no alarme laranja de medicação atrasada.");

telaAlta(2, "Idosos — ficha e alergias", "tela-ficha-idoso.png", [
  "Alergia em tarja vermelha.",
  "“O que importa” para a pessoa.",
  "Abas: plano, vitais, família.",
]).addNotes("Seção Idosos. A alergia aparece em tarja vermelha no topo, antes de qualquer conduta — é o dado que alimenta a trava do próximo slide. Além da parte clínica, mostramos 'o que importa para a pessoa', porque o cuidado também é humano.");

telaAlta(3, "Remédios — trava de segurança", "tela-remedios-trava.png", [
  "AAS × alergia = bloqueado.",
  "“Administrar” fica desativado.",
  "Só registra com justificativa.",
]).addNotes("Esta é a tela mais importante e eu recomendo demonstrar ao vivo. O sistema tenta administrar AAS para a dona Lúcia, que é alérgica a AAS — e ele BLOQUEIA: o botão Administrar fica desativado e só dá para registrar como não administrado, com justificativa. É a trava à prova de burla, o nosso diferencial número um, funcionando de verdade.");

telaAlta(4, "Família", "tela-familia.png", [
  "Contato a um toque.",
  "Registro datado de cada contato.",
  "Transparência com a família.",
]).addNotes("Seção Família. Contato do responsável a um toque e registro datado de cada ligação do turno. Resolve a dor que a Camila ouve todo dia: a família cobrando notícia. Fecha o ciclo do cuidado com transparência e rastro.");

// =================================================================
// SEÇÃO 5 — DECISÕES DE DESIGN
// =================================================================
divider("5", "Decisões de design").addNotes("Por que a interface é assim.");

{
  const s = base("Princípios básicos", "C.R.A.P.");
  const q = (x, y, letter, title, desc, tone) => {
    card(s, x, y, 5.85, 2.05);
    s.addShape(pptx.ShapeType.roundRect, { x: x + 0.3, y: y + 0.35, w: 1.0, h: 1.0, rectRadius: 0.12, fill: { color: tone }, line: { type: "none" } });
    s.addText(letter, { x: x + 0.3, y: y + 0.35, w: 1.0, h: 1.0, align: "center", valign: "middle", fontFace: HEAD, fontSize: 36, bold: true, color: C.white });
    s.addText(title, { x: x + 1.5, y: y + 0.32, w: 4.1, h: 0.45, fontFace: HEAD, fontSize: 19, bold: true, color: C.tealDark });
    s.addText(desc, { x: x + 1.5, y: y + 0.82, w: 4.15, h: 1.1, valign: "top", fontFace: BODY, fontSize: 13.5, color: C.ink, lineSpacingMultiple: 1.05 });
  };
  q(0.7, 2.0, "C", "Contraste", "Vermelho só para risco; teal para ação. O olho vai ao urgente.", C.crit);
  q(6.8, 2.0, "R", "Repetição", "Mesmo cartão e mesma pílula de status em todas as telas.", C.teal);
  q(0.7, 4.3, "A", "Alinhamento", "Grade fixa: horário à esquerda, conteúdo ao centro, status à direita.", C.terra);
  q(6.8, 4.3, "P", "Proximidade", "Cada idoso agrupa seus cuidados; alergia colada ao nome.", C.ok);
  s.addNotes("Analisamos a interface pelos quatro princípios básicos. Contraste: vermelho é sempre risco, teal é ação. Repetição: o mesmo cartão e a mesma pílula de status se repetem em tudo — aprende uma vez, usa em todo lugar. Alinhamento: uma grade fixa, nada solto. Proximidade: o que é do mesmo assunto fica junto, e a alergia fica colada ao nome.");
}

{
  const s = base("Identidade visual", "Tipografia e cores");
  card(s, 0.7, 2.0, 5.85, 4.4);
  s.addText("Tipografia", { x: 1.0, y: 2.25, w: 5, h: 0.4, fontFace: HEAD, fontSize: 17, bold: true, color: C.terra });
  s.addText("Fraunces", { x: 1.0, y: 2.7, w: 5.2, h: 0.8, fontFace: HEAD, fontSize: 38, bold: true, color: C.tealDark });
  s.addText("títulos e nomes — tom acolhedor", { x: 1.0, y: 3.45, w: 5.2, h: 0.4, fontFace: BODY, fontSize: 13, color: C.inkSoft });
  s.addText("Atkinson Hyperlegible", { x: 1.0, y: 4.1, w: 5.3, h: 0.5, fontFace: BODY, fontSize: 22, bold: true, color: C.tealDark });
  s.addText("texto e dados — fonte criada para baixa visão, prioriza leitura rápida", {
    x: 1.0, y: 4.65, w: 5.3, h: 1.0, valign: "top", fontFace: BODY, fontSize: 13, color: C.inkSoft, lineSpacingMultiple: 1.1,
  });

  card(s, 6.8, 2.0, 5.85, 4.4);
  s.addText("Cores com papel fixo", { x: 7.1, y: 2.25, w: 5, h: 0.4, fontFace: HEAD, fontSize: 17, bold: true, color: C.terra });
  const sw = (x, y, hex, name, dark) => {
    s.addShape(pptx.ShapeType.roundRect, { x, y, w: 1.2, h: 1.0, rectRadius: 0.08, fill: { color: hex }, line: { color: C.line, width: 1 } });
    s.addText(name, { x: x - 0.1, y: y + 1.05, w: 1.4, h: 0.3, align: "center", fontFace: BODY, fontSize: 11, bold: true, color: C.ink });
    if (dark) s.addText("#" + hex, { x, y: y + 0.35, w: 1.2, h: 0.3, align: "center", fontFace: BODY, fontSize: 9, color: C.white });
  };
  sw(7.15, 2.8, C.teal, "ação", true);
  sw(8.55, 2.8, C.terra, "destaque", true);
  sw(9.95, 2.8, C.crit, "risco", true);
  sw(11.35, 2.8, C.ok, "feito", true);
  s.addText("Teal frio + terracota quente: harmonia complementar. Contraste testado no padrão WCAG AA.", {
    x: 7.1, y: 4.5, w: 5.4, h: 1.6, valign: "top", fontFace: BODY, fontSize: 14, color: C.ink, lineSpacingMultiple: 1.15,
  });
  s.addNotes("Tipografia e cor servem à função. Fraunces, serifada, nos títulos, para um tom humano; e Atkinson Hyperlegible no texto — ela foi desenhada para baixa visão, o que importa num ambiente de saúde. A cor tem papel fixo: vermelho é sempre risco, verde é sempre feito. Teal e terracota formam uma harmonia complementar, e os contrastes passam no padrão de acessibilidade WCAG AA. O estilo geral segue o Material Design, com elevação leve para dar hierarquia.");
}

// =================================================================
// CONCLUSÃO
// =================================================================
{
  const s = base("Conclusão", "O Acolhe em uma frase");
  card(s, 0.7, 2.0, 11.95, 1.7, { fill: C.tealDark, line: "none" });
  s.addText("Encontra o urgente, impede o erro de medicação na hora e registra quem cuidou — com uma forma que acolhe sem esconder o risco.", {
    x: 1.1, y: 2.0, w: 11.1, h: 1.7, valign: "middle", fontFace: HEAD, fontSize: 22, bold: true, color: C.white, lineSpacingMultiple: 1.05,
  });
  const col = (x, title, items, tone) => {
    card(s, x, 3.95, 5.85, 2.2);
    s.addText(title, { x: x + 0.3, y: 4.15, w: 5.2, h: 0.4, fontFace: HEAD, fontSize: 17, bold: true, color: tone });
    s.addText(items.map((t) => ({ text: t, options: { bullet: { code: "2022", indent: 14 }, fontFace: BODY, fontSize: 14, color: C.ink, paraSpaceAfter: 9 } })), { x: x + 0.3, y: 4.6, w: 5.3, h: 1.45, valign: "top" });
  };
  col(0.7, "Entregamos", ["Problema, proposta e árvore de conteúdo", "Baixa e alta fidelidade", "4 telas navegáveis e funcionais"], C.teal);
  col(6.8, "Próximos passos", ["Seção de rotina do dia", "Painel da chefia e estoque", "Teste com cuidadores reais"], C.terra);
  s.addText("Protótipo acadêmico — não substitui prontuário nem prescrição médica.", {
    x: 0.7, y: 6.4, w: 12, h: 0.4, align: "center", fontFace: BODY, fontSize: 11.5, italic: true, color: C.inkSoft,
  });
  s.addNotes("Para fechar: cobrimos tudo que o trabalho pedia — problema, proposta de valor, árvore de conteúdo, protótipo de baixa e alta fidelidade e as quatro telas funcionando. Os próximos passos seriam a seção de rotina do dia, o painel da chefia com estoque e um teste de usabilidade com cuidadores reais. Lembrando que é um protótipo acadêmico, não substitui o prontuário.");
}

// =================================================================
// ENCERRAMENTO
// =================================================================
{
  page += 1;
  const s = pptx.addSlide();
  s.background = { color: C.tealDark };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: H - 0.16, w: W, h: 0.16, fill: { color: C.terra } });
  s.addText("Obrigado!", { x: 0, y: 2.5, w: W, h: 1.1, align: "center", fontFace: HEAD, fontSize: 52, bold: true, color: C.white });
  s.addText("Acolhe — Gestão e Segurança Assistencial para ILPIs", { x: 0, y: 3.7, w: W, h: 0.4, align: "center", fontFace: BODY, fontSize: 16, color: C.peach });
  s.addText("Perguntas?", { x: 0, y: 4.3, w: W, h: 0.4, align: "center", fontFace: BODY, fontSize: 15, color: C.sand });
  s.addText("José Eduardo · Kaio Otávio · Carlos Serena · João Pedro Ferreira · Arthur Magni", { x: 0, y: 5.5, w: W, h: 0.4, align: "center", fontFace: BODY, fontSize: 12, color: C.sand });
  s.addNotes("Obrigado! Se der, deixe o protótipo rodando para o professor interagir — principalmente a trava de segurança na tela de Remédios. Abrir para perguntas.");
}

const out = join(here, "Acolhe-Apresentacao-M3.pptx");
await pptx.writeFile({ fileName: out });
console.log("OK ->", out);
