package com.example.demo.controller;

import com.example.demo.dto.RecommendationDto;
import com.example.demo.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/recommendations")
    public List<RecommendationDto> getRecommendations() {

        return recommendationService.getRecommendations();
    }
}