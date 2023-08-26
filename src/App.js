import './App.css';
import Navbar from './components/Navbar';
import capsule from "../src/assets/capsule.png"
import SearchBox from './components/SearchBox';
import { useState } from 'react';

function App() {

  const [searchQuery, setSearchQuery] = useState("")
  return (
    <div className="App">
      <Navbar />
      {/* Hero Section */}
      <section className="h-[calc(100vh-98px)} px-4 lg:px-20 flex lg:py-20">
        <div className="flex-1 py-16">
          <h1 className="text-[42px] font-[700] lg:w-[480px] leading-tight">
            Reach for the Stars with SpaceX Capsules
          </h1>
          <p className="text-gray-500 text-xl mt-5 lg:w-[380px]">
            Join us on this extraordinary journey, and together, we'll rewrite
            the story of human potential among the stars.
          </p>
          <button
            className=" text-lg text-white w-full lg:w-[380px] py-4 mt-16 rounded-xl hover:opacity-80 transition"
            style={{ backgroundColor: `rgb(28, 82, 132)` }}
          >
            Join today
          </button>
        </div>
        <div className="flex-1">
          <img src={capsule} alt="" className="" />
        </div>
      </section>

      {/* Search form  */}
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Data display section */}
      <section></section>
    </div>
  );
}

export default App;
