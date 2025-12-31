"use client";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import Logout from "./logout";
import { useTRPC } from "@/trpc/client";
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const {data} = useQuery(trpc.getWorkflows.queryOptions());

  console.log(data);
  

  const testAi = useMutation(trpc.testAi.mutationOptions(
    {
      onSuccess: () => {
        toast.success("AI execution started");
      },
      onError: () => {
        toast.error("Failed to start AI execution");
      }
    }
  ));

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
    },
  }));

  
  return (
   <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
   protected server component
    <div>
    {JSON.stringify(data, null, 2)}
    </div>
    <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
      Test AI
    </Button>
    <div>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>Create Workflow</Button>
    </div>
    <Logout />
   </div>
  );
}
