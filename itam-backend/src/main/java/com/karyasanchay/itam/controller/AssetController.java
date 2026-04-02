package com.karyasanchay.itam.controller;

import com.karyasanchay.itam.dto.AssetDTO;
import com.karyasanchay.itam.service.AssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/assets")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allow frontend to call APIs
public class AssetController {

    private final AssetService assetService;

    @GetMapping
    public ResponseEntity<List<AssetDTO>> getAllAssets() {
        return ResponseEntity.ok(assetService.getAllAssets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetDTO> getAssetById(@PathVariable Long id) {
        return ResponseEntity.ok(assetService.getAssetById(id));
    }

    @PostMapping
    public ResponseEntity<AssetDTO> createAsset(@RequestBody AssetDTO assetDTO) {
        return new ResponseEntity<>(assetService.createAsset(assetDTO), HttpStatus.CREATED);
    }

    // Step 1: IT Admin triggers this to start the assignment and send OTP
    @PostMapping("/{assetId}/assign/initiate/{userId}")
    public ResponseEntity<Map<String, String>> initiateAssignment(@PathVariable Long assetId, @PathVariable Long userId) {
        String message = assetService.initiateAssignment(assetId, userId);
        return ResponseEntity.ok(Map.of("message", message));
    }

    // Step 2: Employee confirms by providing the OTP
    @PostMapping("/{assetId}/assign/verify")
    public ResponseEntity<AssetDTO> verifyOtpAndAssign(@PathVariable Long assetId, @RequestParam String otp) {
        return ResponseEntity.ok(assetService.verifyOtpAndCompleteAssignment(assetId, otp));
    }

    @PostMapping("/{assetId}/return")
    public ResponseEntity<AssetDTO> returnAsset(@PathVariable Long assetId) {
        return ResponseEntity.ok(assetService.returnAsset(assetId));
    }
}
