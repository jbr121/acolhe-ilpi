import { useMemo, useState } from "react";
import { formatTemp, normalize, pressureNote, telHref, toneFor } from "../format";
import type { Resident } from "../types";
import { Avatar, Icon, RiskPill } from "../ui";

type ListaProps = {
  residents: Resident[];
  onOpen: (id: string) => void;
};

export function Residentes({ residents, onOpen }: ListaProps) {
  const [query, setQuery] = useState("");
  const [wing, setWing] = useState<"todas" | Resident["wing"]>("todas");
  const [onlyHigh, setOnlyHigh] = useState(false);

  const visible = useMemo(() => {
    const q = normalize(query.trim());
    return residents.filter((resident) => {
      if (wing !== "todas" && resident.wing !== wing) return false;
      if (onlyHigh && resident.risk !== "alto") return false;
      if (!q) return true;
      const blob = normalize(`${resident.name} ${resident.room} ${resident.diagnoses.join(" ")}`);
      return blob.includes(q);
    });
  }, [query, residents, wing, onlyHigh]);

  return (
    <>
      <header className="page-head">
        <p className="kicker">Casa</p>
        <h1>Residentes</h1>
        <p className="lead">Oito pessoas em acompanhamento. O risco de queda e a alergia ficam visíveis antes do quarto.</p>
      </header>

      <div className="filters">
        <label className="search">
          <span className="sr-only">Buscar residente</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nome, quarto ou diagnóstico"
          />
        </label>
        <div className="chips" role="group" aria-label="Filtrar por ala">
          {(["todas", "A", "B", "C"] as const).map((item) => (
            <button key={item} className={wing === item ? "chip is-on" : "chip"} onClick={() => setWing(item)} aria-pressed={wing === item}>
              {item === "todas" ? "Todas as alas" : `Ala ${item}`}
            </button>
          ))}
          <button className={onlyHigh ? "chip is-on" : "chip"} onClick={() => setOnlyHigh((value) => !value)} aria-pressed={onlyHigh}>
            Só risco alto
          </button>
        </div>
      </div>

      <p className="meta count">{visible.length === 1 ? "1 residente" : `${visible.length} residentes`}</p>

      {visible.length === 0 ? (
        <div className="empty">
          <p>Nenhum residente neste recorte.</p>
          <button
            className="btn secondary"
            onClick={() => {
              setQuery("");
              setWing("todas");
              setOnlyHigh(false);
            }}
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="stack">
          {visible.map((resident) => (
            <button key={resident.id} className="person" onClick={() => onOpen(resident.id)}>
              <Avatar name={resident.name} tone={toneFor(resident.id)} />
              <span className="person-main">
                <strong>{resident.name}</strong>
                <span className="meta">
                  {resident.age} anos · Ala {resident.wing} · Quarto {resident.room}
                </span>
                <span className="tags">
                  {resident.diagnoses.slice(0, 2).map((item) => (
                    <span className="tag" key={item}>
                      {item}
                    </span>
                  ))}
                  {resident.allergies.length > 0 && <span className="tag tag-alert">Alergia: {resident.allergies.join(", ")}</span>}
                </span>
              </span>
              <RiskPill risk={resident.risk} />
              <Icon name="chevron" />
            </button>
          ))}
        </div>
      )}
    </>
  );
}

type DetalheProps = {
  resident: Resident;
  contacts: string[];
  onBack: () => void;
  onContact: () => void;
};

export function ResidenteDetalhe({ resident, contacts, onBack, onContact }: DetalheProps) {
  const [tab, setTab] = useState<"geral" | "plano" | "vitais" | "familia">("geral");
  const latest = resident.vitals[0];
  const note = latest ? pressureNote(latest.sys, latest.dia) : null;

  return (
    <>
      <button className="text-btn back" onClick={onBack}>
        ← Residentes
      </button>
      <header className="detail-head">
        <Avatar name={resident.name} tone={toneFor(resident.id)} large />
        <div>
          <p className="kicker">
            Ala {resident.wing} · Quarto {resident.room}
          </p>
          <h1>{resident.name}</h1>
          <p className="meta">
            {resident.age} anos · na casa desde {resident.admission}
          </p>
          <div className="tags">
            {resident.diagnoses.map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))}
            <RiskPill risk={resident.risk} />
          </div>
        </div>
      </header>

      {resident.allergies.length > 0 ? (
        <p className="allergy-banner">Alergia: {resident.allergies.join(", ")}. Não oferecer estes itens.</p>
      ) : (
        <p className="quiet-banner">Sem alergias conhecidas.</p>
      )}

      <div className="tabs" role="tablist" aria-label="Ficha do residente">
        {(
          [
            ["geral", "Visão geral"],
            ["plano", "Plano de cuidados"],
            ["vitais", "Sinais vitais"],
            ["familia", "Família"],
          ] as const
        ).map(([id, label]) => (
          <button key={id} className={tab === id ? "tab is-selected" : "tab"} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === "geral" && (
        <div className="detail-grid">
          <article className="callout">
            <strong>O que importa para esta pessoa</strong>
            <p>{resident.matters}</p>
          </article>
          <dl className="facts">
            <div>
              <dt>Mobilidade</dt>
              <dd>{resident.mobility}</dd>
            </div>
            <div>
              <dt>Alimentação</dt>
              <dd>{resident.diet}</dd>
            </div>
            <div>
              <dt>Observação do turno</dt>
              <dd>{resident.notes}</dd>
            </div>
            {latest && (
              <div>
                <dt>Última aferição · {latest.at}</dt>
                <dd>
                  PA {latest.sys}/{latest.dia} mmHg · FC {latest.fc} bpm · {formatTemp(latest.temp)} · SpO₂ {latest.spo2}%
                  {note && <span className="warn-text">{note}</span>}
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}

      {tab === "plano" && (
        <div className="stack">
          {resident.carePlan.map((goal) => (
            <article key={goal.title} className="panel">
              <h2>{goal.title}</h2>
              <ul className="clean-list">
                {goal.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}

      {tab === "vitais" && (
        <div className="panel">
          <table className="table">
            <caption className="sr-only">Sinais vitais de {resident.name}</caption>
            <thead>
              <tr>
                <th>Quando</th>
                <th>PA</th>
                <th>FC</th>
                <th>Temp.</th>
                <th>SpO₂</th>
              </tr>
            </thead>
            <tbody>
              {resident.vitals.map((vital, index) => (
                <tr key={vital.at} className={index === 0 ? "is-latest" : undefined}>
                  <td>{vital.at}</td>
                  <td>
                    {vital.sys}/{vital.dia}
                  </td>
                  <td>{vital.fc}</td>
                  <td>{formatTemp(vital.temp)}</td>
                  <td>{vital.spo2}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          {note && <p className="warn-text">{note}</p>}
          <p className="meta">Leitura de apoio ao turno. A conduta segue a prescrição e o protocolo da casa.</p>
        </div>
      )}

      {tab === "familia" && (
        <div className="stack">
          {resident.family.map((person) => (
            <article key={person.phone} className="panel family-card">
              <div>
                <h2>{person.name}</h2>
                <p className="meta">{person.relation}</p>
              </div>
              <a className="btn secondary" href={telHref(person.phone)}>
                Ligar · {person.phone}
              </a>
            </article>
          ))}
          <article className="panel">
            <h2>Contatos deste turno</h2>
            {contacts.length === 0 ? <p className="meta">Nenhum contato registrado hoje.</p> : null}
            <ul className="clean-list">
              {contacts.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <button className="btn" onClick={onContact}>
              Registrar contato com a família
            </button>
          </article>
        </div>
      )}
    </>
  );
}
