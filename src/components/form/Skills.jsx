import { useState } from "react";
import Option from "./Option";
import { useResume } from "@/context/ResumeContext";
import { DescriptionEditor } from "../ui/TextEditor";

function SkillsInfo({ onToggle, isActive }) {
  const { skills, setSkills } = useResume()

  const [text, setText] = useState(skills)

  function handleFormSubmit(e) {
    e.preventDefault();
    setSkills(text)
  }

  return (
    <div className={isActive ? "active category" : "category"}>
      <button
        className="toggler"
        onClick={() => {
          if (isActive) {
            onToggle("none");
          } else {
            onToggle("skills");
          }
        }}
      >
        Skills
      </button>
      <div className="toggler-target">
        <form onSubmit={handleFormSubmit}>
            <div className="form-flex">
              <label>
                Skills
                <DescriptionEditor value={text} onChange={setText} />
              </label>
            </div>
            <div className="btns-flex">
              <input type="submit" value="add" className="save-btn" />
            </div>
          </form>
      </div>
    </div>
  );
}

export default SkillsInfo;
