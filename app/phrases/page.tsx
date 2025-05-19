import React from "react";
import SubNav from "../components/SubNav";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Play } from "lucide-react";
import { getPhrasesList } from "@/lib/json/json-actions";
import Link from "next/link";
import { PhraseList } from "@/lib/json/json-types";

const phrasesPage = async () => {
  const phrases: PhraseList[] = (await getPhrasesList()) || [];
  return (
    <div className="container mx-auto px-4">
      <SubNav name="Skládání vět" returnPath="/" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {phrases.length === 0 ? (
          <h3>Žádná data.</h3>
        ) : (
          phrases.map((item) => {
            return (
              <Card
                key={item.id}
                className="flex flex-row gap-2 justify-between items-center"
              >
                <CardHeader>
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
            );
          })
        )}
      </div>
    </div>
  );
};

export default phrasesPage;
