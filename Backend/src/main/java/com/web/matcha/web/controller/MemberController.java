package com.web.matcha.web.controller;

import com.web.matcha.domain.enums.SortResearchUsersEnum;
import com.web.matcha.service.BlockService;
import com.web.matcha.service.MemberService;
import com.web.matcha.web.dto.ResearchMembersDto;
import io.javalin.Javalin;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MemberController extends AbstractController {

	private final MemberService memberService;

	private final BlockService blockService;

	@Override
	public void registerRoutes(final Javalin app) {
		//GET
		app.get("/members/suggest", this::suggestMembers);
		app.get("/members/connected", this::getConnectedMembers);
		app.get("/members/{id}", this::getCompleteMember);
		app.get("/matches", this::getMatches);

		//POST
		app.post("/members/research", this::researchMembers);
		app.post("/members/{id}/block", this::blockMember);
		app.post("/members/{id}/report", this::reportMember);
		app.post("/members/{id}/like", this::likeMember);
	}

	/**
	 * Research members
	 *
	 * @param ctx
	 */
	private void researchMembers(final Context ctx) {
		ResearchMembersDto researchMembersDto = ctx.bodyAsClass(ResearchMembersDto.class);
		SortResearchUsersEnum sortBy = SortResearchUsersEnum.getValue(ctx.queryParam("sortBy"));
		ctx.status(HttpStatus.ACCEPTED.getCode())
				.json(memberService.researchMembers(researchMembersDto, sortBy));
	}

	/**
	 * Research members
	 *
	 * @param ctx
	 */
	private void suggestMembers(final Context ctx) {
		SortResearchUsersEnum sortBy = SortResearchUsersEnum.getValue(ctx.queryParam("sortBy"));
		ctx.status(HttpStatus.ACCEPTED.getCode())
				.json(memberService.suggestMembers(sortBy));
	}

	/**
	 * Get complete member
	 *
	 * @param ctx
	 */
	private void getCompleteMember(final Context ctx) {
		final Integer id = Integer.parseInt(ctx.pathParam("id"));
		ctx.status(HttpStatus.ACCEPTED.getCode())
				.json(memberService.getCompleteMember(id));
	}

	/**
	 * Block a member
	 *
	 * @param ctx
	 */
	private void blockMember(final Context ctx) {
		final Integer id = Integer.parseInt(ctx.pathParam("id"));
		blockService.blockMember(id);
		ctx.status(HttpStatus.ACCEPTED.getCode());
	}

	/**
	 * Report a member
	 *
	 * @param ctx
	 */
	private void reportMember(final Context ctx) {
		final Integer id = Integer.parseInt(ctx.pathParam("id"));
		memberService.reportMember(id);
		ctx.status(HttpStatus.ACCEPTED.getCode());
	}

	/**
	 * Like a member
	 *
	 * @param ctx
	 */
	private void likeMember(final Context ctx) {
		final Integer id = Integer.parseInt(ctx.pathParam("id"));
		memberService.likeMember(id);
		ctx.status(HttpStatus.ACCEPTED.getCode());
	}

	private void getMatches(Context ctx) {
		ctx.json(memberService.getMatches());
	}

	private void getConnectedMembers(Context ctx) {
		ctx.json(memberService.getConnectedMembers());
	}
}
