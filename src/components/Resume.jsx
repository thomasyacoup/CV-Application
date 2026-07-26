import { useResume } from "@/context/ResumeContext"
import { useLayoutEffect, useRef, useState } from "react";

function Separator() {
  return <span>|</span>
}


function ResumePageScaler({ children }) {
  const containerRef = useRef(null);
  const pageRef = useRef(null);
  const [scale, setScale] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const page = pageRef.current;
    if (!container || !page) return;

    const updateScale = () => {
      const containerWidth = container.offsetWidth;
      const pageWidth = page.offsetWidth;
      if (containerWidth === 0 || pageWidth === 0) return;
      const newScale = containerWidth / pageWidth;
      setScale(newScale);
      setPageHeight(page.offsetHeight * newScale);
    };

    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex-1 min-w-0"
      style={{
        height: pageHeight || "auto",
        overflow: "hidden", 
      }}
    >
      <div
        ref={pageRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: "210mm",
          opacity: scale ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function Resume() {
  const { personalInfo } = useResume()
  
  return (
    <ResumePageScaler>
      <div className="rounded-md border-2 w-[210mm] mx-auto bg-white">
        <main className="px-[18mm] py-[20mm] flex flex-col gap-6">
          <header>
            <h2 className="text-center font-bold font-serif text-3xl">
              {personalInfo.name}
            </h2>
            <div className="flex gap-1 text-[10.5px] font-serif justify-center">
              <span className="font-sans">{personalInfo.phone}</span>
              <Separator />
              <a href={personalInfo.email} className="underline">{personalInfo.email}</a>
              <Separator />
              <a href={personalInfo.github} className="underline">GitHub</a>
              <Separator />
              <a href={personalInfo.linkedin} className="underline">LinkedIn</a>
            </div>
          </header>
          <section>
            <h3 className="font-extralight text-xm font-serif">Education</h3>
            <hr className="border-black" />
            
          </section>
        </main>
      </div>
    </ResumePageScaler>
  )
}