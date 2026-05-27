import type { ReactNode } from "react";
import { AlertTriangle, ChevronRight } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <header className="page-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actions && <div className="header-actions">{actions}</div>}
    </header>
  );
}

export function PanelHeader({
  icon,
  title,
  action,
  onAction,
}: {
  icon: ReactNode;
  title: string;
  action: string;
  onAction?: () => void;
}) {
  return (
    <div className="panel-header">
      <h2>{icon}{title}</h2>
      <button onClick={onAction}>{action}<ChevronRight size={13} /></button>
    </div>
  );
}

export function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input value={value} readOnly />
    </label>
  );
}

export function Metric({ title, value, detail }: { title: string; value: string; detail: string }) {
  return (
    <div className="metric">
      <span>{title}</span>
      <strong>{value}</strong>
      <em>{detail}</em>
    </div>
  );
}

export function Avatar({ name, index, large = false }: { name: string; index: number; large?: boolean }) {
  const colors = ["#3b82f6", "#10a778", "#574bf5", "#f59e0b", "#ef4444"];
  return (
    <span className={large ? "mini-avatar large" : "mini-avatar"} style={{ background: colors[index % colors.length] }}>
      {name.split(" ").slice(-1)[0].charAt(0)}
    </span>
  );
}

export function ScoreRing({ value, label }: { value: number; label: string }) {
  return (
    <div className="score-ring" style={{ "--score": `${value * 3.6}deg` } as React.CSSProperties}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export function InsightCard({
  title,
  value,
  icon: Icon,
  color,
  note,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  note: string;
}) {
  return (
    <section className="panel insight-card">
      <div className="insight-icon" style={{ color }}>
        <Icon size={18} />
      </div>
      <span>{title}</span>
      <strong>{value}</strong>
      <p>{note}</p>
    </section>
  );
}

export function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-panel" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.stopPropagation()}>
        <header className="modal-header">
          <h2>{title}</h2>
          <button className="ghost-icon" onClick={onClose} aria-label="Close modal">x</button>
        </header>
        {children}
      </section>
    </div>
  );
}

export function AuthNotice({ children }: { children: ReactNode }) {
  return (
    <div className="auth-warning">
      <AlertTriangle size={16} />
      <span>{children}</span>
    </div>
  );
}

export function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      {label && <strong>{label}</strong>}
      {payload.map((item) => (
        <span key={item.name}>
          <i style={{ background: item.color }} />
          {item.name}: <b>{item.value}</b>
        </span>
      ))}
    </div>
  );
}
