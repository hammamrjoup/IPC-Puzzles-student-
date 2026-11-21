/**
 * IPC Training Puzzles - Module 5: أكمل الحزمة | HAI Bundle Challenge
 * Content Review Date: 18 نوفمبر 2026
 * Developed by: Hammam Jubran Rjoup / MSN, CPIC
 * 
 * 100 Comprehensive Clinical Scenarios for Acute Adult Care:
 * - 25 CLABSI Cases (C1: WHO 2026, C2: CDC)
 * - 25 CAUTI Cases (U1: CDC 2009/online, U2: CDC 2025)
 * - 25 VAP Cases (V1: SHEA 2022 / CDC Stacks)
 * - 25 SSI Cases (S1: WHO 2018, S2: CDC 2017)
 */

const HAI_BUNDLE_SOURCES = {
  "C1": {
    "code": "C1",
    "author": "WHO",
    "year": "2026",
    "title": "القساطر الوريدية المركزية، الجزء الثاني (28 مايو 2026)",
    "url": "https://www.who.int/publications/i/item/9789240121805"
  },
  "C2": {
    "code": "C2",
    "author": "CDC",
    "year": "2024",
    "title": "ملخص توصيات القساطر الوعائية للوقاية من عدوى مجرى الدم",
    "url": "https://www.cdc.gov/infection-control/hcp/intravascular-catheter-related-infections/summary-recommendations.html"
  },
  "U1": {
    "code": "U1",
    "author": "CDC",
    "year": "2009",
    "title": "توصيات الوقاية من CAUTI، دليل 2009 وملخصه المنشور إلكترونيًا",
    "url": "https://www.cdc.gov/infection-control/hcp/cauti/summary-of-recommendations.html"
  },
  "U2": {
    "code": "U2",
    "author": "CDC",
    "year": "2025",
    "title": "السلامة السريرية للقسطرة البولية (2025)",
    "url": "https://www.cdc.gov/uti/hcp/clinical-safety/"
  },
  "V1": {
    "code": "V1",
    "author": "SHEA & Partners / CDC Stacks",
    "year": "2022",
    "title": "تحديث 2022 للوقاية من VAP/VAE",
    "url": "https://stacks.cdc.gov/view/cdc/150381"
  },
  "S1": {
    "code": "S1",
    "author": "WHO",
    "year": "2018",
    "title": "الوقاية من SSI، الطبعة الثانية 2018",
    "url": "https://www.who.int/publications/i/item/9789241550475"
  },
  "S2": {
    "code": "S2",
    "author": "CDC",
    "year": "2017",
    "title": "دليل الوقاية من عدوى موضع الجراحة SSI لعام 2017",
    "url": "https://www.cdc.gov/infection-control/hcp/surgical-site-infection/"
  }
};

