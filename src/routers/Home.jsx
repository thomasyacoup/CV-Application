import { Button } from "@/components/ui/button";
import {
  File,
  Sparkles,
  ShieldCheck,
  Zap,
  Download,
  CheckCircle2,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";
import { GitHubIcon } from "@/components/ui/GithubIcon";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// ---------- Small building blocks ----------

/** Underlines a phrase with an animated "highlighter" mark that draws in on scroll. */
function Highlight({ children, color = "#FFE066" }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <svg
        viewBox="0 0 200 20"
        preserveAspectRatio="none"
        className="absolute -bottom-1 left-0 w-full h-[0.55em]"
      >
        <motion.path
          d="M2 14 Q 50 4, 100 12 T 198 10"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
        />
      </svg>
    </span>
  );
}

function Eyebrow({ children }) {
  return (
    <span className="font-mono text-xs tracking-wide text-primary/80 border border-primary/20 bg-primary/5 rounded-full px-3 py-1 w-fit">
      {children}
    </span>
  );
}

/** A small "SECTION HEADER" row like Jake's Resume — bold caps label + underline. */
function ResumeSectionLabel({ children, variants }) {
  return (
    <motion.div variants={variants} className="flex flex-col gap-1 mb-2">
      <span className="text-[10px] font-mono font-bold tracking-wider text-foreground/70">
        {children}
      </span>
      <span className="h-px w-full bg-foreground/15" />
    </motion.div>
  );
}

/** The animated resume "document" that anchors the hero — lines draw in, a scan
 * pass sweeps down like an ATS parser, then an "ATS 98%" badge pops in. */
