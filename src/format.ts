import type { TaskStatus } from "./types";

/** Horário fixo do protótipo: turno da tarde, para a história do plantão não mudar com o relógio do computador. */
export function shiftAnchor(): Date {
  const date = new Date();
  date.setHours(16, 42, 0, 0);
  return date;
}

export function formatAgo(from: number, now: number): string {
  const min = Math.max(0, Math.round((now - from) / 60000));
  if (min < 1) return "agora";
  if (min < 60) return `há ${min} min`;
  const hours = Math.floor(min / 60);
  const rest = min % 60;
  if (rest === 0) return hours === 1 ? "há 1 hora" : `há ${hours} horas`;
  return `há ${hours} h ${rest} min`;
}

export function minutesOf(now: Date): number {
  return now.getHours() * 60 + now.getMinutes();
}

export function formatDue(minutes: number): string {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export function formatClock(now: Date): string {
  return now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

export function formatLongDate(now: Date): string {
  const text = now.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function greeting(now: Date): string {
  const hour = now.getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

/** Regra da casa: a medicação vira alarme quando passa 30 min do horário previsto. */
const LATE_AFTER_MINUTES = 30;

export function taskPhase(dueMinutes: number, status: TaskStatus, now: Date): TaskStatus | "atrasado" {
  if (status !== "pendente") return status;
  return minutesOf(now) > dueMinutes + LATE_AFTER_MINUTES ? "atrasado" : "pendente";
}

export function formatTemp(value: number): string {
  return `${value.toFixed(1).replace(".", ",")} °C`;
}

export function pressureNote(sys: number, dia: number): string | null {
  if (sys >= 180 || dia >= 110) return "Faixa de acionamento do médico de sobreaviso (180/110).";
  if (sys >= 160 || dia >= 100) return "Acima da faixa de atenção (160/100). Repetir e avisar a enfermagem.";
  if (sys >= 140 || dia >= 90) return "Acima da meta usual de 140/90.";
  return null;
}

export function initials(name: string): string {
  const parts = name.replace(/^Dr\.\s+/i, "").split(" ").filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
}

const tones = [
  { bg: "#d7ebe7", fg: "#0f5e5b" },
  { bg: "#f4e1d4", fg: "#8c4324" },
  { bg: "#e3e6f0", fg: "#24324a" },
  { bg: "#efe6c8", fg: "#6d5312" },
];

export function toneFor(id: string): { bg: string; fg: string } {
  const index = [...id].reduce((sum, char) => sum + char.charCodeAt(0), 0) % tones.length;
  return tones[index];
}

export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function telHref(phone: string): string {
  return `tel:+55${phone.replace(/\D/g, "")}`;
}
