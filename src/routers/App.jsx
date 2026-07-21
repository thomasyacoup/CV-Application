import { useState } from "react";
import "../App.css";
import MyDocument from "../components/Cv";
import Forms from "../components/Form";

function App() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Thomas Yacoub",
    phoneNumber: "010945",
    email: "thomas@gmail.com",
    gitHubUrl: "https://github.com",
  });

  const [education, setEducation] = useState([
    {
      university: "auc",
      field: "computer scince degree",
      degree: "Certificate",
      date: "May 2023",
    },
  ]);

  const [experience, setExperience] = useState([
    {
      experience: "Frontend Developer Internship",
      description: "Built responsive UI using React and CSS",
    },
  ]);

  const [skills, setSkills] = useState([
    {
      category: "Languages & Dev Tools",
      skills: "js html css",
    },
  ]);

  const [project, setProject] = useState([
    {
      project: "My Portfolio",
      description: "HTML, CSS, responsive design, and animations",
    },
  ]);

  return (
    <>
      <nav>
        <span>By: Thomas Yacoub</span>
        <span>
          <a href="#">Github</a>
        </span>
      </nav>
      <main>
        <Forms
          personalFormHandler={setPersonalInfo}
          educationFormHandler={setEducation}
          experienceFormHandler={setExperience}
          skillsFormHandler={setSkills}
          projectFormHandler={setProject}
        />
        <div className="panel">
          <MyDocument
            project={project}
            skills={skills}
            personalInfo={personalInfo}
            education={education}
            experience={experience}
          />
        </div>
      </main>
    </>
  );
}

export default App;
