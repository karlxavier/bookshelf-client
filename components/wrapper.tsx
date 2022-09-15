import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Wrapper(props: any)
{
  const session = useSession();
  const router = useRouter();

  if ((session !== null && session?.status === "authenticated") ||
    (router.pathname === "/" || router.pathname === '/register' || router.pathname === '/login'))
  {
    return (
      props.children
    )
  }
  else {
    return (
      <div className="bg-red-400 flex flex-col items-center justify-center min-h-screen py-2 shadow-lg">
        <h1 className="text-2xl font-bold">
          You are not authenticated
        </h1>
        <div className="mb-4 flex items-center justify-center">
          <a
            href='/login'
            className="uppercase text-sm text-center font-bold tracking-wide text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150"
          >
            Back to Login
          </a>
        </div>
      </div>
    )
  }
}