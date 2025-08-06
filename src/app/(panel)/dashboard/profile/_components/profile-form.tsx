import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from "zod"

interface UserProfileFormProps{
    name : string | null;
    address : string | null;
    phone : string | null;
    status : boolean | null;
    timeZone : string | null;
}

const profileSchema = z.object({
  name: z.string().min(2,{message : "O nome é obrigatório"}).max(50),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.string(),
  timeZone: z.string().min(1, {message: "O time zone é obrigatório"}),
})

export type ProfileFormData = z.infer<typeof profileSchema>;

export function useProfileForm({name,address,phone,status,timeZone} : UserProfileFormProps){
    return useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues:{
            name: name || "",
            address: address || "",
            phone: phone || "",
            status: status ? "active" : "inactive",
            timeZone: timeZone || "",
        }
    })
}