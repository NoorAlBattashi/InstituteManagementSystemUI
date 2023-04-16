package com.ims.institutemanagementsystem.service;


import com.ims.institutemanagementsystem.model.Teacher;
import com.ims.institutemanagementsystem.repository.TeacherRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;
    private static final Logger logger = LoggerFactory.getLogger(TeacherService.class);

    public List<Teacher> getAllTeachers() {
        try {
            logger.info("Getting all the teachers");
            return teacherRepository.findAll();
        } catch (Exception e) {
            logger.error("Error occurred while retrieving all the teachers: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    public Optional<Teacher> getTeacher(int id) {
        try {
            logger.info("Getting the Teacher with the id: " + id);
            return teacherRepository.findById(id);
        } catch (Exception e) {
            logger.error("Error occurred while retrieving Teacher with id " + id + ": Teacher not found");
            System.err.println("An error occurred while trying to retrieve Teacher with ID " + id + ": " + e.getMessage());
            return Optional.empty();
        }
    }

    public Teacher createTeacher(Teacher currTeacher) {
        try {
            logger.info("Created Teacher with the id: " + currTeacher.id);
            return teacherRepository.save(currTeacher);
        } catch (Exception e) {
            logger.error("Error occurred while creating Teacher: " + e.getMessage());
            throw new RuntimeException("Unable to create Teacher", e);
        }
    }

    public Optional<Teacher> updateParticularTeacher(int id, Teacher upToDateTeacher) {
        Optional<Teacher> optionalTeacher = teacherRepository.findById(id);
        try {
            optionalTeacher.ifPresent((Teacher) -> {
                Teacher.name = upToDateTeacher.name;
                Teacher.email = upToDateTeacher.email;
                logger.info("Updated the Teacher info with id: " + id);
                teacherRepository.save(Teacher);
            });
        } catch (Exception e) {
            logger.error("Error occurred while updating Teacher: Teacher with id " + id + " not found");
            System.out.println("Error updating Teacher: " + e.getMessage());
            return Optional.empty();
        }
        return optionalTeacher;
    }

    public void deleteParticularTeacher(int id) {
        try {
            teacherRepository.deleteById(id);
            logger.info("Deleted the Teacher with id: " + id);
            } catch (EmptyResultDataAccessException e) {{
                logger.error("Error occurred while deleting Teacher: Teacher with id " + id + " not found");
            System.out.println("Teacher with ID " + id + " does not exist.");
            }
        } catch (Exception e) {
            logger.error("Error occurred while deleting Teacher: " + e.getMessage());
            System.out.println("An error occurred while deleting Teacher with ID " + id + ": " + e.getMessage());
        }
    }
}