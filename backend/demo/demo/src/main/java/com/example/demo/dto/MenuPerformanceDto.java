package com.example.demo.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor



public class MenuPerformanceDto {
    private String menuItemName;
    private Double revenue;
    private Double profit;
    private Double margin;
    private Long quantitySold;
}