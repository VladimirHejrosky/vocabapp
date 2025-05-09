"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { wordPair } from "@/validation/form-validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Word } from "@/lib/generated/prisma";
import { editWord } from "@/lib/db/db-actions";
import { useState } from "react";

interface Props {
  word: Word
  albumId: number
}

const EditTermDialogForm = ({word, albumId}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm({
    resolver: zodResolver(wordPair),
    defaultValues: {
      term: word.term,
      translation: word.translation,
      example: word.example || "",
    },
  });
  
  const onSubmit = async (formData: any) => {
    const data = {id: word.id ,...formData}
    await editWord( data, albumId)
    setIsOpen(false)
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          <Edit className="h-4 w-4 mr-2" />
          Upravit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Upravit</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slovo</FormLabel>
                  <FormControl>
                    <Input placeholder="Slovo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="translation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Překlad</FormLabel>
                  <FormControl>
                    <Input placeholder="Překlad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="example"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Příklad ve větě</FormLabel>
                  <FormControl>
                    <Input placeholder="Příklad ve větě (nepovinné)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Zrušit
                </Button>
              </DialogClose>
              <Button disabled={form.formState.isSubmitted} type="submit">Uložit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTermDialogForm;