function ResumeMock() {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
  };
  const line = {
    hidden: { scaleX: 0, opacity: 0 },
    show: { scaleX: 1, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };
  const fade = {
    hidden: { opacity: 0, y: 4 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <div className="relative">
      {/* floating format chips */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="hidden sm:flex absolute -top-5 -right-6 font-mono text-[10px] font-bold bg-background border border-border rounded-lg px-2.5 py-1.5 shadow-md rotate-6 z-20"
      >
        PDF
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="hidden sm:flex absolute top-14 -left-8 font-mono text-[10px] font-bold bg-background border border-border rounded-lg px-2.5 py-1.5 shadow-md -rotate-6 z-20"
      >
        ATS-OK
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="relative w-[300px] sm:w-[360px] rounded-2xl border border-border bg-background shadow-2xl px-7 py-6 overflow-hidden font-serif"
      >
        {/* ATS scan sweep */}
        <motion.div
          className="absolute inset-x-0 h-28 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(37,69,232,0) 0%, rgba(37,69,232,0.12) 45%, rgba(52,211,153,0.22) 55%, rgba(52,211,153,0) 100%)",
          }}
          initial={{ top: "-7rem" }}
          animate={{ top: "28rem" }}
          transition={{ duration: 2.1, delay: 1.4, ease: "easeInOut" }}
        />

        {/* centered name header, like Jake's Resume */}
        <div className="flex flex-col items-center text-center gap-1.5 mb-3 relative z-10">
          <motion.div
            variants={line}
            style={{ transformOrigin: "center" }}
            className="h-3.5 w-1/2 rounded-full bg-foreground/85"
          />
          <motion.div
            variants={fade}
            className="flex items-center gap-2.5 text-muted-foreground/50"
          >
            <Mail className="size-2.5" />
            <span className="h-1.5 w-10 rounded-full bg-muted-foreground/25" />
            <Phone className="size-2.5" />
            <span className="h-1.5 w-8 rounded-full bg-muted-foreground/25" />
            <span className="h-1.5 w-10 rounded-full bg-muted-foreground/25" />
          </motion.div>
        </div>

        {/* EXPERIENCE section */}
        <div className="mb-3 relative z-10">
          <ResumeSectionLabel variants={fade}>EXPERIENCE</ResumeSectionLabel>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <motion.div
                variants={line}
                style={{ transformOrigin: "left" }}
                className="h-2 w-2/5 rounded-full bg-foreground/70"
              />
              <motion.div
                variants={line}
                style={{ transformOrigin: "right" }}
                className="h-1.5 w-1/5 rounded-full bg-muted-foreground/30"
              />
            </div>
            {["96%", "88%", "72%"].map((w, i) => (
              <motion.div
                key={i}
                variants={line}
                style={{ transformOrigin: "left", width: w }}
                className="h-1.5 rounded-full bg-muted-foreground/25"
              />
            ))}
          </div>
        </div>

        {/* EDUCATION section */}
        <div className="mb-3 relative z-10">
          <ResumeSectionLabel variants={fade}>EDUCATION</ResumeSectionLabel>
          <div className="flex justify-between items-center">
            <motion.div
              variants={line}
              style={{ transformOrigin: "left" }}
              className="h-2 w-1/3 rounded-full bg-foreground/70"
            />
            <motion.div
              variants={line}
              style={{ transformOrigin: "right" }}
              className="h-1.5 w-1/5 rounded-full bg-muted-foreground/30"
            />
          </div>
        </div>

        {/* SKILLS section */}
        <div className="relative z-10">
          <ResumeSectionLabel variants={fade}>SKILLS</ResumeSectionLabel>
          <div className="flex gap-1.5 flex-wrap">
            {["React", "SQL", "Figma", "Node"].map((s) => (
              <motion.span
                key={s}
                variants={line}
                className="text-[9px] font-mono px-2 py-1 rounded-md bg-primary/10 text-primary/90"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>

        {/* ATS pass badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 2.4, type: "spring", stiffness: 220, damping: 16 }}
          className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-foreground text-background text-xs font-mono px-3 py-2 rounded-xl shadow-lg z-20"
        >
          <CheckCircle2 className="size-3.5 text-[#34D399]" />
          ATS 98%
        </motion.div>
      </motion.div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className="rounded-xl border border-border bg-background p-6 flex flex-col gap-3 hover:border-primary/40 transition-colors"
    >
      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="size-5 text-primary" />
      </div>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function Step({ number, title, desc, delay, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className="relative flex-1 flex flex-col gap-3"
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm font-bold size-8 rounded-full border-2 border-primary text-primary flex items-center justify-center shrink-0">
          {number}
        </span>
        {!isLast && (
          <span className="hidden md:block h-px flex-1 bg-border" aria-hidden="true" />
        )}
      </div>
      <h4 className="font-bold text-base">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </motion.div>
  );
}

// ---------- Page ----------

export function Home() {
  return (
    <div className="flex flex-col">
      {/* NAV */}
      <nav className="flex justify-between items-center p-4 max-w-6xl mx-auto w-full">
        <div className="flex gap-1 items-center">
          <File className="text-primary size-8" />
          <p className="font-bold leading-none">
            Free
            <br />
            <span className="text-primary">Resume</span>
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">
            How It Works
          </a>
        </div>
        <Button variant="link" asChild>
          <a
            href="https://github.com/thomasyacoup"
            className="flex items-center gap-1.5"
          >
            <GitHubIcon className="size-4" />
            ThomasYacoub
          </a>
        </Button>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gray-50 border-y border-border bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] bg-size-[28px_28px]">
        <div className="max-w-6xl mx-auto w-full px-4 py-16 md:py-24 grid md:grid-cols-2 gap-14 items-center">
          <div className="flex flex-col gap-6 order-1 text-center md:text-left items-center md:items-start">
            <Eyebrow>No credit card. No free trial that quietly bills you.</Eyebrow>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              Build a professional resume{" "}
              <Highlight color="#FFE066">completely free</Highlight>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md">
              No subscriptions, no hidden fees. Your resume is ready to
              download in under <Highlight color="#C7D9FF">5 minutes</Highlight>.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link to="/app">
                <Button size="lg" className="gap-2">
                  Create Now — It's Free
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              {/* <Button size="lg" variant="outline">
               See a Demo 
              </Button> */}
            </div>
          </div>

          <div className="order-2 flex justify-center py-6">
            <ResumeMock />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-6xl mx-auto w-full px-4 py-20 scroll-mt-20">
        <div className="text-center max-w-lg mx-auto mb-12 flex flex-col gap-3">
          <span className="font-mono text-xs text-primary tracking-wide">
            WHY FREERESUME
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Everything you need, none of the cost
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard
            icon={Sparkles}
            title="100% Free"
            desc="No subscriptions, no free trials that suddenly start charging you. Everything, for free, forever."
            delay={0}
          />
          <FeatureCard
            icon={ShieldCheck}
            title="ATS-Friendly"
            desc="Built to parse correctly in the applicant tracking systems most large companies rely on."
            delay={0.08}
          />
          <FeatureCard
            icon={Zap}
            title="Fast"
            desc="From blank page to finished resume in under 5 minutes, with zero unnecessary steps."
            delay={0.16}
          />
          <FeatureCard
            icon={Download}
            title="Instant PDF Export"
            desc="Download your resume in print-ready quality, ready to send the moment you finish."
            delay={0.24}
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="bg-gray-50 border-y border-border scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto w-full px-4 py-20">
          <div className="text-center max-w-lg mx-auto mb-14 flex flex-col gap-3">
            <span className="font-mono text-xs text-primary tracking-wide">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              3 steps and you're done
            </h2>
            <p className="text-muted-foreground text-sm">
              One template — Jake's Resume, the format recruiters and ATS
              parsers already trust. No design decisions to make.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-10 md:gap-6">
            <Step
              number="1"
              title="Enter your details"
              desc="Your name, experience, and skills in a simple, clear form."
              delay={0}
            />
            <Step
              number="2"
              title="We format it for you"
              desc="Your info is dropped straight into Jake's Resume — a clean, ATS-tested layout, no picking or tweaking."
              delay={0.1}
            />
            <Step
              number="3"
              title="Download and apply"
              desc="Your PDF is ready instantly — send it to any company and start applying."
              delay={0.2}
              isLast
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-6xl mx-auto w-full px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-primary text-primary-foreground px-8 py-14 flex flex-col items-center text-center gap-6"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Why wait? Your resume could be ready before your coffee gets cold.
          </h2>
          <Link to="/app">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 text-primary"
            >
              Create Yours Free
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto w-full px-4 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-1 items-center">
            <File className="text-primary size-5" />
            <p className="font-bold text-sm leading-none">
              Free<span className="text-primary">Resume</span>
            </p>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} FreeResume
          </p>
          <Button variant="link" asChild className="p-0 h-auto">
            <a
              href="https://github.com/thomasyacoup"
              className="flex items-center gap-1.5 text-sm"
            >
              <GitHubIcon className="size-4" />
              ThomasYacoub
            </a>
          </Button>
        </div>
      </footer>
    </div>
  );
}