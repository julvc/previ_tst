package com.jvc.demoprevi.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.jvc.demoprevi.domain.Region;
import com.jvc.demoprevi.service.IRegionService;

@WebMvcTest(RegionController.class)
class RegionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private IRegionService regionService;

    @Nested
    class ListarYBuscarTests {
        @Test
        void testListarVacio() throws Exception {
            when(regionService.listar()).thenReturn(List.of());

            mockMvc.perform(get("/api/regiones"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.mensaje").value("No hay registros"))
                    .andExpect(jsonPath("$.data").isArray())
                    .andExpect(jsonPath("$.data").isEmpty());
        }

        @Test
        void testListar() throws Exception {
            Region region1 = new Region(1L, "Región Metropolitana");
            Region region2 = new Region(2L, "Región de Valparaíso");

            when(regionService.listar()).thenReturn(List.of(region1, region2));

            mockMvc.perform(get("/api/regiones"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data[0].nombre").value("Región Metropolitana"))
                    .andExpect(jsonPath("$.data[1].nombre").value("Región de Valparaíso"));
        }

        @Test
        void testObtenerPorIdNoEncontrado() throws Exception {
            when(regionService.obtenerPorId(1L)).thenReturn(java.util.Optional.empty());

            mockMvc.perform(get("/api/regiones/1"))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.mensaje").value("Region no encontrada"));
        }

        @Test
        void testObtenerPorId() throws Exception {
            Region region1 = new Region(1L, "Región Metropolitana");

            when(regionService.obtenerPorId(1L)).thenReturn(java.util.Optional.of(region1));

            mockMvc.perform(get("/api/regiones/1"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.mensaje").value("Region encontrada"))
                    .andExpect(jsonPath("$.data.nombre").value("Región Metropolitana"));
        }
    }
}
