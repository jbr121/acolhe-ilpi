// Gera a apresentação final da M3 (Design de Interfaces) em .pptx.
// Projeto: Acolhe — Plataforma de Gestão e Segurança Assistencial para ILPIs.
// Uso: npm run ppt   (ver package.json)
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

// Base de conteúdo: fundo creme, faixa de título, rodapé e número.
function base(kicker, title) {
  page += 1;
  const s = pptx.addSlide();
  s.background = { color: C.bg };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.22, h: H, fill: { color: C.teal } });
  if (kicker) {
    s.addText(kicker.toUpperCase(), {
      x: 0.7, y: 0.42, w: 11.8, h: 0.3,
      fontFace: BODY, fontSize: 12, bold: true, color: C.terra, charSpacing: 2,
    });
  }
  if (title) {
    s.addText(title, {
      x: 0.66, y: 0.68, w: 11.9, h: 0.9,
      fontFace: HEAD, fontSize: 30, bold: true, color: C.tealDark,
    });
    s.addShape(pptx.ShapeType.line, { x: 0.7, y: 1.62, w: 1.1, h: 0, line: { color: C.terra, width: 3 } });
  }
  s.addText("Acolhe · Avaliação M3 — Design de Interfaces · UNIVALI", {
    x: 0.7, y: H - 0.42, w: 9, h: 0.3, fontFace: BODY, fontSize: 9, color: C.inkSoft,
  });
  s.addText(String(page), {
    x: W - 1.0, y: H - 0.42, w: 0.5, h: 0.3, align: "right", fontFace: BODY, fontSize: 9, color: C.inkSoft,
  });
  return s;
}

// Cartão arredondado.
function card(s, x, y, w, h, opts = {}) {
  s.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: opts.fill || C.surface },
    line: { color: opts.line || C.line, width: 1 },
    shadow: opts.shadow === false ? undefined : { type: "outer", color: "7A7A7A", opacity: 0.18, blur: 6, offset: 2, angle: 90 },
  });
}

function bullets(items, opts = {}) {
  return items.map((t) => ({
    text: t,
    options: { bullet: { code: "2022", indent: 14 }, fontFace: BODY, fontSize: opts.fontSize || 14, color: opts.color || C.ink, paraSpaceAfter: opts.gap ?? 7, ...opts },
  }));
}

// =================================================================
// 1. CAPA
// =================================================================
{
  const s = pptx.addSlide();
  s.background = { color: C.tealDark };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.16, fill: { color: C.terra } });
  // marca
  s.addShape(pptx.ShapeType.roundRect, { x: 0.9, y: 0.85, w: 0.62, h: 0.62, rectRadius: 0.12, fill: { color: C.teal }, line: { type: "none" } });
  s.addText("A", { x: 0.9, y: 0.85, w: 0.62, h: 0.62, align: "center", valign: "middle", fontFace: HEAD, fontSize: 30, bold: true, color: C.white });
  s.addText("Acolhe", { x: 1.65, y: 0.82, w: 6, h: 0.7, fontFace: HEAD, fontSize: 30, bold: true, color: C.white });
  s.addText("Gestão e segurança assistencial", { x: 1.68, y: 1.42, w: 7, h: 0.3, fontFace: BODY, fontSize: 12, color: "B7D0CB" });

  s.addText("Plataforma de Gestão e Segurança\nAssistencial para ILPIs", {
    x: 0.9, y: 2.5, w: 11.5, h: 1.9, fontFace: HEAD, fontSize: 44, bold: true, color: C.white, lineSpacingMultiple: 0.98,
  });
  s.addText("Protótipo de alta fidelidade — Avaliação M3 · Design de Interfaces", {
    x: 0.95, y: 4.5, w: 11, h: 0.4, fontFace: BODY, fontSize: 16, color: "E7A07A",
  });

  s.addShape(pptx.ShapeType.line, { x: 0.95, y: 5.15, w: 11.4, h: 0, line: { color: "1E4E4B", width: 1.5 } });
  s.addText(
    [
      { text: "UNIVALI — Curso de Sistemas para Internet\n", options: { fontFace: BODY, fontSize: 13, color: C.white, bold: true } },
      { text: "Professor: Rodrigo Ramos Martins, Msc\n", options: { fontFace: BODY, fontSize: 12, color: "B7D0CB" } },
      { text: "Alunos: José Eduardo, Kaio Otávio, Carlos Serena, João Pedro Ferreira e Arthur Magni", options: { fontFace: BODY, fontSize: 12, color: "B7D0CB" } },
    ],
    { x: 0.95, y: 5.3, w: 9.5, h: 1.4, valign: "top", lineSpacingMultiple: 1.1 },
  );
  s.addText("Apresentação: 19/11", { x: 9.6, y: 6.55, w: 2.8, h: 0.4, align: "right", fontFace: BODY, fontSize: 12, bold: true, color: "E7A07A" });
  s.addNotes("Abertura. Apresentar o nome do projeto (Acolhe), o contexto (ILPIs — Instituições de Longa Permanência para Idosos) e a equipe. O que será mostrado é um protótipo de alta fidelidade funcional, não apenas telas estáticas.");
}

