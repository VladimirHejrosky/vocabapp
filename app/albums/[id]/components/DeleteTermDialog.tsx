"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteWord } from "@/lib/db/db-actions";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";

interface Props {
  wordId: number;
  albumId: number,
}


const DeleteTermDialog = ({wordId, albumId}:Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleDelete = async () => {
    await deleteWord(wordId, albumId)
    setIsOpen(false)
  };


  return (
    
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Smazat
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Opravdu chceš smazat slovo?</AlertDialogTitle>
          <AlertDialogDescription>
            Tato akce je nevratná. Slovo bude trvale odstraněno.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Zrušit</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Smazat</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTermDialog;
