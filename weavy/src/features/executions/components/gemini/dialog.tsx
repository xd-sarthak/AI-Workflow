"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { z } from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,FormDescription} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const AVAILABLE_MODELS = [
    "gemini-2.0-flash",
    "gemini-2.5-flash"
] as const;

const formSchema = z.object({
    variableName: z.string()
                   .min(1,{message: "Variable name is required"})
                   .regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/,{message: "variable name must start with a letter or underscore, and contain only letters, numbers, and underscores"}),   
    model: z.string().min(1,"Model is required"),
    systemPrompt: z.string().optional(),
    userPrompt: z.string().min(1,{message: "Prompt is required"}),
});
    
export type GeminiValues = z.infer<typeof formSchema>;


interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
   defaultValues?: Partial<GeminiValues>;
}

export const GeminiNodeDialog = ({ 
    open, onOpenChange, onSubmit, defaultValues }: Props) => {
    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            variableName: defaultValues?.variableName || "",
            model: defaultValues?.model || AVAILABLE_MODELS[0],
            systemPrompt: defaultValues?.systemPrompt || "",
            userPrompt: defaultValues?.userPrompt || "",
        }
    });

    const watchVariableName = form.watch("variableName");

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        onSubmit(values);
        onOpenChange(false);
    };

    useEffect(() => {
        if(open){
            form.reset({
            variableName: defaultValues?.variableName || "",
            model: defaultValues?.model || AVAILABLE_MODELS[0],
            systemPrompt: defaultValues?.systemPrompt || "",
            userPrompt: defaultValues?.userPrompt || "",
        });
    }
    }, [open,defaultValues,form]);


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Gemini Node Config</DialogTitle>
                    <DialogDescription>Configure the Gemini Node</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-8 mt-4"
                    >
                        <FormField  
                        control={form.control}
                        name="variableName"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Variable Name</FormLabel>
                                    <FormControl>
                                        <Input
                                        placeholder="myName"
                                        {...field}
                                        />
                                    </FormControl>

                                <FormDescription>
                                    Use this name to reference the result in other nodes:{" "}
                                    {`{{${watchVariableName || "myName"}}}.text `}
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />

                        
                        <FormField  
                        control={form.control}
                        name="systemPrompt"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>System Prompt (optional)</FormLabel>                  
                                    <FormControl>
                                        <Textarea
                                        placeholder={
                                           "You are a helpful assistant"
                                        }
                                        className="min-h-[80px] font-mono text-sm"
                                        {...field}
                                        />           
                                    </FormControl>           
                                <FormDescription>
                                    Sets behaviour of the assistant. Use {"{{json variable}}"} to stringify objects or {"{{variables}}"} for simple values.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />

                        <FormField  
                        control={form.control}
                        name="userPrompt"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>User Prompt</FormLabel>                  
                                    <FormControl>
                                        <Textarea
                                        placeholder={
                                           "Summarise this text: {{json httpResponse.data}}"
                                        }
                                        className="min-h-[120px] font-mono text-sm"
                                        {...field}
                                        />           
                                    </FormControl>           
                                <FormDescription>
                                    Prompt to send the AI. Use {"{{json variable}}"} to stringify objects or {"{{variables}}"} for simple values.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />

                         <DialogFooter className="mt-4">
                            <Button type="submit">Save</Button>
                         </DialogFooter>
                    </form>
                </Form>
                
            </DialogContent>
        </Dialog>
    )
}