import Credentials from "@auth/core/providers/credentials";
import { compare } from "bcryptjs";
import Google from "next-auth/providers/google";
import NextAuth, { CredentialsSignin } from "next-auth";
import { DefaultSession } from "@auth/core/types";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      role: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "select_account", // To avoid repeated consent screen
          access_type: "offline",
        },
      },
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const email = credentials?.email;
          const password = credentials?.password as string;

          if (!email || !password) {
            throw new CredentialsSignin("Please provide email and password");
          }

          const response = await fetch(
            `${process.env.CONVEX_SITE_URL}getUserByEmail?email=${email}`,
            {
              cache: "no-store",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch user");
          }

          const user = await response.json();

          if (!user) {
            throw new CredentialsSignin("Invalid email and password");
          }
          if (!user.password) {
            throw new CredentialsSignin("Invalid password");
          }

          const isMatched = await compare(password, user.password);
          if (!isMatched) {
            throw new CredentialsSignin("Invalid password");
          }

          return {
            id: user._id,
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      // On initial sign-in, attach user data to the token
      if (user) {
        token.sub = user.id;
        //@ts-ignore
        token.role = user.role;
        token.email = user.email;
      } else {
        // Fetch the latest role from the database on subsequent requests
        try {
          const response = await fetch(
            `${process.env.CONVEX_SITE_URL}getUserByEmail?email=${token.email}`,
            {
              cache: "no-store",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const updatedUser = await response.json();
            token.role = updatedUser?.role || "user"; // Default to 'user' if no role found
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      // Pass token data to the session object
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
      }
      return session;
    },

    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          const { email, name: firstname, image } = user;

          if (!email) return false;

          const response = await fetch(
            `${process.env.CONVEX_SITE_URL}getUserByEmail?email=${encodeURIComponent(email)}`,
            {
              cache: "no-store",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const existingUser = await response.json();
          console.log(existingUser, "existing user");

          if (existingUser.error === "User not found") {
            const createResponse = await fetch(
              `${process.env.CONVEX_SITE_URL}createUser`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email,
                  firstname,
                  role: "user",
                  image,
                }),
              }
            );

            if (!createResponse.ok) {
              throw new Error("Failed to create user");
            }
          }
          return true;
        }

        return Boolean(account?.provider === "credentials");
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
});