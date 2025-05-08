"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { albumSchema } from "@/validation/form-validations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { languages } from "@/app/components/LangSelector";

import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Language } from "@/lib/generated/prisma";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { upsertAlbum } from "@/lib/db/db-actions";
import { z } from "zod";

interface Props {
  album?: {
    id?: number;
    name: string;
    description?: string | null;
    language: Language;
  };
  onSuccess?: () => void;
}

const AlbumForm = ({ album, onSuccess }: Props) => {
  const form = useForm({
    resolver: zodResolver(albumSchema),
    defaultValues: {
      id: album ? album.id : undefined,
      name: album ? album.name : "",
      description: album ? album.description ?? "" : "",
      language: album ? album.language : undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof albumSchema>) => {
     await upsertAlbum(data, album?.id);
     onSuccess?.()
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Název</FormLabel>
              <FormControl>
                <Input placeholder="Název alba" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Popis</FormLabel>
              <FormControl>
                <Input placeholder="Popis alba (nepovinné)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jazyk</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Vyber jazyk" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-8">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Zavřít
            </Button>
          </DialogClose>
          <Button disabled={form.formState.isSubmitting} type="submit">{album ? "Uložit" : "Vytvořit"}</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AlbumForm;
