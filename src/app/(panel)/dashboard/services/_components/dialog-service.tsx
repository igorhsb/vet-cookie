'use client';

import { DialogHeader } from '@/components/ui/dialog';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { useDiologServiceForm, DialogServiceFormData } from './dialog-service-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {convertRealToCents} from '@/utils/convertCurrency'
import { createNewService } from '../_actions/create-service';
import { updateService } from '../_actions/update-service';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DialogServiceProps {
    closeModal: () => void;
    serviceId?: string;
    initialValues?: {
        name: string,
        price: string,
        hours: string
        minutes: string
    }
}

export function DialogService({closeModal, initialValues, serviceId}: DialogServiceProps) {
    const form = useDiologServiceForm({initialValues: initialValues});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function onSubmit(values:DialogServiceFormData) {
        setLoading(true);
        const priceInCents = convertRealToCents(values.price)
        const hours = parseInt(values.hours) || 0;
        const minutes = parseInt(values.minutes) || 0;
        const duration = (hours*60) + minutes;

        if (serviceId) {
            await editServiceById({
                serviceId: serviceId,
                name: values.name,
                priceInCents: priceInCents,
                duration: duration
            });

            return;
        } 

        const response = await createNewService({
            name: values.name,
            price: priceInCents,
            duration: duration
        })

        setLoading(false);
        if (response.error) {
            toast.error(response.error);  
            return;
        }

        toast.success("Serviço cadastrado com sucesso!");
        handleCloseModal();
        router.refresh();
    }

    async function editServiceById({serviceId, name, priceInCents, duration} : {serviceId: string, name: string, priceInCents: number, duration: number}) {
        const response = await updateService({
            serviceId: serviceId,
            name: name,
            price: priceInCents,
            duration: duration
        })
        
        setLoading(false);
        if (response.error) {
            toast.error(response.error);  
            return;
        }

        toast.success("Serviço atualizado com sucesso!");
        handleCloseModal();
        router.refresh();
    }

    function handleCloseModal() {
        form.reset();
        closeModal();
    }

    function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
        let {value} = event.target;
        value = value.replace(/\D/g, '');

        if(value) {
            value = (parseInt(value,10) / 100).toFixed(2);
            value = value.replace('.',',');
            value= value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        }

        event.target.value = value;
        form.setValue("price", value)
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Novo serviço</DialogTitle>
                <DialogDescription>Adicione um novo serviço</DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2">
                    <div className="flex flex-col">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">
                                        Nome do serviço:
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Digite o nome do serviço"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">
                                        Valor do serviço:
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Digite o valor do serviço"
                                            onChange={changeCurrency}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <p className="font-semibold">Tempo de duração do serviço</p>
                    <div className="grid grid-cols-2 gap-3">
                        <FormField
                            control={form.control}
                            name="hours"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">
                                        Horas:
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="1"
                                            min="0"
                                            type="number"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="minutes"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">
                                        Minutos:
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="0"
                                            min="0"
                                            type="number"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full font-semibold text-white"
                        disabled={loading}
                    >
                        {loading ? "Carregando..." : `${serviceId ? "Atualizar serviço" : "Criar serviço"}`}
                    </Button>
                </form>
            </Form>
        </>
    );
}
