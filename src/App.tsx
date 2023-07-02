import { QuestionsProvider } from "./context/Questions";
import { Categories } from "./pages/Categories";
import { Home } from "./pages/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Quiz } from "./pages/Quiz";
import { About } from "./pages/About";
import { Results } from "./pages/Results";

function App() {
  return (
    <QuestionsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category" element={<Quiz />} />
          <Route path="/results/:category" element={<Results />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </QuestionsProvider>
  );
}

export default App;
