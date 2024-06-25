package com.fabioacandrade.Gcars.repository;

import com.fabioacandrade.Gcars.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Integer> {
}
