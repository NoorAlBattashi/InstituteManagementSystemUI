package com.ims.institutemanagementsystem.controller;
import com.ims.institutemanagementsystem.model.Teacher;
import com.ims.institutemanagementsystem.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(path = "/api/teacher")
@CrossOrigin("*")
public class TeacherController {
    @Autowired
    private TeacherService teacherService;// The TeacherService used for accessing teacher data

    /**
     * Endpoint for retrieving all teachers.
     * @return List of all teachers
     */
    @GetMapping
    public ResponseEntity<List<Teacher>> getTeachers() {
        try {
            List<Teacher> teachers = teacherService.getAllTeachers();
            return new ResponseEntity<>(teachers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint for retrieving a specific teacher by their ID.
     * @param id The ID of the desired teacher
     * @return The Teacher object associated with the given ID
     */
    @GetMapping(path = "/{id}")
    public ResponseEntity<Teacher> getTeacher(@PathVariable(name = "id") int id) {
        try {
            Teacher teacher = teacherService.getTeacher(id);
            return new ResponseEntity<>(teacher, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint for creating a new teacher.
     * @param name, email The Teacher object containing the information for the new teacher
     * @return The newly created Teacher object
     */
    @PostMapping
    public ResponseEntity<Teacher> createTeacher(@RequestParam String name, @RequestParam String email) {
        try {
            Teacher newTeacher = new Teacher();
            newTeacher.name = name;
            newTeacher.email = email;
            Teacher createdTeacher = teacherService.createTeacher(newTeacher);
            return new ResponseEntity<>(createdTeacher, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint for updating an existing teacher.
     * @param id The ID of the teacher to be updated
     * @param name, email The updated Teacher object
     * @return The updated Teacher object
     */
    @PutMapping(path = "/{id}")
    public ResponseEntity<Teacher> updateTeacher(@PathVariable(name = "id") int id, @RequestParam String name, @RequestParam String email) {
        try {
            Teacher UpdateTeacher = new Teacher();
            UpdateTeacher.name = name;
            UpdateTeacher.email = email;
            Teacher updatedTeacher = teacherService.updateTeacher(id, UpdateTeacher);
            return new ResponseEntity<>(updatedTeacher, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint for deleting an existing teacher.
     * @param id The ID of the teacher to be deleted
     * @return The deleted Teacher object
     */
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Teacher> deleteTeacher(@PathVariable(name = "id") int id) {
        try {
            Teacher deletedTeacher = teacherService.deleteTeacher(id);
            return new ResponseEntity<>(deletedTeacher, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
