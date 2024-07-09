package com.fabioacandrade.Gcars.repository;

import com.fabioacandrade.Gcars.model.Proprietario;
import org.springframework.data.jpa.repository.JpaRepository;
import com.fabioacandrade.Gcars.model.Veiculo;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VeiculoRepo extends JpaRepository<Veiculo,Long> {
    public Veiculo findByPlaca(String placa);
    public Proprietario findByProprietarioId(int proprietarioId);
    public List<Veiculo> findByProprietarioCpf(String cpf);
}
