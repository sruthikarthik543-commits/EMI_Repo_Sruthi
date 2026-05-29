import type { Entry } from '../lib/types';

type EventTimelineProps = {
  entries: Entry[];
};

const KIND_COLOURS: Record<string, string> = {
  StartBreakdown: '#e74c3c',
  ArrivedAtMachine: '#e67e22',
  ProblemIdentified: '#f5a623',
  StartRepair: '#e67e22',
  RepairComplete: '#2ecc71',
  ReturnToService: '#27ae60',
  Finding: '#3498db',
  Action: '#9b59b6',
  Part: '#1abc9c',
  Note: '#95a5a6',
};

export function EventTimeline({ entries }: EventTimelineProps) {
  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Timeline</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Time</th>
            <th style={styles.th}>Event</th>
            <th style={styles.th}>Detail</th>
            <th style={styles.th}>By</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={i} style={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
              <td style={styles.td}>
                {new Date(entry.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </td>
              <td style={styles.td}>
                <span style={{
                  ...styles.kindBadge,
                  background: KIND_COLOURS[entry.kind] ?? '#555',
                }}>
                  {entry.kind}
                </span>
              </td>
              <td style={styles.td}>
                {entry.type === 'annotation' ? entry.text : '—'}
              </td>
              <td style={styles.td}>{entry.by}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { marginTop: 24 },
  heading: { color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: 12 },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' },
  th: { textAlign: 'left', padding: '8px 12px', color: '#888', borderBottom: '1px solid #2e3338', fontWeight: 600 },
  td: { padding: '8px 12px', color: '#ccc', verticalAlign: 'top' },
  rowEven: { background: '#22272c' },
  rowOdd: { background: '#1e2327' },
  kindBadge: { padding: '2px 8px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 700, color: '#fff' },
};