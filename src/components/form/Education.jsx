import { useState } from "react";
import Option from "./Option";
import { useResume } from "@/context/ResumeContext";

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
    <div className={isActive ? "active category" : "category"}>
      <button
        className="toggler"
        onClick={() => {
          isActive ? onToggle("none") : onToggle("education");
        }}
      >
        Education
      </button>
      <div className="toggler-target">
        {state === "normal" ? (
          <>
            <div className="options">
              {education.map((item, index) => (
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
          <form onSubmit={handleEducationCreate}>
            <div className="form-flex">
              <label htmlFor="">
                School
                <input
                  required
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                />
              </label>
              <label htmlFor="">
                Location
                <input
                  required
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </label>
              <label htmlFor="">
                Degree
                <input
                  required
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
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
                Graduation Date
                <input
                  required
                  type="text"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
            </div>
            <div className="btns-flex">
              <button
                type="button"
                onClick={() => resetStates()}
                className="save-btn"
              >
                Cansle
              </button>
              <input type="submit" value="add" className="save-btn" />
            </div>
          </form>
        ) : (
          <form onSubmit={handleEditSubmit}>
            <div className="form-flex">
              <label htmlFor="">
                School
                <input
                  required
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                />
              </label>
              <label htmlFor="">
                Location
                <input
                  required
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </label>
              <label htmlFor="">
                Degree
                <input
                  required
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
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
                Graduation Date
                <input
                  required
                  type="text"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
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

export default EducationInfo;
