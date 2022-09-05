import NextAuth, { User } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
let userAccount: any;

const bcrypt = require('bcrypt');

const confirmPasswordHash = (plainPassword: any, hashedPassword: any) => {
  return new Promise(resolve => {
    bcrypt.compare(plainPassword, hashedPassword, function(err: any, res: any) {
      resolve(res);
    });
  })
}

const configuration = {
  cookie: {
      secure: process.env.NODE_ENV && process.env.NODE_ENV === 'production',
  },
  session: {
      jwt: true,
      maxAge: 30 * 24 * 60 * 60
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'karl@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        try
        {
          const payload = {
            auth: {
              email: credentials.email,
              password: credentials.password,
            }
          };

          const res = await fetch(process.env.API_URI + '/v1/user_token', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': 'en-US',
            },
          });
  
          const user = await res.json();
          if (!res.ok) {
            throw new Error(user.exception);
          }

          if (res.ok && user)
          {
            const res = await confirmPasswordHash(credentials.password, user.password);
            if (res === true)
            {
              userAccount = {
                userId: user.userId,
                name: user.name,
                email: user.email
              };
              return userAccount;
            }
            else
            {
              console.log("Hash not matched logging in");
              return null;
            }
          } else {
            return null;
          }
        }
        catch (err)
        {
          console.log("Authorize error:", err);
        }

      }
    }),
  ],
  callbacks: {
      async signIn(user: any, account: any, profile: any) {
        try
        {
          user = user.user;
          console.log("Sign in callback", user);
          console.log("User id: ", user.userId)
          if (typeof user.userId !== typeof undefined)
          {
            console.log("User is logged in!");
            return user;
          }
          else
          {
            console.log("User id was undefined")
            return false;
          }
        }
        catch (err)
        {
          console.error("Signin callback error:", err);
        }

      },
      async register(name: any, email: any, password: any) {
        try
        {
          const payload = {
            name: name,
            email: email,
            password: password,
          };

          const res = await fetch(process.env.API_URI + '/v1/user_registration', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': 'en-US',
            },
          });

          const user = await res.json();
          if (!res.ok) {
            console.error("Failed to register user.");
            throw new Error(user.exception);
          }

          return true;
        }
        catch (err)
        {
          console.error("Failed to register user. Error", err);
          return false;
        }

      },
      async session(session: any, token: any) {
        if (userAccount !== null)
        {
          session.user = {
            userId: userAccount.userId,
            name: userAccount.name,
            email: userAccount.email
          }

        }
        else if (typeof token.user !== typeof undefined && (typeof session.user === typeof undefined
          || (typeof session.user !== typeof undefined && typeof session.user.userId === typeof undefined)))
        {
          session.user = token.user;
        }
        else if (typeof token !== typeof undefined)
        {
          session.token = token;
        }
        return session;
      },
      async jwt(token: any, user: any, account: any, profile: any, isNewUser: any) {
        console.log("JWT callback. Got User: ", user);
        if (typeof user !== typeof undefined)
        {
          token.user = user;
        }
        return token;
      }
  }
}

export default (req: any, res: any) => NextAuth(req, res, configuration)