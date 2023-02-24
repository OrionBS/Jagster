package net.jagster.financial.service.impl;

import lombok.RequiredArgsConstructor;
import net.jagster.financial.dto.request.TeamRequest;
import net.jagster.financial.dto.response.TeamResponse;
import net.jagster.financial.entity.Team;
import net.jagster.financial.exception.ConflictTeamException;
import net.jagster.financial.exception.UnknownTeamException;
import net.jagster.financial.mapper.TeamMapper;
import net.jagster.financial.repository.TeamRepository;
import net.jagster.financial.service.TeamService;
import net.jagster.financial.service.TeamService;
import net.jagster.financial.util.JwtUtil;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
    private final TeamRepository teamRepository;

    @Override
    @Transactional
    public List<TeamResponse> getTeams() {
        return findTeams()
                .stream()
                .map(TeamMapper::toTeamResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<Team> findTeams() {
        return teamRepository.findAll();
    }

    @Override
    @Transactional
    public TeamResponse getTeamById(Long teamId) {
        return TeamMapper.toTeamResponse(findTeamById(teamId));
    }

    @Override
    public Team findTeamById(Long teamId) {
        return teamRepository.findById(teamId).orElseThrow(() -> {
            throw new UnknownTeamException();
        });
    }

    @Override
    @Transactional
    public TeamResponse postTeam(TeamRequest teamRequest) {
        return TeamMapper.toTeamResponse(insertTeam(teamRequest));
    }

    @Override
    public Team insertTeam(TeamRequest teamRequest) {
        Team team = new Team();
        team.setName(teamRequest.getName());
        team.setDescription(teamRequest.getDescription());
        team.setUserOwnerId(JwtUtil.getSubject());
        team.getUserMemberIds().add(JwtUtil.getSubject());
        return teamRepository.save(team);
    }

    @Override
    @Transactional
    public TeamResponse putTeamById(Long teamId, TeamRequest teamRequest) {
        return TeamMapper.toTeamResponse(this.updateTeamById(teamId, teamRequest));
    }

    @Override
    public Team updateTeamById(Long teamId, TeamRequest teamRequest) {
        Team team = teamRepository.findById(teamId).orElseThrow(() -> {
            throw new UnknownTeamException();
        });
        team.setName(teamRequest.getName());
        team.setDescription(teamRequest.getDescription());
        return teamRepository.save(team);
    }

    @Override
    public void deleteById(Long teamId) {
        Team team = teamRepository.findById(teamId).orElseThrow(() -> {
            throw new UnknownTeamException();
        });
        teamRepository.delete(team);
    }

}
