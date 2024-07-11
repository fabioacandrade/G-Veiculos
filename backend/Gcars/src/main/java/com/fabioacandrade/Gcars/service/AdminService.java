package com.fabioacandrade.Gcars.service;


import com.fabioacandrade.Gcars.model.Admin;
import com.fabioacandrade.Gcars.model.Veiculo;
import com.fabioacandrade.Gcars.repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminRepo;

    public Long save(Admin admin) throws Exception {
        Admin adminSaved = adminRepo.save(admin);
        return adminSaved.getId();
    }

    public Admin findByNome(String nome) {
        Optional<Admin> admin = adminRepo.findByNome(nome);
        return admin.orElse(null);
    }

    public Long updateValorHora(String nome, Integer valorHora) throws Exception {
        Optional<Admin> admin = adminRepo.findByNome(nome);
        if (admin.isPresent()) {
            Admin adminSaved = admin.get();
            adminSaved.setValorHora(valorHora);
            adminRepo.save(adminSaved);
            return adminSaved.getId();
        }
        throw new Exception("Nenhum admin com esse nome!");
    }

    public List<Veiculo> getVeiculo(String adminNome) throws Exception {
        Optional<Admin> admin = adminRepo.findByNome(adminNome);
        if (admin.isPresent()) {
            Admin adminSaved = admin.get();
            return adminSaved.getVeiculos();
        }
        throw new Exception("Nenhum admin com esse nome!");
    }

    public void delete(Admin admin) {
        adminRepo.delete(admin);
    }


}
