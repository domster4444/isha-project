import { ResumeProvider } from "./Context";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ExploreJobs from "./Pages/ExploreJobs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ResumeProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/explorejobs' element={<ExploreJobs />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </ResumeProvider>
    </>
  );
}

export default App;
