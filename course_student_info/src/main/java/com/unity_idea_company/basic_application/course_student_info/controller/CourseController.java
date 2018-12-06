package com.unity_idea_company.basic_application.course_student_info.controller;

import com.unity_idea_company.basic_application.course_student_info.entity.Course;
import com.unity_idea_company.basic_application.course_student_info.entity.Score;
import com.unity_idea_company.basic_application.course_student_info.entity.Student;
import com.unity_idea_company.basic_application.course_student_info.service.CourseService;
import com.unity_idea_company.basic_application.course_student_info.service.impl.CourseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CourseController {

    @Autowired
    CourseService courseService = new CourseServiceImpl();

    @CrossOrigin
    @PostMapping("/api/addCourse")
    public void addCourse(@RequestBody Course course) {
        courseService.addCourse(course);
    }

    @CrossOrigin
    @DeleteMapping("/api/deleteCourse/{id}")
    public void deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
    }

    @CrossOrigin
    @GetMapping("/api/getCourses")
    public List<Course> getCourses() {
        return courseService.getAllCourses();
    }

    @CrossOrigin
    @GetMapping("/api/getCourseDetail/{id}")
    public List<Student> getCourseDetail(@PathVariable Long id) {
        return courseService.getCourseDetail(id);
    }

}
