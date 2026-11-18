type MapaProps = {
  onOpenPlatform: () => void;
};

export function Mapa({ onOpenPlatform }: MapaProps) {
  return (
    <>
      <header className="mast">
        <p className="mast-uni">Universidade do Vale do Itajaí — UNIVALI</p>
        <p>Curso: Sistemas para Internet · Disciplina: Design de Interfaces · Professor: Rodrigo Ramos Martins, Msc</p>
        <h1>Avaliação M3 — Mapa conceitual</h1>
        <p className="mast-students">Alunos: José Eduardo, Kaio Otávio, Carlos Serena, João Pedro Ferreira e Arthur Magni</p>
      </header>

      <div className="mapa">
        <article className="center-node area-center">
          <p className="eyebrow">Conceito central</p>
          <h2>Design de Interface</h2>
          <p className="center-sub">Forma + Função</p>
        </article>

        <article className="node area-dt">
          <p className="eyebrow">fundamenta-se no</p>
          <h2>Design Thinking</h2>
          <div className="link-block">
            <p className="eyebrow">estrutura-se em</p>
            <p>Imersão, Ideação e Prototipação (MVP)</p>
          </div>
          <div className="link-block">
            <p className="eyebrow">diagnostica · investiga com</p>
            <ul className="clean-list">
              <li>Matriz do Problema</li>
              <li>5 Porquês</li>
              <li>Mapa de Empatia</li>
              <li>Persona</li>
              <li>Benchmarking</li>
            </ul>
          </div>
        </article>

        <article className="node area-valor">
          <p className="eyebrow">entrega valor pela</p>
          <h2>Proposta de Valor</h2>
          <div className="link-block">
            <p className="eyebrow">detalha-se em</p>
            <h3>Canvas: Dores, Ganhos e Tarefas do Cliente</h3>
            <ul className="clean-list">
              <li>
                <strong>Dores</strong> — queda descoberta tarde, cuidado em papel, família sem notícia
              </li>
              <li>
                <strong>Ganhos</strong> — alerta em minutos, checklist com rastro, contato registrado
              </li>
              <li>
                <strong>Tarefas</strong> — priorizar o turno, executar a conduta, prestar contas
              </li>
            </ul>
          </div>
          <div className="link-block">
            <p className="eyebrow">direciona</p>
            <p>Camila Ribeiro, enfermeira do turno da tarde, no Residencial Primavera.</p>
          </div>
        </article>

        <article className="node area-triade">
          <p className="eyebrow">articula a</p>
          <h2>Tríade UX, UI e IxD</h2>
          <div className="link-block">
            <p className="eyebrow">integra</p>
            <ul className="clean-list">
              <li>UX Design (Emocional)</li>
              <li>UI Design (Física / Visual)</li>
              <li>IxD (Interação) (Tarefas)</li>
            </ul>
            <p className="gloss">Na plataforma: o tom acolhe, o alvo é grande, e a tarefa termina numa conduta registrada.</p>
          </div>
        </article>

        <article className="node area-ai">
          <p className="eyebrow">organiza via</p>
          <h2>Arquitetura de Informação</h2>
          <div className="link-block">
            <p className="eyebrow">conecta solução ao</p>
            <p>Contexto, Usuários e Conteúdo</p>
          </div>
          <div className="link-block">
            <p className="eyebrow">compõe os</p>
            <h3>5 Planos de Garrett & Árvore de Conteúdo</h3>
            <ul className="clean-list">
              <li>Estratégia — segurança e continuidade do cuidado</li>
              <li>Escopo — painel, residentes, segurança, cuidados, equipe</li>
              <li>Estrutura — ala, quarto, pessoa, tarefa</li>
              <li>Esqueleto — navegação fixa e conteúdo do turno</li>
              <li>Superfície — esta interface</li>
            </ul>
          </div>
        </article>

        <article className="node area-visual">
          <p className="eyebrow">expressa-se por</p>
          <h2>Design Visual e Estilos</h2>
          <div className="link-block">
            <p className="eyebrow">equilibra</p>
            <p>Prototipagem: Baixa, Média e Alta Fidelidade</p>
            <p className="gloss">O que está aberto na plataforma é o protótipo de alta fidelidade.</p>
          </div>
          <div className="link-block">
            <p className="eyebrow">aplica-se em</p>
            <h3>Princípios CRAP (Contraste, Repetição, Alinhamento, Proximidade)</h3>
          </div>
          <div className="link-block">
            <p className="eyebrow">materializa-se em</p>
            <h3>Tipografia & Teoria das Cores (Círculo, Temperatura, Harmonias)</h3>
            <p className="gloss">Atkinson Hyperlegible no texto, Fraunces no nome. Teal frio e terracota quente, em harmonia complementar.</p>
          </div>
          <div className="link-block">
            <p className="eyebrow">define Venustas</p>
            <h3>Estilos UI: Flat, Skeumorfismo, Metro e Material Design</h3>
            <p className="gloss">A interface se aproxima do Material Design: superfície, elevação leve e componentes repetidos, com paleta da casa.</p>
          </div>
        </article>

        <section className="laws area-leis">
          <div className="laws-grid">
            <div>
              <p className="eyebrow">rege-se pelos</p>
              <h2>Tríade clássica</h2>
              <ul className="clean-list">
                <li>
                  <strong>Utilitas</strong> — o turno encontra o que é urgente
                </li>
                <li>
                  <strong>Firmitas</strong> — alerta e cuidado têm estado e registro
                </li>
                <li>
                  <strong>Venustas</strong> — a forma acolhe sem esconder o risco
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow">avalia-se pela</p>
              <h2>Tríade estratégica</h2>
              <ul className="clean-list">
                <li>
                  <strong>Desejável</strong> — faz sentido para quem cuida e para a família
                </li>
                <li>
                  <strong>Praticável</strong> — cabe no trabalho da enfermagem
                </li>
                <li>
                  <strong>Viável</strong> — a casa consegue manter o fluxo
                </li>
              </ul>
            </div>
          </div>
          <p className="gloss law-caption">Tríade Clássica (Utilitas, Firmitas, Venustas) & Estratégica (Desejável, Praticável, Viável)</p>
        </section>

        <section className="project-band area-projeto">
          <div>
            <p className="eyebrow">concretiza-se no</p>
            <h2>Projeto aplicado: Plataforma de Gestão e Segurança Assistencial para ILPIs</h2>
            <p>Acolhe é o plantão do Residencial Primavera, em Itajaí: alertas, residentes, cuidados e equipe no mesmo fluxo.</p>
          </div>
          <button className="btn" onClick={onOpenPlatform}>
            Abrir a plataforma
          </button>
        </section>
      </div>
    </>
  );
}
