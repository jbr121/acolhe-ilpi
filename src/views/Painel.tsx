import { BED_CAPACITY, residentById, residents } from "../data";
import { formatAgo, formatDue, formatLongDate, greeting, taskPhase } from "../format";
import type { Alert, CareTask, Route } from "../types";
import { LevelPill, RiskPill } from "../ui";

type PainelProps = {
  now: Date;
  alerts: Alert[];
  tasks: CareTask[];
  onNavigate: (route: Route) => void;
};

export function Painel({ now, alerts, tasks, onNavigate }: PainelProps) {
  const openAlerts = alerts
    .filter((alert) => alert.status !== "resolvido")
    .sort((a, b) => rankLevel(a.level) - rankLevel(b.level) || b.openedAt - a.openedAt);
  const lateTasks = tasks.filter((task) => taskPhase(task.dueMinutes, task.status, now) === "atrasado");
  const nextTasks = tasks
    .filter((task) => task.status === "pendente")
    .sort((a, b) => a.dueMinutes - b.dueMinutes)
    .slice(0, 5);
  const attention = ["maria", "conceicao", "geraldo", "antonio"]
    .map((id) => residentById(id))
    .filter((resident) => resident !== undefined);
  const freeBeds = BED_CAPACITY - residents.length;

  return (
    <>
      <header className="page-head">
        <p className="kicker">Plantão da tarde</p>
        <h1>
          {greeting(now)}, Camila
        </h1>
        <p className="lead">
          {formatLongDate(now)}. {resumo(openAlerts.length, lateTasks.length)}
        </p>
      </header>

      <section className="kpis" aria-label="Resumo do turno">
        <button className="kpi" onClick={() => onNavigate({ name: "residentes" })}>
          <span className="kpi-value">{residents.length}</span>
          <span className="kpi-label">Residentes</span>
          <span className="kpi-sub">na casa hoje</span>
        </button>
        <button className={openAlerts.length ? "kpi is-hot" : "kpi"} onClick={() => onNavigate({ name: "seguranca" })}>
          <span className="kpi-value">{openAlerts.length}</span>
          <span className="kpi-label">Alertas abertos</span>
          <span className="kpi-sub">por registrar conduta</span>
        </button>
        <button className={lateTasks.length ? "kpi is-warm" : "kpi"} onClick={() => onNavigate({ name: "cuidados" })}>
          <span className="kpi-value">{lateTasks.length}</span>
          <span className="kpi-label">Cuidados atrasados</span>
          <span className="kpi-sub">passaram 30 min do horário</span>
        </button>
        <article className="kpi">
          <span className="kpi-value">{freeBeds}</span>
          <span className="kpi-label">Leitos livres</span>
          <span className="kpi-sub">de {BED_CAPACITY} na casa</span>
        </article>
      </section>

      <div className="split">
        <section className="panel" aria-labelledby="alertas-titulo">
          <div className="panel-head">
            <h2 id="alertas-titulo">Alertas prioritários</h2>
            <button className="text-btn" onClick={() => onNavigate({ name: "seguranca" })}>
              Ver segurança
            </button>
          </div>
          <div className="stack">
            {openAlerts.map((alert) => {
              const resident = residentById(alert.residentId);
              return (
                <button
                  key={alert.id}
                  className={`alert-row alert-${alert.level}`}
                  onClick={() => onNavigate({ name: "seguranca", focusId: alert.id })}
                >
                  <span className="alert-row-top">
                    <LevelPill level={alert.level} />
                    <span className="meta">{formatAgo(alert.openedAt, now.getTime())}</span>
                  </span>
                  <strong>{alert.title}</strong>
                  <span className="meta">
                    {resident?.name} · {alert.place}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="panel" aria-labelledby="turno-titulo">
          <div className="panel-head">
            <h2 id="turno-titulo">Cuidados do turno</h2>
            <button className="text-btn" onClick={() => onNavigate({ name: "cuidados" })}>
              Abrir checklist
            </button>
          </div>
          <div className="stack">
            {nextTasks.map((task) => {
              const resident = residentById(task.residentId);
              const phase = taskPhase(task.dueMinutes, task.status, now);
              return (
                <button
                  key={task.id}
                  className="task-row"
                  onClick={() => onNavigate({ name: "cuidados", focusId: task.id })}
                >
                  <span className="due">{formatDue(task.dueMinutes)}</span>
                  <span className="task-copy">
                    <strong>{task.title}</strong>
                    <span className="meta">
                      {resident?.name} · Quarto {resident?.room}
                    </span>
                  </span>
                  <span className={phase === "atrasado" ? "pill pill-atencao" : "pill"}>{phase === "atrasado" ? "Atrasado" : "No horário"}</span>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <section className="panel section-gap" aria-labelledby="atencao-titulo">
        <div className="panel-head">
          <h2 id="atencao-titulo">Quem pede mais atenção</h2>
          <button className="text-btn" onClick={() => onNavigate({ name: "residentes" })}>
            Todos os residentes
          </button>
        </div>
        <div className="attention-grid">
          {attention.map((resident) => (
            <button key={resident.id} className="attention" onClick={() => onNavigate({ name: "residente", id: resident.id })}>
              <span className="attention-top">
                <strong>{resident.name}</strong>
                <RiskPill risk={resident.risk} />
              </span>
              <span className="meta">
                Ala {resident.wing} · Quarto {resident.room}
              </span>
              <span>{resident.matters}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

function rankLevel(level: Alert["level"]): number {
  if (level === "critico") return 0;
  if (level === "atencao") return 1;
  return 2;
}

function resumo(alerts: number, late: number): string {
  const alerta = alerts === 0 ? "Nenhum alerta aberto" : alerts === 1 ? "Há 1 alerta aberto" : `Há ${alerts} alertas abertos`;
  const cuidado = late === 0 ? "nenhum cuidado atrasado" : late === 1 ? "1 cuidado atrasado" : `${late} cuidados atrasados`;
  return `${alerta} e ${cuidado}.`;
}
