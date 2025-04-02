import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudentProvider } from "./context/StudentContext";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import StudentDetails from "./components/StudentDetail";

const App: React.FC = () => {
  return (
    <StudentProvider>
      <Router>
        <div className="container mt-5">
          <h1 className="text-center mb-4">Student Management System</h1>
          <Routes>
            <Route path="/" element={
              <>
                <StudentForm />
                <StudentList />
              </>
            } />
            <Route path="/student/:id" element={<StudentDetails />} />
          </Routes>
        </div>
      </Router>
    </StudentProvider>
  );
};

export default App;