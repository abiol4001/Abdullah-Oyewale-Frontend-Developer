import React from 'react'
import minicapsule from "../assets/minicapsule.png"


const CapsuleDisplay = ({item}) => {

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
  return (
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
      <p className="text-gray-600 mt-4">{`${capitalizeFirstLetter(item.capsule_id)} ${item.capsule_serial}`}</p>
      {item.status === "retired" && (
        <div className="bg-white text-sm text-[rgb(28,82,132)] px-4 py-2 rounded-sm absolute left-2 top-2">
          {item.status}
        </div>
      )}
    </li>
  );
}

export default CapsuleDisplay