// =================================================================
// 2. ROTEIRO
// =================================================================
{
  const s = base("Apresentação", "Roteiro");
  const left = [
    "1 · O problema e a causa-raiz",
    "2 · Mapa de empatia e persona",
    "3 · Benchmarking (4 sistemas)",
    "4 · Tríade do design",
    "5 · Proposta de valor",
  ];
  const right = [
    "6 · Árvore de conteúdo",
    "7 · Protótipo de baixa fidelidade",
    "8 · Protótipo de alta fidelidade (4 telas)",
    "9 · Princípios C.R.A.P.",
    "10 · Tipografia, cores e estilo de UI",
  ];
  card(s, 0.7, 2.0, 5.85, 4.5);
  card(s, 6.8, 2.0, 5.85, 4.5);
  s.addText(left.map((t) => ({ text: t, options: { fontFace: BODY, fontSize: 16, color: C.ink, paraSpaceAfter: 16 } })), { x: 1.1, y: 2.35, w: 5.1, h: 3.9, valign: "top" });
  s.addText(right.map((t) => ({ text: t, options: { fontFace: BODY, fontSize: 16, color: C.ink, paraSpaceAfter: 16 } })), { x: 7.2, y: 2.35, w: 5.1, h: 3.9, valign: "top" });
  s.addNotes("Roteiro em dez passos: do problema diagnosticado até a interface final. O júri vê a linha do Design Thinking (imersão → ideação → protótipo) do começo ao fim.");
}

// =================================================================
// 3. PROBLEMA
// =================================================================
{
  const s = base("Imersão — Matriz de Definição do Problema", "O problema");
  card(s, 0.7, 1.95, 11.95, 1.25, { fill: C.critSoft, line: "EFC9C4" });
  s.addText(
    [
      { text: "Definição em uma frase:  ", options: { bold: true, color: C.crit } },
      { text: "depender da memória e do papel em asilos coloca a vida do idoso em risco de morte e esgota a equipe de enfermagem.", options: { color: "7C231B" } },
    ],
    { x: 1.0, y: 2.05, w: 11.4, h: 1.0, valign: "middle", fontFace: BODY, fontSize: 17 },
  );

  card(s, 0.7, 3.45, 3.85, 3.05);
  card(s, 4.74, 3.45, 3.85, 3.05);
  card(s, 8.78, 3.45, 3.85, 3.05);
  const col = (x, title, items, tone) => {
    s.addText(title, { x: x + 0.25, y: 3.65, w: 3.4, h: 0.4, fontFace: HEAD, fontSize: 15, bold: true, color: tone });
    s.addText(bullets(items, { fontSize: 12.5, gap: 8 }), { x: x + 0.25, y: 4.15, w: 3.4, h: 2.2, valign: "top" });
  };
  col(0.7, "Para quem", ["Enfermeiro-chefe e gestor", "Cuidadores do turno", "Responsáveis legais pelo idoso"], C.teal);
  col(4.74, "Consequências", ["Acidentes fatais com idosos", "Processos e risco de fechamento", "Burnout da equipe"], C.terra);
  col(8.78, "Reenquadramento", ["Não é “falta de tempo”", "Faltam travas de segurança", "e alarmes que barrem o erro humano"], C.teal);
  s.addNotes("Fonte: Matriz de Definição do Problema do grupo. O reenquadramento (coluna 3) é o pulo do gato: saímos de 'falta tempo' para 'falta uma trava que impeça o erro antes que ele aconteça'. Isso define toda a proposta.");
}

// =================================================================
// 4. 5 PORQUÊS → CAUSA RAIZ
// =================================================================
{
  const s = base("Imersão — 5 Porquês", "Da dor à causa-raiz");
  const porques = [
    ["Por quê 1", "A equipe não sabe ao certo quem deu qual remédio, nem a que horas."],
    ["Por quê 2", "Tudo é anotado em papel ou passado “de boca” na troca de turno."],
    ["Por quê 3", "O chefe não tem um painel que centralize os registros em tempo real."],
    ["Por quê 4", "Os sistemas usados são genéricos: financeiros ou feitos para hospitais."],
    ["Por quê 5", "Nenhum tem alarme de atraso nem trava de medicação para a realidade do asilo."],
  ];
  let y = 1.95;
  porques.forEach(([k, v], i) => {
    card(s, 0.7, y, 8.0, 0.82, { shadow: false, fill: i % 2 ? C.surface : "FBF8F2" });
    s.addText(k, { x: 0.9, y: y, w: 1.5, h: 0.82, valign: "middle", fontFace: HEAD, fontSize: 14, bold: true, color: C.terra });
    s.addText(v, { x: 2.4, y: y, w: 6.1, h: 0.82, valign: "middle", fontFace: BODY, fontSize: 13, color: C.ink });
    y += 0.92;
  });
  card(s, 8.95, 1.95, 3.7, 4.6, { fill: C.tealDark, line: C.tealDark });
  s.addText("CAUSA-RAIZ", { x: 9.2, y: 2.2, w: 3.2, h: 0.35, fontFace: BODY, fontSize: 12, bold: true, color: "E7A07A", charSpacing: 2 });
  s.addText(
    "O asilo opera sem um sistema feito para o cuidado contínuo de idosos: falta uma ferramenta à prova de burla que barre o erro humano na hora e registre exatamente quem fez o quê.",
    { x: 9.2, y: 2.7, w: 3.25, h: 3.6, valign: "top", fontFace: HEAD, fontSize: 16, color: C.white, lineSpacingMultiple: 1.05 },
  );
  s.addNotes("Os 5 porquês levam da consequência visível (erro de remédio) até a causa-raiz estrutural. A causa-raiz já aponta as duas funções centrais do nosso sistema: trava à prova de burla + rastreabilidade nominal.");
}

