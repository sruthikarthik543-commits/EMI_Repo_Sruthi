import type { RepairEvent, RepairStatus } from '../lib/types';
import { MILESTONE_SEQUENCE } from '../lib/types';

type EventCardProps = {
  event: RepairEvent;
  isSelected: boolean;
  onClick: () => void;
};

const STATUS_COLOURS: Record<RepairStatus, string> = {
  Active: '#f5a623',
  Stopped: '#e74c3c',
  Completed: '#2ecc71',
};

export function EventCard({ event, isSelected, onClick }: EventCardProps) {
  const stamped = event.entries.filter(e => e.type === 'milestone').length;
  const total = MILESTONE_SEQUENCE.length;
  const progress = Math.round((stamped / total) * 100);

  return (
    <div onClick={onClick} style={{
      ...styles.card,
      border: isSelected ? '2px solid #f5a623' : '2px solid #2e3338',
    }}>
      <div style={styles.topRow}>
        <span style={styles.id}>{event.id}</span>
        <span style={{ ...styles.status, background: STATUS_COLOURS[event.status] }}>
          {event.status}
        </span>
      </div>
      <div style={styles.asset}>{event.asset}</div>
      <div style={styles.system}>{event.system}</div>
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${progress}%` }} />
      </div>
      <div style={styles.progressLabel}>{stamped}/{total} milestones</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: '#2a2f35',
    borderRadius: 10,
    padding: '14px 16px',
    minWidth: 180,
    cursor: 'pointer',
    transition: 'border 0.2s',
  },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  id: { color: '#fff', fontWeight: 700, fontSize: '0.9rem' },
  status: { fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 999, color: '#1e2327' },
  asset: { color: '#fff', fontSize: '0.95rem', fontWeight: 600, marginBottom: 2 },
  system: { color: '#888', fontSize: '0.8rem', marginBottom: 10 },
  progressBar: { height: 4, background: '#3e4449', borderRadius: 2, overflow: 'hidden', marginBottom: 4 },
  progressFill: { height: '100%', background: '#f5a623', borderRadius: 2, transition: 'width 0.3s' },
  progressLabel: { color: '#666', fontSize: '0.72rem' },
};