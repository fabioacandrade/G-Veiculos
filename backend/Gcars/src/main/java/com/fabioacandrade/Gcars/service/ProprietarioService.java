package com.fabioacandrade.Gcars.service;


import com.fabioacandrade.Gcars.model.Proprietario;
import com.fabioacandrade.Gcars.model.Veiculo;
import com.fabioacandrade.Gcars.repository.ProprietarioRepo;
import com.fabioacandrade.Gcars.repository.VeiculoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class ProprietarioService {

    @Autowired
    private ProprietarioRepo proprietarioRepo;

    @Autowired
    private VeiculoRepo veiculoRepo;

    public List<Proprietario> findAllProprietario() throws Exception{
        List<Proprietario> proprietarios = proprietarioRepo.findAll();

        if(proprietarios.isEmpty()) {
            throw new Exception("Nenhum proprietário cadastrado!");
        }
        return proprietarios;
    }


    public Long saveProprietario(Proprietario proprietario) throws Exception {
        Proprietario proprietarioSalvo = proprietarioRepo.save(proprietario);
        return proprietarioSalvo.getId();
    }


    public Proprietario findById(Long id) throws Exception {
        Optional<Proprietario> proprietario = proprietarioRepo.findById(id);

        if(proprietario.isPresent()) {
            return proprietario.get();
        }

        throw new Exception("Proprietário não encontrado!");
    }

    public Proprietario findByCpf(String cpf) throws Exception {
        Optional<Proprietario> proprietario = proprietarioRepo.findByCpf(cpf);

        if(proprietario.isPresent()) {
            return proprietario.get();
        }

        throw new Exception("Proprietário não encontrado para tal cpf");
    }

    public List<Proprietario> findByNome(String nome) throws Exception {

        Optional<List<Proprietario>> proprietario = proprietarioRepo.findByNome(nome);

        if(proprietario.isEmpty()) {
            throw new Exception("Nenhum proprietario encontrado com esse Nome!");
        }

        return proprietario.get();
    }

    public List<Veiculo> findVeiculosByProprietarioCpf(String cpf) throws Exception {
        List<Veiculo> veiculos = veiculoRepo.findByProprietarioCpf(cpf);

        if (veiculos.isEmpty()) {
            throw new Exception("Nenhum veículo encontrado para o proprietário com CPF: " + cpf);
        }
        return veiculos;
    }
}
