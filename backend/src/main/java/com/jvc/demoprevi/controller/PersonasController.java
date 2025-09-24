package com.jvc.demoprevi.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jvc.demoprevi.domain.Personas;
import com.jvc.demoprevi.service.IPersonasService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
    @Operation(summary = "Crear una nueva persona", description = "Crea una nueva persona en el sistema.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Persona creada exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
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
    @Operation(summary = "Actualizar una persona", description = "Actualiza los datos de una persona existente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Persona actualizada exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
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
    @Operation(summary = "Eliminar una persona", description = "Elimina una persona existente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Persona eliminada exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
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
    @Operation(summary = "Obtener una persona por ID", description = "Devuelve los detalles de una persona específica.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Persona obtenida exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<Map<String, Object>> obtenerPorId(@PathVariable Long id) {
        Optional<Personas> persona = personasService.obtenerPorId(id);
        if (persona.isEmpty())
            return ResponseEntity.status(404).body(Map.of(MENSAJE_KEY, "Persona no encontrada"));

        return ResponseEntity.ok(Map.of(MENSAJE_KEY, "Persona encontrada", "data", persona.get()));
    }

    @GetMapping
    @Operation(summary = "Listar todas las personas", description = "Devuelve una lista de todas las personas registradas.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista obtenida exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<Map<String, Object>> listar() {
        List<Personas> personas = personasService.listar();
        if (personas.isEmpty()) {
            return ResponseEntity.ok(Map.of(MENSAJE_KEY, "No hay registros", "data", List.of()));
        }
        return ResponseEntity.ok(Map.of("data", personas));
    }

    @DeleteMapping("/nombre")
    @Operation(summary = "Eliminar una persona por nombre", description = "Elimina una persona existente por su nombre.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Persona eliminada exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<Map<String, Object>> eliminarPorNombre(@RequestParam String nombre) {
        try {
            personasService.eliminarPorNombre(nombre);
            return ResponseEntity.ok(Map.of(MENSAJE_KEY, MENSAJE_ELIMINAR));

        } catch (Exception e) {
            log.error("Error eliminando persona con nombre " + nombre, e);
            return ResponseEntity.status(500)
                    .body(Map.of(MENSAJE_KEY, "Error al eliminar la persona con nombre" + nombre));
        }
    }

    @DeleteMapping("/apellido")
    @Operation(summary = "Eliminar una persona por apellido", description = "Elimina una persona existente por su apellido.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Persona eliminada exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<Map<String, Object>> eliminarPorApellido(@RequestParam String apellido) {
        try {
            personasService.eliminarPorApellido(apellido);
            return ResponseEntity.ok(Map.of(MENSAJE_KEY, MENSAJE_ELIMINAR));

        } catch (Exception e) {
            log.error("Error eliminando persona con apellido " + apellido, e);
            return ResponseEntity.status(500)
                    .body(Map.of(MENSAJE_KEY, "Error al eliminar la persona con apellido" + apellido));
        }
    }

    @DeleteMapping("/nombre-apellido")
    @Operation(summary = "Eliminar todas las personas que coincidan con nombre y apellido", description = "Elimina todas las personas registradas.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Listado eliminado exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<Map<String, Object>> eliminarPorNombreCompleto(@RequestParam String nombre,
            @RequestParam String apellido) {
        try {
            personasService.eliminarPorNombreCompleto(nombre, apellido);
            return ResponseEntity.ok(Map.of(MENSAJE_KEY, MENSAJE_ELIMINAR));

        } catch (Exception e) {
            log.error("Error eliminando persona con nombre " + nombre + " y apellido " + apellido, e);
            return ResponseEntity.status(500).body(Map.of(MENSAJE_KEY,
                    "Error al eliminar la persona con nombre " + nombre + " y apellido " + apellido));
        }
    }
}
