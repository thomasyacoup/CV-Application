import { useState } from "react";
import Option from "./Option";
import { useResume } from "@/context/ResumeContext";
import { CollapseButtton } from "../ui/CollapseButton";
import { CollapseContainer } from "../ui/CollapseContainer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Field, FieldGroup, FieldLabel } from "../ui/field";

function EducationForm({onSubmit, onReset, school, setSchool, location, setLocation, degree, setDegree, startDate, setStartDate, endDate, setEndDate}) {
  return (
    <form onSubmit={onSubmit}>
      <FieldGroup className="grid grid-cols-2 gap-4 p-4">
        <Field>
          <FieldLabel>School</FieldLabel>
          <Input
            required
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel>Location</FieldLabel>
          <Input
            required
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel>Degree</FieldLabel>
          <Input
            required
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel>Start & Graduation Date</FieldLabel>
          <div className="flex gap-2">
            <Input
              required
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              required
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </Field>
      </FieldGroup>
      <div className="flex justify-end gap-4 p-4">
        <Button
          type="button"
          onClick={onReset}
          variant="muted"
        >
          Cancel
        </Button>
        <Button type="submit">
          Save
        </Button>
      </div>
    </form>
  )
}


function EducationInfo({ isActive, onToggle }) {
  const { education, dispatchEducation } = useResume();

  const [school, setSchool] = useState("");
  const [location, setLocation] = useState("");
  const [degree, setDegree] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  const [state, setState] = useState("normal");

  function resetStates() {
    setState("normal")

    setSchool("")
    setLocation("")
    setDegree("")
    setStartDate("")
    setEndDate("")
  }

  function handleOptionClick(index) {
    setSchool(education[index].school);
    setLocation(education[index].location);
    setDegree(education[index].degree);
    setStartDate(education[index].startDate);
    setEndDate(education[index].endDate);
    setState(index);
  }

  function handleOptionDelete(index) {
    dispatchEducation({type: "REMOVE", payload: { index }})
  }

  function handleEducationCreate(e) {
    e.preventDefault();
    const newEducation = { school, location, degree ,startDate, endDate };
    dispatchEducation({type: "ADD", payload: newEducation})
    resetStates()
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    dispatchEducation({type: "UPDATE", payload: { index: state, school, location, degree, startDate, endDate }})
    resetStates()
  }

  return (
    <div>
      <CollapseButtton isActive={isActive} onToggle={onToggle} sectionName={"education"}>
        Education
      </CollapseButtton>
      <CollapseContainer isActive={isActive}>
        {state === "normal" ? (
          <div className="flex flex-col">
            <div className="flex flex-col justify-start">
              {education.map((item, index) => (
                <Option
                  key={index}
                  handleClick={() => handleOptionClick(index)}
                  handleDelete={() => handleOptionDelete(index)}
                  data={item}
                />
              ))}
            </div>
            <div className="p-4">
              <Button onClick={() => setState("new")} className={" float-end"}>
                New
              </Button>
            </div>
          </div>
        ) : state === "new" ? (
          <EducationForm 
            onSubmit={handleEducationCreate}
            onReset={resetStates}
            school={school}
            setSchool={setSchool}
            location={location}
            setLocation={setLocation}
            degree={degree}
            setDegree={setDegree}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        ) : (
          <EducationForm 
            onSubmit={handleEditSubmit}
            onReset={resetStates}
            school={school}
            setSchool={setSchool}
            location={location}
            setLocation={setLocation}
            degree={degree}
            setDegree={setDegree}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        )}
      </CollapseContainer>
    </div>
  );
}

export default EducationInfo;
