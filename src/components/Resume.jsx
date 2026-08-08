import { useResume } from "@/context/ResumeContext"
import { dateFormatter } from "@/lib/dateFormatter";
import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";

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
      if (window.matchMedia('print').matches) return;

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
      className="flex-1 min-w-0 print:h-auto! print:overflow-visible! print:w-auto!"
      style={{
        height: pageHeight || "auto",
        overflow: "hidden",
      }}
    >
      <div
        ref={pageRef}
        className="print:transform-none! print:opacity-100!"
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
  const { personalInfo, education, experience, projects, skills } = useResume()
  

  const fadeFromRight = {
    hidden: { opacity: 0, x: 24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };
  
  
  return (
    <motion.div
      variants={fadeFromRight}
      className="rounded h-full overflow-y-scroll flex-1 scrollbar-none"
    >
      <ResumePageScaler>
        <div className="w-[210mm] min-h-[297mm]  bg-white">
          <main className="px-[18mm] py-[20mm] flex flex-col gap-6">
            <header>
              <h2 className="text-center font-bold font-serif text-3xl">
                {personalInfo.name}
              </h2>
              <div className="flex gap-1 text-xs font-serif justify-center">
                <span>{personalInfo.phone}</span>
                <Separator />
                <a href={personalInfo.email} className="underline">{personalInfo.email}</a>
                <Separator />
                <a href={personalInfo.github} className="underline">{personalInfo.github.replace("https://", "")}</a>
                <Separator />
                <a href={personalInfo.linkedin} className="underline">{personalInfo.linkedin.replace("https://", "")}</a>
              </div>
            </header>
            <section className="flex flex-col gap-1">
              <h3 className="font-extrabold text-xm font-serif uppercase tracking-wider">Education</h3>
              <hr className="border-black" />
              <div className="flex flex-col gap-1 pl-4">
                {
                  education.map(item => (
                    <div key={item.id} className="flex flex-col">
                      <div className="flex justify-between text-sm font-serif font-semibold">
                        <h4>{item.school}</h4>
                        <span>{dateFormatter(item.startDate)} - {dateFormatter(item.endDate)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-serif italic">
                        <h4>{item.degree}</h4>
                        <span>{item.location}</span>
                      </div>
                    </div>
                  ))
                }
              </div>
            </section>
            <section className="flex flex-col gap-1">
              <h3 className="font-extrabold text-xm font-serif uppercase tracking-wider">EXPERIENCE</h3>
              <hr className="border-black" />
              <div className="flex flex-col gap-1 pl-4">
                {
                  experience.map(item => (
                    <div key={item.id} className="flex flex-col">
                      <div className="flex justify-between text-sm font-serif font-semibold">
                        <h4>{item.company}</h4>
                        <span>{dateFormatter(item.startDate)} - {dateFormatter(item.endDate)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-serif italic">
                        <h4>{item.jobTitle}</h4>
                        <span>{item.location}</span>
                      </div>
                      <ul className="list-disc list-inside pl-4 text-sm font-serif">
                        {
                          item.description.split('\n').map(line => (
                            <li>{line}</li>
                          ))
                        }
                      </ul>
                    </div>
                  ))
                }
              </div>
            </section>
            <section className="flex flex-col gap-1">
              <h3 className="font-extrabold text-xm font-serif uppercase tracking-wider">Projects</h3>
              <hr className="border-black" />
              <div className="flex flex-col gap-1 pl-4">
                {
                  projects.map(item => (
                    <div key={item.id} className="flex flex-col">
                      <div className="flex justify-between text-sm font-serif font-semibold">
                        <div className="flex gap-1">
                          <h4>{item.title} (<a href={item.url} className="underline">URL</a>)</h4>
                          <Separator />
                          <span className="italic ">{item.technologies}</span>
                        </div>
                        <span className="">{dateFormatter(item.date)}</span>
                      </div>
                      <ul className="list-disc list-inside pl-4 text-sm font-serif">
                        {
                          item.description.split('\n').map(line => (
                            <li>{line}</li>
                          ))
                        }
                      </ul>
                    </div>
                  ))
                }
              </div>
            </section>
            <section className="flex flex-col gap-1">
              <h3 className="font-extrabold text-xm font-serif uppercase tracking-wider">Skills</h3>
              <hr className="border-black" />
              <div className="pl-4 prose marker:text-black text-black text-sm font-serif" dangerouslySetInnerHTML={{__html: skills}}>
              </div>
            </section>
          </main>
        </div>
      </ResumePageScaler>
    </motion.div>
  )
}