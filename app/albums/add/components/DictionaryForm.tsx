"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { wordPairFormSchema } from "@/validation/form-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, Save, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import DialogInput from "./DialogInput";
import { useState } from "react";

interface WordPair {
  term: string;
  translation: string;
  example?: string;
}

interface FormValues {
  pairs: WordPair[];
}

export default function DictionaryForm() {
  const [reachedMaxLength, setReachedMaxLength] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(wordPairFormSchema),
    defaultValues: {
      pairs: [{ term: "", translation: "", example: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "pairs",
    rules: { maxLength: {value: 20, message: "Maximální počet řádků je 20."}},
  });

  const handleSave = (data: FormValues) => {
    // Save to a database
    console.log("Saving word pairs:", data.pairs);
  };
  const handleAddPair = () => {
    append({ term: "", translation: "", example: "" });
    console.log(fields.length)
    if (fields.length >= 19) {
      setReachedMaxLength(true)
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSave)}
        className="p-2 max-w-2xl mx-auto"
      >
        <div className="flex w-full justify-end">
          <DialogInput form={form} disableButton={() => setReachedMaxLength(true)} />
        </div>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-[1fr_1fr_min-content] gap-2 my-4"
          >
            <FormField
              control={form.control}
              name={`pairs.${index}.term`}
              render={({ field }) => (
                <FormItem className="col-start-1 row-start-1">
                  <FormControl>
                    <Input placeholder="Slovo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`pairs.${index}.translation`}
              render={({ field }) => (
                <FormItem className="col-start-2 row-start-1">
                  <FormControl>
                    <Input placeholder="Překlad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`pairs.${index}.example`}
              render={({ field }) => (
                <FormItem className="col-start-1 row-start-2 col-span-2">
                  <FormControl>
                    <Input
                      placeholder="Příklad ve větě (nepovinné)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={index === 0}
              type="button"
              variant="ghost"
              color="destructive"
              size="icon"
              className="col-start-3 row-start-1 row-span-2 place-self-center"
              onClick={() => {
                remove(index)
                if (fields.length <= 20){
                  setReachedMaxLength(false)
                }
                }}
            >
              {index !== 0 && <X />}
            </Button>
          </div>
        ))}

        {form.formState.errors.pairs?.root?.message && (
          <p className="text-destructive text-center">
            {form.formState.errors.pairs.root.message}
          </p>
        )}

        <div className="flex flex-col gap-4 my-4 max-w-2xs mx-auto">
          <Button
          disabled={reachedMaxLength}
            variant={"secondary"}
            type="button"
            onClick={handleAddPair}
          >
            {reachedMaxLength ? "Maximum 20 řádků" :<><CirclePlus /> Přidat řádek</>}
          </Button>
          <Button type="submit">
            <Save /> Přidat do slovníku
          </Button>
        </div>
      </form>
    </Form>
  );
}
