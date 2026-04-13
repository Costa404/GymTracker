import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface ChartProps {
    data: { date: string; weight: number }[];
}

const ExerciseProgress = ({ data }: ChartProps) => {
    if (data.length < 2) return null;

    return (
        <div className="bg-[#0a1220]/60 border border-emerald-500/10 rounded-[2.5rem] p-6 mb-8 shadow-2xl h-64">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient
                            id="colorEmerald"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#10b981"
                                stopOpacity={0.3}
                            />
                            <stop
                                offset="95%"
                                stopColor="#10b981"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#064e3b"
                        opacity={0.2}
                    />

                    <XAxis dataKey="date" hide={true} />

                    <YAxis
                        hide={true}
                        domain={["dataMin - 5", "dataMax + 5"]}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#064e3b",
                            border: "none",
                            borderRadius: "1rem",
                            fontSize: "12px",
                            fontWeight: "bold",
                        }}
                        itemStyle={{ color: "#fff" }}
                        cursor={{ stroke: "#10b981", strokeWidth: 2 }}
                    />

                    <Area
                        type="monotone"
                        dataKey="weight"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#colorEmerald)"
                        strokeWidth={4}
                        animationDuration={1500}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExerciseProgress;
