import { useState } from "react";
import { useResume } from "@/context/ResumeContext.jsx";

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
    <div className={isActive ? "active category" : "category"}>
      <button
        className="toggler"
        onClick={() => {
          if (isActive) {
            onToggle("none");
          } else {
            onToggle("personal");
          }
        }}
      >
        Personal Info
      </button>
      <form onSubmit={handleSubmit} className="toggler-target">
        <div className="form-flex">
          <label>
            Full Name
            <input
              required
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
          <label htmlFor="">
            Phone
            <input
              required
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </label>
          <label>
            Email
            <input
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label>
            Github Url
            <input
              required
              type="url"
              onChange={(e) => setGithub(e.target.value)}
              value={github}
            />
          </label>
          <label>
            LinkedIn Url
            <input
              required
              type="url"
              onChange={(e) => setLinkedin(e.target.value)}
              value={linkedin}
            />
          </label>
        </div>
        <div className="btns-flex">
          <input type="submit" value="save" className="save-btn" />
        </div>
      </form>
    </div>
  );
}

export default PersonalInfo;
