import { DefaultSession } from "next-auth";

declare module 'next-auth'{
    interface Session {
       user : User & DefaultSession['user'] 
    }
}

interface User {
    id : string,
    name : string,
    email : string,
    emailVerified?: null | string | boolean,
    image?: string,
    stripe_customer_id?: string,
    address?: string,
    phone?: string,
    status: string,
    times: string[],
    createdAt : string,
    updateAt : string,
}