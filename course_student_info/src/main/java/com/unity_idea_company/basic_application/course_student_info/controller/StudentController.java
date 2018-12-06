package com.unity_idea_company.basic_application.course_student_info.controller;

import com.unity_idea_company.basic_application.course_student_info.entity.Course;
import com.unity_idea_company.basic_application.course_student_info.entity.Student;
import com.unity_idea_company.basic_application.course_student_info.service.StudentService;
import com.unity_idea_company.basic_application.course_student_info.service.impl.StudentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController {

    @Autowired
    StudentService studentService = new StudentServiceImpl();

    @CrossOrigin
    @PostMapping("/api/addStudent")
    public void addStudent(@RequestBody Student student) {
        studentService.addStudent(student);
    }

    @CrossOrigin
    @DeleteMapping("/api/deleteStudent/{id}")
    public void  deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }

    @CrossOrigin
    @GetMapping("/api/getStudents")
    public List<Student> getStudents() {
        return studentService.getStudents();
    }

    @CrossOrigin
    @GetMapping("/api/getStudentDetail/{id}")
    public List<Course> getStudentDetail(@PathVariable Long id) {
        return studentService.getStudentDetail(id);
    }


}
