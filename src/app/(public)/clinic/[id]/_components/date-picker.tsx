"use client"

import { useState } from "react"
import DatePicker, { registerLocale} from 'react-datepicker'
import { ptBR } from 'date-fns/locale/pt-BR'

interface DatePickerProps {
    minDate?: Date;
    clasName?: string;
    initialDate?: Date;
    onChange: (date: Date) => void;
}

export function DateTimePicker({initialDate, clasName, minDate, onChange} : DatePickerProps) {

    const [startDate, setStartDate] = useState(initialDate || new Date());
    
    function handleChange(date: Date | null){
        if (date) {
            setStartDate(date);
            onChange(date);
        }
    }

    return(
        <DatePicker 
            className={clasName}
            selected={startDate}
            locale={ptBR}
            minDate={minDate ?? new Date()}
            onChange={handleChange}
            dateFormat="dd/MM/yyyy"
        />
    )
}