'use client';
import { useState } from 'react';
import { ProfileFormData, useProfileForm } from './profile-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import imgTest from '../../../../../../public/foto1.png';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Prisma } from '../../../../../../generated/prisma';
import { updateProfile } from '../_actions/update-profile';
import { toast } from 'sonner';
import {formatPhone} from '@/utils/formatPhone'

type UserWithSubscription = Prisma.UserGetPayload<{
    include: {
        subscription: true;
    };
}>;

interface ProfileContentProps {
    user: UserWithSubscription;
}

export function ProfileContent({ user }: ProfileContentProps) {
    const form = useProfileForm({
        name: user.name,
        address: user.address,
        phone: user.phone,
        status: user.status,
        timeZone: user.timezone,
    });

    const [selectedHours, setSelectedHours] = useState<string[]>(
        user.times ?? []
    );
    const [diologIsOpen, setDiologIsOpen] = useState<boolean>(false);

    function generateTimeSlots(): string[] {
        const hours: string[] = [];
        for (let i = 8; i <= 23; i++) {
            for (let j = 0; j < 2; j++) {
                const hour = i.toString().padStart(2, '0');
                const minutes = (j * 30).toString().padStart(2, '0');
                hours.push(`${hour}:${minutes}`);
            }
        }
        return hours;
    }

    const hours = generateTimeSlots();

    function toggleHour(hour: string) {
        setSelectedHours((prev) =>
            prev.includes(hour)
                ? prev.filter((h) => h !== hour)
                : [...prev, hour].sort()
        );
    }

    const timeZones = Intl.supportedValuesOf('timeZone').filter((zone) => {
        return (
            zone.startsWith('America/Sao_Paulo') ||
            zone.startsWith('America/Fortaleza') ||
            zone.startsWith('America/Recife') ||
            zone.startsWith('America/Bahia') ||
            zone.startsWith('America/Belem') ||
            zone.startsWith('America/Manaus') ||
            zone.startsWith('America/Cuiaba') ||
            zone.startsWith('America/Boa_Vista')
        );
    });

    async function onSubmit(values: ProfileFormData) {
        const response = await updateProfile({
            name: values.name,
            address: values.address,
            status: values.status === 'active' ? true : false,
            timeZone: values.timeZone,
            times: selectedHours || [],
            phone: values.phone,
        });

        if (response.error) {
            toast.error(response.error);
            return;
        }
        toast(response.data);
    }

    return (
        <div className="mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Minha clínica</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex justify-center">
                                <div className="relative h-40 w-40 rounded-full overflow-hidden bg-gray-200">
                                    <Image
                                        src={user.image ? user.image : imgTest}
                                        alt="Foto da clínica"
                                        fill
                                        className="object-cover"
                                    ></Image>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">
                                                Nome completo
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Digite o nome da clínica"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">
                                                Endereço
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Digite o endereço da clínica"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">
                                                Telefone
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Digite o telefone"
                                                    onChange={(e) => {
                                                        const formattedPhone = formatPhone(e.target.value)
                                                        field.onChange(formattedPhone)
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">
                                                Status da clínica
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={
                                                        field.value
                                                            ? 'active'
                                                            : 'inactive'
                                                    }
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Selecione o status da clínica"></SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent className="w-full">
                                                        <SelectItem value="active">
                                                            Ativo (Clínica
                                                            aberta)
                                                        </SelectItem>
                                                        <SelectItem value="inactive">
                                                            Inativo (Clínica
                                                            fechada)
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="space-y-2">
                                    <Label className="font-semibold">
                                        Configurar horários da clínica
                                    </Label>
                                    <Dialog
                                        open={diologIsOpen}
                                        onOpenChange={setDiologIsOpen}
                                    >
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-between"
                                            >
                                                Clique para selecionar horários
                                                <ArrowRight></ArrowRight>
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Horários da clínica
                                                </DialogTitle>
                                                <DialogDescription>
                                                    Selecione os horários de
                                                    funcionamento da clínica
                                                </DialogDescription>
                                            </DialogHeader>
                                            <section className="py-4">
                                                <p className="mb-2 text-sm text-muted-foreground">
                                                    Clique nos horários abaixo
                                                    para marcar ou desmarcar
                                                </p>
                                                <div className="grid grid-cols-5 gap-2">
                                                    {hours.map((hour) => (
                                                        <Button
                                                            key={hour}
                                                            variant="outline"
                                                            className={cn(
                                                                'h-10',
                                                                selectedHours.includes(
                                                                    hour
                                                                ) &&
                                                                    'border-2 border-emerald-500 text-primary'
                                                            )}
                                                            onClick={() =>
                                                                toggleHour(hour)
                                                            }
                                                        >
                                                            {hour}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </section>
                                            <Button
                                                className="w-full bg-emerald-500 hover:bg-emerald-800"
                                                onClick={() =>
                                                    setDiologIsOpen(false)
                                                }
                                            >
                                                Fechar modal
                                            </Button>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="timeZone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">
                                                Selecione o fuso horário
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Selecione o seu fuso horário"></SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent className="w-full">
                                                        {timeZones.map(
                                                            (zone) => (
                                                                <SelectItem
                                                                    key={zone}
                                                                    value={zone}
                                                                >
                                                                    {zone}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full bg-emerald-500 hover:bg-emerald-800"
                                >
                                    Salvar alterações
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    );
}
