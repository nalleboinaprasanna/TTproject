package com.karyasanchay.itam.service;

import com.karyasanchay.itam.entity.Asset;
import com.karyasanchay.itam.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DepreciationService {

    private final AssetRepository assetRepository;

    // Runs automatically on March 31st at 11:59 PM (End of Indian Financial Year)
    @Scheduled(cron = "0 59 23 31 3 ?")
    @Transactional
    public void calculateAnnualDepreciation() {
        log.info("Starting Annual WDV Depreciation Calculation for Financial Year End...");
        
        List<Asset> activeAssets = assetRepository.findAll();
        
        for (Asset asset : activeAssets) {
            if (asset.getCurrentWdv() != null && asset.getCurrentWdv() > 0 && asset.getCategory() != null) {
                double depreciationRate = asset.getCategory().getDepreciationRate();
                
                // WDV Depreciation = Current WDV * (Depreciation Rate / 100)
                double depreciationAmount = asset.getCurrentWdv() * (depreciationRate / 100.0);
                
                // New WDV for next financial year
                double newWdv = asset.getCurrentWdv() - depreciationAmount;
                
                // Ensure WDV doesn't go below absolute scrap value defined by standard norms (e.g., ₹5.00)
                if (newWdv < 5.0) {
                    newWdv = 5.0; 
                }
                
                asset.setCurrentWdv(newWdv);
                assetRepository.save(asset);
                log.info("Asset {}: Depreciation applied: ₹{}. New WDV: ₹{}", asset.getAssetTag(), String.format("%.2f", depreciationAmount), String.format("%.2f", newWdv));
            }
        }
        
        log.info("Completed Annual WDV Depreciation Calculation.");
    }
}
