"use client";

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

interface Props {
  album?: {
    id: number
    name: string
    description: string}
}

const AlbumDialog = ({album}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={album ? "secondary" : "default"} className="flex items-center gap-2">
          {album  ? <> <Pencil /> <span className="hidden md:block">Editovat</span></> : <> <Plus className="h-4 w-4" /><span className="hidden md:block">Nové album</span></> }
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="my-2">{album ? "Editovat Album" : "Vytvořit nové album"}</DialogTitle>
        </DialogHeader>
        <AlbumForm album={album}/>
      </DialogContent>
    </Dialog>
  );
};

export default AlbumDialog;
