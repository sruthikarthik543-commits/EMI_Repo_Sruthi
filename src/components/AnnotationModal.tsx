import { useState } from 'react';
import { useRepairEvents } from '../lib/RepairEventContext';
import type { AnnotationKind } from '../lib/types';

type AnnotationModalProps = {
  kind: AnnotationKind;
  eventId: string;
  currentUser: string;
  onClose: () => void;
};

export function AnnotationModal({ kind, eventId, currentUser, onClose }: AnnotationModalProps) {
  const { addAnnotation } = useRepairEvents();
  const [text, setText] = useState('');

  function handleSave() {
    if (!text.trim()) return;
    addAnnotation(eventId, kind, text.trim(), currentUser);
    onClose();
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>Add {kind}</h3>
        <textarea
          style={styles.textarea}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={`Enter ${kind.toLowerCase()} details...`}
          rows={5}
          autoFocus
        />
        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={styles.saveBtn} onClick={handleSave} disabled={!text.trim()}>Save</button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 100,
  },
  modal: {
    background: '#fff', borderRadius: 12,
    padding: 28, width: 480, maxWidth: '90vw',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  },
  title: { marginBottom: 16, fontSize: '1.1rem', fontWeight: 700 },
  textarea: {
    width: '100%', padding: 12,
    borderRadius: 8, border: '1px solid #ddd',
    fontSize: '0.95rem', resize: 'vertical',
    boxSizing: 'border-box',
  },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16 },
  cancelBtn: { padding: '8px 20px', borderRadius: 8, border: '1px solid #ccc', background: '#fff', cursor: 'pointer' },
  saveBtn: { padding: '8px 20px', borderRadius: 8, border: 'none', background: '#f5a623', color: '#fff', fontWeight: 700, cursor: 'pointer' },
};