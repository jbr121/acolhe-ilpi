import { initials } from "./format";
import type { AlertLevel, Risk } from "./types";

export type IconName =
  | "painel"
  | "people"
  | "shield"
  | "care"
  | "team"
  | "map"
  | "chevron"
  | "alert"
  | "clock"
  | "info"
  | "check";

export function Icon({ name }: { name: IconName }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {name === "painel" && (
        <>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.4" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1.4" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.4" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1.4" />
        </>
      )}
      {name === "people" && (
        <>
          <circle cx="12" cy="8" r="3" />
          <path d="M5.5 19.5c.8-3.2 3.2-4.8 6.5-4.8s5.7 1.6 6.5 4.8" />
        </>
      )}
      {name === "shield" && <path d="M12 3.5 19 6.2v5.6c0 4.4-2.9 7-7 8.2-4.1-1.2-7-3.8-7-8.2V6.2L12 3.5z" />}
      {name === "care" && (
        <>
          <rect x="6" y="4.5" width="12" height="16" rx="2" />
          <path d="M9 4.5h6v3H9zM9 12h6M9 16h4" />
        </>
      )}
      {name === "team" && (
        <>
          <circle cx="9" cy="9" r="2.4" />
          <circle cx="16" cy="9.5" r="2" />
          <path d="M4.5 18.5c.6-2.6 2.4-3.8 4.6-3.8 2.1 0 3.8 1.2 4.5 3.4M13.5 14.8c1.6-.2 3.2.6 4 2.7" />
        </>
      )}
      {name === "map" && (
        <>
          <path d="M4 7.2 9 5l6 2.2L20 5.2V17l-5 2-6-2.2L4 18.8V7.2z" />
          <path d="M9 5v12M15 7.2V19" />
        </>
      )}
      {name === "chevron" && <path d="m9 6 6 6-6 6" />}
      {name === "alert" && (
        <>
          <path d="M12 4.2 21 19.5H3L12 4.2z" />
          <path d="M12 10v4.2" />
          <circle cx="12" cy="16.6" r="0.7" fill="currentColor" stroke="none" />
        </>
      )}
      {name === "clock" && (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4.5l3 2" />
        </>
      )}
      {name === "info" && (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 11v5" />
          <circle cx="12" cy="8" r="0.7" fill="currentColor" stroke="none" />
        </>
      )}
      {name === "check" && <path d="m5 12.5 4.2 4.2L19 7.5" />}
    </svg>
  );
}

const levelLabel: Record<AlertLevel, string> = {
  critico: "Crítico",
  atencao: "Atenção",
  info: "Registro",
};

const levelIcon: Record<AlertLevel, IconName> = {
  critico: "alert",
  atencao: "clock",
  info: "info",
};

export function LevelPill({ level }: { level: AlertLevel }) {
  return (
    <span className={`pill pill-${level}`}>
      <Icon name={levelIcon[level]} />
      {levelLabel[level]}
    </span>
  );
}

const riskLabel: Record<Risk, string> = {
  alto: "Risco alto",
  moderado: "Risco moderado",
  baixo: "Risco baixo",
};

export function RiskPill({ risk }: { risk: Risk }) {
  return <span className={`pill pill-risk-${risk}`}>{riskLabel[risk]}</span>;
}

export function Avatar({ name, tone, large = false }: { name: string; tone: { bg: string; fg: string }; large?: boolean }) {
  return (
    <span className={large ? "avatar avatar-lg" : "avatar"} style={{ background: tone.bg, color: tone.fg }} aria-hidden="true">
      {initials(name)}
    </span>
  );
}
