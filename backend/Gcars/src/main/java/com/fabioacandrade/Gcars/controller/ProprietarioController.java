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

//    @GetMapping("/{id}")
//    public ResponseEntity<Proprietario> getProprietarioById(@PathVariable Long id) throws Exception{
//        return ResponseEntity.ok(proprietarioService.findById(id));
//    }

    @GetMapping("/cpf/{cpf}/{nomeAdmin}")
    public ResponseEntity<Proprietario> getProprietarioByCpf(@PathVariable String cpf, @PathVariable String nomeAdmin) throws Exception {
        return ResponseEntity.ok(proprietarioService.findByCpf(cpf, nomeAdmin));
    }

    @GetMapping("/list/{nomeAdmin}")
    public ResponseEntity<List<Proprietario>> getProprietarioList(@PathVariable String nomeAdmin) throws Exception{
        return ResponseEntity.ok(proprietarioService.findAllProprietario(nomeAdmin));
    }

    @GetMapping("/buscarNome/{nome}/{nomeAdmin}")
    public ResponseEntity<List<Proprietario>> getProprietarioByNome(@PathVariable String nome ,@PathVariable String nomeAdmin) throws Exception{
        return ResponseEntity.ok(proprietarioService.findByNome(nome, nomeAdmin));
    }

    @GetMapping("veiculos/{cpf}/{nomeAdmin}")
    public ResponseEntity<List<Veiculo>> getProprietarioVeiculos(@PathVariable String cpf,@PathVariable String nomeAdmin) throws Exception{
        return ResponseEntity.ok(proprietarioService.findVeiculosByProprietarioCpf( cpf, nomeAdmin ));
    }

    @PostMapping("{nomeAdmin}")
    public ResponseEntity<Long> saveProprietario(@RequestBody Proprietario proprietario, @PathVariable String nomeAdmin) throws Exception {
        return ResponseEntity.ok(proprietarioService.saveProprietario(proprietario, nomeAdmin));
    }

    @DeleteMapping("{cpf}/{nomeAdmin}")
    public ResponseEntity<String> deleteProprietario(@PathVariable String cpf, @PathVariable String nomeAdmin) throws Exception {
        proprietarioService.excluirProprietario(cpf,nomeAdmin);
        return ResponseEntity.ok("Proprietario com cpf: " + cpf + "excluido com sucesso");
    }

}
