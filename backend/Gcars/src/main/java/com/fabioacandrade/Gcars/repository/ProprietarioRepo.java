package com.fabioacandrade.Gcars.repository;

import com.fabioacandrade.Gcars.model.Proprietario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ProprietarioRepo extends JpaRepository<Proprietario, Long> {
    public Optional<List<Proprietario>> findByNome(String nome);
    public Optional<Proprietario> findByEmail(String email);
    public Optional<Proprietario> findByCpf(String proprietarioCPF);

    @Transactional
    @Modifying
    @Query("DELETE FROM Proprietario p WHERE p.id = :id")
    void deletePorId(Long id);
}
