import PersonalInfo from "./form/Personal";
import EducationInfo from "./form/Education";
import { useState } from "react";
import SkillsInfo from "./form/Skills";
import ProjectsInfo from "./form/Projects";
import ExperienceInfo from "./form/Experience";
import { motion } from "motion/react";

function Forms() {
  const [toggle, setToggle] = useState("None");

  const fadeFromLeft = {
    hidden: { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div 
      variants={fadeFromLeft} 
      className="form h-full flex-1 overflow-y-scroll border border-border rounded-md bg-white scrollbar-none"
    >
      <PersonalInfo
        isActive={toggle === "personal"}
        onToggle={setToggle}
      />
      <hr />
      <EducationInfo
        isActive={toggle === "education"}
        onToggle={setToggle}
      />
      <hr />
      <ExperienceInfo
        isActive={toggle === "experience"}
        onToggle={setToggle}
      />
      <hr />
      <ProjectsInfo
        isActive={toggle === "project"}
        onToggle={setToggle}
      />
      <hr />
      <SkillsInfo
        isActive={toggle === "skills"}
        onToggle={setToggle}
      />
      <hr />
    </motion.div>
  );
}

export default Forms;
