package com.jvc.demoprevi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jvc.demoprevi.domain.Comuna;

public interface IComunaRepository extends JpaRepository<Comuna, Long> {

    List<Comuna> findByRegionId(Long regionId);
}
