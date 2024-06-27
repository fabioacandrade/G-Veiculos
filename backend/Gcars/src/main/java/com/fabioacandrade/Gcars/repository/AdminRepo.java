package com.fabioacandrade.Gcars.repository;

import com.fabioacandrade.Gcars.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<Admin,Long> {
    Admin findByNome(String nome);
}
