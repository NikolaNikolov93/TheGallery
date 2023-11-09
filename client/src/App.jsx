import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
    return (
        <>
            <Header />
            <main className="main">
                <Categories />
            </main>
            <Footer />
        </>
    );
}

export default App;
