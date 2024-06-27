package com.fabioacandrade.Gcars.service;


import com.fabioacandrade.Gcars.model.Proprietario;
import com.fabioacandrade.Gcars.repository.ProprietarioRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProprietarioService {

    @Autowired
    private ProprietarioService proprietarioService;
    @Autowired
    private ProprietarioRepo proprietarioRepo;

    public List<Proprietario> findAllProprietarios() {
        return proprietarioService.findAllProprietarios();
    }

    public void save(Proprietario proprietario) {
        proprietarioRepo.save(proprietario);
    }
}
