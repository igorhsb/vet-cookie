import { redirect } from "next/navigation";
import { getInfoSchedule } from "./_data-access/get-schedule-info"
import { ScheduleContent } from "./_components/schedule-content";

export default async function SchedulePage({params}:{params: Promise<{id: string}>}) {
    
    const clinicId = (await params).id;
    const clinic = await getInfoSchedule({ userId: clinicId});

    if (!clinic) {
        redirect("/")
    }
    return (
        <ScheduleContent clinic={clinic}/>
    )
}