package com.jvc.demoprevi.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jvc.demoprevi.domain.Region;
import com.jvc.demoprevi.service.IRegionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/api/regiones")
public class RegionController {
    private static final String MENSAJE_KEY = "mensaje";

    private final IRegionService regionService;

    public RegionController(IRegionService regionService) {
        this.regionService = regionService;
    }

    @GetMapping
    @Operation(summary = "Listar todas las regiones", description = "Devuelve una lista de todas las regiones registradas.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista obtenida exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<Map<String, Object>> listar() {
        List<Region> regiones = regionService.listar();
        if (regiones.isEmpty()) {
            return ResponseEntity.ok(Map.of(MENSAJE_KEY, "No hay registros", "data", List.of()));
        }
        return ResponseEntity.ok(Map.of("data", regiones));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener una region por ID", description = "Devuelve los detalles de una region específica.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Region obtenida exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<Map<String, Object>> obtenerPorId(@PathVariable Long id) {
        Optional<Region> region = regionService.obtenerPorId(id);
        if (region.isEmpty())
            return ResponseEntity.status(404).body(Map.of(MENSAJE_KEY, "Region no encontrada"));

        return ResponseEntity.ok(Map.of(MENSAJE_KEY, "Region encontrada", "data", region.get()));
    }

}
