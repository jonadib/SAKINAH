// ======= DOM Elements =======
const startBtn = document.getElementById("startBtn");
const landing = document.getElementById("landing");
const app = document.getElementById("app");

const moodGrid = document.getElementById("moodGrid");
const verseArabic = document.getElementById("verseArabic");
const verseTrans = document.getElementById("verseTrans");
const verseRef = document.getElementById("verseRef");

const copyBtn = document.getElementById("copyBtn");
const toggleTransBtn = document.getElementById("toggleTransBtn");
const favBtn = document.getElementById("favBtn");
const favoritesList = document.getElementById("favoritesList");
const shareBtn = document.getElementById("shareBtn");
const copySupportBtn = document.getElementById("copySupportBtn");

let currentMood = null;
let currentVerse = null;
let showTranslation = true;

// ======= Landing Page Logic =======
startBtn.onclick = () => {
  landing.classList.add("fade-out");
  setTimeout(() => {
    landing.style.display = "none";
    app.classList.add("show");
  }, 800);
};

// ======= Core Emotions & Verses =======
const verses = {
  peaceful: [
    { arabic: "الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ", translation: "Those who believe and whose hearts find rest in the remembrance of Allah.", reference: "Quran 13:28" },
    { arabic: "وَأَنزَلَ السَّكِينَةَ فِي قُلُوبِهِمْ", translation: "And He sent down tranquility into the believers’ hearts.", reference: "Quran 48:4" },
    { arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ", translation: "So remember Me; I will remember you.", reference: "Quran 2:152" },
    { arabic: "رَبِّ لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا", translation: "My Lord, let not our hearts deviate after You have guided us.", reference: "Quran 3:8" },
    { arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", translation: "Indeed, Allah is with the patient.", reference: "Quran 2:153" },
    { arabic: "وَالَّذِينَ هُمْ لِفُرُوجِهِمْ حَافِظُونَ", translation: "And those who guard their chastity.", reference: "Quran 23:5" },
    { arabic: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ", translation: "Allah is the Light of the heavens and the earth.", reference: "Quran 24:35" },
    { arabic: "وَمَن يَتَوَكّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", translation: "And whoever relies upon Allah – He is sufficient for him.", reference: "Quran 65:3" },
    { arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", translation: "Indeed, with hardship comes ease.", reference: "Quran 94:6" },
    { arabic: "وَسَيَجْعَلُ اللَّهُ بَعْدَ عُسْرٍ يُسْرًا", translation: "And Allah will bring after hardship ease.", reference: "Quran 65:7" },
    { arabic: "هُوَ الَّذِي أَنزَلَ السَّكِينَةَ فِي قُلُوبِ الْمُؤْمِنِينَ لِيَزْدَادُوا إِيمَانًا مَّعَ إِيمَانِهِمْ", translation: "He it is Who sent down tranquility into the hearts of the believers that they might have more faith added to their faith.", reference: "Quran 48:4" },
    { arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", translation: "Verily, in the remembrance of Allah do hearts find rest.", reference: "Quran 13:28" },
    { arabic: "يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ ارْجِعِي إِلَىٰ رَبِّكِ رَاضِيَةً مَّرْضِيَّةً", translation: "O soul that are at rest! Return to your Lord, well-pleased, well-pleasing.", reference: "Quran 89:27-28" },
    { arabic: "وَاللَّهُ يَدْعُو إِلَىٰ دَارِ السَّلَامِ", translation: "And Allah invites to the Home of Peace.", reference: "Quran 10:25" },
    { arabic: "لَهُمْ دَارُ السَّلَامِ عِندَ رَبِّهِمْ", translation: "For them will be the Home of Peace with their Lord.", reference: "Quran 6:127" },
    { arabic: "يَهْدِي بِهِ اللَّهُ مَنِ اتَّبَعَ رِضْوَانَهُ سُبُلَ السَّلَامِ", translation: "Whereby Allah guides him who seeks His good pleasure to paths of peace.", reference: "Quran 5:16" },
    { arabic: "خَالِدِينَ فِيهَا بِإِذْنِ رَبِّهِمْ ۖ تَحِيَّتُهُمْ فِيهَا سَلَامٌ", translation: "Abiding therein by permission of their Lord. Their greeting therein will be, 'Peace!'", reference: "Quran 14:23" },
    { arabic: "ادْخُلُوهَا بِسَلَامٍ آمِنِينَ", translation: "Enter it in peace and safety.", reference: "Quran 15:46" },
    { arabic: "سَلَامٌ قَوْلًا مِّن رَّبٍّ رَّحِيمٍ", translation: "Peace! a word from a Merciful Lord.", reference: "Quran 36:58" },
    { arabic: "وَأُدْخِلَ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ جَنَّاتٍ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا بِإِذْنِ رَبِّهِمْ ۖ تَحِيَّتُهُمْ فِيهَا سَلَامٌ", translation: "But those who believed and did righteous deeds will be admitted to gardens beneath which rivers flow, abiding eternally therein by permission of their Lord; and their greeting therein will be, 'Peace!'", reference: "Quran 14:23" }

  ],
  hope: [
    { arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", translation: "Indeed, with hardship comes ease.", reference: "Quran 94:6" },
    { arabic: "وَمَنْ يَتَّقِ اللَّـهَ يَجْعَلْ لَهُ مَخْرَجًا", translation: "And whoever fears Allah... He will make a way for him.", reference: "Quran 65:2" },
    { arabic: "إِنَّ رَبَّكُمْ وَاسِعُ الْمَغْفِرَةِ", translation: "Indeed, your Lord is vast in forgiveness.", reference: "Quran 39:53" },
    { arabic: "وَاللَّهُ خَيْرُ الرَّازِقِينَ", translation: "And Allah is the best of providers.", reference: "Quran 62:11" },
    { arabic: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ", translation: "And seek help through patience and prayer.", reference: "Quran 2:45" },
    { arabic: "فَإِنَّ رَبَّكَ لَهُوَ الْغَفُورُ الرَّحِيمُ", translation: "Indeed, your Lord – He is the Forgiving, the Merciful.", reference: "Quran 85:14" },
    { arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا", translation: "Our Lord, let not our hearts deviate.", reference: "Quran 3:8" },
    { arabic: "فَاصْبِرْ إِنَّ وَعْدَ اللَّهِ حَقٌّ", translation: "So be patient; indeed the promise of Allah is true.", reference: "Quran 30:60" },
    { arabic: "وَمَنْ يَتَوَكَّلْ عَلَى اللَّـهِ فَهُوَ حَسْبُهُ", translation: "And whoever relies upon Allah – He is sufficient for him.", reference: "Quran 65:3" },
    { arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا", translation: "So do not weaken and do not grieve.", reference: "Quran 3:139" },
    { arabic: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ", translation: "And never give up hope of Allah’s soothing mercy.", reference: "Quran 12:87" },
    { arabic: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ", translation: "Say: 'O my Servants who have transgressed against their souls! Despair not of the Mercy of Allah.'", reference: "Quran 39:53" },
    { arabic: "وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ", translation: "But perhaps you hate a thing and it is good for you.", reference: "Quran 2:216" },
    { arabic: "اللَّهُ لَطِيفٌ بِعِبَادِهِ", translation: "Allah is very Gracious to His servants.", reference: "Quran 42:19" },
    { arabic: "وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ", translation: "And We are nearer to him than his jugular vein.", reference: "Quran 50:16" },
    { arabic: "إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِّنَ الْمُحْسِنِينَ", translation: "Indeed, the mercy of Allah is near to the doers of good.", reference: "Quran 7:56" },
    { arabic: "وَمَا ذَٰلِكَ عَلَى اللَّهِ بِعَزِيزٍ", translation: "And that is not difficult for Allah.", reference: "Quran 14:20" },
    { arabic: "قَالَ وَمَن يَقْنَطُ مِن رَّحْمَةِ رَبِّهِ إِلَّا الضَّالُّونَ", translation: "He said: 'And who despairs of the mercy of his Lord but those who are astray?'", reference: "Quran 15:56" },
    { arabic: "فَإِنَّمَا يُرِيدُ اللَّهُ أَن يُعَذِّبَهُم بِهَا فِي الدُّنْيَا", translation: "Allah only intends to punish them through these things in this world.", reference: "Quran 9:55" },
    { arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مِنْ أَمْرِهِ يُسْرًا", translation: "And whoever fears Allah, He will make for him of his matter ease.", reference: "Quran 65:4" }
  ],
  sad: [
    { arabic: "لَا يُكَلِّفُ اللَّـهُ نَفْسًا إِلَّا وُسْعَهَا", translation: "Allah does not burden a soul beyond that it can bear.", reference: "Quran 2:286" },
    { arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", translation: "Indeed, with hardship comes ease.", reference: "Quran 94:6" },
    { arabic: "رَبِّ إِنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ", translation: "My Lord, indeed adversity has touched me, and You are the Most Merciful.", reference: "Quran 21:83" },
    { arabic: "وَمَا رَبُّكَ بِظَلَّامٍ لِلْعَبِيدِ", translation: "And your Lord is not ever unjust to the servants.", reference: "Quran 41:46" },
    { arabic: "إِنَّ اللّهَ مَعَ الَّذِينَ اتَّقَوْا وَالَّذِينَ هُمْ مُحْسِنُونَ", translation: "Indeed, Allah is with those who fear Him and those who do good.", reference: "Quran 16:128" },
    { arabic: "فَاصْبِرْ صَبْرًا جَمِيلًا", translation: "So be patient with a beautiful patience.", reference: "Quran 70:5" },
    { arabic: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ", translation: "And seek help through patience and prayer.", reference: "Quran 2:45" },
    { arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا", translation: "So do not weaken and do not grieve.", reference: "Quran 3:139" },
    { arabic: "إِنَّ رَبَّكَ لَذُو مَغْفِرَةٍ", translation: "Indeed, your Lord is full of forgiveness.", reference: "Quran 40:7" },
    { arabic: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا", translation: "Our Lord, do not impose blame upon us if we have forgotten or erred.", reference: "Quran 2:286" },
    { arabic: "وَلَا تَحْزَنْ عَلَيْهِمْ وَلَا تَكُ فِي ضَيْقٍ مِّمَّا يَمْكُرُونَ", translation: "And grieve not over them, and be not in distress because of what they plot.", reference: "Quran 27:70" },
    { arabic: "قَالَ إِنَّمَا أَشْكُو بَثِّي وَحُزْنِي إِلَى اللَّهِ", translation: "He said, 'I only complain of my suffering and my grief to Allah.'", reference: "Quran 12:86" },
    { arabic: "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ", translation: "And We send down of the Qur'an that which is healing and mercy for the believers.", reference: "Quran 17:82" },
    { arabic: "وَبَشِّرِ الصَّابِرِينَ", translation: "And give good tidings to the patient.", reference: "Quran 2:155" },
    { arabic: "إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ", translation: "Indeed, the patient will be given their reward without account.", reference: "Quran 39:10" },
    { arabic: "يَا بَنِيَّ اذْهَبُوا فَتَحَسَّسُوا مِن يُوسُفَ وَأَخِيهِ وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ", translation: "O my sons, go and find out about Joseph and his brother and do not despair of relief from Allah.", reference: "Quran 12:87" },
    { arabic: "وَلَنَبْلُوَنَّكُم بِشَيْءٍ مِّنَ الْخَوْفِ وَالْجُوعِ وَنَقْصٍ مِّنَ الْأَمْوَالِ وَالْأَنفُسِ وَالثَّمَرَاتِ", translation: "And We will surely test you with something of fear and hunger and a loss of wealth and lives and fruits.", reference: "Quran 2:155" },
    { arabic: "الَّذِينَ إِذَا أَصَابَتْهُم مُّصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ", translation: "Who, when disaster strikes them, say, 'Indeed we belong to Allah, and indeed to Him we will return.'", reference: "Quran 2:156" },
    { arabic: "مَا أَصَابَ مِن مُّصِيبَةٍ إِلَّا بِإِذْنِ اللَّهِ", translation: "No disaster strikes except by permission of Allah.", reference: "Quran 64:11" },
    { arabic: "وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ ۖ وَعَسَىٰ أَن تُحِبُّوا شَيْئًا وَهُوَ شَرٌّ لَّكُمْ", translation: "But perhaps you hate a thing and it is good for you; and perhaps you love a thing and it is bad for you.", reference: "Quran 2:216" }

  ],
  gratitude: [
    { arabic: "وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ", translation: "And be grateful to Me and do not deny Me.", reference: "Quran 2:152" },
    { arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ", translation: "If you are grateful, I will surely increase you [in favor].", reference: "Quran 14:7" },
    { arabic: "وَمَا بِكُم مِّن نِّعْمَةٍ فَمِنَ اللَّهِ", translation: "And whatever of blessings you have is from Allah.", reference: "Quran 16:53" },
    { arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ", translation: "My Lord, inspire me to be grateful for Your favor.", reference: "Quran 27:19" },
    { arabic: "وَإِذْ تَأَذَّنَ رَبُّكُمْ أَنِّي لَا أُضِيعُ عَمَلَ عَامِلٍ", translation: "When your Lord announced that He does not let deeds go to waste.", reference: "Quran 3:195" },
    { arabic: "وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ", translation: "And Allah loves the doers of good.", reference: "Quran 2:195" },
    { arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ", translation: "So remember Me; I will remember you.", reference: "Quran 2:152" },
    { arabic: "قُلِ ٱلَّذِينَ يَسْتَحِقُّونَ الشُّكْرَ", translation: "Say, those who deserve gratitude.", reference: "Quran 4:147" },
    { arabic: "وَلَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ", translation: "And if you are grateful, I will increase you.", reference: "Quran 14:7" },
    { arabic: "وَمَا أَنفَقْتُم مِّن شَيْءٍ فَهُوَ يُخْلِفُهُ", translation: "And whatever you spend, Allah will replace it.", reference: "Quran 34:39" },
    { arabic: "فَاذْكُرُوا آلَاءَ اللَّهِ لَعَلَّكُمْ تُفْلِحُونَ", translation: "Then remember the bounties of Allah that you may be successful.", reference: "Quran 7:69" },
    { arabic: "وَإِن تَعُدُّوا نِعْمَتَ اللَّهِ لَا تُحْصُوهَا", translation: "And if you should count the favor of Allah, you could not enumerate them.", reference: "Quran 14:34" },
    { arabic: "هَٰذَا مِن فَضْلِ رَبِّي لِيَبْلُوَنِي أَأَشْكُرُ أَمْ أَكْفُرُ", translation: "This is from the favor of my Lord to test me whether I will be grateful or ungrateful.", reference: "Quran 27:40" },
    { arabic: "بَلِ اللَّهَ فَاعْبُدْ وَكُن مِّنَ الشَّاكِرِينَ", translation: "Rather, worship [only] Allah and be among the grateful.", reference: "Quran 39:66" },
    { arabic: "فَكُلُوا مِمَّا رَزَقَكُمُ اللَّهُ حَلَالًا طَيِّبًا وَاشْكُرُوا نِعْمَتَ اللَّهِ إِن كُنتُمْ إِيَّاهُ تَعْبُدُونَ", translation: "So eat of what Allah has provided for you [which is] lawful and good. And be grateful for the favor of Allah, if it is [indeed] Him that you worship.", reference: "Quran 16:114" },
    { arabic: "اعْمَلُوا آلَ دَاوُودَ شُكْرًا ۚ وَقَلِيلٌ مِّنْ عِبَادِيَ الشَّكُورُ", translation: "Work, O family of David, in gratitude. And few of My servants are grateful.", reference: "Quran 34:13" },
    { arabic: "وَسَنَجْزِي الشَّاكِرِينَ", translation: "And We will reward the grateful.", reference: "Quran 3:145" },
    { arabic: "وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ", translation: "But as for the favor of your Lord, report [it].", reference: "Quran 93:11" },
    { arabic: "وَمَن يَشْكُرْ فَإِنَّمَا يَشْكُرُ لِنَفْسِهِ", translation: "And whoever is grateful is only grateful for [the benefit of] himself.", reference: "Quran 31:12" },
    { arabic: "وَسَيَجْزِي اللَّهُ الشَّاكِرِينَ", translation: "And Allah will reward the grateful.", reference: "Quran 3:144" }
  ],
  lost: [
    { arabic: "وَوَجَدَكَ ضَالًّا فَهَدَىٰ", translation: "And He found you lost and guided you.", reference: "Quran 93:7" },
    { arabic: "قُلْ إِنَّ هُدَى اللَّهِ هُوَ الْهُدَىٰ", translation: "Say, indeed the guidance of Allah is the true guidance.", reference: "Quran 6:71" },
    { arabic: "إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ", translation: "Indeed, this Qur’an guides to that which is most suitable.", reference: "Quran 17:9" },
    { arabic: "إِنَّ رَبِّي عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ", translation: "Indeed, my Lord is on a straight path.", reference: "Quran 11:56" },
    { arabic: "إِنَّ هُدَى اللَّهِ هُوَ الْهُدَىٰ", translation: "Indeed, the guidance of Allah is the guidance.", reference: "Quran 2:120" },
    { arabic: "وَمَن يَهْدِ اللَّهُ فَهُوَ الْمُهْتَدِي", translation: "And whomever Allah guides – he is rightly guided.", reference: "Quran 7:178" },
    { arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", translation: "Guide us to the straight path.", reference: "Quran 1:6" },
    { arabic: "وَمَن يَعْشُ عَن ذِكْرِ الرَّحْمَـٰنِ نُقَيِّضْ لَهُ شَيْطَانًا", translation: "And whoever turns away from the remembrance of the Most Merciful – We appoint for him a devil.", reference: "Quran 43:36" },
    { arabic: "إِن تَهْدِهِمْ فَإِنَّهُمْ عِبَادُكَ", translation: "If You guide them – indeed they are Your servants.", reference: "Quran 5:118" },
    { arabic: "إِنَّ رَبِّي لَسَمِيعُ الدُّعَاءِ", translation: "Indeed, my Lord is the Hearer of supplication.", reference: "Quran 14:39" },
    { arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ", translation: "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.", reference: "Quran 3:8" },
    { arabic: "وَأَنَّ هَٰذَا صِرَاطِي مُسْتَقِيمًا فَاتَّبِعُوهُ ۖ وَلَا تَتَّبِعُوا السُّبُلَ فَتَفَرَّقَ بِكُمْ عَن سَبِيلِهِ", translation: "And, [moreover], this is My path, which is straight, so follow it; and do not follow [other] ways, for you will be separated from His way.", reference: "Quran 6:153" },
    { arabic: "فَمَن يُرِدِ اللَّهُ أَن يَهْدِيَهُ يَشْرَحْ صَدْرَهُ لِلْإِسْلَامِ", translation: "So whoever Allah wants to guide - He expands his breast to [contain] Islam.", reference: "Quran 6:125" },
    { arabic: "قُلْ إِن ضَلَلْتُ فَإِنَّمَا أَضِلُّ عَلَىٰ نَفْسِي ۖ وَإِنِ اهْتَدَيْتُ فَبِمَا يُوحِي إِلَيَّ رَبِّي", translation: "Say, 'If I should err, I would only err against myself. But if I am guided, it is by what my Lord reveals to me.'", reference: "Quran 34:50" },
    { arabic: "وَاللَّهُ يَقُولُ الْحَقَّ وَهُوَ يَهْدِي السَّبِيلَ", translation: "And Allah says the truth, and He guides to the [right] way.", reference: "Quran 33:4" },
    { arabic: "أَفَمَن يَمْشِي مُكِبًّا عَلَىٰ وَجْهِهِ أَهْدَىٰ أَمَّن يَمْشِي سَوِيًّا عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ", translation: "Then is one who walks fallen on his face better guided or one who walks upright on a straight path?", reference: "Quran 67:22" },
    { arabic: "مَن يَهْدِ اللَّهُ فَهُوَ الْمُهْتَدِ ۖ وَمَن يُضْلِلْ فَلَن تَجِدَ لَهُ وَلِيًّا مُّرْشِدًا", translation: "He whom Allah guides is the [rightly] guided, but he whom He sends astray - never will you find for him a protecting guide.", reference: "Quran 18:17" },
    { arabic: "وَمَا كَانَ اللَّهُ لِيُضِلَّ قَوْمًا بَعْدَ إِذْ هَدَاهُمْ حَتَّىٰ يُبَيِّنَ لَهُم مَّا يَتَّقُونَ", translation: "And Allah would not let a people stray after He has guided them until He makes clear to them what they should avoid.", reference: "Quran 9:115" },
    { arabic: "إِنَّ عَلَيْنَا لَلْهُدَىٰ", translation: "Indeed, upon Us is guidance.", reference: "Quran 92:12" },
    { arabic: "وَلِكُلِّ قَوْمٍ هَادٍ", translation: "And for every people is a guide.", reference: "Quran 13:7" }

  ],
  lonely: [
    { arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ", translation: "And He is with you wherever you are.", reference: "Quran 57:4" },
    { arabic: "إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا", translation: "Do not grieve; indeed Allah is with us.", reference: "Quran 9:40" },
    { arabic: "إِنَّ رَبِّي قَرِيبٌ مُّجِيبٌ", translation: "Indeed, my Lord is near and responsive.", reference: "Quran 11:61" },
    { arabic: "إِنَّ اللَّهَ مَعَ الَّذِينَ اتَّقَوا", translation: "Indeed, Allah is with those who fear Him.", reference: "Quran 16:128" },
    { arabic: "إِنِّي مَعَكُمَا أَسْمَعُ وَأَرَىٰ", translation: "Indeed, I am with you both; I hear and I see.", reference: "Quran 20:46" },
    { arabic: "إِنَّ اللَّهَ لَطِيفٌ بِعِبَادِهِ", translation: "Indeed, Allah is kind to His servants.", reference: "Quran 42:19" },
    { arabic: "إِنَّ رَبِّي مَعِي سَيَهْدِينِ", translation: "Indeed, my Lord is with me; He will guide me.", reference: "Quran 26:62" },
    { arabic: "وَمَا اللَّهُ بِغَافِلٍ عَمَّا تَعْمَلُونَ", translation: "And Allah is not unaware of what you do.", reference: "Quran 2:85" },
    { arabic: "إِنَّ رَبَّكَ وَاسِعُ الْمَغْفِرَةِ", translation: "Indeed, your Lord is vast in forgiveness.", reference: "Quran 53:32" },
    { arabic: "وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ", translation: "And My mercy encompasses all things.", reference: "Quran 7:156" },
    { arabic: "وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْكُمْ وَلَٰكِن لَّا تُبْصِرُونَ", translation: "And We are closer to him than you, but you do not see.", reference: "Quran 56:85" },
    { arabic: "فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ", translation: "Indeed, I am near. I respond to the invocation of the supplicant when he calls upon Me.", reference: "Quran 2:186" },
    { arabic: "مَا يَكُونُ مِن نَّجْوَىٰ ثَلَاثَةٍ إِلَّا هُوَ رَابِعُهُمْ وَلَا خَمْسَةٍ إِلَّا هُوَ سَادِسُهُمْ", translation: "There is in no private conversation of three but that He is the fourth of them, nor of five but that He is the sixth of them.", reference: "Quran 58:7" },
    { arabic: "أَلَيْسَ اللَّهُ بِكَافٍ عَبْدَهُ", translation: "Is not Allah sufficient for His Servant?", reference: "Quran 39:36" },
    { arabic: "وَكَانَ اللَّهُ عَلَىٰ كُلِّ شَيْءٍ رَّقِيبًا", translation: "And ever is Allah, over all things, an Observer.", reference: "Quran 33:52" },
    { arabic: "وَاصْبِرْ لِحُكْمِ رَبِّكَ فَإِنَّكَ بِأَعْيُنِنَا", translation: "And be patient, [O Muhammad], for the decision of your Lord, for indeed, you are in Our eyes.", reference: "Quran 52:48" },
    { arabic: "وَتَوَكَّلْ عَلَى الْحَيِّ الَّذِي لَا يَمُوتُ", translation: "And rely upon the Ever-Living who does not die.", reference: "Quran 25:58" },
    { arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ", translation: "The believers are but brothers.", reference: "Quran 49:10" },
    { arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ", translation: "So remember Me; I will remember you.", reference: "Quran 2:152" },
    { arabic: "وَهُوَ الَّذِي فِي السَّمَاءِ إِلَٰهٌ وَفِي الْأَرْضِ إِلَٰهٌ", translation: "And it is He who is God in the heaven and God on the earth.", reference: "Quran 43:84" }

  ],
  fear: [
    { arabic: "لَا تَخَافَا إِنَّنِي مَعَكُمَا أَسْمَعُ وَأَرَىٰ", translation: "Fear not. Indeed, I am with you both; I hear and I see.", reference: "Quran 20:46" },
    { arabic: "الَّذِينَ قَالَ لَهُمُ النَّاسُ ... فَزَادَهُمْ إِيمَانًا", translation: "Those to whom people said, 'Indeed, the people have gathered against you, so fear them.' But it only increased them in faith.", reference: "Quran 3:173" },
    { arabic: "أَلَا إِنَّ أَوْلِيَاءَ اللَّهِ لَا خَوْفٌ عَلَيْهِمْ", translation: "Unquestionably, the allies of Allah – there will be no fear concerning them.", reference: "Quran 10:62" },
    { arabic: "فَلَا تَخَافُوهُمْ وَخَافُونِ", translation: "So fear them not, but fear Me.", reference: "Quran 3:175" },
    { arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا", translation: "And whoever fears Allah – He will make for him a way out.", reference: "Quran 65:2" },
    { arabic: "وَمَن يَتَّقِ اللَّهَ يُكَفِّرْ عَنْهُ سَيِّئَاتِهِ", translation: "And whoever fears Allah – He will remove for him his misdeeds.", reference: "Quran 65:5" },
    { arabic: "وَاتَّقُوا اللَّهَ وَاعْلَمُوا أَنَّ اللَّهَ مَعَ الْمُتَّقِينَ", translation: "And fear Allah and know that Allah is with the righteous.", reference: "Quran 2:194" },
    { arabic: "وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُفْلِحُونَ", translation: "So fear Allah that you may succeed.", reference: "Quran 3:200" },
    { arabic: "إِنِّي أَخَافُ إِنْ عَصَيْتُ رَبِّي عَذَابَ يَوْمٍ عَظِيمٍ", translation: "Indeed I fear, if I disobey my Lord, the punishment of a tremendous Day.", reference: "Quran 6:15" },
    { arabic: "وَخَافُونِ إِن كُنتُم مُّؤْمِنِينَ", translation: "And fear Me, if you are believers.", reference: "Quran 3:175" },
    { arabic: "فَمَن تَبِعَ هُدَايَ فَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ", translation: "And whoever follows My guidance - there will be no fear concerning them, nor will they grieve.", reference: "Quran 2:38" },
    { arabic: "إِنَّمَا ذَٰلِكُمُ الشَّيْطَانُ يُخَوِّفُ أَوْلِيَاءَهُ فَلَا تَخَافُوهُمْ وَخَافُونِ إِن كُنتُم مُّؤْمِنِينَ", translation: "That is only Satan who frightens [you] with his allies. So fear them not, but fear Me, if you are [indeed] believers.", reference: "Quran 3:175" },
    { arabic: "قُل لَّن يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا", translation: "Say, 'Never will we be struck except by what Allah has decreed for us.'", reference: "Quran 9:51" },
    { arabic: "وَيُؤْمِنُونَ بِهِ وَيَسْتَغْفِرُونَ لِلَّذِينَ آمَنُوا رَبَّنَا وَسِعْتَ كُلَّ شَيْءٍ رَّحْمَةً وَعِلْمًا فَاغْفِرْ لِلَّذِينَ تَابُوا وَاتَّبَعُوا سَبِيلَكَ وَقِهِمْ عَذَابَ الْجَحِيمِ", translation: "And they believe in Him and ask forgiveness for those who have believed, [saying], 'Our Lord, You have encompassed all things in mercy and knowledge, so forgive those who have repented and followed Your way and protect them from the punishment of Hellfire.'", reference: "Quran 40:7" },
    { arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", translation: "Sufficient for us is Allah, and [He is] the best Disposer of affairs.", reference: "Quran 3:173" },
    { arabic: "وَإِمَّا يَنزَغَنَّكَ مِنَ الشَّيْطَانِ نَزْغٌ فَاسْتَعِذْ بِاللَّهِ", translation: "And if an evil suggestion comes to you from Satan, then seek refuge in Allah.", reference: "Quran 7:200" },
    { arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ مِن شَرِّ مَا خَلَقَ", translation: "Say, 'I seek refuge in the Lord of daybreak from the evil of that which He created.'", reference: "Quran 113:1-2" },
    { arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ مَلِكِ النَّاسِ إِلَٰهِ النَّاسِ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", translation: "Say, 'I seek refuge in the Lord of mankind, the Sovereign of mankind, the God of mankind, from the evil of the whisperer who withdraws.'", reference: "Quran 114:1-4" },
    { arabic: "وَالَّذِينَ آمَنُوا وَلَمْ يَلْبِسُوا إِيمَانَهُم بِظُلْمٍ أُولَٰئِكَ لَهُمُ الْأَمْنُ وَهُم مُّهْتَدُونَ", translation: "They who believe and do not mix their belief with injustice - those will have security, and they are [rightly] guided.", reference: "Quran 6:82" },
    { arabic: "إِنَّ الَّذِينَ قَالُوا رَبُّنَا اللَّهُ ثُمَّ اسْتَقَامُوا تَتَنَزَّلُ عَلَيْهِمُ الْمَلَائِكَةُ أَلَّا تَخَافُوا وَلَا تَحْزَنُوا", translation: "Indeed, those who have said, 'Our Lord is Allah' and then remained on a right course - the angels will descend upon them, [saying], 'Do not fear and do not grieve.'", reference: "Quran 41:30" }
  ],
  confident: [
    { arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ", translation: "Do not weaken and do not grieve, and you will be superior if you are believers.", reference: "Quran 3:139" },
    { arabic: "إِن يَنصُرْكُمُ اللَّهُ فَلَا غَالِبَ لَكُمْ", translation: "If Allah helps you, none can overcome you.", reference: "Quran 3:160" },
    { arabic: "فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ", translation: "And when you have decided, then rely upon Allah.", reference: "Quran 3:159" },
    { arabic: "وَعَلَى اللَّهِ فَتَوَكَّلُوا إِن كُنتُم مُّؤْمِنِينَ", translation: "And upon Allah rely, if you should be believers.", reference: "Quran 5:23" },
    { arabic: "فَتَوَكَّلْ عَلَى اللَّهِ إِنَّكَ عَلَى الْحَقِّ", translation: "So rely upon Allah; indeed, you are upon the truth.", reference: "Quran 27:79" },
    { arabic: "إِنَّ اللَّهَ مَعَ الَّذِينَ اتَّقَوْا", translation: "Indeed, Allah is with those who fear Him.", reference: "Quran 16:128" },
    { arabic: "وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ", translation: "Be patient, and your patience is not but through Allah.", reference: "Quran 16:127" },
    { arabic: "وَمَا النَّصْرُ إِلَّا مِنْ عِندِ اللَّهِ", translation: "And victory is not but from Allah.", reference: "Quran 8:10" },
    { arabic: "إِنَّ الْعِزَّةَ لِلَّهِ جَمِيعًا", translation: "Indeed, all honor belongs to Allah.", reference: "Quran 4:139" },
    { arabic: "إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ", translation: "Indeed, Allah loves those who rely upon Him.", reference: "Quran 3:159" },
    { arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", translation: "And whoever relies upon Allah - then He is sufficient for him.", reference: "Quran 65:3" },
    { arabic: "فَسَيَكْفِيكَهُمُ اللَّهُ", translation: "And Allah will be sufficient for you against them.", reference: "Quran 2:137" },
    { arabic: "أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ", translation: "Is not Allah the most just of judges?", reference: "Quran 95:8" },
    { arabic: "وَكَفَىٰ بِاللَّهِ وَكِيلًا", translation: "And sufficient is Allah as Disposer of affairs.", reference: "Quran 4:81" },
    { arabic: "وَكَفَىٰ بِاللَّهِ نَصِيرًا", translation: "And sufficient is Allah as a Helper.", reference: "Quran 4:45" },
    { arabic: "إِنَّ الْقُوَّةَ لِلَّهِ جَمِيعًا", translation: "Indeed, all might belongs to Allah.", reference: "Quran 2:165" },
    { arabic: "وَلِلَّهِ الْعِزَّةُ وَلِرَسُولِهِ وَلِلْمُؤْمِنِينَ", translation: "And to Allah belongs [all] honor, and to His Messenger, and to the believers.", reference: "Quran 63:8" },
    { arabic: "فَإِنَّ حِزْبَ اللَّهِ هُمُ الْغَالِبُونَ", translation: "For indeed, the party of Allah - they will be the predominant.", reference: "Quran 5:56" },
    { arabic: "وَمَا لَنَا أَلَّا نَتَوَكَّلَ عَلَى اللَّهِ وَقَدْ هَدَانَا سُبُلَنَا", translation: "And why should we not rely upon Allah while He has guided us to our ways?", reference: "Quran 14:12" },
    { arabic: "قُلْ إِنَّ الْأَمْرَ كُلَّهُ لِلَّهِ", translation: "Say, 'Indeed, the matter belongs entirely to Allah.'", reference: "Quran 3:154" }
  ],
  forgiveness: [
    { arabic: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا ... لَا تَقْنَطُوا", translation: "O My servants who have transgressed against themselves, do not despair of Allah’s mercy.", reference: "Quran 39:53" },
    { arabic: "إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا", translation: "Indeed, Allah forgives all sins.", reference: "Quran 39:53" },
    { arabic: "وَاسْتَغْفِرُوا رَبَّكُمْ ثُمَّ تُوبُوا إِلَيْهِ", translation: "Seek forgiveness of your Lord and repent to Him.", reference: "Quran 11:3" },
    { arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا", translation: "Our Lord, forgive us our sins.", reference: "Quran 3:16" },
    { arabic: "إِنَّ اللَّهَ كَانَ غَفُورًا رَّحِيمًا", translation: "Indeed, Allah is ever Forgiving and Merciful.", reference: "Quran 4:96" },
    { arabic: "وَإِنِّي لَغَفَّارٌ لِمَن تَابَ", translation: "I am indeed forgiving to whoever repents.", reference: "Quran 20:82" },
    { arabic: "إِنَّ رَبَّكَ وَاسِعُ الْمَغْفِرَةِ", translation: "Indeed, your Lord is vast in forgiveness.", reference: "Quran 53:32" },
    { arabic: "وَاللَّهُ يُرِيدُ أَن يَتُوبَ عَلَيْكُمْ", translation: "Allah wants to accept your repentance.", reference: "Quran 4:27" },
    { arabic: "إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ", translation: "Indeed, Allah loves those who repent.", reference: "Quran 2:222" },
    { arabic: "رَبِّ اغْفِرْ وَارْحَمْ", translation: "My Lord, forgive and have mercy.", reference: "Quran 23:118" },
    { arabic: "وَمَن يَغْفِرُ الذُّنُوبَ إِلَّا اللَّهُ", translation: "And who can forgive sins except Allah?", reference: "Quran 3:135" },
    { arabic: "فَقُلْتُ اسْتَغْفِرُوا رَبَّكُمْ إِنَّهُ كَانَ غَفَّارًا", translation: "And said, 'Ask forgiveness of your Lord. Indeed, He is ever a Perpetual Forgiver.'", reference: "Quran 71:10" },
    { arabic: "وَتُوبُوا إِلَى اللَّهِ جَمِيعًا أَيُّهَ الْمُؤْمِنُونَ لَعَلَّكُمْ تُفْلِحُونَ", translation: "And turn to Allah in repentance, all of you, O believers, that you might succeed.", reference: "Quran 24:31" },
    { arabic: "إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ", translation: "Indeed, good deeds do away with misdeeds.", reference: "Quran 11:114" },
    { arabic: "نَبِّئْ عِبَادِي أَنِّي أَنَا الْغَفُورُ الرَّحِيمُ", translation: "Inform My servants that it is I who am the Forgiving, the Merciful.", reference: "Quran 15:49" },
    { arabic: "وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ", translation: "And My mercy encompasses all things.", reference: "Quran 7:156" },
    { arabic: "فَاغْفِرْ لِلَّذِينَ تَابُوا وَاتَّبَعُوا سَبِيلَكَ وَقِهِمْ عَذَابَ الْجَحِيمِ", translation: "So forgive those who have repented and followed Your way and protect them from the punishment of Hellfire.", reference: "Quran 40:7" },
    { arabic: "وَالَّذِينَ إِذَا فَعَلُوا فَاحِشَةً أَوْ ظَلَمُوا أَنفُسَهُمْ ذَكَرُوا اللَّهَ فَاسْتَغْفَرُوا لِذُنُوبِهِمْ", translation: "And those who, when they commit an immorality or wrong themselves, remember Allah and seek forgiveness for their sins.", reference: "Quran 3:135" },
    { arabic: "إِلَّا مَن تَابَ وَآمَنَ وَعَمِلَ عَمَلًا صَالِحًا فَأُولَٰئِكَ يُبَدِّلُ اللَّهُ سَيِّئَاتِهِمْ حَسَنَاتٍ", translation: "Except for those who repent, believe, and do righteous work. For them Allah will replace their evil deeds with good.", reference: "Quran 25:70" },
    { arabic: "وَمَن يَعْمَلْ سُوءًا أَوْ يَظْلِمْ نَفْسَهُ ثُمَّ يَسْتَغْفِرِ اللَّهَ يَجِدِ اللَّهَ غَفُورًا رَّحِيمًا", translation: "And whoever does a wrong or wrongs himself but then seeks forgiveness of Allah will find Allah Forgiving and Merciful.", reference: "Quran 4:110" }
  ],
  longing: [
    { arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ", translation: "Indeed we belong to Allah, and indeed to Him we will return.", reference: "Quran 2:156" },
    { arabic: "وَابْتَغُوا إِلَيْهِ الْوَسِيلَةَ", translation: "And seek the means of nearness to Him.", reference: "Quran 5:35" },
    { arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً", translation: "Our Lord, give us in this world good and in the Hereafter good.", reference: "Quran 2:201" },
    { arabic: "فَفِرُّوا إِلَى اللَّهِ", translation: "So flee to Allah.", reference: "Quran 51:50" },
    { arabic: "إِنَّ إِلَى رَبِّكَ الرُّجْعَىٰ", translation: "Indeed, to your Lord is the return.", reference: "Quran 96:8" },
    { arabic: "إِلَى رَبِّكَ يَوْمَئِذٍ الْمُسْتَقَرُّ", translation: "To your Lord, that Day, is the place of permanence.", reference: "Quran 75:12" },
    { arabic: "وَإِلَى اللَّهِ تُرْجَعُ الْأُمُورُ", translation: "And to Allah will be returned all matters.", reference: "Quran 2:210" },
    { arabic: "يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ", translation: "O reassured soul, return to your Lord.", reference: "Quran 89:27" },
    { arabic: "رَّاغِبِينَ إِلَيْهِ", translation: "Those who long for Him.", reference: "Quran 21:90" },
    { arabic: "إِنَّ إِلَى رَبِّكَ الْمُنْتَهَىٰ", translation: "Indeed, to your Lord is the finality.", reference: "Quran 53:42" },
    { arabic: "يَوْمَئِذٍ يَتَّبِعُونَ الدَّاعِيَ لَا عِوَجَ لَهُ", translation: "That Day, they will follow the Caller, from whom there is no deviation.", reference: "Quran 20:108" },
    { arabic: "وَأَنَّ إِلَىٰ رَبِّكَ الْمُنتَهَىٰ", translation: "And that to your Lord is the finality.", reference: "Quran 53:42" },
    { arabic: "أَفَحَسِبْتُمْ أَنَّمَا خَلَقْنَاكُمْ عَبَثًا وَأَنَّكُمْ إِلَيْنَا لَا تُرْجَعُونَ", translation: "Then did you think that We created you uselessly and that to Us you would not be returned?", reference: "Quran 23:115" },
    { arabic: "كُلُّ مَنْ عَلَيْهَا فَانٍ وَيَبْقَىٰ وَجْهُ رَبِّكَ ذُو الْجَلَالِ وَالْإِكْرَامِ", translation: "Everyone upon the earth will perish, and there will remain the Face of your Lord, Owner of Majesty and Honor.", reference: "Quran 55:26-27" },
    { arabic: "وَإِنَّ لَنَا لَلْآخِرَةَ وَالْأُولَىٰ", translation: "And indeed, to Us belongs the Hereafter and the first [life].", reference: "Quran 92:13" },
    { arabic: "وَمَا هَٰذِهِ الْحَيَاةُ الدُّنْيَا إِلَّا لَهْوٌ وَلَعِبٌ ۚ وَإِنَّ الدَّارَ الْآخِرَةَ لَهِيَ الْحَيَوَانُ ۚ لَوْ كَانُوا يَعْلَمُونَ", translation: "And this worldly life is not but diversion and amusement. And indeed, the home of the Hereafter - that is the [eternal] life, if only they knew.", reference: "Quran 29:64" },
    { arabic: "مَن كَانَ يَرْجُو لِقَاءَ اللَّهِ فَإِنَّ أَجَلَ اللَّهِ لَآتٍ", translation: "Whoever hopes for the meeting with Allah, then indeed, the term decreed by Allah is coming.", reference: "Quran 29:5" },
    { arabic: "وَلِتُكْمِلُوا الْعِدَّةَ وَلِتُكَبِّرُوا اللَّهَ عَلَىٰ مَا هَدَاكُمْ", translation: "And [wants] for you to complete the period and to glorify Allah for that [to] which He has guided you.", reference: "Quran 2:185" },
    { arabic: "وَفِي ذَٰلِكَ فَلْيَتَنَافَسِ الْمُتَنَافِسُونَ", translation: "So for this let the competitors compete.", reference: "Quran 83:26" },
    { arabic: "فَمَن كَانَ يَرْجُو لِقَاءَ رَبِّهِ فَلْيَعْمَلْ عَمَلًا صَالِحًا وَلَا يُشْرِكْ بِعِبَادَةِ رَبِّهِ أَحَدًا", translation: "So whoever would hope for the meeting with his Lord - let him do righteous work and not associate in the worship of his Lord anyone.", reference: "Quran 18:110" }
  ],


};

// ======= Helpers =======
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ======= Render Mood Buttons =======
function renderMoods() {
  moodGrid.innerHTML = "";
  Object.keys(verses).forEach(key => {
    const btn = document.createElement("button");
    btn.className = "mood";
    btn.textContent = capitalize(key);
    btn.onclick = () => selectMood(key);
    moodGrid.appendChild(btn);
  });
}

// ======= Select Random Verse =======
function selectMood(key) {
  currentMood = key;
  const moodVerses = verses[key];
  currentVerse = moodVerses[Math.floor(Math.random() * moodVerses.length)];

  verseArabic.innerText = currentVerse.arabic;
  verseTrans.innerText = showTranslation ? currentVerse.translation : "";
  verseRef.innerText = currentVerse.reference;
}

// ======= Copy to Clipboard =======
copyBtn.onclick = async () => {
  if (!currentVerse) return alert("Pick an emotion first!");
  await navigator.clipboard.writeText(`${currentVerse.arabic}\n${currentVerse.translation}\n${currentVerse.reference}`);
  alert("Copied to clipboard!");
};

// ======= Toggle Translation =======
toggleTransBtn.onclick = () => {
  showTranslation = !showTranslation;
  if (currentVerse) verseTrans.innerText = showTranslation ? currentVerse.translation : "";
};

// ======= Favorites =======
function renderFavorites() {
  favoritesList.innerHTML = "";
  const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (favs.length === 0) {
    favoritesList.innerHTML = "<div class='muted small'>No favorites yet.</div>";
  } else {
    favs.forEach((f, index) => {
      const div = document.createElement("div");
      div.className = "fav-item";

      const text = document.createElement("span");
      text.innerText = `${f.arabic} — ${f.translation}`;

      const removeBtn = document.createElement("button");
      removeBtn.innerHTML = "×";
      removeBtn.className = "remove-fav";
      removeBtn.title = "Remove";
      removeBtn.onclick = () => removeFavorite(index);

      div.appendChild(text);
      div.appendChild(removeBtn);
      favoritesList.appendChild(div);
    });
  }
}

function removeFavorite(index) {
  const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
  favs.splice(index, 1);
  localStorage.setItem("favorites", JSON.stringify(favs));
  renderFavorites();
}

favBtn.onclick = () => {
  if (!currentVerse) return;
  const favs = JSON.parse(localStorage.getItem("favorites") || "[]");

  if (favs.length >= 5) {
    return alert("You can only save up to 5 verses. Remove one to add a new favorite.");
  }

  // Prevent duplicate saves
  const isDuplicate = favs.some(f => f.arabic === currentVerse.arabic);
  if (isDuplicate) return alert("This verse is already in your favorites!");

  favs.push(currentVerse);
  localStorage.setItem("favorites", JSON.stringify(favs));
  renderFavorites();
};

// ======= Share (Mobile + Facebook) =======
shareBtn.onclick = () => {
  if (!currentVerse) return alert("Pick an emotion first!");

  const text = `${currentVerse.arabic}\n${currentVerse.translation}\n${currentVerse.reference}`;

  if (navigator.share) {
    navigator.share({ text }).catch(err => console.log("Share failed:", err));
  } else {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=&quote=${encodeURIComponent(text)}`;
    window.open(fbUrl, "_blank", "width=600,height=400");
  }
};

// ======= Copy Support Number =======
const nagadNumber = document.getElementById("nagadNumber");

if (nagadNumber) {
  nagadNumber.onclick = () => {
    if (!nagadNumber.classList.contains("revealed-number")) {
      nagadNumber.innerText = "Nagad: 01627813480";
      nagadNumber.classList.add("revealed-number");
      if (copySupportBtn) copySupportBtn.style.display = "inline-block";
    }
  };
}

if (copySupportBtn) {
  copySupportBtn.onclick = () => {
    navigator.clipboard.writeText("01627813480");
    const originalText = copySupportBtn.innerText;
    copySupportBtn.innerText = "Copied!";
    setTimeout(() => {
      copySupportBtn.innerText = originalText;
    }, 2000);
  };
}

// ======= Initialize =======
renderMoods();
renderFavorites();
