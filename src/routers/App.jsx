import Forms from "../components/Form";
import { Resume } from "../components/Resume";

function App() {

  return (
      <main className="flex h-dvh relative print:h-auto! print:block! print:static!">
        <Forms />
        <Resume />
      </main>
  );
}

export default App;
