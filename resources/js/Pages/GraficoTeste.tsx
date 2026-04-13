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

// Dados fictícios simulando um timestamp maior (vários meses)
const dataLonga = [
    { data: "Jan", peso: 40 },
    { data: "Fev", peso: 45 },
    { data: "Mar", peso: 48 },
    { data: "Abr", peso: 55 },
    { data: "Mai", peso: 52 }, // Um pequeno "plateau" ou descida
    { data: "Jun", peso: 58 },
    { data: "Jul", peso: 62 },
    { data: "Ago", peso: 65 },
    { data: "Set", peso: 70 },
];

export default function GraficoEvolucao() {
    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl mt-8">
            <div className="flex flex-col mb-6">
                <span className="text-blue-500 font-bold text-xs uppercase tracking-widest">
                    Progresso Anual
                </span>
                <h2 className="text-2xl font-black text-white italic">
                    EVOLUÇÃO DE CARGA
                </h2>
            </div>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={dataLonga}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        {/* Definição do Gradiente Azul */}
                        <defs>
                            <linearGradient
                                id="colorPeso"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#3b82f6"
                                    stopOpacity={0.4}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#3b82f6"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#1e293b"
                        />

                        <XAxis
                            dataKey="data"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#64748b", fontSize: 12 }}
                            dy={15}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#64748b", fontSize: 12 }}
                            tickFormatter={(val) => `${val}kg`}
                            domain={["dataMin - 10", "dataMax + 10"]} // Ajusta a escala para o peso não começar no zero
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#0f172a",
                                border: "1px solid #334155",
                                borderRadius: "12px",
                                boxShadow:
                                    "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
                            }}
                            itemStyle={{ color: "#3b82f6", fontWeight: "bold" }}
                            labelStyle={{
                                color: "#94a3b8",
                                marginBottom: "4px",
                            }}
                            cursor={{ stroke: "#3b82f6", strokeWidth: 2 }}
                        />

                        <Area
                            type="monotone"
                            dataKey="peso"
                            stroke="#3b82f6"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorPeso)"
                            animationDuration={2000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
                    <p className="text-slate-400 text-xs uppercase font-bold">
                        Peso Inicial
                    </p>
                    <p className="text-white text-xl font-black">40 kg</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
                    <p className="text-slate-400 text-xs uppercase font-bold">
                        Peso Atual
                    </p>
                    <p className="text-blue-500 text-xl font-black">
                        70 kg (+75%)
                    </p>
                </div>
            </div>
        </div>
    );
}
