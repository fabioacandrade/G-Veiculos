package com.fabioacandrade.Gcars.service;

import com.fabioacandrade.Gcars.dto.veiculo.request.VeiculoRequest;
import com.fabioacandrade.Gcars.model.Admin;
import com.fabioacandrade.Gcars.model.Proprietario;
import com.fabioacandrade.Gcars.model.Veiculo;
import com.fabioacandrade.Gcars.repository.AdminRepo;
import com.fabioacandrade.Gcars.repository.ProprietarioRepo;
import com.fabioacandrade.Gcars.repository.VeiculoRepo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
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

    private static final Logger logger = LoggerFactory.getLogger(VeiculoService.class);

    public Long saveDetails(VeiculoRequest veiculoRequest) throws Exception {

        try {

            Optional<Admin> admin = adminRepo.findByNome(veiculoRequest.getAdminNome());

            if(admin.isEmpty()){
                throw new Exception("Admin não encontrado!");
            }

            Admin adminSaved = admin.get();
            Veiculo veiculo = new Veiculo();
            boolean prop = false;


            List<Proprietario> proprietarios = adminSaved.getProprietarios();

            for(Proprietario proprietario : proprietarios){
                if(proprietario.getCpf().equals(veiculoRequest.getProprietarioCPF())){
                    veiculo.setProprietario(proprietario);
                    prop = true;
                }
            }

            if(!prop){
                throw new Exception("Nenhum Proprietario encontrado!");
            }


            for(Veiculo v : adminSaved.getVeiculos()){
                if( v.getPlaca().equals(veiculoRequest.getPlaca()) ){
                    throw new Exception("Placa já cadastrada!");
                }
            }

            veiculo.setCor(veiculoRequest.getCor());
            veiculo.setAno(veiculoRequest.getAno());
            veiculo.setHoraEntrada(ZonedDateTime.now(ZoneId.of("America/Sao_Paulo")).toString());
            veiculo.setPlaca(veiculoRequest.getPlaca());
            veiculo.setModelo(veiculoRequest.getModelo());
            veiculo.setTipo(veiculoRequest.getTipo());
            veiculo.setEstacionado(veiculoRequest.isEstacionado());
            veiculo.setMarca(veiculoRequest.getMarca());
            veiculo.setAdmin(adminSaved);


            Veiculo save = veiculoRepo.save(veiculo);

            return save.getId();

        } catch (Exception e) {
            throw new RuntimeException("Error saving vehicle details: " + e.getMessage());
        }
    }


    public List<Veiculo> getAllDetails(String nomeAdmin) throws Exception {
        try {
            Optional<Admin> admin = adminRepo.findByNome(nomeAdmin);

            if(admin.isEmpty()){
                throw new Exception("Admin not found");
            }

            Admin adminSaved = admin.get();

            List<Veiculo> veiculos = adminSaved.getVeiculos();

            return veiculos;

        } catch (Exception e) {
            throw new RuntimeException("Error getting all Vehicle Details " + e.getMessage());
        }

    }

    public Veiculo getVeiculoByPlaca(String placa, String adminNome) throws Exception{

        Optional<Admin> adminOptional = adminRepo.findByNome(adminNome);

        if(adminOptional.isEmpty()){
            throw new Exception("Admin not found");
        }

        Admin adminSaved = adminOptional.get();

        if(adminSaved.getVeiculos() == null){
            throw new Exception("Nenhum veiculo cadastrado!");
        }

        for(Veiculo veiculo : adminSaved.getVeiculos()){
            if(veiculo.getPlaca().equals(placa)){
                return veiculo;
            }
        }

        throw new Exception("Nenhum veiculo encontrado!");
    }


    public Proprietario getProprietarioByPlaca(String placa, String nomeAdmin) throws Exception {
        Veiculo veiculoPlaca = getVeiculoByPlaca(placa,nomeAdmin);

        if(veiculoPlaca.getProprietario() == null){
            throw new Exception("Proprietario not found");
        }

        return veiculoPlaca.getProprietario();
    }

    public List<Veiculo> getEstacionados(String nomeAdmin) throws Exception {
        List<Veiculo> veiculos = veiculoRepo.findAll();
        Optional<Admin> admin = adminRepo.findByNome(nomeAdmin);

        if(admin.isEmpty()) {
            throw new Exception("Admin not found");
        }

        if(veiculos.isEmpty()){
            throw new Exception("Nenhum veículo cadastrado!");
        }

        List<Veiculo> veiculosEstacionados = new ArrayList<>();

        for(Veiculo veiculo : veiculos){
            if(veiculo.isEstacionado() && veiculo.getAdmin().equals(admin.get())){
                veiculosEstacionados.add(veiculo);
            }
        }

        if(veiculosEstacionados.isEmpty()){
            throw new Exception("Nenhum veículo estacionado!");
        }

        return veiculosEstacionados;

    }

    public Long marcarSaida(Long id) throws Exception {
        Optional<Veiculo> veiculo = veiculoRepo.findById(id);
        if(veiculo.isPresent()) {
            Veiculo veiculoSaida = veiculo.get();
            veiculoSaida.setEstacionado(false);
            veiculoRepo.save(veiculoSaida);
            return veiculoSaida.getId();
        }
        throw new Exception("Veiculo não encontrado");
    }

    public Long estacionar(Long id) throws Exception {
        Optional<Veiculo> veiculo = veiculoRepo.findById(id);
        if(veiculo.isPresent()) {
            Veiculo veiculoSaida = veiculo.get();
            veiculoSaida.setEstacionado(true);
            veiculoSaida.setHoraEntrada(ZonedDateTime.now(ZoneId.of("America/Sao_Paulo")).toString());
            veiculoRepo.save(veiculoSaida);
            return veiculoSaida.getId();
        }
        throw new Exception("Veiculo não encontrado");
    }

    public void excluirVeiculo(String placa, String nomeAdmin) throws Exception {
        try {
            Optional<Admin> adminOptional = adminRepo.findByNome(nomeAdmin);

            if(adminOptional.isPresent()) {
                Admin adminSaved = adminOptional.get();
                List<Veiculo> veiculos = adminSaved.getVeiculos();
                for(Veiculo veiculo : veiculos){
                    if(veiculo.getPlaca().equals(placa)){
                        veiculoRepo.deletePorId(veiculo.getId());
                        break;
                    }
                }
            }
        } catch (Exception e) {
            logger.error("Error deleting vehicle with plate: " + placa + " and admin: " + nomeAdmin, e);
            throw new Exception("Failed to delete vehicle: " + e.getMessage(), e);
        }
    }
}