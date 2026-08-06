import { useState } from "react";
import { useResume } from "@/context/ResumeContext.jsx";
import { CollapseButtton } from "../ui/CollapseButton";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { CollapseContainer } from "../ui/CollapseContainer";

function PersonalInfo({ onToggle, isActive }) {
  const resumeData = useResume();

  const [name, setName] = useState(resumeData.personalInfo.name);
  const [phone, setPhone] = useState(resumeData.personalInfo.phone);
  const [email, setEmail] = useState(resumeData.personalInfo.email);
  const [github, setGithub] = useState(resumeData.personalInfo.github);
  const [linkedin, setLinkedin] = useState(resumeData.personalInfo.linkedin);

  function handleSubmit(e) {
    e.preventDefault();
    const data = { name, phone, email, github, linkedin };

    resumeData.setPersonalInfo(data);
  }

  return (
    <div>
      <CollapseButtton isActive={isActive} onToggle={onToggle} sectionName="personal">
        Personal Information
      </CollapseButtton>
      <CollapseContainer isActive={isActive}>
        <form onSubmit={handleSubmit}>
          <FieldGroup className={"grid grid-cols-2 gap-4 p-4"}>
            <Field>
              <FieldLabel>
                Full Name 
              </FieldLabel>
                <Input
                  required
                  type="text"
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
            </Field>
            <Field>
            <FieldLabel>Phone Number</FieldLabel>
              <Input
                required
                type="text"
                placeholder="0501234567"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </Field>
            <Field className={"col-span-2"}>
              <FieldLabel>Email</FieldLabel>
              <Input
                required
                type="email"
                placeholder="example@mail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Field>
            <Field className={"col-span-2"}>
              <FieldLabel>Github Url</FieldLabel>
              <Input
                required
                type="url"
                placeholder="https://github.com/username"
                onChange={(e) => setGithub(e.target.value)}
                value={github}
              />
            </Field>
            <Field className={"col-span-2"}>
              <FieldLabel>LinkedIn Url</FieldLabel>
              <Input
                required
                type="url"
                placeholder="https://linkedin.com/in/username"
                onChange={(e) => setLinkedin(e.target.value)}
                value={linkedin}
              />
            </Field>
          </FieldGroup>
          <div className="flex gap-4 justify-end p-4">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </CollapseContainer>
    </div>
  );
}

export default PersonalInfo;