// =================================================================
// 5. MAPA DE EMPATIA / PERSONA
// =================================================================
{
  const s = base("Imersão — Mapa de Empatia", "Persona: o enfermeiro-chefe");
  card(s, 0.7, 1.95, 3.5, 4.55, { fill: C.terraSoft, line: "F0D7C8" });
  s.addShape(pptx.ShapeType.ellipse, { x: 1.9, y: 2.25, w: 1.1, h: 1.1, fill: { color: C.teal }, line: { type: "none" } });
  s.addText("CR", { x: 1.9, y: 2.25, w: 1.1, h: 1.1, align: "center", valign: "middle", fontFace: HEAD, fontSize: 26, bold: true, color: C.white });
  s.addText("Camila Ribeiro", { x: 0.8, y: 3.45, w: 3.3, h: 0.4, align: "center", fontFace: HEAD, fontSize: 18, bold: true, color: C.tealDark });
  s.addText("Enfermeira responsável pelo turno da tarde. Responde pela casa inteira e por tudo que acontece no plantão.", { x: 0.9, y: 3.9, w: 3.1, h: 2.4, align: "center", fontFace: BODY, fontSize: 13, color: C.ink, lineSpacingMultiple: 1.1 });

  const quad = (x, y, title, items, tone, toneSoft) => {
    card(s, x, y, 3.95, 2.2, { fill: toneSoft, line: C.line, shadow: false });
    s.addText(title, { x: x + 0.2, y: y + 0.12, w: 3.6, h: 0.35, fontFace: BODY, fontSize: 12, bold: true, color: tone, charSpacing: 1 });
    s.addText(bullets(items, { fontSize: 12, gap: 5 }), { x: x + 0.22, y: y + 0.5, w: 3.6, h: 1.6, valign: "top" });
  };
  quad(4.45, 1.95, "PENSA E SENTE", ["Pavor de um idoso morrer no seu plantão", "Medo de processo / prisão"], C.teal, C.tealSoft);
  quad(8.55, 1.95, "VÊ E OUVE", ["Prontuários ilegíveis, remédios sumindo", "Família cobrando relatório"], C.terra, C.terraSoft);
  quad(4.45, 4.3, "DORES", ["Risco de erro fatal", "Não saber quem errou", "Exaustão mental"], C.crit, C.critSoft);
  quad(8.55, 4.3, "NECESSIDADES", ["Alarme alto de atraso", "Registro nominal", "Trava de medicação"], C.ok, C.okSoft);
  s.addNotes("A persona Camila é quem usa o sistema na apresentação. As 'necessidades' do mapa de empatia viram, uma a uma, funcionalidades: alarme de atraso, registro nominal e trava de medicação.");
}

// =================================================================
// 6. BENCHMARKING
// =================================================================
{
  const s = base("Imersão — Benchmarking", "Quatro sistemas similares");
  const header = ["Sistema", "Proposta de valor", "Lacuna frente ao nosso projeto"].map((t) => ({
    text: t, options: { bold: true, color: C.white, fill: { color: C.teal }, fontFace: BODY, fontSize: 13, align: "left", valign: "middle" },
  }));
  const row = (a, b, c) => [
    { text: a, options: { bold: true, color: C.tealDark, fontFace: BODY, fontSize: 12, valign: "middle" } },
    { text: b, options: { color: C.ink, fontFace: BODY, fontSize: 11.5, valign: "middle" } },
    { text: c, options: { color: C.inkSoft, fontFace: BODY, fontSize: 11.5, valign: "middle" } },
  ];
  const rows = [
    header,
    row("Sistema Clin", "Cuidado + estoque + financeiro num só sistema, sem papel.", "Foco administrativo/financeiro, não em travas ativas de erro."),
    row("Rafa ILPI", "Alerta de atraso, dupla checagem e prova para a Anvisa.", "Visão gerencial/regulatória, sem bloqueio de interações."),
    row("Gero360 (Elos/Leve)", "Registro simples no plantão vira PIA e cuidado personalizado.", "Colaborativo e leve, mas sem rigor restritivo contra erro crítico."),
    row("Ecossistema MV", "Controle rígido de dados clínicos e farmácia hospitalar.", "Caro e complexo demais; ignora a rotina de convivência do asilo."),
  ];
  s.addTable(rows, {
    x: 0.7, y: 2.0, w: 11.95, colW: [2.5, 4.9, 4.55],
    rowH: [0.5, 0.95, 0.95, 0.95, 0.95],
    border: { type: "solid", color: C.line, pt: 1 },
    fill: { color: C.surface }, valign: "middle",
  });
  s.addNotes("Benchmarking: nenhum concorrente junta, ao mesmo tempo, trava ativa contra erro de medicação + alarme imediato + rotina do idoso + canal com a família a um preço viável para ILPIs. É exatamente esse espaço vazio que ocupamos.");
}

