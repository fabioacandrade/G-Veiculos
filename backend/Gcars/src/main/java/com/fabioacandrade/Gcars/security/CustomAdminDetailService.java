package com.fabioacandrade.Gcars.security;

import com.fabioacandrade.Gcars.model.Admin;
import com.fabioacandrade.Gcars.model.Role;
import com.fabioacandrade.Gcars.repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomAdminDetailService implements UserDetailsService {

    private AdminRepo adminRepository;

    @Autowired
    public CustomAdminDetailService(AdminRepo adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByNome(s).orElseThrow(() -> new UsernameNotFoundException("Admin not found"));
        return new User(admin.getNome(), admin.getSenha(), mapRolesToAuthorities(admin.getRoles()));
    }

    private Collection<GrantedAuthority> mapRolesToAuthorities(List<Role> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }
}
