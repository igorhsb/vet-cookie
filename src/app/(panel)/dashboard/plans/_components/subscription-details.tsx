"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Subscription } from "../../../../../../generated/prisma";
import { subscriptionPlans } from "@/utils/plans";
import { Button } from "@/components/ui/button";

interface SubscriptionDetailsProps{
    subscription: Subscription
}

export function SubscriptionDetails({subscription} : SubscriptionDetailsProps) {
    const subscriptionInfo = subscriptionPlans.find( plan => plan.id === subscription.plan);
    
    async function handleManageSubscription() {
        
    }
    
    return (
        <Card className="w-full mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">
                    Plano atual
                </CardTitle>
                <CardDescription>
                    Sua assinatura está ativa!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg md:text-xl">
                        {subscription.plan === "BASIC" ? "BASIC" : "PROFISSIONAL"}
                    </h3>
                    <div className="bg-green-500 text-white w-fit px-4 py-1 rounded-md">
                        {subscription.status === "active" ? "ATIVO" : "INATIVO"}
                    </div>
                </div>
                <ul className="list-disc list-inside space-y-2">
                    {subscriptionInfo && subscriptionInfo.features.map( feature => (
                        <li key={feature}>
                            {feature}
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={handleManageSubscription}
                >
                    Gerenciar assinatura
                </Button>
            </CardFooter>
        </Card>
    )
}