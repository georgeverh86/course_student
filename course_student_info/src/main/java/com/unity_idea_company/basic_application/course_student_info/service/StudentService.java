package com.unity_idea_company.basic_application.course_student_info.service;

import com.unity_idea_company.basic_application.course_student_info.entity.Course;
import com.unity_idea_company.basic_application.course_student_info.entity.Student;

import java.util.List;

public interface StudentService {

    void addStudent(Student student);
    void deleteStudent (Long id);
    List<Student> getStudents();
    List<Course> getStudentDetail(Long id);
}
