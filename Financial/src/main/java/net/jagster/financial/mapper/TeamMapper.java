package net.jagster.financial.mapper;

import net.jagster.financial.dto.response.TeamResponse;
import net.jagster.financial.entity.Team;

public class TeamMapper {

    public static TeamResponse toTeamResponse(Team team) {
        return TeamResponse.builder()
                .id(team.getId())
                .name(team.getName())
                .description(team.getDescription())
                .userOwnerId(team.getUserOwnerId())
                .userMemberIds(team.getUserMemberIds())
                .build();
    }

}
