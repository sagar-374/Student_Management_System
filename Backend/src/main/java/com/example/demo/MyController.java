package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class MyController {

    @Autowired
    private StudentService ss;

    @GetMapping("/")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Tested OK");
    }

    @PostMapping("/register")
    public ResponseEntity<?> registration(@RequestBody Student s) {
        try {
            Student saved = ss.registerStudent(s);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration Failed");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Student s) {
        Student loggedIn = ss.login(s.getEmail(), s.getPassword());
        if (loggedIn != null) {
            return ResponseEntity.ok(loggedIn);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
        }
    }

    @GetMapping("/viewstudents")
    public ResponseEntity<List<Student>> viewStudents() {
        try {
            List<Student> data = ss.getAllStudents();
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/updatestudent/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Student s) {
        try {
            Student updated = ss.updateStudent(id, s);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student Not Found");
        }
    }

    @DeleteMapping("/deletestudent/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            ss.deleteStudent(id);
            return ResponseEntity.ok("Deleted Successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to Delete");
        }
    }
}



