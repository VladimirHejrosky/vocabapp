import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { HyperText } from "@/components/magicui/hyper-text";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { BookOpen, List, MoveRight, Play } from "lucide-react";
import Link from "next/link";
import LangSelector from "./components/LangSelector";
import { cookies } from 'next/headers';
import { Language } from "@/lib/generated/prisma";

export default async function Home() {
  const langCookie = (await cookies()).get('lang')?.value as Language | undefined;
  return (
    <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "h-200% overflow-hidden skew-y-12 -z-10 opacity-70"
          )}
        />
      </div>
      <SparklesText sparklesCount={5} className="mb-4">
        VocabApp
      </SparklesText>
      <HyperText className="text-xl text-muted-foreground mb-4">
        Obohať slovní zásobu pomocí kartiček.
      </HyperText>
      <div className="flex flex-col gap-4">
        <SignedIn>
          <Link href="/albums">
            <Button size="lg" className="flex items-center gap-2 w-full">
              <BookOpen className="h-5 w-5" />
              Procházet alba
            </Button>
          </Link>
          <Link href="/flashcards">
            <Button
              size="lg"
              variant="secondary"
              className="flex items-center gap-2 w-full border-2"
            >
              <Play className="h-5 w-5 " />
              Náhodné kartičky
            </Button>
          </Link>
          <Link href="/learning">
            <Button
              size="lg"
              variant="secondary"
              className="flex items-center gap-2 w-full border-2"
            >
              <List className="h-5 w-5" />
              Náhodný seznam
            </Button>
          </Link>
            <LangSelector defaultLanguage={langCookie}/>
        </SignedIn>
        <SignedOut>
          <div className="flex gap-4">
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
    </div>
  );
}