const HAI_BUNDLE_CASES = [
  {
    "id": "CLABSI-01",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "أورام، تجهيز حقل لتركيب قسطرة مركزية مع غطاء صغير فقط",
    "prompt": "ما الإجراء الصحيح لاستكمال تجهيز الحقل المعقم وفق حزمة الوقاية؟",
    "key": "استكمل الحواجز القصوى بغطاء معقم لكامل الجسم.",
    "taskType": "spot_error",
    "sceneObject": "drape",
    "options": [
      {
        "id": "opt1",
        "text": "استكمل الحواجز القصوى بغطاء معقم لكامل الجسم.",
        "isCorrect": true,
        "textEn": "Add a full-body sterile drape as part of maximal sterile barrier precautions."
      },
      {
        "id": "opt2",
        "text": "المتابعة بالغطاء الصغير مع وضع كمامة إضافية للمريض والمدخل.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الحواجز القصوى تتطلب غطاءً معقماً لكامل الجسم (Full-body sterile drape) لحماية موقع الإدخال ومسار السلك والقسطرة بالكامل.",
        "textEn": "Proceed with the small drape while placing an extra mask on the patient and operator.",
        "rejectionReasonEn": "Rejected: Maximal barriers require a full-body sterile drape covering the patient to protect the insertion site, wire, and catheter path."
      },
      {
        "id": "opt3",
        "text": "رش مطهر إضافي على أطراف الغطاء الصغير لتوسيع العقامة.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: المطهر لا يعوض عن الحاجز الميكانيكي المعقم لكامل الجسم وفق توصيات CDC وWHO.",
        "textEn": "Spray additional antiseptic on the edges of the small drape to extend sterility.",
        "rejectionReasonEn": "Rejected: Antiseptic spray cannot substitute for a mechanical full-body sterile drape per CDC and WHO recommendations."
      }
    ],
    "explanation": "تتطلب احتياطات الحواجز المعقمة القصوى (Maximal Sterile Barrier Precautions) ارتداء غطاء الرأس والكمامة والمئزر المعقم والقفازات المعقمة، ووضع غطاء معقم لكامل جسم المريض.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": false,
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "In an adult oncology unit, the team is preparing to insert a central venous catheter. The sterile field includes only a small drape.",
    "promptEn": "What should be changed before insertion?",
    "keyEn": "Add a full-body sterile drape as part of maximal sterile barrier precautions.",
    "explanationEn": "Maximal sterile barrier precautions require cap, mask, sterile gown, sterile gloves, and a full-body sterile drape covering the patient to protect the insertion site and guide path."
  },
  {
    "id": "CLABSI-02",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "يرتدي الطبيب القفازات قبل تنظيف يديه",
    "prompt": "ما التوجيه الفوري الواجب اتخاذه لتطبيق الممارسة الآمنة؟",
    "key": "نظافة اليدين قبل ارتداء القفازات المعقمة.",
    "taskType": "spot_error",
    "sceneObject": "gloves",
    "options": [
      {
        "id": "opt1",
        "text": "نظافة اليدين قبل ارتداء القفازات المعقمة.",
        "isCorrect": true,
        "textEn": "Remove the gloves, perform hand hygiene, and don a fresh pair of sterile gloves."
      },
      {
        "id": "opt2",
        "text": "مسح القفازات بمطهر كحولي بعد ارتدائها لتعقيمها.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: القفازات لا تغني عن نظافة اليدين، وتطهير القفازات بالكحول يفسد مادتها المسامية.",
        "textEn": "Rub the sterile gloves with alcohol hand rub after donning to sterilize them.",
        "rejectionReasonEn": "Rejected: Gloves do not replace hand hygiene, and alcohol degrades glove material permeability."
      },
      {
        "id": "opt3",
        "text": "ارتداء زوج ثانٍ من القفازات المعقمة مباشرة فوق الأول.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: نظافة اليدين خطوة إلزامية مستقلة قبل لمس أو ارتداء القفازات المعقمة لمنع التلوث الخفي.",
        "textEn": "Don a second pair of sterile gloves directly over the first pair.",
        "rejectionReasonEn": "Rejected: Hand hygiene is an independent mandatory step before handling or donning sterile gloves."
      }
    ],
    "explanation": "نظافة اليدين بالماء والصابون أو بالمستحضر الكحولي خطوة أساسية غير قابلة للتفاوض قبل ارتداء القفازات المعقمة للإجراءات الغازية.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": false,
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "The operator puts on sterile gloves before performing hand hygiene.",
    "promptEn": "What should the operator do before proceeding?",
    "keyEn": "Remove the gloves, perform hand hygiene, and don a fresh pair of sterile gloves.",
    "explanationEn": "Hand hygiene using soap and water or alcohol-based hand rub is a mandatory, non-negotiable step prior to donning sterile gloves for invasive procedures."
  },
  {
    "id": "CLABSI-03",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "المطهّر الكحولي ما زال رطبًا بعد تحضير الجلد",
    "prompt": "ما الخطوة الصحيحة الواجب اتباعها قبل البدء بالوخز؟",
    "key": "اتركه يجف وفق تعليمات المنتج قبل الوخز.",
    "taskType": "spot_error",
    "sceneObject": "skin_prep",
    "options": [
      {
        "id": "opt1",
        "text": "اتركه يجف وفق تعليمات المنتج قبل الوخز.",
        "isCorrect": true,
        "textEn": "Allow the antiseptic to dry as directed by the manufacturer before puncture."
      },
      {
        "id": "opt2",
        "text": "تجفيف الجلد بشاش معقم للإسراع في بدء الإجراء.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: مسح الجلد يزيل المطهّر قبل إتمام وقت التماس المبيد للجراثيم (Contact time).",
        "textEn": "Dry the skin with sterile gauze to expedite procedure start.",
        "rejectionReasonEn": "Rejected: Wiping the skin removes the antiseptic before it achieves the necessary contact time."
      },
      {
        "id": "opt3",
        "text": "النفخ أو التلويح بلطف فوق الجلد لتبخير الكحول بسرعة.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: ينقل ميكروبات الجهاز التنفسي والبيئة المحيطة مباشرة إلى الموقع المطهّر.",
        "textEn": "Gently fan or blow over the skin to speed up alcohol evaporation.",
        "rejectionReasonEn": "Rejected: Fanning or blowing introduces respiratory droplets and environmental pathogens directly to the prepared site."
      }
    ],
    "explanation": "الفاعلية الميكروبية للمطهرات الجلدية الكحولية تعتمد على الجفاف الهوائي الكامل؛ وخز الجلد وهو رطب يبطل الفاعلية وينقل المطهر للأنسجة العميقة دون فائدة.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": false,
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "The insertion site has been prepared with an alcohol-based antiseptic. The skin is still visibly wet when the operator is ready to puncture.",
    "promptEn": "What should happen next?",
    "keyEn": "Allow the antiseptic to dry as directed by the manufacturer before puncture.",
    "explanationEn": "Microbicidal efficacy of alcohol-based skin antiseptics depends on complete air-drying; puncturing wet skin diminishes efficacy and introduces irritants."
  },
  {
    "id": "CLABSI-04",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "قبل الوخز اكتُشفت حساسية موثقة للكلورهيكسيدين",
    "prompt": "كيف تتصرف لاختيار المطهر الجلدي المناسب؟",
    "key": "اختر بديلًا مناسبًا معتمدًا وفق الدليل والبروتوكول.",
    "taskType": "bundle_builder",
    "sceneObject": "antiseptic",
    "options": [
      {
        "id": "opt1",
        "text": "اختر بديلًا مناسبًا معتمدًا وفق الدليل والبروتوكول.",
        "isCorrect": true,
        "textEn": "Use an approved alternative antiseptic appropriate for the site and allergy, following facility protocol."
      },
      {
        "id": "opt2",
        "text": "تخفيف الكلورهيكسيدين بمحلول ملحي معقم لتجنب رد الفعل التحسسي.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: التخفيف لا يمنع التفاعل التحسسي ويضعف الفاعلية المطهرة بشكل خطير.",
        "textEn": "Dilute the chlorhexidine with sterile normal saline to prevent allergic reaction.",
        "rejectionReasonEn": "Rejected: Dilution does not prevent allergic reactions and dangerously compromises antiseptic potency."
      },
      {
        "id": "opt3",
        "text": "الاكتفاء بغسل الجلد بالماء المعقم والصابون الطبي دون مطهر.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الصابون والماء وحدهما لا يحققان التطهير الميكروبي المستمر المطلوب للخطوط المركزية.",
        "textEn": "Cleanse the skin with sterile water and surgical soap without antiseptic.",
        "rejectionReasonEn": "Rejected: Soap and water alone do not provide the persistent antimicrobial kill required for central line placement."
      }
    ],
    "explanation": "عند وجود حساسية موثقة للكلورهيكسيدين، يوصى باستخدام بوفيدون اليود الكحولي (أو المائي وفق موانع الكحول) أو صبغة اليود كبديل معتمد وفق بروتوكول المنشأة.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": false,
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "Immediately before puncture, the team discovers a documented chlorhexidine allergy.",
    "promptEn": "How should the team proceed?",
    "keyEn": "Use an approved alternative antiseptic appropriate for the site and allergy, following facility protocol.",
    "explanationEn": "When chlorhexidine allergy is documented, use an approved alternative such as povidone-iodine in alcohol (or aqueous if alcohol is contraindicated) following facility protocol."
  },
  {
    "id": "CLABSI-05",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "يلمس المتدرّب الجلد المطهّر بإصبع غير معقم لتحديد الوريد",
    "prompt": "ما الإجراء التصحيحي الفوري الواجب اتخاذه؟",
    "key": "أوقف الخطوة وأعد التحضير وحافظ على التقنية المعقمة.",
    "taskType": "spot_error",
    "sceneObject": "technique",
    "options": [
      {
        "id": "opt1",
        "text": "أوقف الخطوة وأعد التحضير وحافظ على التقنية المعقمة.",
        "isCorrect": true,
        "textEn": "Pause, repeat skin preparation, and maintain aseptic technique before proceeding."
      },
      {
        "id": "opt2",
        "text": "مسح الإصبع بمسحة كحولية ومتابعة الوخز فوراً.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: حدث خرق للعقامة ويجب إيقاف الإجراء وإعادة تطهير الجلد بالكامل وتركه يجف.",
        "textEn": "Wipe the finger with an alcohol swab and continue puncture immediately.",
        "rejectionReasonEn": "Rejected: A breach occurred; the procedure must pause and skin prep must be fully repeated."
      },
      {
        "id": "opt3",
        "text": "المتابعة طالما أن المريض يتلقى تغطية بمضاد حيوي وقائي.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: المضاد الحيوي الوقائي لا يحمي من التلوث المباشر بميكروبات الجلد المقاومة.",
        "textEn": "Proceed as long as the patient is receiving prophylactic systemic antibiotics.",
        "rejectionReasonEn": "Rejected: Prophylactic antibiotics do not protect against direct inoculation of resistant skin organisms."
      }
    ],
    "explanation": "تطبيق «قوة الإيقاف» (Stop-the-line) عند حدوث أي خرق للعقامة؛ يُعاد تطهير الجلد بالكامل ويُمنع لمس موقع الوخز بعد تطهيره إلا بقفاز معقم إذا كان ضرورياً.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": false,
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "A trainee touches the prepared insertion site with a nonsterile finger while trying to locate the vein.",
    "promptEn": "What should the team do?",
    "keyEn": "Pause, repeat skin preparation, and maintain aseptic technique before proceeding.",
    "explanationEn": "Enforce 'Stop-the-line' whenever sterility is breached; repeat full skin preparation and allow to dry before proceeding."
  },
  {
    "id": "CLABSI-06",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "الوصفة تحتاج إلى تجويف واحد ويطلب الفريق ثلاثة لمجرد الاحتياط",
    "prompt": "ما القرار الصائب بشأن عدد تجاويف القسطرة (Lumens)؟",
    "key": "اختر أقل عدد من التجاويف يلبي الحاجة.",
    "taskType": "bundle_builder",
    "sceneObject": "catheter_type",
    "options": [
      {
        "id": "opt1",
        "text": "اختر أقل عدد من التجاويف يلبي الحاجة.",
        "isCorrect": true,
        "textEn": "Use the fewest lumens that meet the current treatment requirements."
      },
      {
        "id": "opt2",
        "text": "الموافقة على القسطرة ثلاثية التجاويف تحسباً لأي طارئ.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: زيادة عدد التجاويف ترتبط ارتباطاً طردياً مع ارتفاع خطر تجرثم الدم والتلوث الموضعي.",
        "textEn": "Approve the triple-lumen catheter prophylactically for potential future emergencies.",
        "rejectionReasonEn": "Rejected: Additional unused lumens significantly increase colonization and bloodstream infection risk."
      },
      {
        "id": "opt3",
        "text": "تركيب قسطرتين أحاديتي التجويف في موقعين منفصلين.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: تعدد مواقع الإدخال يضاعف مخاطر الاختلاطات الميكانيكية والعدوى.",
        "textEn": "Place two separate single-lumen central lines at two distinct anatomical sites.",
        "rejectionReasonEn": "Rejected: Inserting multiple central lines multiplies mechanical insertion risks and vascular entry points."
      }
    ],
    "explanation": "توصي منظمة الصحة العالمية وCDC باختيار القسطرة الوريدية المركزية بأقل عدد ممكن من التجاويف الأساسية للعلاج السريري للمريض.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": false,
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "The planned IV treatment requires one lumen. A team member requests a three-lumen catheter in case additional access is needed later.",
    "promptEn": "How many lumens should be selected?",
    "keyEn": "Use the fewest lumens that meet the current treatment requirements.",
    "explanationEn": "Catheters with the minimum required number of lumens reduce the risk of intraluminal contamination and infection."
  },
  {
    "id": "CLABSI-07",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "مريض قصور كلوي متقدم يحتاج إلى وصول مركزي ويُقترح تحت الترقوة",
    "prompt": "ما الإجراء السريري لحماية أوردة الغسيل الكلوي المستقبلية؟",
    "key": "ناقش موقعًا بديلًا يحافظ على الأوردة اللازمة للغسيل.",
    "taskType": "bundle_builder",
    "sceneObject": "site_selection",
    "options": [
      {
        "id": "opt1",
        "text": "ناقش موقعًا بديلًا يحافظ على الأوردة اللازمة للغسيل.",
        "isCorrect": true,
        "textEn": "Discuss an alternative site that preserves venous access for dialysis."
      },
      {
        "id": "opt2",
        "text": "استخدام وريد تحت الترقوة لأنه يحقق أدنى معدل عدوى دائماً.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: قسطرة تحت الترقوة تسبب تضيقاً وريدياً (Subclavian stenosis) يدمر فرص إنشاء ناسور شرياني وريدي (AVF).",
        "textEn": "Use the subclavian vein anyway because it always has the lowest infection rate.",
        "rejectionReasonEn": "Rejected: Preserving veins for arteriovenous fistula creation is a paramount clinical priority in kidney disease."
      },
      {
        "id": "opt3",
        "text": "اللجوء إلى الوريد الفخذي كخيار روتيني أول.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: يرتبط بأعلى معدلات العدوى والتخثر ولا يفضل للبالغين إلا في الضرورة القصوى.",
        "textEn": "Use the femoral vein as the routine first-line option.",
        "rejectionReasonEn": "Rejected: The femoral site carries higher infection risks and venous thrombosis in adult acute care."
      }
    ],
    "explanation": "في مرضى القصور الكلوي المتقدم (CKD stage 4-5)، يُتجنب وريد تحت الترقوة لحماية أوردة الطرف العلوي لإنشاء ناسور الغسيل، ويفضل الوريد الوداجي الباطن الأيمن بالتنسيق مع أخصائي الكلى.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": false,
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "An adult with advanced kidney disease requires central venous access. The team proposes a subclavian line.",
    "promptEn": "What should be discussed before choosing the site?",
    "keyEn": "Discuss an alternative site that preserves venous access for dialysis.",
    "explanationEn": "Subclavian catheterization risks subclavian vein stenosis, which can destroy vascular access needed for future hemodialysis."
  },
  {
    "id": "CLABSI-08",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "ممارس غير مدرّب يريد تركيب الخط تحت إرشاد الموجات فوق الصوتية منفردًا",
    "prompt": "كيف يتم ضمان مأمونية المريض وكفاءة الإجراء؟",
    "key": "اطلب ممارسًا مؤهلًا ومدربًا على التقنية.",
    "taskType": "bundle_builder",
    "sceneObject": "practitioner",
    "options": [
      {
        "id": "opt1",
        "text": "اطلب ممارسًا مؤهلًا ومدربًا على التقنية.",
        "isCorrect": true,
        "textEn": "Arrange for a qualified clinician trained in the technique to perform the insertion."
      },
      {
        "id": "opt2",
        "text": "السماح له بالمحاولة مع متابعة فيديو توضيحي سريع.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الإجراء غازي وعالي الخطورة ويتطلب إشرافاً مباشراً وكفاءة موثقة.",
        "textEn": "Allow the operator to attempt the line while watching a quick procedural video.",
        "rejectionReasonEn": "Rejected: Watching a video does not satisfy clinical credentialing or patient safety standards."
      },
      {
        "id": "opt3",
        "text": "التخلي عن جهاز السونار والتركيب بالطريقة التشريحية العمياء.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: إرشاد الموجات فوق الصوتية يقلل محاولات الوخز والاختلاطات عند استخدامه من قِبل متدرب مؤهل.",
        "textEn": "Abandon ultrasound and proceed with blind anatomical landmark insertion.",
        "rejectionReasonEn": "Rejected: Abandoning ultrasound guidance increases failure rates and mechanical injury."
      }
    ],
    "explanation": "يجب أن يقوم بتركيب القساطر المركزية ممارسون مؤهلون ومدربون أو متدربون تحت إشراف سريري مباشر معتمد لضمان السلامة وتقليل الاختلاطات.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": false,
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "A clinician without training in ultrasound-guided central line insertion plans to perform the procedure independently.",
    "promptEn": "How should the team respond?",
    "keyEn": "Arrange for a qualified clinician trained in the technique to perform the insertion.",
    "explanationEn": "Real-time ultrasound guidance improves insertion success and reduces mechanical complications; untrained operators should not insert central lines independently."
  },
  {
    "id": "CLABSI-09",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "تركيب إسعافي تعذّر فيه ضمان التقنية المعقمة وما زالت القسطرة مطلوبة",
    "prompt": "ما التوقيت والتوجيه المعتمد للتعامل مع هذا الخط الإسعافي؟",
    "key": "رتّب لاستبدالها بأسرع ما يمكن ضمن 48 ساعة وفق CDC.",
    "taskType": "bundle_builder",
    "sceneObject": "emergency_line",
    "options": [
      {
        "id": "opt1",
        "text": "رتّب لاستبدالها بأسرع ما يمكن ضمن 48 ساعة وفق CDC.",
        "isCorrect": true,
        "textEn": "Arrange replacement as soon as possible and within 48 hours, per CDC."
      },
      {
        "id": "opt2",
        "text": "غسل القسطرة بمحلول هيبارين ومضاد حيوي وتركها في مكانها.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الغسيل بالمضادات لا يعالج تلوث السطح الخارجي الناجم عن التركيب غير المعقم.",
        "textEn": "Flush the catheter with heparin and antibiotic solution and leave it in place.",
        "rejectionReasonEn": "Rejected: Antimicrobial flushes do not correct an emergent breach of sterile insertion barriers."
      },
      {
        "id": "opt3",
        "text": "تغيير الضماد الخارجي فقط وإبقاء القسطرة لمدة أسبوع.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: خرق العقامة أثناء الإدخال الإسعافي يستوجب استبدال الخط بالكامل في موقع جديد خلال 48 ساعة.",
        "textEn": "Change the external dressing only and leave the catheter for one week.",
        "rejectionReasonEn": "Rejected: Changing the dressing does not remediate potential intraluminal or extraluminal bacterial seeding."
      }
    ],
    "explanation": "توصي CDC بأنه إذا تم تركيب قسطرة وريدية مركزية في ظروف إسعافية تعذر فيها الالتزام بالتقنية المعقمة الصارمة، يجب إزالتها واستبدالها في موقع جديد بأسرع وقت، وخلال 48 ساعة كحد أقصى.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": false,
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "A central line was placed during an emergency when aseptic technique could not be assured. The patient still requires central access.",
    "promptEn": "What is the plan for the line?",
    "keyEn": "Arrange replacement as soon as possible and within 48 hours, per CDC.",
    "explanationEn": "Central lines placed during acute resuscitation where aseptic barriers could not be assured must be removed/replaced within 48 hours per CDC guidelines."
  },
  {
    "id": "CLABSI-10",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "ممرضة على وشك توصيل مضاد بمنفذ مكشوف دون تطهير",
    "prompt": "ما الخطوة الإلزامية قبل توصيل أي جهاز وصول بالمنفذ؟",
    "key": "طهّر المنفذ وفق تعليمات المستحضر واستخدم جهاز وصول معقمًا.",
    "taskType": "spot_error",
    "sceneObject": "hub",
    "options": [
      {
        "id": "opt1",
        "text": "طهّر المنفذ وفق تعليمات المستحضر واستخدم جهاز وصول معقمًا.",
        "isCorrect": true,
        "textEn": "Disinfect the port per product instructions and connect using a sterile access device."
      },
      {
        "id": "opt2",
        "text": "التوصيل السريع دون لمس الفتحة الداخلية للمنفذ.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: سطح المنفذ معرض للبيئة ومستعمر بالميكروبات ويجب فركه ميكانيكياً بالمطهر (Scrub the hub).",
        "textEn": "Connect rapidly without touching the inner bore of the port.",
        "rejectionReasonEn": "Rejected: Accessing without scrubbing introduces biofilms and pathogens directly into the bloodstream."
      },
      {
        "id": "opt3",
        "text": "رش رذاذ محلول ملحي معقم على المنفذ وتوصيل المحلول.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: المحلول الملحي ليس مطهراً ولا يقضي على البيوفيلم الجرثومي.",
        "textEn": "Spray sterile normal saline on the port before connection.",
        "rejectionReasonEn": "Rejected: Normal saline is not an antiseptic and does not disinfect access hubs."
      }
    ],
    "explanation": "فرك منفذ الوصول (Scrub the hub) بقوة بمطهر معتمد (كحول 70% أو كلورهيكسيدين كحولي) لمدة لا تقل عن 5-15 ثانية وتركه يجف تماماً خطوة حاسمة لمنع دخول الميكروبات.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": false,
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "A nurse is about to connect an IV antibiotic to an exposed access port that has yet to be disinfected.",
    "promptEn": "What should the nurse do?",
    "keyEn": "Disinfect the port per product instructions and connect using a sterile access device.",
    "explanationEn": "Scrub the needleless connector vigorously with 70% alcohol or chlorhexidine-alcohol (e.g., for 15 seconds) and allow to dry before accessing."
  },
  {
    "id": "CLABSI-11",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "ضماد شفاف أصبح مبتلًا بعد الاستحمام",
    "prompt": "ما الإجراء الصحيح فور ملاحظة بلل الضماد؟",
    "key": "غيّره بتقنية معقمة وافحص الموقع.",
    "taskType": "spot_error",
    "sceneObject": "dressing_wet",
    "options": [
      {
        "id": "opt1",
        "text": "غيّره بتقنية معقمة وافحص الموقع.",
        "isCorrect": true,
        "textEn": "Replace the damp dressing using aseptic technique and inspect the insertion site."
      },
      {
        "id": "opt2",
        "text": "تجفيف الضماد بهواء دافئ وتركه حتى موعد الغيار الأسبوعي.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: البلل يفسد الحاجز المعقم ويشكل قناة لنفاذ البكتيريا من الجلد إلى موقع الإدخال.",
        "textEn": "Dry the dressing with warm air and leave it until the scheduled weekly dressing change.",
        "rejectionReasonEn": "Rejected: A damp dressing fosters bacterial proliferation and destroys the barrier seal."
      },
      {
        "id": "opt3",
        "text": "وضع شريط لاصق إضافي فوق الضماد المبتل لحبسه.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: حبس الرطوبة تحت الضماد يحفز التكاثر الجرثومي والفطري السريع.",
        "textEn": "Apply additional adhesive tape over the damp dressing to seal in moisture.",
        "rejectionReasonEn": "Rejected: Taping over moisture traps bacterial growth directly over the insertion wound."
      }
    ],
    "explanation": "يجب تغيير ضماد القسطرة فوراً إذا أصبح رطباً أو مفكوكاً أو متسخاً ظاهرياً بتقنية معقمة، مع فحص موقع الخروج بحثاً عن أي علامات التهاب.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": false,
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "A transparent central line dressing becomes wet during a shower.",
    "promptEn": "What should the nurse do during the dressing change?",
    "keyEn": "Replace the damp dressing using aseptic technique and inspect the insertion site.",
    "explanationEn": "Dressings that become damp, loose, or soiled compromise the sterile seal and must be replaced promptly using aseptic technique."
  },
  {
    "id": "CLABSI-12",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "حافة الضماد مفكوكة وموقع الدخول مكشوف",
    "prompt": "ما التدخل المناسب لاستعادة حماية موقع القسطرة؟",
    "key": "استبدل الضماد لاستعادة التغطية السليمة.",
    "taskType": "spot_error",
    "sceneObject": "dressing_loose",
    "options": [
      {
        "id": "opt1",
        "text": "استبدل الضماد لاستعادة التغطية السليمة.",
        "isCorrect": true,
        "textEn": "Replace the dressing to restore intact sterile coverage."
      },
      {
        "id": "opt2",
        "text": "إعادة تثبيت الحافة المفكوكة بشريط لاصق عادي دون تغيير الضماد.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: موقع الدخول تعرض للهواء والتلوث الخارجي، ويجب إعادة التطهير ووضع ضماد معقم جديد.",
        "textEn": "Re-tape the lifted edge with regular medical adhesive tape without changing the dressing.",
        "rejectionReasonEn": "Rejected: Taping over a lifted edge leaves exposed skin colonized and unsterile."
      },
      {
        "id": "opt3",
        "text": "ترك الضماد كما هو طالما أن المريض لا يعاني من حمى.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الانتظار حتى ظهور الأعراض إخفاق وقائي، والضماد المفكوك خرق صريح للحماية.",
        "textEn": "Leave the dressing as is as long as the patient does not have a fever.",
        "rejectionReasonEn": "Rejected: Preventive bundles require maintaining intact sterile coverage before infection develops."
      }
    ],
    "explanation": "تغطية موقع الإدخال بالكامل بضماد شفاف معقم سليم الالتصاق أساسي لمنع وصول الكائنات الحية الدقيقة إلى قناة القسطرة.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": false,
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "During rounds, you notice that the dressing edge has lifted and the insertion site is exposed.",
    "promptEn": "What action is required?",
    "keyEn": "Replace the dressing to restore intact sterile coverage.",
    "explanationEn": "A lifted dressing edge breaks sterile isolation; replace the entire dressing immediately to restore continuous protection."
  },
  {
    "id": "CLABSI-13",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "الموقع ينزّ مباشرة بعد الإدخال",
    "prompt": "ما نوع الضماد المفضل للتعامل مع النزف الموضعي الأولي؟",
    "key": "استخدم شاشًا معقمًا إلى أن يتوقف النزّ وفق البروتوكول.",
    "taskType": "bundle_builder",
    "sceneObject": "oozing_site",
    "options": [
      {
        "id": "opt1",
        "text": "استخدم شاشًا معقمًا إلى أن يتوقف النزّ وفق البروتوكول.",
        "isCorrect": true,
        "textEn": "Use sterile gauze until the oozing resolves, following facility protocol."
      },
      {
        "id": "opt2",
        "text": "وضع ضماد شفاف رقيق ومراقبة تجمع الدم تحته.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: تجمع الدم تحت الضماد الشفاف يوفر بيئة استنبات غنية للبكتيريا ويفسد الالتصاق.",
        "textEn": "Place a thin transparent film dressing and monitor blood accumulation beneath it.",
        "rejectionReasonEn": "Rejected: Blood pooling under semipermeable film provides an ideal culture medium for bacteria."
      },
      {
        "id": "opt3",
        "text": "نزع القسطرة فوراً وإعادة إدخالها في وريد آخر.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: النزّ البسيط بعد الإدخال متوقع ويُعالج بضماد شاش معقم ضاغط دون حاجة لنزع الخط.",
        "textEn": "Remove the catheter immediately and reinsert at another vein.",
        "rejectionReasonEn": "Rejected: Mild post-placement oozing is managed with sterile gauze pressure dressings, not premature removal."
      }
    ],
    "explanation": "توصي CDC وWHO باستخدام ضماد شاش معقم (Gauze dressing) إذا كان الموقع ينز دماً، واستبداله بضماد شفاف بمجرد توقف النزف أو خلال 48 ساعة كحد أقصى.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": false,
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "The insertion site continues to ooze immediately after placement.",
    "promptEn": "Which dressing is appropriate while the site is oozing?",
    "keyEn": "Use sterile gauze until the oozing resolves, following facility protocol.",
    "explanationEn": "If site oozing is present, use sterile gauze dressing and change within 48 hours or when oozing resolves before switching to transparent dressing."
  },
  {
    "id": "CLABSI-14",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "مريض يريد غمر ذراعه التي تحمل PICC في حوض الماء",
    "prompt": "ما التوجيه الوقائي الصارم أثناء استحمام المريض؟",
    "key": "تجنّب الغمر واحمِ الموقع والوصلات أثناء الاستحمام.",
    "taskType": "bundle_builder",
    "sceneObject": "showering",
    "options": [
      {
        "id": "opt1",
        "text": "تجنّب الغمر واحمِ الموقع والوصلات أثناء الاستحمام.",
        "isCorrect": true,
        "textEn": "Avoid submerging the catheter or site. Protect the site and connections during showering."
      },
      {
        "id": "opt2",
        "text": "السماح بغمر الذراع طالما أن الضماد الشفاف محكم الإغلاق.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الضمادات الشفافة ليست مضمونة ضد الغمر المائي المباشر وخطر التسرب مرتفع.",
        "textEn": "Permit soaking in warm bath water as long as antiseptic solution is added to the bath.",
        "rejectionReasonEn": "Rejected: Submersion in bath water is strictly contraindicated for intravascular catheters."
      },
      {
        "id": "opt3",
        "text": "فصل الخط وغمره بالماء ثم إعادة ربطه.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: خطر كارثي لدخول ميكروبات الماء الراكد مباشرة إلى مجرى الدم.",
        "textEn": "Submerge the catheter provided an extra transparent dressing is placed over it.",
        "rejectionReasonEn": "Rejected: Water can penetrate dressings during prolonged immersion."
      }
    ],
    "explanation": "يجب تجنب غمر القسطرة أو موقع الإدخال في حوض الاستحمام؛ ويُسمح بالدش السريع مع تغطية القسطرة والوصلات بغلاف عازل مقاوم للماء تماماً.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": false,
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "A patient with a peripherally inserted central catheter (PICC) asks whether they can soak the affected arm in a bath.",
    "promptEn": "What advice should you give?",
    "keyEn": "Avoid submerging the catheter or site. Protect the site and connections during showering.",
    "explanationEn": "Submerging catheter sites in water (baths, hot tubs) allows contaminated water entry; protect with waterproof barriers during showering only."
  },
  {
    "id": "CLABSI-15",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "مريض يشكو ألمًا موضعيًا تحت ضماد معتم",
    "prompt": "ما الإجراء السريري الفوري لتقييم الشكوى؟",
    "key": "افحص الموقع بصريًا بعد رفع الضماد بالتقنية المناسبة.",
    "taskType": "spot_error",
    "sceneObject": "opaque_dressing",
    "options": [
      {
        "id": "opt1",
        "text": "افحص الموقع بصريًا بعد رفع الضماد بالتقنية المناسبة.",
        "isCorrect": true,
        "textEn": "Remove the dressing using the appropriate technique and visually inspect the site."
      },
      {
        "id": "opt2",
        "text": "إعطاء مسكن للألم ومراقبة المريض دون كشف الموقع.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الألم الموضعي تحت الضماد قد يكون أول علامة لعدوى موقع الخروج أو تسرب وريدي.",
        "textEn": "Press firmly through the opaque dressing to locate the focal trigger point.",
        "rejectionReasonEn": "Rejected: Palpating through an opaque dressing causes pain and fails to visualize signs of infection."
      },
      {
        "id": "opt3",
        "text": "الضغط القوي فوق الضماد المعتم لاختبار مكان الألم بدقة.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: قد يؤذي المريض ويزيح القسطرة دون تقديم تقييم بصري مباشر.",
        "textEn": "Administer systemic analgesics and reassess at the next scheduled shift change.",
        "rejectionReasonEn": "Rejected: Masking pain with analgesics delays recognition of catheter-related infection."
      }
    ],
    "explanation": "الضمادات المعتمة تحجب الرؤية؛ عند حدوث ألم موضعي أو إيلام بالجس أو حمى مجهولة المصدر، يجب إزالة الضماد المعتم لفحص موقع الدخول وتطهيره ووضع ضماد جديد.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": false,
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "A patient reports new tenderness beneath an opaque central line dressing.",
    "promptEn": "How should the site be assessed?",
    "keyEn": "Remove the dressing using the appropriate technique and visually inspect the site.",
    "explanationEn": "New localized tenderness, erythema, or purulence under a dressing requires aseptic removal and direct inspection of the exit site."
  },
  {
    "id": "CLABSI-16",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "اقتراح تبديل قسطرة سليمة كل أسبوع للوقاية",
    "prompt": "ما الموقف العلمي من الاستبدال الروتيني المجدول للقساطر المركزية؟",
    "key": "استمر بالعناية وراجع الداعي؛ تجنّب التبديل المجدول لهذا السبب وحده.",
    "taskType": "bundle_builder",
    "sceneObject": "routine_replacement",
    "options": [
      {
        "id": "opt1",
        "text": "استمر بالعناية وراجع الداعي؛ تجنّب التبديل المجدول لهذا السبب وحده.",
        "isCorrect": true,
        "textEn": "Continue indicated maintenance and review line necessity. Avoid routine scheduled replacement solely for infection prevention."
      },
      {
        "id": "opt2",
        "text": "الموافقة على التبديل الأسبوعي لتقليل تكوّن البيوفيلم البكتيري.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الاستبدال المجدول الروتيني يرفع معدل المضاعفات الميكانيكية ولا يقلل عدوى مجرى الدم.",
        "textEn": "Replace the central line routinely every 7 days across alternative peripheral sites.",
        "rejectionReasonEn": "Rejected: Routine scheduled replacement increases mechanical insertion complications without reducing infection."
      },
      {
        "id": "opt3",
        "text": "تبديل القسطرة كل 3 أيام أسوة بالقساطر الوريدية الطرفية.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: القساطر المركزية لا تُبدل دورياً بل تبقى طالما كان الداعي السريري قائماً وهي تعمل بأمان.",
        "textEn": "Convert the line to an arterial line after 5 days of use.",
        "rejectionReasonEn": "Rejected: Catheters cannot be repurposed into arterial monitoring lines."
      }
    ],
    "explanation": "توصيات CDC وWHO واضحة: لا تقم باستبدال القساطر الوريدية المركزية بشكل دوري مجدول كإجراء روتيني للوقاية من العدوى.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": false,
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "A functioning central line remains clinically necessary. A clinician proposes replacing it every week to prevent infection.",
    "promptEn": "What is the appropriate plan?",
    "keyEn": "Continue indicated maintenance and review line necessity. Avoid routine scheduled replacement solely for infection prevention.",
    "explanationEn": "Routine scheduled central line replacement solely to prevent infection is not recommended; remove lines only when clinically indicated."
  },
  {
    "id": "CLABSI-17",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "حمى منفردة وخط سليم ظاهريًا مع مصدر آخر محتمل",
    "prompt": "ما الخطوة السريرية الرشيدة قبل اتخاذ قرار إزالة الخط؟",
    "key": "قيّم الأسباب والحالة سريريًا قبل قرار إزالة الخط.",
    "taskType": "bundle_builder",
    "sceneObject": "fever_eval",
    "options": [
      {
        "id": "opt1",
        "text": "قيّم الأسباب والحالة سريريًا قبل قرار إزالة الخط.",
        "isCorrect": true,
        "textEn": "Evaluate the patient and possible sources before deciding. Fever alone is insufficient grounds for routine removal."
      },
      {
        "id": "opt2",
        "text": "نزع القسطرة فوراً وبشكل تلقائي بمجرد ارتفاع الحرارة.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الحمى المنفردة قد تنجم عن أسباب أخرى؛ النزع المتسرع يحرم المريض من وصول وريدي حيوي دون داعٍ.",
        "textEn": "Remove the catheter immediately and automatically as soon as fever spikes.",
        "rejectionReasonEn": "Rejected: Fever alone without clinical workup does not mandate immediate catheter sacrifice."
      },
      {
        "id": "opt3",
        "text": "حقن جرعة مضاد حيوي مكثفة في تجاويف القسطرة دون سحب مزارع.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: يجب سحب مزارع الدم المقترنة (من الخط والوريد الطرفي) قبل إعطاء المضادات الحيوية.",
        "textEn": "Instill a concentrated antibiotic lock into all catheter lumens without drawing blood cultures.",
        "rejectionReasonEn": "Rejected: Administering antimicrobials before blood cultures prevents identifying the causative pathogen."
      }
    ],
    "explanation": "يتم تقييم المريض سريرياً والبحث عن مصادر الحمى الأخرى، وسحب عينات دم مقترنة للمزرعة لتشخيص CLABSI قبل اتخاذ قرار النزع ما لم يكن المريض في صدمة إنتانية أو موقع الخط ملتهباً بشدة.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": false,
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "A patient with a central line develops a fever. The site appears intact, and another source is possible.",
    "promptEn": "How should the team approach the removal decision?",
    "keyEn": "Evaluate the patient and possible sources before deciding. Fever alone is insufficient grounds for routine removal.",
    "explanationEn": "In suspected CLABSI, draw paired blood cultures (one from catheter lumen and one from peripheral vein) before starting new empiric antibiotics."
  },
  {
    "id": "CLABSI-18",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "اشتباه بعدوى قسطرة مركزية غير نفقية وفريق يقترح الاستبدال فوق سلك",
    "prompt": "ما القرار المعتمد بشأن الاستبدال فوق السلك (Guidewire exchange) في حالة الاشتباه بالعدوى؟",
    "key": "تجنّب تبديل الخط المشتبه بإصابته فوق سلك واطلب تقييم الفريق.",
    "taskType": "bundle_builder",
    "sceneObject": "guidewire",
    "options": [
      {
        "id": "opt1",
        "text": "تجنّب تبديل الخط المشتبه بإصابته فوق سلك واطلب تقييم الفريق.",
        "isCorrect": true,
        "textEn": "Avoid guidewire exchange of the suspected infected line and seek prompt clinical assessment."
      },
      {
        "id": "opt2",
        "text": "استبدال الخط فوق السلك لتوفير عناء الوخز الجديد للمريض.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: السلك سيمر عبر التجويف والقناة الملوثة وينقل الميكروبات مباشرة إلى القسطرة الجديدة.",
        "textEn": "Exchange over a guidewire to spare the patient the discomfort of a new venipuncture.",
        "rejectionReasonEn": "Rejected: Guidewire exchange through an infected tract inoculates the new device with biofilm."
      },
      {
        "id": "opt3",
        "text": "نقع السلك التوجيهي في كحول 70% وإتمام الاستبدال فوقه.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: ممارسة غير مقبولة طبياً وتخرق معايير مكافحة العدوى والسلامة.",
        "textEn": "Soak the guidewire in 70% alcohol and complete the exchange over it.",
        "rejectionReasonEn": "Rejected: Alcohol soaking is not an approved sterilization method and damages medical wires."
      }
    ],
    "explanation": "توصي CDC بعدم استخدام الاستبدال فوق السلك التوجيهي للقساطر المشتبه بإصابتها بعدوى جرثومية؛ يجب إزالة الخط واختيار موقع تشريحي جديد إن كان الوصول لا يزال مطلوباً.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": false,
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "The team suspects infection involving a nontunneled central line and proposes exchanging it over a guidewire.",
    "promptEn": "How should you respond?",
    "keyEn": "Avoid guidewire exchange of the suspected infected line and seek prompt clinical assessment.",
    "explanationEn": "Do not exchange a suspected infected catheter over a guidewire; guidewire exchange carries high risk of seeding the replacement catheter."
  },
  {
    "id": "CLABSI-19",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "انتهى العلاج الوريدي ويمكن إعطاء الأدوية فمويًا ولا يوجد داعٍ آخر",
    "prompt": "ما الخطوة الأهم في حزمة صيانة الخطوط المركزية عند هذه النقطة؟",
    "key": "نسّق إزالة القسطرة فور انتفاء الحاجة.",
    "taskType": "bundle_builder",
    "sceneObject": "prompt_removal",
    "options": [
      {
        "id": "opt1",
        "text": "نسّق إزالة القسطرة فور انتفاء الحاجة.",
        "isCorrect": true,
        "textEn": "Coordinate prompt removal because central access is no longer needed."
      },
      {
        "id": "opt2",
        "text": "إبقاء القسطرة لعدة أيام كإجراء احترازي تحسباً لانتكاسة المريض.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: بقاء القسطرة دون داعٍ سريري نشط هو العامل الأكبر المسبب لعدوى CLABSI.",
        "textEn": "Keep the line for several days as a precaution in case the patient deteriorates.",
        "rejectionReasonEn": "Rejected: Keeping lines for 'just in case' convenience unnecessarily exposes the patient to infection."
      },
      {
        "id": "opt3",
        "text": "تحويل القسطرة المركزية للاستخدام كقسطرة سحب دم روتينية.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: لا يجوز إبقاء خط مركزي لمجرد سحب الدم الوريدي الروتيني.",
        "textEn": "Reassign the central line as a routine peripheral blood drawing line.",
        "rejectionReasonEn": "Rejected: Maintaining central venous access solely for phlebotomy is inappropriate and unsafe."
      }
    ],
    "explanation": "المراجعة اليومية للضرورة السريرية وإزالة القسطرة المركزية فور انتفاء الحاجة (Prompt removal) تمثل الركيزة الأقوى في خفض معدلات العدوى.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": false,
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "IV treatment has ended. The remaining medications can be given orally, and no other indication for the line is documented.",
    "promptEn": "What should the team do?",
    "keyEn": "Coordinate prompt removal because central access is no longer needed.",
    "explanationEn": "Prompt removal of unnecessary intravascular catheters is the single most effective intervention to eliminate ongoing CLABSI risk."
  },
  {
    "id": "CLABSI-20",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "اقتراح مرهم مضاد حيوي روتيني عند مدخل PICC للأورام",
    "prompt": "ما التوصية الخاصة بتطبيق مراهم المضادات الحيوية الموضعية على موقع خروج القسطرة؟",
    "key": "استمر بالعناية المعتمدة وتجنّب المرهم الروتيني لهذا الموقع.",
    "taskType": "bundle_builder",
    "sceneObject": "ointment",
    "options": [
      {
        "id": "opt1",
        "text": "استمر بالعناية المعتمدة وتجنّب المرهم الروتيني لهذا الموقع.",
        "isCorrect": true,
        "textEn": "Follow the approved PICC site-care protocol and avoid routine antibiotic ointment at this site."
      },
      {
        "id": "opt2",
        "text": "وضع مرهم مضاد حيوي واسع الطيف في كل غيار لزيادة الحماية.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الاستخدام الروتيني للمراهم يعزز العدوى الفطرية وتطور سلالات بكتيرية مقاومة.",
        "textEn": "Apply broad-spectrum antibiotic ointment at every dressing change to increase protection.",
        "rejectionReasonEn": "Rejected: Routine topical antibiotic ointments promote fungal colonization and antimicrobial resistance."
      },
      {
        "id": "opt3",
        "text": "وضع مرهم كورتيزون موضعي لتجنب أي حكة أو احمرار.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: يثبط الاستجابة المناعية الموضعية ويرفع خطر تجرثم الدم.",
        "textEn": "Apply topical corticosteroid ointment to prevent potential itching or redness.",
        "rejectionReasonEn": "Rejected: Corticosteroids suppress local immune response and accelerate bacterial infection."
      }
    ],
    "explanation": "توصي CDC بعدم استخدام مراهم المضادات الحيوية أو مضادات الفطريات الموضعية بشكل روتيني على مواقع خروج القساطر (باستثناء قساطر الغسيل الكلوي وفق بروتوكولات محددة).",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": false,
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "An oncology team member proposes routine topical antibiotic ointment at a PICC insertion site.",
    "promptEn": "What maintenance plan is appropriate?",
    "keyEn": "Follow the approved PICC site-care protocol and avoid routine antibiotic ointment at this site.",
    "explanationEn": "Routine application of topical antibiotic ointments to catheter insertion sites promotes fungal infections and antimicrobial resistance."
  },
  {
    "id": "CLABSI-21",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "[تدقيق] قائمة الإدخال مكتملة التوقيع، لكن المراقب شاهد استعمال غطاء صغير",
    "prompt": "كيف تُسجّل نتيجة هذا التدقيق لقائمة تفقد الإدخال؟",
    "key": "غير مكتمل؛ وثّق المخالفة للحواجز القصوى.",
    "taskType": "record_audit",
    "auditType": "process_compliance",
    "options": [
      {
        "id": "opt1",
        "text": "غير مكتمل؛ وثّق المخالفة للحواجز القصوى.",
        "isCorrect": true,
        "textEn": "Not done. Record the observed barrier breach and reconcile the checklist discrepancy."
      },
      {
        "id": "opt2",
        "text": "مكتمل؛ الاعتماد على توقيع الطبيب والممرضة في السجل الرسمي.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: المشاهدة المباشرة كشفت عدم الالتزام بالحواجز القصوى؛ والتوثيق الشكلي لا يطابق الممارسة السريرية.",
        "textEn": "Score as complete relying on the physician's and nurse's signatures on the official checklist.",
        "rejectionReasonEn": "Rejected: Checklists cannot be credited when direct clinical observation reveals a clear barrier breach."
      },
      {
        "id": "opt3",
        "text": "غير منطبق؛ لأن الإجراء انتهى بنجاح والمريض مستقر.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: التدقيق السريري يهدف لرصد سلامة الممارسة أثناء الإجراء لمنع العدوى اللاحقة.",
        "textEn": "Score as not applicable because the procedure was technically successful and the patient is stable.",
        "rejectionReasonEn": "Rejected: Technical completion does not excuse breaches of mandatory infection prevention standards."
      }
    ],
    "explanation": "في تدقيق جودة مكافحة العدوى، الرصد الميداني المباشر يسمو على التوثيق الورقي، ويجب تسجيل خرق الحواجز القصوى لتحسين الأداء ومنع تكراره.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": true,
    "auditAnswer": "لم يتم",
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "A signed insertion checklist marks maximal barriers complete. The observer saw the team use only a small sterile drape.",
    "promptEn": "How should this item be scored?",
    "keyEn": "Not done. Record the observed barrier breach and reconcile the checklist discrepancy.",
    "explanationEn": "In IPC audit, direct observation supersedes signed forms; document the observed breach in maximal sterile barriers as non-compliant."
  },
  {
    "id": "CLABSI-22",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "[تدقيق] الملاحظة الوحيدة «تمت العناية بالخط» ولا توجد مشاهدة أو تفاصيل للمنفذ",
    "prompt": "ما التقييم التدقيقي السليم لحالة توثيق تطهير المنفذ؟",
    "key": "يتعذر تأكيد تطهير المنفذ؛ استكمل التحقق.",
    "taskType": "record_audit",
    "auditType": "documentation_gap",
    "options": [
      {
        "id": "opt1",
        "text": "يتعذر تأكيد تطهير المنفذ؛ استكمل التحقق.",
        "isCorrect": true,
        "textEn": "Not documented. Seek verification before crediting the item."
      },
      {
        "id": "opt2",
        "text": "تسجيل البند «مكتملاً» بافتراض حسن النية وتطبيق الروتين.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: القاعدة الذهبية في الرعاية السريرية: «ما لم يُوثّق بدقة، لا يمكن إثبات إنجازه».",
        "textEn": "Credit the item as complete assuming good intentions and routine adherence.",
        "rejectionReasonEn": "Rejected: Audits require verifiable proof; good intentions cannot substitute for evidence."
      },
      {
        "id": "opt3",
        "text": "تسجيل مخالفة مباشرة بفرك المنفذ وإيقاف الممرض.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: لا توجد مشاهدة تثبت المخالفة؛ التصنيف الصحيح هو «نقص توثيق» يستلزم التحقق.",
        "textEn": "Record a direct violation for port scrubbing and issue a formal staff reprimand.",
        "rejectionReasonEn": "Rejected: Lack of documentation is classified as 'Not Documented', not an unobserved active breach."
      }
    ],
    "explanation": "نقص التوثيق يمنع إثبات اكتمال الحزمة، ويُظهر مستقلاً عن المخالفة المشاهدة وفق أصول التدقيق السريري المعتمدة.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": true,
    "auditAnswer": "غير موثّق",
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "The sole entry reads “Line care completed.” No one observed access, and the note gives no details about the port.",
    "promptEn": "How should port disinfection be classified?",
    "keyEn": "Not documented. Seek verification before crediting the item.",
    "explanationEn": "Unverified care without documented port scrub or observation cannot be assumed compliant; mark as Not Documented."
  },
  {
    "id": "CLABSI-23",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "[تدقيق] في جولة الصيانة نُفذت جميع البنود المطلوبة، وبقيت القسطرة لعلاج وريدي موثق",
    "prompt": "ما النتيجة التدقيقية لجولة صيانة الخط اليوم؟",
    "key": "مكتمل؛ استمرار القسطرة المبرر يتوافق مع مراجعة الداعي.",
    "taskType": "record_audit",
    "auditType": "bundle_status",
    "options": [
      {
        "id": "opt1",
        "text": "مكتمل؛ استمرار القسطرة المبرر يتوافق مع مراجعة الداعي.",
        "isCorrect": true,
        "textEn": "Complete. The documented requirement supports keeping the line in place."
      },
      {
        "id": "opt2",
        "text": "غير مكتمل؛ لأن بقاء القسطرة بحد ذاته يمثل خطراً مستمراً.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الداعي السريري قائم ومبرر وموثق، وقد استوفت الجولة جميع بنود العناية القياسية.",
        "textEn": "Score as incomplete because maintaining a central line always represents an ongoing hazard.",
        "rejectionReasonEn": "Rejected: Legitimate, documented clinical need with compliant care fulfills bundle criteria."
      },
      {
        "id": "opt3",
        "text": "غير منطبق مع سبب؛ لأن القسطرة ليست جديدة.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: حزمة الصيانة تنطبق يومياً على جميع القساطر المركزية القائمة.",
        "textEn": "Score as not applicable with reason because the catheter is not newly inserted.",
        "rejectionReasonEn": "Rejected: Maintenance bundles specifically audit ongoing lines, regardless of insertion date."
      }
    ],
    "explanation": "تعتبر الحزمة مكتملة ومستوفاة إذا تم تطبيق عناصر الصيانة وتوثيق استمرار الحاجة السريرية بناءً على مراجعة يومية صريحة.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": true,
    "auditAnswer": "تم",
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "All applicable maintenance items were completed. The record confirms the line is still required for IV treatment.",
    "promptEn": "How should the round be scored?",
    "keyEn": "Complete. The documented requirement supports keeping the line in place.",
    "explanationEn": "When all physical maintenance items are verified and active medical indication is documented, the maintenance audit round is Complete."
  },
  {
    "id": "CLABSI-24",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "[تدقيق] أُزيل الخط أمس ويظهر اليوم في قائمة صيانة الخطوط",
    "prompt": "كيف يتعامل مدقق مكافحة العدوى مع هذه الملاحظة في سجل اليوم؟",
    "key": "استبعد الملاحظة من فرص الصيانة اليوم وصحّح السجل.",
    "taskType": "record_audit",
    "auditType": "denominator_exclusion",
    "options": [
      {
        "id": "opt1",
        "text": "استبعد الملاحظة من فرص الصيانة اليوم وصحّح السجل.",
        "isCorrect": true,
        "textEn": "Exclude it from today’s eligible opportunities and correct the roster."
      },
      {
        "id": "opt2",
        "text": "تسجيل الجولة كـ «غير مكتملة» لعدم وجود قسطرة لفحصها.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: احتساب مريض لا يحمل قسطرة يشوه بيانات التدقيق ويخفض النسبة ظلماً.",
        "textEn": "Score the round as 'Incomplete' because there was no line available to examine.",
        "rejectionReasonEn": "Rejected: Removed lines are no longer eligible opportunities for maintenance auditing."
      },
      {
        "id": "opt3",
        "text": "تسجيل جميع البنود كـ «تمت» تلقائياً لإغلاق القائمة.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: تزوير صريح لسجل التدقيق السريري.",
        "textEn": "Automatically mark all maintenance items as 'Done' to close the audit checklist.",
        "rejectionReasonEn": "Rejected: Falsifying audit records for non-existent catheters undermines data integrity."
      }
    ],
    "explanation": "تُستبعد الفرص غير المؤهلة بالكامل من مقام حساب الالتزام بالحزمة (Denominator exclusion) لتفادي تشويه مؤشرات الأداء السريرية.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": true,
    "auditAnswer": "غير منطبق مع سبب",
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "A line removed yesterday still appears on today’s maintenance roster.",
    "promptEn": "How should it be handled in today’s audit?",
    "keyEn": "Exclude it from today’s eligible opportunities and correct the roster.",
    "explanationEn": "Lines removed prior to the audit round do not represent active opportunities; exclude them from the denominator and update the roster."
  },
  {
    "id": "CLABSI-25",
    "bundle": "CLABSI",
    "bundleNameAr": "CLABSI — عدوى مجرى الدم المرتبطة بالقسطرة المركزية",
    "vignette": "[تدقيق] في 12 جولة صيانة مؤهلة استوفت 9 جميع البنود",
    "prompt": "ما نسبة الالتزام الكامل المثبت بالحزمة (All-or-None) وما الإجراء المطلوب؟",
    "key": "الالتزام الكامل 75%، وراجع العناصر الفائتة في الجولات الثلاث.",
    "taskType": "record_audit",
    "auditType": "calculation",
    "calculation": {
      "numerator": 9,
      "denominator": 12,
      "percentage": 75
    },
    "options": [
      {
        "id": "opt1",
        "text": "الالتزام الكامل 75%، وراجع العناصر الفائتة في الجولات الثلاث.",
        "isCorrect": true,
        "textEn": "75% (9 ÷ 12). Review which items were missed in the other three rounds."
      },
      {
        "id": "opt2",
        "text": "الالتزام الكامل 85% مع إضافة درجات ترجيحية للعناية بالضماد.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: حزمة الوقاية تتبع معيار الكل أو لا شيء (All-or-None): 9 ÷ 12 × 100 = 75% دون نقاط جزئية.",
        "textEn": "Report compliance as 85% by giving partial credit for dressing care.",
        "rejectionReasonEn": "Rejected: Infection prevention bundles follow strict all-or-none scoring without partial credit."
      },
      {
        "id": "opt3",
        "text": "الالتزام الكامل 75% وهو ما يعني أن معدل حدوث CLABSI في القسم هو 25%.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: لا يجوز تحويل نسبة الالتزام بالعمليات (Process measure) إلى معدل عدوى سريري (Outcome measure).",
        "textEn": "Report compliance as 75%, which implies the department CLABSI infection rate is 25%.",
        "rejectionReasonEn": "Rejected: Process compliance measures procedural adherence, not clinical outcome infection rates."
      }
    ],
    "explanation": "حساب الالتزام بالحزمة = (عدد الفرص المستوفية لكافة العناصر ÷ إجمالي الفرص المؤهلة) × 100 = (9 ÷ 12) × 100 = 75%. ولا تعادل نسبة الالتزام معدل الإصابة بالعدوى.",
    "sourceKeys": [
      "C1",
      "C2"
    ],
    "isAudit": true,
    "auditAnswer": "تم",
    "bundleNameEn": "CLABSI — Central Line-Associated Bloodstream Infection",
    "vignetteEn": "Nine of 12 eligible maintenance rounds met every applicable item.",
    "promptEn": "What was verified full compliance, and what should be reviewed?",
    "keyEn": "75% (9 ÷ 12). Review which items were missed in the other three rounds.",
    "explanationEn": "Full bundle compliance follows all-or-none scoring: (9 ÷ 12) × 100 = 75%. Process compliance is distinct from infection incidence."
  },
  {
    "id": "CAUTI-01",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "مسنّة تعاني سلسًا دون احتباس ويطلب الفريق قسطرة لتسهيل تغيير الفراش",
    "prompt": "ما التوجيه السليم بشأن دواعي إدخال القسطرة البولية؟",
    "key": "اعتمد رعاية السلس وخطة التبول الملائمة.",
    "taskType": "bundle_builder",
    "sceneObject": "incontinence_care",
    "options": [
      {
        "id": "opt1",
        "text": "اعتمد رعاية السلس وخطة التبول الملائمة.",
        "isCorrect": true,
        "textEn": "Use appropriate continence care and a toileting plan. Convenience alone does not justify catheterization."
      },
      {
        "id": "opt2",
        "text": "وضع قسطرة فولي بأصغر قياس لتسهيل رعاية التمريض وحماية الفراش.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: راحة التمريض وسلس البول دون احتباس ليسا استطباباً معتمداً للقسطرة الثابتة.",
        "textEn": "Place a small-bore Foley catheter to facilitate nursing care and protect bed linen.",
        "rejectionReasonEn": "Rejected: Incontinence care and skin protection should use barrier products and scheduled toileting, not invasive catheters."
      },
      {
        "id": "opt3",
        "text": "إدخال قسطرة ثابتة وتحديد موعد إزالتها بعد 48 ساعة.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: القسطرة الثابتة غير مبررة سريرياً من الأساس ويجب تجنب الإدخال لمنع CAUTI.",
        "textEn": "Insert an indwelling catheter and schedule its removal after 48 hours.",
        "rejectionReasonEn": "Rejected: Inserting an indwelling catheter without an approved clinical indication exposes the patient to unnecessary CAUTI risk."
      }
    ],
    "explanation": "تؤكد إرشادات CDC لعام 2009 و2025 أن علاج السلس البولي أو تسهيل العناية التمريضية ليسا من دواعي القسطرة البولية الثابتة؛ يجب استخدام بدائل غير غازية كالعناية بالجلد وجداول التبول.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": false,
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "An older inpatient has urinary incontinence without retention. The ward team requests an indwelling catheter to simplify linen changes.",
    "promptEn": "How should the team manage the incontinence?",
    "keyEn": "Use appropriate continence care and a toileting plan. Convenience alone does not justify catheterization.",
    "explanationEn": "Incontinence without acute urinary retention is not an acceptable clinical indication for an indwelling catheter; nursing convenience alone never justifies catheterization."
  },
  {
    "id": "CAUTI-02",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "رجل متعاون دون احتباس أو انسداد ويحتاج إلى وسيلة جمع بول",
    "prompt": "ما البديل الأقل خطورة لجمع البول لدى هذا المريض؟",
    "key": "قيّم ملاءمة القسطرة الخارجية.",
    "taskType": "bundle_builder",
    "sceneObject": "external_catheter",
    "options": [
      {
        "id": "opt1",
        "text": "قيّم ملاءمة القسطرة الخارجية.",
        "isCorrect": true,
        "textEn": "Assess suitability for an external urinary catheter."
      },
      {
        "id": "opt2",
        "text": "إدخال قسطرة فولي ثنائية التجويف كإجراء روتيني للمرضى الذكور.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: القسطرة الثابتة الغازية تحمل مخاطر عدوى جسيمة مقارنة بالقسطرة الخارجية الواقية (Condom catheter).",
        "textEn": "Insert a dual-lumen Foley catheter routinely for male patients.",
        "rejectionReasonEn": "Rejected: Non-invasive external options should always be evaluated first before placing indwelling catheters."
      },
      {
        "id": "opt3",
        "text": "منع إعطاء السوائل لتقليل تكرار الحاجة للتبول.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: ممارسة خاطئة تضر بوظائف الكلى وتفاقم تركيز البول والتهابات المسالك.",
        "textEn": "Restrict oral fluid intake to decrease urination frequency.",
        "rejectionReasonEn": "Rejected: Restricting fluids causes dehydration and increases urinary tract colonization."
      }
    ],
    "explanation": "القسطرة الخارجية لدى الذكور المتعاونين غير المصابين باحتباس أو انسداد بولي توفر وسيلة آمنة وغير غازية ترتبط بمعدلات عدوى ورضح أقل بكثير من القسطرة الثابتة.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": false,
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "A cooperative male inpatient needs a urine collection device. He has no urinary retention or bladder outlet obstruction.",
    "promptEn": "Which option is worth assessing?",
    "keyEn": "Assess suitability for an external urinary catheter.",
    "explanationEn": "In cooperative male patients without urinary retention or obstruction, external condom catheters carry significantly lower infection risk than indwelling catheters."
  },
  {
    "id": "CAUTI-03",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "مريض حرج يحتاج قياسًا دقيقًا مستمرًا لإدرار البول لاتخاذ قرارات علاجية",
    "prompt": "ما الموقف السريري الصحيح من هذا الداعي لاستخدام القسطرة؟",
    "key": "اقبل الداعي الموثق وراجع استمراره يوميًا.",
    "taskType": "bundle_builder",
    "sceneObject": "accurate_output",
    "options": [
      {
        "id": "opt1",
        "text": "اقبل الداعي الموثق وراجع استمراره يوميًا.",
        "isCorrect": true,
        "textEn": "Document the indication and review daily whether accurate measurement still requires an indwelling catheter."
      },
      {
        "id": "opt2",
        "text": "رفض القسطرة لأن المريض لا يعاني من احتباس بولي حاد.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: المراقبة الدقيقة والمستمرة لإدرار البول في الحالات الحرجة استطباب سريري معتمد ومقبول.",
        "textEn": "Reject catheter placement because the patient does not have acute urinary retention.",
        "rejectionReasonEn": "Rejected: Hemodynamic monitoring in critically ill patients is an approved clinical indication for catheterization."
      },
      {
        "id": "opt3",
        "text": "قبول الداعي وإلغاء مراجعته اليومية طوال فترة إقامة المريض بالعناية.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: المراجعة اليومية المستمرة للداعي شرط إلزامي في حزمة الوقاية لإزالتها فور استقرار المريض.",
        "textEn": "Approve the indication and discontinue daily reviews throughout the ICU stay.",
        "rejectionReasonEn": "Rejected: Daily review of necessity is mandatory; catheters must be removed as soon as hourly measurement is no longer critical."
      }
    ],
    "explanation": "تعتبر المراقبة الدقيقة المستمرة لإدرار البول في المرضى ذوي الحالات الحرجة داعياً معتمداً للقسطرة وفق CDC، مع اشتراط تقييم استمرار هذا الداعي يومياً.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": false,
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "A critically ill adult needs accurate, ongoing urine output measurements to guide treatment.",
    "promptEn": "How should the catheter indication be managed?",
    "keyEn": "Document the indication and review daily whether accurate measurement still requires an indwelling catheter.",
    "explanationEn": "Critically ill patients requiring hourly urine output monitoring have a valid indication; this requirement must be reviewed and re-verified daily."
  },
  {
    "id": "CAUTI-04",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "تأخر التبول بعد العملية ويتوفر ماسح للمثانة",
    "prompt": "ما الخطوة التشخيصية غير الغازية الموصى بها قبل اتخاذ قرار القسطرة؟",
    "key": "قيّم الامتلاء بالماسح وفق البروتوكول قبل قرار القسطرة.",
    "taskType": "bundle_builder",
    "sceneObject": "bladder_scanner",
    "options": [
      {
        "id": "opt1",
        "text": "قيّم الامتلاء بالماسح وفق البروتوكول قبل قرار القسطرة.",
        "isCorrect": true,
        "textEn": "Assess bladder volume with the scanner according to facility protocol."
      },
      {
        "id": "opt2",
        "text": "إدخال قسطرة فولي فوراً بمجرد مرور 6 ساعات دون تبول تلقائي.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: يجب تقييم حجم البول بالموجات فوق الصوتية (Bladder Scan) لتجنب القسطرة غير الضرورية.",
        "textEn": "Insert a Foley catheter immediately once 6 hours elapse without spontaneous voiding.",
        "rejectionReasonEn": "Rejected: Catheterizing based strictly on elapsed time without scanning leads to unnecessary invasive procedures."
      },
      {
        "id": "opt3",
        "text": "الضغط القوي والمتكرر على أسفل البطن لتحفيز المثانة دون فحص.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: إجراء مؤلم قد يسبب رضحاً لأنسجة الحوض دون تأكيد كمية البول المحتبس.",
        "textEn": "Perform vigorous manual suprapubic pressure without ultrasound assessment.",
        "rejectionReasonEn": "Rejected: Forceful manual expression risks bladder trauma and fails to diagnose bladder volume accurately."
      }
    ],
    "explanation": "استخدام ماسح المثانة المحمول بالموجات فوق الصوتية (Bladder ultrasound scanner) يحدد بدقة حجم البول المحتبس ويمنع القسطرة غير المبررة بعد العمليات الجراحية.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": false,
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "After surgery, a patient has yet to void. A bladder scanner is available.",
    "promptEn": "What should the team do before deciding on catheterization?",
    "keyEn": "Assess bladder volume with the scanner according to facility protocol.",
    "explanationEn": "Portable bladder ultrasound non-invasively determines post-void residual urine volume and prevents unnecessary urinary catheterizations."
  },
  {
    "id": "CAUTI-05",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "تجهيز إدخال قسطرة ثابتة في قسم حاد بقفازات نظيفة فقط",
    "prompt": "ما الخطأ في التجهيز وما المتطلب الإلزامي لإدخال القسطرة الثابتة؟",
    "key": "استخدم تقنية معقمة ومعدات وقفازات معقمة.",
    "taskType": "spot_error",
    "sceneObject": "sterile_gloves_tray",
    "options": [
      {
        "id": "opt1",
        "text": "استخدم تقنية معقمة ومعدات وقفازات معقمة.",
        "isCorrect": true,
        "textEn": "Use aseptic insertion technique with sterile gloves and sterile equipment."
      },
      {
        "id": "opt2",
        "text": "المتابعة بالقفازات النظيفة مع وضع هلام مطهر وفير على رأس القسطرة.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: إدخال القسطرة الثابتة في الرعاية الحادة إجراء معقم صارم يتطلب قفازات وستائر ومعدات معقمة.",
        "textEn": "Proceed using clean examination gloves with copious antiseptic lubricant on the catheter tip.",
        "rejectionReasonEn": "Rejected: Clean gloves violate aseptic catheter insertion protocols and introduce periurethral flora into the bladder."
      },
      {
        "id": "opt3",
        "text": "ارتداء زوجين من القفازات النظيفة لزيادة سماكة الحاجز الواقي.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: مضاعفة القفازات النظيفة لا يجعلها معقمة ويعرض المريض للتلوث الجرثومي الصاعد.",
        "textEn": "Don two pairs of clean gloves to create a thicker physical barrier.",
        "rejectionReasonEn": "Rejected: Doubling clean gloves does not create a sterile surgical barrier."
      }
    ],
    "explanation": "تتطلب إرشادات CDC تقنية معقمة صارمة تشمل قفازات معقمة، ومريلة/ستارة معقمة، وهلام مزلق معقم أحادي الاستخدام، ومجموعة تطهير معقمة أثناء إدخال القسطرة البولية الثابتة.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": false,
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "The acute-care team prepares to insert an indwelling urinary catheter with clean examination gloves as the only gloves available.",
    "promptEn": "What setup is required?",
    "keyEn": "Use aseptic insertion technique with sterile gloves and sterile equipment.",
    "explanationEn": "Indwelling urinary catheter placement requires strict aseptic technique using sterile gloves, a sterile drape, and sterile supplies."
  },
  {
    "id": "CAUTI-06",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "مريض يحتاج إلى إدخال قسطرة ويُقترح قطر كبير دون مبرر",
    "prompt": "كيف يتم اختيار قطر أنبوب القسطرة (French size) بصورة صحيحة؟",
    "key": "اختر أصغر قطر يتيح تصريفًا كافيًا.",
    "taskType": "bundle_builder",
    "sceneObject": "catheter_size",
    "options": [
      {
        "id": "opt1",
        "text": "اختر أصغر قطر يتيح تصريفًا كافيًا.",
        "isCorrect": true,
        "textEn": "Choose the smallest bore that permits adequate drainage."
      },
      {
        "id": "opt2",
        "text": "اختيار أكبر قطر متاح لتوسيع مجرى البول وتسريع التدفق.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: القطر الكبير يسبب رضحاً لجدار الإحليل وتشنج المثانة وتآكل المخاطية وزيادة مخاطر العدوى.",
        "textEn": "Select the largest available French size to dilate the urethra and ensure rapid flow.",
        "rejectionReasonEn": "Rejected: Oversized catheters cause pressure necrosis, mucosal ischemia, and urethral strictures."
      },
      {
        "id": "opt3",
        "text": "استخدام قياسات الأطفال لجميع البالغين دون استثناء.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: القطر الصغير جداً قد يلتوي بسهولة أو يعجز عن تصريف البول بكفاءة.",
        "textEn": "Use pediatric catheter sizes for all adult patients without exception.",
        "rejectionReasonEn": "Rejected: Pediatric sizes may collapse or fail to provide adequate drainage in adult patients."
      }
    ],
    "explanation": "يوصى باستخدام أصغر قطر ممكن للقسطرة (عادة 12-14 Fr للبالغين) لتقليل الرضح الميكانيكي للإحليل وعنق المثانة، ما لم توجد حاجة محددة كبيلة دموية خثرية.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": false,
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "A patient requires an indwelling catheter. A larger catheter is suggested without a clinical reason.",
    "promptEn": "What size criterion should guide the selection?",
    "keyEn": "Choose the smallest bore that permits adequate drainage.",
    "explanationEn": "Selecting the smallest effective catheter lumen (typically 12–14 French for adults) prevents urethral and bladder neck trauma."
  },
  {
    "id": "CAUTI-07",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "بعد الإدخال يجرّ وزن الأنبوب القسطرة أثناء الحركة",
    "prompt": "ما الإجراء الأساسي المانع لرضح الإحليل وحركة القسطرة؟",
    "key": "ثبّت القسطرة لمنع الشد والحركة.",
    "taskType": "spot_error",
    "sceneObject": "catheter_securement",
    "options": [
      {
        "id": "opt1",
        "text": "ثبّت القسطرة لمنع الشد والحركة.",
        "isCorrect": true,
        "textEn": "Secure the catheter to limit movement and prevent traction."
      },
      {
        "id": "opt2",
        "text": "شد الأنبوب وتثبيته مباشرة بحاجز السرير الجانبي المتحرك.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: حركة حاجز السرير ستسحب القسطرة بقوة وتحدث تمزقاً في الإحليل وعنق المثانة.",
        "textEn": "Pull the drainage tubing taut and tape it directly to the movable bed side rail.",
        "rejectionReasonEn": "Rejected: Attaching tubing to movable bed rails causes traumatic avulsion when the rail is raised or lowered."
      },
      {
        "id": "opt3",
        "text": "ترك الأنبوب حراً دون تثبيت بحجة عدم تقييد حركة فخذ المريض.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: غياب التثبيت يؤدي لحركة ميكانيكية متكررة (Pistoning) تنقل بكتيريا الجلد لداخل المثانة.",
        "textEn": "Leave the catheter loose without stabilization to allow full leg mobility.",
        "rejectionReasonEn": "Rejected: Unsecured catheters move back and forth, drawing perineal microorganisms into the urethra."
      }
    ],
    "explanation": "يجب تثبيت القسطرة البولية بجهاز تثبيت معتمد (Catheter securement device) على فخذ المريض لمنع الشد والتحرك وحماية الإحليل من الرضح الميكانيكي.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": false,
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "During repositioning, the weight of the drainage tubing pulls on the catheter.",
    "promptEn": "What should be corrected?",
    "keyEn": "Secure the catheter to limit movement and prevent traction.",
    "explanationEn": "Securing the catheter to the patient's thigh prevents catheter movement, traction on the bladder neck, and accidental dislodgement."
  },
  {
    "id": "CAUTI-08",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "بعد نقل السرير بقي الكيس فوق المثانة",
    "prompt": "ما الخطأ الملاحظ وما الإجراء التصحيحي الفوري لمنع ارتداد البول؟",
    "key": "اخفض الكيس تحت مستوى المثانة.",
    "taskType": "spot_error",
    "sceneObject": "bag_height",
    "multiStep": true,
    "stepId": "lower_bag",
    "options": [
      {
        "id": "opt1",
        "text": "اخفض الكيس تحت مستوى المثانة.",
        "isCorrect": true,
        "textEn": "Rehang the bag below bladder level."
      },
      {
        "id": "opt2",
        "text": "وضع الكيس على بطن المريض أو بين فخذيه أثناء النقل.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: وضع الكيس فوق مستوى المثانة يسبب ارتداد البول الراكد والمستعمر بالجراثيم للمثانة مباشرة.",
        "textEn": "Place the drainage bag on the patient's abdomen or between their thighs during transfer.",
        "rejectionReasonEn": "Rejected: Placing the bag above bladder level allows urine to flow backward into the bladder, initiating CAUTI."
      },
      {
        "id": "opt3",
        "text": "إغلاق الأنبوب بملقط طبي محكم وترك الكيس بالأعلى.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: ملقطة الأنبوب تسبب ركود البول والضغط الراجع داخل المثانة وتزيد مخاطر تجرثم الدم.",
        "textEn": "Clamp the drainage tubing tightly with medical forceps and leave the bag elevated.",
        "rejectionReasonEn": "Rejected: Clamping creates urinary stasis and does not prevent reflux if the clamp leaks."
      }
    ],
    "explanation": "الحفاظ على كيس تصريف البول تحت مستوى المثانة دائماً (دون ملامسة الأرض) يضمن التصريف الحر بفعل الجاذبية ويمنع ارتداد البول الملوث إلى الجهاز البولي العلوي.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": false,
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "After a bed transfer, you find the drainage bag hanging above the patient’s bladder.",
    "promptEn": "Where should it be positioned?",
    "keyEn": "Rehang the bag below bladder level.",
    "explanationEn": "Urinary drainage bags must remain continuously below the level of the bladder to prevent retrograde backflow of contaminated urine."
  },
  {
    "id": "CAUTI-09",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "الكيس بالارتفاع المناسب لكنه يلامس الأرض",
    "prompt": "كيف يتم تصحيح موضع الكيس لمنع التلوث البيئي لصنبور التصريف؟",
    "key": "علّقه تحت مستوى المثانة وبعيدًا عن الأرض.",
    "taskType": "spot_error",
    "sceneObject": "bag_on_floor",
    "options": [
      {
        "id": "opt1",
        "text": "علّقه تحت مستوى المثانة وبعيدًا عن الأرض.",
        "isCorrect": true,
        "textEn": "Keep the bag below bladder level and suspend it clear of the floor."
      },
      {
        "id": "opt2",
        "text": "وضع منشفة ورقية تحت الكيس وتركه مستقراً على أرضية الغرفة.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: أرضية المستشفى مستعمرة بكائنات متعددة المقاومة وتلوث صنبور التصريف حتمي.",
        "textEn": "Rest the drainage bag directly on the floor as long as a protective paper sheet is placed underneath.",
        "rejectionReasonEn": "Rejected: Floor contact contaminates the drainage spigot and collection system."
      },
      {
        "id": "opt3",
        "text": "رفع الكيس وتعليقه في القائم الوريدي فوق السرير.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: رفعه فوق مستوى السرير يعكس انحدار البول ويسبب ارتداده إلى المثانة.",
        "textEn": "Hang the drainage bag from the IV pole above the patient's head.",
        "rejectionReasonEn": "Rejected: Positioning the bag above the patient produces immediate retrograde urine reflux."
      }
    ],
    "explanation": "يجب تعليق كيس التجميع في إطار السرير الثابت بحيث يكون تحت مستوى المثانة وبنفس الوقت بعيداً عن ملامسة الأرض لمنع تلوث فتحة الصنبور بالجراثيم المستوطنة.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": false,
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "The drainage bag hangs below the bladder but touches the floor.",
    "promptEn": "How should the setup be adjusted?",
    "keyEn": "Keep the bag below bladder level and suspend it clear of the floor.",
    "explanationEn": "Drainage bags must be suspended below bladder level and clear of the floor to prevent floor microorganisms from contaminating the outlet spigot."
  },
  {
    "id": "CAUTI-10",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "كيس منخفض ولا يصل إليه البول والأنبوب مطوي تحت الفخذ",
    "prompt": "ما الإجراء الصحيح لاستعادة التدفق الحر للبول؟",
    "key": "أزل الانثناء وأعد تقييم التدفق.",
    "taskType": "spot_error",
    "sceneObject": "tubing_kink",
    "multiStep": true,
    "stepId": "untwist_kink",
    "options": [
      {
        "id": "opt1",
        "text": "أزل الانثناء وأعد تقييم التدفق.",
        "isCorrect": true,
        "textEn": "Release the kink and reassess urine flow."
      },
      {
        "id": "opt2",
        "text": "حقن 50 مل من محلول ملحي لدفع الانسداد دون تحريك الأنبوب.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: يخرق النظام المغلق ويدخل جراثيم للمثانة دون داعٍ، بينما السبب انثناء ميكانيكي بسيط.",
        "textEn": "Flush the catheter lumen with 50 mL sterile normal saline without checking the tubing.",
        "rejectionReasonEn": "Rejected: Bladder irrigation should not be attempted before clearing visible external physical kinks."
      },
      {
        "id": "opt3",
        "text": "إزالة القسطرة فوراً وافتراض انسدادها بالرواسب.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: فحص وتعديل مسار الأنبوب وإزالة الانثناء خطوة أولى غير غازية تحل المشكلة فوراً.",
        "textEn": "Remove the catheter immediately and perform an urgent re-catheterization.",
        "rejectionReasonEn": "Rejected: Re-catheterization is invasive and unnecessary when clearing a simple external loop restores flow."
      }
    ],
    "explanation": "التأكد من خلو أنبوب التجميع من أي التواءات أو انثناءات (Kinks/Loops) وتحريره من تحت جسم المريض يضمن استمرار التدفق الحر غير المعاق للبول.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": false,
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "The drainage bag is below the bladder, but urine is no longer reaching it. You find a kink where the tubing passes under the patient’s thigh.",
    "promptEn": "What should you do first?",
    "keyEn": "Release the kink and reassess urine flow.",
    "explanationEn": "Kinks or loops in drainage tubing create mechanical obstruction, urine stasis, and bacterial proliferation; unkink tubing immediately."
  },
  {
    "id": "CAUTI-11",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "انفصلت القسطرة عن أنبوب التجميع دون قصد",
    "prompt": "ما التدخل الواجب تنفيذه فور حدوث انقطاع في النظام المغلق؟",
    "key": "استبدل القسطرة ونظام التجميع بتقنية معقمة.",
    "taskType": "bundle_builder",
    "sceneObject": "closed_system_breach",
    "options": [
      {
        "id": "opt1",
        "text": "استبدل القسطرة ونظام التجميع بتقنية معقمة.",
        "isCorrect": true,
        "textEn": "Replace the catheter and collection system using aseptic technique and sterile equipment."
      },
      {
        "id": "opt2",
        "text": "مسح طرفي الوصلة المنفصلة بمسحة كحولية وإعادة التوصيل.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: انقطاع النظام المغلق يعرض مجرى القسطرة لتلوث بكتيري فوري يستلزم استبدال المنظومة كاملة.",
        "textEn": "Disinfect both disconnected ends with 70% alcohol and snap them back together.",
        "rejectionReasonEn": "Rejected: Disconnected junctions cannot be reliably sterilized; reconnecting them introduces pathogens directly into the closed system."
      },
      {
        "id": "opt3",
        "text": "غسل الأطراف بمحلول ملحي معقم وتثبيتها بشريط لاصق.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: لا يضمن العقامة ويخرق معيار الحفاظ على نظام تصريف مغلق مستمر.",
        "textEn": "Rinse the open connector under sterile water and reattach it.",
        "rejectionReasonEn": "Rejected: Sterile water rinse does not eliminate bacterial contamination."
      }
    ],
    "explanation": "توصي إرشادات CDC باستبدال القسطرة ونظام التجميع بالكامل بتقنية معقمة عند حدوث خرق أو انقطاع غير مقصود في النظام المغلق (Closed drainage system breach).",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": false,
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "During care, the catheter inadvertently disconnects from the collection tubing.",
    "promptEn": "What should happen to the drainage system?",
    "keyEn": "Replace the catheter and collection system using aseptic technique and sterile equipment.",
    "explanationEn": "If an indwelling urinary catheter system becomes disconnected, replace the catheter and drainage system using aseptic technique and sterile equipment."
  },
  {
    "id": "CAUTI-12",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "تسرّب البول من وصلة متصدّعة",
    "prompt": "كيف يُعالج الخلل الميكانيكي في وصلة نظام التجميع؟",
    "key": "استبدل القسطرة ونظام التجميع المعطوب بتقنية معقمة.",
    "taskType": "spot_error",
    "sceneObject": "cracked_junction",
    "options": [
      {
        "id": "opt1",
        "text": "استبدل القسطرة ونظام التجميع المعطوب بتقنية معقمة.",
        "isCorrect": true,
        "textEn": "Replace the catheter and damaged collection system using aseptic technique and sterile equipment."
      },
      {
        "id": "opt2",
        "text": "لف شريط لاصق طبي مانع للتسرب حول الشق المتصدع.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الشق يسمح بدخول البكتيريا باستمرار واللاصق يشكل مستودعاً رطباً للميكروبات.",
        "textEn": "Wrap medical waterproof tape tightly around the crack to stop the leak.",
        "rejectionReasonEn": "Rejected: Taping a cracked junction traps bacteria and fails to restore closed sterile integrity."
      },
      {
        "id": "opt3",
        "text": "تصغير قطر القسطرة لوقف تسرب السائل من الوصلة.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الخلل في سلامة النظام المغلق وليس في قياس القسطرة.",
        "textEn": "Apply surgical cyanoacrylate glue over the cracked plastic.",
        "rejectionReasonEn": "Rejected: Chemical glues degrade medical plastic and cannot re-establish sterile closed drainage."
      }
    ],
    "explanation": "أي تصدع أو تسرب في وصلات نظام التصريف يمثل خرقاً للنظام المغلق ويستوجب استبدال المنظومة المعطوبة بالكامل لمنع غزو الجراثيم الصاعد.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": false,
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "Urine is leaking from a cracked connector between the catheter and collection tubing.",
    "promptEn": "What should the nurse do?",
    "keyEn": "Replace the catheter and damaged collection system using aseptic technique and sterile equipment.",
    "explanationEn": "A cracked or leaking connector breaches the closed sterile drainage system and mandates replacement of the catheter and collection set."
  },
  {
    "id": "CAUTI-13",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "طُلبت مزرعة بول والكيس يحتوي بولًا متجمعًا",
    "prompt": "من أين يتم سحب عينة البول لضمان دقة نتيجة المزرعة؟",
    "key": "خذ العينة معقمًا من منفذ أخذ العينات بعد تطهيره.",
    "taskType": "bundle_builder",
    "sceneObject": "aspiration_port",
    "options": [
      {
        "id": "opt1",
        "text": "خذ العينة معقمًا من منفذ أخذ العينات بعد تطهيره.",
        "isCorrect": true,
        "textEn": "Disinfect the sampling port and obtain a fresh specimen aseptically through it."
      },
      {
        "id": "opt2",
        "text": "فتح صنبور كيس التجميع وأخذ عينة من البول المتجمع منذ ساعات.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: بول كيس التجميع مستعمر بالبكتيريا الراكدة ولا يمثل الحالة الميكروبية الحقيقية للمثانة.",
        "textEn": "Open the bottom drainage spigot and collect urine from the drainage bag.",
        "rejectionReasonEn": "Rejected: Urine in the drainage bag is colonized with environmental bacteria and does not reflect active bladder culture."
      },
      {
        "id": "opt3",
        "text": "فصل القسطرة عن أنبوب التجميع وتفريغ قطرات البول في الأنبوب المخبري.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: خرق مدمر للنظام المغلق يعرض المريض للعدوى دون مبرر.",
        "textEn": "Disconnect the catheter from the drainage tubing and let urine drip directly into the cup.",
        "rejectionReasonEn": "Rejected: Disconnecting the closed drainage system breaks sterility and significantly increases CAUTI risk."
      }
    ],
    "explanation": "تُسحب عينات البول للتحليل والمزرعة باستخدام محقنة معقمة من منفذ أخذ العينات المخصص (Needleless sampling port) بعد فركه بالمطهر وتركه يجف.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": false,
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "A urine culture is ordered for a patient with an indwelling catheter. Urine is present in the drainage bag.",
    "promptEn": "Where and how should the sample be obtained?",
    "keyEn": "Disinfect the sampling port and obtain a fresh specimen aseptically through it.",
    "explanationEn": "Aspirate urine specimens aseptically through the needleless sampling port after disinfecting with alcohol; never sample from the drainage bag."
  },
  {
    "id": "CAUTI-14",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "يُستخدم وعاء التفريغ نفسه لمريضين",
    "prompt": "ما الممارسة القياسية الصحيحة لأوعية تفريغ أكياس البول؟",
    "key": "خصّص وعاءً نظيفًا منفصلًا لكل مريض.",
    "taskType": "spot_error",
    "sceneObject": "drainage_jug",
    "options": [
      {
        "id": "opt1",
        "text": "خصّص وعاءً نظيفًا منفصلًا لكل مريض.",
        "isCorrect": true,
        "textEn": "Provide a separate clean emptying container for each patient."
      },
      {
        "id": "opt2",
        "text": "شطف الوعاء بالماء الساخن واستخدامه فوراً للمريض الثاني.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الشطف بالماء لا يقضي على الجراثيم المقاومة وينقل العدوى المتبادلة بين المرضى.",
        "textEn": "Empty multiple patients' bags into one shared container provided the spigot does not touch it.",
        "rejectionReasonEn": "Rejected: Sharing emptying containers between patients is a primary vector for multidrug-resistant organism transmission."
      },
      {
        "id": "opt3",
        "text": "تفريغ الكيس مباشرة في سلة النفايات العامة بالغرفة.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: مخالفة لمعايير التخلص من السوائل البيولوجية وسلامة بيئة الرعاية الصحية.",
        "textEn": "Empty the bag directly into the patient's bedside handwashing sink.",
        "rejectionReasonEn": "Rejected: Disposing urine into clinical sinks disseminates aerosolized pathogens and violates infection control standards."
      }
    ],
    "explanation": "يجب تخصيص وعاء قياس وتفريغ نظيف وخاص بكل مريض (Dedicated container)، مع ترقيمه باسمه وتنظيفه وتطهيره دورياً لمنع انتقال العدوى المتقاطعة.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": false,
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "On rounds, you see the same emptying container being used for the drainage bags of two patients.",
    "promptEn": "What should change?",
    "keyEn": "Provide a separate clean emptying container for each patient.",
    "explanationEn": "Each patient must have an individual, dedicated, clean collection container for emptying urine to prevent cross-contamination."
  },
  {
    "id": "CAUTI-15",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "أثناء التفريغ لامس صنبور الكيس وعاء التجميع",
    "prompt": "ما الخطوة الإلزامية لمنع تلوث صنبور تفريغ الكيس؟",
    "key": "امنع التلامس وطبّق إجراء التعامل مع التلوث المعتمد.",
    "taskType": "spot_error",
    "sceneObject": "drain_spout",
    "options": [
      {
        "id": "opt1",
        "text": "امنع التلامس وطبّق إجراء التعامل مع التلوث المعتمد.",
        "isCorrect": true,
        "textEn": "Prevent further contact and follow the facility’s procedure for managing the contamination."
      },
      {
        "id": "opt2",
        "text": "تجاهل اللمس طالما أن وعاء التجميع يبدو نظيفاً من الداخل.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: التلامس ينقل ميكروبات سطح الوعاء إلى فتحة الصنبور لتصعد إلى كيس البول ثم المثانة.",
        "textEn": "Rest the spigot inside the rim of the graduated cylinder to stabilize the urine stream.",
        "rejectionReasonEn": "Rejected: Touching the non-sterile container rim inoculates the drain spigot with bacteria that ascend into the bag."
      },
      {
        "id": "opt3",
        "text": "غسل الصنبور تحت ماء الصنبور الجاري في المغسلة.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: ماء الصنبور غير معقم ويحوي بكتيريا بيئية كالمفطورات والزوائف (Pseudomonas).",
        "textEn": "Leave the drain spigot open continuously over a basin to eliminate bag emptying.",
        "rejectionReasonEn": "Rejected: An open spigot destroys the closed drainage system and invites ascending infection."
      }
    ],
    "explanation": "يجب منع تلامس صنبور التصريف غير المعقم مع وعاء الجمع مطلقاً أثناء التفريغ؛ وإذا حدث تلامس غير مقصود، يُطهر الصنبور بمسحة كحولية 70% قبل إغلاقه.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": false,
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "While the bag is being emptied, the drain spigot touches the receiving container.",
    "promptEn": "What should the nurse do?",
    "keyEn": "Prevent further contact and follow the facility’s procedure for managing the contamination.",
    "explanationEn": "Maintain aseptic discipline during bag emptying; avoid contact between the drainage spigot and the non-sterile collection receptacle."
  },
  {
    "id": "CAUTI-16",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "تنظيف يومي لمريض يحمل قسطرة ويُقترح مطهّر قوي حول الصماخ",
    "prompt": "ما المستحضر الموصى به للعناية اليومية بمنطقة الصماخ البولي؟",
    "key": "تكفي النظافة الاعتيادية أثناء الاستحمام اليومي.",
    "taskType": "bundle_builder",
    "sceneObject": "meatal_cleansing",
    "options": [
      {
        "id": "opt1",
        "text": "تكفي النظافة الاعتيادية أثناء الاستحمام اليومي.",
        "isCorrect": true,
        "textEn": "Provide routine hygiene during daily bathing. Routine antiseptic cleansing for CAUTI prevention is unnecessary."
      },
      {
        "id": "opt2",
        "text": "تطهير الصماخ بمحلول بوفيدون اليود أو الكلورهيكسيدين المركز في كل وردية.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: المطهرات القوية تسبب تهيجاً وتخريشاً مخاطياً ولا تقلل حدوث CAUTI وفق CDC.",
        "textEn": "Cleanse the urethral meatus every 4 hours with povidone-iodine antiseptic solution.",
        "rejectionReasonEn": "Rejected: Routine antiseptic meatal cleansing causes mucosal irritation without reducing CAUTI rates."
      },
      {
        "id": "opt3",
        "text": "وضع مرهم مضاد حيوي موضعي حول فتحة الإحليل يومياً.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: يؤدي لنمو الفطريات وتطور سلالات بكتيرية مقاومة دون أي فائدة وقائية.",
        "textEn": "Apply antibiotic ointment around the urethral meatus twice daily.",
        "rejectionReasonEn": "Rejected: Topical antimicrobial ointments irritate mucous membranes and select for resistant pathogens."
      }
    ],
    "explanation": "توصي إرشادات CDC بالنظافة الاعتيادية لمنطقة العجان بالماء والصابون المعتدل أثناء الاستحمام اليومي، وتؤكد عدم جدوى استخدام المطهرات القوية حول الصماخ البولي.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": false,
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "During daily bathing, a staff member suggests using an antiseptic around the urethral meatus to prevent CAUTI.",
    "promptEn": "What care is appropriate?",
    "keyEn": "Provide routine hygiene during daily bathing. Routine antiseptic cleansing for CAUTI prevention is unnecessary.",
    "explanationEn": "Routine daily meatal cleansing should be performed with regular soap and water during routine bathing; antiseptic meatal washes are not recommended."
  },
  {
    "id": "CAUTI-17",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "قسطرة تعمل جيدًا وتُطلب جدولة تبديلها كل أسبوع دون داعٍ",
    "prompt": "ما المعيار المعتمد لتحديد موعد استبدال القسطرة الثابتة؟",
    "key": "اجعل الاستبدال مبنيًا على استطباب سريري.",
    "taskType": "bundle_builder",
    "sceneObject": "cauti_replacement",
    "options": [
      {
        "id": "opt1",
        "text": "اجعل الاستبدال مبنيًا على استطباب سريري.",
        "isCorrect": true,
        "textEn": "Use clinical indications such as obstruction or a compromised closed system to guide replacement."
      },
      {
        "id": "opt2",
        "text": "الموافقة على الاستبدال الأسبوعي لمنع ترسب الأملاح والبيوفيلم.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الاستبدال المجدول الروتيني يرفع خطر الرضح والعدوى ولا ينصح به.",
        "textEn": "Replace the catheter routinely every 7 days to eliminate bacterial biofilm.",
        "rejectionReasonEn": "Rejected: Scheduled arbitrary catheter replacement increases mechanical trauma and introduces new infections."
      },
      {
        "id": "opt3",
        "text": "تبديل القسطرة شهرياً في موعد ثابت بغض النظر عن كفاءة التصريف.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: لا يوجد جدول زمني روتيني ثابت؛ الاستبدال يكون عند الانسداد أو التسرب أو الخلل السريري.",
        "textEn": "Replace the catheter on a fixed monthly calendar date regardless of function.",
        "rejectionReasonEn": "Rejected: Fixed replacement intervals are not supported by CDC guidelines."
      }
    ],
    "explanation": "لا يوصى باستبدال القساطر البولية أو أكياس التجميع على فترات زمنية ثابتة ومجدولة روتينياً؛ يتم الاستبدال بناءً على مؤشرات سريرية كالانسداد أو الخلل الميكانيكي أو التلوث.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": false,
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "An indwelling catheter is functioning normally. A weekly exchange is requested without a clinical indication.",
    "promptEn": "What should guide replacement?",
    "keyEn": "Use clinical indications such as obstruction or a compromised closed system to guide replacement.",
    "explanationEn": "Indwelling catheters should not be replaced routinely at fixed arbitrary intervals; replace only for specific clinical indications (obstruction, infection, breach)."
  },
  {
    "id": "CAUTI-18",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "يُقترح غسل المثانة بمضاد ميكروبي للوقاية فقط",
    "prompt": "ما التوصية العلمية بشأن غسل المثانة الروتيني بمحاليل المضادات الحيوية؟",
    "key": "تجنّب الغسل الروتيني بالمضادات.",
    "taskType": "bundle_builder",
    "sceneObject": "bladder_irrigation",
    "options": [
      {
        "id": "opt1",
        "text": "تجنّب الغسل الروتيني بالمضادات.",
        "isCorrect": true,
        "textEn": "Avoid routine antimicrobial bladder irrigation for prevention."
      },
      {
        "id": "opt2",
        "text": "غسل المثانة يومياً بمحلول نيومايسين لتعقيم تجويف المثانة.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: يخرق النظام المغلق ويزيد المقاومة الميكروبية ورضح بطانة المثانة ولا يمنع العدوى.",
        "textEn": "Irrigate the bladder daily with neomycin solution to sterilize the lumen.",
        "rejectionReasonEn": "Rejected: Antimicrobial bladder irrigation is ineffective for prevention and fosters resistant organisms."
      },
      {
        "id": "opt3",
        "text": "الغسل المستمر بمحلول ملحي معقم لجميع المرضى الخاضعين للقسطرة.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: لا يمنع CAUTI ويزيد خطورة إدخال البكتيريا للنظام البولي.",
        "textEn": "Maintain continuous normal saline irrigation for all catheterized inpatients.",
        "rejectionReasonEn": "Rejected: Continuous irrigation breaches the closed system and offers no benefit unless gross hematuria with clots is present."
      }
    ],
    "explanation": "توصي إرشادات CDC بعدم إجراء غسيل روتيني للمثانة (Routine bladder irrigation) بمحاليل مضادة للميكروبات للوقاية من CAUTI.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": false,
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "A clinician proposes bladder irrigation with an antimicrobial solely to prevent CAUTI.",
    "promptEn": "How should the team respond?",
    "keyEn": "Avoid routine antimicrobial bladder irrigation for prevention.",
    "explanationEn": "Routine continuous or intermittent bladder irrigation with antimicrobials is not recommended for CAUTI prevention and promotes resistant flora."
  },
  {
    "id": "CAUTI-19",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "اليوم الأول بعد جراحة وانتهى داعي القسطرة",
    "prompt": "ما التوقيت الأمثل لإزالة القسطرة بعد الجراحة عند انتفاء الداعي؟",
    "key": "أزلها بأسرع ما يمكن، ويفضل خلال 24 ساعة بعد العملية عند انتفاء الداعي.",
    "taskType": "bundle_builder",
    "sceneObject": "postop_removal",
    "options": [
      {
        "id": "opt1",
        "text": "أزلها بأسرع ما يمكن، ويفضل خلال 24 ساعة بعد العملية عند انتفاء الداعي.",
        "isCorrect": true,
        "textEn": "Remove it promptly, preferably within 24 hours after surgery when no indication remains."
      },
      {
        "id": "opt2",
        "text": "إبقاء القسطرة حتى موعد خروج المريض من المستشفى تجنباً لجهده في المشي.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: إطالة مدة القسطرة بعد الجراحة هو العامل الحاسم في حدوث عدوى CAUTI.",
        "textEn": "Keep the catheter in place until hospital discharge to prevent patient mobility exertion.",
        "rejectionReasonEn": "Rejected: Prolonged catheterization solely to avoid walking delays mobilization and increases CAUTI risk."
      },
      {
        "id": "opt3",
        "text": "انتظار مرور 72 ساعة كإجراء احترازي عام.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: كل يوم إضافي بعد 24 ساعة يضاعف خطر إصابة المريض بالعدوى بنسبة 3-7%.",
        "textEn": "Wait a mandatory 72 hours postoperatively as a routine precaution before removal.",
        "rejectionReasonEn": "Rejected: Routine arbitrary waiting periods prolong exposure to catheter-associated complications."
      }
    ],
    "explanation": "توصي إرشادات CDC والجراحة الآمنة بإزالة القسطرة البولية بعد العمليات الجراحية بأسرع وقت ممكن، ويفضل في غضون 24 ساعة ما لم يكن هناك داعٍ جراحي موثق.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": false,
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "It is the first postoperative day, and the reason for the urinary catheter has resolved.",
    "promptEn": "What should happen next?",
    "keyEn": "Remove it promptly, preferably within 24 hours after surgery when no indication remains.",
    "explanationEn": "Postoperative catheters should be removed as soon as clinically possible, ideally within 24 hours after surgery unless an ongoing indication exists."
  },
  {
    "id": "CAUTI-20",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "يُطلب إغلاق القسطرة عدة ساعات لتدريب المثانة قبل إزالتها",
    "prompt": "ما الموقف العلمي من إغلاق القسطرة التحضيري (Clamping) قبل الإزالة؟",
    "key": "أزلها حسب البروتوكول؛ الإغلاق التحضيري الروتيني غير ضروري.",
    "taskType": "bundle_builder",
    "sceneObject": "clamping_myth",
    "options": [
      {
        "id": "opt1",
        "text": "أزلها حسب البروتوكول؛ الإغلاق التحضيري الروتيني غير ضروري.",
        "isCorrect": true,
        "textEn": "Follow the removal protocol. Routine pre-removal clamping is unnecessary."
      },
      {
        "id": "opt2",
        "text": "ملقطة القسطرة لمدة 4 ساعات ثم فكها ثم إزالتها لإعادة تدريب المثانة.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: أثبتت الدراسات أن ملقطة القسطرة لا تسرع استعادة وظيفة المثانة وتسبب ركود البول وتكاثر البكتيريا.",
        "textEn": "Clamp the catheter for 4 hours, release for 30 minutes, then remove to retrain the detrusor.",
        "rejectionReasonEn": "Rejected: Pre-removal clamping causes painful bladder overdistention without clinical benefit."
      },
      {
        "id": "opt3",
        "text": "حقن هواء بالمثانة لتوسيعها قبل سحب البالون.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: ممارسة خطيرة تسبب ألماً شديداً ومضاعفات وتزيد خطر العدوى.",
        "textEn": "Instill air into the bladder to expand the cavity prior to balloon deflation.",
        "rejectionReasonEn": "Rejected: Injecting air into the bladder causes air embolism and severe mucosal damage."
      }
    ],
    "explanation": "توصي إرشادات CDC بعدم اللجوء إلى إغلاق أو ملقطة القسطرة روتينياً قبل إزالتها؛ لا فائدة سريرية مثبتة منها وتسبب ركود البول والضغط داخل المثانة.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": false,
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "Before planned removal, a team member suggests clamping the catheter for several hours to train the bladder.",
    "promptEn": "What is the appropriate plan?",
    "keyEn": "Follow the removal protocol. Routine pre-removal clamping is unnecessary.",
    "explanationEn": "Clamping indwelling catheters prior to removal to 'train' the bladder is unnecessary, prolongs catheterization, and does not improve voiding outcomes."
  },
  {
    "id": "CAUTI-21",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "[تدقيق] الكيس منخفض لكن الأنبوب ما زال ملتويًا بعد التصحيح",
    "prompt": "ما التقييم التدقيقي لحالة الصيانة عند بقاء التواء الأنبوب؟",
    "key": "تصحيح جزئي؛ حرّر الأنبوب قبل اعتبار التصريف سليمًا.",
    "taskType": "record_audit",
    "auditType": "partial_correction",
    "options": [
      {
        "id": "opt1",
        "text": "تصحيح جزئي؛ حرّر الأنبوب قبل اعتبار التصريف سليمًا.",
        "isCorrect": true,
        "textEn": "Credit bag position. Clear the kink and reassess flow before marking drainage complete. If both corrections are presented together, accept either order."
      },
      {
        "id": "opt2",
        "text": "تسجيل البند مكتملاً بنجاح لأن الكيس في موضع منخفض صحيح.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: استمرار التواء الأنبوب يعيق التدفق الحر ويمنع اعتبار حزمة الصيانة مكتملة.",
        "textEn": "Score the item as fully compliant because the collection bag is now in a low position.",
        "rejectionReasonEn": "Rejected: Tubing obstruction remains; full compliance requires unkinked, unobstructed downhill drainage."
      },
      {
        "id": "opt3",
        "text": "تسجيل استثناء طبي لوجود الالتواء.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: التواء الأنبوب عيب ميكانيكي يستوجب التعديل الفوري وليس استثناءً طبياً.",
        "textEn": "Record a medical exemption for the presence of the tubing kink.",
        "rejectionReasonEn": "Rejected: Tubing kinks are preventable procedural errors, not allowable clinical medical exemptions."
      }
    ],
    "explanation": "تتطلب حزمة الصيانة استيفاء جميع الشروط المترابطة معاً: كيس منخفض + أنبوب غير ملتوي + نظام مغلق؛ التصحيح الجزئي لا يمنح اكتمال الحزمة حتى تحرير الأنبوب.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": true,
    "auditAnswer": "لم يتم",
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "You observed both a bag above bladder level and a kink in the tubing. The bag has since been lowered, but the tubing is still kinked.",
    "promptEn": "How should the correction be scored, and what remains?",
    "keyEn": "Credit bag position. Clear the kink and reassess flow before marking drainage complete. If both corrections are presented together, accept either order.",
    "explanationEn": "When multiple issues are found, credit the completed correction (bag lowered) and clear the kink before marking drainage complete."
  },
  {
    "id": "CAUTI-22",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "[تدقيق] رُصدت إزالة القسطرة فور زوال الداعي لكن سجل الأمس يخلو من مراجعة الحاجة",
    "prompt": "كيف يُفصل التقييم التدقيقي لإجراء اليوم عن نقص توثيق الأمس؟",
    "key": "الإزالة اليوم موثقة، ومراجعة الأمس غير مؤكدة.",
    "taskType": "record_audit",
    "auditType": "documentation_vs_action",
    "options": [
      {
        "id": "opt1",
        "text": "الإزالة اليوم موثقة، ومراجعة الأمس غير مؤكدة.",
        "isCorrect": true,
        "textEn": "Mark today’s removal Done and yesterday’s review Not documented."
      },
      {
        "id": "opt2",
        "text": "إلغاء احتساب إزالة اليوم بسبب الفجوة التوثيقية ليوم أمس.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: إزالة القسطرة اليوم إجراء إيجابي مثبت، ويجب تقييم كل فرصة يومية بصورة مستقلة.",
        "textEn": "Cancel today's removal credit because of yesterday's documentation gap.",
        "rejectionReasonEn": "Rejected: Documentation gaps in prior shifts do not invalidate verified proper clinical care performed today."
      },
      {
        "id": "opt3",
        "text": "تعديل سجل الأمس بأثر رجعي لإخفاء النقص التوثيقي.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: تزوير لسجلات الرعاية الطبية ومخالفة لأخلاقيات المهنة.",
        "textEn": "Retroactively alter yesterday's chart to insert a fabricated review note.",
        "rejectionReasonEn": "Rejected: Falsifying historical medical records violates clinical ethics and legal regulations."
      }
    ],
    "explanation": "في منهجية التدقيق السريري، يُسجل إنجاز اليوم كفرصة مستوفاة، وتُسجل فجوة التوثيق السابقة كفرصة غير مؤكدة بشكل منفصل دون دمج أو خلط.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": true,
    "auditAnswer": "غير موثّق",
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "You observe prompt catheter removal today after the indication resolves. Yesterday’s chart has no record of a necessity review.",
    "promptEn": "How should the two items be scored?",
    "keyEn": "Mark today’s removal Done and yesterday’s review Not documented.",
    "explanationEn": "Score observed timely removal today as Done; classify yesterday's missing necessity review as Not Documented."
  },
  {
    "id": "CAUTI-23",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "[تدقيق] أظهر الفحص نظامًا مغلقًا وكيسًا منخفضًا لكن القسطرة مستمرة للتسهيل فقط",
    "prompt": "ما تقييم اكتمال الحزمة عند غياب الداعي السريري المبرر؟",
    "key": "الحزمة غير مكتملة؛ راجع الإزالة.",
    "taskType": "record_audit",
    "auditType": "indication_check",
    "options": [
      {
        "id": "opt1",
        "text": "الحزمة غير مكتملة؛ راجع الإزالة.",
        "isCorrect": true,
        "textEn": "Incomplete. Reassess the indication and coordinate removal if there is no clinical need."
      },
      {
        "id": "opt2",
        "text": "الحزمة مكتملة تماماً لأن جميع عناصر العناية المادية سليمة.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: وجود داعٍ سريري صالح ومبرر هو الشرط الإلزامي الأول لاكتمال الحزمة.",
        "textEn": "Score the bundle as 100% complete because all physical maintenance steps are intact.",
        "rejectionReasonEn": "Rejected: Daily justification of clinical indication is the core element of the CAUTI bundle; lacking an indication makes the bundle incomplete."
      },
      {
        "id": "opt3",
        "text": "اعتبار تسهيل رعاية المريض مبرراً طبياً كافياً.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: راحة التمريض أو رعاية المريض دون احتباس ليست استطباباً معتمداً.",
        "textEn": "Consider easing nursing workload as a valid clinical medical indication.",
        "rejectionReasonEn": "Rejected: Staff convenience does not constitute a valid clinical indication for invasive catheterization."
      }
    ],
    "explanation": "انتفاء الداعي السريري المعتمد يبطل اكتمال حزمة الصيانة حتى لو كانت جميع الإجراءات الفيزيائية (النظام المغلق والكيس المنخفض) مطبقة بدقة.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": true,
    "auditAnswer": "لم يتم",
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "The drainage system is closed and the bag is below the bladder. The team confirms the catheter remains solely for staff convenience.",
    "promptEn": "Is the bundle complete?",
    "keyEn": "Incomplete. Reassess the indication and coordinate removal if there is no clinical need.",
    "explanationEn": "A catheter maintained without an approved clinical indication fails bundle criteria; convenience alone is an invalid indication."
  },
  {
    "id": "CAUTI-24",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "[تدقيق] قائمة القسم تضم مريضًا يستخدم وعاء تبول ولا يحمل قسطرة ثابتة",
    "prompt": "كيف يُعامل هذا المريض في مقام تدقيق صيانة القسطرة البولية الثابتة؟",
    "key": "استبعده من مقام تدقيق صيانة القسطرة الثابتة.",
    "taskType": "record_audit",
    "auditType": "denominator_exclusion",
    "options": [
      {
        "id": "opt1",
        "text": "استبعده من مقام تدقيق صيانة القسطرة الثابتة.",
        "isCorrect": true,
        "textEn": "Exclude the record from the indwelling-catheter maintenance denominator."
      },
      {
        "id": "opt2",
        "text": "تسجيل عناصر القسطرة له كـ «غير مطبقة/فاشلة».",
        "isCorrect": false,
        "rejectionReason": "مرفوض: المريض غير مؤهل للتدقيق ولا يحمل قسطرة ثابتة؛ احتسابه يشوه مؤشر الالتزام.",
        "textEn": "Record all catheter maintenance elements as 'Failed/Not Done' for this patient.",
        "rejectionReasonEn": "Rejected: Non-catheterized patients cannot be penalized for unperformed catheter maintenance."
      },
      {
        "id": "opt3",
        "text": "تسجيل الحزمة مكتملة له بنسبة 100%.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: غير منطبق عليه أصلاً.",
        "textEn": "Record the catheter bundle as 100% completed for this patient.",
        "rejectionReasonEn": "Rejected: Crediting bundles for devices that are not present corrupts audit data validity."
      }
    ],
    "explanation": "يجب استبعاد المرضى غير الحاملين للقسطرة البولية الثابتة تماماً من مقام المؤشر (Denominator exclusion) لضمان دقة قياس التزام المنشأة بالحزمة.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": true,
    "auditAnswer": "غير منطبق مع سبب",
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "A patient on the maintenance audit roster uses a handheld urinal and has no indwelling catheter.",
    "promptEn": "Should this record count?",
    "keyEn": "Exclude the record from the indwelling-catheter maintenance denominator.",
    "explanationEn": "Patients using handheld urinals do not have an indwelling urinary catheter; exclude them from the indwelling catheter audit denominator."
  },
  {
    "id": "CAUTI-25",
    "bundle": "CAUTI",
    "bundleNameAr": "CAUTI — عدوى المسالك البولية المرتبطة بالقسطرة",
    "vignette": "[تدقيق] من 20 فرصة مؤهلة استوفت 16 جميع العناصر وثلاث فاتتها خطوة وواحدة غير موثقة",
    "prompt": "ما نسبة الالتزام الكامل المثبت وما المنهجية الصحيحة للتعامل مع الفقد التوثيقي؟",
    "key": "الالتزام الكامل المثبت 80% وفق تعريف الجولة؛ اعرض الفقد التوثيقي منفصلًا.",
    "taskType": "record_audit",
    "auditType": "calculation",
    "calculation": {
      "numerator": 16,
      "denominator": 20,
      "percentage": 80,
      "missingDocs": 1
    },
    "options": [
      {
        "id": "opt1",
        "text": "الالتزام الكامل المثبت 80% وفق تعريف الجولة؛ اعرض الفقد التوثيقي منفصلًا.",
        "isCorrect": true,
        "textEn": "Verified full compliance is 80% (16 ÷ 20). Report the documentation gap separately from the three observed misses."
      },
      {
        "id": "opt2",
        "text": "الالتزام الكامل 85% باحتساب الحالة غير الموثقة كحالة ناجحة جزئياً.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: نقص التوثيق يمنع إثبات الالتزام في مقياس الكل أو لا شيء: 16 ÷ 20 × 100 = 80%.",
        "textEn": "Report compliance as 85% by treating the undocumented case as partially compliant.",
        "rejectionReasonEn": "Rejected: Bundles adhere to strict all-or-none methodology without partial credit."
      },
      {
        "id": "opt3",
        "text": "استبعاد الحالات الناقصة من المقام واحتساب النسبة 16 ÷ 16 = 100%.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الفرص المؤهلة هي 20 فرصة ولا يجوز حذف الإخفاقات من المقام.",
        "textEn": "Exclude undocumented cases from the denominator to calculate compliance as 16 ÷ 16 = 100%.",
        "rejectionReasonEn": "Rejected: Excluding incomplete records from the denominator artificially inflates compliance metrics."
      }
    ],
    "explanation": "الالتزام الكامل المثبت = (الفرص المستوفية لكافة العناصر ÷ إجمالي الفرص المؤهلة) × 100 = (16 ÷ 20) × 100 = 80%. ويُعرض الفقد التوثيقي بصورة مستقلة لتشخيص فجوة التسجيل.",
    "sourceKeys": [
      "U1",
      "U2"
    ],
    "isAudit": true,
    "auditAnswer": "تم",
    "bundleNameEn": "CAUTI — Catheter-Associated Urinary Tract Infection",
    "vignetteEn": "Of 20 eligible opportunities, 16 met every element, three had an observed missed step, and one lacked documentation needed to verify completion.",
    "promptEn": "What is the result?",
    "keyEn": "Verified full compliance is 80% (16 ÷ 20). Report the documentation gap separately from the three observed misses.",
    "explanationEn": "Verified full compliance = (16 ÷ 20) × 100 = 80%. Missing documentation cannot be assumed complete and must be reported distinctly."
  },
  {
    "id": "VAP-01",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "مريض بالغ على الجهاز، السرير مسطّح دون مانع",
    "prompt": "ما الزاوية المستهدفة لرفع رأس السرير للوقاية من الارتجاع والاستنشاق الرئوي؟",
    "key": "ارفع رأس السرير إلى 30–45 درجة.",
    "taskType": "spot_error",
    "sceneObject": "bed_angle",
    "options": [
      {
        "id": "opt1",
        "text": "ارفع رأس السرير إلى 30–45 درجة.",
        "isCorrect": true,
        "textEn": "Elevate the head of the bed to 30–45°."
      },
      {
        "id": "opt2",
        "text": "خفض السرير لوضعية ترندلبورغ لتحسين التروية الدماغية.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: خفض الرأس يزيد بشكل خطير من الارتجاع المعدي المريئي واستنشاق الإفرازات إلى الرئتين.",
        "textEn": "Keep the patient flat to prevent sliding down in bed and shearing skin injury.",
        "rejectionReasonEn": "Rejected: Flat supine positioning dramatically increases microaspiration of gastric secretions and VAP incidence."
      },
      {
        "id": "opt3",
        "text": "رفع السرير بمقدار 10-15 درجة فقط لحماية ظهر المريض.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الزاوية غير كافية لمنع الارتجاع؛ التوصية السريرية المثبتة هي 30 إلى 45 درجة.",
        "textEn": "Place the patient in a prone position immediately without clinical acute lung injury.",
        "rejectionReasonEn": "Rejected: Prone positioning is reserved for severe ARDS under specialized protocol, not routine VAP prophylaxis."
      }
    ],
    "explanation": "يوصى برفع رأس السرير (Head of bed elevation) بزاوية 30–45 درجة للمرضى الخاضعين للتهوية الميكانيكية للحد من خطر استنشاق محتويات المعدة والإفرازات البلعومية.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": false,
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "An adult receiving invasive mechanical ventilation is lying flat. There is no contraindication to head-of-bed elevation.",
    "promptEn": "What adjustment is indicated?",
    "keyEn": "Elevate the head of the bed to 30–45°.",
    "explanationEn": "Maintaining head-of-bed elevation between 30° and 45° significantly reduces aspiration of gastric contents and oropharyngeal secretions in mechanically ventilated adults."
  },
  {
    "id": "VAP-02",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "وصفة مؤقتة تمنع رفع الرأس بعد تدخل محدد",
    "prompt": "كيف يُدار بند زاوية السرير عند وجود مانع طبي صريح؟",
    "key": "التزم بالقيد ووثّق السبب ووقت إعادة التقييم.",
    "taskType": "bundle_builder",
    "sceneObject": "medical_contraindication",
    "options": [
      {
        "id": "opt1",
        "text": "التزم بالقيد ووثّق السبب ووقت إعادة التقييم.",
        "isCorrect": true,
        "textEn": "Follow the order and document the reason and planned reassessment time."
      },
      {
        "id": "opt2",
        "text": "رفع السرير إلى 45 درجة متجاهلاً القيد الجراحي للوقاية من VAP.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: السلامة السريرية للمريض تسبق أهداف الحزمة، وتجاهل الموانع يهدد سلامة العمود الفقري أو الأوعية.",
        "textEn": "Force elevation to 30° despite the medical order to maintain bundle compliance.",
        "rejectionReasonEn": "Rejected: Clinical safety always takes precedence over mechanical checklist completion; never violate a valid medical contraindication."
      },
      {
        "id": "opt3",
        "text": "ترك السرير مسطحاً دون توثيق المانع أو تحديد موعد مراجعته.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: غياب التوثيق يمنع إثبات مشروعية الاستثناء السريري أثناء التدقيق.",
        "textEn": "Ignore the restriction and remove all positioning documentation from the chart.",
        "rejectionReasonEn": "Rejected: Removing documentation obscures clinical reasoning and breaches standard of care."
      }
    ],
    "explanation": "تُقبل الاستثناءات الطبية المشروعة لرفع الرأس (مثل إصابات العمود الفقري، أو الإجراءات الشريانية الفخذية) شريطة توثيق السبب الطبي ووقت إعادة التقييم بوضوح.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": false,
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "A temporary order restricts head-of-bed elevation after a procedure. The restriction is still active.",
    "promptEn": "How should the team manage positioning?",
    "keyEn": "Follow the order and document the reason and planned reassessment time.",
    "explanationEn": "When head-of-bed elevation is medically contraindicated (e.g. spinal instability, hemodynamic shock), document the specific reason and the planned reassessment interval."
  },
  {
    "id": "VAP-03",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "انتهى القيد على الوضعية وبقي السرير مسطّحًا",
    "prompt": "ما الخطوة الفورية الواجب اتخاذها بعد زوال المانع الطبي؟",
    "key": "أعد تقييم الوضعية وارفع الرأس إذا أصبح ذلك آمنًا.",
    "taskType": "spot_error",
    "sceneObject": "bed_angle_expired_hold",
    "options": [
      {
        "id": "opt1",
        "text": "أعد تقييم الوضعية وارفع الرأس إذا أصبح ذلك آمنًا.",
        "isCorrect": true,
        "textEn": "Reassess positioning and elevate the head of the bed if it is safe to do so."
      },
      {
        "id": "opt2",
        "text": "إبقاء السرير مسطحاً طوال اليوم بحجة أن المريض معتاد على ذلك.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: زوال المانع يستوجب فوراً إعادة رفع الرأس للوقاية من الاستنشاق الرئوي.",
        "textEn": "Leave the patient flat until the next full medical team rounds tomorrow morning.",
        "rejectionReasonEn": "Rejected: Delaying re-elevation unnecessarily exposes the patient to extended aspiration risk."
      },
      {
        "id": "opt3",
        "text": "رفع الساقين بدلاً من الرأس لتجنب أي إزعاج للمريض.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: رفع الساقين لا يمنع الارتجاع المعدي الرئوي ولا يحمي المجرى التنفسي.",
        "textEn": "Place the patient in reverse Trendelenburg only at shift change.",
        "rejectionReasonEn": "Rejected: Head of bed elevation should be restored immediately once contraindications clear."
      }
    ],
    "explanation": "بمجرد زوال المانع الطبي المؤقت، يجب إعادة تقييم المريض فوراً وإعادة رفع رأس السرير إلى الزاوية المستهدفة (30–45 درجة).",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": false,
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "The temporary positioning restriction has ended, but the patient remains flat.",
    "promptEn": "What should the nurse do now?",
    "keyEn": "Reassess positioning and elevate the head of the bed if it is safe to do so.",
    "explanationEn": "Promptly restore 30°–45° elevation as soon as a temporary medical positioning restriction has expired."
  },
  {
    "id": "VAP-04",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "بعد النقل عاد المريض مستلقيًا دون مانع",
    "prompt": "ما الإجراء التمريضي السريع بعد إعادة المريض إلى سريره؟",
    "key": "افحص زاوية رأس السرير وأعد ضبطها.",
    "taskType": "spot_error",
    "sceneObject": "post_transfer_angle",
    "options": [
      {
        "id": "opt1",
        "text": "افحص زاوية رأس السرير وأعد ضبطها.",
        "isCorrect": true,
        "textEn": "Check the head-of-bed angle and restore the indicated elevation."
      },
      {
        "id": "opt2",
        "text": "تأجيل ضبط زاوية السرير حتى بداية الوردية التالية.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: استلقاء المريض المسطح لفترات طويلة يرفع خطر الاستنشاق الحاد فوراً.",
        "textEn": "Leave the patient flat for 4 hours to recover from the stress of intra-hospital transport.",
        "rejectionReasonEn": "Rejected: Post-transport is a high-risk period for aspiration; prompt elevation is essential."
      },
      {
        "id": "opt3",
        "text": "الاعتماد على التقدير البصري غير الدقيق بوضع وسادة إضافية.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الوسادة تثني الرقبة وتعيق مجرى الهواء؛ يجب رفع هيكل السرير بزاوية 30–45 درجة.",
        "textEn": "Elevate only the patient's feet to encourage lower extremity venous return.",
        "rejectionReasonEn": "Rejected: Elevating the lower extremities while keeping the head flat increases gastric reflux."
      }
    ],
    "explanation": "تعديل زاوية رأس السرير والتحقق منها بمؤشر الزاوية الرقمي أو الميكانيكي جزء أساسي من قائمة التحقق الفورية بعد نقل المريض أو إجراء أي تدخل سريري.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": false,
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "After transport, a ventilated patient returns to the ICU lying flat. There is no ongoing positioning restriction.",
    "promptEn": "What should the receiving team check?",
    "keyEn": "Check the head-of-bed angle and restore the indicated elevation.",
    "explanationEn": "Confirm and re-establish 30°–45° head-of-bed elevation immediately upon returning from diagnostic procedures or transport."
  },
  {
    "id": "VAP-05",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "تقتصر العناية الفموية على ترطيب الشفاه لمريض لديه أسنان",
    "prompt": "ما المكون الأساسي المفقود في حزمة العناية الفموية لهذا المريض؟",
    "key": "أضف تنظيف الأسنان يوميًا بالفرشاة والعناية الفموية المناسبة.",
    "taskType": "bundle_builder",
    "sceneObject": "toothbrushing",
    "options": [
      {
        "id": "opt1",
        "text": "أضف تنظيف الأسنان يوميًا بالفرشاة والعناية الفموية المناسبة.",
        "isCorrect": true,
        "textEn": "Include daily toothbrushing and appropriate oral care."
      },
      {
        "id": "opt2",
        "text": "الاكتفاء بمسح الشفاه بالفازلين لترطيبها ومنع تشققها.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الترطيب السطحي لا يزيل اللويحة الجرثومية (Biofilm) عن الأسنان والمخاطيات.",
        "textEn": "Limit oral care to applying petroleum jelly on lips to prevent cracking.",
        "rejectionReasonEn": "Rejected: Lip moisturizers do not remove bacterial biofilm or reduce respiratory pathogen colonization."
      },
      {
        "id": "opt3",
        "text": "رش محلول ملحي داخل الفم دون استخدام الفرشاة.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: التنظيف الميكانيكي بالفرشاة ضروري لتفتيت مستعمرات البكتيريا الفموية.",
        "textEn": "Irrigate the oral cavity with tap water using a large syringe without suctioning.",
        "rejectionReasonEn": "Rejected: Oral flushing without suction risks catastrophic aspiration into the lower airways."
      }
    ],
    "explanation": "يوصي تحديث SHEA لعام 2022 بتنظيف الأسنان بفرشاة الأسنان العادية أو الشفاطة بانتظام، مع العناية الفموية الشاملة لتقليل الحمل البكتيري الفموي.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": false,
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "The oral-care plan for a ventilated adult with natural teeth consists only of moistening the lips.",
    "promptEn": "What should be added?",
    "keyEn": "Include daily toothbrushing and appropriate oral care.",
    "explanationEn": "Comprehensive oral care including daily mechanical toothbrushing physically disrupts dental plaque and reduces pathogenic oral bacterial load."
  },
  {
    "id": "VAP-06",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "يتضمن النموذج كلورهيكسيدين فمويًا تلقائيًا لجميع البالغين على الجهاز",
    "prompt": "ما التوجيه الحديث وفق تحديث SHEA 2022 بشأن الكلورهيكسيدين الفموي الروتيني؟",
    "key": "اعتمد تنظيف الأسنان بالفرشاة دون كلورهيكسيدين روتيني للوقاية من VAP.",
    "taskType": "bundle_builder",
    "sceneObject": "avoid_chx_oral",
    "options": [
      {
        "id": "opt1",
        "text": "اعتمد تنظيف الأسنان بالفرشاة دون كلورهيكسيدين روتيني للوقاية من VAP.",
        "isCorrect": true,
        "textEn": "Provide oral care with toothbrushing and omit routine chlorhexidine for VAP prevention."
      },
      {
        "id": "opt2",
        "text": "تطبيق الكلورهيكسيدين الفموي 4 مرات يومياً لكل المرضى المنببين.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: لا توصي به SHEA 2022 روتينياً لما أظهرته الدراسات من ارتباط محتمل بزيادة معدل الوفيات في بعض فئات المرضى غير الجراحيين.",
        "textEn": "Instill concentrated chlorhexidine down the endotracheal tube to sterilize tracheobronchial mucosa.",
        "rejectionReasonEn": "Rejected: Instilling antiseptics into the trachea causes severe chemical pneumonitis and airway injury."
      },
      {
        "id": "opt3",
        "text": "استبدال تفريش الأسنان بالغرغرة بالكلورهيكسيدين المركز.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: التفريش الميكانيكي بالفرشاة هو الأساس الآمن، والكلورهيكسيدين الروتيني لم يعد موصى به للوقاية العامة من VAP.",
        "textEn": "Discontinue all oral care completely if chlorhexidine is not utilized.",
        "rejectionReasonEn": "Rejected: Mechanical oral hygiene (toothbrushing and moisturizing) is mandatory even without chlorhexidine."
      }
    ],
    "explanation": "في تحديث SHEA 2022، تم تغيير تصنيف الكلورهيكسيدين الفموي الروتيني بحيث لم يعد ممارسة أساسية روتينية لمرضى العناية العامة، مع التركيز على تنظيف الأسنان الميكانيكي بالفرشاة.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": false,
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "The order set includes oral chlorhexidine by default for every ventilated adult.",
    "promptEn": "What should routine VAP-prevention oral care include?",
    "keyEn": "Provide oral care with toothbrushing and omit routine chlorhexidine for VAP prevention.",
    "explanationEn": "Recent guidelines (SHEA 2022) do not recommend routine chlorhexidine mouthwash for all ventilated adults due to lack of mortality benefit and potential adverse effects."
  },
  {
    "id": "VAP-07",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "التهدئة عميقة دون هدف موثق أو مبرر حالي",
    "prompt": "ما الاستراتيجية المعتمدة لإدارة التهدئة لدى مرضى التهوية الميكانيكية؟",
    "key": "راجع الهدف مع الفريق واستخدم أقل تهدئة مناسبة للحالة.",
    "taskType": "bundle_builder",
    "sceneObject": "sedation_target",
    "options": [
      {
        "id": "opt1",
        "text": "راجع الهدف مع الفريق واستخدم أقل تهدئة مناسبة للحالة.",
        "isCorrect": true,
        "textEn": "Agree on a sedation target and use the lightest level appropriate for the patient."
      },
      {
        "id": "opt2",
        "text": "زيادة جرعة التهدئة لضمان عدم مقاومة المريض لجهاز التنفس مطلقاً.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: التهدئة العميقة غير المبررة تطيل مدة التنبيب وتزيد خطر VAP والمضاعفات العصبية.",
        "textEn": "Maintain continuous heavy sedation to keep the patient completely motionless.",
        "rejectionReasonEn": "Rejected: Unnecessary deep sedation prolongs mechanical ventilation, ICU length of stay, and VAP rates."
      },
      {
        "id": "opt3",
        "text": "إيقاف التهدئة المفاجئ دون مراجعة الفريق أو وجود بروتوكول أمان.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: قد يؤدي لهياج حاد وسحب الأنبوب عرضياً وارتفاع الضغط.",
        "textEn": "Administer neuromuscular paralytic infusions continuously without sedative medications.",
        "rejectionReasonEn": "Rejected: Paralysis without adequate sedation causes severe psychological trauma and fails bundle criteria."
      }
    ],
    "explanation": "تطبيق استراتيجية التهدئة الخفيفة (Light sedation) مع تحديد هدف موثق (مثل مقياس RASS -1 إلى 0) واستخدام التهدئة الموجهة بالبروتوكول يقلل مدة التهوية الميكانيكية.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": false,
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "A ventilated patient remains deeply sedated. The chart contains neither a target nor a current reason for deep sedation.",
    "promptEn": "What should the team review?",
    "keyEn": "Agree on a sedation target and use the lightest level appropriate for the patient.",
    "explanationEn": "Avoid continuous deep sedation; establish a documented target sedation score (e.g., RASS -1 to 0) to minimize ventilator days."
  },
  {
    "id": "VAP-08",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "خطة اليوم تتضمن تجربة إيقاظ تلقائية رغم وجود مانع موثق",
    "prompt": "كيف يُتعامل مع تجربة الإيقاظ عند وجود مانع أمان سريري موثق (مثل الشلل العضلي أو ارتفاع الضغط داخل القحف)؟",
    "key": "طبّق فحص الأهلية وأجّل التجربة مع توثيق المانع.",
    "taskType": "bundle_builder",
    "sceneObject": "sat_contraindication",
    "options": [
      {
        "id": "opt1",
        "text": "طبّق فحص الأهلية وأجّل التجربة مع توثيق المانع.",
        "isCorrect": true,
        "textEn": "Apply the eligibility screen, defer the trial, and document the contraindication."
      },
      {
        "id": "opt2",
        "text": "إجراء تجربة الإيقاظ فوراً وإيقاف المهدئات رغم وجود شلل عضلي.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: تعريض المريض للوعي أثناء وجود الحصار العصبي العضلي خطر قاتل يسبب رعباً شديداً وهياجاً.",
        "textEn": "Abruptly stop all sedatives regardless of active severe intracranial hypertension.",
        "rejectionReasonEn": "Rejected: Withdrawing sedatives in patients with active intracranial hypertension triggers life-threatening herniation."
      },
      {
        "id": "opt3",
        "text": "إلغاء تقييم الاستيقاظ نهائياً للأيام القادمة وحذف المريض من البروتوكول.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: تؤجل التجربة لليوم الحالي فقط مع إعادة فحص الأهلية في اليوم التالي.",
        "textEn": "Permanently cancel all future awakening trials throughout the patient's hospitalization.",
        "rejectionReasonEn": "Rejected: Contraindications must be re-evaluated daily; deferral applies to the current day only."
      }
    ],
    "explanation": "فحص معايير الأمان (Safety screening criteria) خطوة أولى إلزامية قبل تجربة الإيقاظ التلقائي (SAT)؛ إذا وجد مانع سريري، تؤجل التجربة ويوثق المانع وتعتبر الحزمة مستوفاة لهذا البند.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": false,
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "A spontaneous awakening trial is on today’s plan, but a contraindication is documented.",
    "promptEn": "What should the team do?",
    "keyEn": "Apply the eligibility screen, defer the trial, and document the contraindication.",
    "explanationEn": "Perform a daily safety screen before attempting a spontaneous awakening trial (SAT); if an active contraindication exists, defer and document."
  },
  {
    "id": "VAP-09",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "مريض مستقر ومستوفٍ لشروط تجربة الاستيقاظ حسب بروتوكول الوحدة",
    "prompt": "ما الخطوة التالية لتنفيذ تجربة الإيقاظ التلقائي (SAT) بأمان؟",
    "key": "نسّق التجربة وراقب التحمل وفق البروتوكول.",
    "taskType": "bundle_builder",
    "sceneObject": "sat_execution",
    "options": [
      {
        "id": "opt1",
        "text": "نسّق التجربة وراقب التحمل وفق البروتوكول.",
        "isCorrect": true,
        "textEn": "Coordinate the trial and monitor tolerance according to unit protocol."
      },
      {
        "id": "opt2",
        "text": "تأجيل التجربة لأن المريض هادئ ونائم ولا داعي لإزعاجه.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: استيفاء الشروط والاستقرار يستوجبان محاولة إيقاف التهدئة يومياً لتقصير مدة التنبيب.",
        "textEn": "Double the sedative dose before starting the awakening trial to ensure patient comfort.",
        "rejectionReasonEn": "Rejected: Increasing sedation contradicts the purpose of assessing neurologic awakening."
      },
      {
        "id": "opt3",
        "text": "إيقاف التهدئة وترك الغرفة دون مراقبة مستمرة للعلامات الحيوية.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: تتطلب تجربة الإيقاظ مراقبة لصيقة لمستوى التحمل والأكسجة والمؤشرات الحيوية.",
        "textEn": "Leave the patient completely unmonitored during the sedative interruption window.",
        "rejectionReasonEn": "Rejected: Awakening trials require close bedside monitoring for agitation, desaturation, or hemodynamic compromise."
      }
    ],
    "explanation": "تتضمن تجربة الإيقاظ التلقائي اليومية (Spontaneous Awakening Trial - SAT) إيقاف أو تخفيف المهدئات لتقييم الوعي، مع المراقبة الدقيقة لعلامات التحمل وفق البروتوكول السريري.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": false,
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "A stable ventilated patient meets the unit’s criteria for a spontaneous awakening trial.",
    "promptEn": "What should happen next?",
    "keyEn": "Coordinate the trial and monitor tolerance according to unit protocol.",
    "explanationEn": "When an SAT is indicated and safe, pause sedative infusions according to protocol, monitoring for pain, agitation, and readiness for a breathing trial."
  },
  {
    "id": "VAP-10",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "مريض مستيقظ يحقق معايير فحص جاهزية التنفس",
    "prompt": "ما التدخل التالي لتقييم إمكانية فطام المريض عن جهاز التنفس؟",
    "key": "نسّق تجربة تنفس تلقائي مع الفريق.",
    "taskType": "bundle_builder",
    "sceneObject": "sbt_coordination",
    "options": [
      {
        "id": "opt1",
        "text": "نسّق تجربة تنفس تلقائي مع الفريق.",
        "isCorrect": true,
        "textEn": "Coordinate a spontaneous breathing trial with the care team."
      },
      {
        "id": "opt2",
        "text": "إبقاء الدعم التنفسي الكامل لتوفير الراحة التامة لعضلات الصدر.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: تأخير تجربة التنفس التلقائي يسبب ضمور عضلات التنفس ويطيل مدة التهوية الميكانيكية.",
        "textEn": "Defer breathing trials until the patient can walk independently around the ICU room.",
        "rejectionReasonEn": "Rejected: Demanding ambulatory mobility before initiating weaning trials severely delays extubation."
      },
      {
        "id": "opt3",
        "text": "نزع أنبوب التنبيب فوراً دون إجراء تجربة تنفس تقييمية.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: نزع الأنبوب دون تقييم القدرة على التنفس الذاتي يؤدي لفشل الفطام وإعادة التنبيب الإسعافي.",
        "textEn": "Perform breathing trials only on weekends when the unit is less busy.",
        "rejectionReasonEn": "Rejected: Weaning readiness assessments must occur daily on every eligible shift."
      }
    ],
    "explanation": "عند اجتياز فحص الجاهزية، يتم التنسيق مع الفريق الطبي والمعالج التنفسي لإجراء تجربة التنفس التلقائي (Spontaneous Breathing Trial - SBT) لتقييم الفطام.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": false,
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "An awake patient receiving invasive ventilation meets the readiness criteria for a spontaneous breathing trial.",
    "promptEn": "What is the next step?",
    "keyEn": "Coordinate a spontaneous breathing trial with the care team.",
    "explanationEn": "Patients who pass an awakening trial and meet respiratory criteria should be evaluated for a Spontaneous Breathing Trial (SBT) using CPAP or T-piece."
  },
  {
    "id": "VAP-11",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "أثناء تجربة التنفس ظهرت معايير عدم التحمل المحددة بالبروتوكول",
    "prompt": "كيف يتصرف الفريق عند ظهور علامات إجهاد تنفسي أو اضطراب ديناميكي؟",
    "key": "أوقف التجربة وفق البروتوكول وأعد تقييم السبب مع الفريق.",
    "taskType": "bundle_builder",
    "sceneObject": "sbt_failure",
    "options": [
      {
        "id": "opt1",
        "text": "أوقف التجربة وفق البروتوكول وأعد تقييم السبب مع الفريق.",
        "isCorrect": true,
        "textEn": "Stop the trial according to protocol and reassess the cause with the team."
      },
      {
        "id": "opt2",
        "text": "الاستمرار في التجربة وإجبار المريض على تحمل الإجهاد التنفسي.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: يسبب إجهاداً حاداً لعضلة القلب وعضلات التنفس ويهدد بفشل تنفسي حرج.",
        "textEn": "Continue the trial despite severe respiratory distress to force the diaphragm to adapt.",
        "rejectionReasonEn": "Rejected: Forcing an intolerant patient to continue causes respiratory muscle exhaustion and cardiovascular collapse."
      },
      {
        "id": "opt3",
        "text": "إعطاء مهدئ قوي فوراً دون إعادة ضبط دعم جهاز التنفس.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: يجب أولاً إعادة المريض إلى معايير الدعم التنفسي السابقة لتأمين التهوية والأكسجة.",
        "textEn": "Extubate the patient immediately to see if spontaneous breathing improves without the tube.",
        "rejectionReasonEn": "Rejected: Extubating an unstable, failing patient leads to urgent re-intubation and heightened VAP risk."
      }
    ],
    "explanation": "عند ظهور معايير عدم التحمل أثناء تجربة SBT (مثل تسارع التنفس > 35، انخفاض SpO2 < 90%، تسرع القلب، أو الهياج)، تُوقف التجربة فوراً ويعاد الدعم المسبق ويتم تقييم الأسباب.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": false,
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "During a spontaneous breathing trial, the patient meets the unit’s criteria for trial intolerance.",
    "promptEn": "How should the team respond?",
    "keyEn": "Stop the trial according to protocol and reassess the cause with the team.",
    "explanationEn": "If a patient displays signs of intolerance during an SBT (tachypnea, desaturation, tachycardia, hemodynamic instability), terminate the trial and restore ventilatory support."
  },
  {
    "id": "VAP-12",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "نجح اختبار التنفس والفريق يفترض نزع الأنبوب آليًا",
    "prompt": "ما التقييم الإضافي الضروري قبل اتخاذ قرار سحب أنبوب التنبيب الرغامي؟",
    "key": "قيّم أهلية نزع الأنبوب بما فيها حماية مجرى الهواء قبل القرار.",
    "taskType": "bundle_builder",
    "sceneObject": "extubation_readiness",
    "options": [
      {
        "id": "opt1",
        "text": "قيّم أهلية نزع الأنبوب بما فيها حماية مجرى الهواء قبل القرار.",
        "isCorrect": true,
        "textEn": "Confirm extubation readiness, including the ability to protect the airway."
      },
      {
        "id": "opt2",
        "text": "نزع الأنبوب فوراً بمجرد انتهاء وقت التجربة دون فحص منعكس السعال.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: قد يؤدي لانسداد مجرى الهواء أو استنشاق الإفرازات وإعادة تنبيب إسعافي فوري.",
        "textEn": "Extubate immediately without assessing the patient's cough reflex or airway clearance.",
        "rejectionReasonEn": "Rejected: Inability to protect the airway or clear secretions leads to immediate post-extubation aspiration."
      },
      {
        "id": "opt3",
        "text": "إبقاء الأنبوب 48 ساعة إضافية للاطمئنان التام رغم استيفاء كل المعايير.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: تأخير النزع غير المبرر يرفع خطر VAP والتهاب الحنجرة.",
        "textEn": "Keep the patient intubated for an extra 7 days despite proven extubation readiness.",
        "rejectionReasonEn": "Rejected: Prolonging intubation after readiness is proven unnecessarily increases pneumonia exposure."
      }
    ],
    "explanation": "نجاح تجربة التنفس (SBT) شرط ضروري ولكنه غير كافٍ بمفرده؛ يجب تقييم قدرة المريض على حماية مجرى الهواء، وقوة السعال، وحجم الإفرازات قبل اتخاذ قرار نزع الأنبوب (Extubation).",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": false,
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "A patient completes a spontaneous breathing trial successfully. A team member suggests proceeding immediately to extubation on that basis alone.",
    "promptEn": "What remains to be assessed?",
    "keyEn": "Confirm extubation readiness, including the ability to protect the airway.",
    "explanationEn": "Passing an SBT demonstrates respiratory capability, but successful extubation also requires airway patency, adequate cough, and ability to manage secretions."
  },
  {
    "id": "VAP-13",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "مريض مستقر ومؤهل للحركة لكنه بقي في السرير أيامًا",
    "prompt": "ما التدخل التأهيلي الموصى به لتقليل مدة التهوية الميكانيكية ومخاطر VAP؟",
    "key": "ضع خطة تحريك مبكر تناسب قدرته مع فريق العناية.",
    "taskType": "bundle_builder",
    "sceneObject": "early_mobility",
    "options": [
      {
        "id": "opt1",
        "text": "ضع خطة تحريك مبكر تناسب قدرته مع فريق العناية.",
        "isCorrect": true,
        "textEn": "Plan early mobilization at a level appropriate to the patient’s abilities."
      },
      {
        "id": "opt2",
        "text": "فرض الراحة التامة بالسرير حتى نزع أنبوب التنبيب بالكامل.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: قلة الحركة تسبب وهن عضلات العناية، وتزيد خطر الانصمام الرئوي وتطيل أيام التنبيب.",
        "textEn": "Prescribe strict prolonged bed rest until the patient is completely extubated.",
        "rejectionReasonEn": "Rejected: Prolonged immobility causes critical illness myopathy, diaphragm atrophy, and delayed weaning."
      },
      {
        "id": "opt3",
        "text": "إجبار المريض على المشي فوراً دون تقييم القوة العضلية أو ثبات الأنابيب.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الحركة تبدأ بالتدريج (الجلوس على طرف السرير، الوقوف) مع الحفاظ على أمان الخطوط والأنابيب.",
        "textEn": "Discontinue all mechanical monitoring before attempting out-of-bed mobilization.",
        "rejectionReasonEn": "Rejected: Mobilizing critically ill ventilated patients requires continuous hemodynamic and respiratory monitoring."
      }
    ],
    "explanation": "بروتوكولات التحريك المبكر والتأهيل التدريجي (Early mobility protocols) لدى مرضى العناية المركزة المؤهلين ترتبط بتقصير مدة التهوية الميكانيكية والإقامة وتقليل VAP.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": false,
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "A stable patient has remained in bed for several days despite meeting the unit’s mobility criteria.",
    "promptEn": "What should the team plan?",
    "keyEn": "Plan early mobilization at a level appropriate to the patient’s abilities.",
    "explanationEn": "Early progressive mobilization (passive range of motion, sitting at edge of bed, standing) preserves muscle strength and accelerates ventilator liberation."
  },
  {
    "id": "VAP-14",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "خلال تقييم الحركة ظهر مانع مؤقت",
    "prompt": "كيف يُتعامل مع خطة التحريك عند حدوث تغير سريري مؤقت؟",
    "key": "عدّل النشاط حسب الأمان وحدد وقت إعادة التقييم.",
    "taskType": "bundle_builder",
    "sceneObject": "mobility_hold",
    "options": [
      {
        "id": "opt1",
        "text": "عدّل النشاط حسب الأمان وحدد وقت إعادة التقييم.",
        "isCorrect": true,
        "textEn": "Adjust the activity to what is safe and specify when eligibility will be reassessed."
      },
      {
        "id": "opt2",
        "text": "الاستمرار في خطة الحركة بنفس الشدة رغم هبوط الضغط أو عدم الاستقرار.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: السلامة السريرية للمريض هي الأولوية القصوى وتجاهل عدم الاستقرار يعرضه للخطر.",
        "textEn": "Force standing ambulation despite acute hemodynamic instability to fulfill mobility metrics.",
        "rejectionReasonEn": "Rejected: Patient safety takes priority; forcing mobility during instability causes hemodynamic arrest."
      },
      {
        "id": "opt3",
        "text": "إلغاء برنامج التحريك نهائياً للمريض حتى خروجه من المستشفى.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: المانع مؤقت، ويجب إعادة التقييم بمجرد استقرار المؤشرات الحيوية.",
        "textEn": "Cancel physical therapy services permanently for the patient's entire admission.",
        "rejectionReasonEn": "Rejected: Temporary contraindications must be re-evaluated daily as clinical status improves."
      }
    ],
    "explanation": "تتميز بروتوكولات الحركة المبكرة بالمرونة؛ عند ظهور مانع أمان سريري مؤقت، يتم إيقاف أو تعديل النشاط لمستوى آمن مع توثيق السبب وإعادة التقييم لاحقاً.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": false,
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "During a mobility assessment, the team identifies a temporary contraindication to the planned activity.",
    "promptEn": "How should the plan be updated?",
    "keyEn": "Adjust the activity to what is safe and specify when eligibility will be reassessed.",
    "explanationEn": "If a temporary contraindication to active mobilization arises (e.g. active bleeding, severe arrhythmia), tailor activity safely and document reassessment timing."
  },
  {
    "id": "VAP-15",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "الدائرة سليمة ونظيفة ويقترح جدول الوردية تبديلها يوميًا",
    "prompt": "ما التوصية المعتمدة بشأن الاستبدال الروتيني لدائرة جهاز التنفس الاصطناعي؟",
    "key": "استمر باستخدامها وبدّلها عند الاتساخ أو الخلل أو وفق تعليمات الصانع.",
    "taskType": "spot_error",
    "sceneObject": "vent_circuit_clean",
    "options": [
      {
        "id": "opt1",
        "text": "استمر باستخدامها وبدّلها عند الاتساخ أو الخلل أو وفق تعليمات الصانع.",
        "isCorrect": true,
        "textEn": "Replace the circuit when visibly soiled, malfunctioning, or required by manufacturer instructions."
      },
      {
        "id": "opt2",
        "text": "الموافقة على التبديل اليومي لضمان أقصى درجات النظافة.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: فتح دائرة التنفس الروتيني يرفع معدلات VAP وتلوث الرئتين بالرذاذ الخارجي.",
        "textEn": "Change the breathing circuit every 24 hours to ensure continuous cleanliness.",
        "rejectionReasonEn": "Rejected: Frequent circuit changes repeatedly break the closed breathing system and increase VAP risk."
      },
      {
        "id": "opt3",
        "text": "تبديل الدائرة كل 48 ساعة بشكل دوري كحل وسط.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: توصي CDC وSHEA صراحة بعدم تغيير دوائر التنفس على فترات دورية مجدولة.",
        "textEn": "Never change the breathing circuit under any circumstance throughout the entire hospitalization.",
        "rejectionReasonEn": "Rejected: Circuits must be replaced promptly if visibly soiled, cracked, or malfunctioning."
      }
    ],
    "explanation": "توصي إرشادات CDC وSHEA بعدم استبدال دوائر جهاز التنفس الاصطناعي بشكل دوري مجدول؛ تبقى الدائرة للمريض نفسه وتُستبدل فقط عند اتساخها ظاهرياً أو حدوث خلل ميكانيكي.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": false,
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "The ventilator circuit is intact and visibly clean. The shift checklist calls for a daily change.",
    "promptEn": "What should guide circuit replacement?",
    "keyEn": "Replace the circuit when visibly soiled, malfunctioning, or required by manufacturer instructions.",
    "explanationEn": "Ventilator circuits should not be changed at routine fixed intervals; replace circuits only when visibly soiled, malfunctioning, or per manufacturer guidelines."
  },
  {
    "id": "VAP-16",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "تلوث ظاهر في دائرة التنفس",
    "prompt": "ما الإجراء الصحيح عند ملاحظة دم أو إفرازات ملوثة داخل أنابيب الدائرة؟",
    "key": "استبدل الدائرة وفق البروتوكول وتعليمات الجهاز.",
    "taskType": "spot_error",
    "sceneObject": "vent_circuit_soiled",
    "options": [
      {
        "id": "opt1",
        "text": "استبدل الدائرة وفق البروتوكول وتعليمات الجهاز.",
        "isCorrect": true,
        "textEn": "Replace the circuit according to facility protocol and device instructions."
      },
      {
        "id": "opt2",
        "text": "مسح الأنبوب من الخارج وتجاهل الإفرازات الداخلية طالما أن الجهاز يعمل.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: التلوث الداخلي مستودع مباشر لتكاثر الجراثيم واستنشاقها للرئتين.",
        "textEn": "Flush the contaminated tubing with sterile saline while it remains connected to the patient.",
        "rejectionReasonEn": "Rejected: Flushing tubing connected to the patient washes contaminated fluid directly into the lungs."
      },
      {
        "id": "opt3",
        "text": "غسل الأنبوب المتسخ بماء الصنبور وإعادة تركيبه.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: ماء الصنبور غير معقم ومصدر خطير للبكتيريا البيئية المسببة لذات الرئة.",
        "textEn": "Wipe only the exterior plastic casing and leave the contaminated lumen intact.",
        "rejectionReasonEn": "Rejected: Internal lumen contamination colonizes the inspiratory air stream."
      }
    ],
    "explanation": "يُعد التلوث الظاهري للإفرازات أو الدم داخل دائرة التنفس داعياً صريحاً لاستبدال الدائرة بالكامل بدائرة معقمة جديدة وفق بروتوكول مكافحة العدوى.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": false,
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "Visible contamination is found in the breathing circuit.",
    "promptEn": "What action is appropriate?",
    "keyEn": "Replace the circuit according to facility protocol and device instructions.",
    "explanationEn": "Visible contamination with blood, purulent secretions, or particulate matter breaks circuit hygiene and mandates replacement using aseptic protocol."
  },
  {
    "id": "VAP-17",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "تسبب خلل ميكانيكي في الدائرة في تهديد التهوية",
    "prompt": "ما الأولوية الفورية لحماية أكسجة المريض عند حدوث عطل في الدائرة؟",
    "key": "أمّن التهوية ونسّق استبدال الدائرة المعطوبة.",
    "taskType": "spot_error",
    "sceneObject": "vent_mechanical_failure",
    "options": [
      {
        "id": "opt1",
        "text": "أمّن التهوية ونسّق استبدال الدائرة المعطوبة.",
        "isCorrect": true,
        "textEn": "Ensure effective ventilation and coordinate replacement of the faulty circuit."
      },
      {
        "id": "opt2",
        "text": "محاولة لصق الشق التالف بشريط لاصق أثناء اتصال المريض بالجهاز.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: يهدد حياة المريض بنقص الأكسجة وتغير ضغوط التهوية وانفلات الوصلات.",
        "textEn": "Seal the mechanical leak with medical paper tape and leave the faulty circuit running.",
        "rejectionReasonEn": "Rejected: Taping leaks fails to guarantee minute ventilation and compromises positive end-expiratory pressure."
      },
      {
        "id": "opt3",
        "text": "إيقاف التهوية وانتظار وصول فريق الصيانة الطبية.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: يجب تأمين التهوية اليدوية الفورية بحقيبة الإنعاش (Bag-valve-mask) مع الأكسجين.",
        "textEn": "Shut down the ventilator completely and wait for biomedical engineering to arrive before bagging.",
        "rejectionReasonEn": "Rejected: Pausing ventilation without immediate manual bagging causes catastrophic hypoxemia."
      }
    ],
    "explanation": "الأولوية القصوى هي تأمين التهوية والأكسجة للمريض يدوياً باستخدام كيس الإنعاش المزود بفلتر معقم، ثم التنسيق الفوري لتركيب دائرة جديدة سليمة.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": false,
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "A mechanical circuit fault is compromising ventilation.",
    "promptEn": "What are the immediate priorities?",
    "keyEn": "Ensure effective ventilation and coordinate replacement of the faulty circuit.",
    "explanationEn": "If a circuit leaks or experiences mechanical fault, provide manual bag-valve ventilation with 100% O2 and replace the faulty circuit immediately."
  },
  {
    "id": "VAP-18",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "مريض مؤهل للتغذية المعوية وجهازه الهضمي يعمل",
    "prompt": "ما الطريق المفضل للتغذية السريرية لدى هذا المريض لدعم المناعة والوقاية من العدوى؟",
    "key": "فضّل التغذية المعوية المبكرة وفق الخطة السريرية.",
    "taskType": "bundle_builder",
    "sceneObject": "enteral_nutrition",
    "options": [
      {
        "id": "opt1",
        "text": "فضّل التغذية المعوية المبكرة وفق الخطة السريرية.",
        "isCorrect": true,
        "textEn": "Favor early enteral nutrition according to the clinical plan."
      },
      {
        "id": "opt2",
        "text": "الامتناع التام عن التغذية لمدة أسبوع للوقاية من أي ارتجاع معدي.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الصيام الطويل يسبب ضمور زغابات الأمعاء وانتقال البكتيريا لمجرى الدم وضعف المناعة.",
        "textEn": "Keep the patient strictly NPO for the first week of intubation to prevent all gastric reflux.",
        "rejectionReasonEn": "Rejected: Prolonged starvation induces gut mucosal atrophy and promotes systemic bacterial translocation."
      },
      {
        "id": "opt3",
        "text": "البدء الفوري بالتغذية الوريدية الكاملة (TPN) كخيار أول.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: التغذية الوريدية ترتبط بمعدلات عدوى مجرى الدم واختلاطات استقلابية أعلى بكثير.",
        "textEn": "Initiate high-volume bolus feeding via an unverified feeding tube position.",
        "rejectionReasonEn": "Rejected: Blind feeding without confirming tube position risks massive tracheobronchial aspiration."
      }
    ],
    "explanation": "تفضل التغذية المعوية (Enteral nutrition) على التغذية الوريدية لدى مرضى العناية المركزة الذين يعمل جهازهم الهضمي، لدورها في الحفاظ على سلامة الحاجز المعوي والمناعة.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": false,
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "A ventilated adult has a functioning gastrointestinal tract and is eligible for enteral feeding.",
    "promptEn": "Which approach should the team favor?",
    "keyEn": "Favor early enteral nutrition according to the clinical plan.",
    "explanationEn": "Early enteral nutrition (within 24–48 hours of ICU admission) preserves gut mucosal integrity and decreases bacterial translocation."
  },
  {
    "id": "VAP-19",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "خطر شفط مرتفع مع عدم تحمّل التغذية المعدية",
    "prompt": "ما التدخل الغذائي السريري الموصى به لتقليل خطر الاستنشاق الرئوي؟",
    "key": "ناقش مع الفريق ملاءمة التغذية بعد البواب.",
    "taskType": "bundle_builder",
    "sceneObject": "post_pyloric_feeding",
    "options": [
      {
        "id": "opt1",
        "text": "ناقش مع الفريق ملاءمة التغذية بعد البواب.",
        "isCorrect": true,
        "textEn": "Discuss whether postpyloric feeding is appropriate."
      },
      {
        "id": "opt2",
        "text": "الاستمرار في التغذية المعدية السريعة مع مضاعفة حجم الجرعات.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: يسبب ركوداً معدياً حاداً وقيئاً واستنشاقاً رئوياً كارثياً.",
        "textEn": "Continue forced gastric bolus feeds despite persistent large-volume vomiting.",
        "rejectionReasonEn": "Rejected: Forcing gastric feeds during vomiting leads directly to fatal pulmonary aspiration."
      },
      {
        "id": "opt3",
        "text": "إيقاف الدعم الغذائي نهائياً وحرمان المريض من السعرات الضرورية للتعافي.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: التغذية بعد البواب (Post-pyloric feeding) توفر الدعم الغذائي الكامل بأمان.",
        "textEn": "Discontinue all nutritional support indefinitely without reassessment.",
        "rejectionReasonEn": "Rejected: Withholding nutrition causes severe malnutrition, immune failure, and muscle wasting."
      }
    ],
    "explanation": "في المرضى ذوي الخطورة العالية للاستنشاق أو الذين يعانون من عدم تحمل التغذية المعدية وركود المعدة، يوصى باللجوء إلى التغذية بعد البواب (في الصائم/العفج) لتقليل VAP.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": false,
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "A ventilated patient has a high aspiration risk and is unable to tolerate gastric feeding.",
    "promptEn": "What feeding option should the team discuss?",
    "keyEn": "Discuss whether postpyloric feeding is appropriate.",
    "explanationEn": "In patients with severe intolerance to gastric feeding or persistent high aspiration risk, postpyloric (duodenal/jejunal) feeding reduces aspiration risk."
  },
  {
    "id": "VAP-20",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "يتوقع قبل التنبيب استمرار التهوية أكثر من 48–72 ساعة",
    "prompt": "ما الخاصية التقنية في أنبوب التنبيب التي يوصى بالنظر فيها لتقليل تسرب الإفرازات؟",
    "key": "انظر في أنبوب يتيح تصريف الإفرازات فوق المزمار وفق الموارد والبروتوكول؛ إجراء إضافي انتقائي.",
    "taskType": "bundle_builder",
    "sceneObject": "subglottic_evacuation",
    "options": [
      {
        "id": "opt1",
        "text": "انظر في أنبوب يتيح تصريف الإفرازات فوق المزمار وفق الموارد والبروتوكول؛ إجراء إضافي انتقائي.",
        "isCorrect": true,
        "textEn": "Consider an endotracheal tube with subglottic secretion drainage, depending on resources and facility protocol."
      },
      {
        "id": "opt2",
        "text": "استخدام قسطرة شفط عادية وإبقاؤها في حلق المريض باستمرار.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: تسبب رضاً وتآكلاً لمخاطية البلعوم ولا تحقق الشفط المستمر للإفرازات المتراكمة فوق بالون القصبة.",
        "textEn": "Place a standard uncuffed endotracheal tube in adult acute care.",
        "rejectionReasonEn": "Rejected: Uncuffed tubes in adults fail to seal the airway and allow free aspiration into the lungs."
      },
      {
        "id": "opt3",
        "text": "استبدال أنبوب التنبيب العادي بأنبوب ذي شفط بعد 3 أيام من التنبيب.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: إعادة التنبيب لغرض التبديل فقط يحمل مخاطر رضح ميكانيكي واستنشاق تفوق الفائدة.",
        "textEn": "Cut holes into the endotracheal tube shaft before intubation to allow manual drainage.",
        "rejectionReasonEn": "Rejected: Damaging the endotracheal tube destroys airway ventilation and ruins the device."
      }
    ],
    "explanation": "توصي إرشادات SHEA بالنظر في استخدام أنابيب تنبيب مزودة بفتحة لتصريف الإفرازات فوق المزمار (Subglottic secretion drainage) للمرضى المتوقع تنبيبهم لأكثر من 48–72 ساعة كإجراء انتقائي خاص.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": false,
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "Before intubation, the team expects the adult patient to require ventilation for more than 48–72 hours.",
    "promptEn": "What additional measure could be considered?",
    "keyEn": "Consider an endotracheal tube with subglottic secretion drainage, depending on resources and facility protocol.",
    "explanationEn": "Endotracheal tubes with dedicated subglottic secretion suction ports allow continuous or intermittent aspiration of pooled secretions above the cuff, reducing VAP."
  },
  {
    "id": "VAP-21",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "[تدقيق] تجربة الاستيقاظ مؤجلة بسبب مانع موثّق، وجميع البنود الأخرى مستوفاة",
    "prompt": "كيف يُحتسب هذا البند وهذه الجولة في تدقيق حزمة VAP؟",
    "key": "عند سماح بروتوكول التقييم بالاستثناء، استبعد التجربة واحسب البنود المنطبقة مكتملة.",
    "taskType": "record_audit",
    "auditType": "valid_contraindication",
    "options": [
      {
        "id": "opt1",
        "text": "عند سماح بروتوكول التقييم بالاستثناء، استبعد التجربة واحسب البنود المنطبقة مكتملة.",
        "isCorrect": true,
        "textEn": "Mark the trial Not applicable with the documented reason. Count the opportunity as complete for its applicable elements."
      },
      {
        "id": "opt2",
        "text": "احتساب الحزمة غير مكتملة / فاشلة لأن تجربة الإيقاظ لم تُنفذ عملياً.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: وجود مانع طبي موثق ومعتمد يجعل البند غير منطبق طبياً دون معاقبة مؤشر الالتزام.",
        "textEn": "Mark the entire audit round as Failed because not every single element was physically performed.",
        "rejectionReasonEn": "Rejected: Auditing protocols permit legitimate clinical exemptions when supported by clear documentation."
      },
      {
        "id": "opt3",
        "text": "استبعاد المريض بالكامل من تدقيق مكافحة العدوى.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: المريض مؤهل وبقية بنود الحزمة (رفع الرأس، العناية الفموية) تنطبق عليه ومستوفاة.",
        "textEn": "Falsify the record by marking the awakening trial as performed to achieve 100% compliance.",
        "rejectionReasonEn": "Rejected: Recording unperformed procedures as completed compromises clinical data integrity."
      }
    ],
    "explanation": "عندما يسمح بروتوكول التدقيق بالاستثناءات السريرية المبررة (Documented clinical contraindications)، يُستبعد البند غير الممكن وتُحسب الحزمة مكتملة بالبنود المنطبقة المستوفاة.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": true,
    "auditAnswer": "غير منطبق مع سبب",
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "A spontaneous awakening trial was deferred for a documented contraindication. All other elements were completed. The audit protocol permits this exemption.",
    "promptEn": "How should the opportunity be scored?",
    "keyEn": "Mark the trial Not applicable with the documented reason. Count the opportunity as complete for its applicable elements.",
    "explanationEn": "When an SAT is deferred due to a valid documented medical contraindication, score the item as Not Applicable with documented reason and credit the round."
  },
  {
    "id": "VAP-22",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "[تدقيق] رأس السرير منخفض واللاعب ينقر «مانع طبي» دون قرينة في الحالة",
    "prompt": "ما الحكم التدقيقي الصائب بشأن الاستثناء غير المسند بقرينة سريرية؟",
    "key": "لا تقبل الاستثناء؛ تحقّق من المانع أو صحّح الوضعية إن كانت آمنة.",
    "taskType": "record_audit",
    "auditType": "unjustified_exception",
    "options": [
      {
        "id": "opt1",
        "text": "لا تقبل الاستثناء؛ تحقّق من المانع أو صحّح الوضعية إن كانت آمنة.",
        "isCorrect": true,
        "textEn": "Withhold the exemption pending verification and correct the position if it is safe."
      },
      {
        "id": "opt2",
        "text": "قبول الاستثناء تلقائياً بمجرد اختيار الممارس له لتسهيل العمل.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: قبول الاستثناءات دون سند سريري يفرغ التدقيق من مضمونه ويتستر على الممارسات غير الآمنة.",
        "textEn": "Automatically accept any undocumented claim of medical contraindication without verification.",
        "rejectionReasonEn": "Rejected: Quality audits require verifiable clinical justifications for deviations from bundle care."
      },
      {
        "id": "opt3",
        "text": "تسجيل مخالفة إهمال صريحة دون التحقق السريري من وضع المريض.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: التحقق السريري ومراجعة خطة الرعاية يسبق إطلاق الأحكام.",
        "textEn": "Discharge the patient from the ICU to resolve the documentation discrepancy.",
        "rejectionReasonEn": "Rejected: Transfer decisions are based on clinical stability, not audit checklist discrepancies."
      }
    ],
    "explanation": "لا يجوز قبول الاستثناء الطبي دون وجود قرينة سريرية أو أمر طبي موثق بالملف؛ يجب تصحيح الوضعية لرفع الرأس ما دامت آمنة سريرياً.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": true,
    "auditAnswer": "لم يتم",
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "The head of the bed is below target. The audit form lists “medical contraindication,” but the record gives no supporting reason.",
    "promptEn": "How should this be handled?",
    "keyEn": "Withhold the exemption pending verification and correct the position if it is safe.",
    "explanationEn": "A contraindication checkbox without clinical rationale or medical justification cannot be credited; withhold exemption and elevate bed if safe."
  },
  {
    "id": "VAP-23",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "[تدقيق] سُجّل ترطيب الفم وحده في خانة تنظيف أسنان مريض ذي أسنان",
    "prompt": "ما التقييم التدقيقي المطابق لمعايير الحزمة لبند العناية الفموية؟",
    "key": "التنظيف بالفرشاة غير مثبت؛ تحقق من الإجراء الفعلي.",
    "taskType": "record_audit",
    "auditType": "documentation_gap",
    "options": [
      {
        "id": "opt1",
        "text": "التنظيف بالفرشاة غير مثبت؛ تحقق من الإجراء الفعلي.",
        "isCorrect": true,
        "textEn": "Toothbrushing is unverified. Check what care was performed before crediting it."
      },
      {
        "id": "opt2",
        "text": "اعتبار مسح الشفاه بالترطيب كافياً ومكافئاً لتفريش الأسنان بالكامل.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الترطيب لا يزيل اللويحة الجرثومية ولا يفي بمعيار تنظيف الأسنان الميكانيكي.",
        "textEn": "Credit toothbrushing as complete assuming moisturization equates to oral cleansing.",
        "rejectionReasonEn": "Rejected: Moisturizing lips does not remove dental plaque or oral bacterial colonization."
      },
      {
        "id": "opt3",
        "text": "حذف عنصر العناية الفموية من قائمة التدقيق لعدم إحراج الطاقم.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: العناية الفموية ركيزة أساسية في حزمة VAP ولا يمكن التغاضي عنها.",
        "textEn": "Record a formal disciplinary reprimand against the nursing shift without checking the bedside chart.",
        "rejectionReasonEn": "Rejected: Audits identify gaps for quality improvement; investigate documentation before disciplinary action."
      }
    ],
    "explanation": "تسجيل ترطيب الشفاه لا يثبت إنجاز تنظيف الأسنان بالفرشاة؛ التدقيق السريري الصارم يصنف الحالة كنقص في استيفاء معيار الحزمة أو نقص توثيق يستلزم التحقق.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": true,
    "auditAnswer": "غير موثّق",
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "The toothbrushing field records only that mouth moisture was provided to a patient with natural teeth.",
    "promptEn": "How should toothbrushing be scored?",
    "keyEn": "Toothbrushing is unverified. Check what care was performed before crediting it.",
    "explanationEn": "Documenting lip moisturization does not verify mechanical toothbrushing; mark toothbrushing as unverified and audit actual care."
  },
  {
    "id": "VAP-24",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "[تدقيق] غادر المريض العناية بعد نزع الأنبوب أمس، ويظهر في قائمة حزمة التهوية الغازية اليوم",
    "prompt": "كيف يتعامل مدقق مكافحة العدوى مع مريض لم يعد خاضعاً للتهوية الغازية؟",
    "key": "استبعد فرصة اليوم من مقام هذه الحزمة.",
    "taskType": "record_audit",
    "auditType": "denominator_exclusion",
    "options": [
      {
        "id": "opt1",
        "text": "استبعد فرصة اليوم من مقام هذه الحزمة.",
        "isCorrect": true,
        "textEn": "Exclude today’s record from the eligible denominator for this bundle."
      },
      {
        "id": "opt2",
        "text": "تسجيل جميع عناصر الحزمة كـ «غير منفذة / مخالفة».",
        "isCorrect": false,
        "rejectionReason": "مرفوض: المريض نزع الأنبوب وغادر العناية؛ احتسابه غير المنطقي يشوه دقة مؤشرات الأداء.",
        "textEn": "Mark all invasive ventilation elements as 'Failed' for this discharged patient.",
        "rejectionReasonEn": "Rejected: Non-ventilated patients cannot be counted in the ventilator bundle denominator."
      },
      {
        "id": "opt3",
        "text": "تسجيل الجولة كمكتملة بنسبة 100%.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: البنود غير منطبقة سريرياً على المريض بعد نزع الأنبوب.",
        "textEn": "Keep the record in the denominator and fabricate successful scores.",
        "rejectionReasonEn": "Rejected: Falsifying clinical records corrupts epidemiological surveillance."
      }
    ],
    "explanation": "تقتصر حزمة الوقاية من VAP على المرضى الخاضعين للتهوية الميكانيكية الغازية؛ المريض الذي نُزع أنبوبه يُستبعد من مقام تدقيق هذه الحزمة.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": true,
    "auditAnswer": "غير منطبق مع سبب",
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "A patient was extubated yesterday and has left the ICU. The record still appears on today’s invasive-ventilation audit list.",
    "promptEn": "How should it be handled?",
    "keyEn": "Exclude today’s record from the eligible denominator for this bundle.",
    "explanationEn": "Patients extubated and discharged from the ICU are no longer eligible opportunities for the invasive mechanical ventilation bundle; exclude from denominator."
  },
  {
    "id": "VAP-25",
    "bundle": "VAP",
    "bundleNameAr": "VAP — الالتهاب الرئوي المرتبط بالتهوية الميكانيكية",
    "vignette": "[تدقيق] ست جولات مؤهلة، أربع مكتملة واثنتان غير مكتملتين",
    "prompt": "ما نسبة الالتزام الكامل وما الاستنتاج العلمي السليم بشأن معدل VAP؟",
    "key": "الالتزام الكامل 66.7% بعد التقريب؛ لا تستنتج منه معدل VAP.",
    "taskType": "record_audit",
    "auditType": "calculation",
    "calculation": {
      "numerator": 4,
      "denominator": 6,
      "percentage": 66.7
    },
    "options": [
      {
        "id": "opt1",
        "text": "الالتزام الكامل 66.7% بعد التقريب؛ لا تستنتج منه معدل VAP.",
        "isCorrect": true,
        "textEn": "66.7% (4 ÷ 6, rounded to one decimal place). This percentage measures completion of the audited elements."
      },
      {
        "id": "opt2",
        "text": "الالتزام الكامل 80% باحتساب درجات جزئية للبنود المنفذة في الجولتين الناقصتين.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: حزمة الوقاية تُقاس بمبدأ الكل أو لا شيء: 4 ÷ 6 × 100 = 66.7% دون تجزئة.",
        "textEn": "Report compliance as 100% by excluding the 2 incomplete rounds from the calculation.",
        "rejectionReasonEn": "Rejected: Excluding incomplete eligible opportunities creates false-positive compliance metrics."
      },
      {
        "id": "opt3",
        "text": "الالتزام الكامل 66.7% وهو ما يعني مباشرة أن معدل الإصابة بـ VAP هو 33.3%.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: مؤشر الالتزام بالعمليات (Process measure) لا يُعادل معدل العدوى السريري (Outcome measure).",
        "textEn": "Report compliance as 66.7% and state this means 33.3% of ICU patients developed VAP.",
        "rejectionReasonEn": "Rejected: Process bundle compliance does not correlate directly with clinical infection incidence."
      }
    ],
    "explanation": "الالتزام الكامل بالحزمة = 4 ÷ 6 × 100 = 66.7%. وتؤكد معايير مكافحة العدوى عدم جواز استنتاج معدل الإصابة بالعدوى مباشرة من مؤشرات الالتزام بالعمليات.",
    "sourceKeys": [
      "V1"
    ],
    "isAudit": true,
    "auditAnswer": "تم",
    "bundleNameEn": "VAP — Ventilator-Associated Pneumonia",
    "vignetteEn": "Of six eligible rounds, four met every applicable element and two were incomplete.",
    "promptEn": "Calculate verified full compliance.",
    "keyEn": "66.7% (4 ÷ 6, rounded to one decimal place). This percentage measures completion of the audited elements.",
    "explanationEn": "Verified bundle compliance = (4 ÷ 6) × 100 = 66.7%. Report process compliance clearly to guide targeted ICU quality improvement."
  },
  {
    "id": "SSI-01",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "مريضة تستعد لجراحة اختيارية وتسأل عن الاستحمام",
    "prompt": "ما التوجيه السريري المعتمد للاستحمام قبل العمليات الجراحية؟",
    "key": "أوصِ بالاستحمام قبل الجراحة وفق تعليمات المنشأة.",
    "taskType": "bundle_builder",
    "sceneObject": "preop_shower",
    "options": [
      {
        "id": "opt1",
        "text": "أوصِ بالاستحمام قبل الجراحة وفق تعليمات المنشأة.",
        "isCorrect": true,
        "textEn": "Advise preoperative bathing or showering according to facility instructions."
      },
      {
        "id": "opt2",
        "text": "نصحها بعدم الاستحمام إطلاقاً للحفاظ على طبقة الدهون والزيوت الطبيعية للجلد.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الاستحمام قبل الجراحة يقلل الحمل الميكروبي على سطح الجلد ويعد ممارسة وقائية أساسية.",
        "textEn": "Advise the patient strictly not to bathe or shower for 48 hours prior to surgery.",
        "rejectionReasonEn": "Rejected: Preoperative bathing reduces skin bacterial colony counts; refraining from bathing increases skin flora."
      },
      {
        "id": "opt3",
        "text": "إلزامها بالاستحمام 5 مرات بالكلورهيكسيدين المركز لجميع الجراحات الصغرى.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الاستحمام بالصابون العادي أو المضاد للميكروبات ليلة الجراحة أو صباحها كافٍ وفق WHO وCDC.",
        "textEn": "Instruct the patient to scrub the surgical site vigorously with neat bleach.",
        "rejectionReasonEn": "Rejected: Household bleach causes severe chemical burns, skin breakdown, and tissue necrosis."
      }
    ],
    "explanation": "توصي منظمة الصحة العالمية (WHO) وCDC بالاستحمام بالصابون العادي أو المضاد للميكروبات (أو غسول الكلورهيكسيدين وفق بروتوكول المنشأة) في الليلة السابقة للجراحة أو في صباح يوم العملية.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": false,
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "During preparation for elective surgery, a patient asks whether she should bathe before admission.",
    "promptEn": "What advice should the preoperative nurse give?",
    "keyEn": "Advise preoperative bathing or showering according to facility instructions.",
    "explanationEn": "WHO and CDC recommend that surgical patients shower or bathe using either plain soap or an antimicrobial agent before elective procedures."
  },
  {
    "id": "SSI-02",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "الشعر موجود لكنه لا يعوق العملية",
    "prompt": "ما الممارسة القياسية بشأن إزالة شعر الجسم في موضع الجراحة؟",
    "key": "اتركه في مكانه.",
    "taskType": "bundle_builder",
    "sceneObject": "leave_hair",
    "options": [
      {
        "id": "opt1",
        "text": "اتركه في مكانه.",
        "isCorrect": true,
        "textEn": "Leave the hair in place."
      },
      {
        "id": "opt2",
        "text": "حلاقة المنطقة المحيطة بالكامل بشفرة كإجراء روتيني احترازي.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: إزالة الشعر غير الضرورية ترفع خطر عدوى موضع الجراحة وتحدث تمزقات مجهرية بالجلد.",
        "textEn": "Remove all hair from the entire body area regardless of surgical location.",
        "rejectionReasonEn": "Rejected: Unnecessary hair removal creates micro-abrasions that become colonized with pathogenic bacteria."
      },
      {
        "id": "opt3",
        "text": "استخدام كريم مزيل للشعر على كامل العضو.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: قد يسبب تفاعلات تحسسية وتخريشاً نسيجياً ولا داعي لإزالة الشعر إن لم يعق العملية.",
        "textEn": "Pluck hairs individually from around the operative area using cosmetic tweezers.",
        "rejectionReasonEn": "Rejected: Plucking tears the hair follicles and creates inflamed entry portals for bacteria."
      }
    ],
    "explanation": "تؤكد إرشادات WHO وCDC بالإجماع: لا تقم بإزالة شعر موضع الجراحة ما لم يكن الشعر في موضع الشق أو حوله يعوق إجراء العملية بشكل مباشر.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": false,
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "Hair is present at the proposed incision site, but it will not interfere with the operation.",
    "promptEn": "How should the team handle it?",
    "keyEn": "Leave the hair in place.",
    "explanationEn": "Routine hair removal is not recommended; hair should not be removed unless it directly interferes with the surgical incision or procedure."
  },
  {
    "id": "SSI-03",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "الشعر يعوق موضع الشق وعلى الطاولة شفرة وماكينة قص",
    "prompt": "ما الأداة الآمنة الموصى بها لإزالة الشعر وما الأداة الممنوعة تماماً؟",
    "key": "استخدم ماكينة القص عند ضرورة الإزالة.",
    "taskType": "spot_error",
    "sceneObject": "clippers_vs_razor",
    "options": [
      {
        "id": "opt1",
        "text": "استخدم ماكينة القص عند ضرورة الإزالة.",
        "isCorrect": true,
        "textEn": "Use surgical clippers when hair removal is necessary."
      },
      {
        "id": "opt2",
        "text": "استخدام شفرة الحلاقة اليدوية لأنها تحلق الشعر من الجذور وتضمن نعومة الجلد.",
        "isCorrect": false,
        "rejectionReason": "مرفوض بشدة: الحلاقة بالشفرة (Razor) تسبب جروحاً مجهرية (Micro-abrasions) تتكاثر فيها البكتيريا وترفع خطر SSI بنسبة هائلة.",
        "textEn": "Use a manual razor with shaving cream to achieve a smooth clean shave.",
        "rejectionReasonEn": "Rejected: Shaving with manual razors causes microscopic skin nicks and cuts, dramatically increasing SSI rates."
      },
      {
        "id": "opt3",
        "text": "نتف الشعر يدوياً قبل الجراحة لتجنب استخدام أي آلات.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: إجراء مؤلم يسبب التهاب جريبات حاداً (Folliculitis) وخرقاً للجلد.",
        "textEn": "Use a cigarette lighter or open flame to singe off unwanted hair.",
        "rejectionReasonEn": "Rejected: Open flames cause thermal skin burns and present a severe surgical fire explosion risk."
      }
    ],
    "explanation": "إذا كانت إزالة الشعر ضرورية، يجب استخدام ماكينة القص الكهربائية ذات الرأس أحادي الاستخدام (Electric clippers) وتجنب استخدام شفرات الحلاقة قطعياً.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": false,
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "Hair interferes with access to the planned incision. The preparation trolley contains a razor and surgical clippers.",
    "promptEn": "Which method should the team use?",
    "keyEn": "Use surgical clippers when hair removal is necessary.",
    "explanationEn": "If hair removal is clinically necessary, use electric surgical clippers with a single-use blade immediately prior to surgery; do not use razor blades."
  },
  {
    "id": "SSI-04",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "مريض حلق موضع الجراحة مسبقًا وظهرت خدوش",
    "prompt": "كيف يتصرف طاقم التمريض الجراحي فور اكتشاف خدوش الحلاقة المنزلية؟",
    "key": "أبلغ الفريق لتقييم الجلد قبل التحضير وتجنّب مزيد من الحلاقة.",
    "taskType": "spot_error",
    "sceneObject": "razor_cuts",
    "options": [
      {
        "id": "opt1",
        "text": "أبلغ الفريق لتقييم الجلد قبل التحضير وتجنّب مزيد من الحلاقة.",
        "isCorrect": true,
        "textEn": "Alert the team for assessment of the skin and avoid further shaving."
      },
      {
        "id": "opt2",
        "text": "فرك الخدوش بقوة بفرشاة خشنة ومطهر جلدي مركز لتطهير الجروح.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الفرك الخشن يفاقم تلف أنسجة الجلد ويزيد نفاذ البكتيريا للطبقات العميقة.",
        "textEn": "Shave the area again vigorously with a multi-blade razor to smooth the abrasions.",
        "rejectionReasonEn": "Rejected: Repeated razor shaving exacerbates skin cuts and massively multiplies wound infection risk."
      },
      {
        "id": "opt3",
        "text": "إعادة الحلاقة بالشفرة لتسوية الجلد وإزالة بقايا الشعر.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: مضاعفة التلف والتمزقات الجلدية يرفع خطر العدوى الجراحية بشكل مضاعف.",
        "textEn": "Apply commercial hair removal cream over the open scratches and cuts.",
        "rejectionReasonEn": "Rejected: Chemical depilatories irritate broken skin and cause chemical dermatitis."
      }
    ],
    "explanation": "تُعد الخدوش والتمزقات الجلدية الناجمة عن الحلاقة مصدراً رئيسياً لاستعمار البكتيريا؛ يجب إبلاغ الجراح لتقييم الجلد وتجنب أي حلاقة إضافية.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": false,
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "A patient shaved the operative site before arrival. On assessment, the nurse sees superficial scratches.",
    "promptEn": "What should happen before skin preparation?",
    "keyEn": "Alert the team for assessment of the skin and avoid further shaving.",
    "explanationEn": "Razor-shaved skin exhibits micro-abrasions that harbor bacteria; inspect the skin, avoid further shaving, and alert the surgical team."
  },
  {
    "id": "SSI-05",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "جراحة قولون اختيارية لها استطباب للوقاية والوصفة موجودة دون سجل إعطاء",
    "prompt": "ما الإجراء الحاسم للتحقق قبل الشق الجراحي (Time-out)؟",
    "key": "تحقق من الإعطاء الفعلي والتوقيت قبل الشق.",
    "taskType": "spot_error",
    "sceneObject": "verify_abx_admin",
    "options": [
      {
        "id": "opt1",
        "text": "تحقق من الإعطاء الفعلي والتوقيت قبل الشق.",
        "isCorrect": true,
        "textEn": "Confirm actual administration and timing against the applicable prophylaxis protocol."
      },
      {
        "id": "opt2",
        "text": "افتراض أن التمريض أعطى المضاد ما دام مسجلاً في أمر الطبيب المكتوب.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: أمر الوصفة الطبية لا يضمن حدوث الإعطاء التمريضي الفعلي في الوقت المناسب.",
        "textEn": "Assume the antibiotic was given because a prescription order exists on the chart.",
        "rejectionReasonEn": "Rejected: Orders do not prove actual administration; timing and dose delivery must be verified in the medication record."
      },
      {
        "id": "opt3",
        "text": "تأجيل إعطاء المضاد الحيوي لما بعد فتح البطن واستكشاف الأمعاء.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: يفقد المضاد فاعليته الوقائية؛ يجب أن يتواجد بتركيز علاجي في الأنسجة لحظة الشق.",
        "textEn": "Administer an extra double dose immediately without checking the administration log.",
        "rejectionReasonEn": "Rejected: Unverified duplicate administration leads to drug toxicity and severe adverse reactions."
      }
    ],
    "explanation": "في قائمة التحقق الجراحية، يجب التأكد بالدليل البصري من سجل الإعطاء الفعلي للمضاد الحيوي الوقائي وتوقيته الدقيق قبل إجراء الشق الجراحي الأولي.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": false,
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "An adult is scheduled for elective colorectal surgery with an indication for antimicrobial prophylaxis. The order is present, but administration has yet to be confirmed.",
    "promptEn": "What should the team verify before incision?",
    "keyEn": "Confirm actual administration and timing against the applicable prophylaxis protocol.",
    "explanationEn": "Prophylactic antibiotics must be administered within the optimal therapeutic window before incision (typically within 60 minutes for beta-lactams)."
  },
  {
    "id": "SSI-06",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "يرغب الفريق بإعطاء الجرعة الوقائية الأولى بعد الشق في عملية مخططة",
    "prompt": "ما التوقيت المعتمد لإعطاء الجرعة الوقائية الأولى لتحقيق أقصى حماية للأنسجة؟",
    "key": "خطّط لإعطائها قبل الشق كي يتحقق التركيز المناسب وقت الشق.",
    "taskType": "bundle_builder",
    "sceneObject": "abx_timing",
    "options": [
      {
        "id": "opt1",
        "text": "خطّط لإعطائها قبل الشق كي يتحقق التركيز المناسب وقت الشق.",
        "isCorrect": true,
        "textEn": "Schedule administration before incision so adequate antimicrobial concentrations are present at incision."
      },
      {
        "id": "opt2",
        "text": "الموافقة على الإعطاء بعد الشق طالما أن العملية لم تنته بعد.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: إعطاء المضاد بعد الشق يقلل فاعليته الوقائية بشكل حاد ويرفع خطر SSI بمقدار 2-6 أضعاف.",
        "textEn": "Administer the antibiotic after the operation concludes to prevent intraoperative antibiotic breakdown.",
        "rejectionReasonEn": "Rejected: Giving antibiotics after incision or after skin closure provides zero prophylactic efficacy against initial surgical contamination."
      },
      {
        "id": "opt3",
        "text": "إعطاء الجرعة الأولى قبل العملية بـ 6 ساعات في الجناح.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: ينخفض تركيز الدواء في المصل والأنسجة إلى ما دون الحد الأدنى المثبط قبل بدء الشق.",
        "textEn": "Administer the antibiotic 24 hours prior to surgery as a single oral dose.",
        "rejectionReasonEn": "Rejected: Administering prophylactic antimicrobials too early results in subtherapeutic tissue levels at the time of incision."
      }
    ],
    "explanation": "توصي إرشادات WHO وCDC بإعطاء المضاد الحيوي الوقائي الوريدي خلال 60 دقيقة قبل الشق الجراحي (أو حتى 120 دقيقة للأدوية بطيئة التسريب كالفانكومايسين).",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": false,
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "For a planned operation, the team proposes giving the first indicated prophylactic antibiotic dose after incision.",
    "promptEn": "How should the plan be adjusted?",
    "keyEn": "Schedule administration before incision so adequate antimicrobial concentrations are present at incision.",
    "explanationEn": "Surgical antimicrobial prophylaxis must be given before surgical incision so bactericidal tissue concentrations are achieved at the time of wound creation."
  },
  {
    "id": "SSI-07",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "المضاد الوقائي المختار يستلزم تسريبًا أطول من المعتاد",
    "prompt": "كيف يُخطط لوقت بدء التسريب للمضادات الحيوية بطيئة التسريب مثل الفانكومايسين أو الفلوروكينولونات؟",
    "key": "خطّط لوقت البدء حسب الدواء وبروتوكول المنشأة.",
    "taskType": "bundle_builder",
    "sceneObject": "vancomycin_timing",
    "options": [
      {
        "id": "opt1",
        "text": "خطّط لوقت البدء حسب الدواء وبروتوكول المنشأة.",
        "isCorrect": true,
        "textEn": "Plan the infusion start using the agent-specific timing and facility protocol."
      },
      {
        "id": "opt2",
        "text": "تسريب الفانكومايسين دفعة وريدية سريعة خلال 10 دقائق قبل الشق.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: التسريب السريع للفانكومايسين يسبب متلازمة الرجل الأحمر (Red Man Syndrome) وهبوطاً حاداً بالضغط.",
        "textEn": "Infuse vancomycin as a rapid IV push over 2 minutes immediately before skin incision.",
        "rejectionReasonEn": "Rejected: Rapid vancomycin infusion causes severe histamine-mediated Red Man syndrome, severe hypotension, and cardiovascular collapse."
      },
      {
        "id": "opt3",
        "text": "الاكتفاء بـ 15 دقيقة تسريب وإيقاف المحلول عند بدء الشق.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: لا يكتمل إعطاء الجرعة الوقائية ولا يتحقق التركيز النسيجي المطلوب.",
        "textEn": "Omit the infusion entirely and rely solely on skin antiseptic preparation.",
        "rejectionReasonEn": "Rejected: High-risk procedures indicated for targeted prophylaxis require both systemic antimicrobials and skin prep."
      }
    ],
    "explanation": "المضادات الحيوية التي تتطلب تسريباً بطيئاً على مدار ساعة إلى ساعتين (مثل الفانكومايسين والسيبروفلوكساسين) يجب البدء بتسريبها قبل الشق بـ 60–120 دقيقة وفق البروتوكول.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": false,
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "The selected prophylactic antimicrobial requires a longer infusion.",
    "promptEn": "How should the team schedule it relative to incision?",
    "keyEn": "Plan the infusion start using the agent-specific timing and facility protocol.",
    "explanationEn": "Agents requiring prolonged infusion times (e.g. vancomycin, fluoroquinolones) should be initiated within 120 minutes before surgical incision."
  },
  {
    "id": "SSI-08",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "تأخرت العملية طويلًا بعد الجرعة الوقائية",
    "prompt": "ما الخطوة الصيدلانية السريرية الواجب اتخاذها عند تأخر الشق وتجاوز نافذة الدواء؟",
    "key": "أعد تقييم التغطية والتوقيت مع التخدير والصيدلة وفق بروتوكول الدواء.",
    "taskType": "bundle_builder",
    "sceneObject": "delayed_surgery",
    "options": [
      {
        "id": "opt1",
        "text": "أعد تقييم التغطية والتوقيت مع التخدير والصيدلة وفق بروتوكول الدواء.",
        "isCorrect": true,
        "textEn": "Review coverage and dose timing with anesthesia and pharmacy under the agent-specific protocol."
      },
      {
        "id": "opt2",
        "text": "المتابعة دون أي تقييم بافتراض أن الجرعة السابقة كافية طوال اليوم.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: انخفاض تركيز المضاد دون الحد الأدنى المثبط (MIC) وقت الشق يعرض موقع الجراحة للعدوى.",
        "textEn": "Proceed with surgery 5 hours after antibiotic infusion without reassessing coverage.",
        "rejectionReasonEn": "Rejected: Serum and tissue concentrations fall below the minimum inhibitory concentration after prolonged delays."
      },
      {
        "id": "opt3",
        "text": "إعطاء 3 مضادات حيوية جديدة دفعة واحدة لتعويض التأخير.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: عشوائية تزيد السمية الدوائية دون سند علمي.",
        "textEn": "Cancel the surgery permanently because the antibiotic was already administered.",
        "rejectionReasonEn": "Rejected: Surgical cases are not canceled; redosing according to pharmacological protocol maintains protection."
      }
    ],
    "explanation": "إذا تأخر بدء الشق الجراحي لما بعد عمر النصف للمضاد الوقائي، يجب التنسيق مع التخدير والصيدلة لإعطاء جرعة إضافية قبل الشق لضمان وجود تركيز نسيجي كافٍ.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": false,
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "Prophylaxis has been administered, but a prolonged delay pushes back the operation.",
    "promptEn": "What should the team reassess?",
    "keyEn": "Review coverage and dose timing with anesthesia and pharmacy under the agent-specific protocol.",
    "explanationEn": "When unexpected surgical delays occur, review the antimicrobial's half-life with anesthesia/pharmacy; redose if the delay exceeds the agent's safe window."
  },
  {
    "id": "SSI-09",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "امتدت العملية إلى ما بعد فترة إعادة الجرعة المحددة في بروتوكول المضاد",
    "prompt": "ما التدخل الصيدلاني أثناء العمليات الجراحية الممتدة أو النزف الغزير؟",
    "key": "نسّق إعادة الجرعة وفق البروتوكول ووثّق توقيتها.",
    "taskType": "bundle_builder",
    "sceneObject": "intraop_redosing",
    "options": [
      {
        "id": "opt1",
        "text": "نسّق إعادة الجرعة وفق البروتوكول ووثّق توقيتها.",
        "isCorrect": true,
        "textEn": "Coordinate redosing under the protocol and document administration time."
      },
      {
        "id": "opt2",
        "text": "الامتناع التام عن إعادة الجرعة خوفاً من إجهاد الكلى أثناء التخدير.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: استمرار الجراحة دون تركيز وقائي كافٍ للمضاد من أبرز أسباب فشل الوقاية الجراحية.",
        "textEn": "Refrain from intraoperative redosing regardless of surgical length to avoid antibiotic overuse.",
        "rejectionReasonEn": "Rejected: Prolonged procedures without redosing leave tissues unprotected against intraoperative bacterial contamination."
      },
      {
        "id": "opt3",
        "text": "مضاعفة تسريب المحاليل الوريدية فقط دون إعطاء دواء إضافي.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: المحاليل تزيد من تمديد الدواء في البلازما وتخفض تركيزه الوقائي أكثر.",
        "textEn": "Redose the antibiotic every 30 minutes continuously throughout the operation.",
        "rejectionReasonEn": "Rejected: Hyper-frequent redosing without pharmacokinetic justification causes drug accumulation and renal toxicity."
      }
    ],
    "explanation": "تتطلب إرشادات الوقاية إعادة إعطاء جرعة إضافية أثناء العملية (Intraoperative redosing) إذا امتد وقت الجراحة لأكثر من ضعفي عمر النصف للدواء (مثلاً كل 4 ساعات للسيفازولين) أو عند فقدان دم > 1500 مل.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": false,
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "An operation continues beyond the redosing interval specified in the antimicrobial protocol.",
    "promptEn": "What should the team do?",
    "keyEn": "Coordinate redosing under the protocol and document administration time.",
    "explanationEn": "Intraoperative redosing is indicated when procedure duration exceeds twice the antibiotic's half-life (e.g. >4 hours for cefazolin) or after major blood loss (>1500 mL)."
  },
  {
    "id": "SSI-10",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "مريض سيخضع لعملية نظيفة ملوثة وأُغلق الجرح ولا توجد عدوى تستدعي العلاج",
    "prompt": "ما التوصية المعتمدة لإنهاء المضاد الحيوي الوقائي بعد إغلاق الجرح؟",
    "key": "أنهِ الوقاية حسب التوصية الخاصة بالحالة.",
    "taskType": "bundle_builder",
    "sceneObject": "discontinue_prophylaxis",
    "options": [
      {
        "id": "opt1",
        "text": "أنهِ الوقاية حسب التوصية الخاصة بالحالة.",
        "isCorrect": true,
        "textEn": "End surgical prophylaxis at closure, consistent with the CDC recommendation for clean and clean-contaminated procedures."
      },
      {
        "id": "opt2",
        "text": "الاستمرار في إعطاء المضاد الوقائي لمدة 7 أيام كاملة في الجناح.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: تمديد المضاد بعد إغلاق الجرح لا يمنع العدوى ويزيد المقاومة البكتيرية وعدوى C. difficile.",
        "textEn": "Continue prophylactic antibiotics for 7 to 10 days postoperatively to guarantee wound sterility.",
        "rejectionReasonEn": "Rejected: Prolonged postoperative antimicrobial prophylaxis does not reduce SSI and drives Clostridioides difficile infection and antimicrobial resistance."
      },
      {
        "id": "opt3",
        "text": "إعطاء جرعة يومية طوال وجود المريض في المستشفى كإجراء روتيني.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: خرق صريح لإرشادات WHO وCDC التي تؤكد إيقاف الوقاية فور إغلاق الشق.",
        "textEn": "Continue prophylactic antibiotics until all surgical stitches or staples are removed.",
        "rejectionReasonEn": "Rejected: Extending prophylaxis for weeks promotes resistant superinfections without surgical benefit."
      }
    ],
    "explanation": "تؤكد منظمة الصحة العالمية (WHO) وCDC بقوة على عدم تمديد إعطاء المضادات الحيوية الوقائية بعد إغلاق الشق الجراحي في العمليات النظيفة والملوثة النظيفة.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": false,
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "A clean-contaminated operation has ended and the incision is closed. The patient has no infection that requires treatment.",
    "promptEn": "What is the plan for prophylaxis?",
    "keyEn": "End surgical prophylaxis at closure, consistent with the CDC recommendation for clean and clean-contaminated procedures.",
    "explanationEn": "CDC and WHO guidelines strongly recommend against continuing prophylactic antimicrobials after surgical closure in clean and clean-contaminated procedures."
  },
  {
    "id": "SSI-11",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "يوجد مصرف بعد جراحة نظيفة ويُقترح تمديد الوقاية حتى إزالته",
    "prompt": "هل يبرر وجود المصارف الجراحية (Surgical drains) تمديد المضاد الوقائي؟",
    "key": "وجود المصرف وحده لا يبرر استمرار المضاد الوقائي.",
    "taskType": "bundle_builder",
    "sceneObject": "surgical_drains",
    "options": [
      {
        "id": "opt1",
        "text": "وجود المصرف وحده لا يبرر استمرار المضاد الوقائي.",
        "isCorrect": true,
        "textEn": "End prophylaxis as indicated. Drain presence alone does not justify extending it."
      },
      {
        "id": "opt2",
        "text": "الموافقة على استمرار المضاد طوال فترة بقاء المصرف حتى سحبه.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: إرشادات WHO وCDC تنص صراحة على أن وجود المصارف لا يبرر إطلاقاً تمديد المضادات الوقائية.",
        "textEn": "Continue prophylactic antibiotics until surgical drains are completely removed.",
        "rejectionReasonEn": "Rejected: Routine antimicrobial coverage for indwelling closed drains promotes resistant bacterial colonization of the drain tract."
      },
      {
        "id": "opt3",
        "text": "حقن المضاد الحيوي مباشرة داخل أنبوب المصرف الجراحي.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: ممارسة غير مسندة علمياً وقد تسبب سمية نسيجية والتهابات موضعية.",
        "textEn": "Inject antibiotics directly into the surgical drain collection bulb.",
        "rejectionReasonEn": "Rejected: Injecting antimicrobials into closed drain bulbs is clinically unproven and risks contaminating the closed suction system."
      }
    ],
    "explanation": "توصيات CDC لعام 2017 وWHO لعام 2018 تنص بوضوح على أن وجود مصرف جراحي لا يبرر الاستمرار في إعطاء المضادات الحيوية الوقائية بعد الجراحة.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": false,
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "A drain remains after a clean operation. A team member proposes continuing prophylactic antibiotics until drain removal.",
    "promptEn": "How should the team respond?",
    "keyEn": "End prophylaxis as indicated. Drain presence alone does not justify extending it.",
    "explanationEn": "The presence of a closed surgical drain does not justify extending prophylactic antibiotics beyond wound closure."
  },
  {
    "id": "SSI-12",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "مريض لديه عدوى قائمة وأمر علاجي مستقل بعد العملية",
    "prompt": "كيف يُفصل بين مفهوم الوقاية الجراحية والعلاج الطبي للعدوى القائمة؟",
    "key": "افصل تقييم العلاج عن قرار إنهاء الوقاية وراجع الخطة مع الفريق.",
    "taskType": "bundle_builder",
    "sceneObject": "treatment_vs_prophylaxis",
    "options": [
      {
        "id": "opt1",
        "text": "افصل تقييم العلاج عن قرار إنهاء الوقاية وراجع الخطة مع الفريق.",
        "isCorrect": true,
        "textEn": "Review the therapeutic antibiotic plan independently with the treating team."
      },
      {
        "id": "opt2",
        "text": "إيقاف المضاد العلاجي فوراً بحجة انتهاء وقت الوقاية الجراحية بعد إغلاق الجرح.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: المضاد هنا علاجي موجه لعدوى موثقة قائمة وليس وقائياً جراحياً؛ إيقافه يهدد المريض بانتكاسة إنتانية.",
        "textEn": "Discontinue all therapeutic antibiotics immediately upon wound closure.",
        "rejectionReasonEn": "Rejected: Pre-existing infections require completion of their targeted therapeutic antimicrobial course."
      },
      {
        "id": "opt3",
        "text": "خلط مواعيد الجرعات دون تحديد نوع ومسار المضاد العلاجي.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: يجب اتباع الخطة العلاجية المقررة للعدوى القائمة بشكل مستقل ومنظم.",
        "textEn": "Combine 5 different empiric broad-spectrum antibiotics to cover all possible microbes.",
        "rejectionReasonEn": "Rejected: Unwarranted broad-spectrum polypharmacy drives severe toxicity and fungal overgrowth."
      }
    ],
    "explanation": "يجب التمييز الدقيق بين «الوقاية الجراحية» التي تنتهي بإغلاق الجرح، وبين «المضادات الحيوية العلاجية» المقررة لعلاج عدوى قائمة ومثبتة سريرياً.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": false,
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "A patient has an established infection and a separate postoperative antibiotic treatment order.",
    "promptEn": "How should the team manage treatment when prophylaxis ends?",
    "keyEn": "Review the therapeutic antibiotic plan independently with the treating team.",
    "explanationEn": "Therapeutic antibiotics for pre-existing active infections are managed as therapeutic treatment courses, distinct from prophylactic surgical regimens."
  },
  {
    "id": "SSI-13",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "بالغ يخضع لجراحة على جلد سليم دون موانع للمطهر الكحولي",
    "prompt": "ما المحلول المفضل الموصى به لتحضير جلد موقع الجراحة وفق إرشادات WHO وCDC؟",
    "key": "اختر مستحضرًا كحوليًا مناسبًا قائمًا على الكلورهيكسيدين وفق WHO.",
    "taskType": "bundle_builder",
    "sceneObject": "skin_antiseptic_choice",
    "options": [
      {
        "id": "opt1",
        "text": "اختر مستحضرًا كحوليًا مناسبًا قائمًا على الكلورهيكسيدين وفق WHO.",
        "isCorrect": true,
        "textEn": "Use a suitable alcohol-based chlorhexidine preparation according to product and facility instructions."
      },
      {
        "id": "opt2",
        "text": "استخدام ماء وصابون معقم فقط دون أي مطهرات جراحية.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: تحضير جلد موقع الجراحة يستلزم مطهراً واسع الطيف وذا فاعلية متبقية مبيدة للجراثيم.",
        "textEn": "Use warm sterile water alone without antiseptic for surgical skin preparation.",
        "rejectionReasonEn": "Rejected: Water alone does not destroy resident cutaneous bacteria or prevent surgical wound contamination."
      },
      {
        "id": "opt3",
        "text": "استخدام محلول كحولي نقي 100% دون إضافة مادة مطهرة مستمرة.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الكحول يتبخر بسرعة ويفتقر إلى التأثير المبيد المتبقي (Residual activity) على سطح الجلد.",
        "textEn": "Use commercial industrial spirit containing methanol and acetone.",
        "rejectionReasonEn": "Rejected: Industrial solvents are highly toxic, corrosive, and strictly prohibited for patient skin."
      }
    ],
    "explanation": "توصي منظمة الصحة العالمية (WHO) باستخدام محلول مطهر جلدي كحولي قائم على غلوكونات الكلورهيكسيدين (CHG-alcohol) لتحضير جلد موقع العمليات الجراحية لدى البالغين.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": false,
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "An adult with intact skin is undergoing surgery and has no contraindication to the planned alcohol-based skin preparation.",
    "promptEn": "Which preparation does WHO recommend?",
    "keyEn": "Use a suitable alcohol-based chlorhexidine preparation according to product and facility instructions.",
    "explanationEn": "Alcohol-based chlorhexidine gluconate skin prep is recommended by WHO and CDC for surgical skin preparation unless contraindicated."
  },
  {
    "id": "SSI-14",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "حساسية موثقة للمطهّر المعتاد قبل تحضير الجلد",
    "prompt": "كيف يتصرف الفريق الجراحي عند وجود حساسية موثقة لمطهر الجلد المعتاد؟",
    "key": "اختر بديلًا معتمدًا وآمنًا للموضع والحساسية.",
    "taskType": "bundle_builder",
    "sceneObject": "antiseptic_allergy",
    "options": [
      {
        "id": "opt1",
        "text": "اختر بديلًا معتمدًا وآمنًا للموضع والحساسية.",
        "isCorrect": true,
        "textEn": "Choose an approved alternative compatible with the surgical site and documented allergy."
      },
      {
        "id": "opt2",
        "text": "استخدام نفس المطهر بجرعة مخففة بالماء المعقم.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: التخفيف لا يمنع رد الفعل التحسسي وقد يسبب صدمة حساسية حادة ويقلل الفاعلية.",
        "textEn": "Apply concentrated chlorhexidine despite documented allergy to test skin tolerance.",
        "rejectionReasonEn": "Rejected: Applying an allergen to surgical skin risks severe anaphylactic shock under anesthesia."
      },
      {
        "id": "opt3",
        "text": "ترك الجلد دون تحضير لتجنب إثارة الحساسية.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: ترك موقع الشق دون تطهير يعرض المريض لخطر تلوث بكتيري هائل من فلورا الجلد.",
        "textEn": "Proceed directly to incision without any antiseptic skin preparation.",
        "rejectionReasonEn": "Rejected: Incising unprepared skin leads to massive inoculation of skin flora into deep sterile tissue planes."
      }
    ],
    "explanation": "عند وجود حساسية موثقة للكلورهيكسيدين، يُستخدم بديل كحولي معتمد مثل بوفيدون اليود الكحولي (أو المائي وفق موانع الكحول) وفق بروتوكول المنشأة المعتمد.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": false,
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "Before skin preparation, the nurse identifies a documented allergy to the usual antiseptic.",
    "promptEn": "What should the team choose?",
    "keyEn": "Choose an approved alternative compatible with the surgical site and documented allergy.",
    "explanationEn": "When chlorhexidine allergy is documented, use an approved alcohol-based povidone-iodine solution or suitable protocol alternative."
  },
  {
    "id": "SSI-15",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "صينية التحضير فيها مطهّر جلدي لا يناسب موضع العملية حسب تعليمات المنتج",
    "prompt": "ما الخطوة الصحيحة عند وجود تعارض بين المطهر وموضع الجراحة (مثل استخدام الكحول قرب الأغشية المخاطية أو العينين)؟",
    "key": "تحقّق من الموضع وتعليمات المستحضر واختر البديل المناسب.",
    "taskType": "spot_error",
    "sceneObject": "prep_tray_mismatch",
    "options": [
      {
        "id": "opt1",
        "text": "تحقّق من الموضع وتعليمات المستحضر واختر البديل المناسب.",
        "isCorrect": true,
        "textEn": "Check the exact operative site and product instructions, then select a suitable approved alternative."
      },
      {
        "id": "opt2",
        "text": "استخدامه بحذر ومسحه سريعاً قبل أن يمتصه النسيج.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: قد يسبب سمية عصبية (Ototoxicity) في الأذن الوسطى أو حروقاً قرنية ومخاطية شديدة.",
        "textEn": "Use flammable alcohol-based prep inside the middle ear cavity and near corneal tissue.",
        "rejectionReasonEn": "Rejected: Alcohol causes permanent ototoxicity, tympanic nerve damage, and severe corneal burns."
      },
      {
        "id": "opt3",
        "text": "تخفيف المطهر بمحلول ملحي واستخدامه في نفس الموضع الحساس.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: التخفيف لا يزيل سمية المادة الكيميائية للأنسجة الحساسة.",
        "textEn": "Dilute the product with tap water until it loses color.",
        "rejectionReasonEn": "Rejected: Diluting prep solutions destroys microbicidal efficacy and introduces tap water bacteria."
      }
    ],
    "explanation": "يجب مطابقة نوع المطهر الجلدي مع الموضع التشريحي؛ فالمستحضرات الكحولية والكلورهيكسيدين ممنوعة في جراحات الأذن الوسطى والعينين والأغشية المخاطية ويُستبدل بمطهر مائي مناسب.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": false,
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "The product on the preparation tray is unsuitable for the operative site according to its labeling.",
    "promptEn": "What should you do before applying any antiseptic?",
    "keyEn": "Check the exact operative site and product instructions, then select a suitable approved alternative.",
    "explanationEn": "Select skin preparation solutions approved for the specific anatomical site; alcohol preparations are contraindicated on mucous membranes and open eyes/ears."
  },
  {
    "id": "SSI-16",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "انخفضت حرارة المريض أثناء العملية",
    "prompt": "ما التدخل الإلزامي للمحافظة على درجة حرارة المريض حول الجراحة (Perioperative normothermia)؟",
    "key": "راقب الحرارة واتخذ تدابير للمحافظة على حرارة طبيعية.",
    "taskType": "bundle_builder",
    "sceneObject": "normothermia",
    "options": [
      {
        "id": "opt1",
        "text": "راقب الحرارة واتخذ تدابير للمحافظة على حرارة طبيعية.",
        "isCorrect": true,
        "textEn": "Continue temperature monitoring and use appropriate measures to maintain normothermia."
      },
      {
        "id": "opt2",
        "text": "ترك المريض بارداً لأن انخفاض الحرارة يقلل النزف واستهلاك الأكسجين.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: انخفاض الحرارة يضعف التروية الدموية، ويشل وظيفة الكريات البيضاء ويرفع خطر SSI بثلاثة أضعاف.",
        "textEn": "Allow hypothermia to worsen to reduce cellular metabolic demand during surgery.",
        "rejectionReasonEn": "Rejected: Hypothermia causes peripheral vasoconstriction, impaired tissue oxygenation, and neutrophil dysfunction."
      },
      {
        "id": "opt3",
        "text": "تدفئة الرأس فقط بضمادات حارة مباشرة دون مراقبة درجة الحرارة المركزية.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: قد تسبب حروقاً؛ تستخدم بطانيات الهواء الدافئ وأجهزة تدفئة السوائل المعتمدة.",
        "textEn": "Immerse the patient's limbs in scalding hot water during the operation.",
        "rejectionReasonEn": "Rejected: Unregulated extreme heat causes severe third-degree thermal burns."
      }
    ],
    "explanation": "توصي إرشادات WHO وCDC بالمحافظة الفعالة على حرارة الجسم الطبيعية (Normothermia ≥ 36°C) أثناء الجراحة باستخدام أجهزة التدفئة بالهواء وتدفئة السوائل الوريدية لتقليل عدوى SSI.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": false,
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "Intraoperative monitoring shows the patient’s temperature falling.",
    "promptEn": "What action should the team take?",
    "keyEn": "Continue temperature monitoring and use appropriate measures to maintain normothermia.",
    "explanationEn": "Maintaining perioperative normothermia (core body temp ≥ 36.0°C) with active warming devices reduces blood loss, cardiac events, and surgical site infections."
  },
  {
    "id": "SSI-17",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "ارتفع سكر الدم حول الجراحة لدى مريض غير معروف بالسكري",
    "prompt": "كيف يُدار ارتفاع سكر الدم المحيط بالجراحة للوقاية من عدوى موضع الشق؟",
    "key": "قيّم السكر واضبطه حسب بروتوكول الفترة المحيطة بالجراحة.",
    "taskType": "bundle_builder",
    "sceneObject": "glycemic_control",
    "options": [
      {
        "id": "opt1",
        "text": "قيّم السكر واضبطه حسب بروتوكول الفترة المحيطة بالجراحة.",
        "isCorrect": true,
        "textEn": "Assess and manage glucose according to the facility’s perioperative protocol."
      },
      {
        "id": "opt2",
        "text": "تجاهل القراءة لأن المريض غير مصاب بالسكري وتعتبر استجابة طبيعية للشدة الجراحية.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: فرط سكر الدم يثبط البلعمة والمناعة ويرفع معدلات SSI بشدة لدى مرضى السكري وغير السكريين على حد سواء.",
        "textEn": "Ignore perioperative hyperglycemia because stress increases glucose naturally in surgery.",
        "rejectionReasonEn": "Rejected: Severe hyperglycemia impairs granulocyte phagocytosis, weakens bactericidal activity, and sharply increases SSI rates."
      },
      {
        "id": "opt3",
        "text": "حقن جرعة أنسولين عشوائية هائلة دون الرجوع للبروتوكول أو مراقبة السكر.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: يعرض المريض لخطر هبوط سكر الدم الشديد المميت (Hypoglycemia) أثناء التخدير.",
        "textEn": "Administer massive IV insulin boluses without monitoring, aiming for glucose < 40 mg/dL.",
        "rejectionReasonEn": "Rejected: Unmonitored insulin causes catastrophic neuroglycopenic hypoglycemia, coma, and death."
      }
    ],
    "explanation": "توصي CDC وWHO بضبط مستوى سكر الدم المحيط بالجراحة (الهدف عموماً < 200 mg/dL) لدى جميع المرضى للحد من عدوى موضع الجراحة.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": false,
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "A patient with no known diabetes develops elevated glucose around the time of surgery.",
    "promptEn": "What should the team do?",
    "keyEn": "Assess and manage glucose according to the facility’s perioperative protocol.",
    "explanationEn": "Perioperative blood glucose control (target < 200 mg/dL or 11.1 mmol/L) in diabetic and non-diabetic patients reduces SSI risk."
  },
  {
    "id": "SSI-18",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "اقتراح وضع مسحوق مضاد ميكروبي في شق مغلق للوقاية الروتينية",
    "prompt": "ما التوصية المعتمدة بشأن التطبيق الروتيني للمساحيق والمراهم المضادة داخل الجرح قبل الإغلاق؟",
    "key": "تجنّب التطبيق الروتيني لهذه المواد على الشق للوقاية.",
    "taskType": "bundle_builder",
    "sceneObject": "wound_powder",
    "options": [
      {
        "id": "opt1",
        "text": "تجنّب التطبيق الروتيني لهذه المواد على الشق للوقاية.",
        "isCorrect": true,
        "textEn": "Avoid routine application of antimicrobial powder to the incision for SSI prevention."
      },
      {
        "id": "opt2",
        "text": "رش مسحوق الفانكومايسين في جميع الجروح النظيفة بشكل روتيني.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: لا توصي به WHO روتينياً لما ينطوي عليه من مخاطر نشوء سلالات مقاومة وسمية نسيجية.",
        "textEn": "Pour topical vancomycin or polymyxin powder into all clean surgical wounds routinely.",
        "rejectionReasonEn": "Rejected: Routine antibiotic powder application lacks consistent clinical trial benefit, may cause local foreign-body reactions, and drives resistance."
      },
      {
        "id": "opt3",
        "text": "سكب محلول بوفيدون اليود الرغوي داخل التجويف البطني قبل إغلاقه.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: يسبب تخريشاً بريتونياً وتكوّن التصاقات وسمية امتصاصية.",
        "textEn": "Dust the open wound with industrial talcum powder to absorb moisture.",
        "rejectionReasonEn": "Rejected: Talcum powder causes granuloma formation, wound adhesion failure, and chronic sterile abscesses."
      }
    ],
    "explanation": "توصي منظمة الصحة العالمية (WHO) بعدم استخدام المساحيق أو المضادات الحيوية الموضعية روتينياً داخل الشق الجراحي قبل الإغلاق للوقاية من SSI.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": false,
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "After incision closure, a clinician proposes applying antimicrobial powder to the incision as routine SSI prophylaxis.",
    "promptEn": "How should the team respond?",
    "keyEn": "Avoid routine application of antimicrobial powder to the incision for SSI prevention.",
    "explanationEn": "Routine intra-incisional application of antimicrobial powders or ointments prior to wound closure is not recommended by WHO and CDC."
  },
  {
    "id": "SSI-19",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "يقترح الفريق تطهير اليدين الجراحي بعد ارتداء القفازات",
    "prompt": "ما الترتيب الإلزامي لخطوات تحضير اليدين الجراحي وارتداء القفازات المعقمة؟",
    "key": "نفّذ تحضير اليدين الجراحي قبل القفازات المعقمة.",
    "taskType": "spot_error",
    "sceneObject": "surgical_scrub_timing",
    "options": [
      {
        "id": "opt1",
        "text": "نفّذ تحضير اليدين الجراحي قبل القفازات المعقمة.",
        "isCorrect": true,
        "textEn": "Perform surgical hand preparation before donning sterile gloves."
      },
      {
        "id": "opt2",
        "text": "الموافقة لأن القفازات معقمة أصلاً وتطهيرها الخارجي يزيد الأمان.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: القفازات قد تثقب مجهرياً أثناء الجراحة، وعدم فرك الأيدي مسبقاً ينقل جراثيم الجلد للجرح فوراً.",
        "textEn": "Put on sterile gloves first, then perform surgical scrub over the gloves.",
        "rejectionReasonEn": "Rejected: Donning unscrubbed hands into gloves allows bacteria to proliferate in the glove sweat fluid, risking contamination if a tear occurs."
      },
      {
        "id": "opt3",
        "text": "ارتداء القفازات المعقمة فوق أيدٍ ملوثة بالدم ثم غسلها بالماء.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: مخالفة صارخة لأبسط قواعد مكافحة العدوى والجراحة الآمنة.",
        "textEn": "Wash hands with cold water for 2 seconds without antiseptic before entering surgery.",
        "rejectionReasonEn": "Rejected: Inadequate hand preparation fails to reduce transient and resident microbial flora."
      }
    ],
    "explanation": "يجب إجراء فرك اليدين الجراحي (Surgical hand scrub) بالصابون المضاد للميكروبات أو المستحضر الكحولي الجراحي قبل ارتداء المئزر والقفازات المعقمة.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": false,
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "A team member proposes completing surgical hand antisepsis after putting on sterile gloves.",
    "promptEn": "What is the correct sequence?",
    "keyEn": "Perform surgical hand preparation before donning sterile gloves.",
    "explanationEn": "Surgical scrub / hand rub must be performed prior to donning sterile surgical attire and sterile gloves."
  },
  {
    "id": "SSI-20",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "جراحة قولون اختيارية لدى بالغ ويقترح التحضير الميكانيكي للأمعاء وحده لمنع SSI",
    "prompt": "ما التوصية المعتمدة لتحضير القولون قبل الجراحات القولونية الاختيارية للوقاية من SSI؟",
    "key": "راجع بروتوكول القولون؛ توصي WHO بالنظر في مضادات فموية مع التحضير الميكانيكي إضافةً إلى الوقاية الوريدية المعتادة.",
    "taskType": "bundle_builder",
    "sceneObject": "bowel_prep",
    "options": [
      {
        "id": "opt1",
        "text": "راجع بروتوكول القولون؛ توصي WHO بالنظر في مضادات فموية مع التحضير الميكانيكي إضافةً إلى الوقاية الوريدية المعتادة.",
        "isCorrect": true,
        "textEn": "Review the colorectal protocol. WHO suggests oral antibiotics combined with mechanical bowel preparation in addition to standard IV prophylaxis."
      },
      {
        "id": "opt2",
        "text": "الاكتفاء بالتحضير الميكانيكي وحده دون إعطاء أي مضادات حيوية فموية أو وريدية.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: التحضير الميكانيكي بمفرده يرفع معدلات تسرب المفاغرة والعدوى مقارنة بدمجه مع المضادات الفموية.",
        "textEn": "Rely strictly on mechanical bowel prep alone without any oral or IV antibiotic prophylaxis.",
        "rejectionReasonEn": "Rejected: Mechanical prep alone without antimicrobial coverage liquefies stool and increases bacterial spillage without antimicrobial kill."
      },
      {
        "id": "opt3",
        "text": "إلغاء الوقاية الوريدية بمجرد تناول المريض للمضادات الفموية.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الوقاية الوريدية الموجهة قبل الشق مباشرة تظل إلزامية لجميع الجراحات القولونية.",
        "textEn": "Avoid all bowel preparation and perform high-volume intra-abdominal enemas during incision.",
        "rejectionReasonEn": "Rejected: Intraoperative abdominal enemas cause massive peritoneal contamination and septic shock."
      }
    ],
    "explanation": "توصي منظمة الصحة العالمية (WHO) بالجمع بين المضادات الحيوية الفموية والتحضير الميكانيكي للأمعاء (MBP + oral antibiotics) بالتوازي مع المضاد الوريدي القياسي في جراحات القولون والمستقيم الاختيارية.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": false,
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "An adult is scheduled for elective colorectal surgery. The proposed bowel preparation consists of mechanical preparation alone.",
    "promptEn": "What should the team review?",
    "keyEn": "Review the colorectal protocol. WHO suggests oral antibiotics combined with mechanical bowel preparation in addition to standard IV prophylaxis.",
    "explanationEn": "WHO guidelines suggest combining oral antibiotics with mechanical bowel preparation (MBP) in addition to standard IV prophylaxis for elective colorectal surgery."
  },
  {
    "id": "SSI-21",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "[تدقيق] دوّن أمر المضاد الساعة 07:00 والشق 08:00، ووقت الإعطاء مفقود",
    "prompt": "ما الحكم التدقيقي السليم بشأن توقيت إعطاء الجرعة الوقائية؟",
    "key": "التوقيت غير مؤكّد؛ راجع سجل الإعطاء الفعلي.",
    "taskType": "record_audit",
    "auditType": "documentation_gap",
    "options": [
      {
        "id": "opt1",
        "text": "التوقيت غير مؤكّد؛ راجع سجل الإعطاء الفعلي.",
        "isCorrect": true,
        "textEn": "Not documented. Verify actual administration in the medication record before crediting timing."
      },
      {
        "id": "opt2",
        "text": "افتراض أن المضاد أُعطي عند كتابة الأمر الساعة 07:00 واحتساب البند ناجحاً.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: أمر الوصفة الطبية لا يثبت وقت الإعطاء التمريضي الفعلي في السجل الدوائي.",
        "textEn": "Credit antibiotic timing based solely on the prescription order time of 07:00.",
        "rejectionReasonEn": "Rejected: Prescription orders indicate intent, not actual drug administration or pharmacokinetic timing."
      },
      {
        "id": "opt3",
        "text": "تسجيل مخالفة إعطاء بعد الشق وتغريم الممرض.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: لا يوجد إثبات على وقت الإعطاء؛ التصنيف الصحيح هو «غير موثق» يستلزم استكمال التحقق.",
        "textEn": "Falsify the surgical log by backdating the administration time to 07:30.",
        "rejectionReasonEn": "Rejected: Fabricating medical administration timestamps violates professional licensing and data integrity."
      }
    ],
    "explanation": "عدم توثيق وقت الإعطاء الفعلي يمنع إثبات اكتمال بند التوقيت في حزمة SSI؛ يجب مراجعة سجل الإعطاء التمريضي وسجل التخدير للتحقق.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": true,
    "auditAnswer": "غير موثّق",
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "The prophylactic antibiotic was ordered at 07:00 and the incision was made at 08:00. There is no recorded administration time.",
    "promptEn": "How should the timing item be scored?",
    "keyEn": "Not documented. Verify actual administration in the medication record before crediting timing.",
    "explanationEn": "An order alone without a recorded administration timestamp in the medication administration record cannot be credited as timely; verify actual delivery."
  },
  {
    "id": "SSI-22",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "[تدقيق] لا توجد إزالة شعر لأنه لا يعوق الجراحة",
    "prompt": "كيف يُقيّم مدقق مكافحة العدوى قرار ترك الشعر في مكانه؟",
    "key": "القرار سليم؛ اقبل ترك الشعر وقيّم بند طريقة الإزالة فقط عند الحاجة.",
    "taskType": "record_audit",
    "auditType": "proper_practice",
    "options": [
      {
        "id": "opt1",
        "text": "القرار سليم؛ اقبل ترك الشعر وقيّم بند طريقة الإزالة فقط عند الحاجة.",
        "isCorrect": true,
        "textEn": "Accept leaving the hair in place. Mark the removal method Not applicable and record the reason."
      },
      {
        "id": "opt2",
        "text": "تسجيل مخالفة بسبب عدم استخدام ماكينة القص الكهربائية.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: ترك الشعر هو الخيار المثالي الأول عندما لا يعوق الجراحة.",
        "textEn": "Mark the entire surgical prep as 'Failed' because hair was not completely shaved.",
        "rejectionReasonEn": "Rejected: Preserving intact hair without shaving is the evidence-based gold standard in modern surgical care."
      },
      {
        "id": "opt3",
        "text": "استبعاد المريض بالكامل من تدقيق جراحة اليوم.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: تنطبق عليه بقية بنود الحزمة كالتحضير الجلدي والتوقيت والحرارة.",
        "textEn": "Cancel the surgical procedure until the patient is shorn completely bald.",
        "rejectionReasonEn": "Rejected: Canceling surgery for non-interfering hair violates clinical indications and patient safety."
      }
    ],
    "explanation": "ترك الشعر هو الممارسة المثلى الموصى بها؛ يُعتبر بند إزالة الشعر مستوفياً ومطابقاً لمعايير الوقاية، ويُقيّم استخدام ماكينة القص فقط عندما تستدعي الحاجة إزالة الشعر.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": true,
    "auditAnswer": "تم",
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "The operative record confirms that hair was left in place because it did not interfere with surgery.",
    "promptEn": "How should the hair-removal method item be scored?",
    "keyEn": "Accept leaving the hair in place. Mark the removal method Not applicable and record the reason.",
    "explanationEn": "Leaving hair in place when it does not interfere with incision adheres to guidelines; score removal as Not Applicable with documented rationale."
  },
  {
    "id": "SSI-23",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "[تدقيق] ملف الجراحة فيه استثناء موثق للمطهر المعتاد واستعمال بديل مناسب",
    "prompt": "ما التقييم التدقيقي لاستخدام مطهر بديل بسبب حساسية موثقة؟",
    "key": "اقبل البديل الموثق وفق البروتوكول.",
    "taskType": "record_audit",
    "auditType": "valid_contraindication",
    "options": [
      {
        "id": "opt1",
        "text": "اقبل البديل الموثق وفق البروتوكول.",
        "isCorrect": true,
        "textEn": "Credit the documented preparation with the appropriate alternative."
      },
      {
        "id": "opt2",
        "text": "رفض الملف لعدم استخدام الكلورهيكسيدين الكحولي القياسي.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: الحساسية الموثقة مانع طبي مشروع واستخدام البديل المعتمد يحمي المريض ويحقق العقامة.",
        "textEn": "Score the skin preparation as Failed because chlorhexidine was not utilized.",
        "rejectionReasonEn": "Rejected: Guidelines encourage documented appropriate alternatives when the primary agent is clinically contraindicated."
      },
      {
        "id": "opt3",
        "text": "تسجيل مخالفة لفريق التمريض.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: تصرف الطاقم سليم ومطابق لإدارة الاستثناءات الطبية.",
        "textEn": "Issue a quality violation notice to the surgical team for respecting patient allergies.",
        "rejectionReasonEn": "Rejected: Documented allergies are legitimate medical reasons for protocol-approved product substitution."
      }
    ],
    "explanation": "تُقبل الاستثناءات الطبية المشروعة والموثقة كالحساسية لمطهر معين، ويُحتسب البند مستوفياً عند استخدام البديل المعتمد وفق بروتوكول المنشأة.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": true,
    "auditAnswer": "تم",
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "The operative record documents an exception to the usual antiseptic and confirms use of a protocol-approved alternative suitable for the site.",
    "promptEn": "How should the preparation be scored?",
    "keyEn": "Credit the documented preparation with the appropriate alternative.",
    "explanationEn": "Using a protocol-approved alternative antiseptic (e.g. povidone-iodine) for a documented contraindication is fully compliant with bundle guidelines."
  },
  {
    "id": "SSI-24",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "[تدقيق] نموذج الوقاية مكتمل لكن توقيت الجرعة المرصود كان بعد الشق رغم استطبابها قبل الشق",
    "prompt": "ما التقييم التدقيقي عند حدوث تناقض بين التوقيعات الورقية وتوقيت الإعطاء المرصود؟",
    "key": "غير مكتمل؛ صحّح التناقض وناقش سبب التأخر.",
    "taskType": "record_audit",
    "auditType": "timing_violation",
    "options": [
      {
        "id": "opt1",
        "text": "غير مكتمل؛ صحّح التناقض وناقش سبب التأخر.",
        "isCorrect": true,
        "textEn": "Not done. Reconcile the discrepancy and review the reason for the delay."
      },
      {
        "id": "opt2",
        "text": "قبول الجولة لأن النموذج يحمل توقيعات الفريق كاملة.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: توقيت الإعطاء المرصود خالف النافذة الوقائية وأعطي بعد الشق، مما يبطل اكتمال الحزمة.",
        "textEn": "Score prophylaxis as Done based strictly on the surgeon's signature on the checklist.",
        "rejectionReasonEn": "Rejected: Direct visual confirmation of delayed administration proves the clinical bundle element was missed."
      },
      {
        "id": "opt3",
        "text": "تعديل وقت الشق في السجل ليتوافق مع وقت الدواء.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: تزوير وتضليل طبي خطير يخالف النزاهة المهنية.",
        "textEn": "Mark the audit as Not Applicable because the patient tolerated the procedure well.",
        "rejectionReasonEn": "Rejected: Prophylaxis timing is a mandatory quality measure that cannot be marked not applicable."
      }
    ],
    "explanation": "توقيت المضاد بعد الشق مخالفة صريحة لمعيار الحزمة حتى لو وُقّع النموذج؛ يُسجل البند غير مكتمل وتُناقش أسباب التأخير لمنع تكرارها.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": true,
    "auditAnswer": "لم يتم",
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "The prophylaxis checklist is signed complete. Direct observation confirms the indicated first dose was given after incision.",
    "promptEn": "How should the timing item be scored?",
    "keyEn": "Not done. Reconcile the discrepancy and review the reason for the delay.",
    "explanationEn": "In audit, direct clinical observation revealing post-incision antibiotic administration overrides a signed checklist; score as Not Done."
  },
  {
    "id": "SSI-25",
    "bundle": "SSI",
    "bundleNameAr": "SSI — عدوى موضع الجراحة",
    "vignette": "[تدقيق] في عشر عمليات مؤهلة، ثمانٍ استوفت كل بنود التدقيق، واثنتان فات كلًا منهما بند مختلف",
    "prompt": "ما نسبة الالتزام الكامل وما التحليل الإحصائي المطلوب لتحسين الجودة؟",
    "key": "الالتزام الكامل 80%؛ اعرض أداء كل بند على حدة لتحليل الفجوة.",
    "taskType": "record_audit",
    "auditType": "calculation",
    "calculation": {
      "numerator": 8,
      "denominator": 10,
      "percentage": 80
    },
    "options": [
      {
        "id": "opt1",
        "text": "الالتزام الكامل 80%؛ اعرض أداء كل بند على حدة لتحليل الفجوة.",
        "isCorrect": true,
        "textEn": "Full compliance is 80% (8 ÷ 10). Report item-level results to show the two distinct gaps."
      },
      {
        "id": "opt2",
        "text": "الالتزام الكامل 90% بحساب متوسط نسب البنود المنفذة فردياً.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: معيار الحزمة يعتمد على اكتمال جميع البنود المؤهلة للفرصة الواحدة (8 ÷ 10 = 80%).",
        "textEn": "Report compliance as 100% by ignoring the 2 missed items as minor deviations.",
        "rejectionReasonEn": "Rejected: All-or-none bundle auditing requires all components to be met; minor deviations cannot be ignored."
      },
      {
        "id": "opt3",
        "text": "استبعاد الحالتين الناقصتين من التقرير الشهري.",
        "isCorrect": false,
        "rejectionReason": "مرفوض: يمنع اكتشاف الفجوات السريرية ويضلل إدارة الجودة.",
        "textEn": "Report compliance as 80% and conclude that 20% of the audited patients have active wound infections.",
        "rejectionReasonEn": "Rejected: Process measures evaluate adherence to preventive standards, not clinical diagnostic infection rates."
      }
    ],
    "explanation": "الالتزام الكامل بالحزمة = 8 ÷ 10 × 100 = 80%. ويتم عرض أداء كل بند بشكل منفصل (Item-by-item analysis) لتشخيص الفجوات المحددة ومعالجتها.",
    "sourceKeys": [
      "S1",
      "S2"
    ],
    "isAudit": true,
    "auditAnswer": "تم",
    "bundleNameEn": "SSI — Surgical Site Infection",
    "vignetteEn": "Of 10 eligible operations, eight met all audit elements. Each of the other two missed a different item.",
    "promptEn": "What should the audit report?",
    "keyEn": "Full compliance is 80% (8 ÷ 10). Report item-level results to show the two distinct gaps.",
    "explanationEn": "Full bundle compliance = 8 ÷ 10 × 100 = 80%. Report item-by-item results to diagnose and remediate specific process gaps."
  }
];


