package com.fabioacandrade.Gcars.service;

import com.fabioacandrade.Gcars.model.Veiculo;
import com.fabioacandrade.Gcars.repository.VeiculoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepo veiculoRepo;

    public void saveDetails(Veiculo veiculo){
        veiculoRepo.save(veiculo);
    }

    public List<Veiculo> getAllDetails(){
        return veiculoRepo.findAll();
    }

    public Veiculo getVeiculoById(int id){
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

    public String deleteVeiculo(int id){
        if(veiculoRepo.existsById(id)) {
            veiculoRepo.deleteById(id);
            return "Deletado " + id;
        } else {
            return "Veículo Não Existente " + id;
        }
    }
}
