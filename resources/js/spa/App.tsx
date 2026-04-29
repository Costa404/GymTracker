import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import RoutesApp from "./routes/RoutesApp";

const App = () => {
    return (
        <BrowserRouter>
            <MainLayout>
                <RoutesApp />
            </MainLayout>
        </BrowserRouter>
    );
};

export default App;
