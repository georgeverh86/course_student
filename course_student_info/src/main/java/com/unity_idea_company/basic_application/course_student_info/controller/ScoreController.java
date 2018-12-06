package com.unity_idea_company.basic_application.course_student_info.controller;

import com.unity_idea_company.basic_application.course_student_info.entity.Course;
import com.unity_idea_company.basic_application.course_student_info.entity.Score;
import com.unity_idea_company.basic_application.course_student_info.entity.Student;
import com.unity_idea_company.basic_application.course_student_info.service.CourseService;
import com.unity_idea_company.basic_application.course_student_info.service.ScoreService;
import com.unity_idea_company.basic_application.course_student_info.service.impl.CourseServiceImpl;
import com.unity_idea_company.basic_application.course_student_info.service.impl.ScoreServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ScoreController {

    @Autowired
    ScoreService scoreService = new ScoreServiceImpl();

    @CrossOrigin
    @PostMapping("/api/addCourseToStudent")
    public void addCourseToStudent(@RequestParam("studentId") Long studentId,
                                   @RequestParam("courseId") Long courseId) {
        scoreService.addScore(studentId, courseId);
    }

    @CrossOrigin
    @DeleteMapping("/api/deleteScore")
    public void deleteCourseToStudent(@RequestParam("studentId") Long studentId,
                                      @RequestParam("courseId") Long courseId) {
        scoreService.deleteScore(studentId, courseId);
    }

    @CrossOrigin
    @PutMapping("/api/setMark")
    public void setMark(@RequestParam("scoreId") Long id,
                        @RequestParam("mark") String mark) {
        scoreService.setMark(id, mark);
    }
}
