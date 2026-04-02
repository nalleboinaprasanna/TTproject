package com.karyasanchay.itam.dto;

import com.karyasanchay.itam.entity.enums.AssetStatus;
import lombok.Data;
import java.time.LocalDate;

@Data
public class AssetDTO {
    private Long id;
    private String assetTag;
    private String name;
    private String serialNumber;
    private Long categoryId;
    private String categoryName;
    private Long locationId;
    private String locationName;
    private Long assignedUserId;
    private String assignedUserName;
    private AssetStatus status;
    private LocalDate purchaseDate;
    private Double purchaseCost;
    private Double currentWdv;
}
