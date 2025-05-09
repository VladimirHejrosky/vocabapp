import { SignUp } from '@clerk/nextjs'

const page = () => {
  return (
    <div className="flex justify-center items-center h-[70vh]">
          <SignUp />
        </div>
  )
}

export default page