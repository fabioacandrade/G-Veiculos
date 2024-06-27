package com.fabioacandrade.Gcars.controller;


import com.fabioacandrade.Gcars.model.Proprietario;
import com.fabioacandrade.Gcars.service.ProprietarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proprietario")
@CrossOrigin(origins = "*")
public class ProprietarioController {

    @Autowired
    private ProprietarioService proprietarioService;

    @GetMapping
    public List<Proprietario> listar() {
        return proprietarioService.findAllProprietarios();
    }

    @PostMapping
    public String salvar(@RequestBody Proprietario proprietario) {
        proprietarioService.save(proprietario);
        return proprietario.toString();
    }
}
