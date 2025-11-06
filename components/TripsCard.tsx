import { Link, useLocation } from "react-router";
import {
  ChipListComponent,
  ChipsDirective,
  ChipDirective,
} from "@syncfusion/ej2-react-buttons";


import { cn } from "~/lib/utils";

interface TripsCardProps {
  id: string;
  name: string;
  imageUrls: string[];
  location: string;
  tags: string[];
  travelStyle: string;
  estimatedPrice: string;
}

const TripsCard = ({
  id,
  name,
  imageUrls,
  location,
  tags,
  travelStyle,
  estimatedPrice,
}: TripsCardProps) => {
  const path = useLocation();
  const imageUrl = imageUrls?.[0] ?? "";

  function getFirstWord(input: string = ""): string {
    return input.trim().split(/\s+/)[0] || "";
  }

  const targetPath =
    path.pathname === "/" || path.pathname.startsWith("/travel")
      ? `/travel/${id}`
      : `/trips/${id}`;

  return (
    <Link
      to={targetPath}
      className="bg-white rounded-20 flex flex-col w-full relative shadow-md hover:shadow-lg transition"
    >
      {/* image container (position context) */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-40 rounded-t-xl object-cover aspect-video"
        />

        {/* price pill */}
        <article className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm py-1 px-3 rounded-full text-dark-100 text-sm font-semibold shadow-sm">
          {estimatedPrice}
        </article>
      </div>

      <article className="flex flex-col gap-3 mt-4 pl-4 pr-3">
        <h2 className="text-sm md:text-lg text-dark-100 font-semibold line-clamp-2">
          {name}
        </h2>
        <figure className="flex items-center gap-2 text-gray-600">
          <img
            src="/assets/icons/location-mark.svg"
            alt="location"
            className="size-4"
          />
          <figcaption>{location}</figcaption>
        </figure>
      </article>

      <div className="mt-6 pl-4 pb-5">
        <ChipListComponent enableDelete={false}>
          <ChipsDirective>
            {tags.map((tag, index) => (
              <ChipDirective
                key={index}
                text={getFirstWord(tag)}
                cssClass={cn(
                  index === 1
                    ? "!bg-pink-50 !text-pink-500"
                    : "!bg-green-50 !text-green-700"
                )}
              />
            ))}
          </ChipsDirective>
        </ChipListComponent>
      </div>
    </Link>

  );
};

export default TripsCard;
