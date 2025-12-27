"use server"

import { getClinicTimes } from "../../_data-access/get-clinic-times"
import { AppointmentsList } from "./appointments-list";

export async function Appointments({userId} : {userId: string}) {

    const user = await getClinicTimes({userId: userId});

    return (
        <AppointmentsList times={user.times}/>
    )
}