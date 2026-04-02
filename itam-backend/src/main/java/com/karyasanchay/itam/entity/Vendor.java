package com.karyasanchay.itam.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vendors")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vendor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "contact_person")
    private String contactPerson;

    private String email;
    private String phone;

    @Column(name = "gst_number", unique = true)
    private String gstNumber; // For Indian GST input tax credit matching

    @Column(length = 20)
    private String status = "ACTIVE"; // e.g., ACTIVE, INACTIVE
}
