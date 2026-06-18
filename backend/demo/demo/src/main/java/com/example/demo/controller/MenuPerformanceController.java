package com.example.demo.controller;

import com.example.demo.dto.MenuPerformanceDto;
import com.example.demo.service.MenuPerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
public class MenuPerformanceController {
    @Autowired
    private MenuPerformanceService menuPerformanceService;
    @GetMapping("/menu/performance")
    public List<MenuPerformanceDto> getMenuPerformance() {
   return menuPerformanceService.getMenuPerformance();

    }
}