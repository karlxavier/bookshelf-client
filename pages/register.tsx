import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function Register() {

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
    <>
      <h1>Register</h1>

      <form onSubmit={registerUser}>
        <label>
          Name: <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email: <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password: <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type='submit'>Register User</button>

        <Link href='/register'>Register</Link>
      </form>
    </>
  )
}