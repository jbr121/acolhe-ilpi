import { telHref, toneFor } from "../format";
import type { Staff } from "../types";
import { Avatar } from "../ui";

export function Equipe({ staff }: { staff: Staff[] }) {
  const house = staff.filter((person) => person.present);
  const onCall = staff.filter((person) => !person.present);

  return (
    <>
      <header className="page-head">
        <p className="kicker">Quem está na casa</p>
        <h1>Equipe do turno</h1>
        <p className="lead">Passagem de plantão às 20h. Até lá, cada ala tem uma pessoa de referência e o médico fica no sobreaviso.</p>
      </header>

      <div className="staff-grid">
        {house.map((person) => (
          <article key={person.id} className="panel staff-card">
            <div className="staff-top">
              <Avatar name={person.name} tone={toneFor(person.id)} />
              <div>
                <h2>{person.name}</h2>
                <p className="meta">{person.role}</p>
              </div>
            </div>
            <p>
              <strong>{person.place}.</strong> {person.focus}
            </p>
            {person.phone && (
              <a className="text-btn" href={telHref(person.phone)}>
                {person.phone}
              </a>
            )}
          </article>
        ))}
      </div>

      <section className="section-gap">
        <h2>Sobreaviso</h2>
        <div className="staff-grid">
          {onCall.map((person) => (
            <article key={person.id} className="panel staff-card is-off">
              <div className="staff-top">
                <Avatar name={person.name} tone={toneFor(person.id)} />
                <div>
                  <h2>{person.name}</h2>
                  <p className="meta">{person.role} · {person.place}</p>
                </div>
              </div>
              <p>{person.focus}</p>
              {person.phone && (
                <a className="btn secondary" href={telHref(person.phone)}>
                  Ligar · {person.phone}
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
