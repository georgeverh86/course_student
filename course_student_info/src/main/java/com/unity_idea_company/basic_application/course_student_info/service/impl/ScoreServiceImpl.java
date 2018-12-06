package com.unity_idea_company.basic_application.course_student_info.service.impl;

import com.unity_idea_company.basic_application.course_student_info.entity.Course;
import com.unity_idea_company.basic_application.course_student_info.entity.Score;
import com.unity_idea_company.basic_application.course_student_info.entity.Student;
import com.unity_idea_company.basic_application.course_student_info.repository.CourseRepository;
import com.unity_idea_company.basic_application.course_student_info.repository.ScoreRepository;
import com.unity_idea_company.basic_application.course_student_info.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class ScoreServiceImpl implements ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public void addScore(Long studentId, Long courseId) {
        List<Score> scoreIdCheck = scoreRepository.getScoreId(studentId, courseId);
        if (scoreIdCheck.size() == 0) {
            List<Score> markList = new ArrayList<>();
            Course course = courseRepository.getCourseDate(courseId);
            Long startTime = course.getStartDate().getTime();
            Long endTime = course.getEndDate().getTime();
            boolean dateFinish = true;
            Long dayPeriod = new Long(1000 * 3600 * 24);
            while (dateFinish) {
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date date = new Date(startTime);
                System.out.println(date);
                String courseDay = simpleDateFormat.format(date);
                Score scoreForAdd = new Score();
                scoreForAdd.setDate(Date.valueOf(courseDay));
                Course courseForScore = new Course();
                courseForScore.setId(courseId);
                Student studentForScore = new Student();
                studentForScore.setId(studentId);
                scoreForAdd.setCourse(courseForScore);
                scoreForAdd.setStudent(studentForScore);
                markList.add(scoreForAdd);
                startTime = startTime + dayPeriod;
                if (startTime > endTime) {
                    dateFinish = false;
                }
            }
            scoreRepository.saveAll(markList);
        } else {
            System.out.println("Duplicate Student on Course!");
        }
    }

    @Override
    public void deleteScore(Long studentId, Long courseId) {
        List<Score> deleteScoreList = scoreRepository.getDeleteScoreList(studentId, courseId);
        scoreRepository.deleteInBatch(deleteScoreList);
    }

    @Override
    public void setMark(Long id, String mark) {
        scoreRepository.setMark(id, mark);
    }


}
