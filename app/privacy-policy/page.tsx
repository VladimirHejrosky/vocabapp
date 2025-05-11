import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-fit mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">
        Zásady ochrany osobních údajů / Privacy Policy
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🇨🇿 Česky</h2>
        <p>
          Vaše soukromí je pro nás důležité. Tato aplikace pro učení slovíček
          ukládá pouze nezbytné informace:
        </p>
        <ul className="list-disc pl-5 my-2">
          <li>Přihlašování přes Google pomocí služby Clerk.</li>
          <li>Ukládání dat (slovíček a alb) do databáze.</li>
          <li>
            Cookies slouží pouze k uložení tmavého režimu a jazykového
            nastavení.
          </li>
        </ul>
        <p>
          Vaše data nejsou sdílena s třetími stranami a slouží pouze ke zlepšení
          uživatelského zážitku.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">🇬🇧 English</h2>
        <p>
          Your privacy is important to us. This vocabulary app stores only
          essential data:
        </p>
        <ul className="list-disc pl-5 my-2">
          <li>Login via Google using Clerk.</li>
          <li>User data (words and albums) is saved to a database.</li>
          <li>
            Cookies are used only to store theme and language preferences.
          </li>
        </ul>
        <p>
          Your data is not shared with third parties and is used solely to
          improve the user experience.
        </p>
      </section>
      <div className="mt-8 text-center">
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft />
            Zpět
          </Link>
        </Button>
      </div>
    </div>
  );
}
