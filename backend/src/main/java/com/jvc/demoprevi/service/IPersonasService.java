package com.jvc.demoprevi.service;

import java.util.List;
import java.util.Optional;

import com.jvc.demoprevi.domain.Personas;

public interface IPersonasService {
    Personas guardar(Personas persona);
    Personas actualizar(Personas persona);
    void eliminar(Long id);
    List<Personas> listar();
    Optional<Personas> obtenerPorId(Long id);
    void eliminarPorNombre(String nombre);
    void eliminarPorApellido(String apellido);
    void eliminarPorNombreCompleto(String nombre, String apellido);
}
