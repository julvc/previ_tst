package com.jvc.demoprevi.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Comuna {

    private Long id;
    private String nombre;
    @ManyToOne
    private Region region;
}
