"use client";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import Logout from "./logout";
import { useTRPC } from "@/trpc/client";
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export default function Home() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const {data} = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
    },
  }));

  
  return (
   <div>
    <div>
    {JSON.stringify(data, null, 2)}
    </div>
    <div>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>Create Workflow</Button>
    </div>
    <Logout />
   </div>
  );
}
