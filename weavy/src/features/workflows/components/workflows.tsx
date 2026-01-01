"use client";

import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { EntityHeader, EntityPagination, EntitySearch } from "@/components/entity-views";
import { EntityContainer } from "@/components/entity-views";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";

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
        <div>
            <p>{JSON.stringify(workflows.data,null,2)}</p>
        </div>
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