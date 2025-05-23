import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { HyperText } from "@/components/magicui/hyper-text";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { Button } from "@/components/ui/button";
import { Language } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import {
  BookOpen,
  FileText,
  MoveRight,
  NotepadText,
  PenTool,
  ShieldCheck,
} from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import LangSelector from "./components/LangSelector";
import Menu from "./components/Menu";

export default async function Home() {
  const langCookie = (await cookies()).get("lang")?.value as
    | Language
    | undefined;
  return (
    <>
      <div className="relative container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-9rem)] border-box text-center">
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
          Procvičuj jazykové znalosti a uč se nová slovíčka pomocí kartiček.
        </HyperText>
        <Menu />
      </div>

      <div className="absolute bottom-0 flex gap-4 p-4 mb-4 justify-between items-center w-full">
        <LangSelector />
        <div className="flex gap-4">
          <Link href="/privacy-policy" title="Zásady ochrany osobních údajů">
            <FileText className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
          <Link href="/terms-of-service" title="Podmínky služby">
            <ShieldCheck className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
        </div>
      </div>
    </>
  );
}
