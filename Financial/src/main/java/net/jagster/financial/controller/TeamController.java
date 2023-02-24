package net.jagster.financial.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.jagster.financial.dto.request.TeamRequest;
import net.jagster.financial.dto.response.TeamResponse;
import net.jagster.financial.entity.Team;
import net.jagster.financial.service.impl.TeamServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "teams")
@RequiredArgsConstructor
public class TeamController {

    private final TeamServiceImpl teamService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<TeamResponse> getTeams() {
        return teamService.getTeams();
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public TeamResponse postTeam(@Valid @RequestBody TeamRequest teamRequest) {
        return teamService.postTeam(teamRequest);
    }

    @GetMapping(path = "/{teamId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public TeamResponse getTeamById(@PathVariable Long teamId) {
        return teamService.getTeamById(teamId);
    }

    @PutMapping(path = "/{teamId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public TeamResponse putTeamById(@PathVariable Long teamId, @Valid @RequestBody TeamRequest teamRequest) {
        return teamService.putTeamById(teamId, teamRequest);
    }

    @DeleteMapping(path = "/{teamId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteTeamById(@PathVariable Long teamId) {
        teamService.deleteById(teamId);
    }

    @PutMapping(path = "/{teamId}/members/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public TeamResponse putTeamByIdWithMemberById() {
        return TeamResponse.builder().build();
    }

}
