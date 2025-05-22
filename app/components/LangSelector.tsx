"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Language } from "@/lib/generated/prisma";

export const languages: { value: Language; label: string }[] = [
  { value: "EN", label: "EN" },
  { value: "ES", label: "ES" },
  { value: "DE", label: "DE" },
];

type Voice = SpeechSynthesisVoice;
const demoText: Record<Language, string> = {
  EN: "This is a voice demo.",
  ES: "Este es un demo de voz.",
  DE: "Dies ist eine Sprachausgabe-Demo.",
};

export default function LanguageVoiceSelector() {
  const [lang, setLang] = useState<Language>("EN");
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const savedLang = Cookies.get("lang") as Language | undefined;
    if (savedLang === undefined) {
      Cookies.set("lang", "EN", { expires: 365, sameSite: "lax" });
    }
    const initialLang: Language = savedLang || "EN";
    setLang(initialLang);
    setSelectedVoice(undefined);
  }, []);

  useEffect(() => {
    const loadVoices = () => {
      const all = speechSynthesis.getVoices();
      const filtered = all.filter((v) =>
        v.lang.toLowerCase().startsWith(lang.toLowerCase())
      );

      const uniqueVoices = Array.from(
        new Map(filtered.map((v) => [v.name, v])).values()
      );

      setVoices(uniqueVoices);

      const savedVoice = Cookies.get("voice");
      if (savedVoice && filtered.some((v) => v.name === savedVoice)) {
        setSelectedVoice(savedVoice);
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, [lang]);

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    Cookies.set("lang", newLang, { expires: 365, sameSite: "lax" });
    Cookies.remove("voice");
    setSelectedVoice(undefined);
  };

  const handleVoiceChange = (voiceName: string) => {
    setSelectedVoice(voiceName);
    Cookies.set("voice", voiceName, { expires: 365, sameSite: "lax" });

    const voice = voices.find((v) => v.name === voiceName);
    if (voice) {
      speechSynthesis.cancel();

      const utt = new SpeechSynthesisUtterance(demoText[lang]);
      utt.voice = voice;
      speechSynthesis.speak(utt);
    }
  };

  return (
    <div className="flex gap-4 justify-center">
      <Select
        value={lang}
        onValueChange={(value) => handleLangChange(value as Language)}
      >
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder="Vyber jazyk" />
        </SelectTrigger>
        <SelectContent>
          {languages.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedVoice || undefined}
        onValueChange={(value) => handleVoiceChange(value)}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Hlas" />
        </SelectTrigger>
        <SelectContent>
          {voices.length === 0 && (
            <SelectItem value="none" disabled>
              Žádný hlas
            </SelectItem>
          )}
          {voices.map((v) => (
            <SelectItem key={v.name} value={v.name}>
              {v.name.split("-")[0].trim()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
