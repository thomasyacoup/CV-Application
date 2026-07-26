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

  const value = { 
    personalInfo,
    setPersonalInfo,
    education,
    dispatchEducation,
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