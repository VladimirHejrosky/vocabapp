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
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Trash2 } from "lucide-react";
import React from "react";

interface Props {
  wordId: number;
}


const DeleteTermDialog = ({wordId}:Props) => {

  const handleDelete = () => {
    // Implement the delete logic here
    console.log("Word deleted: " + wordId);
  };

  return (
    <AlertDialog>
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