// =================================================================
// 7. TRÍADE DO DESIGN
// =================================================================
{
  const s = base("Tríade do Design", "Como o projeto se sustenta");
  const block = (x, title, sub, items, tone) => {
    card(s, x, 2.0, 5.85, 4.5);
    s.addShape(pptx.ShapeType.rect, { x, y: 2.0, w: 5.85, h: 0.12, fill: { color: tone } });
    s.addText(title, { x: x + 0.3, y: 2.3, w: 5.2, h: 0.4, fontFace: HEAD, fontSize: 19, bold: true, color: C.tealDark });
    s.addText(sub, { x: x + 0.3, y: 2.75, w: 5.2, h: 0.35, fontFace: BODY, fontSize: 12, italic: true, color: C.inkSoft });
    s.addText(items.map(([k, v]) => ({
      text: "", options: { paraSpaceAfter: 2 }, // placeholder
    })), { x: x + 0.3, y: 3.2, w: 5.2, h: 0.01 });
    const runs = [];
    items.forEach(([k, v], i) => {
      runs.push({ text: k + " — ", options: { bold: true, color: tone, fontFace: BODY, fontSize: 13.5 } });
      runs.push({ text: v + (i < items.length - 1 ? "\n" : ""), options: { color: C.ink, fontFace: BODY, fontSize: 13.5, paraSpaceAfter: 12 } });
    });
    s.addText(runs, { x: x + 0.3, y: 3.2, w: 5.25, h: 3.1, valign: "top", lineSpacingMultiple: 1.05 });
  };
  block(0.7, "Clássica (Vitruviana)", "Função, estrutura e forma", [
    ["Utilitas", "prevenir erros fatais e organizar o turno"],
    ["Firmitas", "login nominal, trava à prova de burla, log imutável"],
    ["Venustas", "alto contraste, alvo grande, alarme inconfundível"],
  ], C.teal);
  block(6.8, "Estratégica (Produto)", "Design Thinking", [
    ["Desejável", "tira o medo do erro e o burnout da equipe"],
    ["Praticável", "regras simples: cronômetro de 30 min e tabela de interações"],
    ["Viável", "nuvem enxuta e barata; evita processos e perdas de estoque"],
  ], C.terra);
  s.addNotes("Analisamos o projeto pelas duas tríades vistas em aula. A clássica (Utilitas/Firmitas/Venustas) olha função, robustez e forma; a estratégica (Desejável/Praticável/Viável) equilibra pessoas, tecnologia e negócio.");
}

// =================================================================
// 8. PROPOSTA DE VALOR
// =================================================================
{
  const s = base("Ideação — Proposta de Valor", "O que nos diferencia");
  card(s, 0.7, 1.95, 5.1, 4.55, { fill: C.tealDark, line: C.tealDark });
  s.addText("Para Camila e a equipe de enfermagem de ILPIs:", { x: 0.95, y: 2.2, w: 4.6, h: 0.6, fontFace: BODY, fontSize: 13, color: "B7D0CB" });
  s.addText("Uma ferramenta ativa de prevenção ao erro humano — não só um prontuário digital.", {
    x: 0.95, y: 2.85, w: 4.6, h: 2.0, valign: "top", fontFace: HEAD, fontSize: 23, bold: true, color: C.white, lineSpacingMultiple: 1.02,
  });
  s.addText("“Paz de espírito no plantão e menos burocracia em papel.”", { x: 0.95, y: 5.4, w: 4.6, h: 0.9, fontFace: BODY, fontSize: 13, italic: true, color: "E7A07A" });

  const feat = (x, y, title, desc, tone, toneSoft) => {
    card(s, x, y, 3.25, 2.12, { fill: toneSoft, line: C.line, shadow: false });
    s.addText(title, { x: x + 0.22, y: y + 0.18, w: 2.9, h: 0.7, fontFace: HEAD, fontSize: 15.5, bold: true, color: tone });
    s.addText(desc, { x: x + 0.22, y: y + 0.82, w: 2.9, h: 1.2, valign: "top", fontFace: BODY, fontSize: 12, color: C.ink, lineSpacingMultiple: 1.05 });
  };
  feat(6.0, 1.95, "Trava de medicação", "Bloqueia dose que conflita com alergia ou interação perigosa.", C.crit, C.critSoft);
  feat(9.4, 1.95, "Alarme de atraso", "Apito visual quando a medicação passa 30 min do horário.", C.warn, C.warnSoft);
  feat(6.0, 4.38, "Rastreabilidade", "Registro nominal: quem fez cada tarefa, com data e hora.", C.teal, C.tealSoft);
  feat(9.4, 4.38, "Rotina + família", "Banho, sono, lazer e contato com a família no mesmo fluxo.", C.ok, C.okSoft);
  s.addNotes("A proposta de valor em uma frase (cartão escuro) e os quatro diferenciais concretos. Os dois primeiros — trava e alarme — são os que nenhum concorrente entrega junto e serão demonstrados ao vivo.");
}

