import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Wrapper = (props: { children: React.ReactNode}) =>
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
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-red-400 shadow-lg">
        <h1 className="text-2xl font-bold">
          You are not authenticated
        </h1>
        <div className="flex items-center justify-center mb-4">
          <a
            href='/login'
            className="w-full p-3 text-sm font-bold tracking-wide text-center text-gray-100 uppercase transition duration-150 rounded-lg focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90"
          >
            Back to Login
          </a>
        </div>
      </div>
    )
  }
}

export default Wrapper
