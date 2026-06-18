package com.example.demo.service;

import com.example.demo.dto.RecommendationDto;
import com.example.demo.entity.RecommendationBaseEntity;
import com.example.demo.repository.RecommendationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecommendationService {

    @Autowired
    private RecommendationRepository recommendationRepository;

    public List<RecommendationDto> getRecommendations() {

        List<RecommendationBaseEntity> items =
                recommendationRepository.findAll();

        double avgRevenue =
                items.stream()
                        .mapToDouble(RecommendationBaseEntity::getRevenue)
                        .average()
                        .orElse(0);

        double avgProfit =
                items.stream()
                        .mapToDouble(RecommendationBaseEntity::getProfit)
                        .average()
                        .orElse(0);

        double avgMargin =
                items.stream()
                        .mapToDouble(RecommendationBaseEntity::getMargin)
                        .average()
                        .orElse(0);

        double avgQuantity =
                items.stream()
                        .mapToDouble(RecommendationBaseEntity::getQuantitySold)
                        .average()
                        .orElse(0);

        double avgCostVariance =
                items.stream()
                        .mapToDouble(RecommendationBaseEntity::getCostVariance)
                        .average()
                        .orElse(0);

        List<RecommendationDto> recommendations =
                new ArrayList<>();

        for (RecommendationBaseEntity item : items) {

            String recommendation = null;
            String reason = null;

            // Rule 1 - Highest Priority
            if (item.getRevenue() > avgRevenue
                    && item.getMargin() < avgMargin) {

                recommendation = "Increase Price";
                reason =
                        "Revenue is above average but margin is below average.";

            }

            // Rule 2
            else if (item.getProfit() > avgProfit
                    && item.getQuantitySold() < avgQuantity) {

                recommendation = "Promote Item";
                reason =
                        "Item is profitable but sales volume is below average.";

            }

            // Rule 3
            else if (item.getCostVariance() > avgCostVariance) {

                recommendation = "Review Supplier Costs";
                reason =
                        "Ingredient cost variance is above average.";

            }

            // Rule 4
            else if (item.getRevenue() < avgRevenue
                    && item.getProfit() < avgProfit) {

                recommendation = "Consider Removing Item";
                reason =
                        "Revenue and profit are both below average.";

            }

            if (recommendation != null) {

                recommendations.add(
                        new RecommendationDto(
                                item.getMenuItemName(),
                                recommendation,
                                reason
                        )
                );
            }
        }

        return recommendations;
    }
}