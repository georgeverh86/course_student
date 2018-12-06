package com.unity_idea_company.basic_application.course_student_info.repository;

import com.unity_idea_company.basic_application.course_student_info.entity.Course;
import com.unity_idea_company.basic_application.course_student_info.entity.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {

    @Query(value = "select sc.id from Score sc where sc.student.id=?1 and sc.course.id=?2")
    public List<Score> getScoreId (Long studentId, Long courseId);

    @Query(value = "select sc from Score sc where sc.student.id=?1 and sc.course.id=?2")
    public List<Score> getDeleteScoreList (Long studentId, Long courseId);

    @Transactional
    @Modifying
    @Query("UPDATE Score c SET c.mark = ?2 WHERE c.id = ?1")
    public void setMark(Long id, String mark);

}
