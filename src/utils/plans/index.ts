
export type PlanDetailsProps = {
    maxServices: number;
}

export type PlanProps = {
    BASIC: PlanDetailsProps;
    PROFESSIONAL: PlanDetailsProps;
}

export const PLANS = {
    BASIC: {
        maxServices: 3
    },
    PROFESSIONAL: {
        maxServices: 50
    }
}

export const subscriptionPlans = [
    {
        id: "BASIC",
        name: "Basic",
        description: "Perfeito para clinicas menores",
        oldPrice: "R$ 67,99",
        price: "R$ 59,99",
        features: [
            `Até ${PLANS["BASIC"].maxServices} serviços`,
            'Agendamentos ilimitados',
            'Suporte',
            'Relatórios'
        ]
    },
    {
        id: "PROFESSIONAL",
        name: "Professional",
        description: "Perfeito para clinicas grandes",
        oldPrice: "R$ 199,99",
        price: "R$ 149,99",
        features: [
            `Até ${PLANS["PROFESSIONAL"].maxServices} serviços`,
            'Agendamentos ilimitados',
            'Suporte',
            'Relatórios'
        ]
    }
]