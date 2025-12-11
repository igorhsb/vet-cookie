'use client';

import Image from 'next/image';
import imgTest from '../../../../../../public/foto1.png';
import { MapPin } from 'lucide-react';
import { Prisma } from '../../../../../../generated/prisma';
import { useAppointmentForm, AppointmentFormData } from './schedule-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormLabel, FormMessage, FormField, FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { formatPhone } from '@/utils/formatPhone';
import { DateTimePicker } from './date-picker';
import "react-datepicker/dist/react-datepicker.css";

type UserwithServiceAndSubscription = Prisma.UserGetPayload<{
    include: {
        subscription: true,
        services: true
    }
}>


interface ScheduleContentProps {
    clinic: UserwithServiceAndSubscription
}

export function ScheduleContent({ clinic }:ScheduleContentProps) {

    const form = useAppointmentForm();

    return (
        <div className="min-h-screen flex flex-col">
            <div className="h-32 bg-emerald-500" />
            <section className="container mx-auto px-4 -mt-16">
                <div className="max-w-2xl">
                    <article className="flex flex-col items-center">
                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white">
                            <Image
                                src={clinic.image ? clinic.image : imgTest}
                                alt="Foto da clínica"
                                className="object-cover"
                                fill
                            />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">
                            {clinic.name}
                        </h1>
                        <div className="flex items-center gap-1">
                            <MapPin className="w-5 h-5" />
                            <span>{clinic.address ? clinic.address : "Endereço não encontrado"}</span>
                        </div>
                    </article>
                </div>
            </section>
            <section className='max-w-3xl mx-auto w-full my-3'>
                <Form {...form}>
                <form className="mx-3 space-y-6 bg-white p-6 border rounded-md shadow-sm" action="">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem className='my-2'>
                                <FormLabel > Nome completo </FormLabel>
                                <FormControl>
                                    <Input 
                                        id="name" 
                                        placeholder='Digite seu nome completo'
                                        {...field}
                                    ></Input>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem className='my-2'>
                                <FormLabel > Email </FormLabel>
                                <FormControl>
                                    <Input 
                                        id="name" 
                                        placeholder='Digite seu email...'
                                        {...field}
                                    ></Input>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({field}) => (
                            <FormItem className='my-2'>
                                <FormLabel > Telefone </FormLabel>
                                <FormControl>
                                    <Input 
                                        id="name" 
                                        placeholder='(XX) XXXXX-XXXX'
                                        {...field}
                                        onChange={(e) => {
                                            const formattedValue = formatPhone(e.target.value)
                                            field.onChange(formattedValue)
                                        }}
                                    ></Input>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({field}) => (
                            <FormItem className='flex items-center gap-2 space-y-1'>
                                <FormLabel > Data do agendamento </FormLabel>
                                <FormControl>
                                    <DateTimePicker 
                                        initialDate={new Date()}
                                        clasName='w-full rounded border p-2'
                                        onChange={(date) => {
                                            if (date) {
                                                field.onChange(date)
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            </section>
            
        </div>
    );
}
