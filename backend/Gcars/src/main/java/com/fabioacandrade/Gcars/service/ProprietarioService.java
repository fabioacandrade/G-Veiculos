package com.fabioacandrade.Gcars.service;


import com.fabioacandrade.Gcars.model.Admin;
import com.fabioacandrade.Gcars.model.Proprietario;
import com.fabioacandrade.Gcars.model.Veiculo;
import com.fabioacandrade.Gcars.repository.AdminRepo;
import com.fabioacandrade.Gcars.repository.ProprietarioRepo;
import com.fabioacandrade.Gcars.repository.VeiculoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProprietarioService {

    @Autowired
    private ProprietarioRepo proprietarioRepo;

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private VeiculoRepo veiculoRepo;

    @Autowired
    private VeiculoService veiculoService;

    public List<Proprietario> findAllProprietario(String nomeAdmin) throws Exception{

        List<Proprietario> proprietarios = proprietarioRepo.findAll();
        List<Proprietario> proprietariosAdmin = new ArrayList<>();
        Optional<Admin> admin = adminRepo.findByNome(nomeAdmin);

        if(admin.isEmpty()){
            throw new Exception("Nenhum admin cadastrado");
        }

        if(proprietarios.isEmpty()) {
            throw new Exception("Nenhum proprietário cadastrado!");
        }

        for (Proprietario proprietario : proprietarios) {
            if(proprietario.getAdmin().equals(admin.get())) {
                proprietariosAdmin.add(proprietario);
            }
        }

        return proprietariosAdmin;
    }


    public Long saveProprietario(Proprietario proprietario, String nomeAdmin) throws Exception {

        Optional<Admin> admin = adminRepo.findByNome(nomeAdmin);

        if(admin.isEmpty()){
            throw new Exception("Nenhum admin cadastrado");
        }

        List<Proprietario> adminProprietarios = admin.get().getProprietarios();

        //verificando se ja existe
        for(Proprietario proprietarioAdmin : adminProprietarios){
            if(proprietarioAdmin.getCpf().equals(proprietario.getCpf()) || proprietarioAdmin.getEmail().equals(proprietario.getEmail()) ||
                proprietarioAdmin.getTelefone().equals(proprietario.getTelefone())) {
                throw new Exception("Proprietario ja cadastrado!");
            }
        }

        proprietario.setAdmin(admin.get());

        Proprietario proprietarioSalvo = proprietarioRepo.save(proprietario);

        return proprietarioSalvo.getId();
    }



    public Proprietario findByCpf(String cpf, String nomeAdmin) throws Exception {
        Optional<Admin> adminOpt = adminRepo.findByNome(nomeAdmin);

        if (adminOpt.isEmpty()) {
            throw new Exception("Nenhum admin cadastrado");
        }

        Admin admin = adminOpt.get();

        List<Proprietario> proprietarios = admin.getProprietarios();

        for( Proprietario prop : proprietarios ){
            if(prop.getCpf().equals(cpf)){
                return prop;
            }
        }

        throw new Exception("Nenhum proprietario encontrado para o cpf: " + cpf);
    }


    public List<Proprietario> findByNome(String nome, String nomeAdmin) throws Exception {

        Optional<Admin> adminOpt = adminRepo.findByNome(nomeAdmin);
        if (adminOpt.isEmpty()) {
            throw new Exception("Nenhum admin cadastrado");
        }

        Admin admin = adminOpt.get();

        Optional<List<Proprietario>> proprietarioOpt = proprietarioRepo.findByNome(nome);
        if (proprietarioOpt.isEmpty() || proprietarioOpt.get().isEmpty()) {
            throw new Exception("Nenhum proprietário encontrado com esse nome!");
        }

        List<Proprietario> proprietarios = proprietarioOpt.get();
        List<Proprietario> proprietariosAdmin = new ArrayList<>();

        for (Proprietario proprietario : proprietarios) {
            if (proprietario.getAdmin().equals(admin)) {
                proprietariosAdmin.add(proprietario);
            }
        }

        if (proprietariosAdmin.isEmpty()) {
            throw new Exception("Nenhum proprietário encontrado para o admin especificado!");
        }

        return proprietariosAdmin;
    }


    public List<Veiculo> findVeiculosByProprietarioCpf(String cpf, String nomeAdmin) throws Exception {
        Optional<Admin> adminOpt = adminRepo.findByNome(nomeAdmin);
        if (adminOpt.isEmpty()) {
            throw new Exception("Nenhum admin cadastrado");
        }

        Admin admin = adminOpt.get();

        List<Veiculo> veiculos = veiculoRepo.findByProprietarioCpf(cpf);
        if (veiculos.isEmpty()) {
            throw new Exception("Nenhum veículo encontrado para o proprietário com CPF: " + cpf);
        }

        List<Veiculo> veiculosAdmin = new ArrayList<>();
        for (Veiculo veiculo : veiculos) {
            if (veiculo.getProprietario().getAdmin().equals(admin)) {
                veiculosAdmin.add(veiculo);
            }
        }

        if (veiculosAdmin.isEmpty()) {
            throw new Exception("Nenhum veículo encontrado para o administrador especificado!");
        }

        return veiculosAdmin;
    }

    public void excluirProprietario(String cpf, String nomeAdmin) throws Exception {

        Optional<Admin> adminOpt = adminRepo.findByNome(nomeAdmin);

        if (adminOpt.isEmpty()) {
            throw new Exception("Nenhum admin cadastrado");
        }

        Admin admin = adminOpt.get();
        List<Proprietario> proprietarios = admin.getProprietarios();
        for (Proprietario proprietario : proprietarios) {
            if (proprietario.getCpf().equals(cpf)) {
                for(Veiculo veiculo : proprietario.getVeiculos()){
                    veiculoService.excluirVeiculo(veiculo.getPlaca(),veiculo.getAdmin().getNome());
                }
                proprietarioRepo.deletePorId(proprietario.getId());
                break;
            }
        }
    }

}