// =================================================================
// 9. ÁRVORE DE CONTEÚDO
// =================================================================
{
  const s = base("Arquitetura de Informação", "Árvore de conteúdo");
  // raiz
  card(s, 0.7, 1.9, 4.3, 0.75, { fill: C.tealDark, line: C.tealDark, shadow: false });
  s.addText("Login do funcionário", { x: 0.7, y: 1.9, w: 4.3, h: 0.75, align: "center", valign: "middle", fontFace: BODY, fontSize: 13, bold: true, color: C.white });
  card(s, 0.7, 2.8, 4.3, 0.75, { fill: C.teal, line: C.teal, shadow: false });
  s.addText("Painel do plantão + alarme", { x: 0.7, y: 2.8, w: 4.3, h: 0.75, align: "center", valign: "middle", fontFace: BODY, fontSize: 13, bold: true, color: C.white });
  s.addShape(pptx.ShapeType.line, { x: 2.85, y: 2.65, w: 0, h: 0.15, line: { color: C.inkSoft, width: 1.5 } });

  const nodes = [
    ["1 · Idosos", "Lista de moradores · ficha médica e alergias"],
    ["2 · Remédios", "Horários do dia · trava de mistura perigosa"],
    ["3 · Rotina do dia", "Banho, alimentação, sono e lazer"],
    ["4 · Família", "Resumo do dia e avisos de emergência"],
    ["5 · Chefia / Admin.", "Histórico de quem fez cada tarefa · estoque"],
  ];
  let y = 1.9;
  nodes.forEach(([t, d]) => {
    card(s, 5.6, y, 7.05, 0.86, { shadow: false });
    s.addShape(pptx.ShapeType.rect, { x: 5.6, y, w: 0.1, h: 0.86, fill: { color: C.terra } });
    s.addText(t, { x: 5.85, y, w: 2.5, h: 0.86, valign: "middle", fontFace: HEAD, fontSize: 15, bold: true, color: C.tealDark });
    s.addText(d, { x: 8.3, y, w: 4.15, h: 0.86, valign: "middle", fontFace: BODY, fontSize: 12.5, color: C.inkSoft });
    s.addShape(pptx.ShapeType.line, { x: 5.0, y: y + 0.43, w: 0.6, h: 0, line: { color: C.line, width: 1.5 } });
    y += 0.96;
  });
  s.addText("5 Planos de Garrett: estratégia → escopo → estrutura → esqueleto → superfície (esta interface).", {
    x: 0.7, y: 6.75, w: 12, h: 0.35, fontFace: BODY, fontSize: 11, italic: true, color: C.inkSoft,
  });
  s.addNotes("A árvore nasce do login (saber quem está no turno) e desce para o painel com alarme e as cinco seções. É o 'esqueleto' dos 5 Planos de Garrett que vira a navegação do protótipo.");
}

// =================================================================
// 10. PROTÓTIPO DE BAIXA FIDELIDADE
// =================================================================
{
  const s = base("Prototipagem", "Baixa fidelidade — wireframes");
  s.addText("Estrutura e hierarquia primeiro, em tons de cinza, antes de cor e tipografia. Validamos onde cada coisa fica e o fluxo de cada tarefa.", {
    x: 0.7, y: 1.9, w: 12, h: 0.5, fontFace: BODY, fontSize: 13, color: C.inkSoft,
  });
  const wire = (x, label) => {
    const y = 2.6, w = 2.78, h = 3.4;
    card(s, x, y, w, h, { fill: C.white, line: "CFCFCF" });
    // sidebar
    s.addShape(pptx.ShapeType.rect, { x: x + 0.12, y: y + 0.12, w: 0.55, h: h - 0.24, fill: { color: "E3E3E3" }, line: { type: "none" } });
    for (let i = 0; i < 4; i++) s.addShape(pptx.ShapeType.rect, { x: x + 0.2, y: y + 0.35 + i * 0.4, w: 0.38, h: 0.12, fill: { color: "C9C9C9" }, line: { type: "none" } });
    // header
    s.addShape(pptx.ShapeType.rect, { x: x + 0.8, y: y + 0.2, w: w - 1.0, h: 0.22, fill: { color: "D9D9D9" }, line: { type: "none" } });
    return { x, y, w, h };
  };
  const g1 = wire(0.7, "");
  // painel: 4 KPI + 2 colunas
  for (let i = 0; i < 4; i++) s.addShape(pptx.ShapeType.rect, { x: 1.55 + i * 0.47, y: 3.15, w: 0.4, h: 0.5, fill: { color: "ECECEC" }, line: { color: "D2D2D2", width: 1 } });
  s.addShape(pptx.ShapeType.rect, { x: 1.55, y: 3.8, w: 0.9, h: 1.9, fill: { color: "F0F0F0" }, line: { color: "D2D2D2", width: 1 } });
  s.addShape(pptx.ShapeType.rect, { x: 2.52, y: 3.8, w: 0.85, h: 1.9, fill: { color: "F0F0F0" }, line: { color: "D2D2D2", width: 1 } });

  const g2 = wire(3.75, "");
  s.addShape(pptx.ShapeType.ellipse, { x: 4.6, y: 3.1, w: 0.5, h: 0.5, fill: { color: "E0E0E0" }, line: { type: "none" } });
  for (let i = 0; i < 4; i++) s.addShape(pptx.ShapeType.rect, { x: 4.6, y: 3.8 + i * 0.45, w: 1.75, h: 0.3, fill: { color: "F0F0F0" }, line: { color: "D2D2D2", width: 1 } });

  const g3 = wire(6.8, "");
  for (let i = 0; i < 3; i++) s.addShape(pptx.ShapeType.rect, { x: 7.65, y: 3.1 + i * 0.6, w: 1.75, h: 0.45, fill: { color: "F0F0F0" }, line: { color: "D2D2D2", width: 1 } });
  s.addShape(pptx.ShapeType.rect, { x: 7.65, y: 4.95, w: 1.75, h: 0.55, fill: { color: "F3DCDC" }, line: { color: "D98B8B", width: 1 } }); // trava

  const g4 = wire(9.85, "");
  s.addShape(pptx.ShapeType.rect, { x: 10.7, y: 3.1, w: 1.75, h: 0.5, fill: { color: "F0F0F0" }, line: { color: "D2D2D2", width: 1 } });
  s.addShape(pptx.ShapeType.rect, { x: 10.7, y: 3.75, w: 1.75, h: 1.0, fill: { color: "F0F0F0" }, line: { color: "D2D2D2", width: 1 } });
  s.addShape(pptx.ShapeType.roundRect, { x: 10.7, y: 4.95, w: 1.2, h: 0.35, rectRadius: 0.05, fill: { color: "DADADA" }, line: { type: "none" } });

  [["Painel", 0.7], ["Idosos / Ficha", 3.75], ["Remédios + trava", 6.8], ["Família", 9.85]].forEach(([t, x]) => {
    s.addText(t, { x, y: 6.05, w: 2.78, h: 0.35, align: "center", fontFace: BODY, fontSize: 12, bold: true, color: C.tealDark });
  });
  s.addNotes("Os wireframes de baixa fidelidade definem a diagramação sem distrair com cor. Já aparecem aqui o painel com KPIs, a ficha do idoso, o bloco de trava (em vermelho) e a tela de família. Comparar com os próximos slides mostra a evolução baixa → alta fidelidade.");
}

