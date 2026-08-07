import Forms from "../components/Form";
import { Resume } from "../components/Resume";
import { Header } from "@/components/Header";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

function App() {
  return (
    <motion.main
      initial="hidden"
      animate="show"
      variants={container}
      className="grid grid-cols-2 overflow-hidden h-dvh relative print:h-[297mm]! print:block! print:static! p-2 gap-2 bg-[#dddddd] print:p-0"
    >
      <Header />
      <Forms />
      <Resume />
    </motion.main>
  );
}

export default App;