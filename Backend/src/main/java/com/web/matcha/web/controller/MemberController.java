package com.web.matcha.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.matcha.domain.enums.SortResearchUsersEnum;
import com.web.matcha.service.BlockService;
import com.web.matcha.service.MemberService;
import com.web.matcha.web.dto.ResearchMembersDto;
import lombok.RequiredArgsConstructor;

import static spark.Spark.*;

@RequiredArgsConstructor
public class MemberController extends AbstractController {

    private final MemberService memberService;
    private final BlockService blockService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void registerRoutes() {
        // GET
        get("/members/suggest", this::suggestMembers);
        get("/members/connected", this::getConnectedMembers);
        get("/members/:id", this::getCompleteMember);
        get("/matches", this::getMatches);

        // POST
        post("/members/research", this::researchMembers);
        post("/members/:id/block", this::blockMember);
        post("/members/:id/report", this::reportMember);
        post("/members/:id/like", this::likeMember);
    }

    private Object researchMembers(spark.Request request, spark.Response response) throws Exception {
        ResearchMembersDto researchMembersDto = objectMapper.readValue(request.body(), ResearchMembersDto.class);
        SortResearchUsersEnum sortBy = SortResearchUsersEnum.getValue(request.queryParams("sortBy"));
        response.status(202);
        response.type("application/json");
        return objectMapper.writeValueAsString(memberService.researchMembers(researchMembersDto, sortBy));
    }

    private Object suggestMembers(spark.Request request, spark.Response response) throws Exception {
        SortResearchUsersEnum sortBy = SortResearchUsersEnum.getValue(request.queryParams("sortBy"));
        response.status(202);
        response.type("application/json");
        return objectMapper.writeValueAsString(memberService.suggestMembers(sortBy));
    }

    private Object getCompleteMember(spark.Request request, spark.Response response) throws Exception {
        final Integer id = Integer.parseInt(request.params(":id"));
        response.status(202);
        response.type("application/json");
        return objectMapper.writeValueAsString(memberService.getCompleteMember(id));
    }

    private Object blockMember(spark.Request request, spark.Response response) throws Exception {
        final Integer id = Integer.parseInt(request.params(":id"));
        blockService.blockMember(id);
        response.status(202);
        return "Member blocked successfully";
    }

    private Object reportMember(spark.Request request, spark.Response response) throws Exception {
        final Integer id = Integer.parseInt(request.params(":id"));
        memberService.reportMember(id);
        response.status(202);
        return "Member reported successfully";
    }

    private Object likeMember(spark.Request request, spark.Response response) throws Exception {
        final Integer id = Integer.parseInt(request.params(":id"));
        memberService.likeMember(id);
        response.status(202);
        return "Member liked successfully";
    }

    private Object getMatches(spark.Request request, spark.Response response) throws Exception {
        response.type("application/json");
        return objectMapper.writeValueAsString(memberService.getMatches());
    }

    private Object getConnectedMembers(spark.Request request, spark.Response response) throws Exception {
        response.type("application/json");
        return objectMapper.writeValueAsString(memberService.getConnectedMembers());
    }
}