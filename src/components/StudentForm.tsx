import React, { useState, useContext } from "react";
import { StudentContext } from "../context/StudentContext";
import { Student } from "../types/types";

const StudentForm: React.FC = () => {
  const context = useContext(StudentContext);
  if (!context) throw new Error("StudentForm must be used within a StudentProvider");
  
  const { students, setStudents } = context;

  const [formData, setFormData] = useState<Student>({
    id: Date.now(),
    name: "",
    gender: "",
    dob: "",
    year: "",
    course: "",
    street: "",
    city: "",
    state: "",
    postal: "",
    phone: "",
    email: "",
  });

  const [error, setError] = useState<string | null>(null); // To handle error messages
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // To display success message

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.gender || !formData.dob || !formData.year || !formData.course || !formData.phone || !formData.email) {
      setError("All fields are required.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Add new student to the list
    setStudents([...students, formData]);

    // Reset the form
    setFormData({
      id: Date.now(),
      name: "",
      gender: "",
      dob: "",
      year: "",
      course: "",
      street: "",
      city: "",
      state: "",
      postal: "",
      phone: "",
      email: "",
    });

    // Set success message
    setSuccessMessage("Student information successfully added!");
    
    // Clear error message if present
    setError(null);
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h2 className="mb-4 text-center">Student Information Form</h2>
        
        {/* Error or Success message */}
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label">Name:</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Gender:</label>
              <select
                name="gender"
                className="form-select"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Date of Birth:</label>
              <input
                type="date"
                name="dob"
                className="form-control"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Year of Admission:</label>
            <input
              type="number"
              name="year"
              className="form-control"
              value={formData.year}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Course:</label>
            <select
              name="course"
              className="form-select"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="computer_science">Computer Science</option>
              <option value="electronics">Electronics</option>
              <option value="mechanical">Mechanical</option>
              <option value="civil">Civil</option>
            </select>
          </div>

          <fieldset className="mb-3 border p-3 rounded">
            <legend className="w-auto">Address</legend>
            <input
              type="text"
              name="street"
              className="form-control mb-2"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              className="form-control mb-2"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="state"
              className="form-control mb-2"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />
            <input
              type="text"
              name="postal"
              className="form-control"
              placeholder="Postal Code"
              value={formData.postal}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset className="mb-3 border p-3 rounded">
            <legend className="w-auto">Contact Information</legend>
            <div className="mb-3">
              <label className="form-label">Phone Number:</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </fieldset>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;