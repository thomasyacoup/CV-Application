import Forms from "../components/Form";
import { Resume } from "../components/Resume";
import { Header } from "@/components/Header";

function App() {

  return (
      <main className="grid grid-cols-2 h-dvh relative print:h-[297mm]! print:block! print:static! p-2 gap-2 bg-[#dddddd] print:p-0">
        <Header />
        <Forms />
        <Resume />
      </main>
  );
}

export default App;
