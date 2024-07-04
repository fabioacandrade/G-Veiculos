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
@CrossOrigin(origins = "http://localhost:3000")
public class VeiculoController {

    @Autowired
    private VeiculoService veiculoService;

    @PostMapping
    public ResponseEntity<Long> cadastrarVeiculo(@Valid @RequestBody VeiculoRequest veiculoRequest, BindingResult result) throws Exception {
        Long id = veiculoService.saveDetails(veiculoRequest);
        return ResponseEntity.ok(id);
    }

    @GetMapping
    public ResponseEntity<List<Veiculo>> listarVeiculos() throws Exception {
        return ResponseEntity.ok(veiculoService.getAllDetails());
    }

    @GetMapping("/placa/{placa}")
    public ResponseEntity<Veiculo> buscarVeiculoPorPlaca(@PathVariable String placa) throws Exception{
        return ResponseEntity.ok(veiculoService.getVeiculoByPlaca(placa));
    }

    @GetMapping("/proprietario/{placa}")
    public ResponseEntity<Proprietario> buscarProprietarioPorPlaca(@PathVariable String placa) throws Exception {
        return ResponseEntity.ok(veiculoService.getProprietarioByPlaca(placa));
    }

    @GetMapping("/listaEstacionados")
    public ResponseEntity<List<Veiculo>> listarEstacionados() throws Exception {
        return ResponseEntity.ok(veiculoService.getEstacionados());
    }

    @PutMapping("/marcarSaida/{id}")
    public ResponseEntity<Long>  marcarSaida(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(veiculoService.marcarSaida(id));
    }

    @PutMapping("/estacionar/{id}")
    public ResponseEntity<Long>  estacionar(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(veiculoService.estacionar(id));
    }


}

