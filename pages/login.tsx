import * as React from "react";
import { Button } from '@chakra-ui/button';
import {useState} from "react";
import {useRouter} from "next/router";
import {signIn} from "next-auth/react";

const Login = () => {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const handleLogin = async (event: { preventDefault: () => void; stopPropagation: () => void; }) => {
    event.preventDefault();
    event.stopPropagation();

    const response = await signIn("credentials", {
      email, password, callbackUrl: `${window.location.origin}/discover`, redirect: false }
    )

    if (!response) {
      return setLoginError("Your username/password combination was incorrect. Please try again");
    }

    if (response.ok && response.url) {
      return router.push('/discover');
    }

    if (response.status === 401)
    {
      return setLoginError("Your username/password combination was incorrect. Please try again");
    }

    if (response.error) { setLoginError(response.error) }
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white-400 shadow-lg">
        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <p className="text-center text-lg mb-0 mr-4 font-bold">Bookshelf</p>

          <div className="p-2 text-center text-red-400 rounded text-md">
            {loginError}
          </div>
          <div className="mb-4">
            <label className="text-sm font-bold text-gray-600 uppercase">
              Email:
              <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-2 text-gray-900 bg-gray-300 rounded-lg focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="text-sm font-bold text-gray-600 uppercase">
              Password:
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-2 text-gray-900 bg-gray-300 rounded-lg focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div className="flex items-center justify-center mb-4">
            <Button
              type='submit'
              className="w-full p-3 text-sm font-bold tracking-wide text-gray-100 uppercase transition duration-150 bg-green-400 rounded-lg focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Login