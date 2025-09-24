package com.jvc.demoprevi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jvc.demoprevi.domain.Region;

public interface IRegionRepository extends JpaRepository<Region, Long> {

}
