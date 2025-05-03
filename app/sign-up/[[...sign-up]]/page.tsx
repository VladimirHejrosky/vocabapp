import { SignUp } from '@clerk/nextjs'

const page = () => {
  return (
        <div className="flex justify-center">
          <SignUp />
        </div>
  )
}

export default page