package com.jvc.demoprevi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.jvc.demoprevi.domain.Comuna;
import com.jvc.demoprevi.domain.Personas;
import com.jvc.demoprevi.repository.IComunaRepository;
import com.jvc.demoprevi.repository.IPersonasRepository;

@Service
public class PersonasServiceImpl implements IPersonasService {

    private final IPersonasRepository personasRepository;
    private final IComunaRepository comunaRepository;

    public PersonasServiceImpl(IPersonasRepository personasRepository,
            IComunaRepository comunaRepository) {
        this.personasRepository = personasRepository;
        this.comunaRepository = comunaRepository;
    }

    @Override
    public Personas guardar(Personas persona) {
        if (persona.getDireccion() != null && persona.getDireccion().getComuna() != null) {
            Long comunaId = persona.getDireccion().getComuna().getId();
            if (!comunaRepository.existsById(comunaId)) {
                throw new RuntimeException("Comuna no encontrada");
            }
            Comuna comuna = comunaRepository.findById(comunaId).get();
            if (comuna.getRegion() == null) {
                throw new RuntimeException("Región no encontrada para la comuna");
            }
            persona.getDireccion().setComuna(comuna);
        } else {
            throw new RuntimeException("Dirección o Comuna inválida");
        }
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
