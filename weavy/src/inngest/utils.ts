import toposort from "toposort";
import {Connection,Node} from "@/generated/prisma/client";

export const topologicalSort = (nodes: Node[],connections: Connection[]): Node[] => {
    //if no connections, return nodes as is
   if(connections.length === 0) {
    return nodes;
   }

   //edges array for toposort
   const edges : [string,string][] = connections.map((conn) => [conn.fromNodeId,conn.toNodeId]);

   //add nodes with no connections as self-edges
   const connectionNodeIds = new Set<string>();

   for(const conn of connections) {
    connectionNodeIds.add(conn.fromNodeId);
    connectionNodeIds.add(conn.toNodeId);
   }

   for(const node of nodes) {
    if(!connectionNodeIds.has(node.id)) {
      edges.push([node.id,node.id]);
    }
   }
    //perform topological sort
    let sortedNodeIds: string[]
    try {
        sortedNodeIds = toposort(edges);
        //remove self-edges
        sortedNodeIds = [...new Set(sortedNodeIds)]
    } catch (error) {
        if(error instanceof Error && error.message.includes("Cyclic")) {
            throw new Error("Invalid workflow structure: Cycle detected");
        }
        throw error;
    }

    //map sorted node ids back to nodes
    const nodeMap = new Map(nodes.map((n) => [n.id,n]));
    return sortedNodeIds.map((id) => nodeMap.get(id)!).filter(Boolean);
   }