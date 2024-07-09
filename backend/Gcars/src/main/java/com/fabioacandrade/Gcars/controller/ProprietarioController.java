package com.fabioacandrade.Gcars.controller;


import com.fabioacandrade.Gcars.model.Proprietario;
import com.fabioacandrade.Gcars.model.Veiculo;
import com.fabioacandrade.Gcars.service.ProprietarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proprietario")
@CrossOrigin(origins = "http://localhost:3000")
public class ProprietarioController {

    @Autowired
    private ProprietarioService proprietarioService;

    @GetMapping("/{id}")
    public ResponseEntity<Proprietario> getProprietarioById(@PathVariable Long id) throws Exception{
        return ResponseEntity.ok(proprietarioService.findById(id));
    }

    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<Proprietario> getProprietarioByCpf(@PathVariable String cpf) throws Exception{
        return ResponseEntity.ok(proprietarioService.findByCpf(cpf));
    }

    @GetMapping("/list")
    public ResponseEntity<List<Proprietario>> getProprietarioList() throws Exception{
        return ResponseEntity.ok(proprietarioService.findAllProprietario());
    }

    @GetMapping("/buscarNome/{nome}")
    public ResponseEntity<List<Proprietario>> getProprietarioByNome(@PathVariable String nome) throws Exception{
        return ResponseEntity.ok(proprietarioService.findByNome(nome));
    }

    @GetMapping("veiculos/{cpf}")
    public ResponseEntity<List<Veiculo>> getProprietarioVeiculos(@PathVariable String cpf) throws Exception{
        return ResponseEntity.ok(proprietarioService.findVeiculosByProprietarioCpf(cpf));
    }

    @PostMapping
    public ResponseEntity<Long> saveProprietario(@RequestBody Proprietario proprietario) throws Exception {
        return ResponseEntity.ok(proprietarioService.saveProprietario(proprietario));
    }

}
