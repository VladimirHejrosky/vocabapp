"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Pencil, Plus } from "lucide-react";
import AlbumForm from "./AlbumForm";
import { Language } from "@/lib/generated/prisma";

interface Props {
  album?: {
    id?: number
    name: string
    description?: string | null
    language: Language
  }
}

const AlbumDialog = ({ album }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={album ? "secondary" : "default"} className="flex items-center gap-2">
          {album  ? <> <Pencil /> <span className="hidden md:block">Editovat</span></> : <> <Plus className="h-4 w-4" /><span className="hidden md:block">Nové album</span></> }
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="my-2">{album ? "Editovat Album" : "Vytvořit nové album"}</DialogTitle>
        </DialogHeader>
        {isOpen && <AlbumForm album={album} onSuccess={() => setIsOpen(false)}/>}
      </DialogContent>
    </Dialog>
  );
};

export default AlbumDialog;
