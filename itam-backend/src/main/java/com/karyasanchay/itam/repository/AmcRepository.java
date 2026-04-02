package com.karyasanchay.itam.repository;

import com.karyasanchay.itam.entity.Amc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AmcRepository extends JpaRepository<Amc, Long> {
}
