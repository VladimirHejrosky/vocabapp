import SubNav from "@/app/components/SubNav";
import { getPhrasesById } from "@/lib/json/json-actions";
import { PhraseExercise } from "@/lib/json/json-types";
import React from "react";
import PhraseBuilder from "./components/PhraseBuilder";
import { getRandomItems } from "@/lib/functions/array-functions";

interface Props {
  params: Promise<{ id: string }>;
}

const phrasePage = async ({ params }: Props) => {
  const { id } = await params;
  const phrasesData: PhraseExercise = await getPhrasesById(id);

  const data = getRandomItems(phrasesData.phrases, 10);

  return (
    <div className="container mx-auto px-4">
      <SubNav
        name="Skládání vět"
        description={phrasesData.title}
        returnPath="/phrases"
      />
      <PhraseBuilder exercises={data} />
    </div>
  );
};

export default phrasePage;
