import DictionaryForm from "./components/DictionaryForm";
import SubNav from "@/app/components/SubNav";

const AddPage = () => {
  return (
    <div className="container mx-auto px-4">
      <SubNav name="Přidat slovíčka" desctiprion="album" />
      <DictionaryForm />
    </div>
  );
};

export default AddPage;
