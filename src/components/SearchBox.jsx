import React from 'react'
import { CiSearch } from 'react-icons/ci';

const SearchBox = ({ setSearchQuery, searchQuery }) => {
  return (
    <div>
      <div className="w-full relative flex items-center mt-[10px]">
        <input
          type="text"
          placeholder="Search for a capsule"
          className="bg-[#F7F7F9] w-full pl-[45px] outline-none h-12  placeholder:pl- placeholder:text-[#D1D3D4] placeholder:text-xs"
          name="query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
          <div className="absolute left-3">
            <CiSearch size={24} color="#D1D3D4" />
          </div>
      </div>
    </div>
  );
};

export default SearchBox