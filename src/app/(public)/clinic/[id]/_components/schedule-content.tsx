'use client';

import { useState, useCallback, useEffect } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScheduleTimeList } from './schedule-time-list';

type UserwithServiceAndSubscription = Prisma.UserGetPayload<{
    include: {
        subscription: true,
        services: true
    }
}>


interface ScheduleContentProps {
    clinic: UserwithServiceAndSubscription
}

export interface TimeSlot {
    time: string;
    available: boolean;
}

export function ScheduleContent({ clinic }:ScheduleContentProps) {
    const form = useAppointmentForm();
    const { watch } = form;

    const [selectedTime, setSelectedTime] = useState("");
    const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const selectedDate = watch("date")
    const selectedServiceId = watch("serviceId")

    const [blockedTimes, setBlockedTimes] = useState<string[]>([]);

    const fetchBlockedTimes = useCallback(async (date: Date): Promise<string[]> => {
        setLoadingSlots(true);
        try {
            const dateString = date.toISOString().split("T")[0]
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/schedule/get-appointments?userId=${clinic.id}&date=${dateString}`)
            const json = await response.json();
            setLoadingSlots(false);
            return json
        } catch (err) {
            console.log(err);
            setLoadingSlots(false);
            return [];
        }
    },[clinic.id]);

    useEffect(() => {

        if(selectedDate) {
            fetchBlockedTimes(selectedDate).then((blocked) => {
                setBlockedTimes(blocked);
                const times = clinic.times || [];
                const finalSlots = times.map((time) => ({
                    time: time,
                    available: !blocked.includes(time)
                }))

                setAvailableTimeSlots(finalSlots)
            })
        }

    }, [clinic.times, fetchBlockedTimes, selectedTime, selectedDate, selectedServiceId ])

    
    async function handleRegister(formData:AppointmentFormData) {
        
    }

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
                <form 
                className="mx-3 space-y-6 bg-white p-6 border rounded-md shadow-sm" action=""
                onSubmit={form.handleSubmit(handleRegister)}
                >
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
                    <FormField
                        control={form.control}
                        name="serviceId"
                        render={({field}) => (
                            <FormItem className='flex items-center gap-2 space-y-1'>
                                <FormLabel > Selecione o serviço </FormLabel>
                                <FormControl>
                                    <Select 
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecionar um serviço"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {clinic.services.map((service) => (
                                                <SelectItem key={service.id} value={service.id}>
                                                    {service.name} - {String(Math.floor(service.duration/60)).padStart(2,'0')}:{String(service.duration % 60).padStart(2,'0')}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    {selectedServiceId && (
                        <div className='space-y-2'>
                            <Label className='font-semibold'>Horários disponíveis: </Label>
                            <div className='bg-gray-100 p-4 rounded-lg'>
                                {loadingSlots ? (
                                    <p>Carregando horários...</p>
                                ) : availableTimeSlots.length === 0 ? (
                                    <p>Nenhum horário disponível</p>
                                ) : (
                                    <ScheduleTimeList 
                                        onSelectTime={(time) => setSelectedTime(time)}
                                        clinicTimes={clinic.times}
                                        availableTimeSlots={availableTimeSlots}
                                        selectedDate={selectedDate}
                                        selectedTime={selectedTime}
                                        blockedTimes={blockedTimes}
                                        requiredSlots={
                                            clinic.services.find(service => service.id === selectedServiceId) ? 
                                            Math.ceil(clinic.services.find(service => service.id === selectedServiceId)!.duration / 30) : 
                                            1
                                        }
                                    />
                                )
                                }
                            </div>
                        </div>
                    )}
                    {clinic.status ? (
                        <Button className='w-full bg-emerald-500 hover:bg-emerald-800'
                        disabled={!form.watch("name") || !form.watch("email") || !form.watch("phone") || !form.watch("date") || !form.watch("serviceId")}
                        >
                            Realizar agendamento
                        </Button>
                    ):(
                        <p className='bg-red-500 text-white text-center px-4 py-2 rounded-md'>A clínica está fechada neste momento</p>
                    )}
                    
                </form>
            </Form>
            </section>
            
        </div>
    );
}
