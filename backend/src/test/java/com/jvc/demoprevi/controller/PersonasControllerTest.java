package com.jvc.demoprevi.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.jvc.demoprevi.domain.Comuna;
import com.jvc.demoprevi.domain.Direccion;
import com.jvc.demoprevi.domain.Personas;
import com.jvc.demoprevi.domain.Region;
import com.jvc.demoprevi.service.IPersonasService;

@WebMvcTest(PersonasController.class)
class PersonasControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private IPersonasService personasService;

    @Test
    void testListar() throws Exception {
        Direccion direccion1 = new Direccion(1L, "Calle 1",
                new Comuna(1L, "Santiago", new Region(1L, "Región Metropolitana")));
        Direccion direccion2 = new Direccion(2L, "Calle 2",
                new Comuna(2L, "Providencia", new Region(1L, "Región Metropolitana")));
        Direccion direccion3 = new Direccion(3L, "Calle 3",
                new Comuna(3L, "Viña del Mar", new Region(2L, "Región de Valparaíso")));

        when(personasService.listar()).thenReturn(List.of(
                        new Personas(1L, "Juan", "Perez", LocalDate.of(1990, 1, 1), direccion1),
        new Personas(2L, "Juana", "Perezza", LocalDate.of(1985, 5, 15), direccion2),
        new Personas(3L, "Paris", "Juarez", LocalDate.of(1995, 11, 30), direccion3)));

        mockMvc.perform(get("/api/personas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nombre").value("Juan"))
                .andExpect(jsonPath("$[0].fechaNacimiento").exists())
                .andExpect(jsonPath("$[0].direccion.calle").value("Calle 1"))
                .andExpect(jsonPath("$[1].nombre").value("Juana"))
                .andExpect(jsonPath("$[1].fechaNacimiento").exists())
                .andExpect(jsonPath("$[1].direccion.calle").value("Calle 2"))
                .andExpect(jsonPath("$[2].nombre").value("Paris"))
                .andExpect(jsonPath("$[2].fechaNacimiento").exists())
                .andExpect(jsonPath("$[2].direccion.calle").value("Calle 3"));
    }

}
