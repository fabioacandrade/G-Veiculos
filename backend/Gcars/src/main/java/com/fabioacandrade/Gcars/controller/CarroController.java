package com.fabioacandrade.Gcars.controller;

import com.fabioacandrade.Gcars.model.Veiculo;
import com.fabioacandrade.Gcars.service.VeiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.*;


@RestController
@RequestMapping("/api/veiculo")
@CrossOrigin(origins = "*") // Possibilidade da API ser acessivel por várias aplicacoes
public class CarroController {

    @Autowired
    private VeiculoService carroService;

    @PostMapping
    public String cadastrarCarro(@Valid @RequestBody Veiculo veiculo, BindingResult result){
        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());
        veiculo.setHoraEntrada(timestamp);
        System.out.println("cadastrando veiculo com placa:  " + veiculo.getPlaca() + " " + veiculo.getHoraEntrada());
        carroService.saveDetails(veiculo);
        return "Cadastrado com sucesso!";
    }

    @GetMapping
    public List<Veiculo> listarVeiculos(){
        return carroService.getAllDetails();
    }

    @GetMapping("/{placa}")
    public Veiculo buscarVeiculoPorPlaca(@PathVariable String placa){
        return carroService.getVeiculoByPlaca(placa);
    }

}

