import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/dashboard')
  } else {
    redirect('/api/auth/signin')
  }
}

// docker run  -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
// packages/db
// npx prisma migrate dev
// npx prisma db seed 