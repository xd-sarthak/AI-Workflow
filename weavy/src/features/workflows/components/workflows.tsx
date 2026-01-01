"use client";

import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { EntityHeader } from "@/components/entity-views";
import { EntityContainer } from "@/components/entity-views";
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

export const WorkflowsContainer = ({children}: {children: React.ReactNode}) => {
    return (
        <EntityContainer
        header={<WorkflowsHeader/>}
        search={<> </>}
        pagination={<> </>}
        >
            {children}
        </EntityContainer>
    )
}