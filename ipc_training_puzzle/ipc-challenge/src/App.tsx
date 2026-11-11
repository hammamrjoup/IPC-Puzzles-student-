import React, { useState, useEffect } from 'react';
import { GameId, GameProgress } from './types';
import { CLINICAL_GAMES } from './data/clinicalContent';

const PROGRESS_STORAGE_KEY = 'ipc_challenge_v1_progress';

export const App: React.FC = () => {
  // Navigation
  const [activeGameId, setActiveGameId] = useState<GameId | null>(null);
  const [isFacilitatorMode, setIsFacilitatorMode] = useState<boolean>(false);

  // Persistence for scores and completions
  const [progress, setProgress] = useState<GameProgress>(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to read progress from localStorage', e);
    }
    return {
      firstAttemptScores: {},
      completed: {},
      attemptsCount: {}
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to save progress to localStorage', e);
    }
  }, [progress]);

  // Per-game interactive state
  // Game 1: Order
  const [gloveCardsOrder, setGloveCardsOrder] = useState<string[]>(['hand-hygiene', 'remove-gloves', 'put-fresh-gloves']);
  // Game 2: Checkpoints selected IDs
  const [selectedCheckpoints, setSelectedCheckpoints] = useState<string[]>([]);
  // Game 3: New needle selected IDs
  const [selectedNeedleProblems, setSelectedNeedleProblems] = useState<string[]>([]);
  // Game 4: 30s shortcut single choice
  const [selectedShortcutChoice, setSelectedShortcutChoice] = useState<string | null>(null);
  // Game 5: Waiting room selected IDs
  const [selectedWaitingRoomActions, setSelectedWaitingRoomActions] = useState<string[]>([]);

  // Feedback & answer check state for current game
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState<boolean>(false);
  const [showFacilitatorReveal, setShowFacilitatorReveal] = useState<boolean>(false);

  // Reset interactive inputs when switching games
  const handleOpenGame = (gameId: GameId) => {
    setActiveGameId(gameId);
    setIsAnswerChecked(false);
    setIsCurrentCorrect(false);
    setShowFacilitatorReveal(false);

    // Initial shuffle or reset per game
    if (gameId === 'glove-trap') {
      // Start with shuffled order that is not already correct
      setGloveCardsOrder(['hand-hygiene', 'remove-gloves', 'put-fresh-gloves']);
    } else if (gameId === 'traveling-cuff') {
      setSelectedCheckpoints([]);
    } else if (gameId === 'new-needle') {
      setSelectedNeedleProblems([]);
    } else if (gameId === 'shortcut-30s') {
      setSelectedShortcutChoice(null);
    } else if (gameId === 'waiting-room') {
      setSelectedWaitingRoomActions([]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setActiveGameId(null);
    setIsAnswerChecked(false);
    setIsCurrentCorrect(false);
    setShowFacilitatorReveal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reorder helper for Game 1
  const moveGloveCard = (index: number, direction: 'up' | 'down') => {
    if (isAnswerChecked) setIsAnswerChecked(false); // reset checked status on user tweak
    const newOrder = [...gloveCardsOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;
    setGloveCardsOrder(newOrder);
  };

  // Toggle selection for Game 2, 3, 5
  const toggleMultiSelect = (
    currentList: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    id: string,
    maxAllowed?: number
  ) => {
    if (isAnswerChecked) setIsAnswerChecked(false);
    if (currentList.includes(id)) {
      setList(currentList.filter(item => item !== id));
    } else {
      if (maxAllowed && currentList.length >= maxAllowed) {
        // Swap oldest selection or reject
        setList([...currentList.slice(1), id]);
      } else {
        setList([...currentList, id]);
      }
    }
  };

  // Check Answer Handler
  const handleCheckAnswer = () => {
    if (!activeGameId) return;

    let isCorrect = false;

    if (activeGameId === 'glove-trap') {
      const correct = ['remove-gloves', 'hand-hygiene', 'put-fresh-gloves'];
      isCorrect =
        gloveCardsOrder.length === 3 &&
        gloveCardsOrder[0] === correct[0] &&
        gloveCardsOrder[1] === correct[1] &&
        gloveCardsOrder[2] === correct[2];
    } else if (activeGameId === 'traveling-cuff') {
      const required = ['cp-between-patients', 'cp-before-storage'];
      isCorrect =
        selectedCheckpoints.length === 2 &&
        required.every(id => selectedCheckpoints.includes(id));
    } else if (activeGameId === 'new-needle') {
      const required = ['syringe-reuse', 'vial-contamination'];
      isCorrect =
        selectedNeedleProblems.length === 2 &&
        required.every(id => selectedNeedleProblems.includes(id));
    } else if (activeGameId === 'shortcut-30s') {
      isCorrect = selectedShortcutChoice === 'reapply-wet';
    } else if (activeGameId === 'waiting-room') {
      const required = ['offer-mask', 'tissues-hand-hygiene', 'spatial-separation'];
      isCorrect =
        selectedWaitingRoomActions.length === 3 &&
        required.every(id => selectedWaitingRoomActions.includes(id));
    }

    setIsCurrentCorrect(isCorrect);
    setIsAnswerChecked(true);

    // Update progress:
    // If this is the FIRST ATTEMPT on this game, record firstAttemptScores
    setProgress(prev => {
      const currentAttempts = (prev.attemptsCount[activeGameId] || 0) + 1;
      const isFirst = prev.firstAttemptScores[activeGameId] === undefined;

      const updatedFirstAttempt = isFirst
        ? { ...prev.firstAttemptScores, [activeGameId]: isCorrect }
        : prev.firstAttemptScores;

      const updatedCompleted = isCorrect
        ? { ...prev.completed, [activeGameId]: true }
        : prev.completed;

      return {
        firstAttemptScores: updatedFirstAttempt,
        completed: updatedCompleted,
        attemptsCount: {
          ...prev.attemptsCount,
          [activeGameId]: currentAttempts
        }
      };
    });
  };

  // Reset progress
  const handleResetProgress = () => {
    if (window.confirm('Reset all scores and completed challenges?')) {
      setProgress({
        firstAttemptScores: {},
        completed: {},
        attemptsCount: {}
      });
      setIsAnswerChecked(false);
      setIsCurrentCorrect(false);
      setShowFacilitatorReveal(false);
    }
  };

  // Stats calculation
  const totalGames = CLINICAL_GAMES.length; // 5
  const completedCount = Object.values(progress.completed).filter(Boolean).length;
  const firstAttemptCorrectCount = Object.values(progress.firstAttemptScores).filter(val => val === true).length;
  const firstAttemptTotalCount = Object.keys(progress.firstAttemptScores).length;

  const currentGame = CLINICAL_GAMES.find(g => g.id === activeGameId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-500 selection:text-white">
      {/* 🌟 TOP NAVIGATION BAR 🌟 */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Brand Logo & Title */}
          <div
            onClick={handleBackToHome}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
            title="IPC Challenge Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-500 flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
              🛡️
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base sm:text-lg tracking-tight text-white">
                  IPC Challenge
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  CDC Safe Care
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Infection Prevention Micro-Simulations
              </p>
            </div>
          </div>

          {/* Right Controls: Facilitator Toggle & Score Chips */}
          <div className="flex items-center gap-2">
            {/* Facilitator Mode Switch */}
            <button
              onClick={() => setIsFacilitatorMode(!isFacilitatorMode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 border shadow-sm ${
                isFacilitatorMode
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/20'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
              }`}
              title="Toggle Facilitator / Shift Huddle Mode"
              aria-pressed={isFacilitatorMode}
            >
              <span>{isFacilitatorMode ? '👥' : '👤'}</span>
              <span className="hidden sm:inline">
                {isFacilitatorMode ? 'Facilitator Mode' : 'Facilitator'}
              </span>
              <span className="sm:hidden">
                {isFacilitatorMode ? 'Huddle' : 'Facilitator'}
              </span>
            </button>

            {/* First-Try Score Chip */}
            <div
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-cyan-300 flex items-center gap-1 shadow-inner"
              title="First-Attempt Score (out of 5)"
            >
              <span className="text-amber-400">🌟</span>
              <span>
                {firstAttemptCorrectCount}/{totalGames}
              </span>
            </div>

            {/* Completion Chip */}
            <div
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-emerald-400 flex items-center gap-1 shadow-inner"
              title="Total Challenges Completed"
            >
              <span>✅</span>
              <span>
                {completedCount}/{totalGames}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 📢 FACILITATOR SHIFT HUDDLE NOTICE BANNER 📢 */}
      {isFacilitatorMode && (
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-b border-amber-500/40 px-4 py-2 text-center text-xs text-amber-200 flex items-center justify-center gap-2 shadow-inner">
          <span className="text-base">📢</span>
          <span className="font-bold">
            FACILITATOR / SHIFT HUDDLE MODE ACTIVE:
          </span>
          <span className="text-amber-100 hidden sm:inline">
            Each scenario includes discussion prompts and a "Reveal Answer" key for team teaching.
          </span>
        </div>
      )}

      {/* 🧭 MAIN CONTENT AREA 🧭 */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-6">
        {/* VIEW 1: HOME SCREEN (ALL 5 GAMES SHOWN) */}
        {!activeGameId && (
          <section className="flex flex-col gap-6">
            {/* Hero Welcome Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-[#031d3d] to-slate-900 border-2 border-cyan-500/50 p-6 sm:p-8 shadow-2xl text-left">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-2 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-black uppercase tracking-wider">
                    <span>🏥</span>
                    <span>Hospital IPC Training • 5 Clinical Scenarios</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    Master the Critical Infection Control Checkpoints
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                    Play through 5 realistic clinical situations designed for bedside nurses, doctors, and allied health staff. Start anywhere, test your clinical instincts, and practice for zero healthcare-associated infections.
                  </p>
                </div>

                {/* Score Summary Box */}
                <div className="w-full md:w-auto flex-shrink-0 bg-slate-950/80 border border-cyan-500/40 rounded-2xl p-4 flex flex-col gap-2 min-w-[200px] text-center shadow-lg">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Your Challenge Progress
                  </span>
                  <div className="flex items-center justify-around gap-4 pt-1">
                    <div>
                      <span className="text-2xl font-black text-amber-400">
                        {firstAttemptCorrectCount}/{totalGames}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-bold">
                        1st Try Score
                      </span>
                    </div>
                    <div className="h-8 w-px bg-slate-800" />
                    <div>
                      <span className="text-2xl font-black text-emerald-400">
                        {completedCount}/{totalGames}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-bold">
                        Completed
                      </span>
                    </div>
                  </div>
                  {firstAttemptTotalCount > 0 && (
                    <button
                      onClick={handleResetProgress}
                      className="text-[10px] text-red-400 hover:text-red-300 underline font-semibold mt-1 transition"
                    >
                      Reset Practice Data
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Five Games Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <span>🎮</span>
                  <span>Choose Any Challenge to Begin (1 to 5)</span>
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  Tap card to play • Retries allowed
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CLINICAL_GAMES.map(game => {
                  const isCompleted = progress.completed[game.id] === true;
                  const firstScore = progress.firstAttemptScores[game.id];
                  const attempts = progress.attemptsCount[game.id] || 0;

                  return (
                    <div
                      key={game.id}
                      onClick={() => handleOpenGame(game.id)}
                      className={`group relative rounded-3xl p-5 border-2 transition-all duration-200 cursor-pointer text-left flex flex-col justify-between shadow-lg hover:shadow-cyan-500/10 active:scale-[0.99] ${
                        isCompleted
                          ? 'bg-slate-900/90 border-emerald-500/50 hover:border-emerald-400'
                          : 'bg-slate-900/80 border-slate-800 hover:border-cyan-400'
                      }`}
                    >
                      <div>
                        {/* Header: Number & Status Badge */}
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="w-7 h-7 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-400/40 text-xs font-black flex items-center justify-center">
                            #{game.number}
                          </span>

                          {/* Status Pill with Text & Icon */}
                          <div>
                            {firstScore === true && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-950 text-emerald-300 border border-emerald-500/50">
                                <span>🌟</span> <span>1st Try Correct</span>
                              </span>
                            )}
                            {firstScore === false && isCompleted && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-teal-950 text-teal-300 border border-teal-500/50">
                                <span>✅</span> <span>Mastered (Retry)</span>
                              </span>
                            )}
                            {firstScore === false && !isCompleted && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-950 text-rose-300 border border-rose-500/50">
                                <span>🔄</span> <span>Needs Retry</span>
                              </span>
                            )}
                            {firstScore === undefined && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                                <span>⚪</span> <span>Not Attempted</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title & Subtitle */}
                        <h3 className="text-base sm:text-lg font-black text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                          <span>{game.title}</span>
                          <span className="text-lg opacity-80 group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </h3>
                        <span className="text-xs font-bold text-cyan-400/80 block mt-0.5">
                          {game.subtitle}
                        </span>

                        <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                          {game.scenario}
                        </p>
                      </div>

                      {/* Card Footer: Tagline & Play Action */}
                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                        <span className="text-slate-400 font-bold">{game.tagline}</span>
                        <span className="font-bold text-cyan-400 group-hover:underline">
                          {isCompleted ? 'Review & Practice' : 'Start Game'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CDC Reference Links Footer Box */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-base">📚</span>
                <span>Guidance based on CDC Healthcare Infection Control Core Practices.</span>
              </div>
              <div className="flex items-center gap-3 font-bold text-cyan-400">
                <a
                  href="https://www.cdc.gov/infection-control/hcp/core-practices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  CDC Core Practices ↗
                </a>
                <span>•</span>
                <a
                  href="https://www.cdc.gov/clean-hands/hcp/clinical-safety/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Hand Hygiene ↗
                </a>
              </div>
            </div>
          </section>
        )}

        {/* VIEW 2: ACTIVE GAME PLAY VIEW */}
        {activeGameId && currentGame && (
          <section className="flex flex-col gap-5">
            {/* Breadcrumb & Navigation Bar */}
            <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-800">
              <button
                onClick={handleBackToHome}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white border border-slate-700 text-xs font-black transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <span>←</span> <span>All Challenges</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-bold">
                  Challenge {currentGame.number} of {totalGames}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[10px] font-black uppercase">
                  {currentGame.tagline}
                </span>
              </div>
            </div>

            {/* Game Card Header & Scenario */}
            <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-xl space-y-3 text-left">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                    <span>#{currentGame.number}</span>
                    <span>{currentGame.title}</span>
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-cyan-400">
                    {currentGame.subtitle}
                  </p>
                </div>

                {/* Status indicator on current active game */}
                <div>
                  {progress.completed[currentGame.id] && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-950 text-emerald-300 border border-emerald-500/50">
                      <span>✅</span> <span>Challenge Mastered</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Scenario Box */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                  <span>📋</span> <span>Clinical Scenario:</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                  {currentGame.scenario}
                </p>
              </div>

              {/* 👥 FACILITATOR HUDDLE DISCUSSION BOX (Visible in Facilitator Mode) */}
              {isFacilitatorMode && (
                <div className="p-4 rounded-2xl bg-amber-950/40 border-2 border-amber-500/60 text-amber-200 space-y-2.5">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                      <span>👥</span> <span>Shift Huddle Teaching & Facilitation Guide:</span>
                    </span>
                    <button
                      onClick={() => setShowFacilitatorReveal(!showFacilitatorReveal)}
                      className="px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/60 text-xs font-black transition active:scale-95"
                    >
                      {showFacilitatorReveal ? '🙈 Hide Answer' : '👁️ Reveal Answer'}
                    </button>
                  </div>

                  <p className="text-xs text-amber-100 font-medium leading-relaxed italic bg-amber-950/60 p-2.5 rounded-xl border border-amber-600/30">
                    {currentGame.huddleDiscussionPrompt}
                  </p>

                  {showFacilitatorReveal && (
                    <div className="pt-2 border-t border-amber-500/30 text-xs space-y-1.5">
                      <strong className="text-amber-300 block font-black">
                        Facilitator Key & Teaching Points:
                      </strong>
                      <p className="text-slate-200 text-xs leading-relaxed">
                        {currentGame.whyItMatters}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 🎮 SPECIFIC GAMEPLAY INTERFACES (GAMES 1 TO 5) 🎮 */}
            <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5 text-left">
              {/* GAME 1: THE GLOVE TRAP (REORDER CARDS) */}
              {currentGame.id === 'glove-trap' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <span>🧤</span>
                      <span>Put the three steps in the correct clinical order:</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Use Move Up (⬆️) / Down (⬇️) buttons or keyboard
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {gloveCardsOrder.map((cardId, index) => {
                      const cardObj = currentGame.cards.find(c => c.id === cardId);
                      if (!cardObj) return null;
                      return (
                        <div
                          key={cardId}
                          className="flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-950 border-2 border-cyan-500/30 shadow-md transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-xl bg-cyan-900/60 text-cyan-300 border border-cyan-400/40 text-xs font-black flex items-center justify-center flex-shrink-0">
                              Step {index + 1}
                            </span>
                            <span className="text-xl sm:text-2xl">{cardObj.icon}</span>
                            <span className="text-xs sm:text-sm font-bold text-white">
                              {cardObj.text}
                            </span>
                          </div>

                          {/* Reorder Buttons (Touch & Keyboard friendly) */}
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button
                              onClick={() => moveGloveCard(index, 'up')}
                              disabled={index === 0}
                              aria-label={`Move ${cardObj.text} up`}
                              className={`p-2 rounded-xl text-xs font-black border transition ${
                                index === 0
                                  ? 'opacity-30 border-slate-800 text-slate-600 cursor-not-allowed'
                                  : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border-slate-700 active:scale-95'
                              }`}
                            >
                              ⬆️ Up
                            </button>
                            <button
                              onClick={() => moveGloveCard(index, 'down')}
                              disabled={index === gloveCardsOrder.length - 1}
                              aria-label={`Move ${cardObj.text} down`}
                              className={`p-2 rounded-xl text-xs font-black border transition ${
                                index === gloveCardsOrder.length - 1
                                  ? 'opacity-30 border-slate-800 text-slate-600 cursor-not-allowed'
                                  : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border-slate-700 active:scale-95'
                              }`}
                            >
                              ⬇️ Down
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* GAME 2: THE TRAVELING CUFF (FIND TWO CHECKPOINTS) */}
              {currentGame.id === 'traveling-cuff' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <span>🩺</span>
                      <span>Select the TWO checkpoints where cleaning & disinfection must occur:</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Cuff path: Patient A (Room 101) → Patient B (Room 103) → Clean Storage
                    </span>
                  </div>

                  {/* Pathway Visual Map */}
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-center overflow-x-auto gap-2">
                    {currentGame.steps.map((st, i) => (
                      <React.Fragment key={st.id}>
                        <div className="flex flex-col items-center min-w-[90px] p-2 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-2xl">{st.icon}</span>
                          <span className="text-xs font-bold text-white mt-1">{st.label}</span>
                          <span className="text-[9px] text-slate-400">{st.location}</span>
                        </div>
                        {i < currentGame.steps.length - 1 && (
                          <div className="text-cyan-400 font-black text-lg px-1 animate-pulse">
                            ➔
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Checkpoints list to toggle */}
                  <div className="grid grid-cols-1 gap-2.5">
                    {currentGame.checkpoints.map(cp => {
                      const isSelected = selectedCheckpoints.includes(cp.id);
                      return (
                        <button
                          key={cp.id}
                          onClick={() =>
                            toggleMultiSelect(selectedCheckpoints, setSelectedCheckpoints, cp.id, 2)
                          }
                          aria-pressed={isSelected}
                          className={`p-3.5 rounded-2xl border-2 text-left transition flex items-start gap-3 active:scale-[0.99] ${
                            isSelected
                              ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-md'
                              : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="text-xl flex-shrink-0 mt-0.5">
                            {isSelected ? '☑️' : '⬜'}
                          </span>
                          <div>
                            <span className="font-bold text-xs sm:text-sm block text-white">
                              {cp.label}
                            </span>
                            <span className="text-[11px] text-slate-400 block mt-0.5">
                              {cp.description}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* GAME 3: THE NEW NEEDLE (SPOT TWO SAFETY PROBLEMS) */}
              {currentGame.id === 'new-needle' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <span>💉</span>
                      <span>{currentGame.question}</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Scenario violation: Reusing syringe barrel with a fresh needle into a shared vial
                    </span>
                  </div>

                  {/* 4 Choices */}
                  <div className="grid grid-cols-1 gap-2.5">
                    {currentGame.choices.map(c => {
                      const isSelected = selectedNeedleProblems.includes(c.id);
                      return (
                        <button
                          key={c.id}
                          onClick={() =>
                            toggleMultiSelect(selectedNeedleProblems, setSelectedNeedleProblems, c.id, 2)
                          }
                          aria-pressed={isSelected}
                          className={`p-3.5 rounded-2xl border-2 text-left transition flex items-start gap-3 active:scale-[0.99] ${
                            isSelected
                              ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-md'
                              : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="text-xl flex-shrink-0 mt-0.5">
                            {isSelected ? '☑️' : '⬜'}
                          </span>
                          <span className="text-xs sm:text-sm font-bold leading-snug">
                            {c.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* GAME 4: THE 30-SECOND SHORTCUT (MAKE NEXT MOVE) */}
              {currentGame.id === 'shortcut-30s' && (
                <div className="space-y-4">
                  {/* Simulated Disinfectant Product Label Box */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-950 to-cyan-950 border-2 border-teal-400/60 shadow-lg space-y-2">
                    <div className="flex items-center justify-between gap-2 border-b border-teal-500/30 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🧴</span>
                        <div>
                          <span className="text-xs font-black uppercase tracking-wider text-teal-300 block">
                            Hospital Disinfectant Wipe Canister Label
                          </span>
                          <span className="text-[10px] text-slate-300 font-mono">
                            {currentGame.productName}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-rose-500/30 border border-rose-400 text-rose-300">
                        EPA Registered
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-black/40 border border-teal-400/30 flex items-center justify-between text-xs font-bold text-white">
                      <span>REQUIRED WET CONTACT TIME:</span>
                      <span className="font-mono text-amber-300 text-sm font-black animate-pulse">
                        2 MINUTES VISIBLY WET (120 SECONDS)
                      </span>
                    </div>
                  </div>

                  {/* Simulated Visual Timeline (Dries at 30 seconds) */}
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-cyan-400">💧 Wiped: 0s (Wet)</span>
                      <span className="text-rose-400 font-black">☀️ DRIED OUT AT 30s!</span>
                      <span className="text-slate-400">Target: 2 Min (120s)</span>
                    </div>

                    {/* Timeline Bar */}
                    <div className="w-full h-5 rounded-full bg-slate-800 overflow-hidden relative flex">
                      <div
                        style={{ width: '25%' }}
                        className="h-full bg-gradient-to-r from-teal-500 to-amber-500 flex items-center justify-center text-[10px] font-black text-black"
                        title="30s Elapsed - Surface Evaporated"
                      >
                        30s Wet
                      </div>
                      <div
                        style={{ width: '75%' }}
                        className="h-full bg-rose-950/60 border-l-2 border-dashed border-rose-500 flex items-center justify-center text-[10px] font-bold text-rose-300"
                        title="Surface prematurely dry!"
                      >
                        Surface Dried Early (Disinfection Incomplete)
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 text-center font-medium">
                      ⚠️ Note: This timeline is a visual aid so you don't have to wait 2 real minutes.
                    </p>
                  </div>

                  {/* Question and Choices */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-300 block">
                      {currentGame.question}
                    </label>

                    <div className="grid grid-cols-1 gap-2.5">
                      {currentGame.choices.map(c => {
                        const isSelected = selectedShortcutChoice === c.id;
                        return (
                          <button
                            key={c.id}
                            onClick={() => {
                              if (isAnswerChecked) setIsAnswerChecked(false);
                              setSelectedShortcutChoice(c.id);
                            }}
                            aria-pressed={isSelected}
                            className={`p-3.5 rounded-2xl border-2 text-left transition flex items-start gap-3 active:scale-[0.99] ${
                              isSelected
                                ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-md'
                                : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                            }`}
                          >
                            <span className="text-xl flex-shrink-0 mt-0.5">
                              {isSelected ? '🔘' : '⚪'}
                            </span>
                            <span className="text-xs sm:text-sm font-bold leading-snug">
                              {c.text}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* GAME 5: THE WAITING-ROOM CLUE (CHOOSE THREE ACTIONS) */}
              {currentGame.id === 'waiting-room' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <span>😷</span>
                      <span>{currentGame.question}</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Patient coughing into bare hands at crowded reception desk (Pick 3)
                    </span>
                  </div>

                  {/* 6 Choices */}
                  <div className="grid grid-cols-1 gap-2.5">
                    {currentGame.choices.map(c => {
                      const isSelected = selectedWaitingRoomActions.includes(c.id);
                      return (
                        <button
                          key={c.id}
                          onClick={() =>
                            toggleMultiSelect(
                              selectedWaitingRoomActions,
                              setSelectedWaitingRoomActions,
                              c.id,
                              3
                            )
                          }
                          aria-pressed={isSelected}
                          className={`p-3.5 rounded-2xl border-2 text-left transition flex items-start gap-3 active:scale-[0.99] ${
                            isSelected
                              ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-md'
                              : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="text-xl flex-shrink-0 mt-0.5">
                            {isSelected ? '☑️' : '⬜'}
                          </span>
                          <span className="text-xs sm:text-sm font-bold leading-snug">
                            {c.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 🔘 CHECK ANSWER ACTION BAR 🔘 */}
              <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
                <button
                  onClick={handleCheckAnswer}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-black text-sm shadow-xl active:scale-95 transition flex items-center gap-2 cursor-pointer"
                >
                  <span>🔍</span>
                  <span>Check Answer</span>
                </button>

                {isAnswerChecked && (
                  <button
                    onClick={() => {
                      setIsAnswerChecked(false);
                      setIsCurrentCorrect(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition active:scale-95 border border-slate-700"
                  >
                    🔄 Clear & Retry
                  </button>
                )}
              </div>

              {/* 📢 IMMEDIATE FEEDBACK CARD (EXPLAINS WHY ANSWER MATTERS) 📢 */}
              {isAnswerChecked && (
                <div
                  className={`p-5 rounded-3xl border-2 shadow-2xl transition-all space-y-4 ${
                    isCurrentCorrect
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-100'
                      : 'bg-rose-950/70 border-rose-500 text-rose-100'
                  }`}
                  role="alert"
                >
                  {/* Status Banner with Icon and Text */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${
                        isCurrentCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}
                    >
                      {isCurrentCorrect ? '✅' : '❌'}
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-black tracking-tight">
                        {isCurrentCorrect
                          ? 'CORRECT! Challenge Mastered.'
                          : 'INCORRECT OR INCOMPLETE — Needs Review'}
                      </h4>
                      <p className="text-xs opacity-90 font-medium">
                        {isCurrentCorrect
                          ? 'Outstanding clinical decision-making adhering to CDC guidelines.'
                          : 'Review the rationale below and try again to cement your clinical knowledge.'}
                      </p>
                    </div>
                  </div>

                  {/* Why it Matters Detailed Clinical Explanation */}
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5 text-left">
                    <span className="text-xs font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                      <span>💡</span> <span>Why This Answer Matters:</span>
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      {currentGame.whyItMatters}
                    </p>
                  </div>

                  {/* Direct CDC Guidance Links */}
                  <div className="pt-2 border-t border-white/10 space-y-1.5">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                      Official CDC Guidance References:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentGame.cdcLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/40 text-xs font-bold transition shadow-sm"
                        >
                          <span>📖</span>
                          <span>{link.label} ↗</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Navigation to next challenge or menu */}
                  <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
                    <button
                      onClick={handleBackToHome}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold border border-slate-700 transition"
                    >
                      ← Back to All Challenges
                    </button>

                    {currentGame.number < totalGames && (
                      <button
                        onClick={() => {
                          const nextGame = CLINICAL_GAMES.find(g => g.number === currentGame.number + 1);
                          if (nextGame) handleOpenGame(nextGame.id);
                        }}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-black text-xs shadow-md transition active:scale-95 flex items-center gap-1.5"
                      >
                        <span>Next Challenge (#{currentGame.number + 1})</span>
                        <span>➔</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* 🦶 APPLICATION FOOTER 🦶 */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-900/60 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            IPC Challenge • Mobile-Friendly Clinical Education Tool
          </span>
          <div className="flex items-center gap-2 font-medium">
            <span>Client-Side App</span>
            <span>•</span>
            <span>No Patient Data</span>
            <span>•</span>
            <button
              onClick={handleResetProgress}
              className="text-red-400 hover:underline"
            >
              Reset Data
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
