import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
// import cvImage from "@/assets/cv-image.png"

export function Home() {
  return (
    <div className="h-dvh flex flex-col p-3 gap-3">
      <nav className="flex justify-between">
        <div className="flex gap-1 items-center">
          <File className="text-primary size-8" />
          <p className="font-bold line-ig leading-none">
            Free<br /><span className="text-primary">Resume</span>
          </p>
        </div>
        <Button variant="link">ThomasYacoub</Button>
      </nav>
      <div className="overflow-hidden relative flex flex-col justify-center items-center gap-12 flex-1 bg-gray-300 border-border rounded-md bg-[radial-gradient(#e5e7eb_2px,transparent_1px)] bg-size-[32px_32px] ">
        <div className="p-2 bg-primary rounded-lg drop-shadow-[20px_20px_20px]">
          <File className="text-primary-foreground size-16" />
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-7xl font-extrabold text-center">Make Your Resume <br /> <span className="text-primary">For Free</span></h1>
          <p className="text-center opacity-50 font-bold">No subscriptions, no trials, no hidden fees — just free.</p>
        </div>
        <Button size="lg"> <Link to="/app">Create Now</Link> </Button>
        {/* <img src={cvImage} className="absolute w-3xs rotate-30 -left-40 top-10 shadow-[10px_50px_80px]" /> */}
      </div>
    </div>
  )
}