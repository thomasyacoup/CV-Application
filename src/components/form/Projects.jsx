import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { CollapseButtton } from "../ui/CollapseButton";
import { CollapseContainer } from "../ui/CollapseContainer";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ItemsView } from "../ui/ItemsView";

function ProjectsForm({onSubmit, onReset, title, setTitle, date, setDate, url, setUrl, technologies, setTechnologies, description, setDescription}) {
  return (
    <form onSubmit={onSubmit}>
      <FieldGroup className="grid grid-cols-2 gap-4 p-4">
        <Field>
          <FieldLabel>Title</FieldLabel>
          <Input
            required
            type="text"
            placeholder="Project Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel>Date</FieldLabel>
          <Input
            required
            type="month"
            placeholder="YYYY-MM"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel>Project Url</FieldLabel>
          <Input
            required
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel>Technologies</FieldLabel>
          <Input
            required
            type="text"
            placeholder="React, Tailwind, Node"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
          />
        </Field>
        <Field className={"col-span-2"}>
          <FieldLabel>Description</FieldLabel>
          <Textarea
            required
            placeholder="Brief project summary"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Textarea>
        </Field>
      </FieldGroup>
      <div className="flex gap-4 p-4 justify-end">
        <Button
          variant="muted"
          type="button"
          onClick={onReset}
        >
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}

function ProjectsInfo({ onToggle, isActive }) {
  const { projects, dispatchProjects} = useResume()
  
  const [state, setState] = useState("normal");

  const [id, setId] = useState(crypto.randomUUID())

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("")
  const [url, setUrl] = useState("")
  const [technologies, setTechnologies] = useState("")
  const [description, setDescription] = useState("");

  function resetStates() {
    setState("normal")

    setId(crypto.randomUUID())
    
    setTitle("")
    setDate("")
    setUrl("")
    setTechnologies("")
    setDescription("")
  }

  function handleOptionClick(id) {
    setId(id)
    
    setTitle(projects.find(item => item.id == id).title)
    setDate(projects.find(item => item.id == id).date)
    setUrl(projects.find(item => item.id == id).url)
    setTechnologies(projects.find(item => item.id == id).technologies)
    setDescription(projects.find(item => item.id == id).description)

    setState(id);
  }

  function handleOptionDelete(id) {
    dispatchProjects({type: "REMOVE", payload: { id }})
    resetStates()
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const newProject = { id, title, date, url, technologies, description };
    dispatchProjects({type: "ADD", payload: newProject})
    
    resetStates()
  }

  function handleEditSubmit(e) {
    e.preventDefault();

    dispatchProjects({type: "UPDATE", payload: { id, title, date, url, technologies, description }})
    
    resetStates()
  }

  return (
    <div className={isActive ? "active category" : "category"}>
      <CollapseButtton isActive={isActive} onToggle={onToggle} sectionName={"project"}>
        Projects
      </CollapseButtton>
      <CollapseContainer isActive={isActive}>
        {state === "normal" ? (
          <ItemsView 
            items={projects}
            dispatchItems={dispatchProjects}
            handleOptionClick={handleOptionClick}
            handleOptionDelete={handleOptionDelete}
            setState={setState}
          />
        ) : state === "new" ? (
          <ProjectsForm 
            onSubmit={handleFormSubmit}
            onReset={resetStates}
            title={title}
            setTitle={setTitle}
            technologies={technologies}
            setTechnologies={setTechnologies}
            date={date}
            setDate={setDate}
            description={description}
            setDescription={setDescription}
            url={url}
            setUrl={setUrl}
          />
        ) : (
          <ProjectsForm 
            onSubmit={handleEditSubmit}
            onReset={resetStates}
            title={title}
            setTitle={setTitle}
            technologies={technologies}
            setTechnologies={setTechnologies}
            date={date}
            setDate={setDate}
            description={description}
            setDescription={setDescription}
            url={url}
            setUrl={setUrl}
          />
        )}
      </CollapseContainer>
    </div>
  );
}

export default ProjectsInfo;