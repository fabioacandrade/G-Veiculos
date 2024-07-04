package com.fabioacandrade.Gcars.repository;

import com.fabioacandrade.Gcars.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepo extends JpaRepository<Admin,Long> {
    Optional<Admin> findByNome(String nome);
    Boolean existsByNome(String nome);

    Optional<Admin> findByEmail(String email);
    Boolean existsByEmail(String email);

}
