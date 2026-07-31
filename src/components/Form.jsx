import PersonalInfo from "./form/Personal";
import EducationInfo from "./form/Education";
import "../styles/Form.css";
import { useState } from "react";
import SkillsInfo from "./form/Skills";
import ProjectsInfo from "./form/Projects";
import ExperienceInfo from "./form/Experience";
import { Button } from "./ui/button";

function Forms() {
  const [toggle, setToggle] = useState("None");


  return (
    <div className="form h-full flex-1 overflow-y-scroll border border-border rounded-md bg-white scrollbar-none">
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
    </div>
  );
}

export default Forms;
