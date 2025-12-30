"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";


const LoginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

type LoginSchemaType = z.infer<typeof LoginSchema>;

export const LoginForm = () => {
    const router = useRouter();
    
    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginSchemaType) => {
        try {
            await authClient.signIn.email({
                email: values.email,
                password: values.password,
                callbackURL: "/"
            },
            {
                onSuccess: () => {
                    toast.success("Logged in successfully");
                    router.push("/");
                },
                onError: (ctx) => {
                    // Handle specific error types with user-friendly messages
                    const error = ctx.error;
                    let errorMessage = "An error occurred during login. Please try again.";
                    
                    if (error.message) {
                        // Map common error messages to user-friendly ones
                        const errorMessageLower = error.message.toLowerCase();
                        
                        if (errorMessageLower.includes("invalid") || errorMessageLower.includes("incorrect")) {
                            errorMessage = "Invalid email or password. Please check your credentials and try again.";
                        } else if (errorMessageLower.includes("not found") || errorMessageLower.includes("does not exist")) {
                            errorMessage = "No account found with this email address.";
                        } else if (errorMessageLower.includes("network") || errorMessageLower.includes("connection")) {
                            errorMessage = "Network error. Please check your connection and try again.";
                        } else if (errorMessageLower.includes("rate limit") || errorMessageLower.includes("too many")) {
                            errorMessage = "Too many login attempts. Please wait a moment and try again.";
                        } else if (errorMessageLower.includes("email") && errorMessageLower.includes("verify")) {
                            errorMessage = "Please verify your email address before logging in.";
                        } else {
                            // Use the original error message if it's already user-friendly
                            errorMessage = error.message;
                        }
                    }
                    
                    toast.error(errorMessage);
                    form.setError("root", {
                        type: "manual",
                        message: errorMessage
                    });
                }
            });
        } catch (error) {
            // Catch any unexpected errors
            const errorMessage = error instanceof Error 
                ? error.message 
                : "An unexpected error occurred. Please try again.";
            
            toast.error(errorMessage);
            form.setError("root", {
                type: "manual",
                message: errorMessage
            });
        }
    };

    const isPending = form.formState.isSubmitting;

    return (
        <Card className="w-full">
                <CardHeader className="text-center">
                    <CardTitle>Welcome Back</CardTitle>
                    <CardDescription>
                        Login to continue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        type="button"
                                        disabled={isPending}
                                    >
                                        <Image src="/github.svg" alt="Github" width={20} height={20} />
                                        Continue with Github
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        type="button"
                                        disabled={isPending}
                                    >
                                        <Image src="/google.svg" alt="Google" width={20} height={20} />
                                        Continue with Google
                                    </Button>
                                </div>
                                <div className="grid gap-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="john@example.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                        <FormField
                                        control={form.control}
                                        name="password"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="********"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    {form.formState.errors.root && (
                                        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                                            {form.formState.errors.root.message}
                                        </div>
                                    )}
                                    <Button type="submit" className="w-full" disabled={isPending}>
                                        {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Login"}
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                        Dont't have an account?{" "} 
                                        <Link href="/signup" className="text-primary underline">Signup</Link>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
        );
    };
