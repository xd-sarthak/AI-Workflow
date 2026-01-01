"use client";

import { useCreateWorkflow, useRemoveWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { EmptyView, EntityHeader, EntityItem, EntityList, EntityPagination, EntitySearch, ErrorView, LoadingView } from "@/components/entity-views";
import { EntityContainer } from "@/components/entity-views";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { useRouter } from "next/navigation";
import type{ Workflow } from "@/generated/prisma/client";
import { WorkflowIcon } from "lucide-react";
import {formatDistanceToNow} from "date-fns";

export const WorkflowsSearch = () => {

    const [params,setParams] = useWorkflowsParams();
    const {searchValue,setSearchChange} = useEntitySearch({
        params,
        setParams,
    })
    return (
        <EntitySearch
        value= {searchValue}
        onChange={setSearchChange}
        placeholder="Search workflows"
        />
    )
}
export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows();

    return (
        <EntityList
        items={workflows.data.items}
        getKey={(workflow) => workflow.id}
        renderItem={(workflow) => <WorkflowsItem data={workflow}/>}
        emptyView={<WorkflowsEmpty/>}
        />
    )

};

export const WorkflowsHeader = ({disabled} : {disabled?: boolean}) => {
    const createWorkflow = useCreateWorkflow();

    const handleCreate = () => {
        createWorkflow.mutate(undefined,{
            onError: (error) => {
                console.error(error);
            }
        })
    };


    return (
        <>
        <EntityHeader
        title="Workflows"
        description="Manage your workflows"
        onNew={handleCreate}
        newButtonLabel="New Workflow"
        disabled={disabled}
        isCreating={createWorkflow.isPending}
        />
        </>
    )
};

export const WorkflowsPagination = () => {
    const workflows = useSuspenseWorkflows();
    const [params,setParams] = useWorkflowsParams();

    return (
        <EntityPagination
        disabled={workflows.isFetching}
        totalPages={workflows.data.totalPages}
        page={workflows.data.page}
        onPageChange={(page) => setParams({...params,page})}
        />

    )
}

export const WorkflowsContainer = ({children}: {children: React.ReactNode}) => {
    return (
        <EntityContainer
        header={<WorkflowsHeader/>}
        search={<WorkflowsSearch/>}
        pagination={<WorkflowsPagination/>}
        >
            {children}
        </EntityContainer>
    )
};

export const WorkflowsLoading = () => {
    return (
        <LoadingView
        entity="workflows"
        message="Loading workflows..."
        />
    )
}

export const WorkflowsError = () => {
    return (
        <ErrorView
        entity="workflows"
        message="Error loading workflows..."
        />
    )
}

export const WorkflowsEmpty = () => {
    const createWorkflow = useCreateWorkflow();
    const router = useRouter();

    const handleCreate = () => {
        createWorkflow.mutate(undefined,{
            onError: (error) => {
                console.error(error);
            },
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`);
            }
        })
    };
    return (
        <>
        <EmptyView
        message="No workflows found..."
        onNew={handleCreate}
        />
        </>
    )
}

export const WorkflowsItem = ({data}: {data: Workflow}) => {
    const removeWorkflow = useRemoveWorkflow();

    const handleRemove = () => {
        removeWorkflow.mutate({id: data.id})
    }
    return (
        <EntityItem
        href={`/workflows/${data.id}`}
        title={data.name}
        subtitle = {
            <>
            Updated {formatDistanceToNow(data.updatedAt, {addSuffix: true} )}{" "}
            &bull; Created {formatDistanceToNow(data.createdAt, {addSuffix: true})}{" "}
            </>
        }
        image = {
            <div className="size-8 flex items-center justify-center rounded-md bg-primary/10 text-primary">
                <WorkflowIcon className="size-5 text-muted-foreground"/>
            </div>
        }
        onRemove={handleRemove}
        isRemoving={removeWorkflow.isPending}
        />
    )
}
