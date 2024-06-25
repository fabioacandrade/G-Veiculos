package com.fabioacandrade.Gcars.model;


import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name="VEICULOS")
public class Veiculo implements Serializable {

    private static final long serialVersionUID = 1L;

    public int id;
    public String placa;
    public String cor;
    public String tipo;
    public String modelo;
    public int anoFabricacao;
    public Timestamp horaEntrada;

    public Veiculo(){

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int getId() {return this.id;}

    public void setId(int id) {this.id = id;}


    @Column(name="placa", nullable = false)
    public String getPlaca() {return this.placa;}

    public void setPlaca(String placa) {this.placa = placa;}

    @Column(name = "cor", nullable = false)
    public String getCor() {return this.cor;}

    public void setCor(String cor) {this.cor = cor;}

    @Column(name = "tipo", nullable = false)
    public String getTipo() {return this.tipo;}

    public void setTipo(String tipo) {this.tipo = tipo;}

    @Column(name = "modelo")
    public String getModelo() {return this.modelo;}

    public void setModelo(String modelo) {this.modelo = modelo;}

    @Column(name = "ano_fabricacao")
    public int getAno(){return this.anoFabricacao;}

    public void setAno(int ano){this.anoFabricacao = ano;}

    @Column(name = "hora_entrada")
    public Timestamp getHoraEntrada() {return this.horaEntrada;}

    public void setHoraEntrada(Timestamp horaEntrada){this.horaEntrada = horaEntrada;}


}
