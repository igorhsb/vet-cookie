"use server"

import prisma from "@/lib/prisma"

export async function getInfoSchedule({userId}: {userId: string}) {
    try{
        if(!userId){
            return null;
        }

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            include: {
                subscription: true,
                services: true
            }
        });

        if(!user) {
            return null
        }
        const activeServices = user.services.filter(service => {return service.status}) || [];
        user.services = activeServices;
        return user
    } catch (err) {

    }
}