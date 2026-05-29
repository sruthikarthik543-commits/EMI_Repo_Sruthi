import { useRepairEvents } from '../lib/RepairEventContext';
import type { Entry, MilestoneKind } from '../lib/types';

const MILESTONE_LABELS: Record<MilestoneKind, string> = {
  StartBreakdown: 'Start Breakdown',
  ArrivedAtMachine: 'Arrived at Machine',
  ProblemIdentified: 'Problem Identified',
  StartRepair: 'Start Repair',
  RepairComplete: 'Repair Complete',
  ReturnToService: 'Return to Service',
};

const MILESTONE_COLOURS: Record<MilestoneKind, string> = {
  StartBreakdown: '#e74c3c',
  ArrivedAtMachine: '#e67e22',
  ProblemIdentified: '#f5a623',
  StartRepair: '#e67e22',
  RepairComplete: '#2ecc71',
  ReturnToService: '#27ae60',
};

type MilestoneButtonProps = {
  kind: MilestoneKind;
  index: number;
  isStamped: boolean;
  isNext: boolean;
  entry: Entry | null;
  eventId: string;
  currentUser: string;
};

export function MilestoneButton({ kind, index, isStamped, isNext, entry, eventId, currentUser }: MilestoneButtonProps) {
  const { stampMilestone } = useRepairEvents();
  const colour = MILESTONE_COLOURS[kind];
  const isDisabled = !isNext;

  function handleClick() {
    if (!isNext) return;
    stampMilestone(eventId, kind, currentUser);
  }

  return (
    <div style={styles.wrapper}>
      <button
        onClick={handleClick}
        disabled={isDisabled}
        style={{
          ...styles.button,
          borderColor: colour,
          background: isStamped ? colour : 'transparent',
          color: isStamped ? '#fff' : colour,
          opacity: isDisabled && !isStamped ? 0.4 : 1,
          cursor: isNext ? 'pointer' : 'default',
        }}
      >
        <span style={styles.number}>{index + 1}</span>
        <span style={styles.label}>{MILESTONE_LABELS[kind]}</span>
      </button>
      {isStamped && entry && entry.type === 'milestone' && (
        <div style={styles.stamp}>
          <span>{new Date(entry.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span>{entry.by}</span>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px 16px',
    border: '2px solid',
    borderRadius: 10,
    minWidth: 120,
    fontWeight: 600,
    transition: 'all 0.2s',
  },
  number: { fontSize: '1.4rem', fontWeight: 700 },
  label: { fontSize: '0.75rem', textAlign: 'center', marginTop: 4 },
  stamp: { display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.72rem', color: '#555' },
};