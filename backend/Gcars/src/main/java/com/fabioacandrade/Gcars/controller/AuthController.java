package com.fabioacandrade.Gcars.controller;


import com.fabioacandrade.Gcars.dto.veiculo.request.AuthResponseDto;
import com.fabioacandrade.Gcars.dto.veiculo.request.LoginDto;
import com.fabioacandrade.Gcars.dto.veiculo.request.RegisterDto;
import com.fabioacandrade.Gcars.model.Admin;
import com.fabioacandrade.Gcars.model.Role;
import com.fabioacandrade.Gcars.repository.AdminRepo;
import com.fabioacandrade.Gcars.repository.RoleRepository;
import com.fabioacandrade.Gcars.security.JwtGenerator;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private AuthenticationManager authenticationManager;
    private AdminRepo adminRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JwtGenerator jwtGenerator;

    @Autowired
    public AuthController(PasswordEncoder passwordEncoder, RoleRepository roleRepository, AdminRepo adminRepository, AuthenticationManager authenticationManager, JwtGenerator jwtGenerator) {
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.adminRepository = adminRepository;
        this.authenticationManager = authenticationManager;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getNome(),loginDto.getSenha()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDto(token), HttpStatus.OK);

    }


    @PostMapping("register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterDto registerDTO) {
        if(adminRepository.existsByNome(registerDTO.getNome())){
            return new ResponseEntity<>("Nome ja está cadastrado", HttpStatus.BAD_REQUEST);
        }

        if(adminRepository.existsByEmail(registerDTO.getEmail())){
            return new ResponseEntity<>("Email ja existente", HttpStatus.BAD_REQUEST);
        }


        Admin admin = new Admin();
        admin.setNome(registerDTO.getNome());
        admin.setSenha(passwordEncoder.encode((registerDTO.getSenha())));
        admin.setEmail(registerDTO.getEmail());

        // Obter a role "ADMIN" de maneira segura
        Optional<Role> optionalRole = roleRepository.findByName("ADMIN");
        if (optionalRole.isPresent()) {
            admin.setRoles(Collections.singletonList(optionalRole.get()));
        } else {
            return new ResponseEntity<>("Role 'ADMIN' não encontrada", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        adminRepository.save(admin);

        return new ResponseEntity<>("Usuario cadastrado com sucesso", HttpStatus.OK);
    }

    @PostMapping("validateToken")
    public ResponseEntity<String> validateToken(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        boolean isValid = jwtGenerator.validateToken(token);

        if (isValid) {
            Claims claims = jwtGenerator.getClaimsFromToken(token);
            Date expirationDate = claims.getExpiration();
            long secondsLeft = (expirationDate.getTime() - System.currentTimeMillis()) / 1000;
            System.out.println("Faltam " + secondsLeft + " segundos");

            return new ResponseEntity<>("Token é válido", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Token é inválido ou expirado", HttpStatus.BAD_REQUEST);
        }
    }
    
}
