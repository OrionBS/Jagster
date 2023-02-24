package net.jagster.financial.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class TeamResponse {
    private Long id;
    private String name;
    private String description;
    private String userOwnerId;
    private List<String> userMemberIds = new ArrayList<>();
}
