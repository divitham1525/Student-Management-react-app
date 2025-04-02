import React, { useContext, useState } from "react";
import { StudentContext } from "../context/StudentContext";
import { useNavigate } from "react-router-dom";

const StudentList: React.FC = () => {
  const context = useContext(StudentContext);
  if (!context) throw new Error("StudentList must be used within a StudentProvider");

  const { students, setStudents } = context;
  const navigate = useNavigate();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ name: "", course: "", year: "" });
  const [filterYear, setFilterYear] = useState("");
  const [filterCourse, setFilterCourse] = useState("");

  const deleteStudent = (id: number) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  const startEdit = (student: any) => {
    setEditingId(student.id);
    setEditData({ name: student.name, course: student.course, year: student.year.toString() });
  };

  const saveEdit = (id: number) => {
    setStudents(
      students.map((student) => (student.id === id ? { ...student, ...editData } : student))
    );
    setEditingId(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const filteredStudents = students.filter((student) =>
    (filterYear ? student.year.toString() === filterYear : true) &&
    (filterCourse ? student.course === filterCourse : true)
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Student List</h2>

      {/* Filter Controls */}
      <div className="row mb-3">
        <div className="col-md-6">
          <select className="form-select" onChange={(e) => setFilterYear(e.target.value)}>
            <option value="">Filter by Year</option>
            {[...new Set(students.map((s) => s.year.toString()))].map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <select className="form-select" onChange={(e) => setFilterCourse(e.target.value)}>
            <option value="">Filter by Course</option>
            {[...new Set(students.map((s) => s.course))].map((course) => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Student Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center">No students found</td>
            </tr>
          ) : (
            filteredStudents.map((student) => (
              <tr 
                key={student.id} 
                style={{ cursor: "pointer" }}
                onClick={() => editingId === student.id ? null : navigate(`/student/${student.id}`)}
              >
                <td>
                  {editingId === student.id ? (
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={editData.name || ""}
                      onChange={handleEditChange}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td>
                  {editingId === student.id ? (
                    <input
                      type="text"
                      className="form-control"
                      name="course"
                      value={editData.course || ""}
                      onChange={handleEditChange}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    student.course
                  )}
                </td>
                <td>
                  {editingId === student.id ? (
                    <input
                      type="text"
                      className="form-control"
                      name="year"
                      value={editData.year || ""}
                      onChange={handleEditChange}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    student.year
                  )}
                </td>
                <td>
                  {editingId === student.id ? (
                    <button className="btn btn-success btn-sm me-2" onClick={(e) => { e.stopPropagation(); saveEdit(student.id); }}>Save</button>
                  ) : (
                    <button className="btn btn-primary btn-sm me-2" onClick={(e) => { e.stopPropagation(); startEdit(student); }}>Edit</button>
                  )}
                  <button className="btn btn-danger btn-sm" onClick={(e) => { e.stopPropagation(); deleteStudent(student.id); }}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;