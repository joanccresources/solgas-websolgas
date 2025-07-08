import { BlackLogo, MiniLogo } from "@/components";

export const LogoLoading = ()=> {
  return (
    <>
    <div className="p-3 animate-spin drop-shadow-2xl bg-linear-to-bl from-primary-blue via-primary-orange to-primary-blue-light md:w-80 md:h-80 h-48 w-48 aspect-square rounded-full">
        <div className="rounded-full h-full w-full bg-slate-100 background-blur-md"></div>
      </div>
      <div className="absolute">
        <div className="lg:block hidden ">
          <BlackLogo height={"60"} width={"250"} />
        </div>
        <div className="lg:hidden block">
          <MiniLogo height={"90"} width={"120"} />
        </div>
      </div>
    </>
  )
}

export default function LoadingLayout() {
  return (
    <div className="fixed left-0 top-0 bg-blur h-screen w-screen flex justify-center items-center bg-black/30 backdrop-blur-md z-100">
      <LogoLoading />
    </div>
  );
}
