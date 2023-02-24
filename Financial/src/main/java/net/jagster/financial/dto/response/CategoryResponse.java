package net.jagster.financial.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class CategoryResponse {
    private Long id;
    private String name;
    private String icon;
}
