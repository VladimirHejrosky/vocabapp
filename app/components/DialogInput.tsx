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
import { wordPairSchema } from "@/validation/word-pairs";
import { IoCopy, IoCheckmarkDone } from "react-icons/io5";

const exampleTextx = `Vygeneruj JSON pole objektů se strukturou:
{ "term": "", "translation": "", "example": "" }
Například:
[
  { "term": "dog", "translation": "pes", "example": "The dog is barking." },
  { "term": "cat", "translation": "kočka", "example": "The cat sleeps all day." }
]
Pokud poskytnu vlastní slovíčka, použij pouze tato slovíčka.
Pokud neposkytnu žádná slovíčka, vygeneruj 20 náhodných dvojic (term + translation + example).
Příklad věty vždy napiš běžnou konverzační větou v angličtině, maximálně 10 slov.
Výsledek vrať pouze jako čisté JSON pole s možností zkopírování, bez dalšího textu.
Slovíčka: `;

const exampleText = `Vygeneruj JSON pole objektů se strukturou:
{ "term": "", "translation": "", "example": "" }
Například:
[
  { "term": "dog", "translation": "pes", "example": "The dog is barking." },
  { "term": "cat", "translation": "kočka", "example": "The cat sleeps all day." }
]
Vygeneruj 20 náhodných dvojic (term + translation + example).
Příklad věty vždy napiš běžnou konverzační větou v angličtině, maximálně 10 slov.
Výsledek vrať pouze jako čisté JSON pole s možností zkopírování, bez dalšího textu.
Slovíčka: `;



export default function ImportDialog({ form }: { form: any }) {
    const [input, setInput] = useState("");
    const [copied, setCopied] = useState(false);

  const handleImport = () => {
    try {
      const data = JSON.parse(input);
  
      if (!Array.isArray(data) || data.length === 0) {
        alert("Neplatný formát dat.");
        return;
      }
  
      const parsed = z.array(wordPairSchema).safeParse(data);
  
      if (!parsed.success) {
        alert("Neplatný formát dat.");
        return;
      }
  
      form.setValue("pairs", parsed.data);
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">JSON</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Vložit Data</DialogTitle>
          <DialogDescription className="flex gap-2">
            Zkopírujte promt a vložte do ChatGPT pro vygenerování dat v požadovaném formátu.
        <Button className="self-end" variant={"secondary"} onClick={handleCopy}>{copied ? <IoCheckmarkDone />: <IoCopy />}</Button>
          </DialogDescription>
        </DialogHeader>
        <Textarea
          className="h-60 resize-y"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Např. [{"term":"dog","translation":"pes","example":"The dog barks."}]'
        />
        <DialogFooter>
            <div className="flex justify-between w-full">
          <DialogClose asChild>
            <Button variant={"outline"}>Zavřít</Button>
          </ DialogClose >
          <Button onClick={handleImport}>Vložit</Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
