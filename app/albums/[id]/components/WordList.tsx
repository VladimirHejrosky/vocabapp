"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteTermDialog from "./DeleteTermDialog";
import EditTermDialogForm from "./EditTermDialogForm";
import { Word } from "@/lib/generated/prisma";

interface Props {
  data: Word[],
  albumId: number
}

const WordList = ({ data, albumId }: Props) => {
  const [words, setwords] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter words based on search query
  const filteredwords = words.filter(
    (word) =>
      word.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.term.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold whitespace-nowrap">
          Slovíčka ({words.length})
        </h2>

        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Hledat..."
              className="pl-8 w-full sm:w-[200px] md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Link href={`/albums/${albumId}/add`}>
            <Button className="flex items-center gap-2 whitespace-nowrap">
              <Plus className="h-4 w-4" />
              Přidat slova
            </Button>
          </Link>
        </div>
      </div>

      {/* words table */}
      <Card>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SLOVO</TableHead>
                <TableHead>PŘEKLAD</TableHead>
                <TableHead className="hidden md:table-cell">
                  PŘÍKLAD VE VĚTĚ
                </TableHead>
                <TableHead className="w-[100px]">AKCE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredwords.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-4 text-muted-foreground"
                  >
                    {searchQuery
                      ? "Žádné shody pro toto vyhledávání"
                      : "Album je prázdné"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredwords.map((word) => (
                  <TableRow key={word.id}>
                    <TableCell className="font-medium">
                      {word.translation}
                    </TableCell>
                    <TableCell>{word.term}</TableCell>
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
                          <EditTermDialogForm word={word} />
                          <DeleteTermDialog wordId={word.id} />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default WordList;
