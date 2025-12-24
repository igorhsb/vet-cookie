"use client"

import { Button } from "@/components/ui/button";
import { TimeSlot } from "./schedule-content";
import { cn } from "@/lib/utils";
import {isSlotInThePast, isToday} from './schedule-utils'

interface ScheduleTimeListProps {
    selectedDate: Date;
    selectedTime: string;
    requiredSlots: number;
    availableTimeSlots: TimeSlot[];
    clinicTimes: string[];
    blockedTimes: string[];
    onSelectTime: (time: string) => void;
}

export function ScheduleTimeList({
    selectedDate,
    availableTimeSlots,
    blockedTimes,
    clinicTimes,
    requiredSlots,
    selectedTime, 
    onSelectTime
}: ScheduleTimeListProps) {

    const dateIsToday =isToday(selectedDate);


    return(
        <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
            {availableTimeSlots.map((slot) => {

                const slotIsPast = dateIsToday && isSlotInThePast(slot.time)

                return(
                    <Button
                        onClick={() => onSelectTime(slot.time)}
                        type="button"
                        variant="outline"
                        key={slot.time}
                        disabled={slotIsPast}
                        className={cn("h-10 select-none",
                            selectedTime === slot.time && "border-2 border-emerald-500 text-primary"
                    )}
                    >
                        {slot.time}
                    </Button>
                )    
            })}
        </div>
    )
}