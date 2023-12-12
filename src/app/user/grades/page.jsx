"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const GradesComponent = ({ id_user }) => {
  const [grades, setGrades] = useState([]);
  const { data: session, status } = useSession() 
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/api/grades/${session.user.id_user}`);
        setGrades(response.data);
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    fetchGrades();
  }, [session.user.id_user]);

  const groupGradesByCourse = () => {
    const groupedGrades = {};

    grades.forEach((grade) => {
      const courseId = grade.id_student_course;

      if (!groupedGrades[courseId]) {
        groupedGrades[courseId] = {
          course_name: grade.course_name,
          exams: [],
        };
      }

      groupedGrades[courseId].exams.push({
        exam_name: grade.exam_name,
        grade_value: grade.grade_value,
      });
    });

    return Object.values(groupedGrades);
  };

  const groupedCourses = groupGradesByCourse();

  return (
    <div className="w-3/4 mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Mis notas</h2>
      {groupedCourses.length > 0 ? (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2 text-center">Curso</th>
              <th className="border p-2 text-center">Examen</th>
              <th className="border p-2 text-center">Nota</th>
              <th className="border p-2 text-center">Promedio</th>
            </tr>
          </thead>
          <tbody>
            {groupedCourses.map((course) => (
              <tr key={course.course_name}>
                <td className="border p-2">{course.course_name}</td>
                <td className="border p-2">
                  {course.exams.map((exam, index) => (
                    <div key={index}>
                      <p className='text-center'>{exam.exam_name}</p>
                    </div>
                  ))}
                </td>
                <td className="border p-2">
                  {course.exams.map((exam, index) => (
                    <div key={index}>
                      <p className='text-center'>{exam.grade_value}</p>
                    </div>
                  ))}
                </td>
                <td className="border p-2 text-center">
                  {(
                    course.exams.reduce((total, exam) => total + exam.grade_value, 0) /
                    course.exams.length
                  ).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No hay notas disponibles.</p>
      )}
    </div>
  );
};

export default GradesComponent;
