import type { inferInput } from "@trpc/tanstack-react-query";
import {prefetch,trpc} from "@/trpc/server";
import { appRouter } from "@/trpc/routers/_app";

type Input = inferInput<typeof trpc.workflows.getMany>;

//prefetch all workflows
export const prefetchWorkflows = (params: Input) => {
   return prefetch(trpc.workflows.getMany.queryOptions(params));
}

