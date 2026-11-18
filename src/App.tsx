import { useEffect, useState } from "react";
import { BED_CAPACITY, NURSE_NAME, alertsSeed, contactsSeed, residents, residentById, staff, tasksSeed } from "./data";
import { formatClock, shiftAnchor, taskPhase } from "./format";
import type { Alert, CareTask, Route, TaskStatus } from "./types";
import { Icon, type IconName } from "./ui";
import { Cuidados } from "./views/Cuidados";
import { Equipe } from "./views/Equipe";
import { Mapa } from "./views/Mapa";
import { Painel } from "./views/Painel";
import { ResidenteDetalhe, Residentes } from "./views/Residentes";
import { Seguranca } from "./views/Seguranca";

const nav: { name: Route["name"]; label: string; icon: IconName; group: "plantao" | "avaliacao" }[] = [
  { name: "painel", label: "Painel", icon: "painel", group: "plantao" },
  { name: "residentes", label: "Residentes", icon: "people", group: "plantao" },
  { name: "seguranca", label: "Segurança", icon: "shield", group: "plantao" },
  { name: "cuidados", label: "Cuidados", icon: "care", group: "plantao" },
  { name: "equipe", label: "Equipe", icon: "team", group: "plantao" },
  { name: "mapa", label: "Mapa conceitual", icon: "map", group: "avaliacao" },
];

