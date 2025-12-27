"use server"

import { getReminders } from "../../_data-access/get-reminders"
import { RemindersList } from "./reminders-list";

export async function Reminders({userId} : {userId: string}) {

    const reminders = await getReminders({userId: userId});

    return (
        <RemindersList 
            reminder={reminders}
        />
    )
}