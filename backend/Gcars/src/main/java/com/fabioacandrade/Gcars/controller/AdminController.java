package com.fabioacandrade.Gcars.controller;


import com.fabioacandrade.Gcars.model.Admin;
import com.fabioacandrade.Gcars.model.Proprietario;
import com.fabioacandrade.Gcars.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/{nome}")
    public Optional<Admin> getAdminByNome(@PathVariable String nome) {
        return adminService.findByNome(nome);
    }

    @PostMapping
    public ResponseEntity<Long> saveAdmin(@RequestBody Admin admin) throws Exception {
        return ResponseEntity.ok(adminService.save(admin));
    }
}
