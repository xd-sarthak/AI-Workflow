//Hook to fetch all workflows using suspense

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useWorkflowsParams } from "./use-workflows-params";
export const useSuspenseWorkflows = () => {
   const trpc = useTRPC();
   const [params] = useWorkflowsParams();

   return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
};

//hook to create workflow
export const useCreateWorkflow = () => {
   const router = useRouter()
   const trpc = useTRPC();
   const queryClient = useQueryClient();

   return useMutation(
      trpc.workflows.create.mutationOptions({
         onSuccess: (data) => {
            toast.success(`Workflow ${data.name} created successfully`);
            router.push(`/workflows/${data.id}`);
            queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
         },
         onError: (error) => {
            toast.error(`Failed to create workflow: ${error.message}`);
         }
      })
   )
}

//hook to remove workflow
export const useRemoveWorkflow = () => {
   const trpc = useTRPC();
   const queryClient = useQueryClient();

   return useMutation(
      trpc.workflows.remove.mutationOptions({
         onSuccess: (data) => {
            toast.success(`Workflow ${data.name} removed successfully`);
            queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
            queryClient.invalidateQueries(trpc.workflows.getOne.queryFilter({id: data.id}));
         },
         onError: (error) => {
            toast.error(`Failed to remove workflow: ${error.message}`);
         }
      })
   )
}

//hook to get one workflow
export const useSuspenseWorkflow = (id: string) => {
   const trpc = useTRPC();
   return useSuspenseQuery(trpc.workflows.getOne.queryOptions({id}));
}

//hook to update workflow name
export const useUpdateWorkflowName = () => {
   const trpc = useTRPC();
   const queryClient = useQueryClient();

   return useMutation(
      trpc.workflows.updateName.mutationOptions({
         onSuccess: (data) => {
            toast.success(`Workflow ${data.name} updated successfully`);
            queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
            queryClient.invalidateQueries(trpc.workflows.getOne.queryOptions({id: data.id}));
         },
         onError: (error) => {
            toast.error(`Failed to update workflow name: ${error.message}`);
         }
      })
   )
}

//hook to update workflow
export const useUpdateWorkflow = () => {
   const trpc = useTRPC();
   const queryClient = useQueryClient();

   return useMutation(
      trpc.workflows.update.mutationOptions({
         onSuccess: (data) => {
            toast.success(`Workflow updated successfully`);
            queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
            queryClient.invalidateQueries(trpc.workflows.getOne.queryOptions({id: data.id}));
         },
         onError: (error) => {
            toast.error(`Failed to update workflow: ${error.message}`);
         }
      })
   )
}


export const useExecuteWorkflow = () => {
   const trpc = useTRPC();

   return useMutation(
      trpc.workflows.execute.mutationOptions({
         onSuccess: (data) => {
            toast.success(`Workflow executed successfully`);
         },
         onError: (error) => {
            toast.error(`Failed to execute workflow: ${error.message}`);
         }
      })
   )
}