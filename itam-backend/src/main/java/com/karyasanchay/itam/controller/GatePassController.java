package com.karyasanchay.itam.controller;

import com.karyasanchay.itam.dto.GatePassDTO;
import com.karyasanchay.itam.service.GatePassService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/gatepasses")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class GatePassController {

    private final GatePassService gatePassService;

    @PostMapping
    public ResponseEntity<GatePassDTO> createGatePass(@RequestBody GatePassDTO dto) {
        return new ResponseEntity<>(gatePassService.createGatePass(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> downloadGatePassPdf(@PathVariable Long id) {
        byte[] pdfBytes = gatePassService.generateGatePassPdf(id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "GatePass_" + id + ".pdf");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
}