export function App() {
  const [route, setRoute] = useState<Route>({ name: "painel" });
  const [now] = useState(() => shiftAnchor());
  const [alerts, setAlerts] = useState<Alert[]>(() => alertsSeed.map((alert) => ({ ...alert })));
  const [tasks, setTasks] = useState<CareTask[]>(() => tasksSeed.map((task) => ({ ...task })));
  const [contacts, setContacts] = useState<Record<string, string[]>>(() => ({ ...contactsSeed }));
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 3400);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  useEffect(() => {
    const titles: Record<Route["name"], string> = {
      painel: "Painel",
      residentes: "Residentes",
      residente: "Residente",
      seguranca: "Segurança",
      cuidados: "Cuidados",
      equipe: "Equipe",
      mapa: "Mapa conceitual",
    };
    document.title = `${titles[route.name]} · Acolhe`;
  }, [route]);

  const openAlerts = alerts.filter((alert) => alert.status !== "resolvido").length;
  const lateTasks = tasks.filter((task) => taskPhase(task.dueMinutes, task.status, now) === "atrasado").length;

  function assume(id: string) {
    setAlerts((list) => list.map((alert) => (alert.id === id ? { ...alert, status: "em_atendimento", assignee: NURSE_NAME } : alert)));
    setToast("Alerta assumido por Camila.");
  }

  function resolve(id: string, conduct: string) {
    setAlerts((list) => list.map((alert) => (alert.id === id ? { ...alert, status: "resolvido", conduct, assignee: alert.assignee ?? NURSE_NAME } : alert)));
    setToast("Conduta registrada. O alerta saiu da fila.");
  }

  function reopen(id: string) {
    setAlerts((list) => list.map((alert) => (alert.id === id ? { ...alert, status: "aberto", conduct: undefined, assignee: undefined } : alert)));
    setToast("Alerta reaberto.");
  }

  function updateTask(id: string, status: TaskStatus, note: string | undefined, doneLabel: string | undefined) {
    setTasks((list) => list.map((task) => (task.id === id ? { ...task, status, note, doneLabel } : task)));
    if (status === "pendente") setToast("Registro desfeito.");
    else if (status === "feito") setToast("Cuidado confirmado.");
    else setToast("Não realização registrada.");
  }

  function registerContact(residentId: string) {
    const resident = residentById(residentId);
    const stamp = formatClock(now);
    const relative = resident?.family[0]?.name ?? "familiar";
    setContacts((current) => ({
      ...current,
      [residentId]: [...(current[residentId] ?? []), `${stamp} — contato com ${relative}, registrado por Camila.`],
    }));
    setToast(`Contato com ${relative} registrado às ${stamp}.`);
  }

  const activeName: Route["name"] = route.name === "residente" ? "residentes" : route.name;

  return (
    <>
      <a className="skip" href="#conteudo">
        Ir para o conteúdo
      </a>
      <div className="app">
        <aside className="sidebar">
          <button className="brand" onClick={() => setRoute({ name: "painel" })}>
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32">
                <path d="M5 18c0-6.2 4.4-11 11-11s11 4.8 11 11" />
                <path d="M4 22h7l2.2-4.2 2.8 7 2.6-5 2 2.2H28" />
              </svg>
            </span>
            <span>
              <span className="brand-name">Acolhe</span>
              <span className="brand-sub">Gestão e segurança</span>
            </span>
          </button>

          <nav className="nav" aria-label="Seções">
            <p className="nav-label">Plantão</p>
            {nav
              .filter((item) => item.group === "plantao")
              .map((item) => (
                <button
                  key={item.name}
                  className={activeName === item.name ? "nav-item is-active" : "nav-item"}
                  aria-current={activeName === item.name ? "page" : undefined}
                  onClick={() => setRoute({ name: item.name } as Route)}
                >
                  <Icon name={item.icon} />
                  {item.label}
                  {item.name === "seguranca" && openAlerts > 0 && <span className="badge">{openAlerts}</span>}
                  {item.name === "cuidados" && lateTasks > 0 && <span className="badge badge-warm">{lateTasks}</span>}
                </button>
              ))}
            <p className="nav-label">Avaliação</p>
            {nav
              .filter((item) => item.group === "avaliacao")
              .map((item) => (
                <button
                  key={item.name}
                  className={activeName === item.name ? "nav-item is-active" : "nav-item"}
                  aria-current={activeName === item.name ? "page" : undefined}
                  onClick={() => setRoute({ name: item.name } as Route)}
                >
                  <Icon name={item.icon} />
                  {item.label}
                </button>
              ))}
          </nav>

          <p className="side-foot">
            Protótipo de alta fidelidade
            <br />
            UNIVALI · Design de Interfaces
            <br />
            Não substitui o prontuário · {residents.length}/{BED_CAPACITY} leitos
          </p>
        </aside>

        <div className="main">
          <header className="topbar">
            <p className="topbar-place">Residencial Primavera · Itajaí</p>
            <div className="topbar-right">
              <span className="shift">Turno da tarde · 14h–20h</span>
              <time dateTime={now.toISOString()}>{formatClock(now)}</time>
              <span className="user">
                <span className="avatar avatar-sm" style={{ background: "#f4e1d4", color: "#8c4324" }} aria-hidden="true">
                  CR
                </span>
                <span className="user-name">
                  Camila Ribeiro
                  <span>Enfermeira</span>
                </span>
              </span>
            </div>
          </header>

          <main id="conteudo" className="content" tabIndex={-1}>
            {route.name === "painel" && <Painel now={now} alerts={alerts} tasks={tasks} onNavigate={setRoute} />}
            {route.name === "residentes" && <Residentes residents={residents} onOpen={(id) => setRoute({ name: "residente", id })} />}
            {route.name === "residente" && (
              <DetalheRoute
                id={route.id}
                contacts={contacts[route.id] ?? []}
                onBack={() => setRoute({ name: "residentes" })}
                onContact={() => registerContact(route.id)}
              />
            )}
            {route.name === "seguranca" && (
              <Seguranca
                now={now}
                alerts={alerts}
                focusId={route.focusId}
                onAssume={assume}
                onResolve={resolve}
                onReopen={reopen}
                onOpenResident={(id) => setRoute({ name: "residente", id })}
              />
            )}
            {route.name === "cuidados" && (
              <Cuidados
                now={now}
                tasks={tasks}
                focusId={route.focusId}
                onUpdate={updateTask}
                onOpenResident={(id) => setRoute({ name: "residente", id })}
              />
            )}
            {route.name === "equipe" && <Equipe staff={staff} />}
            {route.name === "mapa" && <Mapa onOpenPlatform={() => setRoute({ name: "painel" })} />}
          </main>
        </div>
      </div>
      <div role="status" className={toast ? "toast" : "sr-only"}>
        {toast}
      </div>
    </>
  );
}

function DetalheRoute({
  id,
  contacts,
  onBack,
  onContact,
}: {
  id: string;
  contacts: string[];
  onBack: () => void;
  onContact: () => void;
}) {
  const resident = residentById(id);
  if (!resident) {
    return (
      <div className="empty">
        <p>Residente não encontrado.</p>
        <button className="btn" onClick={onBack}>
          Voltar
        </button>
      </div>
    );
  }
  return <ResidenteDetalhe resident={resident} contacts={contacts} onBack={onBack} onContact={onContact} />;
}
