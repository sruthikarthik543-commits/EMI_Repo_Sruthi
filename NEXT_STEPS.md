# Next Steps

## What I would build next if this were a real product

### 1. Backend & Persistence
- Replace in-memory/localStorage state with a real backend API (Node.js + PostgreSQL)
- Repair events currently reset if the browser is cleared — a database would fix this
- Each technician's actions would be saved permanently

### 2. User Authentication
- Technicians and supervisors should log in with their own accounts
- Role-based access: only supervisors see the Admin View
- Audit trail: every milestone and annotation is tied to a verified user

### 3. Real-time Sync
- Supervisor dashboard should update live as a technician taps milestones
- Use WebSockets so the admin view reflects changes instantly without refresh

### 4. Photo & Audio Annotations
- The "Add Photo" and "Add Audio" buttons are currently disabled
- Would add file upload support so technicians can attach evidence to repairs

### 5. Offline Support
- Mine sites often have poor connectivity
- Would use a Service Worker to cache the app and queue actions offline
- Sync to the server automatically when connection is restored

### 6. Admin Filtering & Sorting
- The supervisor event list currently shows all events in creation order
- Would add filter by status (Active/Stopped/Completed), date range, and asset
- Sort by downtime or response time to prioritise critical repairs

### 7. Notifications & Alerts
- Alert supervisors when a repair exceeds downtime thresholds
- Push notifications to technicians when they are assigned a repair

## Trade-offs made in this version
- State is in-memory with optional localStorage — intentional given scope
- No authentication — single hardcoded user "Technician"
- Metric thresholds chosen as: response <15min=green, <30=amber, >30=red
- No filter/sort in admin view — deferred per brief