import { useEffect, useState } from "react";
import { residents } from "../data";
import { formatClock, formatDue, taskPhase } from "../format";
import type { CareTask, TaskStatus } from "../types";

type CuidadosProps = {
  now: Date;
  tasks: CareTask[];
  focusId?: string;
  onUpdate: (id: string, status: TaskStatus, note: string | undefined, doneLabel: string | undefined) => void;
  onOpenResident: (id: string) => void;
};

export function Cuidados({ now, tasks, focusId, onUpdate, onOpenResident }: CuidadosProps) {
  useEffect(() => {
    if (!focusId) return;
    document.getElementById(`tarefa-${focusId}`)?.scrollIntoView({ block: "center" });
  }, [focusId]);

  const late = tasks.filter((task) => taskPhase(task.dueMinutes, task.status, now) === "atrasado").length;

  return (
    <>
      <header className="page-head">
        <p className="kicker">Checklist do turno · 14h às 20h</p>
        <h1>Cuidados</h1>
        <p className="lead">
          {late === 0 ? "Nada atrasado neste momento." : late === 1 ? "1 cuidado passou do horário." : `${late} cuidados passaram do horário.`} A alergia aparece no nome da pessoa, antes do botão de medicar.
        </p>
      </header>

      {residents.map((resident) => {
        const group = tasks.filter((task) => task.residentId === resident.id).sort((a, b) => a.dueMinutes - b.dueMinutes);
        if (group.length === 0) return null;
        return (
          <section key={resident.id} className="task-group" aria-labelledby={`grupo-${resident.id}`}>
            <header className="group-head">
              <div>
                <h2 id={`grupo-${resident.id}`}>
                  <button className="text-btn" onClick={() => onOpenResident(resident.id)}>
                    {resident.name}
                  </button>
                </h2>
                <p className="meta">
                  Ala {resident.wing} · Quarto {resident.room}
                  {resident.allergies.length > 0 && <span className="allergy-inline">Alergia: {resident.allergies.join(", ")}</span>}
                </p>
              </div>
            </header>
            <div className="stack">
              {group.map((task) => (
                <TaskCard key={task.id} task={task} now={now} focused={focusId === task.id} onUpdate={onUpdate} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}

function TaskCard({
  task,
  now,
  focused,
  onUpdate,
}: {
  task: CareTask;
  now: Date;
  focused: boolean;
  onUpdate: CuidadosProps["onUpdate"];
}) {
  const phase = taskPhase(task.dueMinutes, task.status, now);
  const [mode, setMode] = useState<"feito" | "recusado" | null>(null);
  const [note, setNote] = useState("");
  const needsNote = mode === "recusado";
  const canSave = mode === "feito" || note.trim().length >= 8;

  const isBlocked = Boolean(task.block) && task.status === "pendente";

  return (
    <article id={`tarefa-${task.id}`} className={focused ? `task-card is-${phase} is-focus` : `task-card is-${phase}`}>
      <div className="task-main">
        <span className="due">{formatDue(task.dueMinutes)}</span>
        <div>
          <div className="alert-row-top">
            <span className="pill">{task.kind === "medicacao" ? "Medicação" : "Cuidado"}</span>
            {isBlocked ? (
              <span className="pill pill-critico">
                <span aria-hidden="true">🔒</span> Trava de segurança
              </span>
            ) : (
              <span className={phase === "atrasado" ? "pill pill-atencao" : phase === "feito" ? "pill pill-ok" : phase === "recusado" ? "pill pill-critico" : "pill"}>
                {phase === "atrasado" ? "Atrasado" : phase === "feito" ? "Feito" : phase === "recusado" ? "Não realizado" : "No horário"}
              </span>
            )}
          </div>
          <h3>{task.title}</h3>
          <p>{task.detail}</p>
          {task.status !== "pendente" && (
            <p className="meta">
              {task.status === "feito" ? "Confirmado" : "Registrado"} às {task.doneLabel}
              {task.note ? ` · ${task.note}` : ""}
            </p>
          )}
        </div>
      </div>

      {isBlocked && task.block && (
        <div className="lock">
          <p className="lock-head">
            <span aria-hidden="true">🔒</span> Administração bloqueada pelo sistema
          </p>
          <p>{task.block.reason}</p>
        </div>
      )}

      {task.status === "pendente" && mode === null && isBlocked && (
        <div className="row-actions">
          <button className="btn danger" disabled aria-disabled="true">
            Administrar
          </button>
          <button
            className="btn secondary"
            onClick={() => {
              setNote("Não administrado: dose bloqueada pela trava de segurança. Prescrição encaminhada para revisão.");
              setMode("recusado");
            }}
          >
            Registrar não administrado
          </button>
        </div>
      )}

      {task.status === "pendente" && mode === null && !isBlocked && (
        <div className="row-actions">
          <button className="btn" onClick={() => setMode("feito")}>
            {task.kind === "medicacao" ? "Administrar" : "Concluir"}
          </button>
          <button className="btn secondary" onClick={() => setMode("recusado")}>
            Não realizado
          </button>
        </div>
      )}

      {task.status === "pendente" && mode !== null && (
        <form
          className="composer"
          onSubmit={(event) => {
            event.preventDefault();
            if (!canSave || !mode) return;
            onUpdate(task.id, mode, note.trim() || undefined, formatClock(now));
            setMode(null);
            setNote("");
          }}
        >
          <label>
            {needsNote ? "Por que não foi feito" : "Observação"}
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder={needsNote ? "O que impediu o cuidado" : "Opcional. Ex.: aceitou bem, valor da glicemia"}
            />
          </label>
          {needsNote && <p className="help">A justificativa é obrigatória, com pelo menos 8 caracteres.</p>}
          <div className="row-actions">
            <button className="btn" type="submit" disabled={!canSave}>
              Confirmar
            </button>
            <button
              className="btn secondary"
              type="button"
              onClick={() => {
                setMode(null);
                setNote("");
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {task.status !== "pendente" && (
        <div className="row-actions">
          <button className="text-btn" onClick={() => onUpdate(task.id, "pendente", undefined, undefined)}>
            Desfazer registro
          </button>
        </div>
      )}
    </article>
  );
}
