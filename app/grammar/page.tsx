import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getGrammarList } from "@/lib/json/json-actions";
import { Info, Play } from "lucide-react";
import Link from "next/link";
import SubNav from "../components/SubNav";
import { cookies } from "next/headers";

export default async function GrammarPage() {
  const grammarItems = (await getGrammarList()) || [];
  const lang = (await cookies()).get("lang")?.value || "EN";

  return (
    <div className="container mx-auto px-4">
      <SubNav name="Gramatické kvízy" description={lang} returnPath="/" />

      {grammarItems.length === 0 ? (
        <div className="text-center">
          <h3 className="text-2xl mb-2">Žádná data</h3>
          <p>Cvičení pro jazyk {lang} přibudou s postupem času.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grammarItems.map((item) => (
            <Card
              key={item.id}
              className="flex flex-row gap-2 justify-between items-center"
            >
              <CardHeader className="flex-1">
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardFooter className="flex gap-2">
                <Button asChild variant="secondary">
                  <Link href={`/grammar/theory/${item.id}`}>
                    <Info />
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={`/grammar/quiz/${item.id}`}>
                    <Play />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