// =================================================================
// 11–14. ALTA FIDELIDADE (4 telas)
// =================================================================
function telaAlta(numero, nome, arquivo, pontos) {
  const s = base(`Alta fidelidade — Tela ${numero} de 4`, nome);
  const iw = 7.95, ih = iw * 1080 / 1920; // 4.47
  card(s, 0.6, 1.95, iw + 0.3, ih + 0.3, { shadow: true });
  s.addImage({ path: img(arquivo), x: 0.75, y: 2.1, w: iw, h: ih });
  card(s, 8.95, 1.95, 3.7, ih + 0.3, { fill: C.surface });
  s.addText("Destaques", { x: 9.2, y: 2.15, w: 3.2, h: 0.4, fontFace: HEAD, fontSize: 16, bold: true, color: C.terra });
  s.addText(bullets(pontos, { fontSize: 13, gap: 12 }), { x: 9.2, y: 2.65, w: 3.25, h: ih - 0.6, valign: "top" });
  return s;
}

telaAlta(1, "Painel do plantão", "tela-painel.png", [
  "Abre no que é urgente: alertas e cuidados atrasados.",
  "Quatro indicadores do turno em cartões grandes.",
  "Alarme de atraso de 30 min em destaque laranja.",
  "Saudação pela persona (Camila) dá contexto.",
]).addNotes("Tela inicial = Painel do Plantão da árvore de conteúdo. Mostrar que em 3 segundos a enfermeira sabe o que exige ação. Clicar num alerta leva direto à pessoa.");

telaAlta(2, "Idosos — ficha e alergias", "tela-ficha-idoso.png", [
  "Alergia em tarja vermelha, antes de qualquer conduta.",
  "“O que importa para a pessoa”: cuidado humanizado.",
  "Abas: visão geral, plano, sinais vitais e família.",
  "Risco de queda sempre visível no topo.",
]).addNotes("Seção 'Idosos' da árvore. A tarja de alergia é um significante de segurança — é o dado que alimenta a trava de medicação da próxima tela.");

telaAlta(3, "Remédios — trava de segurança", "tela-remedios-trava.png", [
  "AAS prescrito x alergia registrada = dose bloqueada.",
  "O botão “Administrar” fica desabilitado (à prova de burla).",
  "Só é possível registrar como não administrado, com justificativa.",
  "É o diferencial nº 1 da proposta, funcionando de verdade.",
]).addNotes("Demonstração ao vivo recomendada: tentar administrar o AAS da dona Lúcia. O sistema não deixa — isso é o poka-yoke / Firmitas na prática. Diferencia-nos de todos os concorrentes.");

telaAlta(4, "Família", "tela-familia.png", [
  "Contato do responsável a um toque (ligar).",
  "Registro datado de cada contato do turno.",
  "Transparência: a família sabe do dia do idoso.",
  "Fecha o ciclo do cuidado com rastreabilidade.",
]).addNotes("Seção 'Família' da árvore. Mostra o canal direto com o responsável, item que o Mapa de Empatia levantou (família cobrando relatório).");

