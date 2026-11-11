// JavaScript runtime export of clinical content for zero-build browser environments
export const CDC_GUIDANCE_LINKS = {
  corePractices: {
    title: 'CDC Core Infection Prevention and Control Practices for Safe Care',
    url: 'https://www.cdc.gov/infection-control/hcp/core-practices/',
    label: 'CDC Core Practices'
  },
  cleanHands: {
    title: 'CDC Clean Hands in Healthcare Clinical Safety Recommendations',
    url: 'https://www.cdc.gov/clean-hands/hcp/clinical-safety/',
    label: 'CDC Clean Hands'
  },
  isolationPrecautions: {
    title: 'CDC Isolation Precautions & Environmental Control Guidelines',
    url: 'https://www.cdc.gov/infection-control/hcp/isolation-precautions/recommendations.html',
    label: 'CDC Isolation Precautions'
  }
};

export const CLINICAL_GAMES = [
  {
    id: 'glove-trap',
    number: 1,
    title: 'The Glove Trap',
    subtitle: 'Put the steps in order',
    tagline: 'Standard Precautions • Hand Hygiene & PPE',
    scenario:
      'A bedside nurse removes a heavily soiled post-surgical wound dressing and needs to immediately apply a fresh sterile dressing to the same patient.',
    huddleDiscussionPrompt:
      'Ask your team: "When a dressing change gets hectic or supplies are running low, what temptations cause staff to skip hand hygiene between glove changes? How do we hold each other accountable?"',
    whyItMatters:
      'Gloves are NOT an impermeable shield. Microscopic defects, tears, and touching the contaminated outer glove surface during doffing transfer bacteria and viruses directly onto your hands. If you slip fresh gloves onto unwashed hands, you trap pathogens in a warm, moist environment and contaminate the exterior of the new gloves while donning them. Hand hygiene between glove removal and new glove application is mandatory to protect your patient from surgical site infections.',
    cdcLinks: [
      CDC_GUIDANCE_LINKS.cleanHands,
      CDC_GUIDANCE_LINKS.corePractices
    ],
    type: 'order',
    cards: [
      {
        id: 'remove-gloves',
        text: 'Remove used gloves',
        icon: '🧤'
      },
      {
        id: 'hand-hygiene',
        text: 'Perform hand hygiene (alcohol rub or soap & water)',
        icon: '🧼'
      },
      {
        id: 'put-fresh-gloves',
        text: 'Put on fresh gloves',
        icon: '✨'
      }
    ],
    correctOrder: ['remove-gloves', 'hand-hygiene', 'put-fresh-gloves']
  },
  {
    id: 'traveling-cuff',
    number: 2,
    title: 'The Traveling Cuff',
    subtitle: 'Find the two checkpoints',
    tagline: 'Medical Equipment Reprocessing • Non-Critical Items',
    scenario:
      'A portable, reusable electronic blood pressure cuff is used on Patient A in Room 101. The nursing assistant then carries it down the hall to measure vitals on Patient B in Room 103. Afterwards, the cuff is returned to the clean supply storage alcove.',
    huddleDiscussionPrompt:
      'Ask your team: "Where do equipment wipes live on our unit? Are we allowing the manufacturer\'s required wet contact time when wiping blood pressure cuffs between patients?"',
    whyItMatters:
      'Reusable medical devices that contact intact skin are classified as non-critical equipment under the Spaulding classification. They are proven vehicles for transmitting multidrug-resistant organisms (MDROs) including MRSA, VRE, and C. auris between patients. Staff must clean and disinfect reusable cuffs at TWO non-negotiable checkpoints: (1) After use on Patient A before touching Patient B, and (2) After use on Patient B before placing it back into clean storage. Always follow the cuff manufacturer\'s Instructions for Use (IFU) for approved chemical disinfectants and required contact times.',
    cdcLinks: [
      CDC_GUIDANCE_LINKS.corePractices,
      CDC_GUIDANCE_LINKS.isolationPrecautions
    ],
    type: 'pathway-checkpoints',
    steps: [
      {
        id: 'patient-a',
        label: 'Patient A',
        location: 'Room 101 (Used on Patient)',
        icon: '🧑‍🦽'
      },
      {
        id: 'patient-b',
        label: 'Patient B',
        location: 'Room 103 (Next Patient)',
        icon: '🛏️'
      },
      {
        id: 'clean-storage',
        label: 'Clean Storage',
        location: 'Supply Alcove (Ready for Next Shift)',
        icon: '📦'
      }
    ],
    checkpoints: [
      {
        id: 'cp-between-patients',
        label: 'Checkpoint 1: Between Patient A and Patient B',
        description: 'Clean and low-level disinfect the cuff immediately after Patient A before placing it on Patient B.',
        isCorrect: true,
        betweenStepIds: ['patient-a', 'patient-b']
      },
      {
        id: 'cp-before-storage',
        label: 'Checkpoint 2: Between Patient B and Clean Storage',
        description: 'Clean and low-level disinfect the cuff immediately after Patient B before returning it to the clean supply alcove.',
        isCorrect: true,
        betweenStepIds: ['patient-b', 'clean-storage']
      },
      {
        id: 'cp-distractor-shift',
        label: 'Checkpoint 3: End of 12-Hour Shift Only',
        description: 'Wait until the end of the shift to clean all equipment in bulk.',
        isCorrect: false,
        betweenStepIds: ['patient-a', 'clean-storage']
      },
      {
        id: 'cp-distractor-visible',
        label: 'Checkpoint 4: Only when Visibly Soiled',
        description: 'Only wipe the cuff if blood, sweat, or body fluid is visibly apparent on the fabric.',
        isCorrect: false,
        betweenStepIds: ['patient-a', 'patient-b']
      }
    ],
    requiredCount: 2
  },
  {
    id: 'new-needle',
    number: 3,
    title: 'The New Needle',
    subtitle: 'Spot two safety problems',
    tagline: 'Safe Injection Practices • Bloodborne Pathogens',
    scenario:
      'After administering an intramuscular pain medication to Patient A, a clinician changes the needle, keeps the used syringe, and uses that same syringe with the new needle to draw medication from a shared multi-dose vial for Patient B.',
    huddleDiscussionPrompt:
      'Ask your team: "Why does the misconception persist that changing the needle protects the syringe? What is our unit protocol if someone discovers an entered multi-dose vial of unknown origin?"',
    whyItMatters:
      'CDC injection safety guidelines establish a strict rule: One Needle, One Syringe, Only One Time. Once an injection is given, backflow of microscopic blood and interstitial fluid immediately contaminates both the needle and the syringe barrel. Changing the needle does NOT make the syringe sterile. Re-entering any multi-dose or single-dose vial with a used syringe introduces Patient A\'s bloodborne pathogens (such as Hepatitis B, Hepatitis C, HIV, and bacteria) directly into the vial, jeopardizing Patient B and every subsequent patient. The contaminated vial must be quarantined and discarded immediately.',
    cdcLinks: [
      CDC_GUIDANCE_LINKS.corePractices,
      CDC_GUIDANCE_LINKS.isolationPrecautions
    ],
    type: 'multi-select',
    question: 'Select the TWO critical infection control problems in this scenario:',
    choices: [
      {
        id: 'syringe-reuse',
        text: 'The used syringe cannot be reused for another patient, even if a new sterile needle is attached.',
        isCorrect: true,
        explanation: 'Backflow contaminates the syringe interior, plunger, and fluid path.'
      },
      {
        id: 'vial-contamination',
        text: 'Entering the multi-dose vial with the used syringe can contaminate the entire medication vial.',
        isCorrect: true,
        explanation: 'Pathogens enter the medication reservoir and contaminate doses drawn for future patients.'
      },
      {
        id: 'distractor-filter',
        text: 'The clinician failed to use a glass-filtered aspiration straw when piercing the rubber septum.',
        isCorrect: false,
        explanation: 'Filter needles are used for glass ampules, not standard multi-dose rubber septum vials.'
      },
      {
        id: 'distractor-gauge',
        text: 'Patient B required a different needle gauge size for intramuscular delivery.',
        isCorrect: false,
        explanation: 'Needle gauge is a clinical sizing choice, not the critical infection control failure.'
      }
    ],
    requiredCount: 2
  },
  {
    id: 'shortcut-30s',
    number: 4,
    title: 'The 30-Second Shortcut',
    subtitle: 'Make the next move',
    tagline: 'Environmental Cleaning • Wet Contact Time',
    scenario:
      'You are wiping down a high-touch overbed table after patient discharge. The hospital disinfectant wipe canister label specifies a required contact time of 2 MINUTES VISIBLY WET. However, strong air conditioning dries the surface completely at 30 seconds.',
    huddleDiscussionPrompt:
      'Ask your team: "Do we know the wet contact time of the wipes currently stocked on our medication carts versus our isolation carts? Where do we find that kill time on the canister?"',
    whyItMatters:
      'Disinfectants do not kill pathogens on contact. They require a specific, EPA-tested period of continuous liquid contact (wet contact time or kill time) to penetrate bacterial cell walls, dissolve viral envelopes, and kill fungal spores. If a disinfectant dries prematurely at 30 seconds instead of the required 2 minutes, disinfection is incomplete and pathogens survive. Staff must reapply the wipe as directed to ensure the surface stays visibly wet for the entire required 2 minutes.',
    cdcLinks: [
      CDC_GUIDANCE_LINKS.isolationPrecautions,
      CDC_GUIDANCE_LINKS.corePractices
    ],
    type: 'single-choice',
    productName: 'Cavi-Shield Disinfectant Wipes (EPA Reg. No. 1043-12)',
    requiredWetTimeSeconds: 120,
    evaporatedAtSeconds: 30,
    question: 'The table has dried at 30 seconds, but the label requires 2 minutes. What should you do next?',
    choices: [
      {
        id: 'reapply-wet',
        text: 'Reapply the product as directed so the surface stays visibly wet for the full required contact time (2 minutes).',
        isCorrect: true
      },
      {
        id: 'assume-clean',
        text: 'Assume the table is clean because 30 seconds is sufficient to eliminate common bacteria.',
        isCorrect: false
      },
      {
        id: 'dry-towel',
        text: 'Wipe the surface with a dry paper towel to lock in the residual chemical film.',
        isCorrect: false
      },
      {
        id: 'fan-surface',
        text: 'Fan the surface vigorously to accelerate the chemical bonding of the antimicrobial agent.',
        isCorrect: false
      }
    ]
  },
  {
    id: 'waiting-room',
    number: 5,
    title: 'The Waiting-Room Clue',
    subtitle: 'Choose three actions',
    tagline: 'Respiratory Hygiene • Source Control & Triage',
    scenario:
      'A patient walks into a crowded outpatient clinic waiting room coughing frequently into their bare hand, sneezing, and sniffling before being triaged or assessed by clinical staff.',
    huddleDiscussionPrompt:
      'Ask your team: "Is our respiratory hygiene kiosk at the front entrance fully stocked with pediatric and adult masks, tissues, and working hand rub dispensers today?"',
    whyItMatters:
      'Respiratory hygiene and cough etiquette are standard precautions applied at the point of initial healthcare entry. Uncontained respiratory droplets from coughs and sneezes contaminate surfaces within 6 feet and circulate in crowded spaces. The three immediate triage interventions are: (1) Source control by offering a mask if tolerated, (2) Offering tissues and prompt hand hygiene access to contain infectious secretions, and (3) Spatial separation of at least 3 feet (or placement into an exam room) to keep immunocompromised and vulnerable patients safe.',
    cdcLinks: [
      CDC_GUIDANCE_LINKS.corePractices,
      CDC_GUIDANCE_LINKS.isolationPrecautions
    ],
    type: 'multi-select',
    question: 'Select the THREE immediate actions staff should take right now at reception:',
    choices: [
      {
        id: 'offer-mask',
        text: 'Offer a well-fitting mask to the patient if tolerated (source control).',
        isCorrect: true
      },
      {
        id: 'tissues-hand-hygiene',
        text: 'Provide tissues and immediate access to alcohol-based hand rub or handwashing.',
        isCorrect: true
      },
      {
        id: 'spatial-separation',
        text: 'Separate the coughing patient from others (at least 3 feet / 1 meter) or place them in an exam room if space permits.',
        isCorrect: true
      },
      {
        id: 'distractor-aiir',
        text: 'Immediately transfer the patient to a negative-pressure Airborne Infection Isolation Room (AIIR) before intake triage.',
        isCorrect: false
      },
      {
        id: 'distractor-car',
        text: 'Instruct the patient to wait outside in the clinic parking lot until their appointment time.',
        isCorrect: false
      },
      {
        id: 'distractor-antibiotic',
        text: 'Provide oral prophylactic antibiotics at the front desk before the nurse assessment.',
        isCorrect: false
      }
    ],
    requiredCount: 3
  }
];

if (typeof window !== 'undefined') {
  window.CLINICAL_GAMES = CLINICAL_GAMES;
  window.CDC_GUIDANCE_LINKS = CDC_GUIDANCE_LINKS;
}
