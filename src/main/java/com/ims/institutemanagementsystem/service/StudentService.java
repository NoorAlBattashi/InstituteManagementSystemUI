package com.ims.institutemanagementsystem.service;

import com.ims.institutemanagementsystem.model.Student;
import com.ims.institutemanagementsystem.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    /**
     * Returns a list of all students in the system.
     *
     * @return a list of all students
     */
    public List<Student> getAllStudents() {
        try {
            return studentRepository.findAll();
        } catch (Exception e) {
            // Handle the exception
            e.printStackTrace();
            return null; // or throw a custom exception
        }
    }

    /**
     * Retrieves a student by their unique id.
     *
     * @param id the unique id of the student
     * @return the student object associated with the id, or null if no such student exists
     */
    public Optional<Student> getStudent(int id) {
        try {
            return studentRepository.findById(id);
        } catch (Exception e) {
            // Handle the exception
            System.err.println("An error occurred while trying to retrieve student with ID " + id + ": " + e.getMessage());
            return Optional.empty();
        }
    }


    /**
     * Adds a new student to the system.
     *
     * @param currStudent the student object to add to the system
     * @return the student object that was added to the system, including its generated unique id
     */
    public Student createStudent(Student currStudent) {
        try {
            return studentRepository.save(currStudent);
        } catch (Exception e) {
            // Log the exception or handle it in some other way
            throw new RuntimeException("Unable to create student", e);
        }
    }


    /**
     * Updates an existing student in the system.
     *
     * @param id              the unique id of the student to update
     * @param upToDateStudent the updated student object to replace the existing one
     * @return the updated student object
     */
    public Optional<Student> updateParticularStudent(int id, Student upToDateStudent) {
        Optional<Student> optionalStudent = studentRepository.findById(id);
        try {
            optionalStudent.ifPresent((Student) -> {
                Student.name = upToDateStudent.name;
                Student.email = upToDateStudent.email;
                studentRepository.save(Student);
            });
        } catch (Exception e) {
            // Handle the exception here, for example:
            System.out.println("Error updating student: " + e.getMessage());
            return Optional.empty();
        }
        return optionalStudent;
    }



    /**
     * Deletes a student from the system.
     *
     * @param id the unique id of the student to delete
     * @return the student object that was deleted from the system
     */
    public void deleteParticularStudent(int id) {
        try {
            studentRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            // Handle case where the specified student ID does not exist in the database
            System.out.println("Student with ID " + id + " does not exist.");
        } catch (Exception e) {
            // Handle any other exceptions that may occur
            System.out.println("An error occurred while deleting student with ID " + id + ": " + e.getMessage());
        }
    }

}

