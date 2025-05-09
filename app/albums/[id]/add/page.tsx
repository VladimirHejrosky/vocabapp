import { getAlbum } from "@/lib/db/db-actions";
import DictionaryForm from "./components/DictionaryForm";
import SubNav from "@/app/components/SubNav";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const AddPage = async ({ params }: Props) => {
      const { id } = await params;
      const { userId } = await auth();
      if (!userId) redirect("/sign-in");
  
      const album = await getAlbum(userId, Number(id));
      if (!album) {
          return notFound()
      }
  return (
    <div className="container mx-auto px-4">
      <SubNav
        name="Přidat slovíčka"
        desctiprion={album.name}
        returnPath={`/albums/` + id}
      />
        <DictionaryForm albumLang={album.language} paramId={id} />
    </div>
  );
};

export default AddPage;
