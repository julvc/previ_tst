package com.jvc.demoprevi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jvc.demoprevi.domain.Personas;

public interface IPersonasRepository extends JpaRepository<Personas, Long> {

    List<Personas> findByNombre(String nombre);

    List<Personas> findByApellido(String apellido);

    List<Personas> findByNombreAndApellido(String nombre, String apellido);

}
