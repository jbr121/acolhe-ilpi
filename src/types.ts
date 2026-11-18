export type Risk = "alto" | "moderado" | "baixo";
export type Wing = "A" | "B" | "C";

export type Vital = {
  at: string;
  sys: number;
  dia: number;
  fc: number;
  temp: number;
  spo2: number;
};

export type FamilyContact = {
  name: string;
  relation: string;
  phone: string;
};

export type CareGoal = {
  title: string;
  items: string[];
};

export type Resident = {
  id: string;
  name: string;
  age: number;
  wing: Wing;
  room: string;
  admission: string;
  diagnoses: string[];
  risk: Risk;
  mobility: string;
  diet: string;
  allergies: string[];
  matters: string;
  notes: string;
  family: FamilyContact[];
  vitals: Vital[];
  carePlan: CareGoal[];
};

export type AlertLevel = "critico" | "atencao" | "info";
export type AlertStatus = "aberto" | "em_atendimento" | "resolvido";

export type Alert = {
  id: string;
  residentId: string;
  level: AlertLevel;
  title: string;
  detail: string;
  place: string;
  openedAt: number;
  status: AlertStatus;
  conduct?: string;
  assignee?: string;
};

export type TaskKind = "medicacao" | "cuidado";
export type TaskStatus = "pendente" | "feito" | "recusado";

export type CareTask = {
  id: string;
  residentId: string;
  dueMinutes: number;
  kind: TaskKind;
  title: string;
  detail: string;
  status: TaskStatus;
  note?: string;
  doneLabel?: string;
  /** Trava de segurança: bloqueia a administração por conflito clínico (alergia ou interação). */
  block?: { kind: "alergia" | "interacao"; reason: string };
};

export type Staff = {
  id: string;
  name: string;
  role: string;
  place: string;
  focus: string;
  phone?: string;
  present: boolean;
};

export type Route =
  | { name: "painel" }
  | { name: "residentes" }
  | { name: "residente"; id: string }
  | { name: "seguranca"; focusId?: string }
  | { name: "cuidados"; focusId?: string }
  | { name: "equipe" }
  | { name: "mapa" };
