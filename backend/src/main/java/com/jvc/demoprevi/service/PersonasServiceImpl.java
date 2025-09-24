package com.jvc.demoprevi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.jvc.demoprevi.domain.Personas;
import com.jvc.demoprevi.repository.IPersonasRepository;

@Service
public class PersonasServiceImpl implements IPersonasService {

    private final IPersonasRepository personasRepository;

    public PersonasServiceImpl(IPersonasRepository personasRepository) {
        this.personasRepository = personasRepository;
    }

    @Override
    public Personas guardar(Personas persona) {
        return personasRepository.save(persona);
    }

    @Override
    public Personas actualizar(Personas persona) {
        if (!personasRepository.existsById(persona.getId())) {
            throw new RuntimeException("Persona no encontrada");
        }
        return personasRepository.save(persona);
    }

    @Override
    public void eliminar(Long id) {
        personasRepository.deleteById(id);
    }

    @Override
    public List<Personas> listar() {
        return personasRepository.findAll();
    }

    @Override
    public Optional<Personas> obtenerPorId(Long id) {
        return personasRepository.findById(id);
    }

    @Override
    public void eliminarPorNombre(String nombre) {
        List<Personas> personas = personasRepository.findByNombre(nombre);
        personasRepository.deleteAll(personas);
    }

    @Override
    public void eliminarPorApellido(String apellido) {
        List<Personas> personas = personasRepository.findByApellido(apellido);
        personasRepository.deleteAll(personas);
    }

    @Override
    public void eliminarPorNombreCompleto(String nombre, String apellido) {
        List<Personas> personas = personasRepository.findByNombreAndApellido(nombre, apellido);
        personasRepository.deleteAll(personas);
    }

    

}
