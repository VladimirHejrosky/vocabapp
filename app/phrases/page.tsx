import React from "react";
import SubNav from "../components/SubNav";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Play } from "lucide-react";
import { getPhrasesList } from "@/lib/json/json-actions";
import Link from "next/link";
import { PhraseList } from "@/lib/json/json-types";
import { cookies } from "next/headers";

const phrasesPage = async () => {
  const phrases: PhraseList[] = (await getPhrasesList()) || [];
  const lang = (await cookies()).get("lang")?.value || "EN";
  return (
    <div className="container mx-auto px-4">
      <SubNav name="Skládání vět" description={lang} returnPath="/" />

      {phrases.length === 0 ? (
        <div className="text-center">
          <h3 className="text-2xl mb-2">Žádná data</h3>
          <p>Cvičení pro jazyk {lang} přibudou s postupem času.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phrases.map((item) => (
            <Card
              key={item.id}
              className="flex flex-row gap-2 justify-between items-center"
            >
              <CardHeader className="flex-1">
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardFooter className="flex gap-2">
                <Button asChild>
                  <Link href={`/phrases/${item.id}`}>
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
};

export default phrasesPage;
