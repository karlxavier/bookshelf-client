import * as React from "react";
import {useState} from "react";
import Link from 'next/link'
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const router = useRouter();
  const handleLogin = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    signIn("credentials", {
      email, password, callbackUrl: `${window.location.origin}/dashboard`, redirect: false }
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
        {loginError}
        <label>
          Email: <input type='text' value={user} onChange={(e) => setUser(e.target.value)} />
        </label>
        <label>
          Password: <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type='submit'>Submit login</button>
          <Link href='/register'>Register</Link>
      </form>
  )
}