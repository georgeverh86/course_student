package com.unity_idea_company.basic_application.course_student_info.service;

import com.unity_idea_company.basic_application.course_student_info.entity.Course;
import com.unity_idea_company.basic_application.course_student_info.entity.Score;
import com.unity_idea_company.basic_application.course_student_info.entity.Student;

import java.util.List;

public interface CourseService {

    void addCourse(Course course);
    void deleteCourse (Long id);
    List<Course> getAllCourses();
    List<Student> getCourseDetail(Long id);

}
