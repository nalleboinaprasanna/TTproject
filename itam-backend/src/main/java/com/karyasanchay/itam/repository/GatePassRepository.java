package com.karyasanchay.itam.repository;

import com.karyasanchay.itam.entity.GatePass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GatePassRepository extends JpaRepository<GatePass, Long> {
}
