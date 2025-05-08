import DictionaryForm from "./components/DictionaryForm";
import SubNav from "@/app/components/SubNav";

interface Props {
  params: Promise<{ id: string }>;
}

const AddPage = async ({params}:Props) => {
  const { id } = await params;
  return (
    <div className="container mx-auto px-4">
      <SubNav name="Přidat slovíčka" desctiprion="album" returnPath={`/albums/` + id} />
      <DictionaryForm paramId={id} />
    </div>
  );
};

export default AddPage;
