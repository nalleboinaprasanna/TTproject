package com.karyasanchay.itam.config;

import com.karyasanchay.itam.entity.*;
import com.karyasanchay.itam.entity.enums.AssetStatus;
import com.karyasanchay.itam.entity.enums.Role;
import com.karyasanchay.itam.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final LocationRepository locationRepository;
    private final AssetCategoryRepository categoryRepository;
    private final AssetRepository assetRepository;
    private final VendorRepository vendorRepository;

    @Override
    public void run(String... args) throws Exception {
        if (locationRepository.count() == 0) {
            Location blr = locationRepository.save(Location.builder().name("Bengaluru (SEZ)").isSez(true).build());
            Location pune = locationRepository.save(Location.builder().name("Pune Office").isSez(false).build());
            
            AssetCategory laptop = categoryRepository.save(AssetCategory.builder().name("Laptop").depreciationRate(40.0).build());
            AssetCategory monitor = categoryRepository.save(AssetCategory.builder().name("Monitor").depreciationRate(20.0).build());

            User ravi = userRepository.save(User.builder().fullName("Ravi Kumar").email("ravi@itam.in").password("pass").role(Role.SUPER_ADMIN).location(blr).build());
            User priya = userRepository.save(User.builder().fullName("Priya Sharma").email("priya@itam.in").password("pass").role(Role.EMPLOYEE).location(blr).build());

            assetRepository.save(Asset.builder().assetTag("LT-MAC-092").name("MacBook Pro M2").serialNumber("MAC123").category(laptop).location(blr).status(AssetStatus.IN_USE).assignedUser(priya).purchaseCost(120000.0).currentWdv(120000.0).purchaseDate(LocalDate.now().minusMonths(6)).build());
            assetRepository.save(Asset.builder().assetTag("LT-DELL-145").name("Dell Latitude").serialNumber("DELL456").category(laptop).location(pune).status(AssetStatus.AVAILABLE).purchaseCost(75000.0).currentWdv(75000.0).purchaseDate(LocalDate.now().minusMonths(2)).build());
            assetRepository.save(Asset.builder().assetTag("MN-LG-302").name("LG 27 inch 4K").serialNumber("LG789").category(monitor).location(blr).status(AssetStatus.AVAILABLE).purchaseCost(25000.0).currentWdv(25000.0).purchaseDate(LocalDate.now().minusMonths(1)).build());
            
            Vendor wipro = vendorRepository.save(Vendor.builder().name("Wipro Laptops Support").contactPerson("Amit").gstNumber("27AAACW1234F1Z5").build());
            Vendor nehru = vendorRepository.save(Vendor.builder().name("Nehru Place Traders").contactPerson("Sanjay").gstNumber("07AABCN9876E1Z2").build());
        }
    }
}
