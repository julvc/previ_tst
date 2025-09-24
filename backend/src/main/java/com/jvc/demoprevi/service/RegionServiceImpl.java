package com.jvc.demoprevi.service;

import java.util.List;
import java.util.Optional;

import com.jvc.demoprevi.domain.Region;
import com.jvc.demoprevi.repository.IRegionRepository;

public class RegionServiceImpl implements IRegionService{

    private final IRegionRepository regionRepository;

    public RegionServiceImpl(IRegionRepository regionRepository){
        this.regionRepository = regionRepository;
    }

    @Override
    public List<Region> listar() {
        return regionRepository.findAll();
    }

    @Override
    public Optional<Region> obtenerPorId(Long id) {
        return regionRepository.findById(id);
    }

}
