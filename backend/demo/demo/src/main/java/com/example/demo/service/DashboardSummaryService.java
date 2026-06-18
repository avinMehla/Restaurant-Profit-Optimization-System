package com.example.demo.service;

import com.example.demo.dto.DashboardSummaryDto;
import com.example.demo.entity.DashboardSummaryEntity;
import com.example.demo.repository.DashboardSummaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardSummaryService {

    @Autowired
    private DashboardSummaryRepository dashboardSummaryRepository;

    public DashboardSummaryDto getDashboardSummary() {

        DashboardSummaryEntity entity =
                dashboardSummaryRepository
                        .findById(1L)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Dashboard Summary Not Found"));

        return new DashboardSummaryDto(
                entity.getTotalRevenue(),
                entity.getTotalProfit(),
                entity.getTotalQuantitySold(),
                entity.getProfitMargin(),
                entity.getAvgSellingPrice()
        );
    }
}