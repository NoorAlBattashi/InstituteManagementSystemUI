package com.ims.institutemanagementsystem.controller;

import com.ims.institutemanagementsystem.model.Teacher;
import com.ims.institutemanagementsystem.service.TeacherService;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/teacher")
@CrossOrigin("*")
public class TeacherController {
    @Autowired
    private TeacherService teacherService;

    @GetMapping
    public ResponseEntity<List<Teacher>> getTeachers() {
        try {
            List<Teacher> teachers = teacherService.getAllTeachers();
            return new ResponseEntity<>(teachers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Teacher> getTeacher(@PathVariable(name = "id") int id) {
        try {
            Optional<Teacher> teacher = teacherService.getTeacher(id);
            if(teacher.isPresent()){
                return ResponseEntity.ok(teacher.get());
            }else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<Teacher> createTeacher(@RequestBody Teacher newTeacher) {
        try {
            Teacher createdTeacher = teacherService.createTeacher(newTeacher);
            return new ResponseEntity<>(createdTeacher, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/withImage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Teacher> createTeacherWithImage(@RequestParam String name,
                                                          @RequestParam String email,
                                                          @RequestParam(required = false) MultipartFile image) {
        try {
            Teacher newTeacher = new Teacher();
            newTeacher.name = name;
            newTeacher.email = email;
            Teacher savedTeacher = teacherService.createTeacher(newTeacher);

            if (image != null) {
                savedTeacher.imageName = Integer.toString(savedTeacher.id) + "_" + savedTeacher.name + ".jpg";
                FileUtils.writeByteArrayToFile(new File("./src/main/resources/static/staff/staff_images/" + savedTeacher.imageName), image.getBytes());
                teacherService.updateParticularTeacher(savedTeacher.id, savedTeacher);
            }

            return new ResponseEntity<>(savedTeacher, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Optional<Teacher>> updateTeacher(@PathVariable(name = "id") int id, @RequestParam String name, @RequestParam String email) {
        try {
           // Optional<Teacher> updatedStudent = teacherService.updateParticularTeacher(id, currStudent);
            Teacher UpdateTeacher = new Teacher();
            UpdateTeacher.name = name;
            UpdateTeacher.email = email;
            Optional<Teacher> updatedTeacher = teacherService.updateParticularTeacher(id, UpdateTeacher);
            return ResponseEntity.ok(updatedTeacher);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Teacher> deleteTeacher(@PathVariable(name = "id") int id) {
        try {
            teacherService.deleteParticularTeacher(id);
            return ResponseEntity.ok().build();
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
