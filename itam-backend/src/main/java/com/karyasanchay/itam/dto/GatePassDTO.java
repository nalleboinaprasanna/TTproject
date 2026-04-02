package com.karyasanchay.itam.dto;

import com.karyasanchay.itam.entity.enums.GatePassStatus;
import com.karyasanchay.itam.entity.enums.GatePassType;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class GatePassDTO {
    private Long id;
    private Long assetId;
    private String assetTag;
    private String assetName;
    private Long fromLocationId;
    private String fromLocationName;
    private Long toLocationId;
    private String toLocationName;
    private GatePassType passType;
    private GatePassStatus status;
    private Long issuedByUserId;
    private String carrierDetails;
    private LocalDateTime issueDate;
}
