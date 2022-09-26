import * as React from "react";
import { Button } from '@chakra-ui/button';
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const registerUser = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    
    const data = {
      name: name,
      email: email,
      password: password
    }
    
    await axios.post('/api/register', data);
    signIn("credentials", {
        email, password, callbackUrl: `${window.location.origin}/dashboard`, redirect: false }
    ).then(function(result: any) {
        router.push(result.url)
    }).catch((err: { toString: () => string; }) => {
        alert("Failed to register: " + err.toString())
    });
  }

  return (
    <form onSubmit={registerUser}>
      <div className="bg-white flex flex-col items-center justify-center min-h-screen py-2 shadow-lg">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="uppercase text-sm text-gray-600 font-bold">
              Name: 
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)} 
                className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              />
            </label>
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
              Register
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Register