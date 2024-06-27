package com.fabioacandrade.Gcars.controller;


import com.fabioacandrade.Gcars.model.Admin;
import com.fabioacandrade.Gcars.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/{nome}")
    public Admin getAdminByNome(@PathVariable String nome) {
        return adminService.findByNome(nome);
    }

    @PostMapping
    public String saveAdmin(@RequestBody Admin admin) {
        adminService.save(admin);
        return admin.toString();
    }
}
