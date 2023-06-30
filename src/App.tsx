import { QuestionsProvider } from "./context/Question";
import { Categories } from "./pages/Categories";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <QuestionsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </Router>
    </QuestionsProvider>
  );
}

export default App;
