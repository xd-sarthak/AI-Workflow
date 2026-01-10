import { sendWorkflowExecution } from "@/inngest/utils";
import { timeStamp } from "console";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try {
        const url = new URL(request.url);
        const workflowId = url.searchParams.get("workflowId");
        if(!workflowId){
            return NextResponse.json({message: "Missing query param: workflowId"}, {status: 400});
        }

        const body = await request.json();

        const stripeData = {
            //event metadata
            eventId: body.id,
            eentType: body.type,
            timestamp: body.created,
            livemode: body.livemode,
            raw: body.data?.object
        };

        //trigger inngest job
        await sendWorkflowExecution({
            workflowId,
            initialData: {
                stripe: stripeData
            }
        });

        return NextResponse.json({message: "Stripe webhook received"}, {status: 200});
        
    } catch (error) {
        console.error("Stripe webhook error: ",error);
        return NextResponse.json({message: "Internal server error"}, {status: 500});  
    }
}