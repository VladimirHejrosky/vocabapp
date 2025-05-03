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

const onSubmit = (data: any) => {
  // Handle form submission
  console.log("Form submitted:", data);
  // Here you can add your logic to save the album data
};
import { DialogClose, DialogFooter } from "@/components/ui/dialog";

interface Props {
    album?: {
      id: number
      name: string
      description: string}
  }

const AlbumForm = ({album}: Props) => {
  const form = useForm({
    resolver: zodResolver(albumSchema),
    defaultValues: {
      name: album ? album.name : "",
      description: album ? album.description : "",
    },
  });

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
        <DialogFooter className="mt-8">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Zavřít
            </Button>
          </DialogClose>
          <Button type="submit">{album ? "Uložit" : "Vytvořit"}</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AlbumForm;
