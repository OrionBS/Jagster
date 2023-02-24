package net.jagster.financial.service;

import net.jagster.financial.dto.request.TeamRequest;
import net.jagster.financial.dto.response.TeamResponse;
import net.jagster.financial.dto.response.TeamResponse;
import net.jagster.financial.entity.Team;
import net.jagster.financial.entity.Team;

import java.util.List;

public interface TeamService {
    List<Team> findTeams();

    List<TeamResponse> getTeams();

    Team findTeamById(Long teamId);

    TeamResponse getTeamById(Long teamId);

    TeamResponse postTeam(TeamRequest teamRequest);

    TeamResponse putTeamById(Long teamId, TeamRequest teamRequest);

    void deleteById(Long teamId);

    Team insertTeam(TeamRequest teamRequest);

    Team updateTeamById(Long teamId, TeamRequest teamRequest);
}
