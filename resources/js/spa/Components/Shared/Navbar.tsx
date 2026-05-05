import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] h-10 ">
            {/* <nav className="fixed top-0 left-0 right-0 z-[100] h-22 "> */}
            <div className="max-w-md mx-auto h-full">
                {/* LINK TOTALMENTE VAZIO E INVISÍVEL, MAS CLICÁVEL */}
                <Link
                    to="/"
                    className="block w-full h-full"
                    aria-label="Dashboard"
                >
                    <div className="w-full h-full" />
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
