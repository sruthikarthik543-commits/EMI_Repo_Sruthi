import type { Entry } from '../lib/types';

type RecentEntriesProps = {
  entries: Entry[];
};

export function RecentEntries({ entries }: RecentEntriesProps) {
  const annotations = entries.filter(e => e.type === 'annotation');

  if (annotations.length === 0) {
    return <p style={styles.empty}>No entries yet.</p>;
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Recent Entries</h3>
      {[...annotations].reverse().map((entry, i) => {
        if (entry.type !== 'annotation') return null;
        return (
          <div key={i} style={styles.entry}>
            <span style={styles.kind}>{entry.kind}</span>
            <span style={styles.text}>{entry.text}</span>
            <span style={styles.meta}>
              {new Date(entry.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {entry.by}
            </span>
          </div>
        );
      })}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { marginTop: 8 },
  heading: { fontSize: '1rem', fontWeight: 700, marginBottom: 12 },
  empty: { color: '#999', fontStyle: 'italic' },
  entry: {
    display: 'flex', flexDirection: 'column', gap: 4,
    padding: '12px 16px', borderRadius: 8,
    background: '#f9f9f9', border: '1px solid #eee',
    marginBottom: 10,
  },
  kind: { fontSize: '0.75rem', fontWeight: 700, color: '#f5a623', textTransform: 'uppercase' },
  text: { fontSize: '0.95rem', color: '#333' },
  meta: { fontSize: '0.75rem', color: '#999' },
};