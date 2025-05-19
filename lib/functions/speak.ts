import Cookies from "js-cookie";

const languageMap: Record<string, string> = {
  EN: "en-US",
  DE: "de-DE",
  ES: "es-ES",
};

let voices: SpeechSynthesisVoice[] = [];
let voicesLoaded = false;

function loadVoicesOnce() {
  if (voicesLoaded || !("speechSynthesis" in window)) return;
  voices = window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    voices = window.speechSynthesis.getVoices();
  });
  voicesLoaded = true;
}

export function speakText(text: string) {
  if (!("speechSynthesis" in window) || !text) return;
  
  loadVoicesOnce();
  
  const cookieLang = Cookies.get("lang") as keyof typeof languageMap | undefined;
  const key = cookieLang || "EN";
  const langCode = key ? languageMap[key] : undefined;
  if (!langCode) return;
  
  const voiceFromCookie = Cookies.get("voice");
  let selected =
  voices.find(v => v.name === voiceFromCookie) ||
  voices.find(v => v.lang === langCode && v.localService) ||
  voices.find(v => v.lang.startsWith(langCode.split("-")[0]));
  
  if (!selected) return;
  
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.voice = selected;
  utter.lang  = selected.lang;
  window.speechSynthesis.speak(utter);
}