@extends('layouts.app')

@section('content')
    <div class="max-w-md mx-auto pt-10 px-6 pb-32">

        <header class="mb-10 flex justify-between items-start">
            <div class="text-left">
                <p class="text-red-500 text-[10px] font-black uppercase tracking-[0.4em] mb-1 italic">Focus Mode</p>
                <h1 class="text-white text-4xl font-black italic uppercase tracking-tighter leading-none">
                    {{ $exercise->name }}
                </h1>
            </div>
            <a href="{{ route('workouts.workoutSession', $workout_id) }}"
                class="text-[9px] text-gray-500 font-black uppercase border border-zinc-900 px-3 py-2 rounded-xl italic">
                Close
            </a>
        </header>

        <form action="{{ route('exercises.log', $exercise->id) }}" method="POST"
            class="bg-[#0c0c0c] border border-[#1a1a1a] p-6 rounded-3xl mb-10 shadow-2xl">
            @csrf
            <input type="hidden" name="workout_id" value="{{ $workout_id }}">

            <div class="grid grid-cols-3 gap-4 mb-6">
                <div class="flex flex-col text-left">
                    <label class="text-[9px] text-gray-600 font-black uppercase mb-2 tracking-widest italic">Weight</label>
                    <input type="number" name="weight" placeholder="0"
                        class="bg-black border border-[#222] text-white font-black text-2xl p-4 rounded-2xl focus:border-red-600 transition-all outline-none italic">
                </div>
                <div class="flex flex-col text-left">
                    <label class="text-[9px] text-gray-600 font-black uppercase mb-2 tracking-widest italic">Reps</label>
                    <input type="number" name="reps" placeholder="0"
                        class="bg-black border border-[#222] text-white font-black text-2xl p-4 rounded-2xl focus:border-red-600 transition-all outline-none italic">
                </div>
                <div class="flex flex-col text-left">
                    <label class="text-[9px] text-gray-600 font-black uppercase mb-2 tracking-widest italic">RIR</label>
                    <input type="number" name="rir" placeholder="0"
                        class="bg-black border border-[#222] text-red-600 font-black text-2xl p-4 rounded-2xl focus:border-red-600 transition-all outline-none italic">
                </div>
            </div>

            <button type="submit"
                class="w-full bg-red-600 text-white font-black py-5 rounded-2xl uppercase tracking-[.2em] text-xs italic active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(220,38,38,0.3)]">
                Log Set
            </button>
        </form>

        <div class="space-y-3">
            <h2 class="text-[10px] text-gray-700 font-black uppercase tracking-[0.4em] mb-4 text-left italic">Today's
                Performance</h2>
            @foreach ($logs as $index => $log)
                <div class="flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-[#161616]">
                    <span class="text-red-600 font-black text-xs italic">S{{ $index + 1 }}</span>
                    <div class="flex flex-1 justify-around text-sm font-black uppercase italic tracking-tighter">
                        <span class="text-white text-lg">{{ $log->weight }}<small
                                class="text-gray-600 ml-0.5">kg</small></span>
                        <span class="text-white text-lg">{{ $log->reps }} <small
                                class="text-gray-600 ml-0.5">reps</small></span>
                        <span class="text-red-500 text-lg"><small
                                class="text-gray-600 mr-0.5">RIR</small>{{ $log->rir }}</span>
                    </div>
                </div>
            @endforeach
        </div>

    </div>
@endsection
