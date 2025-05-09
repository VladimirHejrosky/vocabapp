"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { wordPairSchema } from "@/validation/form-validations";
import { CheckCheck, Copy } from "lucide-react";
import { Language } from "@/lib/generated/prisma";

interface Props {
  form: any;
  disableButton: () => void;
  albumLang: Language
}

export default function ImportDialog({ form, disableButton, albumLang }: Props) {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const exampleText = `Vygeneruj JSON pole objektů se strukturou:
[{ "term": "", "translation": "", "example": "" }], kterou mohu tlačítkem zkopírovat.
Term je slovíčko v ${albumLang} jazyce a translation je český překlad.
Příklad věty vždy napiš běžnou konverzační větou v ${albumLang} jazyce, maximálně 10 slov.
Pokud poskytnu vlastní slovíčka, použij pouze tato slovíčka.
Pokud neposkytnu žádná slovíčka, vygeneruj 10 náhodných.
Výsledek vrať pouze jako čisté JSON pole s možností zkopírování, bez dalšího textu.
Slovíčka: `;

  const handleImport = () => {
    try {
      const data = JSON.parse(input);

      if (!Array.isArray(data) || data.length === 0) {
        alert("Žádná data.");
        return;
      }
      if (!Array.isArray(data) || data.length > 20) {
        alert("Maximálně 20 objektů.");
        return;
      }

      const parsed = z.array(wordPairSchema).safeParse(data);

      if (!parsed.success) {
        alert("Neplatný formát dat.");
        return;
      }

      form.setValue("pairs", parsed.data);
      if (parsed.data.length > 19) {
        disableButton()
      }
      setIsOpen(false)
    } catch (error) {
      alert("Neplatný formát dat");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exampleText);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      alert("Nepodařilo se zkopírovat.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">JSON</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Vložit Data</DialogTitle>
          <DialogDescription className="flex gap-2">
            Zkopíruj promt a vlož do ChatGPT pro vygenerování dat v
            požadovaném formátu.
            <Button
              className="self-end"
              variant={"secondary"}
              onClick={handleCopy}
            >
              {copied ? <CheckCheck /> : <Copy />}
            </Button>
          </DialogDescription>
        </DialogHeader>
        <Textarea
          className="h-60 resize-y"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Např. [{"term":"dog","translation":"pes","example":"The dog barks."}]. Maximálně 20 objektů.'
        />
        <DialogFooter>
          <div className="flex justify-between w-full">
            <DialogClose asChild>
              <Button variant={"outline"}>Zavřít</Button>
            </DialogClose>
            <Button onClick={handleImport}>Vložit</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
