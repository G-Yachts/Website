"use client";

import { type IDestination } from "@/types/destination";
import { clsx } from "clsx";
import { useMemo, useState } from "react";
import { Link } from "@/navigation";

const Listing = ({ data }: { data: IDestination[] }) => {
  const continents: string[] = ["All"];
  for (const destination of data) {
    if (!continents.includes(destination.continent)) {
      continents.push(destination.continent);
    }
  }

  const [selectedContinent, setContinent] = useState<string>("All");
  const getDestinations = useMemo(() => {
    if (selectedContinent === "All") {
      return data;
    }
    return data.filter(
      (destination) => destination.continent === selectedContinent,
    );
  }, [selectedContinent]);

  return (
    <div className="w-full flex flex-col justify-start items-center py-5">
      <div className="flex flex-row flex-wrap justify-start items-center w-full">
        {continents.map((continent, index) => (
          <div
            onClick={() => setContinent(continent)}
            key={index}
            className={clsx(
              "text-lg uppercase cursor-pointer transition-colors duration-300 w-1/2 md:w-1/4 lg:w-1/6 py-4 border-b-2 hover:border-gray-600 hover:text-gray-800",
              {
                "border-gray-300 text-gray-500":
                  selectedContinent !== continent,
                "border-gray-800 text-gray-800":
                  selectedContinent === continent,
              },
            )}
          >
            {continent}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full my-10">
        {getDestinations.map((destination, index) => (
          <Link
            key={destination.slug}
            href={{
              pathname: "/destinations/[slug]",
              params: { slug: destination.slug },
            }}
            className="bg-center bg-cover h-64"
            style={{
              backgroundImage: `url(${encodeURI(destination.photos.featured.sizes.thumbnail.url)}), linear-gradient(to bottom right, #74ebd5, #acb6e5)`,
            }}
          >
            <div
              className={
                "w-full h-full p-4 flex flex-col text-white uppercase cursor-pointer"
              }
              style={{
                backgroundSize: "100% 100%",
                backgroundPosition: "0px 0px",
                backgroundImage:
                  "radial-gradient(200% 200% at 100% 100%, #FFFFFF00 0%, #000000FF 100%)",
              }}
            >
              <span className="text-3xl font-bold">
                {destination.destination}
              </span>
              <span className="text-lg">{destination.country}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Listing;
