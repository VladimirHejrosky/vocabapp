"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignUpButton, useUser } from "@clerk/nextjs";
import { NotepadText, PenTool, BookOpen, MoveRight } from "lucide-react";
import Link from "next/link";
import MenuSkeleton from "./MenuSkeleton";

const Menu = () => {
  const { isLoaded } = useUser();

  if (!isLoaded) return <MenuSkeleton />;

  return (
    <>
      <div className="flex flex-col gap-4 my-4">
        <Link href="/grammar" prefetch={true}>
          <Button
            size="lg"
            variant="secondary"
            className="flex items-center gap-2 w-full border-2"
          >
            <NotepadText className="h-5 w-5 justify-self-start" />
            Gramatické kvízy
          </Button>
        </Link>
        <Link href="/phrases" prefetch={true}>
          <Button
            size="lg"
            variant="secondary"
            className="flex items-center gap-2 w-full border-2"
          >
            <PenTool className="h-5 w-5 " />
            Skládání vět
          </Button>
        </Link>
        <SignedIn>
          <Link href="/albums">
            <Button size="lg" className="flex items-center gap-2 w-full">
              <BookOpen className="h-5 w-5" />
              Procházet alba
            </Button>
          </Link>
        </SignedIn>
        <SignedOut>
          <div className="flex gap-4 w-full justify-between">
            <SignUpButton>
              <Button size="lg">Přihlásit se</Button>
            </SignUpButton>
            <Link href="/demo">
              <Button size="lg" className="border-2" variant="secondary">
                Vyzkoušet <MoveRight />
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
      <SignedOut>
        <p className="text-muted-foreground italic">
          Pro učení pomocí kartiček se musíš přihlásit.
        </p>
      </SignedOut>
    </>
  );
};

export default Menu;
