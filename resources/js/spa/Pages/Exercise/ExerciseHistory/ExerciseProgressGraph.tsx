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

// Componente da Tooltip (Balão de informação)
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#064e3b] p-4 rounded-2xl border border-performance/20 shadow-xl">
                <p className="text-performance-light text-xs font-bold mb-1">
                    {label}
                </p>
                <p className="text-white text-sm font-extrabold">
                    Weight:{" "}
                    <span className="text-performance-light">
                        {payload[0].value} kg
                    </span>
                </p>
            </div>
        );
    }
    return null;
};

interface ChartProps {
    data: { date: string; weight: number }[];
}

const ExerciseProgress = ({ data }: ChartProps) => {
    // Evita erros se o array de dados estiver vazio
    if (!data || data.length === 0) return null;

    // Cálculos automáticos para as estatísticas
    const initialWeight = data[0].weight;
    const currentWeight = data[data.length - 1].weight;
    const diff = currentWeight - initialWeight;
    const percentage =
        initialWeight !== 0 ? ((diff / initialWeight) * 100).toFixed(0) : 0;

    const performanceColor = "var(--color-performance)";

    return (
        <div className="backdrop-blur-md border border-performance/10 rounded-[2.5rem] p-8 mb-4 shadow-2xl w-full">
            <div className="h-64 w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
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
                                    stopColor={performanceColor} /* Corrigido */
                                    stopOpacity={0.3}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={performanceColor} /* Corrigido */
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke={performanceColor} /* Corrigido */
                            opacity={0.1}
                        />

                        {/* ... XAxis e YAxis mantêm-se iguais ... */}
                        <XAxis
                            dataKey="date"
                            stroke="#64748b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#64748b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(v) => `${v}kg`}
                            domain={["dataMin - 5", "dataMax + 5"]}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{
                                stroke: performanceColor /* Corrigido para ser dinâmico */,
                                strokeWidth: 2,
                                strokeDasharray: "5 5",
                            }}
                        />

                        <Area
                            type="monotone"
                            dataKey="weight"
                            stroke={performanceColor}
                            fill="url(#colorEmerald)"
                            strokeWidth={4}
                            animationDuration={1500}
                            dot={{
                                fill: performanceColor /* Corrigido */,
                                strokeWidth: 2,
                                r: 4,
                                stroke: "#0a1220",
                            }}
                            activeDot={{ r: 7, strokeWidth: 0, fill: "#fff" }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Linha Divisória */}
            <div className="h-[1px] w-full bg-performance/10 my-6" />

            {/* Secção de Estatísticas Unificada (Corrigida) */}
            <div className="flex items-center justify-between w-full">
                {/* Lado Esquerdo - Initial */}
                <div className="flex flex-col w-[45%]">
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                        Initial Weight
                    </p>
                    <div className="flex items-baseline gap-1 whitespace-nowrap">
                        <span className="text-white text-3xl font-black tracking-tighter">
                            {initialWeight}
                        </span>
                        <span className="text-gray-500 text-sm font-bold">
                            kg
                        </span>
                    </div>
                </div>

                {/* Separador Vertical */}
                <div className="h-10 w-[1px] bg-performance/20" />

                {/* Lado Direito - Current */}
                <div className="flex flex-col w-[45%] pl-4">
                    <p className="text-performance text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                        Current Weight
                    </p>
                    <div className="flex items-baseline gap-2 whitespace-nowrap">
                        <div className="flex items-baseline gap-1">
                            <span className="text-white text-3xl font-black tracking-tighter">
                                {currentWeight}
                            </span>
                            <span className="text-gray-500 text-sm font-bold">
                                kg
                            </span>
                        </div>
                        <span className="text-performance text-sm font-black bg-performance/10 px-2 py-0.5 rounded-md">
                            {diff >= 0 ? "+" : ""}
                            {percentage}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExerciseProgress;
