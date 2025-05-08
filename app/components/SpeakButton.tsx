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
  lang?: Language; 
}

export const SpeakButton: FC<SpeakButtonProps> = ({ text, lang }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Funkce pro (znovu)načtení hlasů
  const loadVoices = useCallback(() => {
    const available = window.speechSynthesis.getVoices();
    if (available.length > 0) {
      setVoices(available);
    }
  }, []);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    // Pokud už jsou hlasy načtené, stáhni je hned
    loadVoices();

    // Jinak počkej na jejich načtení
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, [loadVoices]);

  // Vybereme preferovaný hlas podle lang
  const selectedVoice = useMemo(() => {
    if (!voices.length) return null;
    // nejprve pokus o přesnou shodu, pak o začátek jazyka
    return (
      voices.find((v) => v.lang === lang && v.localService) ||
      voices.find((v) => v.lang.startsWith(lang.split("-")[0]))
    );
  }, [voices, lang]);

  const handleSpeak = () => {
    if (!("speechSynthesis" in window) || !text) return;

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    if (selectedVoice) {
      utter.voice = selectedVoice;
    }
    window.speechSynthesis.speak(utter);
  };

  return (
    <Button
      onClick={handleSpeak}
      variant="ghost">
      <Volume2 size={20} />
    </Button>
  );
};
