import React, { useEffect, useReducer, useState } from 'react';

const pages = [
  { id: 'home', label: 'Overview', number: '01' },
  { id: 'practice', label: 'Guided practice', number: '02' },
  { id: 'challenge', label: 'Surprise challenge', number: '03' },
  { id: 'passport', label: 'Skill passport', number: '04' },
];

function AppLayout({ page, navigate, children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); navigate('home'); }}>
          <span className="brand-mark" aria-hidden="true">t</span>
          <span>tryora<span className="brand-period">.</span></span>
        </a>
        <div className="nav-caption">YOUR LEARNING SPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          {pages.map((item) => (
            <button
              className={`nav-link ${page === item.id ? 'active' : ''}`}
              key={item.id}
              onClick={() => navigate(item.id)}
              aria-current={page === item.id ? 'page' : undefined}
            >
              <span className="nav-number">{item.number}</span>
              <span>{item.label}</span>
              {page === item.id && <span className="nav-indicator" aria-hidden="true" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-note">
          <span className="note-icon" aria-hidden="true">i</span>
          <p>A safe space to learn by doing. Every screen here is a simulation.</p>
        </div>
        <div className="sidebar-footer">
          <span className="avatar">T</span>
          <span><strong>Practice mode</strong><small>No account needed</small></span>
          <span className="online-dot" aria-label="Ready" />
        </div>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <div className="mobile-brand"><span className="brand-mark" aria-hidden="true">t</span> tryora<span className="brand-period">.</span></div>
          <div className="topbar-note"><span className="status-dot" /> FICTIONAL DATA · NO REAL MONEY</div>
          <button className="topbar-help" onClick={() => navigate('home')} aria-label="Return to overview">Safe learning space <span aria-hidden="true">↗</span></button>
        </header>
        {children}
      </main>
    </div>
  );
}

function PageHeading({ eyebrow, title, description, children }) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {children}
    </div>
  );
}

function StageMark({ number, active = false, complete = false }) {
  return <span className={`stage-mark ${active ? 'is-active' : ''} ${complete ? 'is-complete' : ''}`}>{complete ? '✓' : number}</span>;
}

function ProgressSteps({ current = 0, completedStages = [] }) {
  const stages = ['Guided practice', 'Surprise challenge', 'Skill passport'];
  return (
    <div className="progress-steps" aria-label="Learning journey">
      {stages.map((stage, index) => {
        const complete = completedStages.includes(index + 1);
        return (
          <div className="progress-step" key={stage}>
            <StageMark number={`0${index + 1}`} active={current === index + 1 && !complete} complete={complete} />
            <span className={current === index + 1 && !complete ? 'current-label' : ''}>{stage}</span>
            {index < stages.length - 1 && <span className={`step-connector ${complete ? 'is-complete' : ''}`} />}
          </div>
        );
      })}
    </div>
  );
}

function readStoredCompletion(key) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || 'null');
    return value;
  } catch {
    return null;
  }
}

