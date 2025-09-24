package com.jvc.demoprevi.service;

import java.util.List;
import java.util.Optional;

import com.jvc.demoprevi.domain.Region;

public interface IRegionService {
    List<Region> listar();
    Optional<Region> obtenerPorId(Long id);
}
