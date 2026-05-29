import { useState } from 'react';
import { useRepairEvents } from '../lib/RepairEventContext';
import { MILESTONE_SEQUENCE } from '../lib/types';
import type { AnnotationKind, MilestoneKind } from '../lib/types';
import { MilestoneButton } from './MilestoneButton';
import { AnnotationControls } from './AnnotationControls';
import { RecentEntries } from './RecentEntries';
import { AnnotationModal } from './AnnotationModal';

const CURRENT_USER = 'Technician';

export function TabletView() {
  const { events, activeEventId, startNewRepair } = useRepairEvents();
  const [modalKind, setModalKind] = useState<AnnotationKind | null>(null);

  const event = events.find(e => e.id === activeEventId) ?? null;

  if (!event) {
    return (
      <div style={styles.empty}>
        <p>No active repair.</p>
        <button style={styles.newBtn} onClick={startNewRepair}>Start a new repair</button>
      </div>
    );
  }

  const stampedKinds = event.entries
    .filter(e => e.type === 'milestone')
    .map(e => e.kind as MilestoneKind);

  const nextMilestone = MILESTONE_SEQUENCE.find(k => !stampedKinds.includes(k)) ?? null;
  const isCompleted = event.status === 'Completed';
  const isStarted = stampedKinds.length > 0;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Repair Event — {event.id}</h2>
      <p style={styles.sub}>{event.asset} · {event.system}</p>

      <div style={styles.milestoneRow}>
        {MILESTONE_SEQUENCE.map((kind, index) => (
          <MilestoneButton
            key={kind}
            kind={kind}
            index={index}
            isStamped={stampedKinds.includes(kind)}
            isNext={kind === nextMilestone}
            entry={event.entries.find(e => e.type === 'milestone' && e.kind === kind) ?? null}
            eventId={event.id}
            currentUser={CURRENT_USER}
          />
        ))}
      </div>

      <AnnotationControls
        isStarted={isStarted}
        isCompleted={isCompleted}
        onAdd={setModalKind}
      />

      <RecentEntries entries={event.entries} />

      {isCompleted && (
        <button style={styles.newBtn} onClick={startNewRepair}>Start a new repair</button>
      )}

      {modalKind && (
        <AnnotationModal
          kind={modalKind}
          eventId={event.id}
          currentUser={CURRENT_USER}
          onClose={() => setModalKind(null)}
        />
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { padding: 24, maxWidth: 900, margin: '0 auto' },
  title: { fontSize: '1.4rem', fontWeight: 700, marginBottom: 4 },
  sub: { color: '#666', marginBottom: 24 },
  milestoneRow: { display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 },
  empty: { padding: 48, textAlign: 'center' },
  newBtn: {
    marginTop: 24,
    padding: '10px 24px',
    background: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: '1rem',
    cursor: 'pointer',
  },
};