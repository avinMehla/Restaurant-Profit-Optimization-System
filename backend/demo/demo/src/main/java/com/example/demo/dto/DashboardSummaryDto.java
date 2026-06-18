package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class DashboardSummaryDto {
    private Double totalRevenue;
    private Double totalProfit;
    private Long totalQuantitySold;
    private Double profitMargin;
    private Double avgSellingPrice;




}
