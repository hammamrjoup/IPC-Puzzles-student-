/**
 * IPC Training Puzzles - Module 5 Engine: أكمل الحزمة | HAI Bundle Challenge
 * Developed by: Hammam Jubran Rjoup / MSN, CPIC
 * Content Review Date: 18 نوفمبر 2026
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. SOUND SYNTHESIZER (WEB AUDIO API - ZERO EXTERNAL ASSET DEPENDENCY)
  // =========================================================================
  class HaiSoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = localStorage.getItem('hai_bundle_sound_enabled') !== 'false';
      this.volume = parseFloat(localStorage.getItem('hai_bundle_sound_volume') || '0.7');
      this.lastPlayTime = 0;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle(enable) {
      this.enabled = enable !== undefined ? enable : !this.enabled;
      localStorage.setItem('hai_bundle_sound_enabled', this.enabled ? 'true' : 'false');
      return this.enabled;
    }

    setVolume(val) {
      this.volume = Math.max(0, Math.min(1, val));
      localStorage.setItem('hai_bundle_sound_volume', this.volume.toString());
    }

    // Soft click upon tool selection / snapping
    playToolSnap() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        if (now - this.lastPlayTime < 0.05) return;
        this.lastPlayTime = now;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.06);

        gain.gain.setValueAtTime(0.3 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } catch (e) {}
    }

    // Ascending pleasant chord on correct decision
    playCorrectChime() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        // C5, E5, G5, C6 ascending arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const t = now + idx * 0.06;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.35 * this.volume, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.3);
        });
      } catch (e) {}
    }

    // Gentle quiet low tone on retry needed (non-punitive, distinct from medical alarms)
    playRetryTone() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const notes = [380, 310];
        notes.forEach((freq, idx) => {
          const t = now + idx * 0.1;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.25 * this.volume, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.25);
        });
      } catch (e) {}
    }

    // Celebratory short fanfare upon station/bundle completion
    playStationFanfare() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        // G4, C5, E5, G5, C6 victory progression
        const notes = [
          { f: 392.0, d: 0.1 },
          { f: 523.25, d: 0.1 },
          { f: 659.25, d: 0.12 },
          { f: 783.99, d: 0.15 },
          { f: 1046.5, d: 0.45 }
        ];
        let offset = 0;
        notes.forEach(n => {
          const t = now + offset;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(n.f, t);
          gain.gain.setValueAtTime(0.4 * this.volume, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + n.d);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + n.d + 0.05);
          offset += n.d * 0.85;
        });
      } catch (e) {}
    }
  }

  const soundEngine = new HaiSoundEngine();

  // =========================================================================
  // 2. STATE & CONFIGURATION
  // =========================================================================
  const STORAGE_KEYS = {
    SEEN_IDS: 'hai_bundle_seen_ids',
    ACTIVE_SESSION: 'hai_bundle_active_session',
    REDUCED_MOTION: 'hai_bundle_reduced_motion',
    CUSTOM_SETTINGS: 'hai_bundle_custom_settings'
  };

  const STATIONS = {
    CLABSI: {
      id: 'CLABSI',
      code: 'CLABSI',
      nameAr: 'عدوى مجرى الدم المرتبطة بالقسطرة المركزية',
      nameEn: 'Central Line-Associated Bloodstream Infection',
      shortName: 'CLABSI',
      icon: '🩸',
      badgeColor: 'cyan',
      themeClasses: 'border-cyan-400 text-cyan-300 bg-cyan-950/40',
      sourcesText: 'C1 (WHO 2026), C2 (CDC)'
    },
    CAUTI: {
      id: 'CAUTI',
      code: 'CAUTI',
      nameAr: 'عدوى المسالك البولية المرتبطة بالقسطرة',
      nameEn: 'Catheter-Associated Urinary Tract Infection',
      shortName: 'CAUTI',
      icon: '💧',
      badgeColor: 'amber',
      themeClasses: 'border-amber-400 text-amber-300 bg-amber-950/40',
      sourcesText: 'U1 (CDC 2009/online), U2 (CDC 2025)'
    },
    VAP: {
      id: 'VAP',
      code: 'VAP',
      nameAr: 'الالتهاب الرئوي المرتبط بالتهوية الميكانيكية',
      nameEn: 'Ventilator-Associated Pneumonia / VAE',
      shortName: 'VAP',
      icon: '🫁',
      badgeColor: 'teal',
      themeClasses: 'border-teal-400 text-teal-300 bg-teal-950/40',
      sourcesText: 'V1 (SHEA 2022 / CDC Stacks)'
    },
    SSI: {
      id: 'SSI',
      code: 'SSI',
      nameAr: 'عدوى موضع الجراحة',
      nameEn: 'Surgical Site Infection',
      shortName: 'SSI',
      icon: '🩹',
      badgeColor: 'emerald',
      themeClasses: 'border-emerald-400 text-emerald-300 bg-emerald-950/40',
      sourcesText: 'S1 (WHO 2018), S2 (CDC 2017)'
    }
  };

  // Active game session model
  let session = {
    isRunning: false,
    isPaused: false,
    isCompleted: false,
    mode: 'quick', // 'quick', 'custom', 'all'
    cases: [],
    currentIndex: 0,
    timeRemaining: 540, // 9 mins default (between 8-10)
    timerInterval: null,
    answers: {}, // caseId -> { firstAttemptCorrect: boolean, attempts: number, chosenOptionId: string, isSkipped: boolean }
    multiStepProgress: {}, // caseId -> { bagLowered: boolean, kinkUntwisted: boolean, bedAngleAdjusted: boolean, ... }
    badgesEarned: {
      eagleEye: false, // عين المراقب: awarded on finding and explaining error in spot_error
      bundleMastered: false // أكملت التصحيح: awarded on completing all steps in multi-step task
    },
    shieldStationsCompleted: {
      CLABSI: false,
      CAUTI: false,
      VAP: false,
      SSI: false
    },
    cycleRestartNotified: false
  };

  let reducedMotion = localStorage.getItem(STORAGE_KEYS.REDUCED_MOTION) === 'true';

  // =========================================================================
  // 3. SEEN CASES ROTATION & CASE SAMPLING
  // =========================================================================
  function getSeenIds() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SEEN_IDS) || '[]');
    } catch (e) {
      return [];
    }
  }

  function markCaseSeen(caseId) {
    const seen = getSeenIds();
    if (!seen.includes(caseId)) {
      seen.push(caseId);
      localStorage.setItem(STORAGE_KEYS.SEEN_IDS, JSON.stringify(seen));
    }
  }

  function resetSeenCycle() {
    localStorage.removeItem(STORAGE_KEYS.SEEN_IDS);
  }

  /**
   * Sample cases prioritizing unseen cases.
   * For Quick Round: exactly 2 cases from each of the 4 stations (8 cases total).
   */
  function sampleCases(stationCodes = ['CLABSI', 'CAUTI', 'VAP', 'SSI'], countPerStation = 2, totalMax = 8) {
    const allCases = window.HAI_BUNDLE_CASES || [];
    const seenIds = new Set(getSeenIds());
    let selectedCases = [];
    let cycleResetOccurred = false;

    // Check if available unseen cases in chosen stations are exhausted
    let totalAvailableUnseen = 0;
    stationCodes.forEach(code => {
      const stationPool = allCases.filter(c => c.bundle === code);
      const unseenInStation = stationPool.filter(c => !seenIds.has(c.id));
      totalAvailableUnseen += unseenInStation.length;
    });

    if (totalAvailableUnseen < stationCodes.length * countPerStation) {
      // Inventory exhausted! Restart cycle and notify
      resetSeenCycle();
      seenIds.clear();
      cycleResetOccurred = true;
    }

    stationCodes.forEach(code => {
      const stationPool = allCases.filter(c => c.bundle === code);
      const unseen = stationPool.filter(c => !seenIds.has(c.id));
      const seen = stationPool.filter(c => seenIds.has(c.id));

      // Shuffle pools
      const shuffledUnseen = [...unseen].sort(() => Math.random() - 0.5);
      const shuffledSeen = [...seen].sort(() => Math.random() - 0.5);

      const needed = countPerStation;
      const fromUnseen = shuffledUnseen.slice(0, needed);
      const remainingNeeded = needed - fromUnseen.length;
      const fromSeen = remainingNeeded > 0 ? shuffledSeen.slice(0, remainingNeeded) : [];

      selectedCases.push(...fromUnseen, ...fromSeen);
    });

    // Shuffle across stations to create a balanced dynamic game flow
    selectedCases.sort(() => Math.random() - 0.5);

    if (totalMax && selectedCases.length > totalMax) {
      selectedCases = selectedCases.slice(0, totalMax);
    }

    return { cases: selectedCases, cycleResetOccurred };
  }

  // =========================================================================
  // 4. STORAGE PERSISTENCE (RESUME ON RELOAD)
  // =========================================================================
  function saveActiveSession() {
    if (!session.isRunning || session.isCompleted) {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
      return;
    }
    const stateToSave = {
      mode: session.mode,
      cases: session.cases,
      currentIndex: session.currentIndex,
      timeRemaining: session.timeRemaining,
      answers: session.answers,
      multiStepProgress: session.multiStepProgress,
      badgesEarned: session.badgesEarned,
      shieldStationsCompleted: session.shieldStationsCompleted,
      cycleRestartNotified: session.cycleRestartNotified
    };
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(stateToSave));
  }

  function tryRestoreSession() {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
    if (!raw) return false;
    try {
      const saved = JSON.parse(raw);
      if (saved && Array.isArray(saved.cases) && saved.cases.length > 0 && saved.currentIndex < saved.cases.length) {
        session.isRunning = true;
        session.isPaused = false;
        session.isCompleted = false;
        session.mode = saved.mode || 'quick';
        session.cases = saved.cases;
        session.currentIndex = saved.currentIndex || 0;
        session.timeRemaining = typeof saved.timeRemaining === 'number' ? saved.timeRemaining : 540;
        session.answers = saved.answers || {};
        session.multiStepProgress = saved.multiStepProgress || {};
        session.badgesEarned = saved.badgesEarned || { eagleEye: false, bundleMastered: false };
        session.shieldStationsCompleted = saved.shieldStationsCompleted || { CLABSI: false, CAUTI: false, VAP: false, SSI: false };
        session.cycleRestartNotified = !!saved.cycleRestartNotified;
        return true;
      }
    } catch (e) {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
    }
    return false;
  }

  function clearActiveSession() {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
    if (session.timerInterval) clearInterval(session.timerInterval);
    session.isRunning = false;
    session.isPaused = false;
    session.isCompleted = false;
  }

  // =========================================================================
  // 5. INTERACTIVE SVG ROOM SCENES GENERATORS
  // =========================================================================
  
  /**
   * CLABSI Scene: Oncology room with PICC/CVC dressing, IV infusion line, and access Hub.
   * Clicking on the Hub zooms in to show a close-up where user scrubs the hub.
   */
  function renderClabsiSceneSvg(caseObj, isZoomed = false) {
    const isLoose = caseObj.sceneObject === 'dressing_loose';
    const isWet = caseObj.sceneObject === 'dressing_wet';
    const isOozing = caseObj.sceneObject === 'oozing_site';
    const isHub = caseObj.sceneObject === 'hub' || isZoomed;
    const isSmallDrape = caseObj.sceneObject === 'drape';

    if (isZoomed) {
      // Magnified Close-Up on Needleless Access Hub & Dressing Site
      return `
        <div class="relative w-full h-[260px] sm:h-[300px] bg-gradient-to-b from-slate-900 via-[#071f38] to-slate-950 rounded-2xl border-2 border-cyan-400/80 p-3 flex flex-col items-center justify-between overflow-hidden shadow-inner">
          <div class="w-full flex items-center justify-between text-xs px-2">
            <span class="px-2 py-0.5 rounded-full bg-cyan-900/80 border border-cyan-400 text-cyan-200 font-bold flex items-center gap-1">
              <span>🔍</span> <span>لقطة مكبّرة: منفذ الوصول الوريدي وغيار القسطرة</span>
            </span>
            <button onclick="window.HaiBundleEngine.toggleSceneZoom(false)" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition flex items-center gap-1">
              <span>✕</span> <span>تصغير المشهد</span>
            </button>
          </div>

          <svg viewBox="0 0 400 200" class="w-full max-w-[380px] h-[190px] drop-shadow-lg select-none">
            <!-- Lumen Tube -->
            <path d="M 50 100 Q 150 100 220 100" stroke="#0ea5e9" stroke-width="14" fill="none" stroke-linecap="round" />
            <path d="M 50 100 Q 150 100 220 100" stroke="#bae6fd" stroke-width="6" fill="none" stroke-linecap="round" />
            
            <!-- Clamp -->
            <rect x="110" y="80" width="24" height="40" rx="4" fill="#ef4444" stroke="#7f1d1d" stroke-width="2" />
            
            <!-- Needleless Connector (Hub) -->
            <g class="cursor-pointer transition-transform hover:scale-105" onclick="window.HaiBundleEngine.interactSceneElement('hub')" tabindex="0" role="button" aria-label="منفذ القسطرة">
              <rect x="220" y="82" width="60" height="36" rx="6" fill="#0284c7" stroke="#38bdf8" stroke-width="3" />
              <!-- Threaded connection tip -->
              <rect x="280" y="87" width="22" height="26" rx="3" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2" />
              <!-- Diaphragm septum tip -->
              <circle cx="302" cy="100" r="10" fill="#e2e8f0" stroke="#0284c7" stroke-width="2.5" />
              <!-- Scrubbing antiseptic icon -->
              <circle cx="302" cy="100" r="5" fill="#f59e0b" class="animate-ping" opacity="0.6" />
            </g>

            <!-- Label -->
            <text x="250" y="145" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">منفذ الوصول (Hub)</text>
            <text x="250" y="162" fill="#94a3b8" font-size="10" text-anchor="middle">فرك المنفذ 15 ثانية بكحول 70% وتركه يجف</text>
          </svg>

          <div class="text-[11px] text-cyan-200 bg-cyan-950/70 border border-cyan-500/40 px-3 py-1 rounded-xl flex items-center gap-1.5">
            <span>💡</span> <span>انقر على منفذ الوصول لفركه بالمطهر (Scrub the Hub) أو حدد الإجراء المطلوب بالأسفل.</span>
          </div>
        </div>
      `;
    }

    // Default Overview Scene
    return `
      <div class="relative w-full h-[220px] sm:h-[260px] bg-gradient-to-b from-slate-950 via-[#031c38] to-[#011224] rounded-2xl border border-cyan-500/40 p-2 sm:p-3 overflow-hidden shadow-md flex flex-col justify-between">
        <!-- Room Scene Header -->
        <div class="flex items-center justify-between text-xs px-1">
          <div class="flex items-center gap-1.5 text-cyan-300 font-bold">
            <span class="text-base">🏥</span>
            <span>غرفة أورام — عناية القسطرة المركزية | Oncology Line Station</span>
          </div>
          <button onclick="window.HaiBundleEngine.toggleSceneZoom(true)" class="px-2.5 py-1 rounded-lg bg-cyan-900/60 hover:bg-cyan-800 text-cyan-200 border border-cyan-400 text-[11px] font-bold transition flex items-center gap-1 shadow-sm">
            <span>🔍</span> <span>تكبير المنفذ</span>
          </button>
        </div>

        <!-- Room Scene SVG -->
        <svg viewBox="0 0 500 200" class="w-full h-[155px] sm:h-[180px] drop-shadow-md select-none mx-auto">
          <!-- Patient Hospital Bed -->
          <rect x="50" y="110" width="260" height="60" rx="8" fill="#1e293b" stroke="#334155" stroke-width="2" />
          <path d="M 50 140 L 40 185 M 310 140 L 320 185" stroke="#475569" stroke-width="5" stroke-linecap="round" />
          <!-- Mattress & Pillow -->
          <rect x="55" y="100" width="250" height="20" rx="6" fill="#38bdf8" opacity="0.3" />
          <rect x="65" y="85" width="45" height="22" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
          
          <!-- Patient Silhouette (Torso & Head) -->
          <circle cx="85" cy="80" r="14" fill="#fde047" opacity="0.8" />
          <path d="M 85 95 Q 140 100 180 115" stroke="#f8fafc" stroke-width="16" stroke-linecap="round" fill="none" opacity="0.85" />

          <!-- Drape in case CLABSI-01 -->
          ${isSmallDrape ? `
            <rect x="110" y="88" width="50" height="40" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3,3" />
            <text x="135" y="112" fill="#f8fafc" font-size="8" font-weight="black" text-anchor="middle">غطاء صغير ⚠️</text>
          ` : `
            <rect x="60" y="85" width="230" height="65" rx="6" fill="#0284c7" opacity="0.25" stroke="#38bdf8" stroke-width="1" />
            <text x="175" y="130" fill="#bae6fd" font-size="8" text-anchor="middle">غطاء معقم لكامل الجسم (Full Drape)</text>
          `}

          <!-- Central Line Dressing Site -->
          <g class="cursor-pointer" onclick="window.HaiBundleEngine.toggleSceneZoom(true)" tabindex="0" role="button">
            <rect x="135" y="92" width="34" height="26" rx="4" fill="${isWet ? '#38bdf8' : (isOozing ? '#f43f5e' : '#f8fafc')}" opacity="${isWet ? '0.7' : '0.9'}" stroke="${isLoose ? '#f59e0b' : '#0ea5e9'}" stroke-width="2" />
            <!-- Insertion dot -->
            <circle cx="152" cy="105" r="3" fill="#ef4444" />
            ${isLoose ? '<path d="M 135 92 L 142 85" stroke="#f59e0b" stroke-width="2.5" />' : ''}
            ${isWet ? '<text x="152" y="115" fill="#0369a1" font-size="7" font-weight="bold" text-anchor="middle">مبتل 💧</text>' : ''}
            ${isOozing ? '<text x="152" y="115" fill="#881337" font-size="7" font-weight="bold" text-anchor="middle">ينز 🩸</text>' : ''}
          </g>

          <!-- IV Line to Pole -->
          <path d="M 152 105 Q 230 70 360 55" stroke="#38bdf8" stroke-width="3" fill="none" stroke-linecap="round" />
          
          <!-- Needleless Port (Hub) along line -->
          <g class="cursor-pointer group" onclick="window.HaiBundleEngine.toggleSceneZoom(true)" tabindex="0" role="button">
            <circle cx="260" cy="80" r="10" fill="#0284c7" stroke="#bae6fd" stroke-width="2" />
            <circle cx="260" cy="80" r="4" fill="#f8fafc" />
            <text x="260" y="70" fill="#38bdf8" font-size="8" font-weight="bold" text-anchor="middle">المنفذ 🔍</text>
          </g>

          <!-- IV Stand & Infusion Bag -->
          <line x1="360" y1="20" x2="360" y2="185" stroke="#94a3b8" stroke-width="4" stroke-linecap="round" />
          <path d="M 345 25 L 360 20 L 375 25" stroke="#cbd5e1" stroke-width="3" fill="none" />
          <rect x="348" y="26" width="24" height="35" rx="5" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5" />
          <rect x="351" y="32" width="18" height="24" rx="2" fill="#0ea5e9" opacity="0.4" />
          
          <!-- Prep Tray on Table -->
          <rect x="395" y="125" width="85" height="50" rx="6" fill="#1e293b" stroke="#475569" stroke-width="2" />
          <line x1="437" y1="175" x2="437" y2="195" stroke="#64748b" stroke-width="5" />
          <!-- Bottles on Tray -->
          <rect x="405" y="112" width="14" height="20" rx="2" fill="#f59e0b" stroke="#d97706" />
          <rect x="425" y="114" width="12" height="18" rx="2" fill="#0284c7" stroke="#0369a1" />
          <text x="437" y="145" fill="#cbd5e1" font-size="8" text-anchor="middle">طاولة التطهير</text>
        </svg>

        <div class="flex items-center justify-between text-[11px] text-cyan-200 bg-cyan-950/60 px-2 py-0.5 rounded-lg">
          <span>🎯 افحص موقع القسطرة والضماد أو اضغط على «تكبير المنفذ» للتحقق المباشر.</span>
          <span class="text-cyan-400 font-bold">${caseObj.id}</span>
        </div>
      </div>
    `;
  }

  /**
   * CAUTI Scene: Anatomical Bladder, Foley Catheter, Continuous Drainage Path, and Collection Bag.
   * Fully supports interactive multi-step corrections:
   * - Lowering bag (below bladder level)
   * - Untwisting/straightening kinked tubing under thigh
   * Allows fixing either in any order!
   */
  function renderCautiSceneSvg(caseObj) {
    const p = session.multiStepProgress[caseObj.id] || {};
    // Check if bag is lowered or still high
    const isBagHigh = caseObj.sceneObject === 'bag_height' && !p.bagLowered;
    const isTouchingFloor = caseObj.sceneObject === 'bag_on_floor' && !p.bagHanging;
    // Check if tube is kinked
    const isKinked = (caseObj.sceneObject === 'tubing_kink' || caseObj.id === 'CAUTI-21' || (caseObj.multiStep && caseObj.stepId === 'untwist_kink')) && !p.kinkUntwisted;
    
    // Bag coordinates based on state
    // Normal correct: bag hanging below bladder (y: 110-145)
    // High: bag above bladder level (y: 35-70)
    // Floor: bag on floor (y: 155-190)
    let bagY = 115;
    let bagStatusLabel = 'تحت مستوى المثانة (سليم ✓)';
    let bagStatusColor = '#10b981';

    if (isBagHigh) {
      bagY = 40;
      bagStatusLabel = 'مرتفع فوق مستوى المثانة ⚠️';
      bagStatusColor = '#ef4444';
    } else if (isTouchingFloor) {
      bagY = 158;
      bagStatusLabel = 'ملامس للأرضية ⚠️';
      bagStatusColor = '#f59e0b';
    }

    return `
      <div class="relative w-full h-[250px] sm:h-[280px] bg-gradient-to-b from-slate-950 via-[#261c02] to-[#120c01] rounded-2xl border border-amber-500/50 p-2 sm:p-3 overflow-hidden shadow-md flex flex-col justify-between">
        <!-- Scene Header -->
        <div class="flex items-center justify-between text-xs px-1">
          <div class="flex items-center gap-1.5 text-amber-300 font-bold">
            <span class="text-base">💧</span>
            <span>منظومة القسطرة وتصريف البول | Closed Urinary Drainage Station</span>
          </div>
          <!-- Multi-step Indicator Pills -->
          <div class="flex items-center gap-1.5">
            ${isBagHigh ? `
              <button onclick="window.HaiBundleEngine.interactSceneElement('lower_bag')" class="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-[11px] shadow animate-bounce flex items-center gap-1">
                <span>⬇️</span> <span>اخفض الكيس</span>
              </button>
            ` : ''}
            ${isKinked ? `
              <button onclick="window.HaiBundleEngine.interactSceneElement('untwist_kink')" class="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-[11px] shadow animate-bounce flex items-center gap-1">
                <span>🔄</span> <span>حرّر انثناء الأنبوب</span>
              </button>
            ` : ''}
          </div>
        </div>

        <!-- SVG Arena -->
        <svg viewBox="0 0 500 200" class="w-full h-[180px] sm:h-[200px] drop-shadow-md select-none mx-auto">
          <!-- Hospital Bed Frame -->
          <rect x="70" y="60" width="280" height="70" rx="8" fill="#1e293b" stroke="#334155" stroke-width="2" />
          <path d="M 70 95 L 60 170 M 350 95 L 360 170" stroke="#475569" stroke-width="5" stroke-linecap="round" />
          
          <!-- Bed Rail & Level Guideline (Bladder Reference Line) -->
          <line x1="40" y1="80" x2="460" y2="80" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.6" />
          <text x="455" y="74" fill="#fbbf24" font-size="9" text-anchor="end">مستوى المثانة (Reference Line)</text>

          <!-- Patient Body Silhouette & Bladder -->
          <path d="M 80 85 Q 150 70 240 85" stroke="#e2e8f0" stroke-width="26" stroke-linecap="round" fill="none" opacity="0.3" />
          
          <!-- Anatomical Bladder Contour -->
          <g transform="translate(130, 60)">
            <ellipse cx="25" cy="20" rx="20" ry="16" fill="#fef08a" opacity="0.35" stroke="#f59e0b" stroke-width="2" />
            <path d="M 12 24 Q 25 32 38 24" fill="#fbbf24" opacity="0.7" />
            <text x="25" y="18" fill="#92400e" font-size="8" font-weight="black" text-anchor="middle">المثانة</text>
          </g>

          <!-- Foley Catheter & Securement on Thigh -->
          <path d="M 155 83 L 185 92" stroke="#ea580c" stroke-width="6" stroke-linecap="round" fill="none" />
          <!-- Securing device on thigh -->
          <rect x="180" y="87" width="14" height="10" rx="2" fill="#38bdf8" stroke="#0284c7" stroke-width="1" />

          <!-- Tubing Path (Dynamic based on kink) -->
          ${isKinked ? `
            <!-- Kinked Tubing under thigh -->
            <path d="M 195 93 Q 230 115 240 100 Q 250 85 270 105 Q 310 130 380 ${bagY + 15}" stroke="#f59e0b" stroke-width="5" fill="none" stroke-linecap="round" class="animate-pulse" />
            <circle cx="245" cy="95" r="9" fill="#ef4444" opacity="0.8" />
            <text x="245" y="99" fill="#ffffff" font-size="9" font-weight="black" text-anchor="middle">⚠️</text>
            <text x="245" y="125" fill="#ef4444" font-size="9" font-weight="bold" text-anchor="middle">أنبوب منثنٍ تحت الفخذ!</text>
          ` : `
            <!-- Straight Free-flowing Tubing -->
            <path d="M 195 93 Q 260 120 380 ${bagY + 15}" stroke="#10b981" stroke-width="5" fill="none" stroke-linecap="round" />
            <!-- Urine Flow Stream -->
            <path d="M 195 93 Q 260 120 380 ${bagY + 15}" stroke="#fef08a" stroke-width="2.5" fill="none" stroke-dasharray="6,4" class="animate-pulse" />
          `}

          <!-- Urinary Drainage Bag (Animated Position) -->
          <g transform="translate(380, ${bagY})" class="cursor-pointer transition-transform duration-500" onclick="window.HaiBundleEngine.interactSceneElement('lower_bag')" tabindex="0" role="button">
            <!-- Bag Hanger Hooks -->
            <path d="M 15 0 L 15 -10 M 35 0 L 35 -10" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />
            <!-- Bag Body -->
            <rect x="0" y="0" width="50" height="55" rx="8" fill="#1e293b" stroke="${bagStatusColor}" stroke-width="2.5" />
            <!-- Urine Fluid Level -->
            <rect x="3" y="20" width="44" height="32" rx="4" fill="#fbbf24" opacity="0.65" />
            <!-- Calibration Marks -->
            <line x1="8" y1="28" x2="16" y2="28" stroke="#ffffff" stroke-width="1.5" />
            <line x1="8" y1="36" x2="20" y2="36" stroke="#ffffff" stroke-width="1.5" />
            <line x1="8" y1="44" x2="16" y2="44" stroke="#ffffff" stroke-width="1.5" />
            <!-- Drain Spout at bottom -->
            <rect x="20" y="55" width="10" height="12" rx="2" fill="#0284c7" stroke="#38bdf8" stroke-width="1" />
            <circle cx="25" cy="67" r="2.5" fill="#ef4444" />
            <!-- Bag Status Text -->
            <text x="25" y="-14" fill="${bagStatusColor}" font-size="8" font-weight="black" text-anchor="middle">${bagStatusLabel}</text>
          </g>

          <!-- Dedicated Collection Container on Shelf -->
          <rect x="420" y="145" width="26" height="28" rx="4" fill="#334155" stroke="#64748b" stroke-width="1.5" />
          <text x="433" y="162" fill="#94a3b8" font-size="7" text-anchor="middle">وعاء تفريغ</text>
        </svg>

        <!-- Scene Footer Feedback -->
        <div class="flex items-center justify-between text-[11px] text-amber-200 bg-amber-950/70 px-2.5 py-1 rounded-xl border border-amber-500/30">
          <span>${isKinked && isBagHigh ? '⚠️ كيس فوق المثانة وأنبوب مثني؛ يُقبل تصحيح أي منهما أولاً.' : (isBagHigh ? '⚠️ الكيس مرتفع: اضغط على زر «اخفض الكيس» لخفضه تحت المثانة.' : (isKinked ? '⚠️ الأنبوب ملتف: اضغط على زر «حرّر انثناء الأنبوب» لاستعادة التدفق.' : '✓ موضع الكيس ومسار الأنبوب مستوفيان لمعايير الحزمة بالكامل.'))}</span>
          <span class="text-amber-400 font-bold">${caseObj.id}</span>
        </div>
      </div>
    `;
  }

  /**
   * VAP Scene: ICU Room with Mechanical Ventilator, Profile ICU Bed, and Digital Angle Gauge.
   * Player can adjust bed elevation from 0° up to 30-45°!
   * Shows clipboard for Sedation Target & Spontaneous Breathing Trial (SBT).
   */
  function renderVapSceneSvg(caseObj) {
    const p = session.multiStepProgress[caseObj.id] || {};
    // Angle setting: if flat case and not adjusted yet, angle is 10°
    const isFlat = (caseObj.sceneObject === 'bed_angle' || caseObj.id === 'VAP-01' || caseObj.id === 'VAP-04') && !p.bedAngleAdjusted;
    const currentAngle = isFlat ? 10 : 35; // 35 is compliant (within 30-45°)
    const angleColor = isFlat ? '#ef4444' : '#10b981';

    return `
      <div class="relative w-full h-[250px] sm:h-[280px] bg-gradient-to-b from-slate-950 via-[#012224] to-[#011417] rounded-2xl border border-teal-500/50 p-2 sm:p-3 overflow-hidden shadow-md flex flex-col justify-between">
        <!-- Scene Header -->
        <div class="flex items-center justify-between text-xs px-1">
          <div class="flex items-center gap-1.5 text-teal-300 font-bold">
            <span class="text-base">🫁</span>
            <span>وحدة العناية المركزة — حزمة التهوية الميكانيكية | ICU Ventilator Bundle</span>
          </div>
          <!-- Angle Control Button -->
          <div class="flex items-center gap-1.5">
            ${isFlat ? `
              <button onclick="window.HaiBundleEngine.interactSceneElement('adjust_bed_angle')" class="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-black text-[11px] shadow animate-bounce flex items-center gap-1">
                <span>📐</span> <span>ارفع الرأس إلى 30°–45°</span>
              </button>
            ` : `
              <span class="px-2.5 py-0.5 rounded-lg bg-emerald-950/80 border border-emerald-400 text-emerald-300 font-black text-xs flex items-center gap-1">
                <span>✓</span> <span>الزاوية ${currentAngle}° مطابقة</span>
              </span>
            `}
          </div>
        </div>

        <!-- SVG Visual Bed with Angle Pivoting -->
        <svg viewBox="0 0 500 200" class="w-full h-[180px] sm:h-[200px] drop-shadow-md select-none mx-auto">
          <!-- Floor Base -->
          <line x1="30" y1="185" x2="470" y2="185" stroke="#334155" stroke-width="2" />

          <!-- ICU Bed Chassis -->
          <rect x="80" y="140" width="220" height="25" rx="4" fill="#1e293b" stroke="#475569" stroke-width="2" />
          <line x1="120" y1="165" x2="110" y2="185" stroke="#64748b" stroke-width="5" />
          <line x1="260" y1="165" x2="270" y2="185" stroke="#64748b" stroke-width="5" />

          <!-- Bed Lower Body Section (Flat) -->
          <rect x="180" y="125" width="120" height="15" rx="3" fill="#0f766e" opacity="0.4" stroke="#14b8a6" stroke-width="1.5" />
          
          <!-- Bed Headrest Pivot Section (Pivots with angle!) -->
          <g transform="translate(180, 140) rotate(${-currentAngle}) translate(-100, -15)">
            <rect x="0" y="0" width="100" height="15" rx="3" fill="#0f766e" opacity="0.7" stroke="#14b8a6" stroke-width="2" />
            <!-- Pillow & Patient Head -->
            <rect x="5" y="-12" width="28" height="12" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
            <circle cx="20" cy="-18" r="12" fill="#fde047" opacity="0.75" />
            <path d="M 28 -12 L 80 0" stroke="#f8fafc" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.7" />
            <!-- Endotracheal Tube -->
            <path d="M 26 -16 L 36 -12" stroke="#38bdf8" stroke-width="3" />
          </g>

          <!-- Digital Angle Meter Device on Bed Rail -->
          <g transform="translate(195, 95)" class="cursor-pointer" onclick="window.HaiBundleEngine.interactSceneElement('adjust_bed_angle')">
            <rect x="0" y="0" width="55" height="38" rx="6" fill="#020617" stroke="${angleColor}" stroke-width="2" />
            <text x="27" y="15" fill="#94a3b8" font-size="8" font-weight="bold" text-anchor="middle">مؤشر الزاوية</text>
            <text x="27" y="30" fill="${angleColor}" font-size="14" font-weight="black" text-anchor="middle">${currentAngle}°</text>
          </g>

          <!-- Mechanical Ventilator Machine (Left side) -->
          <g transform="translate(25, 40)">
            <rect x="0" y="0" width="55" height="100" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2" />
            <!-- Screen with lung waves -->
            <rect x="6" y="8" width="43" height="32" rx="4" fill="#021329" stroke="#0ea5e9" stroke-width="1" />
            <path d="M 10 24 Q 18 12 24 24 T 38 24 T 46 24" stroke="#22d3ee" stroke-width="1.5" fill="none" />
            <!-- Control Knobs -->
            <circle cx="16" cy="52" r="4" fill="#64748b" />
            <circle cx="28" cy="52" r="4" fill="#64748b" />
            <circle cx="40" cy="52" r="4" fill="#64748b" />
            <!-- Ventilator Stand -->
            <line x1="27" y1="100" x2="27" y2="145" stroke="#475569" stroke-width="6" />
            <line x1="12" y1="145" x2="42" y2="145" stroke="#475569" stroke-width="4" />
          </g>

          <!-- Ventilator Breathing Circuit -->
          <path d="M 65 65 Q 90 40 105 ${125 - currentAngle * 1.5}" stroke="#38bdf8" stroke-width="4" fill="none" stroke-linecap="round" />
          <path d="M 65 75 Q 95 50 110 ${135 - currentAngle * 1.5}" stroke="#22d3ee" stroke-width="4" fill="none" stroke-linecap="round" />

          <!-- Clinical Clipboard (Sedation & Breathing Readiness) -->
          <g transform="translate(360, 45)">
            <rect x="0" y="0" width="105" height="110" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
            <rect x="25" y="-5" width="55" height="10" rx="3" fill="#475569" />
            <text x="52" y="20" fill="#0f172a" font-size="9" font-weight="black" text-anchor="middle">سجل تقييم VAP</text>
            <line x1="10" y1="26" x2="95" y2="26" stroke="#94a3b8" stroke-width="1" />
            <text x="12" y="42" fill="#334155" font-size="8">✓ رفع الرأس: ${currentAngle}°</text>
            <text x="12" y="58" fill="#334155" font-size="8">✓ تنظيف الأسنان بالفرشاة</text>
            <text x="12" y="74" fill="#334155" font-size="8">✓ خطة التهدئة (RASS)</text>
            <text x="12" y="90" fill="#334155" font-size="8">✓ تجربة التنفس (SBT)</text>
          </g>
        </svg>

        <!-- Scene Footer -->
        <div class="flex items-center justify-between text-[11px] text-teal-200 bg-teal-950/70 px-2.5 py-1 rounded-xl border border-teal-500/30">
          <span>${isFlat ? '⚠️ زاوية الرأس مسطحة (10°): يجب رفع رأس السرير إلى 30°–45° للوقاية من VAP.' : '✓ وضعية رأس السرير مطابقة (35°): تقلل خطر الاستنشاق الرئوي والارتجاع.'}</span>
          <span class="text-teal-400 font-bold">${caseObj.id}</span>
        </div>
      </div>
    `;
  }

  /**
   * SSI Scene: Operating Room Sterile Prep Table & Surgical Timing Timeline.
   * Displays clippers vs razor, alcoholic CHG prep bottles, and interactive timing cards.
   * Player can inspect timing intervals: Rx Order 07:00, Actual Infusion, Incision 08:00.
   */
  function renderSsiSceneSvg(caseObj) {
    const isHairCase = caseObj.id === 'SSI-02' || caseObj.id === 'SSI-03' || caseObj.id === 'SSI-04';
    const isTimingCase = caseObj.id === 'SSI-05' || caseObj.id === 'SSI-06' || caseObj.id === 'SSI-07' || caseObj.id === 'SSI-08' || caseObj.id === 'SSI-21' || caseObj.id === 'SSI-24';
    const isPrepCase = caseObj.id === 'SSI-13' || caseObj.id === 'SSI-14' || caseObj.id === 'SSI-15';

    return `
      <div class="relative w-full h-[250px] sm:h-[280px] bg-gradient-to-b from-slate-950 via-[#01261d] to-[#01140f] rounded-2xl border border-emerald-500/50 p-2 sm:p-3 overflow-hidden shadow-md flex flex-col justify-between">
        <!-- Scene Header -->
        <div class="flex items-center justify-between text-xs px-1">
          <div class="flex items-center gap-1.5 text-emerald-300 font-bold">
            <span class="text-base">🩹</span>
            <span>غرفة العمليات — طاولة التحضير والتوقيت الجراحي | Surgical Site Prep Station</span>
          </div>
          <span class="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-400 text-emerald-300 font-bold text-[11px]">
            WHO & CDC SSI Guidelines
          </span>
        </div>

        <!-- OR Visual SVG -->
        <svg viewBox="0 0 500 200" class="w-full h-[180px] sm:h-[200px] drop-shadow-md select-none mx-auto">
          <!-- Surgical Overhead Lamp -->
          <path d="M 220 10 L 280 10 L 290 25 L 210 25 Z" fill="#475569" stroke="#64748b" />
          <circle cx="235" cy="22" r="5" fill="#fef08a" />
          <circle cx="265" cy="22" r="5" fill="#fef08a" />
          <polygon points="210,25 290,25 360,185 140,185" fill="#fef08a" opacity="0.08" />

          <!-- Sterile OR Prep Table (Mayo Stand) -->
          <rect x="40" y="80" width="190" height="90" rx="8" fill="#1e293b" stroke="#334155" stroke-width="2" />
          <rect x="45" y="85" width="180" height="35" rx="4" fill="#0284c7" opacity="0.3" stroke="#38bdf8" stroke-width="1" />

          <!-- Prep Table Items: Clippers vs Razor -->
          <g transform="translate(55, 90)">
            <!-- Electric Clipper -->
            <rect x="0" y="2" width="35" height="18" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" />
            <line x1="30" y1="4" x2="30" y2="18" stroke="#cbd5e1" stroke-width="2" />
            <text x="17" y="32" fill="#38bdf8" font-size="8" font-weight="bold" text-anchor="middle">ماكينة قص كهربائية ✓</text>
          </g>

          <g transform="translate(135, 90)">
            <!-- Manual Razor (Disapproved) -->
            <rect x="5" y="2" width="22" height="6" rx="1" fill="#ef4444" stroke="#991b1b" stroke-width="1" />
            <line x1="16" y1="8" x2="16" y2="22" stroke="#64748b" stroke-width="3" stroke-linecap="round" />
            <text x="16" y="32" fill="#ef4444" font-size="8" font-weight="bold" text-anchor="middle">شفرة حلاقة (ممنوعة ✕)</text>
          </g>

          <!-- Skin Prep Bottles (Alcoholic CHG vs Povidone) -->
          <g transform="translate(60, 130)">
            <rect x="0" y="0" width="22" height="32" rx="3" fill="#f59e0b" stroke="#b45309" stroke-width="1.5" />
            <rect x="6" y="-6" width="10" height="7" rx="1" fill="#cbd5e1" />
            <text x="11" y="20" fill="#ffffff" font-size="7" font-weight="black" text-anchor="middle">CHG</text>
            <text x="45" y="16" fill="#cbd5e1" font-size="8">كلورهيكسيدين كحولي (WHO)</text>
          </g>

          <!-- Surgical Prophylaxis Timing Timeline Cards (Right side) -->
          <g transform="translate(255, 45)">
            <rect x="0" y="0" width="225" height="125" rx="8" fill="#022c22" stroke="#10b981" stroke-width="2" />
            <text x="112" y="18" fill="#6ee7b7" font-size="10" font-weight="black" text-anchor="middle">بطاقات التوقيت الجراحي (Prophylaxis Timeline)</text>
            
            <!-- Timeline Line -->
            <line x1="20" y1="58" x2="205" y2="58" stroke="#059669" stroke-width="3" stroke-linecap="round" />

            <!-- Point 1: Rx Order Time 07:00 -->
            <circle cx="35" cy="58" r="8" fill="#3b82f6" stroke="#93c5fd" stroke-width="2" />
            <text x="35" y="44" fill="#93c5fd" font-size="8" font-weight="bold" text-anchor="middle">07:00</text>
            <text x="35" y="78" fill="#e2e8f0" font-size="8" text-anchor="middle">أمر الوصفة</text>

            <!-- Point 2: Actual Admin Window (07:15 - 07:30) -->
            <circle cx="112" cy="58" r="8" fill="${isTimingCase ? '#f59e0b' : '#10b981'}" stroke="#fef08a" stroke-width="2" />
            <text x="112" y="44" fill="#fef08a" font-size="8" font-weight="bold" text-anchor="middle">07:15</text>
            <text x="112" y="78" fill="#e2e8f0" font-size="8" text-anchor="middle">الإعطاء الفعلي</text>
            <text x="112" y="90" fill="#a7f3d0" font-size="7" text-anchor="middle">(خلال 60 دقيقة قبل الشق)</text>

            <!-- Point 3: Surgical Incision 08:00 -->
            <circle cx="190" cy="58" r="8" fill="#ef4444" stroke="#fca5a5" stroke-width="2" />
            <text x="190" y="44" fill="#fca5a5" font-size="8" font-weight="bold" text-anchor="middle">08:00</text>
            <text x="190" y="78" fill="#e2e8f0" font-size="8" text-anchor="middle">الشق الجراحي</text>
          </g>
        </svg>

        <!-- Scene Footer -->
        <div class="flex items-center justify-between text-[11px] text-emerald-200 bg-emerald-950/70 px-2.5 py-1 rounded-xl border border-emerald-500/30">
          <span>${isHairCase ? '💡 إزالة الشعر: اتركه في مكانه؛ وعند الضرورة استخدم ماكينة القص وتجنب الشفرة تماماً.' : (isTimingCase ? '💡 توقيت المضاد الوقائي: تأكد من الإعطاء الفعلي خلال 60 دقيقة قبل الشق الجراحي.' : '💡 تحضير الجلد: استخدم مستحضراً كحولياً قائماً على الكلورهيكسيدين مع مراعاة موانع الاستعمال.')}</span>
          <span class="text-emerald-400 font-bold">${caseObj.id}</span>
        </div>
      </div>
    `;
  }

  function renderStationScene(caseObj, isZoomed = false) {
    if (!caseObj) return '';
    switch (caseObj.bundle) {
      case 'CLABSI':
        return renderClabsiSceneSvg(caseObj, isZoomed);
      case 'CAUTI':
        return renderCautiSceneSvg(caseObj);
      case 'VAP':
        return renderVapSceneSvg(caseObj);
      case 'SSI':
        return renderSsiSceneSvg(caseObj);
      default:
        return '';
    }
  }

  // =========================================================================
  // 6. UI RENDERERS (START SCREEN, QUESTION SCREEN, RESULTS)
  // =========================================================================

  /**
   * Main Entry Render: decides between Start Screen, Gameplay, and Results.
   */
  function render() {
    const container = document.getElementById('view-bundle-challenge');
    if (!container) return;

    if (!session.isRunning && !session.isCompleted) {
      renderStartScreen(container);
    } else if (session.isRunning && !session.isCompleted) {
      renderQuestionScreen(container);
    } else {
      renderResultsScreen(container);
    }
  }

  /**
   * Start Screen: Shows Bundle Shield, Quick Round button, and Trainer Options.
   */
  function renderStartScreen(container) {
    const isStudent = window.isStudentMode || (new URLSearchParams(window.location.search)).get('mode') === 'student';

    container.innerHTML = `
      <!-- TOP NAVIGATION BAR -->
      <div class="w-full bg-white border border-slate-300 rounded-2xl p-2 sm:p-3 shadow-sm flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <button onclick="switchMainView('portal')" title="العودة للبوابة الرئيسية" class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-200 hover:text-white border border-cyan-400 text-xs font-black flex items-center gap-1.5 transition shadow">
            <span>🏛️</span> <span class="hidden sm:inline">الرئيسية</span>
          </button>
          <div class="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 border border-blue-400 text-white shadow-xs">
            <span class="text-base">📦</span>
            <span class="text-xs font-black tracking-tight text-blue-200">MODULE 5: أكمل الحزمة | HAI BUNDLE CHALLENGE</span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <!-- Sound Toggle Button -->
          <button onclick="window.HaiBundleEngine.toggleSound()" class="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold transition flex items-center gap-1" title="كتم/تشغيل الصوت">
            <span id="hai-sound-icon">${soundEngine.enabled ? '🔊' : '🔇'}</span>
          </button>

          <!-- Reduced Motion Toggle -->
          <button onclick="window.HaiBundleEngine.toggleReducedMotion()" class="p-2 rounded-xl ${reducedMotion ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-slate-100 text-slate-700 border-slate-300'} border text-xs font-bold transition flex items-center gap-1" title="تبديل تقليل الحركة">
            <span>🏃</span> <span class="text-[10px] hidden md:inline">${reducedMotion ? 'حركة خفيفة' : 'حركة كاملة'}</span>
          </button>

          <!-- Fullscreen Toggle -->
          <button onclick="toggleFullScreen()" class="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold transition" title="ملء الشاشة">
            <span>⛶</span>
          </button>

          <!-- Trainer Admin Button (Hidden in student mode) -->
          ${!isStudent ? `
            <button onclick="window.HaiBundleEngine.openTrainerModal()" class="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-1 border border-amber-300 shadow">
              <span>🔐</span> <span>أدوات المدرب</span>
            </button>
          ` : ''}
        </div>
      </div>

      <!-- HERO BANNER & BUNDLE SHIELD ARENA -->
      <div class="w-full max-w-4xl mx-auto my-3 p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#02132b] via-[#052347] to-[#011425] border-2 border-blue-400/80 shadow-2xl text-white flex flex-col items-center text-center relative overflow-hidden">
        
        <!-- Glowing Shield of Bundles -->
        <div class="relative w-28 h-28 sm:w-32 sm:h-32 my-2 flex items-center justify-center">
          <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]">
            <!-- Shield Contour divided into 4 stations -->
            <!-- Top-Left: CLABSI (Cyan) -->
            <path d="M 50 10 L 20 22 L 20 50 L 50 50 Z" fill="#0891b2" stroke="#22d3ee" stroke-width="2" opacity="0.9" class="transition-all hover:scale-105" />
            <!-- Top-Right: CAUTI (Amber) -->
            <path d="M 50 10 L 80 22 L 80 50 L 50 50 Z" fill="#d97706" stroke="#fbbf24" stroke-width="2" opacity="0.9" class="transition-all hover:scale-105" />
            <!-- Bottom-Left: VAP (Teal) -->
            <path d="M 20 50 L 20 65 Q 50 95 50 90 L 50 50 Z" fill="#0d9488" stroke="#2dd4bf" stroke-width="2" opacity="0.9" class="transition-all hover:scale-105" />
            <!-- Bottom-Right: SSI (Emerald) -->
            <path d="M 80 50 L 80 65 Q 50 95 50 90 L 50 50 Z" fill="#059669" stroke="#34d399" stroke-width="2" opacity="0.9" class="transition-all hover:scale-105" />
            <!-- Center Shield Core Emblem -->
            <circle cx="50" cy="50" r="14" fill="#0f172a" stroke="#60a5fa" stroke-width="2.5" />
            <text x="50" y="55" fill="#ffffff" font-size="12" font-weight="black" text-anchor="middle">🛡️</text>
          </svg>
        </div>

        <h1 class="text-2xl sm:text-3xl font-black text-white tracking-wide mt-2">
          أكمل الحزمة | HAI Bundle Challenge
        </h1>
        <p class="text-sm text-blue-200 mt-2 max-w-2xl leading-relaxed">
          التحدي السريري الشامل لحزم الوقاية من عدوى الرعاية الصحية (CLABSI • CAUTI • VAP • SSI) وفق أحدث دلائل منظمة الصحة العالمية (WHO) ومراكز السيطرة على الأمراض (CDC) وSHEA.
        </p>

        <!-- The 4 Stations Pills -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-2xl mt-5 text-right">
          <div class="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-400/50 flex flex-col">
            <span class="text-xs font-black text-cyan-300">🩸 CLABSI</span>
            <span class="text-[10px] text-slate-300 mt-0.5">القساطر المركزية (C1, C2)</span>
          </div>
          <div class="p-2.5 rounded-xl bg-amber-950/60 border border-amber-400/50 flex flex-col">
            <span class="text-xs font-black text-amber-300">💧 CAUTI</span>
            <span class="text-[10px] text-slate-300 mt-0.5">القساطر البولية (U1, U2)</span>
          </div>
          <div class="p-2.5 rounded-xl bg-teal-950/60 border border-teal-400/50 flex flex-col">
            <span class="text-xs font-black text-teal-300">🫁 VAP</span>
            <span class="text-[10px] text-slate-300 mt-0.5">التهوية الميكانيكية (V1)</span>
          </div>
          <div class="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-400/50 flex flex-col">
            <span class="text-xs font-black text-emerald-300">🩹 SSI</span>
            <span class="text-[10px] text-slate-300 mt-0.5">موضع الجراحة (S1, S2)</span>
          </div>
        </div>

        <!-- Start Quick Round Action Button -->
        <div class="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
          <button onclick="window.HaiBundleEngine.startQuickRound()" class="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-base shadow-xl hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-blue-300">
            <span>🚀</span> <span>ابدأ الجولة السريعة (8 حالات • 9 دقائق)</span>
          </button>
        </div>

        <div class="text-[11px] text-blue-300/80 mt-3 flex items-center gap-2">
          <span>📅 تاريخ مراجعة المحتوى: 18 نوفمبر 2026</span>
          <span>•</span>
          <span>حالات بالغة في الرعاية الحادة</span>
        </div>
      </div>
    `;
  }

  /**
   * Question Screen: Renders the active case, station header, interactive SVG scene,
   * audit or multiple-choice buttons, multi-step progress, "لماذا؟" accordion, and badges.
   */
  function renderQuestionScreen(container) {
    const c = session.cases[session.currentIndex];
    if (!c) {
      finishRound();
      return;
    }

    const st = STATIONS[c.bundle] || STATIONS.CLABSI;
    const answerData = session.answers[c.id];
    const isAnswered = !!answerData;
    const mProgress = session.multiStepProgress[c.id] || {};

    // Calculate score so far
    let totalAnswered = 0;
    let firstAttemptCorrectCount = 0;
    Object.values(session.answers).forEach(a => {
      if (a && !a.isSkipped) {
        totalAnswered++;
        if (a.firstAttemptCorrect) firstAttemptCorrectCount++;
      }
    });

    // Format timer
    const mins = Math.floor(session.timeRemaining / 60);
    const secs = session.timeRemaining % 60;
    const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    // Task type badge translation
    const taskTypeNames = {
      bundle_builder: { name: 'بناء الحزمة', icon: '📋' },
      spot_error: { name: 'اكتشاف الخطأ في المشهد', icon: '🔍' },
      record_audit: { name: 'تدقيق سجل سريري', icon: '📊' }
    };
    const tType = taskTypeNames[c.taskType] || { name: 'قرار سريري', icon: '💡' };

    // Shuffled options cached for stability during the case display
    if (!c._shuffledOptions) {
      c._shuffledOptions = [...c.options].sort(() => Math.random() - 0.5);
    }

    container.innerHTML = `
      <!-- TOP STATUS ROW (TIMER, PROGRESS, BADGES, CONTROLS) -->
      <div class="w-full bg-white border border-slate-300 rounded-2xl p-2 sm:p-3 shadow-sm flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <button onclick="window.HaiBundleEngine.confirmQuitRound()" class="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1" title="إنهاء الجولة والعودة">
            <span>✕</span> <span class="hidden sm:inline">إنهاء</span>
          </button>
          
          <!-- Station Badge -->
          <div class="px-3 py-1 rounded-xl ${st.themeClasses} border font-black text-xs flex items-center gap-1.5">
            <span>${st.icon}</span>
            <span>${st.shortName}</span>
          </div>

          <!-- Progress Counter -->
          <span class="text-xs font-bold text-slate-600">
            الحالة <strong>${session.currentIndex + 1}</strong> من <strong>${session.cases.length}</strong>
          </span>
        </div>

        <!-- Live Timer & Badges Indicator -->
        <div class="flex items-center gap-2.5">
          <!-- Badges Earned in this round -->
          <div class="hidden md:flex items-center gap-1 text-xs">
            <span class="px-2 py-0.5 rounded-lg border ${session.badgesEarned.eagleEye ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-400'}" title="شارة عين المراقب: اكتشاف وتفسير الخطأ">
              👁️ عين المراقب
            </span>
            <span class="px-2 py-0.5 rounded-lg border ${session.badgesEarned.bundleMastered ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-400'}" title="شارة أكملت التصحيح: معالجة جميع الأخطاء في مهمة متعددة الخطوات">
              ✓ أكملت التصحيح
            </span>
          </div>

          <!-- Timer Badge -->
          <div class="px-3 py-1 rounded-xl ${session.timeRemaining < 60 ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-900 text-cyan-300'} font-black text-xs sm:text-sm font-mono flex items-center gap-1.5 shadow">
            <span>⏱️</span>
            <span>${session.timeRemaining === null ? 'حر' : timeStr}</span>
          </div>

          <!-- Score Badge -->
          <div class="px-2.5 py-1 rounded-xl bg-blue-50 border border-blue-300 text-blue-900 font-bold text-xs flex items-center gap-1">
            <span>🎯</span>
            <span>${firstAttemptCorrectCount}/${totalAnswered}</span>
          </div>
        </div>
      </div>

      <!-- MAIN WORKSPACE: ROOM SCENE & CASE VIGNETTE -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 w-full mt-2">
        
        <!-- Left/Top Column (Scene / Audit Chart): 6 or 7 cols -->
        <div class="lg:col-span-7 flex flex-col gap-2">
          <!-- Dynamic SVG Room Scene -->
          ${renderStationScene(c, session._isZoomed)}

          <!-- Multi-Step Progress Banner if applicable -->
          ${c.multiStep ? `
            <div class="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-base">◐</span>
                <span class="font-bold">مهمة متعددة الخطوات:</span>
                <span>${mProgress.bagLowered && mProgress.kinkUntwisted ? '✓ تم إكمال جميع خطوات التصحيح بنجاح!' : (mProgress.bagLowered ? 'تم خفض الكيس. المتبقي: تحرير انثناء الأنبوب.' : (mProgress.kinkUntwisted ? 'تم تحرير الانثناء. المتبقي: خفض الكيس تحت مستوى المثانة.' : 'كيس فوق المثانة وأنبوب مثني؛ يُقبل تصحيح أي منهما أولاً.'))}</span>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Right/Bottom Column (Case Question, Decision Buttons, Feedback): 5 cols -->
        <div class="lg:col-span-5 flex flex-col gap-2.5">
          
          <!-- Case Card -->
          <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-300 shadow-sm flex flex-col gap-2.5">
            <!-- Header with ID & Task Type -->
            <div class="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
              <span class="font-black text-slate-800 tracking-wide">${c.id}</span>
              <span class="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-slate-700 font-bold flex items-center gap-1">
                <span>${tType.icon}</span> <span>${tType.name}</span>
              </span>
            </div>

            <!-- Case Vignette Text -->
            <div class="text-sm sm:text-base font-black text-slate-900 leading-relaxed pt-1">
              ${c.vignette}
            </div>

            <!-- Prompt Question -->
            <div class="text-xs sm:text-sm font-bold text-blue-900 bg-blue-50/70 p-2.5 rounded-xl border border-blue-200">
              ❓ ${c.prompt}
            </div>

            <!-- AUDIT DECISION BUTTONS (IF AUDIT CASE) OR MULTIPLE CHOICE OPTIONS -->
            ${c.isAudit ? renderAuditActionButtons(c, answerData) : renderStandardOptions(c, answerData)}

            <!-- "لماذا؟" (WHY?) FEEDBACK CARD WITH OFFICIAL SOURCE LINK -->
            ${isAnswered ? renderWhyFeedbackCard(c, answerData) : ''}

            <!-- Next Case / Finish Button -->
            ${isAnswered ? `
              <div class="pt-2 flex items-center justify-between gap-2">
                <span class="text-xs text-slate-500 font-medium">
                  ${answerData.firstAttemptCorrect ? '✓ إجابة معتمدة للمحاولة الأولى' : 'ℹ️ سُجلت نتيجة المحاولة الأولى، وتم فتح التفسير السريري.'}
                </span>
                <button onclick="window.HaiBundleEngine.nextCase()" class="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-black text-xs sm:text-sm shadow-md transition active:scale-95 flex items-center gap-1.5 cursor-pointer">
                  <span>${session.currentIndex + 1 < session.cases.length ? 'الحالة التالية' : 'عرض النتيجة النهائية'}</span>
                  <span>➡️</span>
                </button>
              </div>
            ` : ''}
          </div>

        </div>
      </div>
    `;
  }

  /**
   * Standard 3-Choice Multiple Choice Renderer with randomized placement and rejection rationales.
   */
  function renderStandardOptions(c, answerData) {
    const isAnswered = !!answerData;

    return `
      <div class="flex flex-col gap-2 mt-1">
        ${c._shuffledOptions.map((opt, idx) => {
          let btnStyle = "bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-800";
          let badge = '';

          if (isAnswered) {
            if (opt.isCorrect) {
              btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400";
              badge = '<span class="text-emerald-600 font-black">✓ الإجراء الصحيح المعتمد</span>';
            } else if (answerData.chosenOptionId === opt.id) {
              btnStyle = "bg-red-50 border-red-400 text-red-950";
              badge = '<span class="text-red-600 font-bold">✕ إجابة غير دقيقة</span>';
            } else {
              btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-70";
            }
          }

          return `
            <button 
              ${isAnswered ? 'disabled' : ''} 
              onclick="window.HaiBundleEngine.submitAnswer('${opt.id}')"
              class="w-full text-right p-3 rounded-xl border-2 transition-all duration-200 flex flex-col gap-1 text-xs sm:text-sm font-bold shadow-xs active:scale-98 ${btnStyle} cursor-pointer"
            >
              <div class="flex items-start justify-between gap-2">
                <span class="flex-1 leading-normal">${opt.text}</span>
                ${badge}
              </div>
              ${isAnswered && !opt.isCorrect && opt.rejectionReason ? `
                <div class="text-[11px] text-red-700 font-medium pt-1 border-t border-red-200/60 mt-1">
                  ${opt.rejectionReason}
                </div>
              ` : ''}
            </button>
          `;
        }).join('')}
      </div>
    `;
  }

  /**
   * 4 Standard Audit Buttons: «تم»، «لم يتم»، «غير موثّق»، «غير منطبق مع سبب».
   */
  function renderAuditActionButtons(c, answerData) {
    const isAnswered = !!answerData;
    const auditOptions = [
      { id: 'تم', label: 'تم (Done)', icon: '✓', color: 'emerald' },
      { id: 'لم يتم', label: 'لم يتم (Not Done)', icon: '✕', color: 'red' },
      { id: 'غير موثّق', label: 'غير موثّق (Undocumented)', icon: '📝', color: 'amber' },
      { id: 'غير منطبق مع سبب', label: 'غير منطبق مع سبب (N/A)', icon: '⊘', color: 'slate' }
    ];

    return `
      <div class="flex flex-col gap-1.5 mt-1">
        <div class="text-[11px] text-slate-500 font-bold mb-1">
          حدد حالة التدقيق السريري المطابقة للسجل:
        </div>
        <div class="grid grid-cols-2 gap-2">
          ${auditOptions.map(btn => {
            let btnStyle = "bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-700";
            if (isAnswered) {
              if (c.auditAnswer === btn.id) {
                btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-400";
              } else if (answerData.chosenOptionId === btn.id) {
                btnStyle = "bg-red-50 border-red-400 text-red-950 font-bold";
              } else {
                btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
              }
            }

            return `
              <button 
                ${isAnswered ? 'disabled' : ''}
                onclick="window.HaiBundleEngine.submitAnswer('${btn.id}')"
                class="py-2.5 px-3 rounded-xl border-2 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs active:scale-98 ${btnStyle} cursor-pointer"
              >
                <span>${btn.icon}</span> <span>${btn.label}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  /**
   * "لماذا؟" (Why?) Clinical Rationale Card with Link & Guideline Year
   */
  function renderWhyFeedbackCard(c, answerData) {
    const sources = (c.sourceKeys || []).map(sk => window.HAI_BUNDLE_SOURCES[sk]).filter(Boolean);

    return `
      <div class="mt-2.5 p-3.5 rounded-xl bg-gradient-to-br from-slate-900 to-[#031d3b] text-white border border-blue-400/50 shadow-md text-xs flex flex-col gap-2">
        <div class="flex items-center justify-between text-blue-300 font-black text-xs border-b border-blue-500/30 pb-1.5">
          <span class="flex items-center gap-1.5">
            <span>💡</span> <span>لماذا؟ • التفسير السريري المعتمد</span>
          </span>
          <span class="text-[10px] text-blue-200 bg-blue-900/60 px-2 py-0.5 rounded-full">
            المفتاح السريري
          </span>
        </div>

        <!-- Explanation text linked to case clues -->
        <p class="text-slate-200 text-xs leading-relaxed">
          ${c.explanation}
        </p>

        <!-- Calculation Formula details if applicable -->
        ${c.calculation ? `
          <div class="p-2 rounded-lg bg-blue-950/80 border border-blue-500/40 text-[11px] text-blue-200 flex flex-col gap-1">
            <span class="font-bold text-white">معادلة حساب الالتزام الكامل المثبت:</span>
            <span>(الفرص التي ثبت فيها استيفاء جميع العناصر ÷ الفرص المؤهلة) × 100</span>
            <span class="font-mono text-cyan-300 font-bold">(${c.calculation.numerator} ÷ ${c.calculation.denominator}) × 100 = ${c.calculation.percentage}%</span>
            <span class="text-[10px] text-slate-300">ملاحظة هامة: لا تحول درجة الالتزام بالعمليات إلى معدل عدوى سريري أو نسبة إصابة.</span>
          </div>
        ` : ''}

        <!-- Guideline Source Links with year -->
        <div class="pt-1.5 border-t border-blue-500/30 flex flex-wrap items-center gap-2">
          <span class="text-[10px] text-slate-400 font-bold">المراجع المعتمدة:</span>
          ${sources.map(s => `
            <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="px-2 py-0.5 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-200 hover:text-white border border-blue-400/40 text-[10px] font-bold transition flex items-center gap-1" title="${s.title}">
              <span>🔗</span> <span>${s.author} (${s.year})</span>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  /**
   * End of Round Results & Debrief Screen
   */
  function renderResultsScreen(container) {
    // Tally results by station
    const stationStats = {
      CLABSI: { total: 0, correct: 0 },
      CAUTI: { total: 0, correct: 0 },
      VAP: { total: 0, correct: 0 },
      SSI: { total: 0, correct: 0 }
    };

    let totalCases = session.cases.length;
    let correctCount = 0;
    const decisionsNeedingCorrection = [];

    session.cases.forEach(c => {
      const ans = session.answers[c.id];
      const b = c.bundle;
      if (stationStats[b]) {
        stationStats[b].total++;
        if (ans && ans.firstAttemptCorrect) {
          stationStats[b].correct++;
          correctCount++;
        } else {
          decisionsNeedingCorrection.push(c);
        }
      }
    });

    const percent = Math.round((correctCount / totalCases) * 100) || 0;

    // Discussion Question: Pick the hardest case from those needing correction, or case 25
    let discussionCase = decisionsNeedingCorrection[0] || session.cases[session.cases.length - 1];

    container.innerHTML = `
      <!-- RESULTS TOP BAR -->
      <div class="w-full bg-white border border-slate-300 rounded-2xl p-2 sm:p-3 shadow-sm flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <button onclick="switchMainView('portal')" class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-200 text-xs font-black transition flex items-center gap-1.5 shadow">
            <span>🏛️</span> <span>الرئيسية | All Puzzles</span>
          </button>
          <span class="text-xs font-black text-slate-800">تقرير إنجاز الحزمة السريرية</span>
        </div>
        <button onclick="window.HaiBundleEngine.startQuickRound()" class="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition shadow flex items-center gap-1">
          <span>🔄</span> <span>جولة سريعة جديدة</span>
        </button>
      </div>

      <!-- MAIN RESULTS CARD -->
      <div class="w-full max-w-4xl mx-auto my-3 p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#02132b] via-[#052347] to-[#011425] border-2 border-blue-400 shadow-2xl text-white flex flex-col gap-5">
        
        <!-- Score & Shield Header -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 border-b border-blue-500/30">
          <div class="flex items-center gap-4 text-right">
            <div class="w-20 h-20 rounded-2xl bg-blue-900/60 border-2 border-blue-400 flex flex-col items-center justify-center font-black">
              <span class="text-2xl text-cyan-300">${percent}%</span>
              <span class="text-[10px] text-blue-200 font-bold">${correctCount}/${totalCases} حالات</span>
            </div>
            <div>
              <h2 class="text-xl sm:text-2xl font-black text-white">
                ${percent >= 80 ? '🌟 إتقان سريري متميز لحزم الوقاية!' : (percent >= 60 ? '👍 أداء سريري جيد مع نقاط للتطوير' : '⚠️ بحاجة لمراجعة حزم الوقاية وتصحيح الممارسات')}
              </h2>
              <p class="text-xs text-blue-200 mt-1">
                سُجلت درجات المحاولة الأولى لكل حالة وفق المعايير السريرية لـ WHO و CDC و SHEA.
              </p>
            </div>
          </div>

          <!-- Mastered Skill Highlight -->
          <div class="p-3 rounded-2xl bg-blue-950/80 border border-blue-400/50 text-right">
            <span class="text-[10px] font-bold text-cyan-300 block">المهارة المتقنة البارزة:</span>
            <span class="text-xs font-black text-white">
              ${percent >= 50 ? 'تطبيق معايير مكافحة العدوى والتدقيق السريري' : 'فهم أساسيات حزمة الوقاية'}
            </span>
          </div>
        </div>

        <!-- PERFORMANCE PER BUNDLE (THE 4 STATIONS) -->
        <div>
          <h3 class="text-sm font-black text-blue-200 mb-2.5">
            📊 أداء كل حزمة وقاية (Station-by-Station Breakdown):
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            ${Object.keys(STATIONS).map(stKey => {
              const st = STATIONS[stKey];
              const stat = stationStats[stKey] || { total: 0, correct: 0 };
              const stPercent = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
              return `
                <div class="p-3 rounded-2xl bg-slate-900/80 border ${st.themeClasses} flex flex-col gap-1 text-right">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-black">${st.icon} ${st.shortName}</span>
                    <span class="text-xs font-mono font-bold">${stat.correct}/${stat.total}</span>
                  </div>
                  <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
                    <div class="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full" style="width: ${stPercent}%;"></div>
                  </div>
                  <span class="text-[10px] text-slate-300 mt-1">${stPercent}% التزام مثبت</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- DECISIONS THAT NEEDED CORRECTION -->
        ${decisionsNeedingCorrection.length > 0 ? `
          <div class="p-4 rounded-2xl bg-slate-900/90 border border-red-500/40 text-right">
            <h3 class="text-xs font-black text-red-300 flex items-center gap-1.5 mb-2">
              <span>⚠️</span> <span>قرارات سريرية احتاجت إلى مراجعة وتصحيح (${decisionsNeedingCorrection.length}):</span>
            </h3>
            <div class="flex flex-col gap-2 max-h-[180px] overflow-y-auto pr-1">
              ${decisionsNeedingCorrection.map(item => `
                <div class="p-2.5 rounded-xl bg-slate-950/60 border border-slate-700 text-xs flex flex-col gap-1">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-cyan-300">${item.id} — ${item.bundle}</span>
                    <span class="text-[10px] text-amber-300 font-bold">${item.taskType}</span>
                  </div>
                  <span class="text-slate-300">${item.vignette}</span>
                  <span class="text-emerald-400 font-bold text-[11px]">الإجراء المعتمد: ${item.key}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : `
          <div class="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-400 text-emerald-200 text-xs font-bold text-center">
            ✓ تهانينا! تم اتخاذ جميع القرارات السريرية بشكل سليم من المحاولة الأولى!
          </div>
        `}

        <!-- DISCUSSION QUESTION (سؤال نقاش من الحالة الأصعب) -->
        ${discussionCase ? `
          <div class="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/90 via-purple-950/90 to-slate-950 border border-purple-400/60 text-right flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black text-purple-300 flex items-center gap-1">
                <span>💬</span> <span>سؤال نقاش مقترح للجلسة السريرية (من الحالة ${discussionCase.id}):</span>
              </span>
              <span class="text-[10px] text-purple-200 bg-purple-900/60 px-2 py-0.5 rounded-full">
                ${discussionCase.bundle}
              </span>
            </div>
            <p class="text-xs sm:text-sm font-bold text-white">
              «كيف يوازن الفريق السريري بين سرعة التدخل في حالة (${discussionCase.vignette}) وبين الالتزام الصارم بحزمة الوقاية (${discussionCase.key}) دون التضحية بسلامة المريض؟»
            </p>
          </div>
        ` : ''}

        <!-- BOTTOM ACTION BUTTONS -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-blue-500/30">
          <button onclick="window.HaiBundleEngine.practiceHardestSkill()" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow transition active:scale-95 flex items-center gap-1.5 cursor-pointer">
            <span>🎯</span> <span>تدرّب مرة أخرى على الحزمة التي تحتاج مراجعة</span>
          </button>

          <button onclick="window.HaiBundleEngine.startQuickRound()" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm shadow transition active:scale-95 flex items-center gap-1.5 cursor-pointer">
            <span>🚀</span> <span>جولة جديدة بحالات غير مكررة</span>
          </button>
        </div>

      </div>
    `;
  }

  // =========================================================================
  // 7. USER INTERACTIONS & GAME CONTROLLER
  // =========================================================================

  function startQuickRound() {
    clearActiveSession();
    soundEngine.init();

    const sampled = sampleCases(['CLABSI', 'CAUTI', 'VAP', 'SSI'], 2, 8);
    session.isRunning = true;
    session.isPaused = false;
    session.isCompleted = false;
    session.mode = 'quick';
    session.cases = sampled.cases;
    session.currentIndex = 0;
    session.timeRemaining = 540; // 9 minutes
    session.answers = {};
    session.multiStepProgress = {};
    session.badgesEarned = { eagleEye: false, bundleMastered: false };
    session.shieldStationsCompleted = { CLABSI: false, CAUTI: false, VAP: false, SSI: false };
    session._isZoomed = false;

    if (sampled.cycleResetOccurred) {
      showToast("🔄 دورة تدريبية جديدة", "تم إكمال جميع الحالات المتاحة، وبدأت دورة جديدة من الحالات بنجاح!", "blue");
    }

    startTimer();
    saveActiveSession();
    render();
    soundEngine.playToolSnap();
  }

  function startCustomRound(stationCodes, count, timerMinutes) {
    clearActiveSession();
    soundEngine.init();

    const countPerStation = Math.max(1, Math.ceil(count / stationCodes.length));
    const sampled = sampleCases(stationCodes, countPerStation, count);

    session.isRunning = true;
    session.isPaused = false;
    session.isCompleted = false;
    session.mode = 'custom';
    session.cases = sampled.cases;
    session.currentIndex = 0;
    session.timeRemaining = timerMinutes ? timerMinutes * 60 : null;
    session.answers = {};
    session.multiStepProgress = {};
    session.badgesEarned = { eagleEye: false, bundleMastered: false };
    session.shieldStationsCompleted = { CLABSI: false, CAUTI: false, VAP: false, SSI: false };
    session._isZoomed = false;

    if (sampled.cycleResetOccurred) {
      showToast("🔄 دورة تدريبية جديدة", "بدأت دورة تدريبية جديدة من بنك الحالات!", "blue");
    }

    if (timerMinutes) startTimer();
    saveActiveSession();
    render();
    soundEngine.playToolSnap();
  }

  function startTimer() {
    if (session.timerInterval) clearInterval(session.timerInterval);
    session.timerInterval = setInterval(() => {
      if (!session.isRunning || session.isPaused || session.isCompleted || session.timeRemaining === null) return;
      session.timeRemaining--;
      if (session.timeRemaining <= 0) {
        clearInterval(session.timerInterval);
        session.timeRemaining = 0;
        soundEngine.playRetryTone();
        showToast("⏰ انتهى الوقت!", "انتهى وقت الجولة السريعة، يتم عرض التقرير والنتائج المحققة.", "amber");
        finishRound();
      } else {
        // Update timer in top bar without full re-render
        saveActiveSession();
      }
    }, 1000);
  }

  function submitAnswer(chosenOptionId) {
    const c = session.cases[session.currentIndex];
    if (!c) return;

    soundEngine.init();
    let isCorrect = false;

    if (c.isAudit) {
      isCorrect = (chosenOptionId === c.auditAnswer);
    } else {
      const opt = c.options.find(o => o.id === chosenOptionId);
      isCorrect = opt ? opt.isCorrect : false;
    }

    // Check if this is the first attempt
    const existing = session.answers[c.id];
    if (!existing) {
      session.answers[c.id] = {
        chosenOptionId,
        firstAttemptCorrect: isCorrect,
        attempts: 1,
        isSkipped: false
      };
      markCaseSeen(c.id);

      // Award eagle eye badge if spot_error was answered correctly on first try
      if (isCorrect && c.taskType === 'spot_error') {
        session.badgesEarned.eagleEye = true;
      }
    } else {
      existing.attempts++;
      existing.chosenOptionId = chosenOptionId;
    }

    if (isCorrect) {
      soundEngine.playCorrectChime();
      session.shieldStationsCompleted[c.bundle] = true;
      showToast("✓ قرار سريري صائب!", "تم تطبيق الإجراء المعتمد بحزمة الوقاية بنجاح.", "emerald");
    } else {
      soundEngine.playRetryTone();
      showToast("⚠️ إجراء بحاجة لتصحيح", "راجع التفسير السريري وأسباب استبعاد الخيارات الأخرى.", "amber");
    }

    saveActiveSession();
    render();
  }

  function interactSceneElement(actionType) {
    const c = session.cases[session.currentIndex];
    if (!c) return;

    soundEngine.playToolSnap();
    if (!session.multiStepProgress[c.id]) {
      session.multiStepProgress[c.id] = {};
    }
    const p = session.multiStepProgress[c.id];

    if (actionType === 'lower_bag') {
      p.bagLowered = true;
      showToast("⬇️ تم خفض الكيس", "كيس التجميع الآن تحت مستوى المثانة.", "amber");
    } else if (actionType === 'untwist_kink') {
      p.kinkUntwisted = true;
      showToast("🔄 تم تحرير الالتواء", "استقامة الأنبوب واستعادة التدفق الحر للبول.", "amber");
    } else if (actionType === 'adjust_bed_angle') {
      p.bedAngleAdjusted = true;
      showToast("📐 تم ضبط الزاوية", "رأس السرير الآن بزاوية 35° (مطابق لمعايير VAP).", "teal");
    } else if (actionType === 'hub') {
      session._isZoomed = true;
    }

    // Check if multi-step is now fully mastered
    if (p.bagLowered && p.kinkUntwisted) {
      session.badgesEarned.bundleMastered = true;
      soundEngine.playCorrectChime();
      showToast("✓ اكتمل تصحيح المشهد!", "تم استيفاء موضع الكيس وتحرير الأنبوب معاً.", "emerald");
    }

    saveActiveSession();
    render();
  }

  function toggleSceneZoom(zoomed) {
    soundEngine.playToolSnap();
    session._isZoomed = (zoomed !== undefined) ? zoomed : !session._isZoomed;
    render();
  }

  function nextCase() {
    soundEngine.playToolSnap();
    session._isZoomed = false;
    if (session.currentIndex + 1 < session.cases.length) {
      session.currentIndex++;
      saveActiveSession();
      render();
    } else {
      finishRound();
    }
  }

  function finishRound() {
    if (session.timerInterval) clearInterval(session.timerInterval);
    session.isCompleted = true;
    session.isRunning = false;
    soundEngine.playStationFanfare();
    saveActiveSession();
    render();
  }

  function confirmQuitRound() {
    if (confirm('هل تريد إنهاء الجولة الحالية والعودة للقائمة؟')) {
      clearActiveSession();
      render();
    }
  }

  function practiceHardestSkill() {
    // Find bundle with lowest score
    const bundleCounts = { CLABSI: 0, CAUTI: 0, VAP: 0, SSI: 0 };
    Object.values(session.answers).forEach((ans, idx) => {
      const c = session.cases[idx];
      if (c && (!ans || !ans.firstAttemptCorrect)) {
        bundleCounts[c.bundle] = (bundleCounts[c.bundle] || 0) + 1;
      }
    });

    let maxFailedBundle = 'CLABSI';
    let maxFails = -1;
    Object.keys(bundleCounts).forEach(b => {
      if (bundleCounts[b] > maxFails) {
        maxFails = bundleCounts[b];
        maxFailedBundle = b;
      }
    });

    startCustomRound([maxFailedBundle], 4, 5);
  }

  function toggleSound() {
    const newState = soundEngine.toggle();
    const icon = document.getElementById('hai-sound-icon');
    if (icon) icon.textContent = newState ? '🔊' : '🔇';
    showToast(newState ? "الصوت مفعّل 🔊" : "الصوت مكتوم 🔇", newState ? "تم تفعيل المؤثرات الصوتية." : "تم كتم المؤثرات الصوتية.", "blue");
  }

  function toggleReducedMotion() {
    reducedMotion = !reducedMotion;
    localStorage.setItem(STORAGE_KEYS.REDUCED_MOTION, reducedMotion ? 'true' : 'false');
    render();
    showToast(reducedMotion ? "تقليل الحركة مفعّل 🏃" : "الحركة الكاملة مفعّلة ⚡", reducedMotion ? "تم تعطيل الحركات السريعة لتوفير راحة بصرية." : "تم تفعيل كافة الحركات والتحريك البصري.", "slate");
  }

  // =========================================================================
  // 8. TRAINER MODAL & CASE BANK EXPLORER
  // =========================================================================
  function openTrainerModal() {
    if (window.isStudentMode) {
      showToast("⚠️ غير مصرح", "أدوات المدرب مخصصة للمشرفين فقط.", "red");
      return;
    }

    // Password prompt matching existing project password
    const pwd = prompt('أدخل كلمة مرور المدرب / المشرف:');
    if (pwd !== 'Jubrannajah@2025') {
      if (pwd !== null) alert('كلمة المرور غير صحيحة!');
      return;
    }

    let modal = document.getElementById('hai-trainer-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'hai-trainer-modal';
      modal.className = "fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5";
      document.body.appendChild(modal);
    }

    const allCases = window.HAI_BUNDLE_CASES || [];

    modal.innerHTML = `
      <div class="bg-white border border-slate-300 rounded-3xl max-w-4xl w-full p-5 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto text-right" dir="rtl">
        
        <!-- Header -->
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <div class="flex items-center gap-2">
            <span class="text-xl">🔐</span>
            <div>
              <h2 class="text-lg font-black text-slate-900">أدوات المدرب — حزمة مكافحة العدوى | Trainer Facilitator Hub</h2>
              <span class="text-xs text-slate-500">تخصيص الجلسات، بنك الـ 100 حالة، وروابط المشاركة</span>
            </div>
          </div>
          <button onclick="document.getElementById('hai-trainer-modal').remove()" class="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition">
            ✕ إغلاق
          </button>
        </div>

        <!-- Custom Round Config Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <!-- Station Filter -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
            <span class="text-xs font-black text-slate-900">اختيار المحطات والحزم:</span>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <label class="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
                <input type="checkbox" id="chk-clabsi" checked class="rounded text-blue-600" />
                <span>🩸 CLABSI (25)</span>
              </label>
              <label class="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
                <input type="checkbox" id="chk-cauti" checked class="rounded text-blue-600" />
                <span>💧 CAUTI (25)</span>
              </label>
              <label class="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
                <input type="checkbox" id="chk-vap" checked class="rounded text-blue-600" />
                <span>🫁 VAP (25)</span>
              </label>
              <label class="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
                <input type="checkbox" id="chk-ssi" checked class="rounded text-blue-600" />
                <span>🩹 SSI (25)</span>
              </label>
            </div>
          </div>

          <!-- Case Count & Time -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
            <span class="text-xs font-black text-slate-900">عدد الحالات والمؤقت:</span>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label class="block text-[11px] text-slate-500 mb-1">عدد الحالات:</label>
                <select id="sel-case-count" class="w-full p-2 rounded-xl border border-slate-300 font-bold bg-white text-slate-800">
                  <option value="4">4 حالات</option>
                  <option value="8" selected>8 حالات (جولة قياسية)</option>
                  <option value="12">12 حالة</option>
                  <option value="16">16 حالة</option>
                  <option value="25">25 حالة</option>
                  <option value="100">جميع الـ 100 حالة</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] text-slate-500 mb-1">المؤقت:</label>
                <select id="sel-timer-min" class="w-full p-2 rounded-xl border border-slate-300 font-bold bg-white text-slate-800">
                  <option value="5">5 دقائق</option>
                  <option value="9" selected>9 دقائق (الافتراضي)</option>
                  <option value="15">15 دقيقة</option>
                  <option value="0">بدون مؤقت (حر)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Launch Custom Button -->
        <div class="mt-4 flex items-center justify-between gap-3">
          <button onclick="window.HaiBundleEngine.launchCustomFromModal()" class="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm shadow transition">
            🚀 إطلاق جلسة تدريب مخصصة
          </button>
          <button onclick="window.HaiBundleEngine.startAllCasesPractice()" class="py-3 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs shadow transition">
            📚 التدريب على جميع الحالات (100)
          </button>
        </div>

        <!-- Case Bank Explorer Table -->
        <div class="mt-6 pt-4 border-t border-slate-200">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-900">استعراض بنك الحالات السريرية (${allCases.length} حالة معتمدة):</span>
            <input type="text" id="hai-case-search" placeholder="بحث بالمعرف أو النص..." oninput="window.HaiBundleEngine.filterCaseBank()" class="p-1.5 px-3 rounded-xl border border-slate-300 text-xs w-48 text-right bg-white" />
          </div>

          <div class="max-h-[260px] overflow-y-auto border border-slate-200 rounded-xl">
            <table class="w-full text-right text-xs border-collapse">
              <thead class="bg-slate-100 text-slate-700 font-bold sticky top-0">
                <tr>
                  <th class="p-2 border-b">المعرف</th>
                  <th class="p-2 border-b">الحزمة</th>
                  <th class="p-2 border-b">النوع</th>
                  <th class="p-2 border-b">الحالة السريرية</th>
                  <th class="p-2 border-b">الإجراء المعتمد</th>
                </tr>
              </thead>
              <tbody id="hai-case-bank-tbody" class="divide-y divide-slate-100">
                ${allCases.map(cs => `
                  <tr class="hover:bg-blue-50/50">
                    <td class="p-2 font-mono font-bold text-blue-700 whitespace-nowrap">${cs.id}</td>
                    <td class="p-2 font-bold whitespace-nowrap">${cs.bundle}</td>
                    <td class="p-2 text-slate-500 whitespace-nowrap">${cs.taskType}</td>
                    <td class="p-2 text-slate-800">${cs.vignette}</td>
                    <td class="p-2 text-emerald-700 font-bold">${cs.key}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  }

  function launchCustomFromModal() {
    const chkClabsi = document.getElementById('chk-clabsi').checked;
    const chkCauti = document.getElementById('chk-cauti').checked;
    const chkVap = document.getElementById('chk-vap').checked;
    const chkSsi = document.getElementById('chk-ssi').checked;

    const selectedStations = [];
    if (chkClabsi) selectedStations.push('CLABSI');
    if (chkCauti) selectedStations.push('CAUTI');
    if (chkVap) selectedStations.push('VAP');
    if (chkSsi) selectedStations.push('SSI');

    if (selectedStations.length === 0) {
      alert('يجب اختيار حزمة واحدة على الأقل!');
      return;
    }

    const count = parseInt(document.getElementById('sel-case-count').value, 10);
    const timerMin = parseInt(document.getElementById('sel-timer-min').value, 10);

    const modal = document.getElementById('hai-trainer-modal');
    if (modal) modal.remove();

    startCustomRound(selectedStations, count, timerMin);
  }

  function startAllCasesPractice() {
    const modal = document.getElementById('hai-trainer-modal');
    if (modal) modal.remove();
    startCustomRound(['CLABSI', 'CAUTI', 'VAP', 'SSI'], 100, 0);
  }

  function filterCaseBank() {
    const term = (document.getElementById('hai-case-search').value || '').toLowerCase();
    const tbody = document.getElementById('hai-case-bank-tbody');
    const allCases = window.HAI_BUNDLE_CASES || [];

    const filtered = allCases.filter(c => 
      c.id.toLowerCase().includes(term) ||
      c.bundle.toLowerCase().includes(term) ||
      c.vignette.toLowerCase().includes(term) ||
      c.key.toLowerCase().includes(term)
    );

    tbody.innerHTML = filtered.map(cs => `
      <tr class="hover:bg-blue-50/50">
        <td class="p-2 font-mono font-bold text-blue-700 whitespace-nowrap">${cs.id}</td>
        <td class="p-2 font-bold whitespace-nowrap">${cs.bundle}</td>
        <td class="p-2 text-slate-500 whitespace-nowrap">${cs.taskType}</td>
        <td class="p-2 text-slate-800">${cs.vignette}</td>
        <td class="p-2 text-emerald-700 font-bold">${cs.key}</td>
      </tr>
    `).join('');
  }

  // =========================================================================
  // 9. PUBLIC API & INITIALIZATION
  // =========================================================================
  window.HaiBundleEngine = {
    init: function () {
      const restored = tryRestoreSession();
      render();
      if (restored) {
        showToast("🔄 استئناف الجلسة", "تم استئناف جولتك السريرية السابقة من حيث توقفت.", "blue");
        if (session.timeRemaining) startTimer();
      }
    },
    render,
    startQuickRound,
    startCustomRound,
    submitAnswer,
    interactSceneElement,
    toggleSceneZoom,
    nextCase,
    finishRound,
    confirmQuitRound,
    practiceHardestSkill,
    toggleSound,
    toggleReducedMotion,
    openTrainerModal,
    launchCustomFromModal,
    startAllCasesPractice,
    filterCaseBank,
    getSession: () => session,
    getSoundEngine: () => soundEngine
  };

  // Auto-init when document is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // If direct view is bundle-challenge, initialize
      const urlParams = new URLSearchParams(window.location.search);
      const view = urlParams.get('view') || urlParams.get('puzzle');
      if (view === 'bundle-challenge' || view === 'hai-bundle' || view === '5' || view === 'puzzle5') {
        window.HaiBundleEngine.init();
      }
    });
  }
})();
