package com.unity_idea_company.basic_application.course_student_info.repository;

import com.unity_idea_company.basic_application.course_student_info.entity.Course;
import com.unity_idea_company.basic_application.course_student_info.entity.Score;
import com.unity_idea_company.basic_application.course_student_info.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query(value = "select c.id, c.name, c.startDate, c.endDate from Course c")
    public List<Course> getAllCourses ();

    @Query(value = "select c from Course c where c.id=?1")
    public Course getCourseDate (Long id);

    @Query(value = "select c.id, c.name, c.startDate, c.endDate, sc.id, sc.date, sc.mark from Student s " +
            "left join Score sc on s.id=sc.student left join Course c on sc.course=c.id where s.id=?1")
    public List<Course> getStudentDetail (Long id);

//    @Query(value = "select c.id, c.name, c.startDate, c.endDate, sc.id, sc.date, sc.mark from Course c " +
//            "left join Score sc on sc.course=c.id left join Student s on s.id=sc.student where s.id=?1")
//    public List<Course> getStudentDetail (Long id);

}
