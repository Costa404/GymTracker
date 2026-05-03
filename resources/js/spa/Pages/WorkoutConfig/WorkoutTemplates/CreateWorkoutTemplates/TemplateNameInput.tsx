interface TemplateNameInputProps {
    name: string;
    setName: (name: string) => void;
}

const TemplateNameInput = ({ name, setName }: TemplateNameInputProps) => {
    return (
        <div className="mb-4 group py-3">
            <input
                type="text"
                placeholder="Nuno's Push V1..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                // text-2xl adicionado aqui
                className="w-full bg-transparent pb-2 text-zinc-100 font-black uppercase italic tracking-tight text-2xl outline-none transition-all placeholder:text-zinc-700 placeholder:font-medium placeholder:normal-case focus:placeholder:opacity-0"
            />

            {/* LINHA: Agora é apenas um detalhe que não atravessa o ecrã com força total */}
            <div className="h-[1px] w-full bg-gradient-to-r from-zinc-800 via-zinc-800/50 to-transparent opacity-50" />
        </div>
    );
};

export default TemplateNameInput;
