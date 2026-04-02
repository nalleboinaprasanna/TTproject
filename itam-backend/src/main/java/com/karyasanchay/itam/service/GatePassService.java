package com.karyasanchay.itam.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import com.karyasanchay.itam.dto.GatePassDTO;
import com.karyasanchay.itam.entity.Asset;
import com.karyasanchay.itam.entity.GatePass;
import com.karyasanchay.itam.entity.Location;
import com.karyasanchay.itam.exception.ResourceNotFoundException;
import com.karyasanchay.itam.repository.AssetRepository;
import com.karyasanchay.itam.repository.GatePassRepository;
import com.karyasanchay.itam.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;

@Slf4j
@Service
@RequiredArgsConstructor
public class GatePassService {

    private final GatePassRepository gatePassRepository;
    private final AssetRepository assetRepository;
    private final LocationRepository locationRepository;

    @Transactional
    public GatePassDTO createGatePass(GatePassDTO dto) {
        Asset asset = assetRepository.findById(dto.getAssetId())
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found"));

        Location from = locationRepository.findById(dto.getFromLocationId())
                .orElseThrow(() -> new ResourceNotFoundException("From Location not found"));

        Location to = locationRepository.findById(dto.getToLocationId())
                .orElseThrow(() -> new ResourceNotFoundException("To Location not found"));

        GatePass gatePass = GatePass.builder()
                .asset(asset)
                .fromLocation(from)
                .toLocation(to)
                .passType(dto.getPassType())
                .carrierDetails(dto.getCarrierDetails())
                .issuedByUserId(dto.getIssuedByUserId()) 
                .build();

        return mapToDTO(gatePassRepository.save(gatePass));
    }

    public byte[] generateGatePassPdf(Long gatePassId) {
        GatePass gatePass = gatePassRepository.findById(gatePassId)
                .orElseThrow(() -> new ResourceNotFoundException("GatePass not found"));

        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();

            // Header
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("KARYASANCHAY - IT ASSET MANAGEMENT", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            
            document.add(new Paragraph("\n"));

            Font subTitleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14);
            Paragraph gatePassHeader = new Paragraph(gatePass.getPassType().name() + " GATE PASS", subTitleFont);
            gatePassHeader.setAlignment(Element.ALIGN_CENTER);
            document.add(gatePassHeader);

            document.add(new Paragraph("\n"));

            // Content
            document.add(new Paragraph("Gate Pass ID: GP-" + gatePass.getId()));
            document.add(new Paragraph("Issue Date: " + gatePass.getIssueDate()));
            document.add(new Paragraph("Status: " + gatePass.getStatus()));
            document.add(new Paragraph("\n-- ASSET DETAILS --"));
            document.add(new Paragraph("Asset Tag: " + gatePass.getAsset().getAssetTag()));
            document.add(new Paragraph("Asset Name: " + gatePass.getAsset().getName()));
            document.add(new Paragraph("Serial Number: " + gatePass.getAsset().getSerialNumber()));
            
            document.add(new Paragraph("\n-- MOVEMENT DETAILS --"));
            document.add(new Paragraph("From Location: " + gatePass.getFromLocation().getName() + " (" + (gatePass.getFromLocation().isSez() ? "SEZ" : "Non-SEZ") + ")"));
            document.add(new Paragraph("To Location: " + gatePass.getToLocation().getName() + " (" + (gatePass.getToLocation().isSez() ? "SEZ" : "Non-SEZ") + ")"));
            document.add(new Paragraph("Carrier / Employee Details: " + gatePass.getCarrierDetails()));

            document.add(new Paragraph("\n\n\n"));
            document.add(new Paragraph("_________________________                  _________________________"));
            document.add(new Paragraph("   Authorized Signatory                         Security Check       "));

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            log.error("Error generating PDF", e);
            throw new RuntimeException("Failed to generate PDF");
        }
    }

    private GatePassDTO mapToDTO(GatePass gatePass) {
        GatePassDTO dto = new GatePassDTO();
        dto.setId(gatePass.getId());
        dto.setAssetId(gatePass.getAsset().getId());
        dto.setAssetTag(gatePass.getAsset().getAssetTag());
        dto.setAssetName(gatePass.getAsset().getName());
        dto.setFromLocationId(gatePass.getFromLocation().getId());
        dto.setFromLocationName(gatePass.getFromLocation().getName());
        dto.setToLocationId(gatePass.getToLocation().getId());
        dto.setToLocationName(gatePass.getToLocation().getName());
        dto.setPassType(gatePass.getPassType());
        dto.setStatus(gatePass.getStatus());
        dto.setCarrierDetails(gatePass.getCarrierDetails());
        dto.setIssueDate(gatePass.getIssueDate());
        dto.setIssuedByUserId(gatePass.getIssuedByUserId());
        return dto;
    }
}
