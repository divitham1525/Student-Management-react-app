import React, { createContext, useState, ReactNode } from "react";
import { Student } from "../types/types";

// Define the context's shape (types for students and setStudents)
interface StudentContextType {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

// Creating the context with an undefined default value
export const StudentContext = createContext<StudentContextType | undefined>(undefined);

// StudentProvider to wrap around your app or specific components
export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // The state holds the list of students, which can be modified with setStudents
  const [students, setStudents] = useState<Student[]>([]);

  return (
    // Providing the context value to all children
    <StudentContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentContext.Provider>
  );
};