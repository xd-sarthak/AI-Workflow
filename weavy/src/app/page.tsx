import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import Logout from "./logout";


export default async function Home() {
  await requireAuth();
  const data = await caller.getUsers();
  return (
   <div>
    {JSON.stringify(data, null, 2)}
    <Logout />
   </div>
  );
}
