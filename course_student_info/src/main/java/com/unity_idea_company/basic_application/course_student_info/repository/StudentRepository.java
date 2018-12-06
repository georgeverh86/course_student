package com.unity_idea_company.basic_application.course_student_info.repository;

import com.unity_idea_company.basic_application.course_student_info.entity.Course;
import com.unity_idea_company.basic_application.course_student_info.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query(value = "select s.id as id, s.firstName as firstName, s.lastName, s.age, s.phone, s.mail from Student s")
    public List<Student> getAllStudents ();

    @Query(value = "select s.id, s.firstName, s.lastName, sc.id, sc.date, sc.mark from Course c " +
            "left join Score sc on c.id=sc.course left join Student s on sc.student=s.id where c.id=?1")
    public List<Student> getCourseDetail (Long id);
}
