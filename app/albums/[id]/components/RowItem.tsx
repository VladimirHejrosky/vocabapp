"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Word } from "@/lib/generated/prisma";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteTermDialog from "./DeleteTermDialog";
import EditTermDialogForm from "./EditTermDialogForm";

interface Props {
  word: Word;
  albumId: number;
}

const RowItem = ({ word, albumId }: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <EditTermDialogForm
        setIsOpen={setIsEditOpen}
        isOpen={isEditOpen}
        word={word}
        albumId={albumId}
      />
      <DeleteTermDialog
        setIsOpen={setIsDeleteOpen}
        isOpen={isDeleteOpen}
        wordId={word.id}
        albumId={albumId}
      />
      <TableRow key={word.id}>
        <TableCell className="font-medium">{word.term}</TableCell>
        <TableCell>{word.translation}</TableCell>
        <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
          {word.example || "Žádný příklad"}
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onSelect={(e) => {
                  setIsEditOpen(true);
                }}
              >
                <Edit className="h-4 w-4 mr-2" />
                Upravit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onSelect={(e) => {
                  setIsDeleteOpen(true);
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Smazat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  );
};

export default RowItem;
