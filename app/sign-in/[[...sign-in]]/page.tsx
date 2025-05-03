import { SignIn } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="flex justify-center">
      <SignIn />
    </div>
  );
};

export default page;
