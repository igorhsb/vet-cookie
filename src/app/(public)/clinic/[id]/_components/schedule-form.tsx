"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'
import { useForm } from "react-hook-form";

export const appointmentSchema = z.object({
    name: z.string().min(1, {message: "Nome é obrigatório"}),
    email: z.string().email("Email é obrigatório"),
    phone: z.string().min(1, {message: "Telefone é obrigatório"}),
    date: z.date(),
    serviceId: z.string()
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>

export function useAppointmentForm() {
    return useForm<AppointmentFormData>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            serviceId: "",
            date: new Date(),
        }
    })
}