package com.jvc.demoprevi.service;

import java.util.List;
import java.util.Optional;

import com.jvc.demoprevi.domain.Comuna;

public interface IComunaService {

    List<Comuna> listar();
    Optional<Comuna> obtenerPorId(Long id);
    List<Comuna> listarPorRegion(Long regionId);
}
