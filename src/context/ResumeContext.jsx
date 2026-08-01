import { publicReducer } from "@/reducers/educationReducer";
import { createContext, useContext, useReducer, useState } from "react";

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [personalInfo, setPersonalInfo] = useState({
      name: "Sarah Ahmed",
      email: "sarah.ahmed.dev@gmail.com",
      phone: "010-1234-5678",
      github: "https://github.com/sarahahmed",
      linkedin: "https://linkedin.com/in/sarah-ahmed-dev",
    })

  const [education, dispatchEducation] = useReducer(publicReducer, [
    {
      id: crypto.randomUUID(),
      school: "Cairo University",
      location: "Cairo, Egypt",
      degree: "Bachelor of Computer Science",
      startDate: "May 2016",
      endDate: "Aug 2020",
    },
  ])

  const [experience, dispatchExperience] = useReducer(publicReducer, [
    {
      id: crypto.randomUUID(),
      jobTitle: "Senior Frontend Developer",
      company: "Vezeeta",
      location: "Cairo, Egypt",
      startDate: "2022",
      endDate: "Present",
      description:
      `Led migration of legacy codebase to React and TypeScript
      Improved page load performance by 40% through code splitting and lazy loading
      Mentored a team of 3 junior developers and conducted code reviews`
    },
    {
      id: crypto.randomUUID(),
      jobTitle: "Frontend Developer",
      company: "Swvl",
      location: "Cairo, Egypt",
      startDate: "2020",
      endDate: "2022",
      description:
      `Built and maintained customer-facing booking dashboard using Vue.js
      Collaborated with backend team to design REST API contracts
      Implemented automated testing that reduced production bugs by 25%`
    },
    {
      id: crypto.randomUUID(),
      jobTitle: "Software Engineering Intern",
      company: "Instabug",
      location: "Cairo, Egypt",
      startDate: "2019",
      endDate: "2020",
      description:
      `Assisted in developing internal tooling for bug tracking system
      Wrote unit tests to improve code coverage
      Participated in daily standups and sprint planning`
    }
  ])

  const [projects, dispatchProjects] = useReducer(publicReducer, [
    {
      id: crypto.randomUUID(),
      title: "TaskFlow",
      technologies: "React, Node.js, Express, MongoDB",
      date: "2023",
      description:
      `Developed a full-stack task management platform for small teams
      Implemented a dynamic dashboard for visualizing project timelines
      Collaborated with a small team to deliver features under tight deadlines`,
      url: "https://github.com/sarahahmed/taskflow"
    },
    {
      id: crypto.randomUUID(),
      title: "ExpenseTracker",
      technologies: "Vue.js, Firebase, Tailwind CSS, REST API",
      date: "2022",
      description:
      `Built a personal finance tracking app with budget alerts
      Integrated real-time data sync using Firebase for seamless updates
      Designed a responsive UI focused on clarity and ease of use`,
      url: "https://github.com/sarahahmed/expense-tracker"
    }
  ])

  const [skills, setSkills] = useState("JavaScript, TypeScript, React, Node.js, HTML5, CSS3, Tailwind CSS, Git, MongoDB, REST APIs")
  const value = { 
    personalInfo,
    setPersonalInfo,
    education,
    dispatchEducation,
    experience, 
    dispatchExperience,
    projects,
    dispatchProjects,
    skills,
    setSkills
  }
  
  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ResumeProvider');
  }
  return context;
}