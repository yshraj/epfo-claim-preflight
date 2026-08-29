import type { Dictionary } from ".";

// हिन्दी. Register: plain, spoken Hindi rather than sarkari Hindi — the whole
// point of the product is that a member understands what went wrong, so
// "गलती" beats "त्रुटि" and "पैसा" beats "धनराशि". Terms members actually see on
// their own documents (आधार, यूएएन, केवाईसी, पीएफ) are kept as-is rather than
// translated into unfamiliar formal equivalents.
export const hi: Dictionary = {
  // ─── Durations & plurals ────────────────────────────────────────────────
  "duration.day.one": "1 दिन",
  "duration.day.other": "{count} दिन",
  "duration.month.one": "1 महीना",
  "duration.month.other": "{count} महीने",
  "duration.year.one": "1 साल",
  "duration.year.other": "{count} साल",
  "duration.yearMonth": "{years}, {months}",

  // ─── Check: name match ──────────────────────────────────────────────────
  "check.name.pass.title": "पहचान सत्यापित",
  "check.name.pass.detail":
    "आपका नाम आधार, ईपीएफओ और बैंक रिकॉर्ड — तीनों में बिल्कुल एक जैसा है।",
  "check.name.warn.title": "नाम में मामूली अंतर मिला",
  "check.name.fail.title": "नाम में बड़ा अंतर मिला",
  "check.name.detail": "आधार: {aadhaarName} | {source}: {otherName}",
  "check.name.warn.fix":
    "सुझाव: जमा करने से पहले इसे ठीक कर लें — इससे क्लेम रद्द होने से बच सकता है।",
  "check.name.fail.fix":
    "ज़रूरी: आपका क्लेम आगे बढ़ने से पहले इस अंतर को ठीक करना होगा।",
  "source.epfo": "ईपीएफओ",
  "source.bank": "बैंक",

  // ─── Check: date of birth ───────────────────────────────────────────────
  "check.dob.pass.title": "जन्म तिथि मेल खाती है",
  "check.dob.pass.detail": "आधार और ईपीएफओ, दोनों रिकॉर्ड में आपकी जन्म तिथि एक ही है ({date})।",
  "check.dob.diff.title": "जन्म तिथि में {gap} का अंतर है",
  "check.dob.detail": "आधार: {aadhaarDob} | ईपीएफओ: {uanDob}",
  "check.dob.minor.fix":
    "सुझाव: यह अंतर 3 साल की सीमा के अंदर है, इसलिए आपका आधार ही सबूत के तौर पर काफ़ी है — कोई और कागज़ नहीं लगेगा।",
  "check.dob.major.fix":
    "ज़रूरी: इतना बड़ा अंतर 3 साल की सीमा से बाहर है, इसलिए अकेले आधार से बात नहीं बनेगी — आपको जन्म प्रमाण पत्र या स्कूल प्रमाण पत्र चाहिए होगा, जिस पर नियोक्ता की पुष्टि हो।",
  "check.dob.unreadable.title": "जन्म तिथि पढ़ी नहीं जा सकी",
  "check.dob.unreadable.detail":
    "किसी एक रिकॉर्ड में तारीख़ ठीक से दर्ज नहीं है (आधार: {aadhaarDob}, ईपीएफओ: {uanDob})।",
  "check.dob.unreadable.fix":
    "ज़रूरी: यह रिकॉर्ड ठीक कराने के लिए अपने ईपीएफओ दफ़्तर से संपर्क करें।",

  // ─── Check: date of exit ────────────────────────────────────────────────
  "check.doe.pass.title": "नौकरी छोड़ने की तारीख़ दर्ज है",
  "check.doe.pass.detail": "{date} को दर्ज किया गया, {declaredBy} द्वारा।",
  "check.doe.warn.title": "नौकरी छोड़ने की तारीख़ दर्ज नहीं है, पर आप ख़ुद बता सकते हैं",
  "check.doe.warn.detail":
    "आपके नियोक्ता ने अभी तक तारीख़ दर्ज नहीं की है, लेकिन आपके आख़िरी योगदान को {days} दिन हो चुके हैं — 60 दिन की सीमा पार हो गई है।",
  "check.doe.warn.fix":
    "अब आप नियोक्ता का इंतज़ार किए बिना ख़ुद यह तारीख़ बता सकते हैं।",
  "check.doe.fail.title": "नौकरी छोड़ने की तारीख़ दर्ज नहीं है",
  "check.doe.fail.detail":
    "आपके नियोक्ता ने अभी तक तारीख़ दर्ज नहीं की है, और आपके आख़िरी योगदान को सिर्फ़ {days} दिन हुए हैं (ख़ुद बताने के लिए 60 दिन ज़रूरी हैं)।",
  "check.doe.fail.fix":
    "हम आपके नियोक्ता को 7 दिन की याद-दिलाने वाली सूचना भेजेंगे। 60 दिन के बाद आप ख़ुद तारीख़ बता सकेंगे।",
  "declaredBy.employer": "आपके नियोक्ता",
  "declaredBy.self": "आप",

  // ─── Check: bank account ────────────────────────────────────────────────
  "check.bank.pass.title": "बैंक खाता सत्यापित",
  "check.bank.pass.detail":
    "तुरंत जाँच में पता चला कि “{bankName}” खाता चालू है और आपके केवाईसी नाम से मेल खाता है।",
  "check.bank.mismatch.title": "बैंक खाते के नाम में अंतर",
  "check.bank.mismatch.detail":
    "बैंक खाते का नाम (“{bankName}”) आपके आधार के नाम (“{aadhaarName}”) से मेल नहीं खाता।",
  "check.bank.mismatch.fix":
    "अपने बैंक की केवाईसी अपडेट कराएँ, या दोनों नामों को जोड़ने वाला संयुक्त घोषणापत्र लगाएँ।",
  "check.bank.inactive.title": "बैंक खाता चालू नहीं है",
  "check.bank.inactive.detail": "तुरंत जाँच में कोई चालू खाता नहीं मिला।",
  "check.bank.inactive.fix":
    "आगे बढ़ने से पहले केवाईसी में अपने बैंक खाते की जानकारी जोड़ें या अपडेट करें।",

  // ─── Eligibility: categories & reasons ──────────────────────────────────
  "category.essential_needs": "ज़रूरी खर्च",
  "category.housing_needs": "घर से जुड़ी ज़रूरत",
  "category.special_circumstances": "विशेष परिस्थिति",
  "category.final_settlement": "पूरा भुगतान",
  "reason.medical": "इलाज की ज़रूरत",
  "reason.house": "घर खरीदने या बनवाने",
  "reason.education": "पढ़ाई",
  "reason.leaving_job": "नौकरी छोड़ने",
  "reason.retirement": "रिटायरमेंट",

  // ─── Eligibility: breakdown lines ───────────────────────────────────────
  "eligibility.line.employee": "आपका योगदान",
  "eligibility.line.employer": "नियोक्ता का योगदान",
  "eligibility.line.released": "रोका गया 25% भी जारी",
  "eligibility.line.released.note":
    "पूरा भुगतान लेते समय रोकी गई रकम भी आपको मिल जाती है।",
  "eligibility.line.retained": "आपके खाते में रोकी गई रकम",
  "eligibility.line.retained.note":
    "25% खाते में ही रहता है और उस पर ब्याज मिलता रहता है — पूरा भुगतान लेते समय यह पूरा मिल जाएगा।",
  "eligibility.line.retainedUntil": "पूरे भुगतान तक रोकी गई रकम",
  "eligibility.line.retainedUntil.note":
    "25% आपके खाते में रहता है और उस पर ब्याज मिलता रहता है।",

  // ─── Eligibility: pension (EPS) ─────────────────────────────────────────
  "eligibility.pension.tooShort":
    "पेंशन का पैसा निकालने के लिए कम से कम 6 महीने की सदस्यता ज़रूरी है।",
  "eligibility.pension.certificate":
    "आपकी नौकरी {years} साल से ज़्यादा हो चुकी है, इसलिए पेंशन का पैसा नकद नहीं निकाला जा सकता। इसकी जगह आपको स्कीम सर्टिफिकेट मिलेगा, जो इस सेवा को आपकी अगली नौकरी तक ले जाता है और आगे चलकर हर महीने पेंशन दिलाता है।",
  "eligibility.pension.withdrawable":
    "आपकी नौकरी {years} साल से कम है, इसलिए पेंशन का पैसा भी पीएफ के साथ निकाला जा सकता है।",

  // ─── Eligibility: notes & blocks ────────────────────────────────────────
  "eligibility.note.finalSettlementOpen":
    "आपको काम छोड़े {days} दिन हो चुके हैं — {threshold} दिन की सीमा पार हो गई है, इसलिए अब आप एडवांस नहीं, पूरी रकम ले सकते हैं।",
  "eligibility.note.advanceOpen":
    "{advanceDays} दिन के बाद आप 75% तक एडवांस ले सकते हैं। बाकी रकम {finalDays} दिन पर खुलेगी — यानी {remaining} दिन बाद।",
  "eligibility.note.fullUnlocksAt": "पूरी रकम {days} दिन पर खुलेगी।",
  "eligibility.note.serviceWaived":
    "आपकी सदस्यता {months} महीने से कम है, लेकिन नौकरी छोड़ चुके होने के कारण आप फिर भी अपनी तय रकम ले सकते हैं।",
  "eligibility.blocked.waiting":
    "बिना योगदान के {advanceDays} दिन बीतने पर आप पैसा निकाल सकते हैं। अभी {days} दिन हुए हैं — लगभग {remaining} दिन और।",
  "eligibility.blocked.service":
    "कुछ रकम निकालने के लिए {months} महीने की पीएफ सदस्यता ज़रूरी है। आपकी सदस्यता {actual} है।",
  "eligibility.blocked.retirementAge":
    "रिटायरमेंट पर पूरा भुगतान {minAge} साल की उम्र से शुरू होता है। आपके रिकॉर्ड के अनुसार आपकी उम्र {age} साल है।",
  "eligibility.note.useLeavingJob":
    "अगर आपने यह नौकरी छोड़ दी है, तो “नौकरी छोड़ रहा/रही हूँ” चुनें — वह रास्ता आपके लिए अभी खुला है।",
  "eligibility.note.otherReasons":
    "अगर आपको उससे पहले पैसे की ज़रूरत है, तो बाकी कारणों में से कोई एक आप पर लागू हो सकता है।",
  // ─── Claim journey: shared ──────────────────────────────────────────────
  "claim.reason.title": "आपको पैसे की ज़रूरत क्यों है?",
  "claim.reason.subtitle": "हम आपके लिए सही फ़ॉर्म और मिलने वाली रकम ख़ुद तय कर देंगे।",
  "claim.reason.medical": "इलाज की ज़रूरत",
  "claim.reason.house": "घर खरीदना / बनवाना",
  "claim.reason.education": "पढ़ाई",
  "claim.reason.leaving_job": "नौकरी छोड़ रहा/रही हूँ",
  "claim.reason.retirement": "रिटायरमेंट",

  "claim.preflight.title": "जमा करने से पहले",
  "claim.preflight.subtitle": "हम वही जानकारी जाँच रहे हैं जिससे आपका क्लेम सबसे ज़्यादा अटकता है।",
  "claim.preflight.rechecking": "आपकी जानकारी दोबारा जाँची जा रही है...",
  "claim.preflight.whyLabel": "यह क्यों दिख रहा है?",
  "claim.preflight.selfDeclare": "अभी ख़ुद नौकरी छोड़ने की तारीख़ बताएँ",
  "claim.preflight.useAadhaarDob": "मेरे आधार वाली जन्म तिथि इस्तेमाल करें",
  "claim.preflight.ready.title": "आप जमा करने के लिए तैयार हैं।",
  "claim.preflight.ready.body": "सभी जाँच सफलतापूर्वक पूरी हो गईं।",
  "claim.preflight.fixCta": "गलती ठीक करें और आगे बढ़ें",
  "claim.preflight.blocked.generic":
    "यह क्लेम अभी जमा नहीं हो सकता — पहले ऊपर बताई गई दिक्कतें ठीक करें। पूरे संस्करण में हर बची हुई दिक्कत के लिए अलग निर्देशित समाधान होगा (जैसे बैंक केवाईसी अपडेट)।",
  "claim.preflight.blocked.doe":
    "यह क्लेम अभी जमा नहीं हो सकता — या तो आपके नियोक्ता को नौकरी छोड़ने की तारीख़ दर्ज करनी होगी, या 60 दिन पूरे होने पर आप ख़ुद बता सकते हैं।",
  "claim.preflight.ineligible.title": "आपके रिकॉर्ड बिल्कुल ठीक हैं।",
  "claim.preflight.ineligible.body":
    "बस यह क्लेम अभी आपके लिए खुला नहीं है — ऊपर कारण देखें। कुछ ठीक करने की ज़रूरत नहीं, और बाद में आने पर कुछ नुकसान भी नहीं।",

  "claim.fix.title": "नाम की गलती ठीक करें",
  "claim.fix.subtitle":
    "हमें आपके नाम में थोड़ा अंतर मिला है। इससे आपका क्लेम अटक सकता है।",
  "claim.fix.nothing": "यहाँ ठीक करने को कुछ नहीं है — आप आगे बढ़ सकते हैं।",
  "claim.fix.back": "जाँच पर वापस जाएँ",
  "claim.fix.current": "अभी दर्ज",
  "claim.fix.recommended": "सुझाया गया",
  "claim.fix.matchesAadhaar": "आपके सत्यापित आधार से मेल खाता है",
  "claim.fix.apply": "सुधार लागू करें",
  "claim.fix.applying": "सुधार लागू किया जा रहा है…",
  "claim.fix.note":
    "इससे आपके यूएएन और बैंक रिकॉर्ड आपके आधार नाम से मिला दिए जाएँगे, फिर जाँच दोबारा चलेगी।",

  // ─── Eligibility panel ──────────────────────────────────────────────────
  "eligibility.panel.aria": "{reason} के लिए पात्रता",
  "eligibility.panel.canWithdraw": "आप निकाल सकते हैं",
  "eligibility.panel.notYet": "अभी उपलब्ध नहीं",
  "eligibility.panel.category": "श्रेणी",
  "eligibility.panel.service": "{service} की नौकरी",
  "eligibility.panel.payable": "आपको मिलने वाली रकम",
  "eligibility.panel.retained":
    "{amount} आपके खाते में रहेगा — पूरा भुगतान लेते समय यह पूरा मिल जाएगा।",
  "eligibility.panel.pension": "पेंशन ({amount}):",
  "eligibility.panel.forms": "आपके लिए {forms} के रूप में दाख़िल — आपको कोई फ़ॉर्म चुनने की ज़रूरत नहीं।",

  // ─── Language ───────────────────────────────────────────────────────────
  "language.label": "भाषा",
  // ─── Global chrome ──────────────────────────────────────────────────────
  "brand.name": "क्लेम प्री-फ़्लाइट",
  "brand.badge": "प्रोटोटाइप · नमूना डेटा",
  "banner.disclaimer":
    "यह एक स्वतंत्र हैकाथॉन प्रोटोटाइप है — ईपीएफओ से इसका कोई संबंध या मान्यता नहीं है। इस साइट का सारा डेटा काल्पनिक है।",
  "footer.blurb":
    "स्वतंत्र हैकाथॉन प्रोटोटाइप। ईपीएफओ से कोई संबंध या मान्यता नहीं। सारा डेटा काल्पनिक है।",
  "footer.officialSite": "आधिकारिक ईपीएफओ साइट ↗",

  "nav.howItWorks": "यह कैसे काम करता है",
  "nav.services": "सेवाएँ",
  "nav.dashboard": "डैशबोर्ड",
  "nav.checkMyClaim": "मेरा क्लेम जाँचें",
  "nav.login": "लॉग इन",
  "nav.menu": "मेन्यू",

  "user.profileSettings": "प्रोफ़ाइल सेटिंग",
  "user.documentCenter": "दस्तावेज़ केंद्र",
  "user.myClaims": "मेरे क्लेम",
  "user.security": "सुरक्षा",
  "user.demoScenarios": "नमूना परिस्थितियाँ",
  "user.logout": "लॉग आउट",
  "user.logout.title": "ईपीएफ खाते से लॉग आउट करें?",
  "user.logout.body":
    "क्या आप वाकई लॉग आउट करना चाहते हैं? अपने क्लेम और दस्तावेज़ देखने के लिए आपको दोबारा लॉग इन करना होगा।",
  "common.cancel": "रहने दें",
  "common.uan": "यूएएन",

  // ─── Claim type ─────────────────────────────────────────────────────────
  "claim.type.title": "आप क्या करना चाहते हैं?",
  "claim.type.subtitle": "आगे बढ़ने के लिए कोई सेवा चुनें।",
  "claim.type.withdraw.title": "पीएफ निकालें",
  "claim.type.withdraw.desc": "पूरी या कुछ रकम निकालने के लिए आवेदन करें (फ़ॉर्म 19, 31, 10C)",
  "claim.type.transfer.title": "पीएफ ट्रांसफर करें",
  "claim.type.transfer.desc":
    "पिछली नौकरी का पीएफ पैसा अपनी मौजूदा नौकरी के खाते में लाएँ",
  "claim.type.status.title": "क्लेम की स्थिति देखें",
  "claim.type.status.desc": "पहले से जमा किए गए आवेदन को ट्रैक करें",
  "claim.type.notInPrototype": "प्रोटोटाइप में उपलब्ध नहीं",

  "claim.submit": "क्लेम जमा करें",
  "claim.submitting": "जमा किया जा रहा है...",
  // ─── Claim status ───────────────────────────────────────────────────────
  "status.title": "क्लेम जमा हो गया",
  "status.reference": "संदर्भ संख्या",
  "status.submitted": "जमा किया गया",
  "status.status": "स्थिति",
  "status.processing": "प्रक्रिया में",
  "status.syntheticRef":
    "यह इस प्रोटोटाइप की काल्पनिक संदर्भ संख्या है — असल में कोई क्लेम दाख़िल नहीं हुआ।",
  "status.timeline.title": "स्थिति का ब्यौरा",
  "status.stage.submitted": "क्लेम जमा हुआ",
  "status.stage.verified": "दस्तावेज़ जाँचे गए",
  "status.stage.regional": "क्षेत्रीय कार्यालय में प्रक्रिया",
  "status.stage.approved": "भुगतान मंज़ूर",
  "status.stage.credited": "रकम खाते में आई",
  "status.stage.rejected": "क्लेम रद्द",
  "status.stage.awaitingYou": "आपके जवाब का इंतज़ार",
  "status.stage.inProgress": "चल रहा है",
  "status.next.title": "आगे क्या होगा?",
  "status.next.rejected":
    "आपका क्लेम रद्द हो गया। कारण देखें, सुधार करें और दोबारा जमा करें।",
  "status.next.clarification":
    "यह क्लेम आगे बढ़ने से पहले ईपीएफओ को कुछ और जानकारी चाहिए।",
  "status.next.processing":
    "आपका क्लेम अभी क्षेत्रीय कार्यालय की टीम के पास है। फ़िलहाल आपको कुछ नहीं करना है। भुगतान मंज़ूर होते ही हम आपको बता देंगे।",

  // ─── Grievance escalation ───────────────────────────────────────────────
  "grievance.delayed.title": "इस क्लेम में उम्मीद से ज़्यादा समय लग रहा है।",
  "grievance.delayed.body":
    "अगर आपका क्लेम 20 दिन से ज़्यादा अटका है, तो आप शिकायत दर्ज कर सकते हैं। इसके लिए एक छोटा-सा कारण और ज़रूरी कागज़ात लगेंगे।",
  "grievance.request": "मदद माँगें",
  "grievance.willInclude": "हम ये जानकारी अपने आप जोड़ देंगे:",
  "grievance.include.number": "क्लेम संख्या ({reference})",
  "grievance.include.type": "क्लेम का प्रकार",
  "grievance.include.date": "जमा करने की तारीख़",
  "grievance.include.status": "मौजूदा स्थिति",
  "grievance.cantWait": "इंतज़ार नहीं कर सकते? शिकायत दर्ज करें",
  "grievance.reason.delay": "क्लेम में देरी",
  "grievance.message.label": "और कुछ कहना चाहें तो लिखें (ज़रूरी नहीं)",
  "grievance.message.placeholder": "कोई और जानकारी हो तो यहाँ लिखें...",
  "grievance.review": "अनुरोध देखें",
  "grievance.edit": "बदलें",
  "grievance.submit": "शिकायत भेजें",
  "grievance.submitting": "भेजा जा रहा है...",
  "grievance.field.claim": "क्लेम:",
  "grievance.field.reason": "कारण:",
  "grievance.field.message": "संदेश:",
  "grievance.reason.processingDelay": "प्रक्रिया में देरी",
  "grievance.success.title": "अनुरोध दर्ज हो गया",
  "grievance.success.body":
    "हमने आपके क्लेम की जानकारी इस अनुरोध के साथ जोड़कर क्षेत्रीय कार्यालय को भेज दी है।",
  "grievance.success.reference": "संदर्भ: {reference}",
  "grievance.success.simulated": "यह प्रोटोटाइप का काल्पनिक अनुरोध है।",
  // ─── Marketing ──────────────────────────────────────────────────────────
  "marketing.disclaimer.label": "हैकाथॉन प्रोटोटाइप:",
  "marketing.disclaimer.body":
    "यह “क्लेम प्री-फ़्लाइट” विचार को दिखाने के लिए बनाया गया एक नमूना है। पहचान की जाँच असली तर्क पर चलती है, लेकिन सभी यूज़र प्रोफ़ाइल, यूएएन एक्टिवेशन और शिकायत की प्रक्रिया काल्पनिक डेटा पर आधारित हैं।",

  "hero.title": "क्लेम प्री-फ़्लाइट।",
  "hero.subtitle": "ईपीएफओ का एक आसान रास्ता, जो दिक्कतें जमा करने से पहले ही पकड़ लेता है।",
  "hero.body":
    "सरकारी सुविधा पाने के लिए तीन हफ़्ते बाद आए अनजाने कोड समझने की ज़रूरत नहीं होनी चाहिए। दिक्कत यहीं ठीक करें और भरोसे के साथ जमा करें।",
  "hero.seeHow": "देखें यह कैसे काम करता है",
  "hero.card.title": "क्लेम की तैयारी",
  "hero.card.identity": "पहचान",
  "hero.card.kyc": "केवाईसी",
  "hero.card.nameConsistency": "नाम की एकरूपता",
  "hero.card.bank": "बैंक",
  "hero.card.employment": "नौकरी",
  "hero.card.verified": "सत्यापित",
  "hero.card.active": "चालू",
  "hero.card.mismatch": "अंतर है",

  "howItWorks.title": "यह कैसे काम करता है",
  "howItWorks.step1.title": "लॉग इन करें और कारण बताएँ",
  "howItWorks.step1.detail":
    "एक कारण चुनें — इलाज, घर, पढ़ाई — और हम सही फ़ॉर्म तथा आपको मिलने वाली सही रकम ख़ुद निकाल देंगे।",
  "howItWorks.step2.title": "हम 4 असली जाँच करते हैं",
  "howItWorks.step2.detail":
    "नाम, जन्म तिथि, नौकरी छोड़ने की तारीख़ और बैंक खाता — कुछ भी जमा करने से पहले सब मिलाकर देखा जाता है।",
  "howItWorks.step3.title": "ठीक करें, फिर भरोसे से जमा करें",
  "howItWorks.step3.detail":
    "जो गलत है उसे यहीं सुधारें, जाँच को दोबारा चलते हुए देखें, और यह जानते हुए जमा करें कि अब यह पास हो जाएगा।",

  "proof.quote":
    "ईपीएफओ की अपनी वेबसाइट पर “अगर मेरा क्लेम 20 दिन में तय नहीं हुआ तो?” का जवाब है:",
  "proof.quote.highlight": "शिकायत दर्ज कीजिए।",
  "proof.body":
    "न कोई स्थिति की जानकारी, न कोई वजह। बस एक अलग सिस्टम पर एक अलग शिकायत — उस क्लेम के बारे में जो पहले ही चुप हो चुका है।",
  "proof.stat.members": "भारत में ईपीएफ सदस्य",
  "proof.stat.rejected": "क्लेम अब तक रद्द होते रहे हैं",
  "proof.stat.rejected.note": "अन्य स्रोतों से, ईपीएफओ द्वारा पुष्ट नहीं",
  "proof.stat.records": "रिकॉर्ड यहाँ मिलाकर जाँचे जाते हैं",
  "proof.stat.logins": "अलग-अलग ईपीएफओ लॉगिन आज भी",

  "marketing.scopeNote":
    "ईपीएफओ सिर्फ़ पैसा निकालने तक सीमित नहीं है। यह प्रोटोटाइप एक रास्ते को गहराई से दिखाता है, पर पूरा दायरा समझता है।",
  "marketing.exploreServices": "ईपीएफओ की सभी 20+ सेवाएँ देखें",

  "closing.title": "दिक्कत का पता आपको ईपीएफओ से पहले चल गया।",
  "closing.body": "बात बस इतनी सी है। जमा करने से पहले अपना क्लेम जाँच लें।",
  // ─── Services ───────────────────────────────────────────────────────────
  "audience.Employee": "कर्मचारी",
  "audience.Employer": "नियोक्ता",
  "audience.Pensioner": "पेंशनभोगी",
  "audience.Cross-cutting": "सभी के लिए",
  "services.title": "ईपीएफओ सेवाएँ",
  "services.intro":
    "यह ईपीएफओ की असली सेवाओं की सूची है — असली पोर्टल को देखकर बनाई गई, मनगढ़ंत श्रेणियाँ नहीं। इस प्रोटोटाइप में सिर्फ़ “पीएफ निकालें” ही चालू रास्ता है; बाकी सब सिर्फ़ जानकारी है, कोई छिपी हुई सुविधा नहीं।",
  "services.liveInPrototype": "इस प्रोटोटाइप में चालू",
  "services.goToDashboard": "डैशबोर्ड पर जाएँ",
  "services.learnMore": "और जानें",
  "services.all": "सभी सेवाएँ",
  "services.backToAll": "सभी सेवाओं पर वापस",
  "services.whereItLives": "असली ईपीएफओ साइट पर यह यहाँ मिलेगा: ",
  "services.whyItMatters": "यह क्यों ज़रूरी है: ",
  "services.informationalOnly":
    "सिर्फ़ जानकारी के लिए — इस प्रोटोटाइप में ईपीएफओ का कोई असली सिस्टम जुड़ा नहीं है। यह पेज कुछ भी जमा नहीं कर सकता।",
  "service.withdraw-pf.name": "पीएफ निकालें",
  "service.withdraw-pf.summary": "अपने प्रोविडेंट फंड की पूरी या कुछ रकम निकालने के लिए आवेदन करें।",
  "service.withdraw-pf.why": "इस प्रोटोटाइप में यही एक रास्ता पूरी तरह असली है — एक ऐसी जाँच जो उन गलतियों को पहले ही पकड़ लेती है, जिनकी वजह से ईपीएफओ हफ़्तों बाद क्लेम रद्द कर देता है।",
  "service.view-passbook.name": "पासबुक देखें",
  "service.view-passbook.summary": "ईपीएफ खाते का मौजूदा बैलेंस और पूरा लेन-देन का ब्यौरा।",
  "service.view-passbook.why": "अक्सर सदस्य को सबसे पहले पासबुक में ही पता चलता है कि कुछ गड़बड़ है — नियोक्ता का कोई योगदान गायब है, या बीच में कोई महीना छूटा है।",
  "service.update-kyc.name": "केवाईसी अपडेट करें",
  "service.update-kyc.summary": "अपने यूएएन से जुड़े आधार, पैन और बैंक खाते की जानकारी अपडेट करें।",
  "service.update-kyc.why": "इन तीनों रिकॉर्ड में नाम का अंतर ही पीएफ क्लेम रद्द होने की सबसे बड़ी वजह है — और यही इस प्रोटोटाइप की जाँच पकड़ती है।",
  "service.know-your-uan.name": "अपना यूएएन जानें",
  "service.know-your-uan.summary": "अपनी बुनियादी जानकारी से अपना यूनिवर्सल अकाउंट नंबर पता करें।",
  "service.know-your-uan.why": "यूएएन के बिना सदस्य की बाकी कोई भी सेवा इस्तेमाल नहीं की जा सकती।",
  "service.online-claims-transfer.name": "ऑनलाइन क्लेम और ट्रांसफर",
  "service.online-claims-transfer.summary": "क्लेम का अनुरोध भेजें या अपना ईपीएफ बैलेंस एक खाते से दूसरे में ले जाएँ।",
  "service.online-claims-transfer.why": "यह उन मामलों के लिए है जब नौकरी बदलने पर सदस्य का पीएफ नए नियोक्ता के खाते में जाना होता है।",
  "service.activate-uan.name": "यूएएन चालू करें",
  "service.activate-uan.summary": "नया मिला यूएएन चालू करें ताकि आप ईपीएफ सेवाएँ ऑनलाइन इस्तेमाल कर सकें।",
  "service.activate-uan.why": "इसी से तय होता है कि सदस्य ईपीएफओ की कोई भी वेब सेवा इस्तेमाल कर पाएगा या नहीं।",
  "service.activate-uan.note": "इस पड़ताल के समय तक ईपीएफओ ने इसे वेब पोर्टल से पूरी तरह हटा दिया था — अब यह उमंग मोबाइल ऐप पर भेज देता है। जिनके पास स्मार्टफ़ोन नहीं है, उनके लिए वेब पर कोई विकल्प नहीं बताया गया है।",
  "service.file-death-claim.name": "मृत्यु क्लेम दाख़िल करें",
  "service.file-death-claim.summary": "किसी दिवंगत सदस्य का पीएफ, पेंशन और बीमा पाने के लिए पात्र नामिती द्वारा दाख़िल किया जाता है।",
  "service.file-death-claim.why": "यह अक्सर वह मौका होता है जब किसी परिवार को ईपीएफओ से सबसे जल्दी और सबसे ज़रूरी काम पड़ता है।",
  "service.submit-ecr.name": "ईसीआर जमा करें",
  "service.submit-ecr.summary": "हर महीने का इलेक्ट्रॉनिक चालान सह रिटर्न भरें — हर कर्मचारी का योगदान।",
  "service.submit-ecr.why": "देर से या गलत भरा गया ईसीआर कर्मचारी का क्लेम अटकने की सबसे आम वजहों में से एक है।",
  "service.uan-management.name": "यूएएन प्रबंधन",
  "service.uan-management.summary": "अपने संस्थान के हर कर्मचारी के यूएएन एक जगह से संभालें।",
  "service.uan-management.why": "इससे कर्मचारियों के रिकॉर्ड सही बने रहते हैं और अधूरी जानकारी की वजह से क्लेम नहीं अटकते।",
  "service.employee-exit-management.name": "कर्मचारी की एग्ज़िट प्रविष्टि",
  "service.employee-exit-management.summary": "कर्मचारी के संस्थान छोड़ने पर उसकी नौकरी छोड़ने की तारीख़ दर्ज करें।",
  "service.employee-exit-management.why": "नौकरी छोड़ने की तारीख़ का न होना ठीक वही दिक्कत है जो इस प्रोटोटाइप की जाँच पकड़ती है — असल में सदस्य महीनों तक पुराने नियोक्ता के इसे भरने का इंतज़ार करते हैं।",
  "service.employer-registration.name": "नियोक्ता पंजीकरण",
  "service.employer-registration.summary": "ईपीएफ एवं विविध प्रावधान अधिनियम, 1952 के तहत नया संस्थान पंजीकृत करें।",
  "service.employer-registration.why": "उस संस्थान के हर कर्मचारी के पीएफ की शुरुआत यहीं से होती है।",
  "service.download-forms.name": "फ़ॉर्म और परिपत्र डाउनलोड करें",
  "service.download-forms.summary": "ईपीएफओ के आधिकारिक फ़ॉर्म, सूचनाएँ और परिपत्र एक जगह।",
  "service.download-forms.why": "उन अनुपालन टीमों के लिए संदर्भ सामग्री जो एक साथ कई कर्मचारियों के मामले देखती हैं।",
  "service.jeevan-pramaan.name": "जीवन प्रमाण (जीवन प्रमाणपत्र)",
  "service.jeevan-pramaan.summary": "पेंशन चालू रखने के लिए डिजिटल जीवन प्रमाणपत्र जमा करें।",
  "service.jeevan-pramaan.why": "हर साल यह न देने पर पेंशनभोगी का भुगतान पूरी तरह रुक सकता है।",
  "service.jeevan-pramaan.note": "यह तो ईपीएफओ का सिस्टम भी नहीं है — यह एक अलग, अंतर-मंत्रालयी पोर्टल है जहाँ ईपीएफओ पेंशनभोगियों को भेज देता है।",
  "service.view-ppo-details.name": "पीपीओ विवरण देखें",
  "service.view-ppo-details.summary": "अपना पेंशन भुगतान आदेश देखें — वही दस्तावेज़ जो आपकी मासिक पेंशन तय करता है।",
  "service.view-ppo-details.why": "पेंशन से जुड़े किसी भी विवाद या गड़बड़ी में यही आधार दस्तावेज़ होता है।",
  "service.pensioner-forms.name": "पेंशनभोगी फ़ॉर्म और परिपत्र",
  "service.pensioner-forms.summary": "पेंशन योजना के सदस्यों के लिए ख़ास फ़ॉर्म और परिपत्र।",
  "service.pensioner-forms.why": "उन पेंशन-संबंधी प्रक्रियाओं के लिए संदर्भ सामग्री जो आम ईपीएफ फ़ॉर्म में नहीं आतीं।",
  "service.grievance-redressal.name": "शिकायत निवारण (EPFiGMS)",
  "service.grievance-redressal.summary": "ईपीएफओ की किसी भी सेवा के बारे में शिकायत दर्ज करें — सदस्य, पेंशनभोगी और नियोक्ता, सबके लिए।",
  "service.grievance-redressal.why": "ईपीएफओ की अपनी वेबसाइट यही बताती है कि 20 दिन में क्लेम तय न होने पर यही एकमात्र रास्ता है।",
  "service.grievance-redressal.note": "यह मुख्य सदस्य पोर्टल से सचमुच एक अलग सिस्टम है — यानी एक चौथा लॉगिन, आपके मौजूदा पोर्टल के अंदर कोई टैब नहीं।",
  "service.rti.name": "आरटीआई",
  "service.rti.summary": "ईपीएफओ से सूचना का अधिकार आवेदन दाख़िल करें।",
  "service.rti.why": "उस जानकारी तक पहुँचने का औपचारिक रास्ता जो ईपीएफओ अन्यथा न छापता है, न समझाता है।",
  "service.locate-office.name": "ईपीएफओ कार्यालय ढूँढें",
  "service.locate-office.summary": "अपने खाते से जुड़ा क्षेत्रीय ईपीएफओ कार्यालय ढूँढें।",
  "service.locate-office.why": "कुछ काम आज भी दफ़्तर जाकर या डाक से फ़ॉर्म भेजकर ही होते हैं।",
  // ─── FAQ ────────────────────────────────────────────────────────────────
  "faq.title": "सवाल-जवाब",
  "faq.q1": "क्या यह ईपीएफओ के असली सिस्टम से जुड़ा है?",
  "faq.a1":
    "नहीं। यह एक स्वतंत्र हैकाथॉन प्रोटोटाइप है, जिसका ईपीएफओ से कोई संबंध या मान्यता नहीं है। यह किसी भी असली सरकारी या वित्तीय सिस्टम से नहीं जुड़ता।",
  "faq.q2": "क्या मेरा डेटा असली है?",
  "faq.a2":
    "नहीं। इस साइट पर हर सदस्य का रिकॉर्ड, बैलेंस और क्लेम काल्पनिक है — इस डेमो के लिए बनाया गया, किसी असली व्यक्ति या खाते से नहीं लिया गया।",
  "faq.q3": "यहाँ असल में क्या असली है और क्या नकली?",
  "faq.a3":
    "नाम और जन्म तिथि का मिलान, नौकरी छोड़ने की तारीख़ और पात्रता के नियम, तथा रकम की गणना — ये सब असली कोड हैं जो सचमुच चलते हैं। लॉगिन, बैंक सत्यापन और क्लेम का भुगतान काल्पनिक हैं।",
  "faq.q4": "यह ईपीएफओ की असली साइट से अलग क्यों दिखता है?",
  "faq.a4":
    "जानबूझकर। यह दिखाता है कि पीएफ क्लेम की पहले से जाँच कैसी हो सकती है — यह ईपीएफओ की वेबसाइट का नया डिज़ाइन नहीं, बल्कि एक असली दिक्कत के इर्द-गिर्द बना एक रास्ता है।",

  // ─── Comparison ─────────────────────────────────────────────────────────
  "comparison.title": "उन्होंने फ़ॉर्म बनाया। हमने जाँच बनाई।",
  "comparison.subtitle": "ईपीएफओ की अपनी प्रकाशित जानकारी और पोर्टल की बनावट पर आधारित।",
  "comparison.today": "आज",
  "comparison.prototype": "यह प्रोटोटाइप",
  "comparison.today.1": "हफ़्तों बाद, समझ न आने वाला रद्दीकरण",
  "comparison.today.2": "5 अलग-अलग लॉगिन, कहीं एक साथ कुछ नहीं दिखता",
  "comparison.today.3": "“शिकायत दर्ज कीजिए” ही एकमात्र रास्ता",
  "comparison.today.4": "चेक की धुँधली फ़ोटो की वजह से क्लेम रद्द",
  "comparison.proto.1": "जमा करने से पहले, आसान भाषा में जाँच",
  "comparison.proto.2": "शुरू से आख़िर तक एक ही रास्ता",
  "comparison.proto.3": "गलती सुधारें और उसे तुरंत दोबारा जाँचते हुए देखें",
  "comparison.proto.4": "साफ़ दिखता स्थिति का ब्यौरा, चुप्पी नहीं",

  // ─── Check preview gallery ──────────────────────────────────────────────
  "preview.eyebrow": "असली तर्क, दिखावा नहीं",
  "preview.title": "जाँच जमा करने से पहले होती है — रद्द होने के बाद नहीं।",
  "preview.1.title": "आधार, यूएएन और बैंक रिकॉर्ड में नाम मेल खाता है",
  "preview.1.detail": "“RAJESH KUMAR SINGH” तीनों रिकॉर्ड में एक जैसा है।",
  "preview.2.title": "नाम में अंतर मिला",
  "preview.2.detail": "आधार का नाम आपके बैंक खाते से पूरी तरह मेल नहीं खाता। मिलान: 50%।",
  "preview.3.title": "बैंक खाता सत्यापित",
  "preview.3.detail":
    "तुरंत जाँच में पुष्टि हुई कि खाता चालू है और आपके केवाईसी नाम से मेल खाता है।",
  // ─── Login ──────────────────────────────────────────────────────────────
  "login.title": "सदस्य लॉगिन",
  "login.subtitle": "अपना ईपीएफ खाता, क्लेम की स्थिति और दस्तावेज़ देखने के लिए साइन इन करें।",
  "login.identifier": "ईमेल या मोबाइल नंबर",
  "login.identifier.placeholder": "जैसे priya.demo@example.test",
  "login.password": "पासवर्ड",
  "login.forgot": "पासवर्ड भूल गए?",
  "login.continue": "आगे बढ़ें",
  "login.authenticating": "जाँच की जा रही है...",
  "login.error.credentials": "ईमेल/फ़ोन या पासवर्ड गलत है।",
  "login.credentials.title": "प्रोटोटाइप के लॉगिन विवरण:",
  "login.credentials.clean": "सब ठीक",
  "login.credentials.mismatch": "नाम में अंतर",
  "login.credentials.rejected": "क्लेम रद्द",
  "login.credentials.clarification": "जानकारी चाहिए",
  "login.credentials.password": "पासवर्ड:",
  "login.otp.label": "वन-टाइम पासवर्ड (ओटीपी)",
  "login.otp.sent": "आपके पंजीकृत मोबाइल नंबर और ईमेल पर ओटीपी भेज दिया गया है।",
  "login.otp.placeholder": "6 अंकों का ओटीपी डालें",
  "login.otp.error": "ओटीपी गलत है। दोबारा कोशिश करें।",
  "login.otp.verify": "जाँचें और लॉग इन करें",
  "login.otp.verifying": "जाँचा जा रहा है...",
  "login.otp.resend": "ओटीपी दोबारा भेजें",
  "login.otp.resendIn": "{seconds} सेकंड में दोबारा भेजें",
  "login.otp.mockNotice": "नमूना ओटीपी है",
  "login.back": "पीछे",
  "login.backToLogin": "लॉगिन पर वापस",
  "login.forgot.prompt": "पासवर्ड रीसेट लिंक पाने के लिए अपनी जानकारी डालें।",
  "login.forgot.send": "रीसेट लिंक भेजें",
  "login.forgot.sending": "भेजा जा रहा है...",
  "login.forgot.sent": "पासवर्ड रीसेट की जानकारी भेज दी गई है। (काल्पनिक)",
  // ─── UAN activation ─────────────────────────────────────────────────────
  "uan.title": "अपना यूएएन चालू करें",
  "uan.prototypeTag": "प्रोटोटाइप",
  "uan.simNote": "यह प्रदर्शन आधार सत्यापन की नकल भर करता है।",
  "uan.needs.title": "आपको यह चाहिए होगा:",
  "uan.needs.uan": "आपका यूएएन (यूनिवर्सल अकाउंट नंबर)",
  "uan.needs.mobile": "आधार से जुड़ा मोबाइल नंबर",
  "uan.needs.phone": "आपका फ़ोन आपके पास हो",
  "uan.start": "चालू करना शुरू करें",
  "uan.step1": "चरण 1: अपनी जानकारी जाँचें",
  "uan.step1.label": "अपना यूएएन डालें",
  "uan.step1.placeholder": "12 अंकों का यूएएन",
  "uan.checking": "जाँचा जा रहा है...",
  "uan.step2": "चरण 2: मोबाइल नंबर जाँचें",
  "uan.step2.label": "आधार से जुड़ा मोबाइल नंबर",
  "uan.step2.placeholder": "10 अंकों का मोबाइल नंबर",
  "uan.connecting": "जोड़ा जा रहा है...",
  "uan.sendOtp": "ओटीपी भेजें",
  "uan.step3": "चरण 3: आधार सत्यापन",
  "uan.consent":
    "आगे बढ़ने पर आप ईपीएफओ को अपनी पहचान जाँचने के लिए अपने आधार विवरण इस्तेमाल करने की सहमति देते हैं।",
  "uan.processing": "प्रक्रिया चल रही है...",
  "uan.consentCta": "मैं सहमत हूँ, आधार ओटीपी भेजें",
  "uan.step4": "चरण 4: ओटीपी की पुष्टि",
  "uan.step4.label": "आधार ओटीपी डालें",
  "uan.step4.sent": "{last4} पर ख़त्म होने वाले आपके मोबाइल नंबर पर ओटीपी भेज दिया गया है।",
  "uan.step4.placeholder": "6 अंकों का ओटीपी",
  "uan.verifying": "जाँचा जा रहा है...",
  "uan.activate": "जाँचें और चालू करें",
  "uan.step5": "चरण 5: यूएएन चालू हो गया",
  "uan.step5.body": "आपका यूएएन अब चालू है और आपके आधार से जुड़ा हुआ है।",
  "uan.proceed": "लॉगिन पर जाएँ",
  // ─── Dashboard ──────────────────────────────────────────────────────────
  "dash.greeting.morning": "सुप्रभात,",
  "dash.greeting.afternoon": "नमस्कार,",
  "dash.greeting.evening": "शुभ संध्या,",
  "dash.claimReadiness": "क्लेम की तैयारी",
  "dash.allSet": "आपका सब कुछ तैयार है।",
  "dash.needsAttention":
    "क्लेम जमा करने से पहले आपके खाते की कुछ जानकारी ठीक करनी होगी।",
  "dash.reviewReadiness": "क्लेम की तैयारी देखें",
  "dash.nextSteps": "आपके अगले कदम",
  "dash.noPending": "आपके खाते में अभी कुछ करना बाकी नहीं है।",
  "dash.recentActivity": "हाल की गतिविधि",
  "dash.noRecentActivity": "कोई हाल की गतिविधि नहीं।",
  "dash.viewAll": "सब देखें",
  "dash.documents": "दस्तावेज़",
  "dash.employment": "नौकरी",
  "dash.exploreServices": "अन्य सेवाएँ देखें",
  "dash.exploreServices.sub": "पासबुक, केवाईसी, शिकायत, पेंशन और बहुत कुछ",

  "health.aadhaarVerified": "आधार सत्यापित",
  "health.aadhaarPending": "आधार बाकी",
  "health.allKycVerified": "पूरी केवाईसी सत्यापित",
  "health.panUnverified": "पैन असत्यापित",
  "health.bankUnverified": "बैंक असत्यापित",
  "health.currentEmployer": "मौजूदा नियोक्ता",

  "nextSteps.title": "आपके अगले कदम",
  "nextSteps.subtitle": "खाता तैयार करने के लिए ये काम पूरे करें",
  "nextSteps.allSet": "सब तैयार है!",
  "nextSteps.noAction": "कुछ करने की ज़रूरत नहीं। आपका खाता क्लेम के लिए तैयार है।",
  "nextSteps.reviewName": "नाम का अंतर देखें",
  "nextSteps.verifyBank": "बैंक खाता सत्यापित करें",
  "nextSteps.reviewPrevious": "पुराना पीएफ खाता देखें",

  "activity.recent": "हाल की गतिविधि",
  "activity.none": "कोई हाल की गतिविधि नहीं",
  "activity.title": "गतिविधि और सूचनाएँ",
  "activity.subtitle": "अपने खाते की हाल की गतिविधि और ज़रूरी सूचनाएँ देखें।",
  "activity.history": "गतिविधि का इतिहास",
  "activity.notifications": "सूचनाएँ",
  "activity.noNotifications": "कोई सूचना नहीं।",
  "activity.service": "ईपीएफओ क्लेम सेवा",
  "activity.claims": "क्लेम",
  "activity.profile": "प्रोफ़ाइल",

  "consolidation.review": "मिलाने वाले खाते देखें",
  "consolidation.verifiedMatch": "मिलान सत्यापित",
  "consolidation.confirm": "ट्रांसफर की पुष्टि करें",
  "consolidation.success": "ट्रांसफर शुरू हो गया",

  "employment.current": "मौजूदा नौकरी",
  "employment.previous": "पिछली नौकरी",
  "employment.present": "अब तक",
  "employment.pfBalance": "पीएफ बैलेंस",
  "employment.status": "स्थिति",
  "employment.active": "पीएफ खाता चालू",
  "employment.activeDetail": "खाता चालू है और उसमें योगदान आ रहा है",
  "employment.consolidated": "रकम मिला दी गई है",
  "employment.recommended": "खाते मिलाना बेहतर होगा",
  "employment.title": "मेरी नौकरी",
  "employment.subtitle": "आपकी नौकरियों का ब्यौरा और उनसे जुड़े प्रोविडेंट फंड खाते।",
  "employment.currentEmployer": "मौजूदा नियोक्ता",
  "employment.previousEmployer": "पिछला नियोक्ता",
  "employment.accountNo": "पीएफ खाता संख्या",
  "employment.accumulated": "जमा हुई रकम",
  "employment.consolidationStatus": "खाते मिलाने की स्थिति",
  "employment.activeAccount": "चालू खाता",
  "employment.notMerged":
    "इस पुराने खाते की रकम अभी आपके मौजूदा खाते में नहीं मिली है। ब्याज लगातार मिलता रहे, इसके लिए इसे ट्रांसफर कर लें।",
  "common.close": "बंद करें",

  "claims.title": "मेरे क्लेम",
  "claims.subtitle":
    "अपने सभी जमा किए गए क्लेम देखें, उन्हें भी जिनमें आपसे कुछ चाहिए।",
  "claims.status.processing": "प्रक्रिया में",
  "claims.status.approved": "मंज़ूर",
  "claims.status.rejected": "रद्द",
  "claims.status.clarification": "आपके जवाब का इंतज़ार",

  "docs.title": "दस्तावेज़ केंद्र",
  "docs.subtitle": "केवाईसी, क्लेम की जाँच और पहचान के लिए इस्तेमाल होने वाले दस्तावेज़ संभालें।",
  "docs.digilockerConnected": "डिजिलॉकर जुड़ा हुआ है",
  "docs.connectPrompt":
    "अपना आधार, पैन और दूसरे सरकारी दस्तावेज़ सुरक्षित तरीके से पाने के लिए डिजिलॉकर जोड़ें।",
  "docs.connect": "डिजिलॉकर जोड़ें",
  "docs.none": "डिजिलॉकर में कोई दस्तावेज़ नहीं मिला।",
  "docs.employerDocs": "नियोक्ता के दस्तावेज़",
  "docs.yourUploads": "आपके अपलोड किए दस्तावेज़",
  "docs.uploaded": "दस्तावेज़ अपलोड हो गया। अब यह क्लेम के लिए उपलब्ध है।",
  "docs.status.connected": "जुड़ा हुआ",
  "docs.status.needsAttention": "ध्यान चाहिए",
  "docs.status.processing": "प्रक्रिया में",
  "docs.prototypeNote": "प्रोटोटाइप नोट:",

  "connected.title": "जुड़ी हुई सेवाएँ",
  "connected.subtitle":
    "क्लेम और सत्यापन आसान बनाने के लिए बाहरी सरकारी सेवाएँ जोड़ें।",
  "connected.authenticating": "जाँच की जा रही है...",
  "connected.connecting": "डिजिलॉकर सेवाओं से सुरक्षित रूप से जोड़ा जा रहा है।",
  "connected.success": "सफलतापूर्वक जुड़ गया",
  "connected.synced": "आपके दस्तावेज़ जुड़ गए हैं। भेजा जा रहा है...",
  "connected.linked":
    "आपका खाता जुड़ गया है। दस्तावेज़ अपने आप सिंक होते रहेंगे।",
  "connected.simulated": "प्रोटोटाइप का काल्पनिक कनेक्शन",
  "connected.noRealData": "यह असल में डिजिलॉकर से नहीं जुड़ेगा और न ही कोई असली डेटा लेगा।",
  "connected.backToDocs": "दस्तावेज़ केंद्र पर वापस",

  "profile.title": "प्रोफ़ाइल सेटिंग",
  "profile.subtitle":
    "अपनी निजी जानकारी, केवाईसी विवरण और सुरक्षा से जुड़ी पसंद यहाँ संभालें।",
  "profile.personal": "निजी जानकारी",
  "profile.nameAadhaar": "नाम (आधार के अनुसार)",
  "profile.dob": "जन्म तिथि",
  "profile.contact": "संपर्क जानकारी",
  "profile.mobile": "मोबाइल नंबर",
  "profile.email": "ईमेल पता",
  "profile.identityKyc": "पहचान और केवाईसी",
  "profile.aadhaarCard": "आधार कार्ड",
  "profile.panCard": "पैन कार्ड",
  "profile.bankAccount": "बैंक खाता",
  "profile.accountDetails": "खाते का विवरण",
  "profile.bankNeedsVerification":
    "निकासी का क्लेम जमा करने से पहले आपके नियोक्ता को आपके बैंक विवरण की पुष्टि करनी होगी।",

  "pf.title": "पीएफ खाते का विवरण",
  "pf.accountInfo": "खाते की जानकारी",
  "pf.employer": "नियोक्ता",
  "pf.establishmentId": "प्रतिष्ठान आईडी",
  "pf.period": "नौकरी की अवधि",
  "pf.lastContribution": "आख़िरी योगदान",
  "pf.totalBalance": "कुल बैलेंस",
  "pf.contributionSummary": "योगदान का सारांश (काल्पनिक)",
  "pf.employeeShare": "कर्मचारी का हिस्सा",
  "pf.employerShare": "नियोक्ता का हिस्सा",
  "pf.pensionShare": "पेंशन का हिस्सा",
  "pf.activeAccount": "चालू खाता",
  "pf.activeContributions": "योगदान जारी है",
  "pf.consolidated": "मिला दिया गया",
  "pf.unconsolidated": "अभी नहीं मिला",
  "pf.transferRecommended": "ट्रांसफर करना बेहतर",
  "common.unknown": "पता नहीं",
  "docs.prototypeNote.body":
    "दस्तावेज़ अपलोड और डिजिलॉकर सिंक काल्पनिक हैं। कोई असली फ़ाइल न सहेजी जाती है, न भेजी जाती है।",
  // ─── Contextual help ────────────────────────────────────────────────────
  "help.aria": "मदद चाहिए?",
  "help.title": "सेवा सहायक",
  "help.intro": "नमस्ते! इस पेज की जानकारी समझने में मैं आपकी मदद कर सकता हूँ।",
  "help.suggested": "आम सवाल",
  "help.didThisHelp": "क्या इससे मदद मिली?",
  "help.yes": "हाँ, धन्यवाद",
  "help.needMore": "मुझे और मदद चाहिए",
  "help.status.q1": "मेरा क्लेम अब तक प्रक्रिया में क्यों है?",
  "help.status.a1":
    "क्लेम में आम तौर पर 20 दिन तक लगते हैं। इससे ज़्यादा समय लगने पर आप मदद माँग सकते हैं।",
  "help.status.q2": "“क्षेत्रीय कार्यालय में प्रक्रिया” का क्या मतलब है?",
  "help.status.a2":
    "आपका क्लेम आख़िरी जाँच के लिए आपके नियोक्ता के पास वाले स्थानीय कार्यालय को भेज दिया गया है।",
  "help.preflight.q1": "नाम में अंतर हो तो क्या करें?",
  "help.preflight.a1":
    "आप संयुक्त घोषणापत्र से सुधार के लिए आवेदन कर सकते हैं। इस प्रोटोटाइप में वह सुधार करके दिखाया गया है।",
  "help.preflight.q2": "मेरा बैंक खाता अब तक क्यों नहीं जुड़ा?",
  "help.preflight.a2":
    "बैंक खातों पर आपके नियोक्ता के डिजिटल हस्ताक्षर ज़रूरी हैं। अपने एचआर विभाग से संपर्क करें।",
  "help.documents.q1": "मुझे कौन-से दस्तावेज़ चाहिए?",
  "help.documents.a1":
    "ज़्यादातर निकासी के लिए रद्द किया गया चेक या पासबुक की कॉपी चाहिए। नाम सुधारने के लिए आधार या पासपोर्ट लग सकता है।",
  "help.documents.q2": "क्या मैं डिजिलॉकर का दस्तावेज़ इस्तेमाल कर सकता हूँ?",
  "help.documents.a2":
    "हाँ, डिजिलॉकर जोड़ने पर आपका सत्यापित आधार और पैन अपने आप आ जाता है।",
  "help.default.q1": "मैं अपनी केवाईसी कैसे अपडेट करूँ?",
  "help.default.a1": "केवाईसी अपडेट शुरू करने के लिए अपनी प्रोफ़ाइल सेटिंग में जाएँ।",
  "help.default.q2": "मेरा यूएएन कहाँ मिलेगा?",
  "help.default.a2":
    "आपका यूएएन आपकी सैलरी स्लिप पर छपा होता है, या मुख्य पोर्टल पर “Know Your UAN” से पता कर सकते हैं।",
  "login.credentials.moreScenarios":
    "और भी परिस्थितियाँ (बिना मिला यूएएन, देर से चल रहा क्लेम, कई दिक्कतें) लॉग इन करने के बाद प्रोफ़ाइल मेन्यू → “नमूना परिस्थितियाँ” में एक क्लिक पर मिल जाएँगी।",
};
