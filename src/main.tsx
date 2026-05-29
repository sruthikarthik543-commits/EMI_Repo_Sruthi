import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RepairEventProvider } from './lib/RepairEventContext';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RepairEventProvider>
      <App />
    </RepairEventProvider>
  </StrictMode>
);