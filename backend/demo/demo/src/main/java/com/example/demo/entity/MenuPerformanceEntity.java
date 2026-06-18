package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name = "menu_performance_v")
@Data
@NoArgsConstructor

public class MenuPerformanceEntity {
    @Id
    private Long Id;
    @Column(name = "menu_item_name")
    private String menuItemName;

    private Double revenue;
    private Double profit;
    private Double margin;

    @Column(name = "quantity_sold")
    private Long quantitySold;
}
