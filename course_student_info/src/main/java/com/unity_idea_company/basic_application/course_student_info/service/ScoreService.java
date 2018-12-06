package com.unity_idea_company.basic_application.course_student_info.service;

import com.unity_idea_company.basic_application.course_student_info.entity.Course;
import com.unity_idea_company.basic_application.course_student_info.entity.Score;
import com.unity_idea_company.basic_application.course_student_info.entity.Student;

import java.sql.Date;
import java.util.List;

public interface ScoreService {

    void addScore(Long studentId, Long courseId);
    void deleteScore(Long studentId, Long courseId);
    void setMark(Long id, String mark);

}
