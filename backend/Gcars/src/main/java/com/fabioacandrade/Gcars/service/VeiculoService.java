package com.fabioacandrade.Gcars.service;

import com.fabioacandrade.Gcars.dto.veiculo.request.VeiculoRequest;
import com.fabioacandrade.Gcars.model.Admin;
import com.fabioacandrade.Gcars.model.Proprietario;
import com.fabioacandrade.Gcars.model.Veiculo;
import com.fabioacandrade.Gcars.repository.AdminRepo;
import com.fabioacandrade.Gcars.repository.ProprietarioRepo;
import com.fabioacandrade.Gcars.repository.VeiculoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepo veiculoRepo;

    @Autowired
    private ProprietarioRepo proprietarioRepo;

    @Autowired
    private AdminRepo adminRepo;

    public Long saveDetails(VeiculoRequest veiculoRequest) throws Exception {

        try {
            Optional<Proprietario> proprietario = proprietarioRepo.findByCpf(veiculoRequest.getProprietarioCPF());
            Optional<Admin> admin = adminRepo.findById(veiculoRequest.getAdmin());

            Veiculo veiculo = new Veiculo();
            veiculo.setCor(veiculoRequest.getCor());
            veiculo.setAno(veiculoRequest.getAno());
            veiculo.setHoraEntrada(LocalDateTime.now().toString());
            veiculo.setPlaca(veiculoRequest.getPlaca());
            veiculo.setModelo(veiculoRequest.getModelo());
            veiculo.setTipo(veiculoRequest.getTipo());
            veiculo.setEstacionado(veiculoRequest.isEstacionado());
            veiculo.setMarca(veiculoRequest.getMarca());

            if (admin.isPresent()) {
                veiculo.setAdmin(admin.get());
            } else {
                throw new Exception("Admin not found");
            }

            if (proprietario.isPresent()) {
                veiculo.setProprietario(proprietario.get());
            } else {
                throw new Exception("Proprietario not found");
            }

            Veiculo save = veiculoRepo.save(veiculo);

            return save.getId();

        } catch (Exception e) {
            throw new RuntimeException("Error saving vehicle details: " + e.getMessage());
        }
    }


    public List<Veiculo> getAllDetails() throws Exception {
        try {
            return veiculoRepo.findAll();

        } catch (Exception e) {
            throw new RuntimeException("Error getting all Vehicle Details " + e.getMessage());
        }

    }

    public Veiculo getVeiculoByPlaca(String placa) throws Exception{
        Veiculo veiculo = veiculoRepo.findByPlaca(placa);
        if(veiculo == null) {
            throw new Exception("Veículo não encontrado para a placa");
        }
        return veiculo;
    }


    public Proprietario getProprietarioByPlaca(String placa) throws Exception {

        Veiculo veiculo = veiculoRepo.findByPlaca(placa);
        Proprietario proprietario = veiculo.getProprietario();

        if(proprietario == null) {
            throw new Exception("Proprietário não encontrado!");
        }

        return proprietario;
    }

    public List<Veiculo> getEstacionados() throws Exception {
        List<Veiculo> veiculos = veiculoRepo.findAll();
        if(veiculos.isEmpty()){
            throw new Exception("Nenhum veículo cadastrado!");
        }
        List<Veiculo> veiculosEstacionados = new ArrayList<>();

        for(Veiculo veiculo : veiculos){
            if(veiculo.isEstacionado()){
                veiculosEstacionados.add(veiculo);
            }
        }

        if(veiculosEstacionados.isEmpty()){
            throw new Exception("Nenhum veículo estacionado!");
        }

        return veiculosEstacionados;

    }

    public Long marcarSaida(Long id) throws Exception {
        Optional<Veiculo> veiculo = veiculoRepo.findById(id);
        if(veiculo.isPresent()) {
            Veiculo veiculoSaida = veiculo.get();
            veiculoSaida.setEstacionado(false);
            veiculoRepo.save(veiculoSaida);
            return veiculoSaida.getId();
        }
        throw new Exception("Veiculo não encontrado");
    }

    public Long estacionar(Long id) throws Exception {
        Optional<Veiculo> veiculo = veiculoRepo.findById(id);
        if(veiculo.isPresent()) {
            Veiculo veiculoSaida = veiculo.get();
            veiculoSaida.setEstacionado(true);
            veiculoSaida.setHoraEntrada(LocalDateTime.now().toString());
            veiculoRepo.save(veiculoSaida);
            return veiculoSaida.getId();
        }
        throw new Exception("Veiculo não encontrado");
    }
}
