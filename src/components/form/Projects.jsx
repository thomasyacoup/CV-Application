import { useState } from "react";
import Option from "./Option";
import { useResume } from "@/context/ResumeContext";

function ProjectsInfo({ onToggle, isActive }) {
  const { projects, dispatchProjects} = useResume()
  
  const [state, setState] = useState("normal");

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("")
  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("");

  function resetStates() {
    setState("normal")
    
    setTitle("")
    setDate("")
    setUrl("")
    setDescription("")
  }

  function handleOptionClick(index) {
    setTitle(projects[index].title)
    setDate(projects[index].date)
    setUrl(projects[index].url)
    setDescription(projects[index].description)

    setState(index);
  }

  function handleOptionDelete(index) {
    dispatchProjects({type: "REMOVE", payload: { index }})
    resetStates()
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const newProject = { title, date, url, description };
    dispatchProjects({type: "ADD", payload: newProject})
    
    resetStates()
  }

  function handleEditSubmit(e) {
    e.preventDefault();

    dispatchProjects({type: "UPDATE", payload: { index: state ,title, date, url, description }})
    
    resetStates()
  }

  return (
    <div className={isActive ? "active category" : "category"}>
      <button
        className="toggler"
        onClick={() => {
          onToggle(isActive ? "none" : "project");
        }}
      >
        Projects
      </button>
      <div className="toggler-target">
        {state === "normal" ? (
          <>
            <div className="options">
              {projects.map((item, index) => (
                <Option
                  display={item.display || "block"}
                  key={index}
                  handleClick={() => handleOptionClick(index)}
                  handleDelete={() => handleOptionDelete(index)}
                  data={item}
                />
              ))}
            </div>
            <div className="btns-flex">
              <button onClick={() => setState("new")} className="save-btn">
                New
              </button>
            </div>
          </>
        ) : state === "new" ? (
          <form onSubmit={handleFormSubmit}>
            <div className="form-flex">
              <label>
                Title
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                Date
                <input
                  required
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <label>
                Url
                <input
                  required
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </label>
              <label>
                Description
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </label>
            </div>
            <div className="btns-flex">
              <button
                type="button"
                onClick={() => {resetStates()}}
                className="save-btn"
              >
                Cancel
              </button>
              <input type="submit" value="Add" className="save-btn" />
            </div>
          </form>
        ) : (
          <form onSubmit={handleEditSubmit}>
            <div className="form-flex">
              <label>
                Title
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                Date
                <input
                  required
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <label>
                Url
                <input
                  required
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </label>
              <label>
                Description
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </label>
            </div>
            <div className="btns-flex">
              <button
                className="save-btn"
                type="button"
                onClick={() => {resetStates()}}
              >
                Cancel
              </button>
              <input type="submit" value="Save" className="save-btn" />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProjectsInfo;
