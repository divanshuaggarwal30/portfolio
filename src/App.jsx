import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";

function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <main>
        <Hero />
      </main>
    </div>
  );
}

export default App;