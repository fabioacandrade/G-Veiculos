package com.fabioacandrade.Gcars.service;


import com.fabioacandrade.Gcars.model.Admin;
import com.fabioacandrade.Gcars.repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminRepo;

    public void save(Admin admin) {
        adminRepo.save(admin);
    }

    public Admin findByNome(String nome) {
        return adminRepo.findByNome(nome);
    }

    public void delete(Admin admin) {
        adminRepo.delete(admin);
    }


}
