package com.fabioacandrade.Gcars.service;


import com.fabioacandrade.Gcars.model.Admin;
import com.fabioacandrade.Gcars.repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminRepo;

    public Long save(Admin admin) throws Exception {
        Admin adminSaved = adminRepo.save(admin);
        return adminSaved.getId();
    }

    public Optional<Admin> findByNome(String nome) {
        return adminRepo.findByNome(nome);
    }

    public void delete(Admin admin) {
        adminRepo.delete(admin);
    }


}
