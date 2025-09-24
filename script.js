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
    { arabic: "وَسَيَجْعَلُ اللَّهُ بَعْدَ عُسْرٍ يُسْرًا", translation: "And Allah will bring after hardship ease.", reference: "Quran 65:7" }
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
    { arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا", translation: "So do not weaken and do not grieve.", reference: "Quran 3:139" }
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
    { arabic: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا", translation: "Our Lord, do not impose blame upon us if we have forgotten or erred.", reference: "Quran 2:286" }
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
    { arabic: "وَمَا أَنفَقْتُم مِّن شَيْءٍ فَهُوَ يُخْلِفُهُ", translation: "And whatever you spend, Allah will replace it.", reference: "Quran 34:39" }
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
  { arabic: "إِنَّ رَبِّي لَسَمِيعُ الدُّعَاءِ", translation: "Indeed, my Lord is the Hearer of supplication.", reference: "Quran 14:39" }
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
  { arabic: "وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ", translation: "And My mercy encompasses all things.", reference: "Quran 7:156" }
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
  { arabic: "وَخَافُونِ إِن كُنتُم مُّؤْمِنِينَ", translation: "And fear Me, if you are believers.", reference: "Quran 3:175" }
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
  { arabic: "إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ", translation: "Indeed, Allah loves those who rely upon Him.", reference: "Quran 3:159" }
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
  { arabic: "رَبِّ اغْفِرْ وَارْحَمْ", translation: "My Lord, forgive and have mercy.", reference: "Quran 23:118" }
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
  { arabic: "إِنَّ إِلَى رَبِّكَ الْمُنْتَهَىٰ", translation: "Indeed, to your Lord is the finality.", reference: "Quran 53:42" }
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
    favs.forEach(f => {
      const div = document.createElement("div");
      div.className = "fav-item";
      div.innerText = `${f.arabic} — ${f.translation}`;
      favoritesList.appendChild(div);
    });
  }
}

favBtn.onclick = () => {
  if (!currentVerse) return;
  const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
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

// ======= Initialize =======
renderMoods();
renderFavorites();
