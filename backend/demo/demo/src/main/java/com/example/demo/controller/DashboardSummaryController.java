package com.example.demo.controller;

import com.example.demo.dto.DashboardSummaryDto;
import com.example.demo.entity.DashboardSummaryEntity;
import com.example.demo.service.DashboardSummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DashboardSummaryController {

    @Autowired
    private DashboardSummaryService dashboardSummaryService;

    @GetMapping("/dashboard/summary")
    public DashboardSummaryDto getDashboardSummary() {

        return dashboardSummaryService.getDashboardSummary();
    }
}