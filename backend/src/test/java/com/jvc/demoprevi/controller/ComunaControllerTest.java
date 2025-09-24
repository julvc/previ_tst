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

import com.jvc.demoprevi.domain.Comuna;
import com.jvc.demoprevi.domain.Region;
import com.jvc.demoprevi.service.IComunaService;

@WebMvcTest(ComunaController.class)
public class ComunaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private IComunaService comunaService;

    @Nested
    class ListarYBuscarTests {
        @Test
        void testListarVacio() throws Exception {
            when(comunaService.listar()).thenReturn(List.of());

            mockMvc.perform(get("/api/comunas"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.mensaje").value("No hay registros"))
                    .andExpect(jsonPath("$.data").isArray())
                    .andExpect(jsonPath("$.data").isEmpty());
        }

        @Test
        void testListar() throws Exception {
            Comuna comuna1 = new Comuna(1L, "Santiago", new Region(1L, "Región Metropolitana"));
            Comuna comuna2 = new Comuna(2L, "Providencia", new Region(1L, "Región Metropolitana"));
            Comuna comuna3 = new Comuna(3L, "Viña del Mar", new Region(2L, "Región de Valparaíso"));

            when(comunaService.listar()).thenReturn(List.of(comuna1, comuna2, comuna3));

            mockMvc.perform(get("/api/comunas"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data[0].nombre").value("Santiago"))
                    .andExpect(jsonPath("$.data[1].nombre").value("Providencia"))
                    .andExpect(jsonPath("$.data[2].nombre").value("Viña del Mar"));
        }

        @Test
        void testObtenerPorIdNoEncontrado() throws Exception {
            when(comunaService.obtenerPorId(1L)).thenReturn(java.util.Optional.empty());

            mockMvc.perform(get("/api/comunas/1"))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.mensaje").value("Comuna no encontrada"));
        }

        @Test
        void testObtenerPorId() throws Exception {
            Comuna comuna1 = new Comuna(1L, "Santiago", new Region(1L, "Región Metropolitana"));

            when(comunaService.obtenerPorId(1L)).thenReturn(java.util.Optional.of(comuna1));

            mockMvc.perform(get("/api/comunas/1"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.mensaje").value("Comuna encontrada"))
                    .andExpect(jsonPath("$.data.nombre").value("Santiago"));
        }
    }
}
