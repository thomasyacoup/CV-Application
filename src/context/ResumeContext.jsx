import { publicReducer } from "@/reducers/educationReducer";
import { createContext, useContext, useReducer, useState } from "react";

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [personalInfo, setPersonalInfo] = useState({
    name: "James McGill",
    email: "saulgoodman@better-call-saul.com", 
    phone: "505-842-5662",
    github: "https://github.com/jamesmcgill", 
    linkedin: "https://www.linkedin.com/in/saul-goodman-254762276/",
  })

  const [education, dispatchEducation] = useReducer(publicReducer , [
    {
      school: "Albuquerque community college",
      location: "Albuquerque",
      degree: "Bachelor of law",
      startDate: "18-6-1978",
      endDate: "18-6-1980",
    },
  ])

  const [experience, dispatchExperience] = useReducer(publicReducer, [{
    jobTitle: "Solo Practitioner",
    company: "Attorney",
    location: "Albuquerque",
    startDate: "1999",
    endDate: "2003",
    description:
    `Found creative solutions to solve clients' problems
    Spearheaded effort resulting in large-scale class action lawsuit
    Established lasting relationships with clients`
  },
  {
    jobTitle: "Davis & Main",
    company: "Attorney",
    location: "Albuquerque",
    startDate: "2002",
    endDate: "2002",
    description:
    `Proficient in use of media for client outreach
    Oversaw marketing strategies and delivered presentations to management
    Participated in conflict resolution and employee training`
  },
  {
    jobTitle: "Hamlin, Hamlin & McGill",
    company: "Mailroom Clerk",
    location: "Albuquerque",
    startDate: "1992",
    endDate: "1999",
    description:
    `Organized and maintained intra-office memo system
    Reliably sorted and delivered post for entire firm
    Maintained equipment in HHM copy room`
  }])

  const [projects, dispatchProjects] = useReducer(publicReducer, [
    {
      title: "Breaking Bad",
      technologies: "React, Node.js, Express, MongoDB",
      date: "2013",
      description:
      `Developed a full-stack platform to track character arcs and story progression
      Implemented a dynamic dashboard for visualizing plot timelines
      Collaborated with a small team to deliver features under tight deadlines`,
      url: "https://www.imdb.com/title/tt0903747/"
    },
    {
      title: "Better Call Saul",
      technologies: "Vue.js, Firebase, Tailwind CSS, REST API",
      date: "2022",
      description:
      `Built a case management system for tracking client interactions
      Integrated real-time data sync using Firebase for seamless updates
      Designed a responsive UI focused on clarity and ease of use`,
      url: "https://www.imdb.com/title/tt3032476/"
    }
  ])

  const value = { 
    personalInfo,
    setPersonalInfo,
    education,
    dispatchEducation,
    experience, 
    dispatchExperience,
    projects,
    dispatchProjects,
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