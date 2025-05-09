"use client";

import { Button } from "@/components/ui/button";
import { Language } from "@/lib/generated/prisma";
import { Volume2 } from "lucide-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

const languageMap: Record<Language, string> = {
  EN: "en-US",
  DE: "de-DE",
  ES: "es-ES",
};

interface SpeakButtonProps {
  text: string;
  lang: Language | undefined;
}

export const SpeakButton: FC<SpeakButtonProps> = ({ text, lang }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const langCode = lang ? languageMap[lang] : undefined;
  if (!langCode) return null;

  const loadVoices = useCallback(() => {
    const available = window.speechSynthesis.getVoices();
    if (available.length > 0) {
      setVoices(available);
    }
  }, []);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, [loadVoices]);

  const selectedVoice = useMemo(() => {
    if (!voices.length) return null;
    return (
      voices.find((v) => v.lang === langCode && v.localService) ||
      voices.find((v) => v.lang.startsWith(langCode.split("-")[0]))
    );
  }, [voices, langCode]);

  const handleSpeak = () => {
    if (!("speechSynthesis" in window) || !text || !selectedVoice) return;

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = langCode;
    utter.voice = selectedVoice;

    window.speechSynthesis.speak(utter);
  };

     if (!selectedVoice) return null;

  return (
    <Button onClick={handleSpeak} variant="ghost">
      <Volume2 size={20} />
    </Button>
  );
};
