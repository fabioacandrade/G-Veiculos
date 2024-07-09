package com.fabioacandrade.Gcars.controller;


import com.fabioacandrade.Gcars.model.Admin;
import com.fabioacandrade.Gcars.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/getByNome/{nome}")
    public ResponseEntity<Admin> getAdminByNome(@PathVariable String nome) {
        Admin admin = adminService.findByNome(nome);
        return ResponseEntity.ok().body(admin);
    }

    @PostMapping
    public ResponseEntity<Long> saveAdmin(@RequestBody Admin admin) throws Exception {
        return ResponseEntity.ok(adminService.save(admin));
    }

    @PutMapping("/setValorHoraByNome/{nome}/{valorHora}")
    public ResponseEntity<Long> saveValorHoraByNome(@PathVariable String nome , @PathVariable Integer valorHora ) throws Exception{
        return ResponseEntity.ok(adminService.updateValorHora(nome, valorHora));
    }


    @GetMapping("/getValorHoraByNome/{nome}")
    public ResponseEntity<Integer> getValorHoraByNome(@PathVariable String nome) {
        return ResponseEntity.ok(adminService.findByNome(nome).getValorHora());
    }
}
