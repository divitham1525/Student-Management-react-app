import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StudentContext } from "../context/StudentContext";

const StudentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const context = useContext(StudentContext);
  if (!context) throw new Error("StudentDetails must be used within a StudentProvider");

  const { students } = context;
  const student = students.find((s) => s.id === Number(id));
  const navigate = useNavigate();

  if (!student) return <p className="text-center">Student not found!</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Student Details</h2>
      <div className="card p-3">
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Course:</strong> {student.course}</p>
        <p><strong>Year:</strong> {student.year}</p>
        <p><strong>Email:</strong> {student.email || "N/A"}</p>
        <p><strong>Phone:</strong> {student.phone || "N/A"}</p>
        <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
          Back to List
        </button>
      </div>
    </div>
  );
};

export default StudentDetails;