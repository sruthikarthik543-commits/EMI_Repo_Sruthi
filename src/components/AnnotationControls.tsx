import type { AnnotationKind } from '../lib/types';

type AnnotationControlsProps = {
  isStarted: boolean;
  isCompleted: boolean;
  onAdd: (kind: AnnotationKind) => void;
};

const ACTIVE_KINDS: AnnotationKind[] = ['Finding', 'Action', 'Part', 'Note'];

export function AnnotationControls({ isStarted, isCompleted, onAdd }: AnnotationControlsProps) {
  const isDisabled = !isStarted || isCompleted;

  return (
    <div style={styles.row}>
      {ACTIVE_KINDS.map(kind => (
        <button
          key={kind}
          disabled={isDisabled}
          onClick={() => onAdd(kind)}
          style={{ ...styles.btn, opacity: isDisabled ? 0.4 : 1 }}
        >
          + Add {kind}
        </button>
      ))}

      <div title="Not in v1" style={{ display: 'inline-block' }}>
        <button disabled style={{ ...styles.btn, opacity: 0.3, cursor: 'not-allowed' }}>
          + Add Photo
        </button>
      </div>
      <div title="Not in v1" style={{ display: 'inline-block' }}>
        <button disabled style={{ ...styles.btn, opacity: 0.3, cursor: 'not-allowed' }}>
          + Record Audio
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  row: { display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 },
  btn: {
    padding: '8px 16px',
    borderRadius: 8,
    border: '1px solid #ccc',
    background: '#f9f9f9',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 500,
  },
};