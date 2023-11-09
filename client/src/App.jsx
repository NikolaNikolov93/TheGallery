import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
    return (
        <>
            <Header />
            <main className="main">
                <h1>Categories</h1>
                <Categories />
            </main>
            <Footer />
        </>
    );
}

export default App;
