import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

interface Credentials {
  phone: string;
  password: string;
  name: string;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
        password: { label: "Password", type: "password", required: true },
        name: { label: "Name", type: "text", required: true },
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials) return null;

        // 1️⃣ Check if user exists
        const existingUser = await db.user.findFirst({
          where: { number: credentials.phone },
        });

        if (existingUser) {
          const passwordValid = await bcrypt.compare(credentials.password, existingUser.password);
          if (!passwordValid) return null;

          return {
            id: existingUser.id.toString(),
            name: existingUser.name,
            email: existingUser.number,
          };
        }

        // 2️⃣ Create new user with Balance & OnRampTransaction
        try {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          const user = await db.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword,
              name: credentials.name,
              Balance: { create: { amount: 0, locked: 0 } }
            },
          });

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.number,
          };
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: { token: any; session: any }) {
      session.user.id = token.sub;
      return session;
    },
  },
};