function Dashboard({ navigate }) {
  const practiceSession = readStoredCompletion(PRACTICE_STORAGE_KEY);
  const challengeStore = readStoredCompletion(CHALLENGE_STORAGE_KEY);
  const practiceComplete = isPracticeSession(practiceSession) && practiceSession.completed === true;
  const challengeComplete = validChallengeStore(challengeStore)
    && challengeStore.attempts?.some((attempt) => attempt.status === 'submitted');
  const completedStages = [
    ...(practiceComplete ? [1] : []),
    ...(challengeComplete ? [2] : []),
  ];
  const journeyStatus = challengeComplete ? 'Challenge complete' : practiceComplete ? 'Practice complete' : 'Not started';
  return (
    <div className="page dashboard-page">
      <div className="hero-panel">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> A MORE HUMAN WAY TO LEARN</div>
          <h1>Confidence comes from doing, <span>not just watching.</span></h1>
          <p>Practise safely. Handle the unexpected. Prove what you know.</p>
          <button className="button button-primary button-large" onClick={() => navigate('practice')}>
            Start Safe Practice <span className="button-arrow" aria-hidden="true">↗</span>
          </button>
          <div className="fictional-caption"><span className="tiny-shield" aria-hidden="true">✓</span> A fictional experience. No real money or accounts.</div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
          <div className="art-card art-card-back"><span className="art-mini-dot" /><span>ONE SMALL STEP</span><strong>Learn by doing</strong></div>
          <div className="art-card art-card-front">
            <div className="art-card-top"><span className="art-icon">↗</span><span>TRYORA PRACTICE</span></div>
            <div className="art-card-title">A little more<br />sure of yourself.</div>
            <div className="art-card-bottom"><span>YOUR PACE, YOUR SPACE</span><span className="art-progress"><i /></span></div>
          </div>
          <span className="art-spark spark-one">✳</span><span className="art-spark spark-two">✦</span>
        </div>
      </div>

      <section className="journey-section">
        <div className="section-heading">
          <div><div className="eyebrow">THE TRYORA LOOP</div><h2>Learn it in three steps</h2></div>
          <span className="section-aside">A little practice goes a long way.</span>
        </div>
        <div className="journey-grid">
          {[
            { number: '01', title: 'Guided practice', description: 'Try a familiar task with a friendly guide by your side.', tone: 'lavender', mark: '↗' },
            { number: '02', title: 'Surprise challenge', description: 'Meet the same idea in a new place, without hints.', tone: 'blue', mark: '⌁' },
            { number: '03', title: 'Skill passport', description: 'See what’s measured now—and what’s still to come.', tone: 'peach', mark: '◷' },
          ].map((step) => (
            <article className="journey-card" key={step.number}>
              <div className="journey-card-top"><span className="journey-number">{step.number} / 03</span><span className={`journey-icon ${step.tone}`} aria-hidden="true">{step.mark}</span></div>
              <h3>{step.title}</h3><p>{step.description}</p>
              <button className="text-link" onClick={(event) => { event.stopPropagation(); navigate(step.number === '01' ? 'practice' : step.number === '02' ? 'challenge' : 'passport'); }}>
                Explore step <span aria-hidden="true">→</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-bottom">
        <div className="progress-card">
          <div className="card-heading"><div><div className="eyebrow">YOUR JOURNEY</div><h2>Every step starts somewhere.</h2></div><span className={`not-started-pill ${completedStages.length ? 'journey-complete' : ''}`}><i /> {journeyStatus}</span></div>
          <ProgressSteps completedStages={completedStages} />
          <div className="progress-card-footer"><span>{completedStages.length ? `${completedStages.length} of 3 stages completed.` : 'All three steps are ready when you are.'}</span><button className="text-link" onClick={() => navigate('passport')}>View Skill Passport <span aria-hidden="true">→</span></button></div>
        </div>
        <div className="example-card">
          <div className="example-label"><span className="example-spark">✳</span> A TINY EXAMPLE</div>
          <p>“I can send a practice payment—and check the details before I confirm.”</p>
          <span className="example-caption">That’s confidence, one safe step at a time.</span>
        </div>
      </section>
      <footer className="page-footer"><span>Tryora is a fictional learning experience.</span><span>Designed for practice, never for real payments.</span></footer>
    </div>
  );
}

const contacts = [
  { name: 'Asha Sharma', initials: 'AS', color: 'coral' },
  { name: 'Rahul Verma', initials: 'RV', color: 'blue' },
  { name: 'Neha Patel', initials: 'NP', color: 'lilac' },
];

export const PRACTICE_STORAGE_KEY = 'tryora.guided-practice.v1';
const REQUIRED_RECIPIENT = 'Asha Sharma';
const REQUIRED_AMOUNT = 250;
const PRACTICE_STEPS = ['recipient', 'amount', 'review', 'complete'];

export function createInitialPracticeSession() {
  const now = new Date().toISOString();
  return {
    schemaVersion: 1,
    id: `practice-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    startedAt: now,
    updatedAt: now,
    currentStep: 'recipient',
    selectedRecipient: '',
    amount: '250',
    hintVisible: false,
    verificationViewed: false,
    completed: false,
    completedAt: null,
    events: [],
  };
}

export function getPracticeEventCounts(session) {
  return session.events.reduce((counts, item) => {
    if (item.type === 'wrong_recipient_selection') counts.wrongRecipientSelections += 1;
    if (item.type === 'incorrect_amount_attempt') counts.incorrectAmountAttempts += 1;
    if (item.type === 'hint_requested') counts.hintRequests += 1;
    if (item.type === 'backtracking') counts.backtracks += 1;
    if (item.type === 'verification_viewed') counts.verificationViews += 1;
    if (item.type === 'task_completed') counts.completions += 1;
    return counts;
  }, {
    wrongRecipientSelections: 0,
    incorrectAmountAttempts: 0,
    hintRequests: 0,
    backtracks: 0,
    verificationViews: 0,
    completions: 0,
  });
}

function isPracticeSession(value) {
  return value?.schemaVersion === 1
    && typeof value.id === 'string'
    && typeof value.startedAt === 'string'
    && typeof value.updatedAt === 'string'
    && PRACTICE_STEPS.includes(value.currentStep)
    && typeof value.selectedRecipient === 'string'
    && typeof value.amount === 'string'
    && typeof value.hintVisible === 'boolean'
    && typeof value.verificationViewed === 'boolean'
    && typeof value.completed === 'boolean'
    && (value.completed
      ? value.currentStep === 'complete'
        && value.verificationViewed
        && value.selectedRecipient === REQUIRED_RECIPIENT
        && Number(value.amount) === REQUIRED_AMOUNT
        && typeof value.completedAt === 'string'
      : value.currentStep !== 'complete' && value.completedAt === null)
    && (value.currentStep !== 'review' || (
      value.verificationViewed
      && value.selectedRecipient === REQUIRED_RECIPIENT
      && Number(value.amount) === REQUIRED_AMOUNT
    ))
    && (value.currentStep !== 'amount' && value.currentStep !== 'review'
      || value.selectedRecipient === REQUIRED_RECIPIENT)
    && Array.isArray(value.events)
    && value.events.every((item) => typeof item?.id === 'string'
      && typeof item.type === 'string'
      && typeof item.timestamp === 'string'
      && item.details !== null
      && typeof item.details === 'object');
}

function initializePracticeState() {
  const initialSession = createInitialPracticeSession();
  try {
    const stored = window.localStorage.getItem(PRACTICE_STORAGE_KEY);
    if (!stored) return { session: initialSession, storageError: '' };
    const parsed = JSON.parse(stored);
    if (!isPracticeSession(parsed)) {
      return { session: initialSession, storageError: 'Saved practice data was invalid. A fresh practice session has started.' };
    }
    return { session: parsed, storageError: '' };
  } catch {
    return { session: initialSession, storageError: 'Saved practice data could not be read. Progress may not persist on this device.' };
  }
}

function practiceEvent(type, details = {}) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    timestamp: new Date().toISOString(),
    details,
  };
}

function appendPracticeEvent(session, event, changes = {}) {
  return {
    ...session,
    ...changes,
    updatedAt: event.timestamp,
    events: [...session.events, event],
  };
}

function practiceReducer(state, action) {
  const { session } = state;
  if (action.type === 'STORAGE_STATUS') {
    return state.storageError === action.message ? state : { ...state, storageError: action.message };
  }
  if (action.type === 'RESET') {
    return { ...state, session: createInitialPracticeSession(), error: '' };
  }
  if (session.completed && action.type !== 'HIDE_HINT') return state;

  switch (action.type) {
    case 'SELECT_RECIPIENT': {
      const wrong = action.name !== REQUIRED_RECIPIENT;
      const nextSession = wrong
        ? appendPracticeEvent(session, action.event, { selectedRecipient: action.name })
        : { ...session, selectedRecipient: action.name, updatedAt: new Date().toISOString() };
      return {
        ...state,
        session: nextSession,
        error: wrong ? `${action.name} is selected. The task asks for ${REQUIRED_RECIPIENT}.` : '',
      };
    }
    case 'SET_AMOUNT':
      return { ...state, session: { ...session, amount: action.amount, updatedAt: new Date().toISOString() }, error: '' };
    case 'CONTINUE_TO_AMOUNT':
      if (!session.selectedRecipient) return { ...state, error: 'Choose a practice contact before continuing.' };
      if (session.selectedRecipient !== REQUIRED_RECIPIENT) {
        return { ...state, error: `Check the task: choose ${REQUIRED_RECIPIENT} to continue.` };
      }
      return { ...state, session: { ...session, currentStep: 'amount', updatedAt: new Date().toISOString() }, error: '' };
    case 'REVIEW_AMOUNT':
      if (session.selectedRecipient !== REQUIRED_RECIPIENT) {
        return { ...state, error: `Check the task: choose ${REQUIRED_RECIPIENT} before reviewing.` };
      }
      if (!Number.isFinite(Number(session.amount)) || Number(session.amount) !== REQUIRED_AMOUNT) {
        return {
          ...state,
          session: appendPracticeEvent(session, action.invalidAmountEvent),
          error: 'That amount does not match the practice task. Enter ₹250, then try again.',
        };
      }
      return {
        ...state,
        session: appendPracticeEvent(session, action.event, {
          currentStep: 'review',
          verificationViewed: true,
        }),
        error: '',
      };
    case 'BACK':
      if (session.currentStep !== 'amount' && session.currentStep !== 'review') return state;
      return {
        ...state,
        session: appendPracticeEvent(session, action.event, {
          currentStep: session.currentStep === 'review' ? 'amount' : 'recipient',
          verificationViewed: false,
          hintVisible: false,
        }),
        error: '',
      };
    case 'REQUEST_HINT':
      return {
        ...state,
        session: appendPracticeEvent(session, action.event, { hintVisible: true }),
        error: '',
      };
    case 'HIDE_HINT':
      return { ...state, session: { ...session, hintVisible: false } };
    case 'CONFIRM': {
      if (session.currentStep !== 'review' || !session.verificationViewed) {
        return { ...state, error: 'Review the recipient and amount before confirming.' };
      }
      if (session.selectedRecipient !== REQUIRED_RECIPIENT) {
        return { ...state, error: `The recipient must be ${REQUIRED_RECIPIENT}. Go back and check the task.` };
      }
      if (!Number.isFinite(Number(session.amount)) || Number(session.amount) !== REQUIRED_AMOUNT) {
        return {
          ...state,
          session: appendPracticeEvent(session, action.invalidAmountEvent),
          error: 'The amount must be ₹250. Go back and correct it before confirming.',
        };
      }
      return {
        ...state,
        session: appendPracticeEvent(session, action.event, {
          currentStep: 'complete',
          completed: true,
          completedAt: action.event.timestamp,
          hintVisible: false,
        }),
        error: '',
      };
    }
    default:
      return state;
  }
}

function usePracticeSession() {
  const [state, dispatch] = useReducer(practiceReducer, undefined, initializePracticeState);
  useEffect(() => {
    try {
      window.localStorage.setItem(PRACTICE_STORAGE_KEY, JSON.stringify(state.session));
      if (state.storageError) dispatch({ type: 'STORAGE_STATUS', message: '' });
    } catch {
      dispatch({
        type: 'STORAGE_STATUS',
        message: 'Progress could not be saved on this device. Keep this tab open to avoid losing your session.',
      });
    }
  }, [state.session]);
  return [state, dispatch];
}

function SimulatedPhone({ session, screen, error, dispatch }) {
  const { selectedRecipient: recipient, amount } = session;
  const selected = contacts.find((person) => person.name === recipient);
  const setRecipient = (name) => dispatch({
    type: 'SELECT_RECIPIENT',
    name,
    event: practiceEvent('wrong_recipient_selection', { selectedRecipient: name, expectedRecipient: REQUIRED_RECIPIENT }),
  });
  const setAmount = (value) => dispatch({ type: 'SET_AMOUNT', amount: value });
  return (
    <div className="phone-wrap">
      <div className="phone">
        <div className="phone-notch" />
        <div className="phone-status"><span>9:41</span><span aria-hidden="true">● ▮ ▰</span></div>
        <div className="phone-screen">
          <div className="phone-appbar"><span className="phone-app-logo">t</span><span>tryora pay</span><span className="phone-menu" aria-hidden="true">···</span></div>
          <div className="simulation-strip"><span className="simulation-dot" /> SIMULATION — NO REAL MONEY</div>
          {screen === 'recipient' && (
            <>
              <div className="phone-balance"><span>YOUR PRACTICE BALANCE</span><strong>₹2,450<span>.00</span></strong><small>Fictional funds for this demo</small></div>
              <div className="phone-section-title">Send to someone</div>
              <p className="phone-subtitle">Choose a practice contact</p>
              <div className="contact-list">
                {contacts.map((person) => (
                  <button className={`contact-row ${recipient === person.name ? 'selected' : ''}`} key={person.name} onClick={() => setRecipient(person.name)} aria-pressed={recipient === person.name}>
                    <span className={`contact-avatar ${person.color}`}>{person.initials}</span><span className="contact-name">{person.name}<small>Tryora practice contact</small></span><span className="radio-indicator" />
                  </button>
                ))}
              </div>
              <div className="phone-task"><span className="task-mark">✳</span><p><strong>Your practice task</strong><br />Practise sending ₹250 to Asha Sharma.</p></div>
              <button className="button phone-primary" onClick={() => dispatch({ type: 'CONTINUE_TO_AMOUNT' })}>Continue <span aria-hidden="true">→</span></button>
            </>
          )}
          {screen === 'amount' && (
            <>
              <button className="phone-back" onClick={() => dispatch({ type: 'BACK', event: practiceEvent('backtracking', { from: 'amount', to: 'recipient' }) })}>← <span>Back</span></button>
              <div className="phone-step-label">STEP 2 OF 3</div>
              <h2 className="phone-title">How much would<br />you like to send?</h2>
              <div className="amount-to"><span className={`contact-avatar ${selected?.color || 'coral'}`}>{selected?.initials || 'AS'}</span><span>Sending to<strong>{recipient || 'Asha Sharma'}</strong></span></div>
              <label className="amount-label" htmlFor="practice-amount">AMOUNT</label>
              <div className="amount-entry"><span>₹</span><input id="practice-amount" type="number" min="1" value={amount} onChange={(event) => setAmount(event.target.value)} aria-label="Practice amount in rupees" /><span>.00</span></div>
              <p className="amount-note">This is a fictional amount for practice only.</p>
              <div className="phone-task amount-task"><span className="task-mark">✳</span><p>Hint: the task card asked for <strong>₹250</strong>.</p></div>
              <button className="button phone-primary" onClick={() => dispatch({
                type: 'REVIEW_AMOUNT',
                event: practiceEvent('verification_viewed', { recipient, amount }),
                invalidAmountEvent: practiceEvent('incorrect_amount_attempt', { amount, stage: 'review' }),
              })}>Review details <span aria-hidden="true">→</span></button>
            </>
          )}
          {screen === 'review' && (
            <>
              <button className="phone-back" onClick={() => dispatch({ type: 'BACK', event: practiceEvent('backtracking', { from: 'review', to: 'amount' }) })}>← <span>Back</span></button>
              <div className="review-icon">✓</div>
              <div className="phone-step-label centered">FINAL CHECK</div>
              <h2 className="phone-title centered-title">Take a moment<br />to check the details.</h2>
              <p className="review-prompt">Before confirming, make sure these details match your task.</p>
              <div className="verification-card">
                <div className="verification-row"><span>Sending to</span><strong>{recipient || 'Asha Sharma'}</strong></div>
                <div className="verification-row"><span>Practice amount</span><strong>₹{amount || '0'}.00</strong></div>
                <div className="verification-row"><span>From</span><strong>Tryora practice balance</strong></div>
              </div>
              <div className="verify-note"><span aria-hidden="true">◎</span> Check the recipient and amount before you continue.</div>
              <button className="button phone-primary" onClick={() => dispatch({
                type: 'CONFIRM',
                event: practiceEvent('task_completed', { recipient, amount }),
                invalidAmountEvent: practiceEvent('incorrect_amount_attempt', { amount, stage: 'confirmation' }),
              })} disabled={session.completed}>Confirm practice step <span aria-hidden="true">→</span></button>
            </>
          )}
          {screen === 'success' && (
            <div className="success-screen">
              <span className="success-check" aria-hidden="true">✓</span><div className="phone-step-label centered">PRACTICE COMPLETE</div>
              <h2 className="phone-title centered-title">Nicely done.</h2>
              <p className="success-copy" role="status"><strong>Simulation complete — no money was sent.</strong></p>
              <div className="verification-card success-details"><div className="verification-row"><span>Practice recipient</span><strong>{recipient || 'Asha Sharma'}</strong></div><div className="verification-row"><span>Practice amount</span><strong>₹{amount || '0'}.00</strong></div></div>
              <button className="button phone-primary" onClick={() => dispatch({ type: 'RESET' })}>Practise again <span aria-hidden="true">↻</span></button>
            </div>
          )}
          {error && <p className="practice-feedback error" role="alert">{error}</p>}
          <div className="phone-footer">A SAFE PRACTICE SPACE BY TRYORA</div>
        </div>
      </div>
      <div className="phone-caption"><span className="caption-dot" /> Fictional app preview</div>
    </div>
  );
}

function GuidancePanel({ screen, session, counts, dispatch, storageError, navigate }) {
  const guidance = {
    recipient: { step: '01', title: 'Choose who to pay', body: 'Start by finding the person named in your task. Take your time—there’s no rush.', action: 'Select Asha Sharma from the practice contacts.', hint: 'Choose Asha Sharma from the list. Rahul and Neha are fictional options, but they do not match this task.' },
    amount: { step: '02', title: 'Enter the amount', body: 'Now add the amount from your task. You can always go back and change it.', action: 'The task asks you to practise sending ₹250.', hint: 'Read the task card again: enter exactly ₹250. This amount is only used in the simulation.' },
    review: { step: '03', title: 'Check before you confirm', body: 'A quick review is a good habit. Check that both details match what you intended.', action: 'Look for Asha Sharma and ₹250 on the review screen.', hint: 'Check both lines on the review screen: the recipient should be Asha Sharma and the amount should be ₹250.' },
    success: { step: '✓', title: 'You made it through', body: 'You just moved through a practice task and checked the details before confirming.', action: 'Next, try a similar task with a fresh interface.', hint: 'This practice is complete. Nothing was sent. You can reset to practise again.' },
  }[screen];
  const requestHint = () => dispatch({
    type: 'REQUEST_HINT',
    event: practiceEvent('hint_requested', { step: session.currentStep }),
  });
  return (
    <aside className="guidance-panel">
      <div className="guidance-label"><span className="guidance-label-icon">✳</span> YOUR GUIDE</div>
      <div className="guide-step"><span>STEP</span><strong>{guidance.step}</strong><i /></div>
      <h2>{guidance.title}</h2><p className="guide-body">{guidance.body}</p>
      <div className="guide-action"><span className="guide-action-icon" aria-hidden="true">↳</span><p>{guidance.action}</p></div>
      <div className="guide-hint">
        <div><span className="hint-spark">✦</span><strong>Need a hint?</strong></div>
        {session.hintVisible ? <p className="hint-copy">{guidance.hint}</p> : <p className="hint-copy">A gentle nudge is here whenever you need one.</p>}
        <button className="hint-button" onClick={() => session.hintVisible ? dispatch({ type: 'HIDE_HINT' }) : requestHint()}>{session.hintVisible ? 'Hide hint' : 'Show me a hint'} <span aria-hidden="true">{session.hintVisible ? '−' : '→'}</span></button>
        <div className="hint-count">Hints requested <strong>{counts.hintRequests}</strong></div>
      </div>
      <div className="practice-activity">
        <strong>This practice session</strong>
        <span>Wrong contacts <b>{counts.wrongRecipientSelections}</b></span>
        <span>Incorrect amount attempts <b>{counts.incorrectAmountAttempts}</b></span>
        <span>Backtracks <b>{counts.backtracks}</b></span>
        <span>Verification viewed <b>{counts.verificationViews}</b></span>
        <span>Task completed <b>{counts.completions}</b></span>
      </div>
      {storageError && <p className="practice-feedback storage-warning" role="status">{storageError}</p>}
      <div className="guide-footer"><button className="cancel-button" onClick={() => dispatch({ type: 'RESET' })}>Reset Practice</button><span>Nothing here uses real money.</span></div>
      {screen === 'success' && <button className="button button-outline guide-challenge-button" onClick={() => navigate('challenge')}>Try Surprise Challenge <span aria-hidden="true">→</span></button>}
    </aside>
  );
}

function PracticeWorkspace({ navigate }) {
  const [state, dispatch] = usePracticeSession();
  const { session } = state;
  const screen = session.currentStep === 'complete' ? 'success' : session.currentStep;
  const counts = getPracticeEventCounts(session);
  return (
    <div className="page practice-page">
      <PageHeading eyebrow="STEP 01 · GUIDED PRACTICE" title="A safe place to try." description="Work through a familiar task, one thoughtful step at a time.">
        <div className="simulation-badge"><span className="status-dot" /> SIMULATION — NO REAL MONEY</div>
      </PageHeading>
      <div className="practice-task-banner"><div className="task-banner-icon" aria-hidden="true">✳</div><div><span>TODAY’S PRACTICE TASK</span><strong>Practise sending ₹250 to Asha Sharma.</strong></div><span className="practice-only">FICTIONAL TASK</span></div>
      <div className="practice-workspace">
        <div className="phone-column"><SimulatedPhone session={session} screen={screen} error={state.error} dispatch={dispatch} /></div>
        <GuidancePanel screen={screen} session={session} counts={counts} dispatch={dispatch} storageError={state.storageError} navigate={navigate} />
      </div>
      <div className="practice-bottom"><ProgressSteps current={1} /><button className="text-link" onClick={() => navigate('challenge')}>Skip to Surprise Challenge <span aria-hidden="true">→</span></button></div>
    </div>
  );
}

export const CHALLENGE_STORAGE_KEY = 'tryora.surprise-challenge.v1';
const CHALLENGE_RECIPIENT = 'Kavya Rao';
const CHALLENGE_AMOUNT = 640;

function createChallengeAttempt(attemptNumber) {
  const now = new Date().toISOString();
  return {
    id: `challenge-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    attemptNumber,
    startedAt: now,
    updatedAt: now,
    step: 'request',
    selectedRecipient: '',
    selectedAmount: null,
    reviewViewed: false,
    verificationCompleted: false,
    submittedAt: null,
    status: 'in_progress',
    result: null,
    events: [],
  };
}

function createChallengeStore(guidedPracticeSessionId = null) {
  const firstAttempt = createChallengeAttempt(1);
  return {
    schemaVersion: 1,
    guidedPracticeSessionId,
    activeAttemptId: firstAttempt.id,
    attempts: [firstAttempt],
  };
}

function challengeEvent(type, details = {}) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    timestamp: new Date().toISOString(),
    details,
  };
}

function validChallengeStore(value) {
  return value?.schemaVersion === 1
    && (value.guidedPracticeSessionId === undefined
      || value.guidedPracticeSessionId === null
      || typeof value.guidedPracticeSessionId === 'string')
    && Array.isArray(value.attempts)
    && value.attempts.length > 0
    && value.attempts.every((attempt) => typeof attempt.id === 'string'
      && Number.isInteger(attempt.attemptNumber)
      && ['request', 'review'].includes(attempt.step)
      && ['in_progress', 'submitted', 'abandoned'].includes(attempt.status)
      && Array.isArray(attempt.events)
      && attempt.events.every((event) => typeof event?.id === 'string'
        && typeof event.type === 'string'
        && typeof event.timestamp === 'string'
        && event.details !== null
        && typeof event.details === 'object')
      && (attempt.status !== 'submitted' || (
        attempt.step === 'review'
        && attempt.reviewViewed
        && attempt.verificationCompleted
        && typeof attempt.submittedAt === 'string'
        && typeof attempt.result?.correct === 'boolean'
      )))
    && value.attempts.some((attempt) => attempt.id === value.activeAttemptId);
}

function initializeChallengeState() {
  try {
    const stored = window.localStorage.getItem(CHALLENGE_STORAGE_KEY);
    const practiceSession = readStoredCompletion(PRACTICE_STORAGE_KEY);
    const guidedPracticeSessionId = isPracticeSession(practiceSession) ? practiceSession.id : null;
    if (!stored) return { store: createChallengeStore(guidedPracticeSessionId), storageError: '' };
    const parsed = JSON.parse(stored);
    if (!validChallengeStore(parsed)) {
      return { store: createChallengeStore(guidedPracticeSessionId), storageError: 'Saved challenge data was invalid. A fresh challenge attempt has started.' };
    }
    return { store: parsed, storageError: '' };
  } catch {
    return { store: createChallengeStore(), storageError: 'Saved challenge data could not be read. Challenge progress may not persist on this device.' };
  }
}

function updateActiveAttempt(state, update) {
  const active = state.store.attempts.find((attempt) => attempt.id === state.store.activeAttemptId);
  if (!active || active.status !== 'in_progress') return state;
  const nextAttempt = update(active);
  return {
    ...state,
    store: {
      ...state.store,
      attempts: state.store.attempts.map((attempt) => attempt.id === active.id ? nextAttempt : attempt),
    },
    message: '',
  };
}

function challengeReducer(state, action) {
  if (action.type === 'STORAGE_STATUS') {
    return state.storageError === action.message ? state : { ...state, storageError: action.message };
  }
  if (action.type === 'NEW_ATTEMPT') {
    const active = state.store.attempts.find((attempt) => attempt.id === state.store.activeAttemptId);
    const attempts = active?.status === 'in_progress'
      ? state.store.attempts.map((attempt) => attempt.id === active.id
        ? { ...attempt, status: 'abandoned', updatedAt: action.event.timestamp, events: [...attempt.events, action.event] }
        : attempt)
      : state.store.attempts;
    const next = createChallengeAttempt(state.store.attempts.length + 1);
    return {
      ...state,
      store: { ...state.store, activeAttemptId: next.id, attempts: [...attempts, next] },
      message: '',
    };
  }
  return updateActiveAttempt(state, (attempt) => {
    if (action.type === 'SELECT_RECIPIENT') {
      return {
        ...attempt,
        selectedRecipient: action.value,
        updatedAt: action.event.timestamp,
        events: [...attempt.events, action.event],
      };
    }
    if (action.type === 'SELECT_AMOUNT') {
      return {
        ...attempt,
        selectedAmount: action.value,
        updatedAt: action.event.timestamp,
        events: [...attempt.events, action.event],
      };
    }
    if (action.type === 'OPEN_REVIEW') {
      if (!attempt.selectedRecipient || !attempt.selectedAmount) {
        return { ...attempt, updatedAt: action.event.timestamp, events: [...attempt.events, action.event], message: '' };
      }
      return {
        ...attempt,
        step: 'review',
        reviewViewed: true,
        verificationCompleted: false,
        updatedAt: action.event.timestamp,
        events: [...attempt.events, action.event],
      };
    }
    if (action.type === 'VERIFY') {
      return {
        ...attempt,
        verificationCompleted: action.checked,
        updatedAt: action.event.timestamp,
        events: [...attempt.events, action.event],
      };
    }
    if (action.type === 'BACK_TO_REQUEST') {
      return {
        ...attempt,
        step: 'request',
        reviewViewed: false,
        verificationCompleted: false,
        updatedAt: action.event.timestamp,
        events: [...attempt.events, action.event],
      };
    }
    if (action.type === 'SUBMIT') {
      const correctRecipient = attempt.selectedRecipient === CHALLENGE_RECIPIENT;
      const correctAmount = attempt.selectedAmount === CHALLENGE_AMOUNT;
      const result = {
        correct: correctRecipient && correctAmount && attempt.reviewViewed && attempt.verificationCompleted,
        correctRecipient,
        correctAmount,
        reviewViewed: attempt.reviewViewed,
        verificationCompleted: attempt.verificationCompleted,
        selectedRecipient: attempt.selectedRecipient,
        selectedAmount: attempt.selectedAmount,
        expectedRecipient: CHALLENGE_RECIPIENT,
        expectedAmount: CHALLENGE_AMOUNT,
        selectionAttempts: attempt.events.filter((event) => event.type === 'recipient_selected' || event.type === 'amount_selected').length,
        incorrectRecipientChoices: attempt.events.filter((event) => event.type === 'recipient_selected' && event.details.correct === false).length,
        incorrectAmountChoices: attempt.events.filter((event) => event.type === 'amount_selected' && event.details.correct === false).length,
      };
      return {
        ...attempt,
        status: 'submitted',
        submittedAt: action.event.timestamp,
        updatedAt: action.event.timestamp,
        result,
        events: [...attempt.events, { ...action.event, details: result }],
      };
    }
    return attempt;
  });
}

function useChallengeSession() {
  const [state, dispatch] = useReducer(challengeReducer, undefined, initializeChallengeState);
  useEffect(() => {
    try {
      window.localStorage.setItem(CHALLENGE_STORAGE_KEY, JSON.stringify(state.store));
      if (state.storageError) dispatch({ type: 'STORAGE_STATUS', message: '' });
    } catch {
      dispatch({ type: 'STORAGE_STATUS', message: 'Challenge results could not be saved on this device.' });
    }
  }, [state.store]);
  return [state, dispatch];
}

function ChallengeFeedback({ result, attemptNumber, onRestart }) {
  return (
    <section className={`challenge-result ${result.correct ? 'result-correct' : 'result-review'}`} role="status" aria-live="polite">
      <div className="result-heading">
        <span className="result-symbol" aria-hidden="true">{result.correct ? '✓' : '↻'}</span>
        <div><span className="eyebrow">ATTEMPT {attemptNumber} · RESULT</span><h2>{result.correct ? 'Your checks matched the request.' : 'A couple of details need another look.'}</h2></div>
      </div>
      <div className="result-checks">
        <div><span>Recipient</span><strong>{result.correctRecipient ? 'Correct' : `Check ${result.expectedRecipient}`}</strong></div>
        <div><span>Amount</span><strong>{result.correctAmount ? 'Correct' : `Check ₹${result.expectedAmount}`}</strong></div>
        <div><span>Review and verify</span><strong>{result.reviewViewed && result.verificationCompleted ? 'Completed' : 'Not completed'}</strong></div>
      </div>
      <p>{result.correct
        ? 'You matched the person and amount to the request, then inspected and verified your check slip.'
        : `Next time, compare the name with the request, check the amount is ₹${result.expectedAmount}, and inspect both details on the check slip before submitting.`}</p>
      <div className="result-meta">Selections made: {result.selectionAttempts} · Incorrect recipient choices: {result.incorrectRecipientChoices} · Incorrect amount choices: {result.incorrectAmountChoices}</div>
      <button className="button challenge-restart" onClick={onRestart}>Start a fresh attempt <span aria-hidden="true">↻</span></button>
    </section>
  );
}

function SurpriseChallenge({ navigate }) {
  const [state, dispatch] = useChallengeSession();
  const attempt = state.store.attempts.find((item) => item.id === state.store.activeAttemptId);
  const submitted = attempt.status === 'submitted';
  const submit = () => {
    if (attempt.status !== 'in_progress' || attempt.step !== 'review' || !attempt.reviewViewed || !attempt.verificationCompleted) return;
    dispatch({ type: 'SUBMIT', event: challengeEvent('answer_submitted') });
  };
  const startFresh = () => dispatch({ type: 'NEW_ATTEMPT', event: challengeEvent('attempt_abandoned') });
  const chooseRecipient = (value) => dispatch({
    type: 'SELECT_RECIPIENT',
    value,
    event: challengeEvent('recipient_selected', { selectedRecipient: value, correct: value === CHALLENGE_RECIPIENT }),
  });
  const chooseAmount = (value) => dispatch({
    type: 'SELECT_AMOUNT',
    value,
    event: challengeEvent('amount_selected', { selectedAmount: value, correct: value === CHALLENGE_AMOUNT }),
  });

  return (
    <div className="page transfer-challenge-page">
      <PageHeading eyebrow="STEP 02 · INDEPENDENT CHALLENGE" title="A request in a different place." description="Read the note, make your checks, then decide when you’re ready to submit.">
        <div className="simulation-badge"><span className="status-dot" /> FICTIONAL SCENARIO</div>
      </PageHeading>
      <div className="challenge-disclaimer"><span aria-hidden="true">◎</span><div><strong>Independent practice · No hints</strong><span>This fictional request cannot move money or contact anyone.</span></div><span className="disclaimer-stamp">DEMO ONLY</span></div>
      <div className="transfer-challenge-layout">
        <aside className="request-brief">
          <div className="brief-top"><span>COMMUNITY DESK</span><span>MEMO 04—B</span></div>
          <div className="brief-mark" aria-hidden="true">“</div>
          <div className="eyebrow">A NOTE FOR YOU</div>
          <h2>Set aside a workshop seat.</h2>
          <p className="brief-copy">The event coordinator asks you to prepare a fictional contribution for the guest named here.</p>
          <div className="request-details">
            <span>GUEST</span><strong>Kavya Rao</strong>
            <span>REQUESTED CONTRIBUTION</span><strong>₹640</strong>
          </div>
          <div className="brief-divider" />
          <p className="brief-instruction">Find the matching guest and amount in the request board. Inspect your check slip before submitting your answer.</p>
          <div className="brief-footer"><span className="brief-seal">t.</span><span>TRYORA LEARNING SIMULATION<br />No real payment service involved</span></div>
        </aside>

        <section className="request-board" aria-label="Fictional community request board">
          <div className="board-topline"><div className="board-brand"><span className="board-brand-mark">c</span><span>Commonplace<small>EVENT DESK · REQUEST BOARD</small></span></div>{!submitted ? <button className="board-reset" onClick={startFresh}>Reset attempt <span aria-hidden="true">↻</span></button> : <span className="board-account">Practice view <i /></span>}</div>
          <div className="board-title-row"><div><span className="board-kicker">OUTGOING REQUESTS / 01</span><h2>{attempt.step === 'review' ? 'Your check slip' : 'Prepare a contribution'}</h2></div><span className="board-date">FICTIONAL · NO MONEY</span></div>
          {!submitted && attempt.step === 'request' && (
            <div className="board-form">
              <fieldset className="guest-picker">
                <legend><span className="form-index">A</span> Match the guest to the note</legend>
                <div className="guest-options">
                  {[
                    { name: 'Kavya Rao', initials: 'KR', detail: 'Workshop guest' },
                    { name: 'Meera Iyer', initials: 'MI', detail: 'Volunteer host' },
                    { name: 'Omar Das', initials: 'OD', detail: 'Venue contact' },
                  ].map((guest) => (
                    <button type="button" key={guest.name} className={`guest-option ${attempt.selectedRecipient === guest.name ? 'chosen' : ''}`} aria-pressed={attempt.selectedRecipient === guest.name} onClick={() => chooseRecipient(guest.name)}>
                      <span className="guest-monogram">{guest.initials}</span><span className="guest-description"><strong>{guest.name}</strong><small>{guest.detail}</small></span><span className="guest-check" aria-hidden="true">{attempt.selectedRecipient === guest.name ? '✓' : '+'}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset className="contribution-picker">
                <legend><span className="form-index">B</span> Match the requested contribution</legend>
                <div className="contribution-options">
                  {[460, 640, 840].map((value) => (
                    <button type="button" key={value} className={`contribution-option ${attempt.selectedAmount === value ? 'chosen' : ''}`} aria-pressed={attempt.selectedAmount === value} onClick={() => chooseAmount(value)}>
                      <span>₹</span>{value}
                    </button>
                  ))}
                </div>
                <span className="field-caption">Choose the amount that matches the note.</span>
              </fieldset>
              <div className="board-actions">
                <span className="privacy-note"><span aria-hidden="true">◎</span> Your answer stays in this browser.</span>
                <button className="button board-review-button" onClick={() => dispatch({
                  type: 'OPEN_REVIEW',
                  event: challengeEvent('review_requested', { recipientSelected: Boolean(attempt.selectedRecipient), amountSelected: attempt.selectedAmount !== null }),
                })} disabled={!attempt.selectedRecipient || attempt.selectedAmount === null}>Build check slip <span aria-hidden="true">→</span></button>
              </div>
            </div>
          )}
          {!submitted && attempt.step === 'review' && (
            <div className="check-slip">
              <div className="slip-heading"><span>YOUR ANSWER · ATTEMPT {attempt.attemptNumber}</span><span className="slip-edit-label">NOT A PAYMENT</span></div>
              <div className="slip-row"><span>Guest</span><strong>{attempt.selectedRecipient}</strong></div>
              <div className="slip-row"><span>Contribution</span><strong>₹{attempt.selectedAmount}</strong></div>
              <p className="slip-prompt">Take a moment to inspect both details against the note before you submit.</p>
              <label className="slip-verification">
                <input
                  type="checkbox"
                  checked={attempt.verificationCompleted}
                  onChange={(event) => dispatch({
                    type: 'VERIFY',
                    checked: event.target.checked,
                    event: challengeEvent(event.target.checked ? 'verification_completed' : 'verification_unchecked'),
                  })}
                />
                <span className="custom-check" aria-hidden="true">{attempt.verificationCompleted ? '✓' : ''}</span>
                <span>I checked the guest and contribution against the note.</span>
              </label>
              <div className="slip-actions">
                <button className="slip-back" onClick={() => dispatch({ type: 'BACK_TO_REQUEST', event: challengeEvent('returned_to_request') })}>← Edit selections</button>
                <button className="button board-review-button submit-answer" onClick={submit} disabled={!attempt.verificationCompleted || submitted}>Submit my answer <span aria-hidden="true">→</span></button>
              </div>
            </div>
          )}
          {submitted && <ChallengeFeedback result={attempt.result} attemptNumber={attempt.attemptNumber} onRestart={startFresh} />}
          {state.storageError && <p className="challenge-storage-warning" role="status">{state.storageError}</p>}
          <div className="board-foot"><span>AN EDUCATIONAL SIMULATION</span><span>Nothing will be sent.</span></div>
        </section>
      </div>
      <div className="challenge-footer"><ProgressSteps current={2} completedStages={attempt.status === 'submitted' ? [2] : []} /><button className="button button-outline" onClick={() => navigate('passport')}>View Skill Passport <span aria-hidden="true">→</span></button></div>
    </div>
  );
}

export function derivePassportData(practiceSession, challengeStore) {
  const practice = isPracticeSession(practiceSession) ? practiceSession : null;
  const challenge = validChallengeStore(challengeStore) ? challengeStore : null;
  const practiceCounts = practice ? getPracticeEventCounts(practice) : null;
  const attempts = challenge?.attempts || [];
  const answeredAttempts = attempts.filter((attempt) => attempt.status === 'submitted' && attempt.result);
  const interactedAttempts = attempts.filter((attempt) => (
    attempt.events.some((event) => [
      'recipient_selected',
      'amount_selected',
      'review_requested',
      'verification_completed',
      'answer_submitted',
    ].includes(event.type))
  ));
  const challengeEventCount = (types) => attempts.reduce((count, attempt) => (
    count + attempt.events.filter((event) => types.includes(event.type)).length
  ), 0);
  const latestResult = answeredAttempts.at(-1)?.result || null;
  const successfulChallenge = answeredAttempts.some((attempt) => attempt.result.correct === true);
  const incorrectRecipientChoices = challenge ? attempts.reduce((count, attempt) => (
    count + attempt.events.filter((event) => (
      event.type === 'recipient_selected' && event.details.correct === false
    )).length
  ), 0) : null;
  const incorrectAmountChoices = challenge ? attempts.reduce((count, attempt) => (
    count + attempt.events.filter((event) => (
      event.type === 'amount_selected' && event.details.correct === false
    )).length
  ), 0) : null;

  return {
    practice: practice ? {
      exists: true,
      completed: practice.completed,
      hintsRequested: practiceCounts.hintRequests,
      wrongRecipientSelections: practiceCounts.wrongRecipientSelections,
      incorrectAmountAttempts: practiceCounts.incorrectAmountAttempts,
      verificationCompleted: practice.events.some((event) => event.type === 'verification_viewed'),
      selectedRecipient: practice.selectedRecipient,
      amount: practice.amount,
      completedAt: practice.completedAt,
    } : {
      exists: false,
      completed: false,
      hintsRequested: null,
      wrongRecipientSelections: null,
      incorrectAmountAttempts: null,
      verificationCompleted: null,
      selectedRecipient: null,
      amount: null,
      completedAt: null,
    },
    challenge: challenge ? {
      exists: true,
      attemptsStarted: interactedAttempts.length,
      submittedAttempts: answeredAttempts.length,
      successful: successfulChallenge,
      incorrectRecipientChoices,
      incorrectAmountChoices,
      reviewViewed: challengeEventCount(['review_requested']) > 0,
      verificationCompleted: challengeEventCount(['verification_completed']) > 0,
      latestResult,
      attempts: challenge.attempts,
    } : {
      exists: false,
      attemptsStarted: null,
      submittedAttempts: null,
      successful: false,
      incorrectRecipientChoices: null,
      incorrectAmountChoices: null,
      reviewViewed: null,
      verificationCompleted: null,
      latestResult: null,
      attempts: [],
    },
  };
}

function displayedMetric(value, suffix = '') {
  return value === null ? 'No session data' : `${value}${suffix}`;
}

function getPracticeRecommendation(data) {
  if (!data.practice.exists) {
    return {
      title: 'Start with a guided practice.',
      body: 'There is no guided session saved yet. Try the fictional practice flow to create a starting record.',
    };
  }
  if (!data.practice.completed) {
    return {
      title: 'Finish the guided practice steps.',
      body: 'Your saved practice is still in progress. Continue it and inspect the recipient and amount before confirming.',
    };
  }
  if (!data.practice.verificationCompleted) {
    return {
      title: 'Make time for the review step.',
      body: 'The saved practice record has no review event. Revisit the confirmation details before completing the flow.',
    };
  }
  if (data.practice.wrongRecipientSelections > 0) {
    return {
      title: 'Pause on the recipient name.',
      body: `There ${data.practice.wrongRecipientSelections === 1 ? 'was' : 'were'} ${data.practice.wrongRecipientSelections} wrong recipient selection${data.practice.wrongRecipientSelections === 1 ? '' : 's'} in guided practice. Compare the selected name with the task before continuing.`,
    };
  }
  if (data.practice.incorrectAmountAttempts > 0) {
    return {
      title: 'Recheck the amount against the task.',
      body: `The guided session recorded ${data.practice.incorrectAmountAttempts} incorrect amount attempt${data.practice.incorrectAmountAttempts === 1 ? '' : 's'}. Read the requested amount, then compare it with the review screen.`,
    };
  }
  if (!data.challenge.successful) {
    return {
      title: 'Try the independent challenge.',
      body: data.challenge.exists
        ? 'No submitted challenge answer has matched the request yet. Take another look at the name, amount and check slip.'
        : 'The independent challenge has no saved attempt yet. Try the changed interface without hints when you are ready.',
    };
  }
  if (data.practice.hintsRequested > 0) {
    return {
      title: 'Try a practice round at your own pace.',
      body: `Hints were requested ${data.practice.hintsRequested} time${data.practice.hintsRequested === 1 ? '' : 's'} in the saved practice session. You can revisit it and use guidance whenever useful.`,
    };
  }
  return {
    title: 'Revisit either task whenever useful.',
    body: 'Your saved records show both guided completion and a successful independent answer. Keep practising only if it is useful to you.',
  };
}

function PassportMetric({ label, value, detail }) {
  return (
    <div className="passport-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      {detail && <small>{detail}</small>}
    </div>
  );
}

function SkillPassport({ navigate }) {
  const practiceSession = readStoredCompletion(PRACTICE_STORAGE_KEY);
  const challengeStore = readStoredCompletion(CHALLENGE_STORAGE_KEY);
  const data = derivePassportData(practiceSession, challengeStore);
  const hasSession = data.practice.exists || data.challenge.exists;
  const recommendation = getPracticeRecommendation(data);
  const challengeOutcome = data.challenge.latestResult
    ? (data.challenge.latestResult.correct ? 'Matched request' : 'Needs review')
    : data.challenge.exists ? 'No answer submitted' : 'No session data';
  const practiseAgain = () => {
    try {
      window.localStorage.removeItem(PRACTICE_STORAGE_KEY);
      navigate('practice');
    } catch {
      window.alert('The previous practice session could not be cleared in this browser. Try Reset My Demo Data or check storage permissions.');
    }
  };
  const resetDemoData = () => {
    try {
      const tryoraKeys = Object.keys(window.localStorage).filter((key) => key.startsWith('tryora.'));
      tryoraKeys.forEach((key) => window.localStorage.removeItem(key));
      navigate('home');
    } catch {
      window.alert('Tryora demo data could not be cleared in this browser. Check browser storage permissions and try again.');
    }
  };
  return (
    <div className="page passport-page">
      <PageHeading eyebrow="STEP 03 · YOUR SKILL PASSPORT" title="A record of what you tried." description="A clear snapshot of the interactions saved in this browser.">
        <div className="passport-stamp"><span className="stamp-mark">t.</span><span>TRYORA<br />DEMO RECORD</span></div>
      </PageHeading>
      <div className="passport-intro passport-caveat"><div className="intro-icon" aria-hidden="true">◎</div><div><strong>This describes your performance in this demo only.</strong><p>It is not a measure of intelligence, a certified skill, or proof of ability in a real-world service.</p></div><span className="placeholder-badge">{hasSession ? 'SESSION DATA' : 'EMPTY'}</span></div>

      {!hasSession && (
        <div className="passport-empty">
          <span className="empty-symbol" aria-hidden="true">↗</span>
          <div><span className="eyebrow">NOTHING SAVED YET</span><h2>Your demo record starts when you do.</h2><p>Try a guided task or independent challenge. This report will show only the interactions saved in this browser.</p></div>
          <button className="button button-primary" onClick={() => navigate('practice')}>Start Safe Practice <span aria-hidden="true">→</span></button>
        </div>
      )}

      <div className="passport-grid">
        <section className="passport-main">
          <div className="passport-section-head"><div><div className="eyebrow">RECORDED INTERACTIONS</div><h2>Your session details</h2></div><span className="record-id">LOCAL DEMO DATA</span></div>
          <div className="passport-metric-grid">
            <PassportMetric label="Guided Practice" value={data.practice.exists ? (data.practice.completed ? 'Completed' : 'In progress') : 'No session data'} />
            <PassportMetric label="Hints requested" value={displayedMetric(data.practice.hintsRequested)} />
            <PassportMetric label="Wrong recipient selections" value={displayedMetric(data.practice.wrongRecipientSelections)} />
            <PassportMetric label="Incorrect amount attempts" value={displayedMetric(data.practice.incorrectAmountAttempts)} />
            <PassportMetric label="Practice review viewed" value={data.practice.verificationCompleted === null ? 'No session data' : data.practice.verificationCompleted ? 'Yes' : 'Not recorded'} />
            <PassportMetric label="Independent challenge" value={data.challenge.successful ? 'Completed successfully' : data.challenge.exists ? 'Not completed successfully' : 'No session data'} />
            <PassportMetric label="Challenge attempts started" value={displayedMetric(data.challenge.attemptsStarted)} detail={data.challenge.exists ? `${data.challenge.submittedAttempts} submitted` : undefined} />
            <PassportMetric label="Incorrect challenge recipient choices" value={displayedMetric(data.challenge.incorrectRecipientChoices)} />
            <PassportMetric label="Incorrect challenge amount choices" value={displayedMetric(data.challenge.incorrectAmountChoices)} />
            <PassportMetric label="Challenge review viewed" value={data.challenge.reviewViewed === null ? 'No session data' : data.challenge.reviewViewed ? 'Yes' : 'Not recorded'} />
            <PassportMetric label="Challenge verification completed" value={data.challenge.verificationCompleted === null ? 'No session data' : data.challenge.verificationCompleted ? 'Yes' : 'Not recorded'} />
            <PassportMetric label="Latest challenge answer" value={challengeOutcome} />
          </div>
          <div className="comparison-area passport-comparison">
            <div className="comparison-heading"><div><span className="eyebrow">SIDE BY SIDE</span><h3>Guided → independent</h3></div><span className="placeholder-badge">OBSERVED OUTCOMES</span></div>
            <p>These are recorded task outcomes, not scores or a comparison of personal ability.</p>
            <div className="outcome-comparison">
              <div className="outcome-column">
                <span className="outcome-kicker">GUIDED PRACTICE</span>
                <strong>{data.practice.exists ? (data.practice.completed ? 'Task completed' : 'Task not completed') : 'No practice record'}</strong>
                <small>{data.practice.exists
                  ? `${data.practice.verificationCompleted ? 'Review step recorded' : 'Review step not recorded'} · ${data.practice.hintsRequested} hint${data.practice.hintsRequested === 1 ? '' : 's'}`
                  : 'No guided session is saved.'}</small>
              </div>
              <span className="outcome-arrow" aria-hidden="true">→</span>
              <div className="outcome-column">
                <span className="outcome-kicker">INDEPENDENT CHALLENGE</span>
                <strong>{challengeOutcome}</strong>
                <small>{data.challenge.exists
                  ? `${data.challenge.attemptsStarted} attempt${data.challenge.attemptsStarted === 1 ? '' : 's'} started · ${data.challenge.incorrectRecipientChoices} wrong recipient and ${data.challenge.incorrectAmountChoices} wrong amount choice${data.challenge.incorrectAmountChoices === 1 ? '' : 's'}`
                  : 'No independent challenge is saved.'}</small>
              </div>
            </div>
          </div>
          <p className="passport-unavailable">No overall score, learning-gain estimate, timed measure, or real-world certification is calculated.</p>
        </section>
        <aside className="recommendation-card passport-recommendation">
          <div className="recommendation-top"><span className="recommendation-icon">↗</span><span className="eyebrow">BASED ON YOUR RECORD</span></div>
          <h2>{recommendation.title}</h2><p>{recommendation.body}</p>
          <div className="recommendation-rule" />
          <div className="recommendation-next"><span>YOUR SAVED DEMO DATA</span><strong>{hasSession ? `${Number(data.practice.exists) + Number(data.challenge.exists)} session record${Number(data.practice.exists) + Number(data.challenge.exists) === 1 ? '' : 's'}` : 'No session records'}</strong><small>Stored in this browser only</small></div>
          <button className="button recommendation-button" onClick={practiseAgain}>Practise Again <span aria-hidden="true">↗</span></button>
          <button className="button reset-demo-button" onClick={resetDemoData}>Reset My Demo Data</button>
          <div className="recommendation-safe">A safe space to learn. No real payments.</div>
        </aside>
      </div>
      <div className="passport-footer"><ProgressSteps current={3} completedStages={[
        ...(data.practice.completed ? [1] : []),
        ...(data.challenge.submittedAttempts > 0 ? [2] : []),
      ]} /><button className="text-link" onClick={() => navigate('home')}>Back to overview <span aria-hidden="true">→</span></button></div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const navigate = (nextPage) => setPage(nextPage);
  return (
    <AppLayout page={page} navigate={navigate}>
      {page === 'home' && <Dashboard navigate={navigate} />}
      {page === 'practice' && <PracticeWorkspace navigate={navigate} />}
      {page === 'challenge' && <SurpriseChallenge navigate={navigate} />}
      {page === 'passport' && <SkillPassport navigate={navigate} />}
    </AppLayout>
  );
}
