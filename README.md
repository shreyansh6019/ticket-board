# React(TypeScript): Customer Support Ticketing Portal

Complete the Ticket Board functionality in the given React application. Use the provided ticket data and project structure to implement the missing functionality, ensuring that tickets display correctly, support filtering, and allow for status updates.

Your users should be able to:
- See all tickets on the home page, sorted by due date.
- For each ticket, view its title, assigned agent, due date, and current status.
- Filter tickets by status (All, Open, In Progress, Resolved) or by agent.
- If no tickets match the selected filters, see a message saying "No tickets found."
- Click  “View Details” on a ticket to open its detail page.
- On the detail page, see the ticket description, change the status using a dropdown, and click “Save Changes” to update it.
- After saving, see an alert that says “Ticket status has been updated successfully!”
- Return to the home page by clicking the “Back to Board” button.
- The Ticket Board should reflect the updated status.

## Implementation Details

- Use ticket data from src/tickets.ts.
- Home page (/) shows all tickets sorted by due date (ascending).
- The ticket detail page (/ticket/:id) shows the ticket description, status dropdown, and save/back actions.
- Status updates must reflect on the Ticket Board only after saving.

## Required Data Test IDs
The following data-testid attributes are required in the components for the test cases to pass; do not change/delete them: 

| **data-testid**      | **Description**                                             |
|----------------------|-------------------------------------------------------------|
| ticket-board         | Component displaying the Ticket Board.                     |
| filter-status        | Dropdown for filtering tickets by status.                  |
| filter-agent         | Dropdown for filtering tickets by agent.                   |
| tickets              | Container for the list of filtered tickets.                |
| no-tickets-found     | Message displayed when no tickets are found on changing the filters. |
| ticket-card          | Individual ticket card displaying ticket details.          |
| ticket-details       | Component displaying details of a selected ticket.         |
| change-status        | Dropdown to change the status of a ticket.                 |
| save-changes-btn     | Button to save changes to the ticket's status.             |
| back-to-board-btn    | Button to navigate back to the Ticket Board.               |

## Commands

- Run:

```bash
npm start
```

- Install:

```bash
npm install
```

- Test:

```bash
npm test
```

## Read-Only Files

- `src/App.tsx`
- `src/App.css`
- `src/App.test.tsx`
- `src/tickets.ts`
- `src/components/Header.tsx`
- `src/index.css`
- `src/index.ts`
- `src/registerServiceWorker.ts`

## Environment

- React Version: 18.2.0
- Node Version: 18(LTS)
- Default Port: 8000
