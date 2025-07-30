'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { LogIn, Menu } from 'lucide-react';
import React from 'react';
import {useSession} from 'next-auth/react'
import {handleRegister} from '../_actions/login'

export function Header() {
    const {data: session, status} = useSession();
    const [isOpen, setIsOpen] = useState(false);

    console.log(session)
    console.log(status)
    const navItems = [
        { href: '#professionals', label: 'Profissionais' },
        { href: '#services', label: 'Serviços' },
    ];
    
    async function handleLogin(){
        await handleRegister("github");
    }

    const NavLinks = () => (
        <>
            {navItems.map((item) => (
                <Button
                    onClick={() => setIsOpen(false)}
                    key={item.href}
                    asChild
                    className="bg-transparent hover:bg-transparent text-black shadow-none text-base"
                >
                    <Link href={item.href}>{item.label}</Link>
                </Button>
            ))}
            {status === 'loading' ? (
                <></>
            ) : session ? (
                <Link href="/dashboard" className='flex items-center justify-center gap-2 hover:bg-zinc-600 text-black shadow-none text-base font-bold bg-zinc-900 text-white py-1 rounded-md px-4'>Painel da clinica</Link>
            ) : (
                <Button onClick={handleLogin}>
                    <LogIn /> Login
                </Button>
            )}
        </>
    );

    return (
        <header className="fixed top-0 right-0 left-0 z-[999] py-4 px-6 bg-white">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/" className="text-3xl font-bold text-zinc-900">
                    Vet<span className="text-emerald-500">Cookie</span>
                </Link>

                <nav className="hidden md:flex items-center">
                    <NavLinks />
                </nav>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button
                            className="text-black hover:bg-transparent"
                            variant="ghost"
                            size="icon"
                        >
                            <Menu className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="flex flex-col items-center w-[240px] sm:w-[300px] z-[9999]"
                    >
                        <SheetTitle className="font-bold text-2xl">
                            Menu
                        </SheetTitle>
                        <SheetHeader></SheetHeader>

                        <nav className="flex flex-col space-y-4 mt-6">
                            <NavLinks />
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
