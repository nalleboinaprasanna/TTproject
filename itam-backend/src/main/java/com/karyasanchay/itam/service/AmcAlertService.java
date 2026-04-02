package com.karyasanchay.itam.service;

import com.karyasanchay.itam.entity.Amc;
import com.karyasanchay.itam.repository.AmcRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AmcAlertService {

    private final AmcRepository amcRepository;

    // Runs every day at 9:00 AM to check for expiring AMCs
    @Scheduled(cron = "0 0 9 * * ?")
    @Transactional(readOnly = true)
    public void checkAndSendAmcAlerts() {
        log.info("Starting Daily AMC Expiry Check...");
        LocalDate today = LocalDate.now();
        
        List<Amc> allAmcs = amcRepository.findAll();
        
        for (Amc amc : allAmcs) {
            long daysToExpiry = ChronoUnit.DAYS.between(today, amc.getEndDate());
            
            if (daysToExpiry == 30) {
                sendAlert(amc, "30 days");
            } else if (daysToExpiry == 7) {
                sendAlert(amc, "7 days");
            } else if (daysToExpiry == 1) {
                sendAlert(amc, "1 day");
            } else if (daysToExpiry < 0 && daysToExpiry >= -7) {
                log.warn("🚨 AMC EXPIRED: AMC with {} for Asset {} has already expired {} days ago. Immediate renewal needed.", 
                         amc.getVendor().getName(), amc.getAsset().getAssetTag(), Math.abs(daysToExpiry));
            }
        }
        log.info("Finished Daily AMC Expiry Check.");
    }

    private void sendAlert(Amc amc, String timeframe) {
        String message = String.format("AMC Expiry Alert: The AMC contract with vendor '%s' for asset '%s' will expire in %s (on %s). Please initiate renewal process.", 
                                        amc.getVendor().getName(), amc.getAsset().getAssetTag(), timeframe, amc.getEndDate());
        
        // Simulating Email & SMS notification to IT team
        log.info("📧 MOCK EMAIL: Sending alert to IT Admin: {}", message);
        log.info("📞 MOCK SMS API: Sending text alert to IT Manager phone.");
    }
}
