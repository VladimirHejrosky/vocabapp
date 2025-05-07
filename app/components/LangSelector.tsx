"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Language } from "@/lib/generated/prisma";

export const languages: { value: Language; label: string }[] = [
  { value: "EN", label: "Angličtina" },
  { value: "ES", label: "Španělština" },
  { value: "DE", label: "Němčina" },
];

interface Props {
  defaultLanguage?: Language;
}
const LangSelector = ({ defaultLanguage }: Props) => {
  const handleChange = (lang: Language) => {
    document.cookie = `lang=${lang}; path=/; max-age=${60 * 60 * 24 * 365};`;
  };

  return (
    <Select defaultValue={defaultLanguage} onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Primárně se učím:" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LangSelector;
