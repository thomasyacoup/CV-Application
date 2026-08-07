import { ArrowDownFromLine, File } from "lucide-react";
import { Button } from "./ui/button";
import { GitHubIcon } from "./ui/GithubIcon";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Header() {
  const fadeDown = {
    hidden: { opacity: 0, y: -24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };
  
  return (
    <motion.header 
      variants={fadeDown}
      className="h-12 col-span-2 bg-white rounded flex items-center justify-between p-2 print:hidden"
    >
      <Link to="/home" className="flex items-center">
        <File className="text-primary size-8"/>
        <h3 className="font-bold leading-none">
          Free<br />
          <span className="text-primary">Resume</span>
        </h3>
      </Link>
      <div className="flex gap-2 items-center">
        <a href="https://github.com/thomasyacoup/CV-Application">
          <GitHubIcon className="size-8 fill-gray-700 hover:fill-black transition delay-50" />  
        </a>
        <Button
          className="rounded"
          size="icon"
          onClick={() => window.print()}
        >
          <ArrowDownFromLine />
        </Button>
      </div>
    </motion.header>
  )
}