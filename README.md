# BengkelMate

## 1. Description of Key Features (MVP)
1.  **Tool Inventory Management**: A digital catalog of all tools with photos, brands, categories, and real-time status (Available, Loaned, Broken).
2.  **Mechanic Loan System**: A streamlined check-in/check-out system allowing mechanics to borrow tools by clicking a button, automatically tracking who has what.
3.  **AI Condition Scanner**: Uses Gemini Vision AI to analyze photos of tools, automatically detecting rust, wear, or damage and suggesting maintenance.
4.  **Maintenance Scheduler**: Tracks the 'Last Maintenance Date' and flags tools that need servicing based on time or AI scan results.
5.  **Role-Based Access**: Distinct views for 'Owners' (full admin) and 'Mechanics' (borrow only).

## 2. Database Structure (Firestore)
Implemented in `types.ts`.
*   **Collection `users`**: Stores user profiles and roles.
*   **Collection `tools`**: Stores tool details, image URLs, and current status.
*   **Collection `loans`**: Links `users` and `tools` with timestamps to track active borrowing sessions.

## 3. User Flow: Mechanic Borrowing a Tool
1.  **Login**: Mechanic logs into the app.
2.  **Search**: Views the "Inventory" tab and searches for a specific tool (e.g., "Impact Wrench").
3.  **Select**: Taps on the tool card to view details.
4.  **Action**: Taps the "Borrow" button (only enabled if Status is 'Available').
5.  **Confirm**: Confirms the loan action.
6.  **System Update**: App updates Firestore: sets Tool Status to 'LOANED' and creates a new document in `loans` collection.
7.  **Visual Feedback**: The tool card turns blue (Loaned status) and moves to the "Active Loans" tab.

## 4. Tech Stack Note
This project is implemented as a **React Web Application** using **Tailwind CSS** and **TypeScript**. It serves as a Progressive Web App (PWA) alternative to the requested Flutter app, offering similar mobile capability with broader accessibility.