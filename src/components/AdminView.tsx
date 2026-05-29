import { useState } from 'react';
import { useRepairEvents } from '../lib/RepairEventContext';
import { EventCard } from './EventCard';
import { EventTimeline } from './EventTimeline';
import { MetricsPanel } from './MetricsPanel';

export function AdminView() {
  const { events } = useRepairEvents();
  const [selectedId, setSelectedId] = useState<string>(events[0]?.id ?? '');

  const selected = events.find(e => e.id === selectedId) ?? null;

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Supervisor Dashboard</h2>

      <div style={styles.cardRow}>
        {events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            isSelected={event.id === selectedId}
            onClick={() => setSelectedId(event.id)}
          />
        ))}
      </div>

      {selected ? (
        <div style={styles.detail}>
          <div style={styles.detailHeader}>
            <div>
              <span style={styles.detailId}>{selected.id}</span>
              <span style={styles.detailAsset}>{selected.asset} · {selected.system}</span>
            </div>
            <span style={styles.detailBy}>Registered by {selected.registeredBy}</span>
          </div>
          <MetricsPanel event={selected} />
          <EventTimeline entries={selected.entries} />
        </div>
      ) : (
        <p style={{ color: '#666', marginTop: 40 }}>Select an event to view details.</p>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { padding: 24, background: '#1e2327', minHeight: '100vh' },
  title: { color: '#fff', fontSize: '1.3rem', fontWeight: 700, marginBottom: 20 },
  cardRow: { display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 16, marginBottom: 24 },
  detail: { background: '#22272c', borderRadius: 12, padding: 24 },
  detailHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  detailId: { color: '#f5a623', fontWeight: 700, fontSize: '1.1rem', marginRight: 12 },
  detailAsset: { color: '#fff', fontSize: '1rem' },
  detailBy: { color: '#888', fontSize: '0.85rem' },
};