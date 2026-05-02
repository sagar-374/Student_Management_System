package com.example.demo;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class StudentService {

    private final StudentRepo repo;

    public StudentService(StudentRepo repo) {
        this.repo = repo;
    }

    // Register student
    public Student registerStudent(Student student) {
        return repo.save(student);
    }

    // Get all students
    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    // Delete student
    public void deleteStudent(Long id) {
        repo.deleteById(id);
    }

    // Update student
    public Student updateStudent(Long id, Student student) {
        Student existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));

        existing.setName(student.getName());
        existing.setEmail(student.getEmail());
        existing.setPassword(student.getPassword());
        existing.setContact(student.getContact());

        return repo.save(existing);
    }

    // Login
    public Student login(String email, String password) {
        return repo.findByEmailAndPassword(email, password).orElse(null);
    }
}
