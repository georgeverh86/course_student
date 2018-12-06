package com.unity_idea_company.basic_application.course_student_info.service.impl;

import com.unity_idea_company.basic_application.course_student_info.entity.Course;
import com.unity_idea_company.basic_application.course_student_info.entity.Student;
import com.unity_idea_company.basic_application.course_student_info.repository.CourseRepository;
import com.unity_idea_company.basic_application.course_student_info.repository.StudentRepository;
import com.unity_idea_company.basic_application.course_student_info.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public void addCourse(Course course) {
        courseRepository.save(course);
    }

    @Override
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.getAllCourses();
    }

    @Override
    public List<Student> getCourseDetail(Long id) {
//        List<Student> studentList = studentRepository.getCourseDetail(id);
//        for (int i = 0; i < studentList.size(); i++) {
//            System.out.println(studentList.get(i).getScoreList());
//        }
        return studentRepository.getCourseDetail(id);
    }

}
