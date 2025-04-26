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
import { wordPairFormSchema } from "@/validation/word-pairs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  IoAddCircleOutline,
  IoCloseCircleOutline,
  IoSaveOutline,
} from "react-icons/io5";
import DialogInput from "./DialogInput";

interface WordPair {
  term: string;
  translation: string;
  example?: string;
}

interface FormValues {
  pairs: WordPair[];
}

export default function DictionaryForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(wordPairFormSchema),
    defaultValues: {
      pairs: [{ term: "", translation: "", example: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "pairs",
  });

  const handleSave = (data: FormValues) => {
    // Save to a database
    console.log("Saving word pairs:", data.pairs);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSave)}
        className="p-2 max-w-2xl mx-auto"
      >
        <div className="flex w-full justify-end">
          <DialogInput form={form} />
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
                    <Input placeholder="Výraz" {...field} />
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
                    <Input placeholder="Příklad ve větě (nepovinné)" {...field} />
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
              onClick={() => remove(index)}
            >
              {index !== 0 && <IoCloseCircleOutline />}
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
            variant={"secondary"}
            type="button"
            onClick={() => append({ term: "", translation: "", example: "" })}
          >
            <IoAddCircleOutline /> Přidat řádek
          </Button>
          <Button type="submit">
            <IoSaveOutline /> Přidat do slovníku
          </Button>
        </div>
      </form>
    </Form>
  );
}
