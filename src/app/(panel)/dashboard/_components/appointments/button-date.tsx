"use client"
import { ChangeEvent, useState } from "react"
import { format } from 'date-fns'
import { useRouter } from "next/navigation";

export function ButtonPickerApponitment() {

    const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const router = useRouter();


    function handleChangeDate(event: ChangeEvent<HTMLInputElement>) {
        setSelectedDate(event.target.value);
        const url = new URL(window.location.href);
        url.searchParams.set("date", event.target.value);
        router.push(url.toString())
    }

    return (
        <input 
            type="date"
            id="start"
            value={selectedDate}
            onChange={handleChangeDate}
            className="border-2 px-2 py-1 rounded-md text-sm md:text-base"
            />
    )
}