package com.karyasanchay.itam.controller;

import com.karyasanchay.itam.entity.Vendor;
import com.karyasanchay.itam.repository.VendorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.PostConstruct;
import java.util.List;

@RestController
@RequestMapping("/api/v1/vendors")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class VendorController {

    private final VendorRepository vendorRepository;

    @PostConstruct
    public void seedVendors() {
        if (vendorRepository.count() == 0) {
            Vendor v1 = new Vendor();
            v1.setName("Dell India Pvt Ltd");
            v1.setContactPerson("Sanjay Gupta");
            v1.setEmail("enterprise@dell.co.in");
            v1.setPhone("+91 98765 43210");
            v1.setGstNumber("29ABCDE1234F1Z5");
            v1.setStatus("ACTIVE");
            vendorRepository.save(v1);

            Vendor v2 = new Vendor();
            v2.setName("Cisco Systems India");
            v2.setContactPerson("Arpita Sharma");
            v2.setEmail("asharma@cisco.com");
            v2.setPhone("+91 87654 32109");
            v2.setGstNumber("27AABCU9603R1ZM");
            v2.setStatus("ACTIVE");
            vendorRepository.save(v2);
        }
    }

    @GetMapping
    public ResponseEntity<List<Vendor>> getAllVendors() {
        return ResponseEntity.ok(vendorRepository.findAll());
    }
}
