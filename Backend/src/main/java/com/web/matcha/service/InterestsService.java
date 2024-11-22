package com.web.matcha.service;

import com.web.matcha.domain.dao.InterestDAO;
import com.web.matcha.mapper.InterestMapper;
import com.web.matcha.web.dto.InterestDto;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class InterestsService {

	private final InterestDAO interestDAO;

	private final InterestMapper interestMapper;

	public List<InterestDto> getInterests() {
		return interestDAO.getInterests().stream()
				.map(interestMapper::toDto)
				.toList();
	}

}
