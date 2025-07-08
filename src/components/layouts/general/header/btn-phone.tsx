import Button from "@/components/button";
import { PhoneIcon } from "@/components/icon"; 
import tailwindConfig from "@root/tailwind.config";
const primaryOrange = tailwindConfig.theme.extend.colors["primary-orange"];

export default function BtnPhone({phone}: {phone: string}) {
   const phoneNumber = `tel:${phone}`

  return (
    <a  href={phoneNumber}>
      <Button className="h-[49px] w-[181px]"  bg={"transparent"} border={"white"} color={"white"}>
     <div className="flex items-center justify-center gap-x-1 px-2">
     <div className="rounded-full bg-white h-[37px] w-[37px] flex justify-center items-center">
        <PhoneIcon color={primaryOrange} />
      </div>
      <div className="flex-col gap-y-0">
        <div className="text-xs font-clan-pro-medium">Central de pedidos</div>
        <div className="font-clan-pro-bold text-base w-[123px] -mt-1">{phone}</div>
      </div>
     </div>
    </Button>
    </a>
  );
}
