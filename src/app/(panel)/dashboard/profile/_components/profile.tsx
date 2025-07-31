'use client';

import { useProfileForm } from './profile-form';
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

export function ProfileContent() {
    const form = useProfileForm();

    return (
        <div className="mx-auto">
            <Form {...form}>
                <form>
                    <Card>
                        <CardHeader>
                            <CardTitle>Minha clínica</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex justify-center">
                                <div className="relative h-40 w-40 rounded-full overflow-hidden bg-gray-200">
                                    <Image
                                        src={imgTest}
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
                                                    <SelectTrigger className='w-full'>
                                                        <SelectValue placeholder="Selecione o status da clínica"></SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent className='w-full'>
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
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className='w-full justify-between'>
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
                                                    Selecione os horários de funcionamento da clínica
                                                </DialogDescription>
                                            </DialogHeader>
                                            <section className='py-4'>
                                                <p className='text-sm text-muted-foreground'>
                                                    Clique nos horários abaixo para marcar ou desmarcar
                                                </p>
                                            </section>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    );
}