// =========================================================================
// 🎴 ANTIGRAVITY ADDENDUM: THE HANDOVER (BEDSIDE CLINICAL HANDOVER PRACTICE)
// =========================================================================
const HAI_HANDOVER_CASES = [
  {
    id: "HO-CAUTI-01",
    code: "HO-CAUTI-01",
    title: "The transfer",
    deck: "CAUTI",
    deckName: "CAUTI Bundle Deck",
    deckIcon: "💧",
    facilityForm: "Form CAUTI-F-02: Adult Inpatient Nursing Flowsheet & Catheter Maintenance Bundle",
    checklistRow: "Row 3: Dependent Drainage & Bag Position (Below bladder level, unkinked)",
    sourceReview: false,
    status: "verified",
    bundleReference: "CDC CAUTI Guidelines (2009) & CDC Catheter Clinical Safety (2025)",
    
    // Step 1: Voice Handover
    voiceHandover: "The patient has just returned to the ward. Please check the urinary drainage setup after the transfer.",
    voiceSpeaker: "PACU Handover Nurse",
    
    // Step 2: Evidence - Room
    roomEvidence: {
      title: "Bedside Setup — Bed 4B",
      patientSummary: "Adult male, post-laparotomy, 16 Fr Foley catheter connected to closed drainage system.",
      bagPosition: "above_bladder", // 'above_bladder' | 'below_bladder'
      tubingState: "kinked", // 'kinked' | 'clear'
      notes: "Collection bag is hung on the upper side rail above bladder height. Catheter tubing is looped and kinked under the patient's right thigh."
    },

    // Step 2: Evidence - Chart
    chartEvidence: {
      title: "Electronic Health Record (EHR) — Transfer Record",
      records: [
        {
          id: "rec-transfer",
          name: "PACU Transfer Summary (14:30)",
          body: "Patient transferred via gurney to surgical unit bed 4B. Alert, vital signs stable. 16 Fr indwelling urinary catheter in situ draining clear amber urine. Handover delivered to receiving ward RN."
        },
        {
          id: "rec-protocol",
          name: "Facility CAUTI Maintenance Standard (Form CAUTI-F-02)",
          body: "Maintain continuous, unobstructed gravity flow of urine. The collection bag MUST remain below the level of the patient's bladder at all times without resting on the floor. Tubing must be free from kinks, loops, and external compression."
        }
      ]
    },

    // Step 3: Question & Actions
    question: "Correct the drainage setup.",
    targetState: {
      bagLowered: true,
      kinkCleared: true
    },
    actions: [
      {
        id: "lower_bag",
        label: "Lower Drainage Bag Below Bladder Level",
        ariaLabel: "Move drainage bag from upper rail to lower bed frame hanger below bladder level",
        keyHint: "Press 1 or Click",
        effect: "bagLowered"
      },
      {
        id: "clear_kink",
        label: "Clear Tubing Kink from Under Thigh",
        ariaLabel: "Reposition and straighten drainage tubing from under the thigh",
        keyHint: "Press 2 or Click",
        effect: "kinkCleared"
      }
    ],

    feedbackMessages: {
      bagOnly: "The bag is below bladder level. Check the tubing.",
      kinkOnly: "The tubing is clear. Check the bag position.",
      bothDone: "Both drainage issues are corrected. Reassess flow."
    },

    // Step 4: Explain Step
    explainQuestion: "Which clinical evidence supports this corrective action?",
    explainOptions: [
      {
        id: "opt1",
        text: "Dependent drainage below bladder level prevents urine stasis and retrograde reflux of colonized urine into the bladder.",
        isCorrect: true,
        feedback: "Correct: Maintaining dependent gravity drainage prevents retrograde flow and intraluminal migration of bacteria (CDC CAUTI 2009 / 2025)."
      },
      {
        id: "opt2",
        text: "Elevating the bag above bladder level during transfers reduces floor contamination risk.",
        isCorrect: false,
        feedback: "Incorrect: The bag must never be raised above bladder level; doing so causes immediate backflow of contaminated urine into the bladder."
      },
      {
        id: "opt3",
        text: "Kinking the tubing is an acceptable method to test bladder sensation after transfer.",
        isCorrect: false,
        feedback: "Incorrect: Kinking obstructs drainage, causes urinary retention, and increases risk of infection."
      }
    ],
    keyedExplanation: "Urinary drainage bags must always be positioned below the level of the bladder to ensure continuous downward drainage and prevent retrograde contamination. Tubing must be kept straight and free of mechanical compression or kinks (CDC CAUTI 2009, 2025; Form CAUTI-F-02, Row 3).",

    // Step 5: Model Hand-off
    modelHandoff: "After transfer, the bag was above bladder level and the tubing was kinked. I corrected both and reassessed drainage."
  },

  {
    id: "HO-CVC-01",
    code: "HO-CVC-01",
    title: "The signed checklist",
    deck: "CLABSI",
    deckName: "CLABSI / CVC Bundle Deck",
    deckIcon: "🩸",
    facilityForm: "Form IPC-CL-04: Central Venous Catheter Insertion Safety Checklist",
    checklistRow: "Row 4: Maximal Sterile Barrier Precautions (Cap, Mask, Sterile Gown, Sterile Gloves, Full-Body Drape)",
    sourceReview: false,
    status: "verified",
    bundleReference: "WHO Central Venous Catheter Guideline (2026, Part 2) & CDC Intravascular Catheter Recommendations",

    // Step 1: Voice Handover
    voiceHandover: "The team is preparing for central line insertion. The signed checklist marks the sterile barrier setup complete.",
    voiceSpeaker: "Procedure Observer / Circulating Nurse",

    // Step 2: Evidence - Room & Chart
    roomEvidence: {
      title: "Bedside Procedure Cart & Sterile Field",
      patientSummary: "Adult oncology patient prepped for right internal jugular CVC placement.",
      drapeType: "small_drape", // 'small_drape' | 'full_body_drape'
      operatorPPE: "complete", // cap, mask, sterile gown, sterile gloves
      otherEquipment: "Ultrasound machine with sterile probe cover, chlorhexidine 2% in 70% IPA applicator, sterile suture kit, sterile dressings."
    },

    chartEvidence: {
      title: "Central Line Insertion Safety Checklist (Form IPC-CL-04)",
      records: [
        {
          id: "rec-chk-cvc",
          name: "Insertion Safety Checklist (Pre-Puncture Verification)",
          body: "Item 1: Clinical indication confirmed — [Checked]\nItem 2: Hand hygiene performed before donning — [Checked]\nItem 3: Skin prep: 2% Chlorhexidine in 70% alcohol allowed to dry — [Checked]\nItem 4: Maximal Sterile Barrier Precautions (Cap, Mask, Sterile Gown, Sterile Gloves, Full-Body Drape) — [CHECKED & SIGNED BY OPERATOR]\nItem 5: Ultrasound guidance prepared — [Checked]"
        }
      ]
    },

    // Step 3: Question & Actions
    question: "Is the documented barrier setup supported by what you see? Select the observation and corrective action.",
    auditOptions: [
      { id: "done", label: "Done", isCorrect: false },
      { id: "not_done", label: "Not done", isCorrect: true, note: "Checklist marks full barrier, but physical inspection reveals only a small drape." },
      { id: "not_doc", label: "Not documented", isCorrect: false },
      { id: "na", label: "Not applicable", isCorrect: false }
    ],
    actions: [
      {
        id: "add_full_drape",
        label: "Record Discrepancy & Add Full-Body Sterile Drape",
        ariaLabel: "Record discrepancy on checklist and add full-body sterile drape before skin puncture",
        keyHint: "Press 1 or Click",
        effect: "fullDrapeAdded"
      }
    ],

    feedbackMessages: {
      correctAction: "Discrepancy recorded: The checklist recorded maximal barriers, but only a small drape was present. Full-body sterile drape added before skin puncture."
    },

    // Step 4: Explain Step
    explainQuestion: "Which evidence explains why the signed checklist cannot be accepted as complete?",
    explainOptions: [
      {
        id: "exp-1",
        text: "Physical inspection showed only a small drape. Maximal sterile barrier precautions strictly require a full-body sterile drape covering the entire patient to protect the guidewire and catheter path.",
        isCorrect: true,
        feedback: "Correct: A full-body sterile drape is an indispensable component of maximal sterile barriers. The checklist discrepancy must be resolved before proceeding (WHO 2026, CDC 2011/2024)."
      },
      {
        id: "exp-2",
        text: "Small drapes are permissible if chlorhexidine is applied over a 20 cm radius.",
        isCorrect: false,
        feedback: "Incorrect: Chlorhexidine prep does not replace mechanical full-body draping."
      },
      {
        id: "exp-3",
        text: "The operator's signature overrides the physical observation once signed.",
        isCorrect: false,
        feedback: "Incorrect: Direct observation takes precedence in procedural safety stops. Breaches must be paused and corrected before skin puncture."
      }
    ],
    keyedExplanation: "Maximal sterile barrier precautions require cap, mask, sterile gown, sterile gloves, and a full-body sterile drape. Direct observation revealed only a small local drape despite a signed checklist. The item is scored 'Not done', the discrepancy recorded, and the full-body drape provided before insertion (WHO 2026, Form IPC-CL-04, Row 4).",

    // Step 5: Model Hand-off
    modelHandoff: "The checklist was signed, but the setup showed only a small drape. I flagged the discrepancy and requested the full-body sterile drape before insertion."
  },

  {
    id: "HO-SSI-01",
    code: "HO-SSI-01",
    title: "Three records",
    deck: "SSI",
    deckName: "SSI Bundle Deck",
    deckIcon: "🩹",
    facilityForm: "Form OR-SSI-01: Surgical Antimicrobial Prophylaxis Audit Form",
    checklistRow: "Row 2: Pre-incision Antibiotic Prophylaxis Timing Verification",
    sourceReview: false,
    status: "verified",
    bundleReference: "WHO Guidelines for the Prevention of Surgical Site Infections (2018) & CDC SSI Guideline (2017)",

    // Step 1: Voice Handover
    voiceHandover: "We’re reviewing surgical prophylaxis after the operation. The medication order and incision time are available.",
    voiceSpeaker: "Surgical Quality Auditor",

    // Step 2: Evidence - Room
    roomEvidence: {
      title: "Surgical Audit Desk & PACU Recovery",
      patientSummary: "Adult post-laparotomy patient, recovery bed 6. Prophylaxis timing audit.",
      description: "Post-operative surgical record review desk with operative nursing log, anesthesia eMAR, and pre-op order sheet."
    },

    // Step 2: Evidence - Chart
    chartEvidence: {
      title: "Post-Operative Record Audit — Three Independent Records",
      records: [
        {
          id: "rec-order",
          title: "Record 1: Pre-Op Medication Order",
          content: "Date: Today | Time Placed: 07:00\nRx: Cefazolin 2g IV piggyback, pre-op surgical prophylaxis.\nOrdered by: Dr. N. Vance, MD (Attending Surgeon)"
        },
        {
          id: "rec-incision",
          title: "Record 2: Operating Room Circulating Nurse Log",
          content: "Patient In OR Suite: 07:40\nAnesthesia Induction: 07:45\nSurgical Incision Time: 08:00\nProcedure: Open cholecystectomy\nIncision Close: 09:15"
        },
        {
          id: "rec-emar",
          title: "Record 3: Anesthesia Medication Administration Record (eMAR)",
          content: "Medication: Cefazolin 2g IV\nStatus: Ordered at 07:00\nAdministration Time: [ NOT RECORDED / BLANK ]\nAdministered by: [ BLANK ]"
        }
      ]
    },

    // Step 3: Question & Actions
    question: "Can you verify prophylaxis timing? Record the audit finding and choose the next step.",
    auditOptions: [
      { id: "done", label: "Done", isCorrect: false },
      { id: "not_done", label: "Not done", isCorrect: false },
      { id: "not_doc", label: "Not documented", isCorrect: true, note: "Order placed at 07:00 and incision at 08:00, but administration time is missing." },
      { id: "na", label: "Not applicable", isCorrect: false }
    ],
    actions: [
      {
        id: "seek_admin_record",
        label: "Record 'Not documented' & Query Anesthesia Log for Admin Time",
        ariaLabel: "Record timing as Not documented and query anesthesia log for verified administration timestamp",
        keyHint: "Press 1 or Click",
        effect: "auditRecorded"
      }
    ],

    feedbackMessages: {
      correctAction: "Timing classified as 'Not documented'. Order time (07:00) does not establish administration time. Actual administration record must be sought."
    },

    // Step 4: Explain Step
    explainQuestion: "Why is an order time of 07:00 insufficient to verify prophylaxis timing for an 08:00 incision?",
    explainOptions: [
      {
        id: "exp-1",
        text: "The order time only documents when the medication was requested. Prophylaxis compliance requires verified administration within 60 minutes prior to surgical incision to ensure therapeutic bactericidal tissue levels.",
        isCorrect: true,
        feedback: "Correct: Order time ≠ Administration time. Prophylaxis must be verified as administered within 60 minutes before skin incision (WHO 2018, CDC 2017)."
      },
      {
        id: "exp-2",
        text: "An order placed exactly 60 minutes before incision automatically counts as timely administration.",
        isCorrect: false,
        feedback: "Incorrect: Order placement does not confirm the drug was actually infused or reached the patient before skin cut."
      },
      {
        id: "exp-3",
        text: "Cefazolin requires 120 minutes of pre-incision infusion time.",
        isCorrect: false,
        feedback: "Incorrect: Standard cephalosporins like Cefazolin require administration within 60 minutes prior to incision (120 mins is reserved for vancomycin or fluoroquinolones)."
      }
    ],
    keyedExplanation: "Prophylaxis compliance evaluates whether the antibiotic was administered within 60 minutes prior to surgical incision. The order timestamp (07:00) does not prove administration occurred. Because administration time was omitted from the eMAR, the audit measure is 'Not documented' (Form OR-SSI-01, Row 2; WHO 2018).",

    // Step 5: Model Hand-off
    modelHandoff: "I could confirm the order and incision times. I could not verify when the dose was given, so I flagged the missing administration time.",

    hasReplayVariant: true,
    replayVariantId: "HO-SSI-02"
  },

  {
    id: "HO-SSI-02",
    code: "HO-SSI-02",
    title: "Three records (Replay variant: 08:10 administration)",
    deck: "SSI",
    deckName: "SSI Bundle Deck",
    deckIcon: "🩹",
    facilityForm: "Form OR-SSI-01: Surgical Antimicrobial Prophylaxis Audit Form",
    checklistRow: "Row 2: Pre-incision Timing Verification (Pre-incision administration within 60 min)",
    sourceReview: false,
    status: "verified",
    bundleReference: "WHO Guidelines for the Prevention of Surgical Site Infections (2018) & CDC SSI Guideline (2017)",
    isReplayVariant: true,

    // Step 1: Voice Handover
    voiceHandover: "We’re reviewing surgical prophylaxis after the operation. Let's reassess with the updated anesthesia log.",
    voiceSpeaker: "Surgical Quality Auditor",

    // Step 2: Evidence - Room
    roomEvidence: {
      title: "Surgical Audit Desk (Updated Anesthesia Log)",
      patientSummary: "Adult post-laparotomy patient, recovery bed 6. Updated eMAR administration log at 08:10.",
      description: "Post-operative surgical record review desk with operative nursing log and updated anesthesia eMAR."
    },

    // Step 2: Evidence - Chart
    chartEvidence: {
      title: "Post-Operative Record Audit — Three Independent Records",
      records: [
        {
          id: "rec-order",
          title: "Record 1: Pre-Op Medication Order",
          content: "Date: Today | Time Placed: 07:00\nRx: Cefazolin 2g IV piggyback, pre-op surgical prophylaxis.\nOrdered by: Dr. N. Vance, MD (Attending Surgeon)"
        },
        {
          id: "rec-incision",
          title: "Record 2: Operating Room Circulating Nurse Log",
          content: "Patient In OR Suite: 07:40\nAnesthesia Induction: 07:45\nSurgical Incision Time: 08:00\nProcedure: Open cholecystectomy\nIncision Close: 09:15"
        },
        {
          id: "rec-emar",
          title: "Record 3: Updated Anesthesia Administration Record (eMAR)",
          content: "Medication: Cefazolin 2g IV\nStatus: Administered\nAdministration Time: 08:10 (Post-incision)\nAdministered by: CRNA M. Davis"
        }
      ]
    },

    // Step 3: Question & Actions
    question: "Can you verify prophylaxis timing? Record the audit finding and choose the next step.",
    auditOptions: [
      { id: "done", label: "Done", isCorrect: false },
      { id: "not_done", label: "Not done", isCorrect: true, note: "Dose administered at 08:10, 10 minutes AFTER surgical incision at 08:00." },
      { id: "not_doc", label: "Not documented", isCorrect: false },
      { id: "na", label: "Not applicable", isCorrect: false }
    ],
    actions: [
      {
        id: "flag_late_admin",
        label: "Record 'Not done' & Flag Post-Incision Timing Variance",
        ariaLabel: "Record timing as Not done and flag late post-incision administration in surgical debrief",
        keyHint: "Press 1 or Click",
        effect: "auditRecorded"
      }
    ],

    feedbackMessages: {
      correctAction: "Timing classified as 'Not done'. Prophylaxis administered at 08:10, 10 minutes after incision (08:00). Antibiotic tissue concentrations were insufficient at skin cut."
    },

    // Step 4: Explain Step
    explainQuestion: "Why is administration at 08:10 scored as 'Not done' when incision occurred at 08:00?",
    explainOptions: [
      {
        id: "exp-1",
        text: "Surgical antimicrobial prophylaxis must be administered prior to incision so that adequate tissue concentrations are established before tissue opening. Administration post-incision fails the prevention criteria.",
        isCorrect: true,
        feedback: "Correct: Once the skin barrier is broken, bactericidal tissue levels must already be present. Infusion after incision is ineffective at preventing intraoperative contamination (WHO 2018, CDC 2017)."
      },
      {
        id: "exp-2",
        text: "A 10-minute delay after incision is permitted under CDC guidelines.",
        isCorrect: false,
        feedback: "Incorrect: Post-incision administration does not meet prophylaxis bundle standards."
      },
      {
        id: "exp-3",
        text: "The dose should have been doubled because it was administered late.",
        isCorrect: false,
        feedback: "Incorrect: Late administration requires variance reporting and review, not arbitrary dose doubling."
      }
    ],
    keyedExplanation: "Under local protocol and WHO/CDC guidelines, antibiotic prophylaxis must be administered within 60 minutes prior to incision. Because administration occurred at 08:10 (10 minutes after knife-to-skin at 08:00), the measure is 'Not done' and the timing discrepancy must be reviewed in surgical debrief (Form OR-SSI-01, Row 2).",

    // Step 5: Model Hand-off
    modelHandoff: "The order was placed at 07:00 and incision was at 08:00, but the dose was given at 08:10 post-incision. I recorded Not done and flagged the variance."
  },

  {
    id: "HO-VAP-01",
    code: "HO-VAP-01",
    title: "Return later",
    deck: "VAP",
    deckName: "VAP / ICU Ventilator Bundle Deck",
    deckIcon: "🫁",
    facilityForm: "Form ICU-VENT-01: Mechanical Ventilation Care Bundle Daily Flowsheet",
    checklistRow: "Row 1: Head of Bed Elevation (30°–45° unless contraindicated/restricted)",
    sourceReview: false,
    status: "verified",
    bundleReference: "SHEA/IDSA/APIC Practice Recommendation (2022) & CDC Stacks V1",

    // Step 1: Voice Handover
    voiceHandover: "The patient has a temporary positioning restriction. Please check the order before adjusting the bed.",
    voiceSpeaker: "ICU Night Charge RN",

    // Step 2: Evidence - Room
    roomEvidence: {
      title: "ICU Bed 12 — Mechanical Ventilation Suite",
      patientSummary: "Intubated adult trauma patient on mechanical ventilation, cervical collar in situ.",
      description: "ICU room with ventilator tower, endotracheal circuit, and adjustable head-of-bed angle indicator."
    },

    chartEvidence: {
      title: "ICU Ventilator Bundle Daily Maintenance Flowsheet (Form ICU-VENT-01)",
      records: [
        {
          id: "rec-vap-flow",
          name: "Ventilator Bundle Daily Flowsheet (Form ICU-VENT-01)",
          body: "Standard Bundle Requirement: Maintain head-of-bed elevation at 30°–45° at all times unless contraindicated or restricted by physician order.\nDocumentation: If contraindication active, record clinical reason and scheduled reassessment time."
        }
      ]
    },

    // Step 2 & 3: Two Visits Flow
    currentVisit: 1, // 1 or 2

    // Visit 1 Setup
    visit1: {
      time: "08:00",
      bedAngle: 0, // Flat
      restrictionActive: true,
      chartRecord: "Order: Trauma service cervical spine clearance pending. Acute hemodynamic instability protocol active until 14:00. Maintain flat supine (0°–10°). Reassess elevation safety at 14:00.",
      actionPrompt: "Follow the active positioning restriction and record the scheduled reassessment time:",
      actionLabel: "Record Restriction Active (Maintain Flat; Reassess at 14:00)",
      feedback: "The bed stayed flat while the restriction was active. Reassessment scheduled for 14:00."
    },

    // Visit 2 Setup (after 'Return later' clicked)
    visit2: {
      time: "14:00",
      restrictionActive: false,
      chartRecord: "14:00 Progress Note: Spine cleared by trauma team. Hemodynamics stable on minimal support. Positioning restriction EXPIRED. Resume ICU ventilator bundle: Elevate head-of-bed to 30°–45° unless contraindicated.",
      actionPrompt: "Restriction has cleared. Reassess safety and restore bundle-compliant head-of-bed elevation:",
      targetAngle: 35, // 30-45 deg
      actions: [
        { angle: 0, label: "0° (Flat)" },
        { angle: 15, label: "15° (Sub-optimal)" },
        { angle: 35, label: "35° (Bundle Compliant: 30°–45°)" },
        { angle: 45, label: "45° (Bundle Compliant: 30°–45°)" }
      ],
      feedback: "Head of bed elevated to 35° (bundle compliant: 30°–45°). Aspiration risk reduced."
    },

    // Step 4: Explain Step
    explainQuestion: "Why was the bed kept flat initially, and why must it now be elevated to 30°–45°?",
    explainOptions: [
      {
        id: "exp-1",
        text: "An active documented medical restriction takes priority over routine elevation. Once the restriction ends, elevating the head of bed to 30°–45° significantly reduces aspiration and ventilator-associated pneumonia.",
        isCorrect: true,
        feedback: "Correct: Bundles allow temporary documented clinical exceptions. As soon as the restriction clears, the compliant 30°–45° elevation must be restored (SHEA 2022, CDC V1)."
      },
      {
        id: "exp-2",
        text: "The ventilator bundle strictly forbids elevating the bed beyond 15 degrees in any trauma patient.",
        isCorrect: false,
        feedback: "Incorrect: Once spine clearance is obtained and hemodynamics stabilize, 30°–45° is standard."
      },
      {
        id: "exp-3",
        text: "Head of bed elevation has no documented effect on aspiration prevention.",
        isCorrect: false,
        feedback: "Incorrect: 30°–45° elevation is a core evidence-based recommendation across all major critical care guidelines."
      }
    ],
    keyedExplanation: "Maintaining head-of-bed elevation at 30°–45° prevents aspiration of gastric contents and reduces VAP risk. When a medical contraindication or temporary restriction is active, the exception and scheduled reassessment must be documented. Prompt reassessment and elevation restoration upon restriction expiry fulfills the bundle (Form ICU-VENT-01, Row 1; SHEA 2022).",

    // Step 5: Model Hand-off
    modelHandoff: "The bed stayed flat while the restriction was active. I reassessed after it ended and adjusted the position when it was safe."
  },

  {
    id: "HO-DRAFT-01",
    code: "HO-DRAFT-01",
    title: "Gastric residual volume protocol (Draft)",
    deck: "VAP",
    deckName: "VAP / Nutrition Deck",
    deckIcon: "🫁",
    facilityForm: "Form IPC-DRAFT-09: Enteral Feeding & Aspiration Risk (Pending Committee Review)",
    checklistRow: "Row 5: Gastric Residual Volume Checks (Pending standard threshold approval)",
    sourceReview: true, // EXCLUDED from student practice!
    status: "source_review",
    bundleReference: "Facility Clinical Practice Committee Review Draft (2026)",

    voiceHandover: "We are evaluating a draft checklist for enteral nutrition tolerance. This card is pending committee validation.",
    voiceSpeaker: "Clinical Nurse Specialist",
    roomEvidence: {
      title: "ICU Bedside Feed Pump Setup",
      description: "Enteral nutrition infusion in progress via nasogastric tube."
    },
    chartEvidence: {
      title: "Draft Flowsheet (Form IPC-DRAFT-09)",
      records: [
        {
          id: "rec-draft",
          title: "Checklist Item Under Review",
          content: "Pending review: Routine residual volume aspiration vs continuous clinical intolerance monitoring. Do not activate for student examination until form is ratified."
        }
      ]
    },
    question: "This scenario card is under source review. Trainer review only.",
    modelHandoff: "Trainer preview card flagged for facility form ratification."
  }
];

if (typeof window !== 'undefined') {
  window.HAI_BUNDLE_SOURCES = HAI_BUNDLE_SOURCES;
  window.HAI_BUNDLE_CASES = HAI_BUNDLE_CASES;
  window.HAI_HANDOVER_CASES = HAI_HANDOVER_CASES;
}

if (typeof module !== 'undefined') {
  module.exports = { HAI_BUNDLE_SOURCES, HAI_BUNDLE_CASES, HAI_HANDOVER_CASES };
}
