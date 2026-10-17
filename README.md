# Tryora

Tryora is a fictional learning simulator built around **Practice → Perturb → Prove**. It helps first-time digital-service users practise a simulated payment task, try a related task in a changed interface, and review a Skill Passport based on interactions saved in their browser.

**Every screen uses fictional data. No real money moves, and Tryora does not connect to banks, UPI, payment providers, or real credentials.**

## Features

- Dashboard with a data-backed view of guided-practice and successful-challenge completion.
- Guided Practice for selecting Asha Sharma, entering ₹250, reviewing details, and completing a simulated task.
- Contextual hints, deterministic validation, and session-event counts.
- An independent challenge in a different fictional request-board interface, with review, verification, answer feedback, and repeatable attempts.
- Skill Passport derived from the saved practice and challenge records, including an actionable recommendation.
- Responsive layout and client-side navigation.

## Local setup

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To produce a release build:

```bash
npm run build
npm run preview
```

## Architecture

- `src/main.jsx` mounts the React application.
- `src/App.jsx` contains the screen components, deterministic reducers, local session schemas, and the Passport derivation.
- `src/styles.css` contains shared visual tokens, screen styles, and responsive breakpoints.
- `PRACTICE_STORAGE_KEY` (`tryora.guided-practice.v1`) stores the guided session and its events.
- `CHALLENGE_STORAGE_KEY` (`tryora.surprise-challenge.v1`) stores independent challenge attempts and their events.
- The Passport reads and validates both records; it does not send data to a service.

## Demo flow

1. Start at the Dashboard and select **Start Safe Practice**.
2. In Guided Practice, try a wrong contact or amount if demonstrating validation, request a hint, then complete the task with Asha Sharma and ₹250. Review details before confirming.
3. Open **Surprise Challenge**. Read the fictional request, select a guest and amount in the different request-board UI, inspect the check slip, verify it, then submit.
4. Open **Skill Passport** to review the saved interaction counts, challenge outcome, comparison, and recommendation.
5. Use **Practise Again** to start a fresh guided session, or **Reset My Demo Data** to clear Tryora browser data.

## Limitations

- All data and deterministic task rules are fictional; this is not a payment product.
- Session data is local to the current browser and device. There is no backend, account, sync, analytics service, or external AI/API integration.
- Guided Practice stores the current session rather than a history of all guided sessions.
- Challenge attempts and event counts are persisted locally; no overall score, learning-gain estimate, timed evaluation, certified skill, or real-world ability claim is produced.
- The Skill Passport reports observed interactions in this demo only. It does not infer intelligence or general skill.
