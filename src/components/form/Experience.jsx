import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { CollapseButtton } from "../ui/CollapseButton";
import { CollapseContainer } from "../ui/CollapseContainer";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ItemsView } from "../ui/ItemsView";

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


function ExperienceInfo({ onToggle, isActive }) {
  const [state, setState] = useState("normal");

  const { experience, dispatchExperience } = useResume()

  const [id, setId] = useState(crypto.randomUUID())

  const [jobTitle, setJobTitle] = useState("")
  const [company, setCompany] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("");


  function resetStates() {
    setState("normal");

    setId(crypto.randomUUID())
    
    setJobTitle("")
    setCompany("")
    setStartDate("")
    setEndDate("")
    setLocation("")
    setDescription("")
  }
  
  function handleOptionClick(id) {
    setId(id)
    setJobTitle(experience.find(item => item.id == id).jobTitle)
    setCompany(experience.find(item => item.id == id).company)
    setStartDate(experience.find(item => item.id == id).startDate)
    setEndDate(experience.find(item => item.id == id).endDate)
    setLocation(experience.find(item => item.id == id).location)
    setDescription(experience.find(item => item.id == id).description)

    setState(id);
  }

  function handleOptionDelete(id) {
    dispatchExperience({type: "REMOVE", payload: { id }})
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const newExperience = { id ,jobTitle, company, startDate, endDate, location, description };
    dispatchExperience({type: "ADD", payload: newExperience})
    resetStates()
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    const newExperience = { id, jobTitle, company, startDate, endDate, location, description };
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
          <ItemsView 
            items={experience}
            dispatchItems={dispatchExperience}
            setState={setState}
            handleOptionClick={handleOptionClick}
            handleOptionDelete={handleOptionDelete}
          />
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