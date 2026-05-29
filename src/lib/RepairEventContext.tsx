import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { AnnotationKind, MilestoneKind, RepairEvent } from './types';
import { MILESTONE_SEQUENCE } from './types';
import { loadEvents, saveEvents } from './storage';
import { SEED_EVENTS } from './seed';

type RepairEventContextValue = {
  events: RepairEvent[];
  activeEventId: string | null;
  selectEvent: (id: string) => void;
  stampMilestone: (eventId: string, kind: MilestoneKind, by: string) => void;
  addAnnotation: (eventId: string, kind: AnnotationKind, text: string, by: string) => void;
  startNewRepair: () => void;
};

const RepairEventContext = createContext<RepairEventContextValue | null>(null);

export function RepairEventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<RepairEvent[]>(() => loadEvents(SEED_EVENTS));
  const [activeEventId, setActiveEventId] = useState<string | null>(null);

  useEffect(() => { saveEvents(events); }, [events]);

  function stampMilestone(eventId: string, kind: MilestoneKind, by: string) {
    setEvents(prev => prev.map(event => {
      if (event.id !== eventId) return event;
      const isLast = kind === MILESTONE_SEQUENCE[MILESTONE_SEQUENCE.length - 1];
      return {
        ...event,
        status: isLast ? 'Completed' : 'Active',
        entries: [...event.entries, { type: 'milestone', kind, at: new Date().toISOString(), by }],
      };
    }));
  }

  function addAnnotation(eventId: string, kind: AnnotationKind, text: string, by: string) {
    setEvents(prev => prev.map(event => {
      if (event.id !== eventId) return event;
      return {
        ...event,
        entries: [...event.entries, { type: 'annotation', kind, at: new Date().toISOString(), by, text }],
      };
    }));
  }

  function startNewRepair() {
    const id = `RE-${Date.now()}`;
    const newEvent: RepairEvent = {
      id,
      asset: 'New Asset',
      system: 'Unknown',
      registeredBy: 'Technician',
      registeredAt: new Date().toISOString(),
      status: 'Active',
      entries: [],
    };
    setEvents(prev => [newEvent, ...prev]);
    setActiveEventId(id);
  }

  function selectEvent(id: string) {
    setActiveEventId(id);
  }

  return (
    <RepairEventContext.Provider value={{ events, activeEventId, selectEvent, stampMilestone, addAnnotation, startNewRepair }}>
      {children}
    </RepairEventContext.Provider>
  );
}

export function useRepairEvents(): RepairEventContextValue {
  const ctx = useContext(RepairEventContext);
  if (!ctx) throw new Error('useRepairEvents must be used inside RepairEventProvider');
  return ctx;
}