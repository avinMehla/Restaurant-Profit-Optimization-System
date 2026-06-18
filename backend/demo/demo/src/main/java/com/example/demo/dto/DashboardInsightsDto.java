package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardInsightsDto {

    private String topRevenueItem;

    private String mostProfitableItem;

    private String highestMarginItem;

}