import { useState } from "react";
import Option from "./Option";
import { useResume } from "@/context/ResumeContext";
import { DescriptionEditor } from "../ui/DescriptionEditor";
import { CollapseButtton } from "../ui/CollapseButton";
import { CollapseContainer } from "../ui/CollapseContainer";
import { Field, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";

function SkillsInfo({ onToggle, isActive }) {
  const { skills, setSkills } = useResume()

  const [text, setText] = useState(skills)

  function handleFormSubmit(e) {
    e.preventDefault();
    setSkills(text)
  }

  return (
    <div>
      <CollapseButtton isActive={isActive} onToggle={onToggle} sectionName={"skills"}>
        Skills
      </CollapseButtton>
      <CollapseContainer isActive={isActive}>
        <form onSubmit={handleFormSubmit}>
            <Field className="p-4">
                <FieldLabel>Description</FieldLabel>
                <DescriptionEditor className="min-h-200" value={text} onChange={setText} />
            </Field>
            <div className="p-4 flex justify-end items-center">
              <Button type="submit">Save</Button>
            </div>
          </form>
      </CollapseContainer>
    </div>
  );
}

export default SkillsInfo;
