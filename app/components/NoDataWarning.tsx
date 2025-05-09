import { Button } from "@/components/ui/button";
import { BookOpen, Home } from "lucide-react";
import Link from "next/link";
import React from "react";

const NoDataWarning = () => {
  return (
    <div className="container mx-auto px-4 text-center py-8">
      <h1 className="text-2xl font-bold mb-4">Žádná data</h1>
      <p className="mb-2">
        Toto album neexistuje nebo v něm nemáš žádná slovíčka.
      </p>
      <p>
        U náhodných slovíček se ujisti, že máš v hlavním menu vybraný jazyk a že máš nějaká slovíčka v daném jazyce uložená.
      </p>
      <div className="flex my-8 gap-4 justify-center items-center">
        <Button variant={"secondary"} asChild>
          <Link href="/"><Home /> Hlavní menu</Link>
        </Button>
        <Button asChild>
          <Link href="/albums"><BookOpen /> Procházet alba</Link>
        </Button>
      </div>
    </div>
  );
};

export default NoDataWarning;
