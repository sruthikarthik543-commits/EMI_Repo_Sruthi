import type { ViewMode } from '../App';

type HeaderProps = {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
};

export function Header({ activeView, onViewChange }: HeaderProps) {
  return (
    <header style={styles.header}>
      <span style={styles.logo}>EMI3</span>
      <div style={styles.toggle}>
        <button
          style={{ ...styles.pill, ...(activeView === 'tablet' ? styles.pillActive : {}) }}
          onClick={() => onViewChange('tablet')}
        >
          Technician
        </button>
        <button
          style={{ ...styles.pill, ...(activeView === 'admin' ? styles.pillActive : {}) }}
          onClick={() => onViewChange('admin')}
        >
          Supervisor
        </button>
      </div>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    background: '#1e2327',
    color: '#fff',
  },
  logo: {
    fontWeight: 700,
    fontSize: '1.2rem',
    letterSpacing: 1,
  },
  toggle: {
    display: 'flex',
    gap: 8,
  },
  pill: {
    padding: '6px 18px',
    borderRadius: 999,
    border: '1px solid #555',
    background: 'transparent',
    color: '#ccc',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  pillActive: {
    background: '#f5a623',
    color: '#1e2327',
    border: '1px solid #f5a623',
    fontWeight: 700,
  },
};