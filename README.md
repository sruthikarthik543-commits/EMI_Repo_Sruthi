# EMI3 Repair Event Tracker

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5174 in your browser.

## What I built
- Technician View with 6 sequential milestone buttons (colour-coded per phase)
- Annotation modals for Finding, Action, Part, and Note
- Supervisor dashboard with event cards, metrics panel, and full timeline
- Shared state via React Context with localStorage persistence
- Header toggle to switch between Technician and Supervisor views

## Screenshots

### Technician View — Empty State
![Technician Empty](screenshots/technician-empty.png)

### Technician View — Active Repair
![Technician Active](screenshots/technician-active.png)

### Supervisor Dashboard
![Supervisor View](screenshots/supervisor.png)

## Tech Stack
- React 19, TypeScript, Vite
- No external UI libraries

## Metric thresholds
- Response time: green <15 min, amber <30 min, red >30 min
- Diagnosis time: green <20 min, amber <45 min, red >45 min
- Repair time: green <60 min, amber <120 min, red >120 min
- Total downtime: green <90 min, amber <180 min, red >180 min

## Trade-offs & decisions
- State is in-memory with localStorage persistence
- No authentication — single hardcoded user "Technician"
- Named exports used throughout, no default exports
- See NEXT_STEPS.md for what I would build next