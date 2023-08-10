import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 
const Flight = React.lazy(() => import("./pages/flights"));
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/flight" element={<Flight />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
