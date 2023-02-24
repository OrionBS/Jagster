package net.jagster.financial.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String icon;
}
