package com.web.matcha.web.controller;

import com.web.matcha.service.MemberService;
import com.web.matcha.web.dto.ResearchMembersDto;
import io.javalin.Javalin;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;

public class MemberController extends AbstractController {

	private final MemberService memberService;

	public MemberController(final MemberService memberService) {
		this.memberService = memberService;
	}

	@Override
	public void registerRoutes(final Javalin app) {
		app.post("/members/research", this::researchUsers);
		app.post("/members/{id}", this::getCompleteMember);
	}

	private void researchUsers(final Context ctx) {
		ResearchMembersDto researchMembersDto = ctx.bodyAsClass(ResearchMembersDto.class);
		ctx.status(HttpStatus.ACCEPTED.getCode())
				.json(memberService.researchMembers(researchMembersDto));
	}

	private void getCompleteMember(final Context ctx) {
		final Integer id = Integer.parseInt(ctx.pathParam("id"));
		ctx.status(HttpStatus.ACCEPTED.getCode())
				.json(memberService.getCompleteMember(id));
	}


}
