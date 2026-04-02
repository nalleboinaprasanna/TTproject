package com.karyasanchay.itam.service;

import com.karyasanchay.itam.dto.AssetDTO;
import com.karyasanchay.itam.entity.Asset;
import com.karyasanchay.itam.entity.AssetCategory;
import com.karyasanchay.itam.entity.Location;
import com.karyasanchay.itam.entity.User;
import com.karyasanchay.itam.entity.enums.AssetStatus;
import com.karyasanchay.itam.exception.ResourceNotFoundException;
import com.karyasanchay.itam.repository.AssetCategoryRepository;
import com.karyasanchay.itam.repository.AssetRepository;
import com.karyasanchay.itam.repository.LocationRepository;
import com.karyasanchay.itam.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AssetService {

    private final AssetRepository assetRepository;
    private final AssetCategoryRepository categoryRepository;
    private final LocationRepository locationRepository;
    private final UserRepository userRepository;

    public List<AssetDTO> getAllAssets() {
        return assetRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public AssetDTO getAssetById(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with id: " + id));
        return mapToDTO(asset);
    }

    @Transactional
    public AssetDTO createAsset(AssetDTO dto) {
        Location location = locationRepository.findById(dto.getLocationId())
                .orElseThrow(() -> new ResourceNotFoundException("Location not found"));
        
        AssetCategory category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Asset asset = Asset.builder()
                .assetTag(dto.getAssetTag())
                .name(dto.getName())
                .serialNumber(dto.getSerialNumber())
                .location(location)
                .category(category)
                .purchaseDate(dto.getPurchaseDate() != null ? dto.getPurchaseDate() : LocalDate.now())
                .purchaseCost(dto.getPurchaseCost())
                .currentWdv(dto.getPurchaseCost())
                .build();

        return mapToDTO(assetRepository.save(asset));
    }

    @Transactional
    public String initiateAssignment(Long assetId, Long userId) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with id: " + assetId));
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        // Generate 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(999999));
        
        asset.setAssignedUser(user);
        asset.setStatus(AssetStatus.PENDING_HANDOVER);
        asset.setHandoverOtp(otp);
        asset.setOtpExpiryTime(LocalDateTime.now().plusMinutes(15)); // Valid for 15 mins
        
        assetRepository.save(asset);

        // Simulated SMS/WhatsApp sending (Indian context e.g. MSG91)
        log.info("📞 MOCK SMS API: Sending OTP '{}' to user '{}' at phone number {}.", otp, user.getFullName(), user.getPhone());
        
        return "OTP sent successfully to the employee's registered number. Valid for 15 minutes.";
    }

    @Transactional
    public AssetDTO verifyOtpAndCompleteAssignment(Long assetId, String providedOtp) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with id: " + assetId));

        if (asset.getStatus() != AssetStatus.PENDING_HANDOVER) {
            throw new IllegalStateException("Asset is not pending handover.");
        }

        if (asset.getOtpExpiryTime().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("OTP has expired. Please initiate assignment again.");
        }

        if (!providedOtp.equals(asset.getHandoverOtp())) {
            throw new IllegalArgumentException("Invalid OTP provided.");
        }

        // Complete assignment
        asset.setStatus(AssetStatus.IN_USE);
        asset.setHandoverOtp(null);
        asset.setOtpExpiryTime(null);

        log.info("✅ Asset {} successfully handed over to {}.", asset.getAssetTag(), asset.getAssignedUser().getFullName());
        
        return mapToDTO(assetRepository.save(asset));
    }

    @Transactional
    public AssetDTO returnAsset(Long assetId) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with id: " + assetId));

        asset.setAssignedUser(null);
        asset.setStatus(AssetStatus.AVAILABLE);

        return mapToDTO(assetRepository.save(asset));
    }

    private AssetDTO mapToDTO(Asset asset) {
        AssetDTO dto = new AssetDTO();
        dto.setId(asset.getId());
        dto.setAssetTag(asset.getAssetTag());
        dto.setName(asset.getName());
        dto.setSerialNumber(asset.getSerialNumber());
        dto.setStatus(asset.getStatus());
        dto.setPurchaseDate(asset.getPurchaseDate());
        dto.setPurchaseCost(asset.getPurchaseCost());
        dto.setCurrentWdv(asset.getCurrentWdv());

        if (asset.getCategory() != null) {
            dto.setCategoryId(asset.getCategory().getId());
            dto.setCategoryName(asset.getCategory().getName());
        }
        if (asset.getLocation() != null) {
            dto.setLocationId(asset.getLocation().getId());
            dto.setLocationName(asset.getLocation().getName());
        }
        if (asset.getAssignedUser() != null) {
            dto.setAssignedUserId(asset.getAssignedUser().getId());
            dto.setAssignedUserName(asset.getAssignedUser().getFullName());
        }
        return dto;
    }
}
