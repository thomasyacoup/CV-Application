import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { CollapseButtton } from "../ui/CollapseButton";
import { CollapseContainer } from "../ui/CollapseContainer";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ItemsView } from "../ui/ItemsView";
import { Checkbox } from "../ui/checkbox";

function ExperienceForm({onSubmit, onReset, jobTitle, setJobTitle, company, setCompany, startDate, setStartDate, endDate, setEndDate, location, setLocation,description, setDescription, isCurrent, setIsCurrent}) {
  return (
    <form onSubmit={onSubmit}>
      <FieldGroup className="grid grid-cols-2 gap-4 p-4">
        <Field>
          <FieldLabel>Job Title</FieldLabel>
          <Input
            required
            type="text"
            placeholder="Software Engineer"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel>Company</FieldLabel>
          <Input
            required
            type="text"
            placeholder="Example Ltd."
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </Field>
        <Field className={"grid gap-2 grid-cols-2"}>
          <div className="flex flex-col gap-2 justify-between h-full">
            <FieldLabel>Start & End Date</FieldLabel>
            <Input
              required
              type="month"
              placeholder="Start"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 h-full justify-between">
            <div className="flex gap-2 items-center">
              <Checkbox
                
                checked={isCurrent}
                onCheckedChange={() => {
                  setIsCurrent(!isCurrent);
                  setEndDate(!isCurrent ? "Present" : "");
                }}
              />
              <FieldLabel className={"text-muted-foreground"}>Still Working</FieldLabel>
            </div>
            <Input
              required={!isCurrent}
              type={isCurrent ? "text" : "month"}
              value={isCurrent ? "Present" : endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={isCurrent}
              placeholder={isCurrent ? "Present" : "YYYY-MM"}
            />
          </div>
        </Field>
        <Field>
          <FieldLabel>Location</FieldLabel>
          <Input
            required
            type="text"
            placeholder="City, Country"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Field>
        <Field className="col-span-2">
          <FieldLabel>Description</FieldLabel>
          <Textarea
            required
            placeholder="Describe your role and achievements"
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
  const [isCurrent, setIsCurrent] = useState(false)
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("");


  function resetStates() {
    setState("normal");

    setId(crypto.randomUUID())
    
    setJobTitle("")
    setCompany("")
    setStartDate("")
    setEndDate("")
    setIsCurrent(false)
    setLocation("")
    setDescription("")
  }
  
  function handleOptionClick(id) {
    setId(id)
    const selectedExperience = experience.find(item => item.id == id)

    setJobTitle(selectedExperience.jobTitle)
    setCompany(selectedExperience.company)
    setStartDate(selectedExperience.startDate)
    setEndDate(selectedExperience.endDate)
    setIsCurrent(selectedExperience.endDate === "Present")
    setLocation(selectedExperience.location)
    setDescription(selectedExperience.description)

    setState(id);
  }

  function handleOptionDelete(id) {
    dispatchExperience({type: "REMOVE", payload: { id }})
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const finalEndDate = isCurrent ? "Present" : endDate;
    const newExperience = { id ,jobTitle, company, startDate, endDate: finalEndDate, location, description };
    dispatchExperience({type: "ADD", payload: newExperience})
    resetStates()
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    const finalEndDate = isCurrent ? "Present" : endDate;
    const newExperience = { id, jobTitle, company, startDate, endDate: finalEndDate, location, description };
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
            isCurrent={isCurrent}
            setIsCurrent={setIsCurrent}
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
            isCurrent={isCurrent}
            setIsCurrent={setIsCurrent}
          />
        )}     
      </CollapseContainer>
    </div>
  );
}

export default ExperienceInfo;