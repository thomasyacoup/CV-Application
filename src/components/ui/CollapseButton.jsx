export function CollapseButtton({isActive, onToggle, children, sectionName}) {

  const onClick = () => { 
    if (isActive) onToggle("none")
    else  onToggle(sectionName)
  }
  
  return (
    <button
        className={`w-full p-4 hover:bg-[#f1f1f1] transition-colors delay-25 text-2xl font-bold text-left ${isActive ? "bg-primary/15 text-primary hover:bg-primary/15" : "bg-white text-black"}`}
        onClick={onClick}
      >
        {children}
      </button>
  )
}