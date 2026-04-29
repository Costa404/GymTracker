import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";

const PinLogin = () => {
    const { data, setData, post, processing, reset, errors } = useForm({
        pin: "",
    });

    useEffect(() => {
        if (data.pin.length === 6 && !processing) {
            post("/auth", { onError: () => reset("pin") });
        }
    }, [data.pin]);

    return (
        <div className="space-y-6">
            <div className="relative max-w-[240px] mx-auto">
                <input
                    type="password"
                    inputMode="numeric"
                    maxLength={6}
                    value={data.pin}
                    onChange={(e) => setData("pin", e.target.value)}
                    disabled={processing}
                    className="w-full bg-blue-500/[0.03] border border-blue-500/20 rounded-2xl py-4 text-center text-3xl text-white tracking-[0.4em] focus:outline-none"
                    placeholder="••••••"
                    autoFocus
                />
            </div>
            {errors.pin && (
                <p className="text-red-500/80 text-[9px] font-bold uppercase text-center tracking-widest">
                    {errors.pin}
                </p>
            )}
        </div>
    );
};

export default PinLogin;
