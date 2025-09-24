package com.jvc.demoprevi.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Nested;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
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

        @Nested
        class ListarYBuscarTests {

                @Test
                void testListarVacio() throws Exception {
                        when(personasService.listar()).thenReturn(List.of());

                        mockMvc.perform(get("/api/personas"))
                                        .andExpect(status().isOk())
                                        .andExpect(jsonPath("$.mensaje").value("No hay registros"))
                                        .andExpect(jsonPath("$.data").isArray())
                                        .andExpect(jsonPath("$.data").isEmpty());
                }

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

                @Test
                void testObtenerPorIdNoEncontrado() throws Exception {
                        when(personasService.obtenerPorId(1L)).thenReturn(java.util.Optional.empty());

                        mockMvc.perform(get("/api/personas/1"))
                                        .andExpect(status().isNotFound())
                                        .andExpect(jsonPath("$.mensaje").value("Persona no encontrada"));
                }

                @Test
                void testObtenerPorId() throws Exception {
                        Direccion direccion = new Direccion(1L, "Calle 1",
                                        new Comuna(1L, "Santiago", new Region(1L, "Región Metropolitana")));
                        Personas persona = new Personas(1L, "Juan", "Perez", LocalDate.of(1990, 1, 1), direccion);

                        when(personasService.obtenerPorId(1L)).thenReturn(java.util.Optional.of(persona));

                        mockMvc.perform(get("/api/personas/1"))
                                        .andExpect(status().isOk())
                                        .andExpect(jsonPath("$.mensaje").value("Persona encontrada"))
                                        .andExpect(jsonPath("$.data.nombre").value("Juan"))
                                        .andExpect(jsonPath("$.data.fechaNacimiento").exists())
                                        .andExpect(jsonPath("$.data.direccion.calle").value("Calle 1"));
                }
        }

        @Nested
        class CrearYActualizarTests {
                // #region JSON DE PRUEBA
                String json = """
                                {
                                    "nombre": "Juan",
                                    "apellido": "Perez",
                                    "fechaNacimiento": "1990-01-01",
                                    "direccion": {
                                        "id": 1,
                                        "calle": "Calle 1",
                                        "comuna": {
                                            "id": 1,
                                            "nombre": "Santiago",
                                            "region": {
                                                "id": 1,
                                                "nombre": "Región Metropolitana"
                                            }
                                        }
                                    }
                                }
                                """;
                // #endregion

                @Test
                void testCrear() throws Exception {
                        Direccion direccion = new Direccion(1L, "Calle 1",
                                        new Comuna(1L, "Santiago", new Region(1L, "Región Metropolitana")));
                        Personas persona = new Personas(1L, "Juan", "Perez", LocalDate.of(1990, 1, 1), direccion);

                        when(personasService.guardar(any(Personas.class))).thenReturn(persona);

                        mockMvc.perform(post("/api/personas")
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .content(json))
                                        .andExpect(status().isOk())
                                        .andExpect(jsonPath("$.mensaje").value("Persona creada"))
                                        .andExpect(jsonPath("$.data.nombre").value("Juan"));
                }

                @Test
                void testCrearError() throws Exception {
                        when(personasService.guardar(any(Personas.class)))
                                        .thenThrow(new RuntimeException("Error al guardar"));

                        mockMvc.perform(post("/api/personas")
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .content(json))
                                        .andExpect(status().isInternalServerError())
                                        .andExpect(jsonPath("$.mensaje").value("Error al crear la persona"));
                }

                @Test
                void testActualizar() throws Exception {
                        Direccion direccion = new Direccion(1L, "Calle 1",
                                        new Comuna(1L, "Santiago", new Region(1L, "Región Metropolitana")));
                        Personas persona = new Personas(1L, "John", "Wayne", LocalDate.of(1990, 1, 1), direccion);

                        when(personasService.actualizar(any(Personas.class))).thenReturn(persona);

                        mockMvc.perform(put("/api/personas/1")
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .content(json))
                                        .andExpect(status().isOk())
                                        .andExpect(jsonPath("$.mensaje").value("Persona actualizada"))
                                        .andExpect(jsonPath("$.data.nombre").value("John"));
                }

                @Test
                void testActualizarError() throws Exception {
                        when(personasService.actualizar(any(Personas.class)))
                                        .thenThrow(new RuntimeException("Error al actualizar"));

                        mockMvc.perform(put("/api/personas/1")
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .content(json))
                                        .andExpect(status().isInternalServerError())
                                        .andExpect(jsonPath("$.mensaje").value("Error al actualizar la persona"));
                }
        }

        @Nested
        class EliminarTests {

                @Test
                void testEliminar() throws Exception {
                        Direccion direccion = new Direccion(1L, "Calle 1",
                                        new Comuna(1L, "Santiago", new Region(1L, "Región Metropolitana")));
                        Personas persona = new Personas(1L, "Juan", "Perez", LocalDate.of(1990, 1, 1), direccion);

                        when(personasService.obtenerPorId(1L)).thenReturn(java.util.Optional.of(persona));
                        doNothing().when(personasService).eliminar(1L);

                        mockMvc.perform(delete("/api/personas/1"))
                                        .andExpect(status().isOk())
                                        .andExpect(jsonPath("$.mensaje").value("Persona eliminada"));
                }

                @Test
                void testEliminarNoEncontrado() throws Exception {
                        when(personasService.obtenerPorId(1L)).thenReturn(java.util.Optional.empty());

                        mockMvc.perform(delete("/api/personas/1"))
                                        .andExpect(status().isNotFound())
                                        .andExpect(jsonPath("$.mensaje").value("Persona no encontrada"));
                }
        }
}
