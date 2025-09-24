package com.jvc.demoprevi.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jvc.demoprevi.domain.Personas;
import com.jvc.demoprevi.service.IPersonasService;

import lombok.extern.slf4j.Slf4j;

import java.util.Map;
import java.util.Optional;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/personas")
@Slf4j
public class PersonasController {

    private static final String MENSAJE_KEY = "mensaje";
    private static final String MENSAJE_ELIMINAR = "Persona eliminada";

    private final IPersonasService personasService;

    public PersonasController(IPersonasService personasService) {
        this.personasService = personasService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> crear(@RequestBody Personas entity) {
        try {
            Personas persona = personasService.guardar(entity);
            return ResponseEntity.ok(Map.of(MENSAJE_KEY, "Persona creada", "data", persona));

        } catch (Exception e) {
            log.error("Error creado persona", e);
            return ResponseEntity.status(500).body(Map.of(MENSAJE_KEY, "Error al crear la persona"));
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> actualizar(@PathVariable Long id, @RequestBody Personas entity) {
        try {
            entity.setId(id);
            Personas persona = personasService.actualizar(entity);
            return ResponseEntity.ok(Map.of(MENSAJE_KEY, "Persona actualizada", "data", persona));
        } catch (Exception e) {
            log.error("Error actualizando persona", e);
            return ResponseEntity.status(500).body(Map.of(MENSAJE_KEY, "Error al actualizar la persona"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> eliminar(@PathVariable Long id) {
        try {
            Optional<Personas> personaOpt = personasService.obtenerPorId(id);
            if (personaOpt.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of(MENSAJE_KEY, "Persona no encontrada"));
            }
            personasService.eliminar(id);
            return ResponseEntity.ok(Map.of(MENSAJE_KEY, MENSAJE_ELIMINAR, "data", personaOpt.get()));

        } catch (Exception e) {
            log.error("Error eliminando persona", e);
            return ResponseEntity.status(500).body(Map.of(MENSAJE_KEY, "Error al eliminar la persona con id" + id));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> obtenerPorId(@PathVariable Long id) {
        Optional<Personas> persona = personasService.obtenerPorId(id);
        if (persona.isEmpty())
            return ResponseEntity.status(404).body(Map.of(MENSAJE_KEY, "Persona no encontrada"));

        return ResponseEntity.ok(Map.of(MENSAJE_KEY, "Persona encontrada", "data", persona.get()));
    }

    @GetMapping
    public ResponseEntity<List<Personas>> listar() {
        List<Personas> personas = personasService.listar();
        if (personas.isEmpty()) {
            return ResponseEntity.ok(List.of());
        }
        return ResponseEntity.ok(personas);
    }

    @DeleteMapping("/nombre")
    public ResponseEntity<Map<String, Object>> eliminarPorNombre(@RequestParam String nombre) {
        try {
            personasService.eliminarPorNombre(nombre);
            return ResponseEntity.ok(Map.of(MENSAJE_KEY, MENSAJE_ELIMINAR));

        } catch (Exception e) {
            log.error("Error eliminando persona con nombre " + nombre, e);
            return ResponseEntity.status(500).body(Map.of(MENSAJE_KEY, "Error al eliminar la persona con nombre" + nombre));
        }
    }

    @DeleteMapping("/apellido")
    public ResponseEntity<Map<String, Object>> eliminarPorApellido(@RequestParam String apellido) {
        try {
            personasService.eliminarPorApellido(apellido);
            return ResponseEntity.ok(Map.of(MENSAJE_KEY, MENSAJE_ELIMINAR));

        } catch (Exception e) {
            log.error("Error eliminando persona con apellido " + apellido, e);
            return ResponseEntity.status(500).body(Map.of(MENSAJE_KEY, "Error al eliminar la persona con apellido" + apellido));
        }
    }

    @DeleteMapping("/nombre-apellido")
    public ResponseEntity<Map<String, Object>> eliminarPorNombreCompleto(@RequestParam String nombre, @RequestParam String apellido) {
        try {
            personasService.eliminarPorNombreCompleto(nombre,apellido);
            return ResponseEntity.ok(Map.of(MENSAJE_KEY, MENSAJE_ELIMINAR));

        } catch (Exception e) {
            log.error("Error eliminando persona con nombre " + nombre + " y apellido " + apellido, e);
            return ResponseEntity.status(500).body(Map.of(MENSAJE_KEY, "Error al eliminar la persona con nombre " + nombre + " y apellido " + apellido));
        }
    }
}
