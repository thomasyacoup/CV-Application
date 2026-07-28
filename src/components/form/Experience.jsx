import { useState } from "react";
import Option from "./Option";
import { useResume } from "@/context/ResumeContext";
import { CollapseButtton } from "../ui/CollapseButton";
import { CollapseContainer } from "../ui/CollapseContainer";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

function ExperienceForm({onSubmit, onReset, jobTitle, setJobTitle, company, setCompany, startDate, setStartDate, endDate, setEndDate, location, setLocation,description, setDescription}) {
  return (
    <form onSubmit={onSubmit}>
      <FieldGroup className="grid grid-cols-2 gap-4 p-4">
        <Field>
          <FieldLabel>Job Title</FieldLabel>
          <Input
            required
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel>Company</FieldLabel>
          <Input
            required
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel>Start & End Date</FieldLabel>
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
        <Field>
          <FieldLabel>Location</FieldLabel>
          <Input
            required
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Field>
        <Field className="col-span-2">
          <FieldLabel>Description</FieldLabel>
          <Textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Textarea>
        </Field>
      </FieldGroup>
      <div className="btns-flex">
        <Button
          type="button"
          onClick={onReset}
          variant="muted"
        >
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}


function ExperienceInfo({ onToggle, isActive }) {
  const [state, setState] = useState("normal");

  const { experience, dispatchExperience } = useResume()

  const [jobTitle, setJobTitle] = useState("")
  const [company, setCompany] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("");


  function resetStates() {
    setState("normal");
    
    setJobTitle("")
    setCompany("")
    setStartDate("")
    setEndDate("")
    setLocation("")
    setDescription("")
  }
  
  function handleOptionClick(index) {
    setJobTitle(experience[index].jobTitle)
    setCompany(experience[index].company)
    setStartDate(experience[index].startDate)
    setEndDate(experience[index].endDate)
    setLocation(experience[index].location)
    setDescription(experience[index].description)

    setState(index);
  }

  function handleOptionDelete(index) {
    dispatchExperience({type: "REMOVE", payload: { index }})
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const newExperience = { jobTitle, company, startDate, endDate, location, description };
    dispatchExperience({type: "ADD", payload: newExperience})
    resetStates()
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    const newExperience = { index: state, jobTitle, company, startDate, endDate, location, description };
    dispatchExperience({type: "UPDATE", payload: newExperience})
    resetStates()
  }

  return (
    <div>
      <CollapseButtton isActive={isActive} onToggle={onToggle} sectionName={"experience"}>
        Experiences
      </CollapseButtton>
      <CollapseContainer isActive={isActive}>
        {state === "normal" ? (
          <div className="flex flex-col">
            <div>
              {experience.map((item, index) => (
                <Option
                  display={item.display || "block"}
                  key={index}
                  handleClick={() => handleOptionClick(index)}
                  handleDelete={() => handleOptionDelete(index)}
                  data={item}
                />
              ))}
            </div>
            <div className="p-4">
              <Button onClick={() => setState("new")} className="float-right">
                New
              </Button>
            </div>
          </div>
        ) : state === "new" ? (
          <ExperienceForm 
            onSubmit={handleFormSubmit}
            onReset={resetStates}
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            company={company}
            setCompany={setCompany}
            location={location}
            setLocation={setLocation}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            description={description}
            setDescription={setDescription}
          />
        ) : (
          <ExperienceForm 
            onSubmit={handleEditSubmit}
            onReset={resetStates}
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            company={company}
            setCompany={setCompany}
            location={location}
            setLocation={setLocation}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            description={description}
            setDescription={setDescription}
          />
        )}     
      </CollapseContainer>
    </div>
  );
}

export default ExperienceInfo;