// =================================================================
// 15. PRINCÍPIOS C.R.A.P.
// =================================================================
{
  const s = base("Análise — Princípios básicos", "Contraste · Repetição · Alinhamento · Proximidade");
  const q = (x, y, letter, title, desc, tone) => {
    card(s, x, y, 5.85, 2.1);
    s.addShape(pptx.ShapeType.roundRect, { x: x + 0.25, y: y + 0.3, w: 0.9, h: 0.9, rectRadius: 0.1, fill: { color: tone }, line: { type: "none" } });
    s.addText(letter, { x: x + 0.25, y: y + 0.3, w: 0.9, h: 0.9, align: "center", valign: "middle", fontFace: HEAD, fontSize: 30, bold: true, color: C.white });
    s.addText(title, { x: x + 1.35, y: y + 0.28, w: 4.3, h: 0.4, fontFace: HEAD, fontSize: 17, bold: true, color: C.tealDark });
    s.addText(desc, { x: x + 1.35, y: y + 0.74, w: 4.35, h: 1.2, valign: "top", fontFace: BODY, fontSize: 12.5, color: C.ink, lineSpacingMultiple: 1.05 });
  };
  q(0.7, 1.95, "C", "Contraste", "Vermelho só para risco (alergia, trava, crítico); teal para ação. O olho vai direto ao que é urgente.", C.crit);
  q(6.8, 1.95, "R", "Repetição", "Mesmo cartão, mesma pílula de status e mesma tarja em todas as telas. Aprende-se uma vez, usa-se em tudo.", C.teal);
  q(0.7, 4.3, "A", "Alinhamento", "Grade consistente: horário à esquerda, conteúdo ao centro, status à direita. Nada solto na tela.", C.terra);
  q(6.8, 4.3, "P", "Proximidade", "Cada idoso agrupa seus próprios cuidados; alergia colada ao nome. O que é do mesmo assunto fica junto.", C.ok);
  s.addNotes("Para cada princípio, apontar um exemplo concreto na interface já mostrada. Contraste e proximidade são os que mais sustentam a segurança (risco em vermelho, alergia colada ao nome).");
}

// =================================================================
// 16. TIPOGRAFIA E CORES
// =================================================================
{
  const s = base("Análise — Tipografia e cores", "Identidade visual");
  // Tipografia
  card(s, 0.7, 1.95, 5.85, 4.55);
  s.addText("Tipografia", { x: 1.0, y: 2.2, w: 5, h: 0.4, fontFace: HEAD, fontSize: 18, bold: true, color: C.terra });
  s.addText("Fraunces", { x: 1.0, y: 2.7, w: 5.2, h: 0.7, fontFace: HEAD, fontSize: 34, bold: true, color: C.tealDark });
  s.addText("Serifada, para títulos e nomes — dá tom acolhedor e humano.", { x: 1.0, y: 3.4, w: 5.2, h: 0.5, fontFace: BODY, fontSize: 12, color: C.inkSoft });
  s.addText("Atkinson Hyperlegible", { x: 1.0, y: 4.0, w: 5.2, h: 0.5, fontFace: BODY, fontSize: 22, bold: true, color: C.tealDark });
  s.addText("Sans de alta legibilidade (criada para baixa visão) no corpo e nos dados. Prioriza leitura rápida no plantão.", { x: 1.0, y: 4.5, w: 5.3, h: 1.0, valign: "top", fontFace: BODY, fontSize: 12, color: C.inkSoft });
  s.addText("Hierarquia por tamanho e peso, não por enfeite.", { x: 1.0, y: 5.7, w: 5.3, h: 0.5, fontFace: BODY, fontSize: 12, italic: true, color: C.ink });

  // Cores
  card(s, 6.8, 1.95, 5.85, 4.55);
  s.addText("Cores", { x: 7.1, y: 2.2, w: 5, h: 0.4, fontFace: HEAD, fontSize: 18, bold: true, color: C.terra });
  const sw = (x, y, hex, name, role, dark) => {
    s.addShape(pptx.ShapeType.roundRect, { x, y, w: 1.15, h: 0.95, rectRadius: 0.06, fill: { color: hex }, line: { color: C.line, width: 1 } });
    s.addText("#" + hex, { x, y: y + 0.32, w: 1.15, h: 0.3, align: "center", fontFace: BODY, fontSize: 9, bold: true, color: dark ? C.white : C.ink });
    s.addText(name, { x: x - 0.1, y: y + 1.0, w: 1.35, h: 0.3, align: "center", fontFace: BODY, fontSize: 10, bold: true, color: C.ink });
    s.addText(role, { x: x - 0.15, y: y + 1.28, w: 1.45, h: 0.5, align: "center", fontFace: BODY, fontSize: 9, color: C.inkSoft });
  };
  sw(7.1, 2.75, C.tealDark, "Teal escuro", "navegação", true);
  sw(8.55, 2.75, C.teal, "Teal", "ação", true);
  sw(10.0, 2.75, C.terra, "Terracota", "destaque", true);
  sw(11.45, 2.75, C.bg, "Creme", "fundo", false);
  sw(7.1, 4.75, C.crit, "Vermelho", "risco", true);
  sw(8.55, 4.75, C.warn, "Âmbar", "atenção", true);
  sw(10.0, 4.75, C.ok, "Verde", "concluído", true);
  sw(11.45, 4.75, C.white, "Branco", "cartão", false);
  s.addText("Teal (frio) + terracota (quente): harmonia complementar. Contrastes testados no padrão WCAG AA.", {
    x: 7.1, y: 6.05, w: 5.3, h: 0.4, fontFace: BODY, fontSize: 10.5, italic: true, color: C.inkSoft,
  });
  s.addNotes("Tipografia e cor servem à função. A Atkinson Hyperlegible foi escolhida por ser desenhada para baixa visão. A cor tem papel fixo: vermelho é sempre risco, verde é sempre concluído — isso reduz erro de leitura.");
}

