import { useEffect, useState } from "react";
import { residentById } from "../data";
import { formatAgo } from "../format";
import type { Alert, AlertStatus } from "../types";
import { LevelPill } from "../ui";

type SegurancaProps = {
  now: Date;
  alerts: Alert[];
  focusId?: string;
  onAssume: (id: string) => void;
  onResolve: (id: string, conduct: string) => void;
  onReopen: (id: string) => void;
  onOpenResident: (id: string) => void;
};

const statusLabel: Record<AlertStatus, string> = {
  aberto: "Aberto",
  em_atendimento: "Em atendimento",
  resolvido: "Resolvido",
};

export function Seguranca({ now, alerts, focusId, onAssume, onResolve, onReopen, onOpenResident }: SegurancaProps) {
  const open = alerts.filter((alert) => alert.status !== "resolvido");
  const done = alerts.filter((alert) => alert.status === "resolvido");

  useEffect(() => {
    if (!focusId) return;
    document.getElementById(`alerta-${focusId}`)?.scrollIntoView({ block: "center" });
  }, [focusId]);

  return (
    <>
      <header className="page-head">
        <p className="kicker">Segurança assistencial</p>
        <h1>Alertas do turno</h1>
        <p className="lead">Assuma o alerta, veja a pessoa e registre a conduta. Sem conduta escrita, o alerta não encerra.</p>
      </header>

      <section aria-labelledby="abertos-titulo">
        <h2 id="abertos-titulo">{open.length === 0 ? "Nenhum alerta por resolver" : "Por resolver"}</h2>
        {open.length === 0 ? <p className="empty-inline">O turno está estável. Os resolvidos ficam logo abaixo.</p> : null}
        <div className="stack">
          {open.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              now={now}
              focused={focusId === alert.id}
              onAssume={onAssume}
              onResolve={onResolve}
              onReopen={onReopen}
              onOpenResident={onOpenResident}
            />
          ))}
        </div>
      </section>

      <section className="section-gap" aria-labelledby="resolvidos-titulo">
        <h2 id="resolvidos-titulo">Resolvidos neste turno</h2>
        <div className="stack">
          {done.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              now={now}
              focused={focusId === alert.id}
              onAssume={onAssume}
              onResolve={onResolve}
              onReopen={onReopen}
              onOpenResident={onOpenResident}
            />
          ))}
        </div>
      </section>
    </>
  );
}

function AlertCard({
  alert,
  now,
  focused,
  onAssume,
  onResolve,
  onReopen,
  onOpenResident,
}: {
  alert: Alert;
  now: Date;
  focused: boolean;
  onAssume: (id: string) => void;
  onResolve: (id: string, conduct: string) => void;
  onReopen: (id: string) => void;
  onOpenResident: (id: string) => void;
}) {
  const resident = residentById(alert.residentId);
  const [note, setNote] = useState(alert.conduct ?? "");
  const canResolve = note.trim().length >= 8;

  return (
    <article id={`alerta-${alert.id}`} className={focused ? `alert-card alert-${alert.level} is-focus` : `alert-card alert-${alert.level}`}>
      <div className="alert-row-top">
        <LevelPill level={alert.level} />
        <span className="pill">{statusLabel[alert.status]}</span>
        <span className="meta">{formatAgo(alert.openedAt, now.getTime())}</span>
      </div>
      <h3>{alert.title}</h3>
      <p>{alert.detail}</p>
      <p className="meta">
        <button className="text-btn" onClick={() => resident && onOpenResident(resident.id)}>
          {resident?.name}
        </button>
        {" · "}
        {alert.place}
        {resident && resident.allergies.length > 0 ? ` · Alergia: ${resident.allergies.join(", ")}` : ""}
      </p>

      {alert.status === "aberto" && (
        <div className="row-actions">
          <button className="btn" onClick={() => onAssume(alert.id)}>
            Assumir alerta
          </button>
        </div>
      )}

      {alert.status === "em_atendimento" && (
        <form
          className="composer"
          onSubmit={(event) => {
            event.preventDefault();
            if (!canResolve) return;
            onResolve(alert.id, note.trim());
          }}
        >
          <p className="meta">{alert.assignee} está neste alerta. Descreva o que foi feito.</p>
          <label>
            Conduta
            <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="O que você encontrou e o que fez" />
          </label>
          <p className="help">Mínimo de 8 caracteres. O texto fica no histórico do turno.</p>
          <div className="row-actions">
            <button className="btn" type="submit" disabled={!canResolve}>
              Resolver com conduta
            </button>
          </div>
        </form>
      )}

      {alert.status === "resolvido" && alert.conduct && (
        <blockquote className="conduct">
          <p>{alert.conduct}</p>
          <footer>
            {alert.assignee} · conduta registrada
          </footer>
          <button className="text-btn" onClick={() => onReopen(alert.id)}>
            Reabrir alerta
          </button>
        </blockquote>
      )}
    </article>
  );
}
