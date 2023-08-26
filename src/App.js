import "./App.css";
import Navbar from "./components/Navbar";
import capsule from "../src/assets/capsule.png";
import minicapsule from "../src/assets/minicapsule.png";
import SearchBox from "./components/SearchBox";
import { useEffect, useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import PaginationControls from "./components/PaginationControls";
import { FallingLines } from "react-loader-spinner";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryCategory, setSearchQueryCategory] = useState("");
  const [capsules, setCapsules] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [perPage, setPerPage] = useState(0); // Number of items to display per page
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllCapsules();
  }, [currentPage, searchQuery, searchQueryCategory]);

  /**
   * Function to fetch all capsules from the SpaceX API.
   *
   * @async
   * @function fetchAllCapsules
   * @returns {Promise<Array>} An array of capsule objects.
   * @throws {Error} If the request fails or the response is not JSON.
   */
  async function fetchAllCapsules() {
    try {
      const response = await fetch(
        `https://api.spacexdata.com/v3/capsules`
        // ?limit=${itemsPerPage}&offset=${offset}
      );

      if (!response.ok) {
        throw new Error("Failed to fetch capsules.");
      }

      // Get the total items from the spacex-api-count header
      const total = response.headers.get("spacex-api-count");
      setTotalItems(parseInt(total, 10)); // Converting the total to an integer just incase

      const data = await response.json();
      setCapsules(data);

    } catch (error) {
      throw new Error(`An error occurred: ${error.message}`);
    }
  }

  const handleSearch = () => {
    setIsLoading(true);

    setTimeout(() => {
      const updatedCapsules = capsules
        .filter(
          (item) =>
            item.capsule_id.includes(searchQuery) ||
            item.capsule_serial.toLowerCase().includes(searchQuery)
        )
        .filter((item) =>
          category
            ? category.toLowerCase() === "status"
              ? item.status
                  .toLowerCase()
                  .includes(searchQueryCategory.toLowerCase())
              : // : category.toLowerCase() === "original launch"
              // ? item.original_launch
              //     .includes(searchQueryCategory.toLowerCase())
              category.toLowerCase() === "type"
              ? item.type
                  .toLowerCase()
                  .includes(searchQueryCategory.toLowerCase())
              : true
            : true
        );
      setCapsules(updatedCapsules);
      setIsLoading(false)
    }, 2000);
  };
  return (
    <div className="App">
      <Navbar />
      {/* Hero Section */}
      <section className="h-[calc(100vh-98px)} px-4 lg:px-20 flex flex-col lg:flex-row lg:py-20">
        <div className="flex-1 py-8 lg:py-16">
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
      <section className="px-4 lg:px-20 flex flex-col gap-10 pt-16 lg:pt-0">
        {/* Using the Category to make search */}
        <div className="flex flex-col lg:flex-row gap-y-5 items-center lg:gap-10">
          <div className="relative">
            <button
              className="text-[rgb(28,82,132)] ring-1 ring-[rgb(28,82,132)] w-[300px] h-12 py-2 rounded-md flex justify-between items-center px-4"
              onClick={() => setShowFilter((prev) => !prev)}
            >
              {category || "Filter"}
              <RiArrowDownSFill
                size={24}
                className={`flex-shrink-0 ${showFilter && "rotate-180"}`}
              />
            </button>
            {showFilter && (
              <ul className="bg-gray-50 py-4 px-3 flex flex-col gap-2 text-[rgb(28, 82, 132)] text-sm ring-1 ring-gray-200 rounded-md absolute left-0 top-16 w-[300px] z-50">
                {category && (
                  <li
                    className="text-gray-500 p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setCategory("");
                      setShowFilter(false);
                    }}
                  >
                    Filter
                  </li>
                )}
                <li
                  className="text-[rgb(28,82,132)] p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setCategory("Status");
                    setShowFilter(false);
                  }}
                >
                  Status
                </li>
                <li
                  className="text-[rgb(28,82,132)] p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setCategory("Original launch");
                    setShowFilter(false);
                  }}
                >
                  Original launch
                </li>
                <li
                  className="text-[rgb(28,82,132)] p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setCategory("Type");
                    setShowFilter(false);
                  }}
                >
                  Type
                </li>
              </ul>
            )}
          </div>
          <SearchBox
            searchQuery={searchQueryCategory}
            setSearchQuery={setSearchQueryCategory}
            placeholder={"Search by status, original launch and type"}
          />
        </div>

        {/* Searching with name */}
        <div className="flex flex-col lg:flex-row gap-y-5 items-center lg:gap-10">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder={"Search for a capsule"}
          />
          <div className="relative">
            <button
              className="text-white ring-1 bg-[rgb(28,82,132)] w-[300px] h-12 py-2 rounded-md px-4 hover:opacity-80"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Data display section */}
      <section className="px-4 lg:px-20 py-10">
        <div>
          {/* <h1>Capsules List</h1> */}
          {isLoading && (
            <div className="w-full h-[300px] flex items-center justify-center">
              <FallingLines
                color="rgb(28,82,132)"
                width="100"
                visible={true}
                ariaLabel="falling-lines-loading"
              />
            </div>
          )}
          {!isLoading && (
            <ul className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 place-items-center gap-10 lg:gap-16">
              {capsules &&
                capsules.slice(perPage, itemsPerPage).map((item) => (
                  <li
                    key={item.capsule_serial}
                    className="h-[400px] w-[300px] text-center ring-1 ring-gray-400 rounded-sm relative cursor-pointer group overflow-hidden"
                  >
                    <div className="h-[80%] overflow-hidden">
                      <img
                        src={minicapsule}
                        alt=""
                        className="object-cover w-full h-full group-hover:scale-110 transition"
                      />
                    </div>
                    <p className="text-gray-600 mt-4">{`${item.capsule_id} ${item.capsule_serial}`}</p>
                    {item.status === "retired" && (
                      <div className="bg-white text-sm text-[rgb(28,82,132)] px-4 py-2 rounded-sm absolute left-2 top-2">
                        {item.status}
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          )}
          {capsules && (
            <PaginationControls
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              perPage={perPage}
              setPerPage={setPerPage}
              setIsLoading={setIsLoading}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
