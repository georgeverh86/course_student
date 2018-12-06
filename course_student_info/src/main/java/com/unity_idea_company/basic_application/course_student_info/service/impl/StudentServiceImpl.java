package com.unity_idea_company.basic_application.course_student_info.service.impl;

import com.unity_idea_company.basic_application.course_student_info.entity.Course;
import com.unity_idea_company.basic_application.course_student_info.entity.Student;
import com.unity_idea_company.basic_application.course_student_info.repository.CourseRepository;
import com.unity_idea_company.basic_application.course_student_info.repository.StudentRepository;
import com.unity_idea_company.basic_application.course_student_info.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public void addStudent(Student student) {
        studentRepository.save(student);
    }

    @Override
    public void deleteStudent (Long id) {
        studentRepository.deleteById(id);
    }

    @Override
    public List<Student> getStudents() {
        return studentRepository.getAllStudents();
    }

    @Override
    public List<Course> getStudentDetail(Long id) {
//        List<Course> courseList = courseRepository.getStudentDetail(id);
//        for (int i = 0; i < courseList.size(); i++) {
//            System.out.println(courseList.get(i).getScoreList());
//        }
        return courseRepository.getStudentDetail(id);
    }

}
