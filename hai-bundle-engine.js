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
    // Soft hardware click for equipment controls and adjustments
    playHardwareClick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.035);
        gain.gain.setValueAtTime(0.3 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.045);
      } catch (e) {}
    }

    // Subtle ambient hospital room tone (soft 55Hz hum)
    startRoomTone() {
      if (!this.enabled || this.roomToneOsc) return;
      this.init();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        this.roomToneOsc = this.ctx.createOscillator();
        this.roomToneGain = this.ctx.createGain();
        this.roomToneOsc.type = 'sine';
        this.roomToneOsc.frequency.setValueAtTime(55, now);
        this.roomToneGain.gain.setValueAtTime(0.025 * this.volume, now);
        this.roomToneOsc.connect(this.roomToneGain);
        this.roomToneGain.connect(this.ctx.destination);
        this.roomToneOsc.start();
      } catch (e) {}
    }

    stopRoomTone() {
      if (this.roomToneOsc) {
        try {
          this.roomToneOsc.stop();
          this.roomToneOsc.disconnect();
        } catch (e) {}
        this.roomToneOsc = null;
        this.roomToneGain = null;
      }
    }

    // Web Speech API Voice Handover (Natural English Speech)
    speakHandover(text, onEnd) {
      if (!this.enabled) return;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'en-US';
          utterance.rate = 0.95;
          utterance.pitch = 1.0;
          utterance.volume = Math.min(1.0, this.volume * 1.2);
          if (typeof onEnd === 'function') utterance.onend = onEnd;
          window.speechSynthesis.speak(utterance);
        } catch (e) {}
      }
    }

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
  let currentLang = localStorage.getItem('hai_bundle_lang') || 'en';

  function setLanguage(lang) {
    currentLang = (lang === 'ar') ? 'ar' : 'en';
    try { localStorage.setItem('hai_bundle_lang', currentLang); } catch(e) {}
    render();
  }

  function toggleLanguage() {
    setLanguage(currentLang === 'en' ? 'ar' : 'en');
  }

  function t(en, ar) {
    return currentLang === 'en' ? en : ar;
  }

  const STORAGE_KEYS = {
    SEEN_IDS: 'hai_bundle_seen_ids',
    ACTIVE_SESSION: 'hai_bundle_active_session',
    REDUCED_MOTION: 'hai_bundle_reduced_motion',
    CUSTOM_SETTINGS: 'hai_bundle_custom_settings',
    HANDOVER_SESSION: 'hai_bundle_handover_session'
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
  // 5. INTERACTIVE PHOTOREALISTIC ROOM SCENES & DIAGRAM GENERATORS
  // =========================================================================

  /**
   * CLABSI Scene: Realistic Oncology Procedural Room with Central Venous Line insertion setup,
   * drape breach hotspot, and access hub macro close-up.
   */
  function renderClabsiSceneSvg(caseObj, isZoomed = false) {
    const isLoose = caseObj.sceneObject === 'dressing_loose';
    const isWet = caseObj.sceneObject === 'dressing_wet';
    const isOozing = caseObj.sceneObject === 'oozing_site';
    const isHub = caseObj.sceneObject === 'hub' || isZoomed;
    const isSmallDrape = caseObj.sceneObject === 'drape' || caseObj.id === 'CLABSI-01' || caseObj.id === 'CLABSI-21';

    if (isZoomed) {
      // Macro Close-Up on Needleless Access Hub
      return `
        <div class="relative w-full h-[260px] sm:h-[300px] bg-slate-950 rounded-2xl border-2 border-cyan-400 p-3 flex flex-col items-center justify-between overflow-hidden shadow-2xl">
          <div class="w-full flex items-center justify-between text-xs px-2 z-10">
            <span class="px-2.5 py-1 rounded-full bg-cyan-950/90 border border-cyan-400 text-cyan-200 font-black flex items-center gap-1.5">
              <span>🔍</span> <span>${t('Macro Close-Up: Needleless Access Hub & Site', 'لقطة مكبّرة: منفذ الوصول الوريدي وغيار القسطرة')}</span>
            </span>
            <button onclick="window.HaiBundleEngine.toggleSceneZoom(false)" class="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer">
              <span>✕</span> <span>${t('Exit Zoom', 'تصغير المشهد')}</span>
            </button>
          </div>

          <!-- High-res close-up interaction -->
          <div class="relative flex flex-col items-center justify-center my-auto">
            <div class="relative cursor-pointer group" onclick="window.HaiBundleEngine.interactSceneElement('hub')" role="button" tabindex="0" title="${t('Click to scrub hub for 15s', 'انقر لفرك المنفذ 15 ثانية')}">
              <div class="w-48 h-24 bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-700 rounded-2xl border-4 border-cyan-300 shadow-xl flex items-center justify-between px-4 group-hover:scale-105 transition-transform">
                <div class="w-8 h-8 rounded-full bg-slate-200 border-2 border-sky-900 flex items-center justify-center font-black text-xs text-sky-900">IV</div>
                <div class="flex flex-col items-center">
                  <span class="text-xs font-black text-white">${t('Access Hub', 'منفذ الوصول')}</span>
                  <span class="text-[10px] text-cyan-100 font-bold">${t('70% Alcohol Scrub', 'فرك بكحول 70%')}</span>
                </div>
                <div class="w-6 h-6 rounded-full bg-amber-400 animate-ping opacity-75"></div>
              </div>
            </div>
            <div class="mt-3 text-center">
              <span class="text-xs font-bold text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-xl border border-cyan-500/40">
                💡 ${t('Vigorously scrub the access hub with 70% alcohol for 15 seconds and allow to fully dry.', 'افرك منفذ الوصول جيداً بكحول 70% لمدة 15 ثانية ودعه يجف تماماً.')}
              </span>
            </div>
          </div>

          <div class="text-[11px] text-slate-300 bg-slate-900/90 px-3 py-1 rounded-xl">
            ${t('Click the hub or select your answer from the options on the right.', 'انقر على المنفذ أو حدد الإجراء المطلوب من الخيارات.')}
          </div>
        </div>
      `;
    }

    // Realistic Overview Scene
    return `
      <div class="relative w-full h-[230px] sm:h-[270px] bg-slate-950 rounded-2xl border border-cyan-500/50 overflow-hidden shadow-xl flex flex-col justify-between group">
        <!-- Photorealistic Background Image -->
        <img src="clabsi_realistic_scene.jpg" alt="CLABSI Procedural Scene" class="absolute inset-0 w-full h-full object-cover object-center brightness-95 contrast-105 group-hover:scale-101 transition-transform duration-500 pointer-events-none" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/70 pointer-events-none"></div>

        <!-- Top Overlay Header -->
        <div class="relative z-10 flex items-center justify-between text-xs p-2 sm:p-2.5">
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900/85 backdrop-blur-md border border-cyan-400/50 text-cyan-200 font-black">
            <span class="text-sm">🏥</span>
            <span>${t('Oncology Procedural Room — Central Venous Catheter Care', 'غرفة أورام — عناية القسطرة المركزية')}</span>
          </div>
          <button onclick="window.HaiBundleEngine.toggleSceneZoom(true)" class="px-2.5 py-1 rounded-xl bg-cyan-800/90 hover:bg-cyan-700 text-white border border-cyan-300 text-[11px] font-black transition flex items-center gap-1 shadow cursor-pointer">
            <span>🔍</span> <span>${t('Zoom Access Hub', 'تكبير المنفذ')}</span>
          </button>
        </div>

        <!-- Interactive Hotspots on the Realistic Image -->
        <div class="relative z-10 flex items-center justify-center gap-2 p-2">
          ${isSmallDrape ? `
            <button onclick="window.HaiBundleEngine.interactSceneElement('drape')" class="px-3 py-1.5 rounded-xl bg-amber-500/95 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg border border-amber-200 flex items-center gap-1.5 animate-pulse cursor-pointer">
              <span>⚠️</span> <span>${t('Observed: Small Drape Only (Breach)', 'الملاحظة: غطاء صغير فقط (خرق)')}</span>
            </button>
          ` : `
            <div class="px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-cyan-400/40 text-cyan-300 text-xs font-bold flex items-center gap-1">
              <span>🛡️</span> <span>${t('Maximal Sterile Barriers: Cap, Mask, Gown, Gloves, Full Drape', 'الحواجز المعقمة القصوى: غطاء رأس، كمامة، مئزر، قفازات، غطاء كامل الجسم')}</span>
            </div>
          `}
        </div>

        <!-- Bottom Scene Footer Banner -->
        <div class="relative z-10 flex items-center justify-between text-[11px] text-cyan-100 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 border-t border-cyan-500/30">
          <div class="flex items-center gap-1.5">
            <span>💡</span>
            <span class="truncate">${t('Examine the procedural setup. Choose the indicated bundle action on the right.', 'افحص المشهد السريري وحدد الإجراء الصحيح وفق حزمة الوقاية بالجانب الأيمن.')}</span>
          </div>
          <span class="text-cyan-300 font-mono font-bold shrink-0">${caseObj.id}</span>
        </div>
      </div>
    `;
  }

  /**
   * CAUTI Scene: Realistic Bedside with Indwelling Urinary Catheter Setup,
   * downhill drainage tubing, bag elevation/floor state, and kink untwist hotspots.
   */
  function renderCautiSceneSvg(caseObj) {
    const p = session.multiStepProgress[caseObj.id] || {};
    const isBagHigh = caseObj.sceneObject === 'bag_height' && !p.bagLowered;
    const isTouchingFloor = caseObj.sceneObject === 'bag_on_floor' && !p.bagHanging;
    const isKinked = (caseObj.sceneObject === 'tubing_kink' || caseObj.id === 'CAUTI-21' || (caseObj.multiStep && caseObj.stepId === 'untwist_kink')) && !p.kinkUntwisted;

    return `
      <div class="relative w-full h-[230px] sm:h-[270px] bg-slate-950 rounded-2xl border border-amber-500/50 overflow-hidden shadow-xl flex flex-col justify-between group">
        <!-- Photorealistic Background Image -->
        <img src="cauti_realistic_scene.jpg" alt="CAUTI Bedside Scene" class="absolute inset-0 w-full h-full object-cover object-center brightness-95 contrast-105 group-hover:scale-101 transition-transform duration-500 pointer-events-none" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-slate-950/70 pointer-events-none"></div>

        <!-- Top Overlay Header -->
        <div class="relative z-10 flex items-center justify-between text-xs p-2 sm:p-2.5">
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900/85 backdrop-blur-md border border-amber-400/50 text-amber-200 font-black">
            <span class="text-sm">🚽</span>
            <span>${t('Inpatient Bedside — Indwelling Urinary Catheter Care', 'سرير المريض — عناية القسطرة البولية الثابتة')}</span>
          </div>
          <!-- Status Badges -->
          <div class="flex items-center gap-1">
            ${isBagHigh ? `
              <button onclick="window.HaiBundleEngine.interactSceneElement('lower_bag')" class="px-2.5 py-1 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow animate-bounce flex items-center gap-1 cursor-pointer">
                <span>⬇️</span> <span>${t('Lower Bag Below Bladder', 'اخفض الكيس تحت المثانة')}</span>
              </button>
            ` : isTouchingFloor ? `
              <button onclick="window.HaiBundleEngine.interactSceneElement('lower_bag')" class="px-2.5 py-1 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs shadow animate-bounce flex items-center gap-1 cursor-pointer">
                <span>⬆️</span> <span>${t('Hang Bag Off Floor', 'ارفع الكيس عن الأرض')}</span>
              </button>
            ` : `
              <span class="px-2.5 py-0.5 rounded-xl bg-emerald-950/90 border border-emerald-400 text-emerald-300 font-bold text-xs flex items-center gap-1">
                <span>✓</span> <span>${t('Bag Below Bladder & Off Floor', 'الكيس سليم ومرفوع')}</span>
              </span>
            `}
          </div>
        </div>

        <!-- Center Interactive Tubing & Kink Hotspot -->
        <div class="relative z-10 flex items-center justify-center gap-2 p-2">
          ${isKinked ? `
            <button onclick="window.HaiBundleEngine.interactSceneElement('untwist_kink')" class="px-3 py-1.5 rounded-xl bg-amber-500/95 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg border border-amber-200 flex items-center gap-1.5 animate-pulse cursor-pointer">
              <span>〰️</span> <span>${t('Observed: Tubing Kinked (Click to Untwist)', 'الملاحظة: التواء الأنبوب (انقر لتحريره)')}</span>
            </button>
          ` : `
            <div class="px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-amber-400/40 text-amber-200 text-xs font-bold flex items-center gap-1">
              <span>✓</span> <span>${t('Continuous Downhill Flow • Thigh Stabilized', 'تصريف مستمر سالك • القسطرة مثبتة بالفخذ')}</span>
            </div>
          `}
        </div>

        <!-- Bottom Scene Footer Banner -->
        <div class="relative z-10 flex items-center justify-between text-[11px] text-amber-100 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 border-t border-amber-500/30">
          <div class="flex items-center gap-1.5">
            <span>💡</span>
            <span class="truncate">${t('Keep drainage bag below bladder level, clear of floor, with unobstructed flow.', 'حافظ على الكيس تحت المثانة وبعيداً عن الأرض مع تصريف مستمر دون التواء.')}</span>
          </div>
          <span class="text-amber-300 font-mono font-bold shrink-0">${caseObj.id}</span>
        </div>
      </div>
    `;
  }

  /**
   * VAP Scene: Realistic ICU Room with Ventilated Patient,
   * HOB angle elevation control, endotracheal tube holder, inline suction, and oral care set.
   */
  function renderVapSceneSvg(caseObj) {
    const p = session.multiStepProgress[caseObj.id] || {};
    const isFlat = (caseObj.sceneObject === 'bed_angle' || caseObj.id === 'VAP-01' || caseObj.id === 'VAP-04') && !p.bedAngleAdjusted;
    const currentAngle = isFlat ? 10 : 35;

    return `
      <div class="relative w-full h-[230px] sm:h-[270px] bg-slate-950 rounded-2xl border border-teal-500/50 overflow-hidden shadow-xl flex flex-col justify-between group">
        <!-- Photorealistic Background Image -->
        <img src="vap_realistic_scene.jpg" alt="VAP ICU Scene" class="absolute inset-0 w-full h-full object-cover object-center brightness-95 contrast-105 group-hover:scale-101 transition-transform duration-500 pointer-events-none" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-slate-950/70 pointer-events-none"></div>

        <!-- Top Overlay Header -->
        <div class="relative z-10 flex items-center justify-between text-xs p-2 sm:p-2.5">
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900/85 backdrop-blur-md border border-teal-400/50 text-teal-200 font-black">
            <span class="text-sm">🫁</span>
            <span>${t('ICU — Mechanical Ventilation & VAP Prevention', 'العناية المركزة — حزمة الوقاية من ذات الرئة VAP')}</span>
          </div>
          <!-- HOB Angle Control -->
          <div>
            ${isFlat ? `
              <button onclick="window.HaiBundleEngine.interactSceneElement('adjust_bed_angle')" class="px-2.5 py-1 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs shadow animate-bounce flex items-center gap-1 cursor-pointer">
                <span>📐</span> <span>${t('Elevate HOB to 30°–45°', 'ارفع الرأس إلى 30°–45°')}</span>
              </button>
            ` : `
              <span class="px-2.5 py-0.5 rounded-xl bg-emerald-950/90 border border-emerald-400 text-emerald-300 font-bold text-xs flex items-center gap-1">
                <span>✓</span> <span>${t(`HOB Angle: ${currentAngle}° Compliant`, `الزاوية ${currentAngle}° مطابقة`)}</span>
              </span>
            `}
          </div>
        </div>

        <!-- Center Hotspots: Endotracheal Tube & Oral Care -->
        <div class="relative z-10 flex items-center justify-center gap-2 p-2">
          <div class="px-3 py-1 rounded-xl bg-slate-900/85 backdrop-blur-md border border-teal-400/40 text-teal-100 text-xs font-bold flex items-center gap-1.5">
            <span>🪥</span> <span>${t('Daily Toothbrushing & Secretion Management', 'تنظيف الأسنان اليومي وإدارة الإفرازات')}</span>
          </div>
        </div>

        <!-- Bottom Scene Footer Banner -->
        <div class="relative z-10 flex items-center justify-between text-[11px] text-teal-100 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 border-t border-teal-500/30">
          <div class="flex items-center gap-1.5">
            <span>💡</span>
            <span class="truncate">${t('VAP Bundle: Head of bed 30°–45°, sedative interruption & weaning assessment, oral hygiene.', 'حزمة VAP: رفع الرأس 30°–45°، تخفيف المهدئات، وتقييم الفطام، والعناية بالفم.')}</span>
          </div>
          <span class="text-teal-300 font-mono font-bold shrink-0">${caseObj.id}</span>
        </div>
      </div>
    `;
  }

  /**
   * SSI Scene: Realistic Surgical Suite with Sterile OR Field,
   * chlorhexidine skin prep, surgical team attire, and prophylaxis timeline.
   */
  function renderSsiSceneSvg(caseObj) {
    const isHairCase = caseObj.id === 'SSI-02' || caseObj.id === 'SSI-03' || caseObj.id === 'SSI-04';
    const isTimingCase = caseObj.id === 'SSI-05' || caseObj.id === 'SSI-06' || caseObj.id === 'SSI-07' || caseObj.id === 'SSI-08' || caseObj.id === 'SSI-21' || caseObj.id === 'SSI-24';
    const isPrepCase = caseObj.id === 'SSI-13' || caseObj.id === 'SSI-14' || caseObj.id === 'SSI-15';

    return `
      <div class="relative w-full h-[230px] sm:h-[270px] bg-slate-950 rounded-2xl border border-emerald-500/50 overflow-hidden shadow-xl flex flex-col justify-between group">
        <!-- Photorealistic Background Image -->
        <img src="ssi_realistic_scene.jpg" alt="SSI Surgical Operating Suite" class="absolute inset-0 w-full h-full object-cover object-center brightness-95 contrast-105 group-hover:scale-101 transition-transform duration-500 pointer-events-none" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-slate-950/70 pointer-events-none"></div>

        <!-- Top Overlay Header -->
        <div class="relative z-10 flex items-center justify-between text-xs p-2 sm:p-2.5">
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900/85 backdrop-blur-md border border-emerald-400/50 text-emerald-200 font-black">
            <span class="text-sm">🏥</span>
            <span>${t('Surgical Suite — Perioperative SSI Prevention', 'جناح العمليات الجراحية — حزمة الوقاية من عدوى موضع الجراحة')}</span>
          </div>
          <div class="px-2.5 py-0.5 rounded-xl bg-slate-900/80 border border-emerald-400/50 text-emerald-300 font-bold text-xs flex items-center gap-1">
            <span>🛡️</span> <span>${t('Sterile Surgical Field', 'الحقل الجراحي المعقم')}</span>
          </div>
        </div>

        <!-- Center Hotspots: Hair / Prep / Prophylaxis Timing -->
        <div class="relative z-10 flex items-center justify-center gap-2 p-2">
          ${isTimingCase ? `
            <div class="px-3 py-1.5 rounded-xl bg-emerald-950/90 border border-emerald-400 text-emerald-200 text-xs font-black flex items-center gap-1.5 shadow">
              <span>⏱️</span> <span>${t('Prophylaxis Window: Within 60 min before incision', 'نافذة المضاد الوقائي: خلال 60 دقيقة قبل الشق')}</span>
            </div>
          ` : isHairCase ? `
            <div class="px-3 py-1.5 rounded-xl bg-amber-950/90 border border-amber-400 text-amber-200 text-xs font-black flex items-center gap-1.5 shadow">
              <span>✂️</span> <span>${t('Hair Removal: Leave in place; use clippers only if necessary', 'إزالة الشعر: اتركه في مكانه؛ وعند الضرورة استخدم ماكينة القص')}</span>
            </div>
          ` : `
            <div class="px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-emerald-400/50 text-emerald-100 text-xs font-bold flex items-center gap-1.5">
              <span>🧴</span> <span>${t('Chlorhexidine-Alcohol Skin Prep • Full Air Dry', 'تطهير الجلد بكلورهيكسيدين كحولي • جفاف هوائي كامل')}</span>
            </div>
          `}
        </div>

        <!-- Bottom Scene Footer Banner -->
        <div class="relative z-10 flex items-center justify-between text-[11px] text-emerald-100 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 border-t border-emerald-500/30">
          <div class="flex items-center gap-1.5">
            <span>💡</span>
            <span class="truncate">${t('SSI Bundle: Timely prophylaxis, alcohol chlorhexidine prep, clippers only if needed, normothermia & euglycemia.', 'حزمة SSI: توقيت المضاد، تحضير كحولي، قص الشعر عند اللزوم، استقرار الحرارة والسكر.')}</span>
          </div>
          <span class="text-emerald-300 font-mono font-bold shrink-0">${caseObj.id}</span>
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
        return renderClabsiSceneSvg(caseObj, isZoomed);
    }
  }

  // 6. UI RENDERERS (START SCREEN, QUESTION SCREEN, RESULTS)
  // =========================================================================

  /**
   * Main Entry Render: decides between Start Screen, Gameplay, and Results.
   */
  function render() {
    const container = document.getElementById('view-bundle-challenge');
    if (!container) return;

    if (session.mode === 'handover' && handoverState.active) {
      renderHandoverScreen(container);
    } else if (!session.isRunning && !session.isCompleted) {
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
    const playableHandover = getPlayableHandoverCards();
    const allHandover = window.HAI_HANDOVER_CASES || [];

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
        <div class="relative w-24 h-24 sm:w-28 sm:h-28 my-1 flex items-center justify-center">
          <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]">
            <path d="M 50 10 L 20 22 L 20 50 L 50 50 Z" fill="#0891b2" stroke="#22d3ee" stroke-width="2" opacity="0.9" />
            <path d="M 50 10 L 80 22 L 80 50 L 50 50 Z" fill="#d97706" stroke="#fbbf24" stroke-width="2" opacity="0.9" />
            <path d="M 20 50 L 20 65 Q 50 95 50 90 L 50 50 Z" fill="#0d9488" stroke="#2dd4bf" stroke-width="2" opacity="0.9" />
            <path d="M 80 50 L 80 65 Q 50 95 50 90 L 50 50 Z" fill="#059669" stroke="#34d399" stroke-width="2" opacity="0.9" />
            <circle cx="50" cy="50" r="14" fill="#0f172a" stroke="#60a5fa" stroke-width="2.5" />
            <text x="50" y="55" fill="#ffffff" font-size="12" font-weight="black" text-anchor="middle">🛡️</text>
          </svg>
        </div>

        <h1 class="text-2xl sm:text-3xl font-black text-white tracking-wide mt-1">
          أكمل الحزمة | HAI Bundle Challenge
        </h1>
        <p class="text-xs sm:text-sm text-blue-200 mt-1 max-w-2xl leading-relaxed">
          التحدي السريري الشامل لحزم الوقاية من عدوى الرعاية الصحية وفق دلائل WHO وCDC وSHEA • بطاقات الحالات السريرية وتدريب تسليم الوردية.
        </p>

        <!-- The 4 Core Clinical Stations -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-2xl mt-4 text-right">
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
      </div>

      <!-- DECK SELECTOR & PRACTICE MODES GALLERY -->
      <div class="w-full max-w-4xl mx-auto flex flex-col gap-4 text-left" dir="ltr">
        
        <!-- FEATURED MODE: THE HANDOVER (BEDSIDE CLINICAL PRACTICE) -->
        <div class="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#02183b] via-[#052d5e] to-[#021329] border-2 border-cyan-400/80 shadow-2xl text-white flex flex-col gap-4">
          <div class="flex items-start justify-between gap-3 border-b border-cyan-500/30 pb-3">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-2xl shrink-0">
                🤝
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                    PRACTICE MODE
                  </span>
                  <span class="text-xs font-bold text-cyan-300">English Case Text & Voice Scripts</span>
                </div>
                <h2 class="text-lg sm:text-xl font-black text-white mt-1">
                  The Handover — Bedside Clinical Practice
                </h2>
                <div class="text-xs text-cyan-200 mt-0.5">
                  وضع تسليم الوردية: تلقي التقرير • فحص الأدلة بالسرير والسجل • التصحيح • التفسير • التسليم للوردية التالية
                </div>
              </div>
            </div>

            <!-- Mode Switcher Pill (Solo vs Pair) -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button onclick="window.HaiBundleEngine.togglePairMode()" class="px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${handoverState.pairMode ? 'bg-indigo-600 text-white border border-indigo-400 shadow' : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'}">
                ${handoverState.pairMode ? '👥 Pair Setup' : '🧑‍⚕️ Solo Play'}
              </button>
              <button onclick="window.HaiBundleEngine.openPrintableRoleCardsModal()" class="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition flex items-center gap-1 cursor-pointer" title="Printable role cards for classroom pairs">
                <span>🖨️</span> <span class="hidden sm:inline">Role Cards</span>
              </button>
            </div>
          </div>

          <!-- Round Flow Steps Banner -->
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            <div class="p-2 rounded-xl bg-slate-900/60 border border-cyan-500/30 flex flex-col">
              <span class="font-black text-cyan-300">1. Handover</span>
              <span class="text-[10px] text-slate-300">Two-sentence report + audio</span>
            </div>
            <div class="p-2 rounded-xl bg-slate-900/60 border border-cyan-500/30 flex flex-col">
              <span class="font-black text-cyan-300">2. Inspect</span>
              <span class="text-[10px] text-slate-300">Bedside room & chart evidence</span>
            </div>
            <div class="p-2 rounded-xl bg-slate-900/60 border border-cyan-500/30 flex flex-col">
              <span class="font-black text-cyan-300">3. Act</span>
              <span class="text-[10px] text-slate-300">Adjust equipment & audit</span>
            </div>
            <div class="p-2 rounded-xl bg-slate-900/60 border border-cyan-500/30 flex flex-col">
              <span class="font-black text-cyan-300">4. Explain</span>
              <span class="text-[10px] text-slate-300">Support decision with standard</span>
            </div>
            <div class="p-2 rounded-xl bg-slate-900/60 border border-cyan-500/30 flex flex-col col-span-2 sm:col-span-1">
              <span class="font-black text-cyan-300">5. Hand Off</span>
              <span class="text-[10px] text-slate-300">SBAR reflection & model answer</span>
            </div>
          </div>

          <!-- Starter Cards Gallery Selector -->
          <div class="flex flex-col gap-2 mt-1">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black uppercase tracking-wider text-cyan-300">
                Playable Starter Cards (${playableHandover.length} Verified Decks):
              </span>
              ${!isStudent && allHandover.some(c => c.sourceReview) ? `
                <span class="text-[10px] px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black">
                  TRAINER PREVIEW: SOURCE REVIEW DRAFTS INCLUDED
                </span>
              ` : ''}
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              ${(isStudent ? playableHandover : allHandover).map(c => `
                <div onclick="window.HaiBundleEngine.startHandoverPractice('${c.id}')" tabindex="0" role="button" aria-label="Start card ${c.code}: ${c.title}" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); window.HaiBundleEngine.startHandoverPractice('${c.id}');}" class="group p-3 rounded-2xl bg-slate-900/80 hover:bg-[#03244d] border border-cyan-500/40 hover:border-cyan-300 transition-all cursor-pointer flex flex-col justify-between shadow hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                  <div>
                    <div class="flex items-center justify-between gap-1 mb-1">
                      <span class="font-mono text-xs font-black text-cyan-400">${c.code}</span>
                      <span class="text-[10px] px-1.5 py-0.2 rounded ${c.sourceReview ? 'bg-amber-400 text-slate-950 font-black' : 'bg-blue-900 text-blue-200 font-bold'}">
                        ${c.sourceReview ? 'Source Review' : c.deck + ' Deck'}
                      </span>
                    </div>
                    <div class="text-xs font-black text-white group-hover:text-cyan-200 transition">
                      ${c.title}
                    </div>
                    <p class="text-[11px] text-slate-300 mt-1 line-clamp-2">
                      "${c.voiceHandover}"
                    </p>
                  </div>
                  <div class="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span class="truncate max-w-[170px]">${c.facilityForm || 'Facility Form Verified'}</span>
                    <span class="text-cyan-400 font-bold">Play ▶</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Launch Handover Button -->
          <div class="pt-2 flex items-center justify-between gap-3">
            <button onclick="window.HaiBundleEngine.startHandoverPractice()" class="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-500 hover:from-cyan-500 hover:to-teal-400 text-white font-black text-sm shadow-xl transition transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-cyan-300">
              <span>🚀</span> <span>Launch The Handover Practice Mode</span>
            </button>
          </div>
        </div>

        <!-- STANDARD QUICK CHALLENGE & FULL BANK CARDS -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Quick Round Card -->
          <div class="p-4 rounded-3xl bg-white border border-slate-300 shadow flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xl">⚡</span>
                <div>
                  <h3 class="text-sm font-black text-slate-900">Standard Quick Challenge</h3>
                  <span class="text-[11px] text-slate-500">8 Diverse Cases • 9-Minute Timer</span>
                </div>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                Experience a rapid clinical rotation covering 2 balanced cases from each station (CLABSI, CAUTI, VAP, SSI) with real-time scoring.
              </p>
            </div>
            <button onclick="window.HaiBundleEngine.startQuickRound()" class="mt-4 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition shadow flex items-center justify-center gap-1.5 cursor-pointer">
              <span>🚀 Start Quick Round</span>
            </button>
          </div>

          <!-- All Cases Practice Card -->
          <div class="p-4 rounded-3xl bg-white border border-slate-300 shadow flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xl">📚</span>
                <div>
                  <h3 class="text-sm font-black text-slate-900">All 100 Clinical Cases</h3>
                  <span class="text-[11px] text-slate-500">Comprehensive Case Bank Practice</span>
                </div>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                Explore all 100 scenario cards across adult acute care: bundle builders, spot-the-error scenes, and record audits without time pressure.
              </p>
            </div>
            <button onclick="window.HaiBundleEngine.startAllCasesPractice()" class="mt-4 w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs transition shadow flex items-center justify-center gap-1.5 cursor-pointer">
              <span>📖 Browse All 100 Cases</span>
            </button>
          </div>
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
      bundle_builder: { name: t('Bundle Builder', 'بناء الحزمة'), icon: '📋' },
      spot_error: { name: t('Spot the Error in Scene', 'اكتشاف الخطأ في المشهد'), icon: '🔍' },
      record_audit: { name: t('Clinical Record Audit', 'تدقيق سجل سريري'), icon: '📊' }
    };
    const tType = taskTypeNames[c.taskType] || { name: t('Clinical Decision', 'قرار سريري'), icon: '💡' };

    // Shuffled options cached for stability during the case display
    if (!c._shuffledOptions) {
      c._shuffledOptions = [...c.options].sort(() => Math.random() - 0.5);
    }

    container.innerHTML = `
      <!-- TOP STATUS ROW (TIMER, PROGRESS, BADGES, CONTROLS) -->
      <div class="w-full bg-white border border-slate-300 rounded-2xl p-2 sm:p-3 shadow-sm flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <button onclick="window.HaiBundleEngine.confirmQuitRound()" class="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1" title="إنهاء الجولة والعودة">
            <span>✕</span> <span class="hidden sm:inline">${t('Quit', 'إنهاء')}</span>
          </button>
          
          <!-- Station Badge -->
          <div class="px-3 py-1 rounded-xl ${st.themeClasses} border font-black text-xs flex items-center gap-1.5">
            <span>${st.icon}</span>
            <span>${t(st.code + ' Station', st.shortName)}</span>
          </div>

          <!-- Language Switcher Pill -->
          <button onclick="window.HaiBundleEngine.toggleLanguage()" class="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-black transition flex items-center gap-1 cursor-pointer shadow-sm" title="${t('Switch to Arabic', 'التبديل إلى الإنجليزية')}">
            <span>🌐</span>
            <span>${currentLang === 'en' ? 'EN | عربي' : 'عربي | EN'}</span>
          </button>

          <!-- Progress Counter -->
          <span class="text-xs font-bold text-slate-600">
            ${t(`Case <strong>${session.currentIndex + 1}</strong> of <strong>${session.cases.length}</strong>`, `الحالة <strong>${session.currentIndex + 1}</strong> من <strong>${session.cases.length}</strong>`)}
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
            <span>${session.timeRemaining === null ? t('Untimed', 'حر') : timeStr}</span>
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

            <!-- Case Vignette Text (Bilingual) -->
            <div class="text-sm sm:text-base font-black text-slate-900 leading-relaxed pt-1" dir="${currentLang === 'en' ? 'ltr' : 'rtl'}">
              ${currentLang === 'en' ? (c.vignetteEn || c.vignette) : c.vignette}
            </div>

            <!-- Prompt Question (Bilingual) -->
            <div class="text-xs sm:text-sm font-bold text-blue-900 bg-blue-50/70 p-2.5 rounded-xl border border-blue-200" dir="${currentLang === 'en' ? 'ltr' : 'rtl'}">
              ❓ ${currentLang === 'en' ? (c.promptEn || c.prompt) : c.prompt}
            </div>

            <!-- AUDIT DECISION BUTTONS (IF AUDIT CASE) OR MULTIPLE CHOICE OPTIONS -->
            ${c.isAudit ? renderAuditActionButtons(c, answerData) : renderStandardOptions(c, answerData)}

            <!-- "لماذا؟" (WHY?) FEEDBACK CARD WITH OFFICIAL SOURCE LINK -->
            ${isAnswered ? renderWhyFeedbackCard(c, answerData) : ''}

            <!-- Next Case / Finish Button -->
            ${isAnswered ? `
              <div class="pt-2 flex items-center justify-between gap-2">
                <span class="text-xs text-slate-500 font-medium">
                  ${answerData.firstAttemptCorrect ? t('✓ Verified first-attempt correct answer', '✓ إجابة معتمدة للمحاولة الأولى') : t('ℹ️ First attempt recorded; clinical rationale unlocked.', 'ℹ️ سُجلت نتيجة المحاولة الأولى، وتم فتح التفسير السريري.')}
                </span>
                <button onclick="window.HaiBundleEngine.nextCase()" class="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-black text-xs sm:text-sm shadow-md transition active:scale-95 flex items-center gap-1.5 cursor-pointer">
                  <span>${session.currentIndex + 1 < session.cases.length ? t('Next Case', 'الحالة التالية') : t('View Results', 'عرض النتيجة النهائية')}</span>
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
              badge = `<span class="text-emerald-600 font-black">✓ ${t('Verified Bundle Action', 'الإجراء الصحيح المعتمد')}</span>`;
            } else if (answerData.chosenOptionId === opt.id) {
              btnStyle = "bg-red-50 border-red-400 text-red-950";
              badge = `<span class="text-red-600 font-bold">✕ ${t('Non-Compliant Choice', 'إجابة غير دقيقة')}</span>`;
            } else {
              btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-70";
            }
          }

          const optText = currentLang === 'en' ? (opt.textEn || opt.text) : opt.text;
          const rejReason = currentLang === 'en' ? (opt.rejectionReasonEn || opt.rejectionReason) : opt.rejectionReason;
          const alignClass = currentLang === 'en' ? 'text-left' : 'text-right';

          return `
            <button 
              ${isAnswered ? 'disabled' : ''} 
              onclick="window.HaiBundleEngine.submitAnswer('${opt.id}')"
              dir="${currentLang === 'en' ? 'ltr' : 'rtl'}"
              class="w-full ${alignClass} p-3 rounded-xl border-2 transition-all duration-200 flex flex-col gap-1 text-xs sm:text-sm font-bold shadow-xs active:scale-98 ${btnStyle} cursor-pointer"
            >
              <div class="flex items-start justify-between gap-2">
                <span class="flex-1 leading-normal">${optText}</span>
                ${badge}
              </div>
              ${isAnswered && !opt.isCorrect && rejReason ? `
                <div class="text-[11px] text-red-700 font-medium pt-1 border-t border-red-200/60 mt-1" dir="${currentLang === 'en' ? 'ltr' : 'rtl'}">
                  ${rejReason}
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
      { id: 'تم', label: t('Done (Compliant)', 'تم (Done)'), icon: '✓', color: 'emerald' },
      { id: 'لم يتم', label: t('Not Done (Breach)', 'لم يتم (Not Done)'), icon: '✕', color: 'red' },
      { id: 'غير موثّق', label: t('Not Documented', 'غير موثّق (Undocumented)'), icon: '📝', color: 'amber' },
      { id: 'غير منطبق مع سبب', label: t('Not Applicable w/ Reason', 'غير منطبق مع سبب (N/A)'), icon: '⊘', color: 'slate' }
    ];

    return `
      <div class="flex flex-col gap-1.5 mt-1" dir="${currentLang === 'en' ? 'ltr' : 'rtl'}">
        <div class="text-[11px] text-slate-500 font-bold mb-1">
          ${t('Select the clinical audit status matching the record:', 'حدد حالة التدقيق السريري المطابقة للسجل:')}
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
    const expText = currentLang === 'en' ? (c.explanationEn || c.explanation) : c.explanation;

    return `
      <div class="mt-2.5 p-3.5 rounded-xl bg-gradient-to-br from-slate-900 to-[#031d3b] text-white border border-blue-400/50 shadow-md text-xs flex flex-col gap-2" dir="${currentLang === 'en' ? 'ltr' : 'rtl'}">
        <div class="flex items-center justify-between text-blue-300 font-black text-xs border-b border-blue-500/30 pb-1.5">
          <span class="flex items-center gap-1.5">
            <span>💡</span> <span>${t('Why? • Verified Clinical Rationale', 'لماذا؟ • التفسير السريري المعتمد')}</span>
          </span>
          <span class="text-[10px] text-blue-200 bg-blue-900/60 px-2 py-0.5 rounded-full font-bold">
            ${t('Clinical Key', 'المفتاح السريري')}
          </span>
        </div>

        <!-- Explanation text linked to case clues -->
        <p class="text-slate-200 text-xs leading-relaxed font-medium">
          ${expText}
        </p>

        <!-- Calculation Formula details if applicable -->
        ${c.calculation ? `
          <div class="p-2 rounded-lg bg-blue-950/80 border border-blue-500/40 text-[11px] text-blue-200 flex flex-col gap-1">
            <span class="font-bold text-white">${t('All-or-None Bundle Compliance Formula:', 'معادلة حساب الالتزام الكامل المثبت:')}</span>
            <span>${t('(Fully Verified Opportunities ÷ Eligible Opportunities) × 100', '(الفرص التي ثبت فيها استيفاء جميع العناصر ÷ الفرص المؤهلة) × 100')}</span>
            <span class="font-mono text-cyan-300 font-bold">(${c.calculation.numerator} ÷ ${c.calculation.denominator}) × 100 = ${c.calculation.percentage}%</span>
            <span class="text-[10px] text-slate-300">${t('Crucial Note: Process measure compliance does not translate into clinical infection rate.', 'ملاحظة هامة: لا تحول درجة الالتزام بالعمليات إلى معدل عدوى سريري أو نسبة إصابة.')}</span>
          </div>
        ` : ''}

        <!-- Guideline Source Links with year -->
        <div class="pt-1.5 border-t border-blue-500/30 flex flex-wrap items-center gap-2">
          <span class="text-[10px] text-slate-400 font-bold">${t('Official Guidelines:', 'المراجع المعتمدة:')}</span>
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
      <div class="w-full bg-white border border-slate-300 rounded-2xl p-2 sm:p-3 shadow-sm flex items-center justify-between gap-2" dir="${currentLang === 'en' ? 'ltr' : 'rtl'}">
        <div class="flex items-center gap-2">
          <button onclick="switchMainView('portal')" class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-200 text-xs font-black transition flex items-center gap-1.5 shadow cursor-pointer">
            <span>🏛️</span> <span>${t('All Puzzles Hub', 'الرئيسية | All Puzzles')}</span>
          </button>
          <span class="text-xs font-black text-slate-800">${t('Clinical Bundle Performance Report', 'تقرير إنجاز الحزمة السريرية')}</span>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="window.HaiBundleEngine.toggleLanguage()" class="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-black transition flex items-center gap-1 cursor-pointer">
            <span>🌐</span> <span>${currentLang === 'en' ? 'EN | عربي' : 'عربي | EN'}</span>
          </button>
          <button onclick="window.HaiBundleEngine.startQuickRound()" class="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition shadow flex items-center gap-1 cursor-pointer">
            <span>🔄</span> <span>${t('New Quick Round', 'جولة سريعة جديدة')}</span>
          </button>
        </div>
      </div>

      <!-- MAIN RESULTS CARD -->
      <div class="w-full max-w-4xl mx-auto my-3 p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#02132b] via-[#052347] to-[#011425] border-2 border-blue-400 shadow-2xl text-white flex flex-col gap-5" dir="${currentLang === 'en' ? 'ltr' : 'rtl'}">
        
        <!-- Score & Shield Header -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 border-b border-blue-500/30">
          <div class="flex items-center gap-4 ${currentLang === 'en' ? 'text-left' : 'text-right'}">
            <div class="w-20 h-20 rounded-2xl bg-blue-900/60 border-2 border-blue-400 flex flex-col items-center justify-center font-black shrink-0">
              <span class="text-2xl text-cyan-300">${percent}%</span>
              <span class="text-[10px] text-blue-200 font-bold">${correctCount}/${totalCases} ${t('cases', 'حالات')}</span>
            </div>
            <div>
              <h2 class="text-xl sm:text-2xl font-black text-white">
                ${percent >= 80 ? t('🌟 Outstanding Clinical Bundle Mastery!', '🌟 إتقان سريري متميز لحزم الوقاية!') : (percent >= 60 ? t('👍 Competent Clinical Performance with Areas for Improvement', '👍 أداء سريري جيد مع نقاط للتطوير') : t('⚠️ Bundle Review & Practice Remediation Recommended', '⚠️ بحاجة لمراجعة حزم الوقاية وتصحيح الممارسات'))}
              </h2>
              <p class="text-xs text-blue-200 mt-1">
                ${t('First-attempt clinical decisions scored against WHO, CDC, and SHEA infection prevention standards.', 'سُجلت درجات المحاولة الأولى لكل حالة وفق المعايير السريرية لـ WHO و CDC و SHEA.')}
              </p>
            </div>
          </div>

          <!-- Mastered Skill Highlight -->
          <div class="p-3 rounded-2xl bg-blue-950/80 border border-blue-400/50 ${currentLang === 'en' ? 'text-left' : 'text-right'} shrink-0">
            <span class="text-[10px] font-bold text-cyan-300 block">${t('Core Competency Demonstrated:', 'المهارة المتقنة البارزة:')}</span>
            <span class="text-xs font-black text-white">
              ${percent >= 50 ? t('Evidence-Based IPC Bundle Compliance & Audit', 'تطبيق معايير مكافحة العدوى والتدقيق السريري') : t('Fundamental Bundle Knowledge', 'فهم أساسيات حزمة الوقاية')}
            </span>
          </div>
        </div>

        <!-- PERFORMANCE PER BUNDLE (THE 4 STATIONS) -->
        <div>
          <h3 class="text-sm font-black text-blue-200 mb-2.5">
            ${t('📊 Station-by-Station Performance Breakdown:', '📊 أداء كل حزمة وقاية (Station-by-Station Breakdown):')}
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            ${Object.keys(STATIONS).map(stKey => {
              const st = STATIONS[stKey];
              const stat = stationStats[stKey] || { total: 0, correct: 0 };
              const stPercent = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
              return `
                <div class="p-3 rounded-2xl bg-slate-900/80 border ${st.themeClasses} flex flex-col gap-1 ${currentLang === 'en' ? 'text-left' : 'text-right'}">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-black">${st.icon} ${t(st.code, st.shortName)}</span>
                    <span class="text-xs font-mono font-bold">${stat.correct}/${stat.total}</span>
                  </div>
                  <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mt-1">
                    <div class="bg-cyan-400 h-full rounded-full transition-all" style="width: ${stPercent}%"></div>
                  </div>
                  <span class="text-[10px] text-slate-300 font-bold">${stPercent}% ${t('verified', 'إتقان')}</span>
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
  // =========================================================================
  // 🎴 ANTIGRAVITY ADDENDUM: THE HANDOVER PRACTICE MODE ENGINE
  // =========================================================================

  let handoverState = {
    active: false,
    pairMode: false, // false = Solo, true = Pair Setup
    pairRole: 'both', // 'both' | 'room' (Partner A) | 'chart' (Partner B)
    activeCardId: 'HO-CAUTI-01',
    activeTab: 'room', // 'room' | 'chart' (for mobile / responsive view)
    roomToneActive: false,
    captionsActive: true,
    cardStates: {}
  };

  function getHandoverCard(id) {
    const list = window.HAI_HANDOVER_CASES || [];
    return list.find(c => c.id === id) || list[0];
  }

  function getPlayableHandoverCards() {
    const list = window.HAI_HANDOVER_CASES || [];
    const isStudent = window.isStudentMode || (new URLSearchParams(window.location.search)).get('mode') === 'student';
    if (isStudent) {
      return list.filter(c => !c.sourceReview);
    }
    return list;
  }

  function getCardState(cardId) {
    if (!handoverState.cardStates[cardId]) {
      const card = getHandoverCard(cardId);
      handoverState.cardStates[cardId] = {
        step: 1, // 1: Evidence & Act, 2: Explain, 3: Hand off, 4: Complete
        activeTab: 'room',
        bagLowered: false,
        kinkCleared: false,
        actionOrder: [],
        auditFinding: null,
        fullDrapeAdded: false,
        timingActionTaken: false,
        currentVisit: 1,
        visit1Recorded: false,
        bedAngle: 0,
        completedActions: false,
        actionFeedback: '',
        firstAttemptCorrect: null,
        explainChosen: null,
        explainSubmitted: false,
        explainFeedback: '',
        handoffNotes: { see: '', do: '', tell: '' },
        handoffSubmitted: false
      };
    }
    return handoverState.cardStates[cardId];
  }

  function saveHandoverSession() {
    try {
      const data = {
        active: handoverState.active,
        pairMode: handoverState.pairMode,
        pairRole: handoverState.pairRole,
        activeCardId: handoverState.activeCardId,
        activeTab: handoverState.activeTab,
        roomToneActive: handoverState.roomToneActive,
        captionsActive: handoverState.captionsActive,
        cardStates: handoverState.cardStates
      };
      localStorage.setItem(STORAGE_KEYS.HANDOVER_SESSION, JSON.stringify(data));
    } catch (e) {}
  }

  function tryRestoreHandoverSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.HANDOVER_SESSION);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (data && data.active) {
        handoverState.active = true;
        handoverState.pairMode = !!data.pairMode;
        handoverState.pairRole = data.pairRole || 'both';
        handoverState.activeCardId = data.activeCardId || 'HO-CAUTI-01';
        handoverState.activeTab = data.activeTab || 'room';
        handoverState.roomToneActive = !!data.roomToneActive;
        handoverState.captionsActive = data.captionsActive !== false;
        handoverState.cardStates = data.cardStates || {};
        session.mode = 'handover';
        session.isRunning = true;
        return true;
      }
    } catch (e) {
      localStorage.removeItem(STORAGE_KEYS.HANDOVER_SESSION);
    }
    return false;
  }

  function clearHandoverSession() {
    try {
      localStorage.removeItem(STORAGE_KEYS.HANDOVER_SESSION);
    } catch (e) {}
    soundEngine.stopRoomTone();
    handoverState.active = false;
    handoverState.cardStates = {};
  }

  function startHandoverPractice(cardId) {
    handoverState.active = true;
    session.mode = 'handover';
    session.isRunning = true;
    session.isCompleted = false;
    if (cardId) {
      handoverState.activeCardId = cardId;
    } else {
      const playable = getPlayableHandoverCards();
      handoverState.activeCardId = playable[0] ? playable[0].id : 'HO-CAUTI-01';
    }
    saveHandoverSession();
    render();

    // Auto-trigger speech if sound enabled
    const card = getHandoverCard(handoverState.activeCardId);
    if (card && soundEngine.enabled) {
      setTimeout(() => {
        soundEngine.speakHandover(card.voiceHandover);
      }, 500);
    }
  }

  function switchHandoverCard(cardId) {
    soundEngine.playHardwareClick();
    handoverState.activeCardId = cardId;
    saveHandoverSession();
    render();

    const card = getHandoverCard(cardId);
    if (card && soundEngine.enabled) {
      soundEngine.speakHandover(card.voiceHandover);
    }
  }

  function togglePairMode() {
    soundEngine.playHardwareClick();
    handoverState.pairMode = !handoverState.pairMode;
    if (!handoverState.pairMode) handoverState.pairRole = 'both';
    saveHandoverSession();
    render();
  }

  function setPairRole(role) {
    soundEngine.playHardwareClick();
    handoverState.pairRole = role;
    saveHandoverSession();
    render();
  }

  function switchHandoverTab(tab) {
    soundEngine.playHardwareClick();
    handoverState.activeTab = tab;
    const st = getCardState(handoverState.activeCardId);
    st.activeTab = tab;
    saveHandoverSession();
    render();
  }

  function toggleHandoverRoomTone() {
    handoverState.roomToneActive = !handoverState.roomToneActive;
    if (handoverState.roomToneActive) {
      soundEngine.startRoomTone();
    } else {
      soundEngine.stopRoomTone();
    }
    saveHandoverSession();
    render();
  }

  function toggleHandoverCaptions() {
    soundEngine.playHardwareClick();
    handoverState.captionsActive = !handoverState.captionsActive;
    saveHandoverSession();
    render();
  }

  function replayHandoverVoice() {
    soundEngine.init();
    const card = getHandoverCard(handoverState.activeCardId);
    if (card) {
      soundEngine.speakHandover(card.voiceHandover);
    }
  }

  // -------------------------------------------------------------------------
  // CLINICAL ACTIONS HANDLERS (STEP 3: ACT)
  // -------------------------------------------------------------------------

  function performHandoverAction(actionId, param) {
    const cardId = handoverState.activeCardId;
    const card = getHandoverCard(cardId);
    const st = getCardState(cardId);

    soundEngine.playHardwareClick();

    if (cardId === 'HO-CAUTI-01') {
      if (actionId === 'lower_bag') {
        st.bagLowered = true;
        if (!st.actionOrder.includes('bag')) st.actionOrder.push('bag');
      } else if (actionId === 'clear_kink') {
        st.kinkCleared = true;
        if (!st.actionOrder.includes('kink')) st.actionOrder.push('kink');
      }

      // Check feedback based on exact combination
      if (st.bagLowered && st.kinkCleared) {
        st.completedActions = true;
        st.actionFeedback = card.feedbackMessages.bothDone;
        soundEngine.playCorrectChime();
        if (st.firstAttemptCorrect === null) st.firstAttemptCorrect = true;
      } else if (st.bagLowered && !st.kinkCleared) {
        st.actionFeedback = card.feedbackMessages.bagOnly;
      } else if (!st.bagLowered && st.kinkCleared) {
        st.actionFeedback = card.feedbackMessages.kinkOnly;
      }
    }

    else if (cardId === 'HO-CVC-01') {
      if (actionId === 'add_full_drape') {
        st.fullDrapeAdded = true;
        st.completedActions = true;
        st.actionFeedback = card.feedbackMessages.correctAction;
        soundEngine.playCorrectChime();
        if (st.firstAttemptCorrect === null) st.firstAttemptCorrect = true;
      }
    }

    else if (cardId === 'HO-SSI-01' || cardId === 'HO-SSI-02') {
      if (actionId === 'seek_admin_record' || actionId === 'flag_late_admin') {
        st.timingActionTaken = true;
        st.completedActions = true;
        st.actionFeedback = card.feedbackMessages.correctAction;
        soundEngine.playCorrectChime();
        if (st.firstAttemptCorrect === null) st.firstAttemptCorrect = true;
      }
    }

    else if (cardId === 'HO-VAP-01') {
      if (actionId === 'record_restriction') {
        st.visit1Recorded = true;
        st.actionFeedback = card.visit1.feedback;
        soundEngine.playCorrectChime();
      } else if (actionId === 'advance_visit_2') {
        st.currentVisit = 2;
        st.activeTab = 'room';
        st.actionFeedback = "Advance to 14:00 complete: Spine cleared, hemodynamics stable. Temporary restriction EXPIRED. Adjust bed elevation.";
      } else if (actionId === 'set_angle') {
        const angle = parseInt(param, 10);
        st.bedAngle = angle;
        if (angle >= 30 && angle <= 45) {
          st.completedActions = true;
          st.actionFeedback = card.visit2.feedback;
          soundEngine.playCorrectChime();
          if (st.firstAttemptCorrect === null) st.firstAttemptCorrect = true;
        } else {
          st.actionFeedback = "Head of bed at " + angle + "°. Local ICU bundle specifies 30°–45° for VAP prevention.";
          soundEngine.playRetryTone();
          if (st.firstAttemptCorrect === null) st.firstAttemptCorrect = false;
        }
      }
    }

    saveHandoverSession();
    render();
  }

  function submitHandoverAudit(optionId) {
    const cardId = handoverState.activeCardId;
    const card = getHandoverCard(cardId);
    const st = getCardState(cardId);

    soundEngine.playHardwareClick();
    st.auditFinding = optionId;

    const opt = (card.auditOptions || []).find(o => o.id === optionId);
    if (opt && opt.isCorrect) {
      soundEngine.playToolSnap();
      if (st.firstAttemptCorrect === null) st.firstAttemptCorrect = true;
    } else {
      soundEngine.playRetryTone();
      if (st.firstAttemptCorrect === null) st.firstAttemptCorrect = false;
    }

    saveHandoverSession();
    render();
  }

  function submitHandoverExplain(optionId) {
    const cardId = handoverState.activeCardId;
    const card = getHandoverCard(cardId);
    const st = getCardState(cardId);

    soundEngine.playHardwareClick();
    st.explainChosen = optionId;
    st.explainSubmitted = true;

    const chosen = (card.explainOptions || []).find(o => o.id === optionId);
    if (chosen && chosen.isCorrect) {
      soundEngine.playCorrectChime();
      st.explainFeedback = chosen.feedback;
    } else if (chosen) {
      soundEngine.playRetryTone();
      st.explainFeedback = chosen.feedback;
    }

    saveHandoverSession();
    render();
  }

  function submitHandoverReflection(isSkipped) {
    const cardId = handoverState.activeCardId;
    const st = getCardState(cardId);

    soundEngine.playHardwareClick();
    if (!isSkipped) {
      const seeEl = document.getElementById('handover-ref-see');
      const doEl = document.getElementById('handover-ref-do');
      const tellEl = document.getElementById('handover-ref-tell');
      st.handoffNotes = {
        see: seeEl ? seeEl.value.trim() : '',
        do: doEl ? doEl.value.trim() : '',
        tell: tellEl ? tellEl.value.trim() : ''
      };
    }
    st.handoffSubmitted = true;
    soundEngine.playStationFanfare();
    saveHandoverSession();
    render();
  }

  function nextHandoverCard() {
    soundEngine.playHardwareClick();
    const playable = getPlayableHandoverCards();
    const curIdx = playable.findIndex(c => c.id === handoverState.activeCardId);
    if (curIdx >= 0 && curIdx < playable.length - 1) {
      switchHandoverCard(playable[curIdx + 1].id);
    } else {
      // Completed all
      showToast("🏆 جولة تسليم الوردية مكتملة", "أتممت جميع بطاقات التدريب السريري بنجاح!", "emerald");
      exitHandoverPractice();
    }
  }

  function exitHandoverPractice() {
    soundEngine.stopRoomTone();
    soundEngine.playHardwareClick();
    handoverState.active = false;
    session.mode = 'quick';
    session.isRunning = false;
    saveHandoverSession();
    render();
  }

  // -------------------------------------------------------------------------
  // PRINTABLE PAIR ROLE CARDS MODAL
  // -------------------------------------------------------------------------
  function openPrintableRoleCardsModal() {
    let modal = document.getElementById('handover-role-cards-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'handover-role-cards-modal';
      modal.className = "fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="bg-white border border-slate-300 rounded-3xl max-w-4xl w-full p-5 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto text-left" dir="ltr">
        
        <!-- Modal Controls -->
        <div class="flex items-center justify-between pb-3 border-b border-slate-200 mb-4 print:hidden">
          <div class="flex items-center gap-2">
            <span class="text-2xl">🖨️</span>
            <div>
              <h2 class="text-lg font-black text-slate-900">Printable Clinical Handover Pair Role Cards</h2>
              <span class="text-xs text-slate-500">Instructor-Led Simulation Setup • Two-Learner Bedside Collaboration</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="window.print()" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition shadow flex items-center gap-1.5 cursor-pointer">
              <span>🖨️</span> <span>Print Cards</span>
            </button>
            <button onclick="document.getElementById('handover-role-cards-modal').remove()" class="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition">
              ✕ Close
            </button>
          </div>
        </div>

        <!-- Printable Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2">
          
          <!-- PARTNER A ROLE CARD -->
          <div class="border-2 border-dashed border-cyan-500 rounded-2xl p-5 bg-cyan-50/40 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between border-b border-cyan-200 pb-2 mb-3">
                <span class="px-2.5 py-1 rounded-lg bg-cyan-600 text-white font-black text-xs uppercase tracking-wide">
                  🧑‍⚕️ Partner A: Bedside Observer
                </span>
                <span class="text-xs font-bold text-cyan-800">Room Evidence</span>
              </div>
              <h3 class="font-black text-slate-900 text-base mb-2">Physical Clinical Examination</h3>
              <p class="text-xs text-slate-600 mb-3 leading-relaxed">
                You own the physical room environment. Examine bedside equipment, patient positioning, catheters, dressings, and tubing.
              </p>
              <div class="bg-white rounded-xl p-3 border border-cyan-200 mb-3 text-xs space-y-1.5">
                <div class="font-bold text-slate-800">Your Action Steps:</div>
                <ul class="list-disc list-inside text-slate-600 space-y-1">
                  <li>Inspect bedside apparatus without relying on chart assumptions.</li>
                  <li>Verbally describe observations to Partner B (e.g. drape size, bag height, tubing path, bed elevation).</li>
                  <li>Perform physical bedside corrections (lower bag, clear kink, apply full-body drape, elevate bed).</li>
                </ul>
              </div>
            </div>
            <div class="pt-3 border-t border-cyan-200 text-[10px] text-slate-500 italic">
              Rule: Partner A does not open the medical chart until physical findings are reported.
            </div>
          </div>

          <!-- PARTNER B ROLE CARD -->
          <div class="border-2 border-dashed border-amber-500 rounded-2xl p-5 bg-amber-50/40 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between border-b border-amber-200 pb-2 mb-3">
                <span class="px-2.5 py-1 rounded-lg bg-amber-600 text-white font-black text-xs uppercase tracking-wide">
                  📋 Partner B: Chart Auditor
                </span>
                <span class="text-xs font-bold text-amber-800">Chart Evidence</span>
              </div>
              <h3 class="font-black text-slate-900 text-base mb-2">Electronic Medical Record Audit</h3>
              <p class="text-xs text-slate-600 mb-3 leading-relaxed">
                You own the documentation record. Audit physician orders, nurse transfer flowsheet notes, safety checklists, and timestamps.
              </p>
              <div class="bg-white rounded-xl p-3 border border-amber-200 mb-3 text-xs space-y-1.5">
                <div class="font-bold text-slate-800">Your Action Steps:</div>
                <ul class="list-disc list-inside text-slate-600 space-y-1">
                  <li>Review facility orders, checklist items, and recorded timestamps.</li>
                  <li>Reconcile Partner A's physical observations against signed records.</li>
                  <li>Record audit rating: Done, Not done, Not documented, or N/A.</li>
                </ul>
              </div>
            </div>
            <div class="pt-3 border-t border-amber-200 text-[10px] text-slate-500 italic">
              Rule: Partner B audits document timestamps against direct observations.
            </div>
          </div>

        </div>

        <!-- JOINT SBAR DEBRIEF GUIDE -->
        <div class="mt-6 p-4 rounded-2xl bg-slate-900 text-white">
          <div class="text-xs font-black uppercase tracking-wider text-cyan-300 mb-2">
            🤝 Joint Shift Handover Formula (SBAR Simulation)
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div class="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
              <span class="font-bold text-cyan-300 block mb-1">1. What did you see?</span>
              <span class="text-slate-300">Reconciled findings between bedside setup and documentation.</span>
            </div>
            <div class="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
              <span class="font-bold text-cyan-300 block mb-1">2. What did you do?</span>
              <span class="text-slate-300">Action taken to rectify equipment or document variance.</span>
            </div>
            <div class="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
              <span class="font-bold text-cyan-300 block mb-1">3. Next Shift Message</span>
              <span class="text-slate-300">Clear instructions for upcoming nursing and clinical shift.</span>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // RENDER THE HANDOVER PRACTICE SCREEN
  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  // CLEAN, UNCLUTTERED, PROGRESSIVE STEP-BY-STEP HANDOVER SCREEN
  // -------------------------------------------------------------------------
  function renderHandoverScreen(container) {
    const cardId = handoverState.activeCardId;
    const card = getHandoverCard(cardId);
    const st = getCardState(cardId);
    const playable = getPlayableHandoverCards();
    const curIdx = playable.findIndex(function(c) { return c.id === cardId; });

    // Active wizard step: 1 (Handover), 2 (Bedside/Act), 3 (Explain), 4 (Handoff)
    const curStep = st.step || 1;
    const activeTab = st.activeTab || 'room';

    let html = '<div class="w-full max-w-2xl mx-auto flex flex-col gap-2.5 text-left select-none pb-4" dir="ltr">';

    // 1. SIMPLE SLEEK TOP BAR (Fits on any screen)
    html += '<div class="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-2xs flex items-center justify-between gap-2">' +
      '<div class="flex items-center gap-2 min-w-0">' +
        '<button onclick="window.HaiBundleEngine.exitHandoverPractice()" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black transition flex items-center gap-1 cursor-pointer shrink-0">' +
          '<span>←</span> <span>All Cases</span>' +
        '</button>' +
        '<span class="text-xs font-black text-slate-900 px-2 py-0.5 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-800 truncate">' +
          card.code + ' • ' + card.title +
        '</span>' +
      '</div>' +

      '<div class="flex items-center gap-2 shrink-0">' +
        '<button onclick="window.HaiBundleEngine.toggleSound()" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer">' +
          (soundEngine.enabled ? '🔊 Sound ON' : '🔇 Muted') +
        '</button>' +
      '</div>' +
    '</div>';

    // 2. SLEEK STEPPER PROGRESS TABS (Compact, calm, 1-click navigation)
    html += '<div class="w-full grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl text-center text-xs font-bold">' +
      '<button onclick="window.HaiBundleEngine.setHandoverStep(1)" class="py-1.5 px-1 rounded-lg transition cursor-pointer ' + (curStep === 1 ? 'bg-white text-blue-700 shadow-xs font-black' : 'text-slate-500 hover:text-slate-900') + '">' +
        '1. Handover' +
      '</button>' +
      '<button onclick="window.HaiBundleEngine.setHandoverStep(2)" class="py-1.5 px-1 rounded-lg transition cursor-pointer ' + (curStep === 2 ? 'bg-white text-blue-700 shadow-xs font-black' : 'text-slate-500 hover:text-slate-900') + '">' +
        '2. Bedside Check' +
      '</button>' +
      '<button onclick="' + (st.completedActions ? 'window.HaiBundleEngine.setHandoverStep(3)' : '') + '" class="py-1.5 px-1 rounded-lg transition ' + (curStep === 3 ? 'bg-white text-blue-700 shadow-xs font-black' : (st.completedActions ? 'text-slate-700 cursor-pointer' : 'text-slate-400 opacity-60')) + '">' +
        '3. Rationale' +
      '</button>' +
      '<button onclick="' + (st.explainSubmitted ? 'window.HaiBundleEngine.setHandoverStep(4)' : '') + '" class="py-1.5 px-1 rounded-lg transition ' + (curStep === 4 ? 'bg-white text-blue-700 shadow-xs font-black' : (st.explainSubmitted ? 'text-slate-700 cursor-pointer' : 'text-slate-400 opacity-60')) + '">' +
        '4. Hand Off' +
      '</button>' +
    '</div>';

    // 3. STEP 1: RECEIVE HANDOVER (Clean, focused, easy)
    if (curStep === 1) {
      html += '<div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-3.5">' +
        '<div class="flex items-center gap-3">' +
          '<div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center text-xl shrink-0">🗣️</div>' +
          '<div>' +
            '<span class="text-[10px] font-black uppercase tracking-wider text-blue-600">Shift Handover Received</span>' +
            '<h2 class="text-sm sm:text-base font-black text-slate-900">' + (card.voiceSpeaker || 'Handover Nurse') + ' reports:</h2>' +
          '</div>' +
        '</div>' +

        '<div class="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-slate-800 text-sm sm:text-base font-semibold leading-relaxed">' +
          '"' + card.voiceHandover + '"' +
        '</div>' +

        '<div class="flex flex-col sm:flex-row items-center gap-2.5 pt-1">' +
          '<button onclick="window.HaiBundleEngine.replayHandoverVoice()" class="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer">' +
            '<span>🔊</span> <span>Listen Audio</span>' +
          '</button>' +
          '<button onclick="window.HaiBundleEngine.setHandoverStep(2)" class="w-full sm:flex-1 py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm shadow transition flex items-center justify-center gap-2 cursor-pointer">' +
            '<span>Inspect Bedside Setup</span> <span>➔</span>' +
          '</button>' +
        '</div>' +
      '</div>';
    }

    // 4. STEP 2: BEDSIDE SCENE & QUICK ACTIONS (100% VISIBLE ON SCREEN)
    else if (curStep === 2) {
      html += '<div class="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-2.5">' +
        // Card Header: Question & Evidence Tabs
        '<div class="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">' +
          '<div class="min-w-0">' +
            '<div class="text-[10px] font-black uppercase tracking-wider text-cyan-700">Bedside Inspection</div>' +
            '<h2 class="text-xs sm:text-sm font-black text-slate-900 leading-tight truncate">' + card.question + '</h2>' +
          '</div>' +
          '<div class="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-bold shrink-0">' +
            '<button onclick="window.HaiBundleEngine.switchHandoverTab(\'room\')" class="px-2.5 py-1 rounded-md transition cursor-pointer ' + (activeTab === 'room' ? 'bg-white text-blue-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900') + '">' +
              '🛏️ Room' +
            '</button>' +
            '<button onclick="window.HaiBundleEngine.switchHandoverTab(\'chart\')" class="px-2.5 py-1 rounded-md transition cursor-pointer ' + (activeTab === 'chart' ? 'bg-white text-blue-700 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900') + '">' +
              '📋 Chart' +
            '</button>' +
          '</div>' +
        '</div>' +

        // Compact Evidence Container (Fixed ~175px height so actions are always visible)
        '<div class="w-full max-w-[480px] mx-auto h-[165px] sm:h-[180px] flex flex-col">' +
          (activeTab === 'room' ? (
            '<div class="w-full h-full rounded-xl overflow-hidden bg-[#021329] border border-slate-800 shadow-inner flex items-center justify-center relative">' +
              renderHandoverSceneSvg(card, st) +
            '</div>'
          ) : (
            '<div class="w-full h-full overflow-y-auto p-2.5 rounded-xl bg-amber-50/90 border border-amber-300 text-xs text-slate-800 space-y-2">' +
              '<div class="font-black text-amber-900 flex items-center justify-between sticky top-0 bg-amber-50/95 pb-1 border-b border-amber-200">' +
                '<span>📋 Patient Medical Records:</span>' +
                '<span class="text-[10px] font-bold text-amber-700">' + card.facilityForm + '</span>' +
              '</div>' +
              (card.chartEvidence && card.chartEvidence.records ? card.chartEvidence.records.map(function(r) {
                return '<div class="p-2 bg-white rounded-lg border border-amber-200 shadow-2xs">' +
                  '<div class="font-black text-slate-900 mb-0.5 text-xs">' + (r.title || r.name) + '</div>' +
                  '<div class="font-sans text-[11px] text-slate-700 whitespace-pre-wrap leading-relaxed">' + (r.content || r.body) + '</div>' +
                '</div>';
              }).join('') : '<div class="p-2 text-slate-500">No chart records available.</div>') +
            '</div>'
          )) +
        '</div>' +

        // Action Buttons Area (Immediately visible below scene)
        '<div class="flex flex-col gap-1.5">' +
          '<div class="text-[11px] font-black text-slate-700 flex items-center justify-between">' +
            '<span>Tap action to correct setup:</span>' +
            '<span class="text-[10px] text-slate-400 font-normal">Also clickable directly in room scene</span>' +
          '</div>' +
          renderCardActionButtons(card, st) +
        '</div>' +

        // Action Feedback Banner
        (st.actionFeedback ? ('<div class="p-2 px-3 rounded-xl ' + (st.completedActions ? 'bg-emerald-50 border border-emerald-400 text-emerald-900' : 'bg-blue-50 border border-blue-300 text-blue-900') + ' text-xs font-bold flex items-center gap-2 transition">' +
          '<span class="text-base shrink-0">' + (st.completedActions ? '✅' : 'ℹ️') + '</span>' +
          '<div class="leading-relaxed">' + st.actionFeedback + '</div>' +
        '</div>') : '') +

        // Next Step Button (When actions done)
        (st.completedActions ? ('<div class="pt-1">' +
          '<button onclick="window.HaiBundleEngine.setHandoverStep(3)" class="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow transition flex items-center justify-center gap-1.5 cursor-pointer">' +
            '<span>Continue to Clinical Rationale</span> <span>➔</span>' +
          '</button>' +
        '</div>') : '') +
      '</div>';
    }

    // 5. STEP 3: CLINICAL RATIONALE (EASY CHOICES)
    else if (curStep === 3) {
      html += '<div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-3">' +
        '<div class="border-b border-slate-200 pb-2">' +
          '<span class="text-[10px] font-black uppercase tracking-wider text-blue-600">Step 3: Clinical Understanding</span>' +
          '<h2 class="text-xs sm:text-sm font-black text-slate-900 mt-0.5">' + card.explainQuestion + '</h2>' +
        '</div>' +

        '<div class="flex flex-col gap-2">' +
          (card.explainOptions || []).map(function(opt) {
            let cls = 'bg-slate-50 hover:bg-blue-50/60 border-slate-200 text-slate-800';
            let icon = '⚪';
            if (st.explainChosen === opt.id) {
              if (opt.isCorrect) {
                cls = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-300';
                icon = '✅';
              } else {
                cls = 'bg-red-50 border-red-500 text-red-950 font-bold ring-2 ring-red-300';
                icon = '❌';
              }
            }
            return '<button onclick="window.HaiBundleEngine.submitHandoverExplain(\'' + opt.id + '\')" class="p-2.5 sm:p-3 rounded-xl border text-left text-xs transition cursor-pointer flex items-start gap-2.5 ' + cls + '">' +
              '<span class="text-sm mt-0.5 shrink-0">' + icon + '</span>' +
              '<span class="leading-relaxed flex-1">' + opt.text + '</span>' +
            '</button>';
          }).join('') +
        '</div>' +

        (st.explainSubmitted ? ('<div class="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-800 space-y-1">' +
          '<div class="font-black text-blue-900 flex items-center gap-1"><span>📘</span> <span>Key Takeaway:</span></div>' +
          '<p class="leading-relaxed">' + card.keyedExplanation + '</p>' +
        '</div>' +
        '<div class="pt-1">' +
          '<button onclick="window.HaiBundleEngine.setHandoverStep(4)" class="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm shadow transition flex items-center justify-center gap-2 cursor-pointer">' +
            '<span>Continue to Shift Hand-off</span> <span>➔</span>' +
          '</button>' +
        '</div>') : '') +
      '</div>';
    }

    // 6. STEP 4: SHIFT HAND-OFF & MODEL RESPONSE
    else if (curStep === 4) {
      html += '<div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-3">' +
        '<div class="border-b border-slate-200 pb-2">' +
          '<span class="text-[10px] font-black uppercase tracking-wider text-emerald-600">Step 4: Shift Hand-off</span>' +
          '<h2 class="text-xs sm:text-sm font-black text-slate-900 mt-0.5">What would you report to the next shift?</h2>' +
        '</div>' +

        '<div class="p-3.5 sm:p-4 rounded-xl bg-amber-50 border border-amber-300 text-slate-900 space-y-2">' +
          '<div class="font-black text-amber-900 flex items-center justify-between text-xs">' +
            '<span class="flex items-center gap-1"><span>⭐</span> <span>Authoritative Model Hand-off:</span></span>' +
            '<span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">First-attempt: ' + (st.firstAttemptCorrect ? '100%' : 'Attempted') + '</span>' +
          '</div>' +
          '<p class="text-xs sm:text-sm font-bold text-slate-900 italic bg-white p-3 rounded-lg border border-amber-200 leading-relaxed">' +
            '"' + card.modelHandoff + '"' +
          '</p>' +
        '</div>' +

        '<div class="flex items-center justify-between gap-2 pt-2 border-t border-slate-200">' +
          '<button onclick="window.HaiBundleEngine.setHandoverStep(1)" class="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer">' +
            '🔄 Review Again' +
          '</button>' +

          (card.hasReplayVariant ? ('<button onclick="window.HaiBundleEngine.switchHandoverCard(\'' + card.replayVariantId + '\')" class="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow flex items-center gap-1 cursor-pointer"><span>🔄</span> <span>Try Replay (' + card.replayVariantId + ')</span></button>') : '') +

          '<button onclick="window.HaiBundleEngine.nextHandoverCard()" class="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm shadow transition flex items-center gap-1.5 cursor-pointer">' +
            '<span>Next Patient Case</span> <span>➔</span>' +
          '</button>' +
        '</div>' +
      '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
  }

  function setHandoverStep(step) {
    soundEngine.playHardwareClick();
    const st = getCardState(handoverState.activeCardId);
    st.step = step;
    saveHandoverSession();
    render();
  }

  function toggleChart() {
    soundEngine.playHardwareClick();
    const st = getCardState(handoverState.activeCardId);
    st.activeTab = (st.activeTab === 'chart') ? 'room' : 'chart';
    saveHandoverSession();
    render();
  }

  function renderHandoverSceneSvg(card, st) {
    if (card.id === 'HO-CAUTI-01') {
      const bagY = st.bagLowered ? 210 : 80;
      const bagLabel = st.bagLowered ? "✅ Below Bladder" : "⚠️ Above Bladder";
      const kinkD = st.kinkCleared ? ("M 230 140 Q 280 180 340 " + (bagY + 30)) : ("M 230 140 Q 255 125 265 145 Q 260 160 275 145 Q 300 135 340 " + (bagY + 30));

      return '<div class="w-full h-full select-none flex items-center justify-center p-1">' +
        '<svg viewBox="0 0 500 280" class="w-full h-full max-h-[175px] object-contain">' +
          '<rect x="0" y="0" width="500" height="280" fill="#03162e" />' +
          '<line x1="0" y1="230" x2="500" y2="230" stroke="#1e293b" stroke-width="2" />' +

          '<rect x="70" y="130" width="260" height="65" rx="8" fill="#1e293b" stroke="#334155" stroke-width="2" />' +
          '<rect x="85" y="195" width="12" height="35" fill="#334155" />' +
          '<circle cx="91" cy="235" r="7" fill="#64748b" />' +
          '<rect x="300" y="195" width="12" height="35" fill="#334155" />' +
          '<circle cx="306" cy="235" r="7" fill="#64748b" />' +

          '<rect x="75" y="115" width="250" height="25" rx="6" fill="#f8fafc" />' +
          '<ellipse cx="110" cy="115" rx="22" ry="12" fill="#e2e8f0" />' +

          '<circle cx="115" cy="105" r="14" fill="#fbcfe8" />' +
          '<path d="M 125 115 Q 170 120 220 125 L 290 128 L 290 138 L 125 138 Z" fill="#60a5fa" opacity="0.85" />' +

          '<rect x="140" y="90" width="120" height="20" rx="4" fill="none" stroke="#64748b" stroke-width="3" />' +
          '<rect x="260" y="180" width="80" height="15" rx="3" fill="none" stroke="#64748b" stroke-width="2.5" />' +

          '<path d="' + kinkD + '" fill="none" stroke="' + (st.kinkCleared ? '#22c55e' : '#f59e0b') + '" stroke-width="5" stroke-linecap="round" />' +

          '<g tabindex="0" role="button" aria-label="Clear drainage tubing kink" onclick="window.HaiBundleEngine.performHandoverAction(\'clear_kink\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault(); window.HaiBundleEngine.performHandoverAction(\'clear_kink\');}" class="cursor-pointer focus:outline-none focus:ring-4 focus:ring-cyan-400">' +
            '<circle cx="265" cy="142" r="14" fill="' + (st.kinkCleared ? '#15803d' : '#b45309') + '" stroke="#ffffff" stroke-width="2" class="hover:scale-110 transition" />' +
            '<text x="265" y="146" font-size="10" font-weight="black" fill="#ffffff" text-anchor="middle">' + (st.kinkCleared ? '✓' : '⚡') + '</text>' +
          '</g>' +

          '<g transform="translate(325, ' + bagY + ')" tabindex="0" role="button" aria-label="Lower urinary collection bag" onclick="window.HaiBundleEngine.performHandoverAction(\'lower_bag\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault(); window.HaiBundleEngine.performHandoverAction(\'lower_bag\');}" class="cursor-pointer focus:outline-none focus:ring-4 focus:ring-cyan-400">' +
            '<path d="M 25 0 L 25 12" stroke="#94a3b8" stroke-width="3" />' +
            '<rect x="5" y="12" width="40" height="50" rx="6" fill="#f8fafc" stroke="' + (st.bagLowered ? '#22c55e' : '#f59e0b') + '" stroke-width="2.5" />' +
            '<rect x="8" y="32" width="34" height="26" rx="3" fill="#fbbf24" opacity="0.8" />' +
            '<text x="25" y="48" font-size="8" font-weight="bold" fill="#78350f" text-anchor="middle">URINE</text>' +
          '</g>' +

          '<rect x="375" y="' + (bagY + 20) + '" width="115" height="22" rx="6" fill="' + (st.bagLowered ? '#065f46' : '#78350f') + '" />' +
          '<text x="432" y="' + (bagY + 34) + '" font-size="9" font-weight="black" fill="#ffffff" text-anchor="middle">' + bagLabel + '</text>' +

          '<rect x="210" y="60" width="110" height="22" rx="6" fill="' + (st.kinkCleared ? '#065f46' : '#78350f') + '" />' +
          '<text x="265" y="74" font-size="9" font-weight="black" fill="#ffffff" text-anchor="middle">' + (st.kinkCleared ? '✅ Tubing Clear' : '⚠️ Tubing Kinked') + '</text>' +
        '</svg>' +
      '</div>';
    }

    else if (card.id === 'HO-CVC-01') {
      let drapeSvg = '';
      if (st.fullDrapeAdded) {
        drapeSvg = '<path d="M 130 95 L 340 100 L 340 135 L 130 135 Z" fill="#0284c7" stroke="#38bdf8" stroke-width="2.5" />' +
          '<text x="235" y="118" font-size="10" font-weight="black" fill="#ffffff" text-anchor="middle">FULL-BODY STERILE DRAPE IN PLACE</text>';
      } else {
        drapeSvg = '<rect x="135" y="90" width="35" height="35" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />' +
          '<rect x="175" y="105" width="165" height="20" fill="#fbcfe8" opacity="0.9" />' +
          '<text x="255" y="118" font-size="9" font-weight="black" fill="#be123c" text-anchor="middle">BODY UNCOVERED (BARRIER BREACH)</text>';
      }

      return '<div class="w-full h-full select-none flex items-center justify-center p-1">' +
        '<svg viewBox="0 0 500 280" class="w-full h-full max-h-[175px] object-contain">' +
          '<rect x="0" y="0" width="500" height="280" fill="#03162e" />' +
          '<rect x="80" y="120" width="280" height="70" rx="8" fill="#1e293b" stroke="#334155" stroke-width="2" />' +
          '<rect x="90" y="105" width="260" height="20" rx="5" fill="#f1f5f9" />' +

          '<circle cx="120" cy="95" r="15" fill="#fbcfe8" />' +
          drapeSvg +

          '<rect x="15" y="60" width="55" height="90" rx="6" fill="#334155" stroke="#64748b" stroke-width="2" />' +
          '<rect x="22" y="70" width="41" height="30" fill="#0f172a" />' +
          '<path d="M 45 100 Q 75 110 115 102" fill="none" stroke="#22d3ee" stroke-width="3" stroke-dasharray="3,3" />' +

          '<g transform="translate(100, 30)">' +
            '<circle cx="0" cy="0" r="11" fill="#38bdf8" />' +
            '<rect x="-8" y="2" width="16" height="8" rx="2" fill="#ffffff" />' +
          '</g>' +

          '<rect x="100" y="240" width="300" height="26" rx="8" fill="' + (st.fullDrapeAdded ? '#065f46' : '#881337') + '" />' +
          '<text x="250" y="256" font-size="10" font-weight="black" fill="#ffffff" text-anchor="middle">' +
            (st.fullDrapeAdded ? '✅ Maximal Sterile Barriers Verified' : '⚠️ Small Drape Only — Guidewire Path Unprotected') +
          '</text>' +
        '</svg>' +
      '</div>';
    }

    else if (card.id === 'HO-SSI-01' || card.id === 'HO-SSI-02') {
      const isHO2 = card.id === 'HO-SSI-02';
      return '<div class="w-full h-full select-none p-2 sm:p-2.5 flex flex-col justify-between">' +
        '<div class="flex items-center justify-between border-b border-slate-700 pb-1">' +
          '<span class="text-[10px] font-black uppercase tracking-wider text-cyan-300">Surgical Timing Reconciliation</span>' +
          '<span class="text-[9px] px-2 py-0.5 rounded-full font-bold ' + (isHO2 ? 'bg-amber-400 text-slate-950' : 'bg-blue-600 text-white') + '">' +
            (isHO2 ? 'VARIANT HO-SSI-02 (08:10 ADMIN)' : 'BASE HO-SSI-01 (MISSING ADMIN TIME)') +
          '</span>' +
        '</div>' +

        '<div class="grid grid-cols-3 gap-2 my-auto">' +
          '<div class="bg-slate-900 border border-slate-700 p-2 rounded-xl flex flex-col items-center text-center">' +
            '<span class="text-[11px] font-bold text-slate-400">07:00</span>' +
            '<span class="text-sm my-0.5">💊</span>' +
            '<span class="text-[11px] font-black text-white">Order Placed</span>' +
            '<span class="text-[9px] text-slate-400">Cefazolin 2g IV</span>' +
          '</div>' +

          '<div class="bg-slate-900 border border-slate-700 p-2 rounded-xl flex flex-col items-center text-center">' +
            '<span class="text-[11px] font-bold text-slate-400">08:00</span>' +
            '<span class="text-sm my-0.5">⏱️</span>' +
            '<span class="text-[11px] font-black text-cyan-300">Surgical Incision</span>' +
            '<span class="text-[9px] text-slate-400">Knife-to-skin</span>' +
          '</div>' +

          '<div class="bg-slate-900 border ' + (isHO2 ? 'border-amber-400' : 'border-red-400') + ' p-2 rounded-xl flex flex-col items-center text-center">' +
            '<span class="text-[11px] font-bold text-slate-400">' + (isHO2 ? '08:10' : 'MISSING') + '</span>' +
            '<span class="text-sm my-0.5">' + (isHO2 ? '⚠️' : '❓') + '</span>' +
            '<span class="text-[11px] font-black ' + (isHO2 ? 'text-amber-300' : 'text-red-400') + '">' + (isHO2 ? 'Administered' : 'No Timestamp') + '</span>' +
            '<span class="text-[9px] text-slate-400">' + (isHO2 ? '10 min Post-Incision' : 'eMAR Time Blank') + '</span>' +
          '</div>' +
        '</div>' +

        '<div class="p-1.5 rounded-lg ' + (isHO2 ? 'bg-amber-950/80 border border-amber-500 text-amber-200' : 'bg-blue-950/80 border border-blue-500 text-blue-200') + ' text-[10px] font-bold text-center">' +
          (isHO2 ? 'Timing Deviation: Antibiotic administered 10 minutes AFTER incision.' : 'Timing Unverified: Order placed at 07:00 does not prove administration before 08:00.') +
        '</div>' +
      '</div>';
    }

    else if (card.id === 'HO-VAP-01') {
      const isVisit2 = st.currentVisit === 2;
      const angle = st.bedAngle || 0;
      const compliant = angle >= 30 && angle <= 45;

      return '<div class="w-full h-full select-none flex items-center justify-center p-1">' +
        '<svg viewBox="0 0 500 280" class="w-full h-full max-h-[175px] object-contain">' +
          '<rect x="0" y="0" width="500" height="280" fill="#03162e" />' +
          '<rect x="120" y="160" width="220" height="30" rx="4" fill="#1e293b" />' +
          '<circle cx="210" cy="160" r="8" fill="#64748b" />' +

          '<g transform="translate(210, 160) rotate(' + (-angle) + ') translate(-210, -160)">' +
            '<rect x="100" y="145" width="115" height="18" rx="4" fill="#38bdf8" />' +
            '<circle cx="120" cy="135" r="14" fill="#fbcfe8" />' +
            '<rect x="95" y="140" width="25" height="8" rx="2" fill="#f1f5f9" />' +
            '<path d="M 128 135 Q 160 110 190 85" fill="none" stroke="#22d3ee" stroke-width="3" stroke-linecap="round" />' +
          '</g>' +

          '<rect x="210" y="145" width="130" height="18" rx="4" fill="#0284c7" />' +

          '<rect x="20" y="50" width="60" height="140" rx="6" fill="#334155" stroke="#475569" stroke-width="2" />' +
          '<rect x="28" y="60" width="44" height="35" rx="3" fill="#0f172a" />' +
          '<text x="50" y="80" font-size="9" font-weight="bold" fill="#22c55e" text-anchor="middle">VENT ON</text>' +

          '<g transform="translate(420, 90)">' +
            '<circle cx="0" cy="0" r="38" fill="#0f172a" stroke="#475569" stroke-width="3" />' +
            '<path d="M -35 0 A 35 35 0 0 1 35 0" fill="none" stroke="#64748b" stroke-width="2" />' +
            '<path d="M 0 -35 A 35 35 0 0 1 25 -25" fill="none" stroke="#22c55e" stroke-width="5" />' +
            '<line x1="0" y1="0" x2="' + (Math.sin(angle * Math.PI / 180) * 30) + '" y2="' + (-Math.cos(angle * Math.PI / 180) * 30) + '" stroke="' + (compliant ? '#22c55e' : '#f59e0b') + '" stroke-width="3" stroke-linecap="round" />' +
            '<circle cx="0" cy="0" r="4" fill="#ffffff" />' +
            '<text x="0" y="20" font-size="11" font-weight="black" fill="#ffffff" text-anchor="middle">' + angle + '°</text>' +
          '</g>' +

          '<rect x="100" y="240" width="300" height="26" rx="8" fill="' + (isVisit2 ? (compliant ? '#065f46' : '#78350f') : '#1e3a8a') + '" />' +
          '<text x="250" y="256" font-size="10" font-weight="black" fill="#ffffff" text-anchor="middle">' +
            (isVisit2 ? ('Visit 2 (14:00): ' + angle + '° Elevation ' + (compliant ? '✅ COMPLIANT' : '⚠️ OUT OF RANGE')) : 'Visit 1 (08:00): Temporary Restriction Active (Bed Flat)') +
          '</text>' +
        '</svg>' +
      '</div>';
    }

    return '<div class="p-4 text-center text-slate-400">Bedside Scene</div>';
  }

  function renderCardActionButtons(card, st) {
    if (card.id === 'HO-CAUTI-01') {
      return '<div class="grid grid-cols-1 sm:grid-cols-2 gap-2">' +
        '<button onclick="window.HaiBundleEngine.performHandoverAction(\'lower_bag\')" class="p-2 sm:p-2.5 rounded-xl border text-xs font-black transition cursor-pointer flex items-center justify-between shadow-2xs ' + (st.bagLowered ? 'bg-emerald-50 border-emerald-400 text-emerald-800' : 'bg-slate-50 hover:bg-blue-50 text-slate-900 border-slate-300') + '">' +
          '<span class="flex items-center gap-1.5"><span class="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 text-[10px] font-mono">1</span> <span>Lower Bag Below Bladder</span></span>' +
          '<span>' + (st.bagLowered ? '✅ Done' : '⚡ Lower') + '</span>' +
        '</button>' +
        '<button onclick="window.HaiBundleEngine.performHandoverAction(\'clear_kink\')" class="p-2 sm:p-2.5 rounded-xl border text-xs font-black transition cursor-pointer flex items-center justify-between shadow-2xs ' + (st.kinkCleared ? 'bg-emerald-50 border-emerald-400 text-emerald-800' : 'bg-slate-50 hover:bg-blue-50 text-slate-900 border-slate-300') + '">' +
          '<span class="flex items-center gap-1.5"><span class="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 text-[10px] font-mono">2</span> <span>Clear Tubing Kink</span></span>' +
          '<span>' + (st.kinkCleared ? '✅ Done' : '⚡ Unkink') + '</span>' +
        '</button>' +
      '</div>';
    }

    else if (card.id === 'HO-CVC-01') {
      return '<button onclick="window.HaiBundleEngine.performHandoverAction(\'add_full_drape\')" class="w-full p-2.5 rounded-xl border text-xs font-black transition cursor-pointer flex items-center justify-between shadow-2xs ' + (st.fullDrapeAdded ? 'bg-emerald-50 border-emerald-400 text-emerald-800' : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500 shadow') + '">' +
        '<span>Record Discrepancy & Add Full-Body Sterile Drape</span>' +
        '<span>' + (st.fullDrapeAdded ? '✅ Applied' : '⚡ Add Drape') + '</span>' +
      '</button>';
    }

    else if (card.id === 'HO-SSI-01') {
      return '<button onclick="window.HaiBundleEngine.performHandoverAction(\'seek_admin_record\')" class="w-full p-2.5 rounded-xl border text-xs font-black transition cursor-pointer flex items-center justify-between shadow-2xs ' + (st.timingActionTaken ? 'bg-emerald-50 border-emerald-400 text-emerald-800' : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500 shadow') + '">' +
        '<span>Record \'Not documented\' & Seek Administration Log</span>' +
        '<span>' + (st.timingActionTaken ? '✅ Recorded' : '⚡ Audit Action') + '</span>' +
      '</button>';
    }

    else if (card.id === 'HO-SSI-02') {
      return '<button onclick="window.HaiBundleEngine.performHandoverAction(\'flag_late_admin\')" class="w-full p-2.5 rounded-xl border text-xs font-black transition cursor-pointer flex items-center justify-between shadow-2xs ' + (st.timingActionTaken ? 'bg-emerald-50 border-emerald-400 text-emerald-800' : 'bg-amber-600 hover:bg-amber-500 text-white border-amber-500 shadow') + '">' +
        '<span>Record \'Not done\' & Flag Post-Incision Timing Variance</span>' +
        '<span>' + (st.timingActionTaken ? '✅ Recorded' : '⚡ Flag Variance') + '</span>' +
      '</button>';
    }

    else if (card.id === 'HO-VAP-01') {
      if (st.currentVisit === 1) {
        return '<div class="flex flex-col gap-2">' +
          '<button onclick="window.HaiBundleEngine.performHandoverAction(\'record_restriction\')" class="p-2 sm:p-2.5 rounded-xl border text-xs font-black transition cursor-pointer flex items-center justify-between shadow-2xs ' + (st.visit1Recorded ? 'bg-emerald-50 border-emerald-400 text-emerald-800' : 'bg-slate-50 hover:bg-slate-100 text-slate-900 border-slate-300') + '">' +
            '<span>Record Restriction Active (Flat; Reassess at 14:00)</span>' +
            '<span>' + (st.visit1Recorded ? '✅ Recorded' : '⚡ Record') + '</span>' +
          '</button>' +
          (st.visit1Recorded ? '<button onclick="window.HaiBundleEngine.performHandoverAction(\'advance_visit_2\')" class="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs transition shadow flex items-center justify-center gap-2 cursor-pointer"><span>⏩ Return Later (Advance to 14:00 Reassessment)</span></button>' : '') +
        '</div>';
      } else {
        return '<div class="flex flex-col gap-1.5">' +
          '<span class="text-[11px] font-bold text-slate-600">Select Target Head-of-Bed Elevation:</span>' +
          '<div class="grid grid-cols-4 gap-1.5">' +
            '<button onclick="window.HaiBundleEngine.performHandoverAction(\'set_angle\', 0)" class="p-2 rounded-xl text-xs font-black transition cursor-pointer ' + (st.bedAngle === 0 ? 'bg-blue-600 text-white shadow' : 'bg-slate-50 border text-slate-800') + '">0° Flat</button>' +
            '<button onclick="window.HaiBundleEngine.performHandoverAction(\'set_angle\', 15)" class="p-2 rounded-xl text-xs font-black transition cursor-pointer ' + (st.bedAngle === 15 ? 'bg-blue-600 text-white shadow' : 'bg-slate-50 border text-slate-800') + '">15°</button>' +
            '<button onclick="window.HaiBundleEngine.performHandoverAction(\'set_angle\', 35)" class="p-2 rounded-xl text-xs font-black transition cursor-pointer ' + (st.bedAngle === 35 ? 'bg-emerald-600 text-white shadow ring-2 ring-emerald-300' : 'bg-emerald-50 border border-emerald-300 text-emerald-900') + '">35° (Bundle)</button>' +
            '<button onclick="window.HaiBundleEngine.performHandoverAction(\'set_angle\', 45)" class="p-2 rounded-xl text-xs font-black transition cursor-pointer ' + (st.bedAngle === 45 ? 'bg-emerald-600 text-white shadow ring-2 ring-emerald-300' : 'bg-emerald-50 border border-emerald-300 text-emerald-900') + '">45° (Bundle)</button>' +
          '</div>' +
        '</div>';
      }
    }

    return '';
  }

  // Global keyboard shortcuts for quick accessible actions in Step 2
  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function' && !window.__haiHandoverKeybound) {
    window.__haiHandoverKeybound = true;
    window.addEventListener('keydown', function (e) {
      if (!handoverState || !handoverState.activeCardId) return;
      const card = getHandoverCard(handoverState.activeCardId);
      if (!card) return;
      const st = getCardState(card.id);
      if (st.step !== 2) return;
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.key === '1') {
        if (card.id === 'HO-CAUTI-01') performHandoverAction('lower_bag');
        else if (card.id === 'HO-CVC-01') performHandoverAction('add_full_drape');
        else if (card.id === 'HO-SSI-01') performHandoverAction('seek_admin_record');
        else if (card.id === 'HO-SSI-02') performHandoverAction('flag_late_admin');
        else if (card.id === 'HO-VAP-01' && st.currentVisit === 1) performHandoverAction('record_restriction');
      } else if (e.key === '2') {
        if (card.id === 'HO-CAUTI-01') performHandoverAction('clear_kink');
        else if (card.id === 'HO-VAP-01' && st.currentVisit === 1 && st.visit1Recorded) performHandoverAction('advance_visit_2');
      }
    });
  }

  // 9. PUBLIC API & INITIALIZATION
  // =========================================================================
  window.HaiBundleEngine = {
    init: function () {
      const restoredHandover = tryRestoreHandoverSession();
      if (restoredHandover) {
        render();
        return;
      }
      const restored = tryRestoreSession();
      render();
      if (restored) {
        showToast("🔄 استئناف الجلسة", "تم استئناف جولتك السريرية السابقة من حيث توقفت.", "blue");
        if (session.timeRemaining) startTimer();
      }
      const urlParams = new URLSearchParams(window.location.search);
      const practice = urlParams.get('practice');
      const card = urlParams.get('card');
      if (practice === 'handover' || card) {
        startHandoverPractice(card);
      }
    },
    startHandoverPractice,
    setHandoverStep,
    toggleChart,
    switchHandoverCard,
    togglePairMode,
    setPairRole,
    switchHandoverTab,
    toggleHandoverRoomTone,
    toggleHandoverCaptions,
    replayHandoverVoice,
    performHandoverAction,
    submitHandoverAudit,
    submitHandoverExplain,
    submitHandoverReflection,
    nextHandoverCard,
    exitHandoverPractice,
    openPrintableRoleCardsModal,
    getHandoverState: () => handoverState,
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
    setLanguage,
    toggleLanguage,
    getLanguage: () => currentLang,
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
