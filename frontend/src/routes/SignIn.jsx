import { Card, Button } from "flowbite-react"
import { ImGoogle } from "react-icons/im"
import { BiSolidLockAlt } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
const SignIn = () => {
  const navigate = useNavigate()
  const handleButtonClick = ( ) =>{
    navigate('/auth/google')
    window.location.reload()
  }
  return (
    <main className="h-screen w-full bg-gradient-to-tr from-slate-900 to-slate-950">
      <h1 className="font-['title-font'] text-7xl text-center text-white pt-20">Cyber Notes</h1>
      <div className="flex justify-center pt-32 px-4">
        <Card className="max-w-sm bg-slate-800 grow h-max">
          <h5 className="text-2xl font-bold text-center text-white py-4">
            Sign up with Google
          </h5>
          <hr  />
          <p className="font-normal text-gray-400 text-center">
           Your data is secure with us <BiSolidLockAlt className="inline"/>
          </p>
          <Button className="" onClick={handleButtonClick}>
            <p className="flex items-center pr-2"> <ImGoogle className="" /></p> <p className="text-lg font-bold">Continue with Google</p>
          </Button>
        </Card>
      </div>
    </main>
  )
}

export default SignIn
