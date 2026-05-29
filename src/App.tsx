import { useState } from 'react';
import { Header } from './components/Header';
import { TabletView } from './components/TabletView';
import { AdminView } from './components/AdminView';

export type ViewMode = 'tablet' | 'admin';

export function App() {
  const [view, setView] = useState<ViewMode>('tablet');

  return (
    <div>
      <Header activeView={view} onViewChange={setView} />
      {view === 'tablet' ? <TabletView /> : <AdminView />}
    </div>
  );
}