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

    public void saveDetails(VeiculoRequest veiculoRequest){
        Optional<Proprietario> proprietario = proprietarioRepo.findById(veiculoRequest.getProprietario());
        Optional<Admin> admin = adminRepo.findById(veiculoRequest.getAdmin());

        Veiculo veiculo = new Veiculo();
        veiculo.setCor(veiculoRequest.getCor());
        veiculo.setAno(veiculoRequest.getAno());
        veiculo.setHoraEntrada(LocalDateTime.now());
        veiculo.setPlaca(veiculoRequest.getPlaca());
        veiculo.setModelo(veiculoRequest.getModelo());
        veiculo.setTipo(veiculoRequest.getTipo());

        if(admin.isPresent()){
            veiculo.setAdmin(admin.get());
        }

        if(proprietario.isPresent()){
            veiculo.setProprietario(proprietario.get());
        }

        veiculoRepo.save(veiculo);

    }

    public List<Veiculo> getAllDetails(){
        return veiculoRepo.findAll();
    }

    public Veiculo getVeiculoById(Long id){
        return veiculoRepo.findById(id).orElse(null);
    }

    public Veiculo getVeiculoByPlaca(String placa){
        return veiculoRepo.findByPlaca(placa);
    }

    public Veiculo updateVeiculo(Veiculo veiculo){
        Veiculo veiculoUpdated = veiculoRepo.findById(veiculo.getId()).orElse(null);
        if(veiculoUpdated != null){
            veiculoUpdated.setPlaca(veiculo.getPlaca());
            veiculoUpdated.setModelo(veiculo.getModelo());
            veiculoUpdated.setAno(veiculo.getAno());
            veiculoRepo.save(veiculoUpdated);
            System.out.println("Updated " + veiculoUpdated.getPlaca());
            return veiculoUpdated;
        }
        return null;
    }

    public String deleteVeiculo(Long id){
        if(veiculoRepo.existsById(id)) {
            veiculoRepo.deleteById(id);
            return "Deletado " + id;
        } else {
            return "Veículo Não Existente " + id;
        }
    }

    public Proprietario getProprietarioById(int id){
        return veiculoRepo.findByProprietarioId(id);
    }
}
