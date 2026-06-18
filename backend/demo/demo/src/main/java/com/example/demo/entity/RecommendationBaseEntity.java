package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "recommendation_base_v")
@Data
@NoArgsConstructor
public class RecommendationBaseEntity {

    @Id
    @Column(name = "menu_item_name")
    private String menuItemName;

    private Double revenue;

    private Double profit;

    private Double margin;

    @Column(name = "quantity_sold")
    private Long quantitySold;

    @Column(name = "cost_variance")
    private Double costVariance;
}