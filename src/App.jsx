import "./App.css";
import HomePage from "./pages/HomePage";
import KontaktPage from "./pages/KontaktPage";
import GdprPage from "./pages/GdprPage";

const routes = {
  "/kontakt": KontaktPage,
  "/gdpr": GdprPage,
};

function App() {
  const pathname = window.location.pathname.replace(/\/$/, "") || "/";
  const Page = routes[pathname] ?? HomePage;

  return <Page />;
}

export default App;
