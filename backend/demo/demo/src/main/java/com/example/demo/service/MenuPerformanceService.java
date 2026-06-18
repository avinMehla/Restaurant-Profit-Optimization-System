package com.example.demo.service;

import com.example.demo.dto.MenuPerformanceDto;
import com.example.demo.entity.MenuPerformanceEntity;
import com.example.demo.repository.MenuPerformanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MenuPerformanceService {

    @Autowired
    private MenuPerformanceRepository menuPerformanceRepository;

    public List<MenuPerformanceDto> getMenuPerformance() {

        List<MenuPerformanceEntity> entities =
                menuPerformanceRepository.findAll();

        return entities.stream()
                .map(entity -> new MenuPerformanceDto(
                        entity.getMenuItemName(),
                        entity.getRevenue(),
                        entity.getProfit(),
                        entity.getMargin(),
                        entity.getQuantitySold()
                ))
                .collect(Collectors.toList());
    }
}