import {createTRPCRouter, protectedProcedure} from "@/trpc/init"
import prisma from "@/lib/db"
import {z} from "zod"
import { PAGINATION } from "@/config/constants"
import { credentialType, } from "@/generated/prisma/enums"


export const credentialsRouter = createTRPCRouter({

    create:protectedProcedure
    .input(z.object({
        name: z.string().min(1,"Name is required"),
        type: z.enum(credentialType),
        value: z.string().min(1,"Value is required")
    })
)
    .mutation(({ctx, input}) => {
        const {name,value,type} = input;
        return prisma.credential.create({
            data:{
                name,
                userId: ctx.auth.user.id,
                type,
                value, //TODO: encrypt in production
            }
        });
    }),

    remove: protectedProcedure
    .input(z.object({
        id:z.string(),
    }))
    .mutation(({ctx,input}) => {
        return prisma.credential.delete({
            where:{
                id:input.id,
                userId:ctx.auth.user.id,
            }
        });
    }),

    update: protectedProcedure
    .input(z.object({
        id:z.string(),
        name: z.string().min(1,"Name is required"),
        type: z.enum(credentialType),
        value: z.string().min(1,"Value is required")
    }))
    .mutation(async({ctx,input}) => {
        const {id,name,type,value} = input;
        
        const credential = await prisma.credential.findUniqueOrThrow({
            where:{
                id,
                userId:ctx.auth.user.id,
            },
        });
        
        const updatedCredential = prisma.credential.update({
            where: {
                id,
                userId: ctx.auth.user.id,
            },
            data :{
                name,
                type,
                value,
            }
        })

        return updatedCredential;
        
    }),

    getOne: protectedProcedure
    .input(z.object({id:z.string()}))
    .query(async ({ctx,input}) => {
        
         return prisma.credential.findUniqueOrThrow({
            where: {id:input.id, userId: ctx.auth.user.id,},
            // select: {
            //     id: true,
            //     name: true,
            //     type: true,
            //     createdAt: true,
            //     updatedAt: true
            //     // dont add value for security
            // }
         })
    }),

    getMany: protectedProcedure
    .input(z.object({
        page: z.number().min(1).default(PAGINATION.DEFAULT_PAGE),
        pageSize: z.number().min(PAGINATION.MIN_PAGE_SIZE).max(PAGINATION.MAX_PAGE_SIZE).default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().default(""),
    }))
    .query(async ({ctx,input}) => {

        const {page, pageSize, search} = input;

        const [items,totalCount] = await Promise.all([
            prisma.credential.findMany({
                where:{
                    userId:ctx.auth.user.id,
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                orderBy:{
                    createdAt: "desc",
                },
                skip: (page - 1) * pageSize,
                take: pageSize,

                // select: {
                //     id: true,
                //     name: true,
                //     type: true,
                //     createdAt: true,
                //     updatedAt: true //dont add value 
                // }
            }),

            prisma.credential.count({
                where:{
                    userId:ctx.auth.user.id,
                },
            }),
        ]);

        const totalPages = Math.ceil(totalCount / pageSize);
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;

        return {
            items,
            page,
            pageSize,
            totalCount,
            totalPages,
            hasNextPage,
            hasPreviousPage,
        }
         
    }),

    getByType: protectedProcedure
    .input(z.object({
        type: z.enum(credentialType),
    }))
    .query( ({input,ctx}) => {
        const {type} = input;
        return prisma.credential.findMany({
            where: {
                userId: ctx.auth.user.id,
                type
            },
            orderBy: {
                updatedAt: "desc",
            }
        })
    }),

})