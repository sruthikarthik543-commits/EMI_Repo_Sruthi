import type { RepairEvent } from '../lib/types';

type MetricsPanelProps = {
  event: RepairEvent;
};

function getMinutesBetween(entries: RepairEvent['entries'], fromKind: string, toKind: string): number | null {
  const from = entries.find(e => e.type === 'milestone' && e.kind === fromKind);
  const to = entries.find(e => e.type === 'milestone' && e.kind === toKind);
  if (!from || !to) return null;
  return Math.round((new Date(to.at).getTime() - new Date(from.at).getTime()) / 60000);
}

function metricColour(mins: number, warnAt: number, alertAt: number): string {
  if (mins <= warnAt) return '#2ecc71';
  if (mins <= alertAt) return '#f5a623';
  return '#e74c3c';
}

export function MetricsPanel({ event }: MetricsPanelProps) {
  const { entries } = event;

  const response = getMinutesBetween(entries, 'StartBreakdown', 'ArrivedAtMachine');
  const diagnosis = getMinutesBetween(entries, 'ArrivedAtMachine', 'ProblemIdentified');
  const repair = getMinutesBetween(entries, 'StartRepair', 'RepairComplete');
  const downtime = getMinutesBetween(entries, 'StartBreakdown', 'ReturnToService');

  const metrics = [
    { label: 'Response Time', value: response, warn: 15, alert: 30 },
    { label: 'Diagnosis Time', value: diagnosis, warn: 20, alert: 45 },
    { label: 'Repair Time', value: repair, warn: 60, alert: 120 },
    { label: 'Total Downtime', value: downtime, warn: 90, alert: 180 },
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Metrics</h3>
      <div style={styles.grid}>
        {metrics.map(m => (
          <div key={m.label} style={styles.card}>
            <div style={styles.label}>{m.label}</div>
            {m.value !== null ? (
              <div style={{ ...styles.value, color: metricColour(m.value, m.warn, m.alert) }}>
                {m.value} <span style={styles.unit}>min</span>
              </div>
            ) : (
              <div style={styles.na}>—</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { marginBottom: 24 },
  heading: { color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: 12 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 },
  card: { background: '#2a2f35', borderRadius: 8, padding: '14px 16px' },
  label: { color: '#888', fontSize: '0.75rem', marginBottom: 6 },
  value: { fontSize: '1.6rem', fontWeight: 700 },
  unit: { fontSize: '0.8rem', fontWeight: 400, color: '#888' },
  na: { color: '#555', fontSize: '1.4rem' },
};