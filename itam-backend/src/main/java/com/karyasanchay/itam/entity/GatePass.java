package com.karyasanchay.itam.entity;

import com.karyasanchay.itam.entity.enums.GatePassType;
import com.karyasanchay.itam.entity.enums.GatePassStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "gate_passes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GatePass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id", nullable = false)
    private Asset asset;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_location_id", nullable = false)
    private Location fromLocation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_location_id", nullable = false)
    private Location toLocation;

    @Enumerated(EnumType.STRING)
    @Column(name = "pass_type", nullable = false)
    private GatePassType passType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GatePassStatus status;

    @Column(name = "issued_by")
    private Long issuedByUserId;

    @Column(name = "carrier_details")
    private String carrierDetails; // e.g., Courier AWB number or Employee name

    @Column(name = "issue_date", nullable = false)
    private LocalDateTime issueDate;

    @PrePersist
    protected void onCreate() {
        this.issueDate = LocalDateTime.now();
        if(this.status == null){
            this.status = GatePassStatus.ISSUED;
        }
    }
}
