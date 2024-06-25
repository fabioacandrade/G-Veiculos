package com.fabioacandrade.Gcars.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fabioacandrade.Gcars.model.Veiculo;

public interface VeiculoRepo extends JpaRepository<Veiculo,Integer> {
    public Veiculo findByPlaca(String placa);
}