// =================================================================
// 17. ESTILO DE UI
// =================================================================
{
  const s = base("Análise — Estilo de interface", "Posicionamento: Material Design + Flat 2.0");
  card(s, 0.7, 2.0, 11.95, 1.15, { fill: C.tealSoft, line: "C9DDD8" });
  s.addText(
    [
      { text: "Escolha: ", options: { bold: true, color: C.teal } },
      { text: "Material Design com toques de Flat 2.0 — superfícies, elevação leve (sombra) e componentes repetidos, evitando a “crise de significantes” do flat puro.", options: { color: C.ink } },
    ],
    { x: 1.0, y: 2.05, w: 11.4, h: 1.0, valign: "middle", fontFace: BODY, fontSize: 14 },
  );
  const col = (x, title, items, tone) => {
    card(s, x, 3.35, 3.85, 3.15);
    s.addText(title, { x: x + 0.25, y: 3.55, w: 3.4, h: 0.4, fontFace: HEAD, fontSize: 15, bold: true, color: tone });
    s.addText(bullets(items, { fontSize: 12, gap: 8 }), { x: x + 0.25, y: 4.05, w: 3.4, h: 2.3, valign: "top" });
  };
  col(0.7, "Por que não Skeuomorfismo", ["Texturas realistas poluem telas pequenas", "Pesado e difícil de escalar", "Mas: útil para seniores — inspira o alvo grande"], C.terra);
  col(4.74, "Por que não Flat puro", ["Sem sombra, some o que é clicável", "22% mais tempo por tarefa (NN/g)", "Risco alto demais num app de saúde"], C.crit);
  col(8.78, "Por que Material + Flat 2.0", ["Elevação = hierarquia clara", "Grade de 8px e contraste HCT/WCAG", "Significantes de sobrevivência: sombra, borda, hover"], C.ok);
  s.addNotes("Amarra a atividade de estilos de interface ao projeto. Num sistema de saúde, a pior falha é não saber onde clicar; por isso recusamos o flat puro e adotamos Material (elevação + grade + contraste acessível).");
}

// =================================================================
// 18. CONCLUSÃO
// =================================================================
{
  const s = base("Conclusão", "O Acolhe em uma frase");
  card(s, 0.7, 2.0, 11.95, 1.5, { fill: C.tealDark, line: C.tealDark });
  s.addText("Um plantão digital que encontra o urgente, impede o erro de medicação na hora e registra quem cuidou — com forma que acolhe sem esconder o risco.", {
    x: 1.1, y: 2.1, w: 11.2, h: 1.3, valign: "middle", fontFace: HEAD, fontSize: 19, color: C.white, lineSpacingMultiple: 1.05,
  });
  const col = (x, title, items, tone) => {
    card(s, x, 3.75, 5.85, 2.3);
    s.addText(title, { x: x + 0.3, y: 3.95, w: 5.2, h: 0.4, fontFace: HEAD, fontSize: 16, bold: true, color: tone });
    s.addText(bullets(items, { fontSize: 13, gap: 9 }), { x: x + 0.3, y: 4.45, w: 5.3, h: 1.5, valign: "top" });
  };
  col(0.7, "Entregamos", ["Problema, proposta e árvore de conteúdo", "Protótipo de baixa e alta fidelidade", "4 telas navegáveis e funcionais"], C.teal);
  col(6.8, "Próximos passos", ["Seção de rotina (banho, sono, lazer)", "Painel da chefia e controle de estoque", "Teste de usabilidade com cuidadores reais"], C.terra);
  s.addText("Protótipo acadêmico — não substitui prontuário nem prescrição médica.", {
    x: 0.7, y: 6.3, w: 12, h: 0.4, align: "center", fontFace: BODY, fontSize: 11, italic: true, color: C.inkSoft,
  });
  s.addNotes("Recapitular que cada item do enunciado foi coberto. Deixar claro o escopo (protótipo acadêmico) e os próximos passos, mostrando maturidade de produto.");
}

// =================================================================
// 19. ENCERRAMENTO
// =================================================================
{
  const s = pptx.addSlide();
  s.background = { color: C.tealDark };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: H - 0.16, w: W, h: 0.16, fill: { color: C.terra } });
  s.addText("Obrigado.", { x: 0, y: 2.6, w: W, h: 1.0, align: "center", fontFace: HEAD, fontSize: 48, bold: true, color: C.white });
  s.addText("Acolhe — Plataforma de Gestão e Segurança Assistencial para ILPIs", { x: 0, y: 3.7, w: W, h: 0.4, align: "center", fontFace: BODY, fontSize: 15, color: "E7A07A" });
  s.addText("José Eduardo · Kaio Otávio · Carlos Serena · João Pedro Ferreira · Arthur Magni", { x: 0, y: 4.5, w: W, h: 0.4, align: "center", fontFace: BODY, fontSize: 12, color: "B7D0CB" });
  s.addText("UNIVALI · Design de Interfaces · Prof. Rodrigo Ramos Martins, Msc", { x: 0, y: 4.9, w: W, h: 0.4, align: "center", fontFace: BODY, fontSize: 12, color: "B7D0CB" });
  s.addNotes("Encerramento. Abrir para perguntas e, se possível, deixar o protótipo rodando ao vivo para o júri interagir.");
}

const out = join(here, "Acolhe-Apresentacao-M3.pptx");
await pptx.writeFile({ fileName: out });
console.log("OK ->", out);
