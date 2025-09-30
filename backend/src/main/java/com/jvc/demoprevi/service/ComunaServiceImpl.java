package com.jvc.demoprevi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.jvc.demoprevi.domain.Comuna;
import com.jvc.demoprevi.repository.IComunaRepository;

@Service
public class ComunaServiceImpl implements IComunaService{

    private final IComunaRepository comunaRepository;

    public ComunaServiceImpl(IComunaRepository comunaRepository){
        this.comunaRepository = comunaRepository;
    }

    @Override
    public List<Comuna> listar() {
        return comunaRepository.findAll();
    }

    @Override
    public Optional<Comuna> obtenerPorId(Long id){
        return comunaRepository.findById(id);
    }

    @Override
    public List<Comuna> listarPorRegion(Long regionId) {
        return comunaRepository.findByRegionId(regionId);
    }
}
