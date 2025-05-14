import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="w-fit mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">
        Podmínky služby / Terms of Service
      </h1>

      <section className="mb-6">
        <div className="flex gap-2 items-center mb-2">
        <Image src="/cz-flag.png" alt="CZ" width={32} height={16} />
        <h2 className="text-xl font-semibold">Česky</h2>
        </div>
        <p>Používáním této aplikace souhlasíte s následujícími podmínkami:</p>
        <ul className="list-disc pl-5 my-2">
          <li>
            Aplikace je určena k učení slovíček a je poskytována "tak, jak je".
          </li>
          <li>Data jsou uchovávána bezpečně pro váš osobní přístup.</li>
          <li>Neodpovídáme za ztrátu dat ani nedostupnost služby.</li>
        </ul>
        <p>Podmínky můžeme kdykoli změnit.</p>
      </section>

      <section>
        <div className="flex gap-2 items-center mb-2">
        <Image src="/uk-flag.png" alt="UK" width={32} height={16} />
        <h2 className="text-xl font-semibold">English</h2>
        </div>
        <p>By using this app, you agree to the following:</p>
        <ul className="list-disc pl-5 my-2">
          <li>This app is for learning vocabulary and is provided "as is".</li>
          <li>Data is securely stored for your personal access.</li>
          <li>We are not responsible for data loss or downtime.</li>
        </ul>
        <p>These terms may be updated at any time.</p>
      </section>
      <div className="my-8 text-center">
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
