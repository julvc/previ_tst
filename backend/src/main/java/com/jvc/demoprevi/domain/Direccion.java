package com.jvc.demoprevi.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Direccion {

    @Id
    @GeneratedValue
    private Long id;
    private String calle;
    @ManyToOne
    private Comuna comuna;
}
