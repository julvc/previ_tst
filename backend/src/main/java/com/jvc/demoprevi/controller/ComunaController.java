package com.jvc.demoprevi.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jvc.demoprevi.domain.Comuna;
import com.jvc.demoprevi.service.IComunaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/api/comunas")
public class ComunaController {
    private static final String MENSAJE_KEY = "mensaje";

    private final IComunaService comunaService;

    public ComunaController(IComunaService comunaService) {
        this.comunaService = comunaService;
    }

    @GetMapping
    @Operation(summary = "Listar todas las comunas", description = "Devuelve una lista de todas las comunas registradas.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista obtenida exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<Map<String, Object>> listar() {
        List<Comuna> comunas = comunaService.listar();
        if (comunas.isEmpty()) {
            return ResponseEntity.ok(Map.of(MENSAJE_KEY, "No hay registros", "data", List.of()));
        }
        return ResponseEntity.ok(Map.of("data", comunas));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener una comuna por ID", description = "Devuelve los detalles de una comuna específica.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Comuna obtenida exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<Map<String, Object>> obtenerPorId(@PathVariable Long id) {
        Optional<Comuna> comuna = comunaService.obtenerPorId(id);
        if (comuna.isEmpty())
            return ResponseEntity.status(404).body(Map.of(MENSAJE_KEY, "Comuna no encontrada"));

        return ResponseEntity.ok(Map.of(MENSAJE_KEY, "Comuna encontrada", "data", comuna.get()));
    }
}
