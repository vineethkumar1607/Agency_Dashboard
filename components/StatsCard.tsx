import { cn } from "~/lib/utils";

interface StatsCardProps {
  headerTitle: string;
  total: number;
  currentMonth: number;
  lastMonth: number;
}

interface TrendResult {
  trend: "increment" | "decrement" | "no change";
  percentage: number;
}

const StatsCard = ({
  headerTitle,
  total,
  currentMonth,
  lastMonth,
}: StatsCardProps) => {
  const calculateTrendPercentage = (
    countOfThisMonth: number,
    countOfLastMonth: number
  ): TrendResult => {
    if (countOfLastMonth === 0) {
      return countOfThisMonth === 0
        ? { trend: "no change", percentage: 0 }
        : { trend: "increment", percentage: 100 };
    }

    const change = countOfThisMonth - countOfLastMonth;
    const percentage = Math.abs((change / countOfLastMonth) * 100);

    if (change > 0) {
      return { trend: "increment", percentage };
    } else if (change < 0) {
      return { trend: "decrement", percentage };
    } else {
      return { trend: "no change", percentage: 0 };
    }
  };

  const { trend, percentage } = calculateTrendPercentage(
    currentMonth,
    lastMonth
  );

  const isDecrement = trend === "decrement";

  return (

    // stats-card
    <article className="p-6  flex flex-col gap-6 bg-white shadow-400 rounded-20 ">
      <h3 className="text-base font-medium">{headerTitle}</h3>
      {/* content */}
      <div className="flex flex-row md:flex-col-reverse xl:flex-row xl:items-center gap-3 justify-between">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold">{total}</h2>
          <div className="flex text-center gap-1">
            <figure className="flex items-center gap-1">
              <img
                src={`/public/assets/icons/${isDecrement ? "arrow-down-red.svg" : "arrow-up-green.svg"}`}
                alt="arrow" className="size-5"
              />
              <figcaption
                className={cn(
                  "text-sm font-medium",
                  isDecrement ? "text-red-500" : "text-success-700"
                )}
              >
                {Math.round(percentage)}%
              </figcaption>
            </figure>
            <p className="text-gray-100 text-sm font-medium *:**:">vs last month</p>
          </div>
        </div>
        <img src={`/public/assets/icons/${isDecrement?"decrement.svg": "increment.svg"}`} alt="graph" className="xl:w-32 w-full h-full md:h-32 xl:h-full"/>
      </div>
    </article>
  );
};

export default StatsCard;
