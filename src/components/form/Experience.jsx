import { useState } from "react";
import Option from "./Option";
import { useResume } from "@/context/ResumeContext";

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
    <div className={isActive ? "active category" : "category"}>
      <button
        className="toggler"
        onClick={() => onToggle(isActive ? "none" : "experience")}
      >
        Experience
      </button>
      <div className="toggler-target">
        {state === "normal" ? (
          <>
            <div className="options">
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
                Job Title
                <input
                  required
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </label>
              <label>
                Company
                <input
                  required
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </label>
              <label>
                Start Date
                <input
                  required
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>
              <label>
                End Date
                <input
                  required
                  type="text"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
              <label>
                Location
                <input
                  required
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
                Job Title
                <input
                  required
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </label>
              <label>
                Company
                <input
                  required
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </label>
              <label>
                Start Date
                <input
                  required
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>
              <label>
                End Date
                <input
                  required
                  type="text"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
              <label>
                Location
                <input
                  required
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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

export default ExperienceInfo;