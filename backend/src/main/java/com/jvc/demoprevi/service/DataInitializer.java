package com.jvc.demoprevi.service;

import org.springframework.stereotype.Component;

import com.jvc.demoprevi.domain.Comuna;
import com.jvc.demoprevi.domain.Region;
import com.jvc.demoprevi.repository.IComunaRepository;
import com.jvc.demoprevi.repository.IRegionRepository;

import jakarta.annotation.PostConstruct;

@Component
public class DataInitializer {

    private final IRegionRepository regionRepository;
    private final IComunaRepository comunaRepository;

    public DataInitializer(IRegionRepository regionRepository, IComunaRepository comunaRepository) {
        this.regionRepository = regionRepository;
        this.comunaRepository = comunaRepository;
    }

    @PostConstruct
    public void init() {
        if (regionRepository.count() == 0) {
            Region region1 = new Region();
            region1.setNombre("Región Metropolitana");
            regionRepository.save(region1);

            Region region2 = new Region();
            region2.setNombre("Región de Valparaíso");
            regionRepository.save(region2);

            Comuna comuna1 = new Comuna();
            comuna1.setNombre("Santiago");
            comuna1.setRegion(region1);
            comunaRepository.save(comuna1);

            Comuna comuna2 = new Comuna();
            comuna2.setNombre("Providencia");
            comuna2.setRegion(region1);
            comunaRepository.save(comuna2);

            Comuna comuna3 = new Comuna();
            comuna3.setNombre("Viña del Mar");
            comuna3.setRegion(region2);
            comunaRepository.save(comuna3);
        }
    }
}
