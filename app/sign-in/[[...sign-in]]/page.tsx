import { SignIn } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <SignIn />
    </div>
  );
};

export default page;
