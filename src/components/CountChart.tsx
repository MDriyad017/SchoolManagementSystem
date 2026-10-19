"use client";

import Image from "next/image";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  PieSectorDataItem,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { name: "Boys", value: 1234, percentage: 55, fill: "#C3EBFA" },
  { name: "Girls", value: 1234, percentage: 45, fill: "#FAE27C" },
];

const renderActiveShape = (props: PieSectorDataItem) => {
  const {
    cx = 0,
    cy = 0,
    midAngle = 0,
    innerRadius = 0,
    outerRadius = 0,
    startAngle = 0,
    endAngle = 0,
    fill,
    payload,
    value,
  } = props;

  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (Number(outerRadius) + 6) * cos;
  const sy = cy + (Number(outerRadius) + 6) * sin;
  const mx = cx + (Number(outerRadius) + 18) * cos;
  const my = cy + (Number(outerRadius) + 18) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 16;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={Number(outerRadius) + 4}
        outerRadius={Number(outerRadius) + 8}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
        strokeWidth={2}
      />
      <circle cx={ex} cy={ey} r={3} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey}
        textAnchor={textAnchor}
        fill="#374151"
        className="text-xs font-semibold"
      >
        {`${payload.name}: ${value}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey}
        dy={14}
        textAnchor={textAnchor}
        fill="#9CA3AF"
        className="text-[10px]"
      >
        {`(${payload.percentage}%)`}
      </text>
    </g>
  );
};

const CountChart = () => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  // Safely extract the slice index from Recharts handler arguments
  const handlePieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const handlePieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <div className="bg-white rounded-xl w-full h-full p-4 flex flex-col justify-between">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" alt="More options" width={20} height={20} />
      </div>

      {/* CHART CONTAINER */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Cast props explicitly using 'any' bypass for Recharts internal prop mismatch */}
            <Pie
              {...({
                activeIndex: activeIndex,
                activeShape: renderActiveShape,
                data: data,
                cx: "50%",
                cy: "50%",
                innerRadius: "55%",
                outerRadius: "75%",
                dataKey: "value",
                onMouseEnter: handlePieEnter,
                onMouseLeave: handlePieLeave,
              } as any)}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* CENTER ICON */}
        <Image
          src="/maleFemale.png"
          alt="Students icon"
          width={40}
          height={40}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>

      {/* BOTTOM SUMMARY / LEGEND */}
      <div className="flex justify-center gap-16">
        {/* BOYS */}
        <div
          onMouseEnter={() => setActiveIndex(0)}
          onMouseLeave={() => setActiveIndex(undefined)}
          className={`flex flex-col gap-1 cursor-pointer transition-opacity duration-200 ${
            activeIndex === 0 || activeIndex === undefined
              ? "opacity-100"
              : "opacity-40"
          }`}
        >
          <div className="w-5 h-5 bg-[#C3EBFA] rounded-full" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-400">Boys (55%)</h2>
        </div>

        {/* GIRLS */}
        <div
          onMouseEnter={() => setActiveIndex(1)}
          onMouseLeave={() => setActiveIndex(undefined)}
          className={`flex flex-col gap-1 cursor-pointer transition-opacity duration-200 ${
            activeIndex === 1 || activeIndex === undefined
              ? "opacity-100"
              : "opacity-40"
          }`}
        >
          <div className="w-5 h-5 bg-[#FAE27C] rounded-full" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-400">Girls (45%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
