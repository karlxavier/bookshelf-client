import * as React from "react";
import { Button } from '@chakra-ui/button';
import {useState} from "react";
import {useRouter} from "next/router";
import {signIn} from "next-auth/react";

export default function Home() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const handleLogin = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    signIn("credentials", {
      email, password, callbackUrl: `${window.location.origin}/discover`, redirect: false }
    ).then(function(result: any){
      if (result.error !== null)
      {
        if (result.status === 401)
        {
          setLoginError("Your username/password combination was incorrect. Please try again");
        }
        else
        {
          setLoginError(result.error);
        }
      }
      else
      {
        router.push(result.url);
      }
    });
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="bg-red-400 flex flex-col items-center justify-center min-h-screen py-2 shadow-lg">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="text-red-400 text-md text-center rounded p-2">
            {loginError}
          </div>
          <div className="mb-4">
            <label className="uppercase text-sm text-gray-600 font-bold">
              Email: 
              <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="uppercase text-sm text-gray-600 font-bold">
              Password: 
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div className="mb-4 flex items-center justify-center">
            <Button
              type='submit'
              className="uppercase text-sm font-bold tracking-wide bg-green-400 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150"
            >
              Login
            </Button>
          </div>
          <div className="mb-4 flex items-center justify-center">
            <a
              href='/register'
              className="uppercase text-sm text-center font-bold tracking-wide bg-green-400 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </form>
  )
}