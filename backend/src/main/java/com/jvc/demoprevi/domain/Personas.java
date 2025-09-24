package com.jvc.demoprevi.domain;

import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Personas {

    @Id
    @GeneratedValue
    private Long id;
    private String nombre;
    private String apellido;
    private LocalDate fechaNacimiento;
    @OneToOne
    private Direccion direccion;
}