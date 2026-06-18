package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "dashboard_summary_v")
@Data
@NoArgsConstructor
public class DashboardSummaryEntity {

    @Id
    private Long id;

    @Column(name = "total_revenue")
    private Double totalRevenue;

    @Column(name = "total_profit")
    private Double totalProfit;

    @Column(name = "profit_margin")
    private Double profitMargin;

    @Column(name = "total_quantity_sold")
    private Long totalQuantitySold;

    @Column(name = "avg_selling_price")
    private Double avgSellingPrice;
}