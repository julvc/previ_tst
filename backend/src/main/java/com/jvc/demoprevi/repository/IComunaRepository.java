package com.jvc.demoprevi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jvc.demoprevi.domain.Comuna;

public interface IComunaRepository extends JpaRepository<Comuna, Long> {

}
