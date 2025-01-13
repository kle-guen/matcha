package com.web.matcha.service;

import com.web.matcha.domain.dao.UserDAO;
import com.web.matcha.domain.model.UserModel;
import com.web.matcha.mapper.MemberMapper;
import com.web.matcha.web.dto.CompleteMemberDto;
import com.web.matcha.web.dto.MemberDto;
import com.web.matcha.web.dto.ResearchMembersDto;
import io.javalin.http.NotFoundResponse;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class MemberService {

	private final MemberMapper memberMapper;

	private final UserDAO userDAO;

	public List<MemberDto> researchMembers(final ResearchMembersDto researchMembersDto) {
		final List<UserModel> userModels = userDAO.researchMembers(researchMembersDto);
		return userModels.stream()
				.map(memberMapper::toMember)
				.toList();
	}

	public CompleteMemberDto getCompleteMember(final Integer memberId) {
		final UserModel userModels = userDAO.getUserById(memberId)
				.orElseThrow(() -> new NotFoundResponse("User not found"));
		return memberMapper.toCompleteMember(userModels);
	}
}
