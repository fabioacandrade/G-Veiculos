package com.fabioacandrade.Gcars.controller;

import com.fabioacandrade.Gcars.dto.veiculo.request.VeiculoRequest;
import com.fabioacandrade.Gcars.model.Proprietario;
import com.fabioacandrade.Gcars.model.Veiculo;
import com.fabioacandrade.Gcars.service.VeiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;


@RestController
@RequestMapping("/api/veiculo")
@CrossOrigin(origins = "*") // Possibilidade da API ser acessivel por várias aplicacoes
public class VeiculoController {

    @Autowired
    private VeiculoService veiculoService;

    @PostMapping
    public ResponseEntity<?> cadastrarVeiculo(@Valid @RequestBody VeiculoRequest veiculoRequest, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        veiculoService.saveDetails(veiculoRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<Veiculo> listarVeiculos(){
        return veiculoService.getAllDetails();
    }

    @GetMapping("/{placa}")
    public Veiculo buscarVeiculoPorPlaca(@PathVariable String placa){
        return veiculoService.getVeiculoByPlaca(placa);
    }

    @GetMapping("/{proprietarioId}")
    public Proprietario buscarProprietarioPorId(@PathVariable int proprietarioId){
        Proprietario proprietario = new Proprietario();
        proprietario = veiculoService.getProprietarioById(proprietarioId);
        System.out.println(proprietario.getNome());
        return proprietario;
    }
}

