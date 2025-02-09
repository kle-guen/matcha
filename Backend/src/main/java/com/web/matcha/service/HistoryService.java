package com.web.matcha.service;

import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.dao.LikeDAO;
import com.web.matcha.domain.dao.UserDAO;
import com.web.matcha.domain.dao.VisitDAO;
import com.web.matcha.domain.enums.HistoryType;
import com.web.matcha.domain.model.LikeModel;
import com.web.matcha.domain.model.VisitModel;
import com.web.matcha.web.dto.HistoryDto;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RequiredArgsConstructor
public class HistoryService {

	private final VisitDAO visitDAO;

	private final LikeDAO likeDAO;

	private final UserDAO userDAO;

	public List<HistoryDto> getHistory() {
		final List<VisitModel> visitModels = visitDAO.getVisitsByVisitedId(UserHolder.getUserId());
		final List<LikeModel> likeModels = likeDAO.getLikesByLikedId(UserHolder.getUserId());

		final List<HistoryDto> historyDtos = new ArrayList<>(visitModels.stream()
				.map(visitModel -> HistoryDto.builder()
						.type(HistoryType.VIEW)
						.date(visitModel.getVisitedAt().toLocalDateTime())
						.user(userDAO.getUsernameById(visitModel.getVisitorId()).orElse(""))
						.build())
				.toList());

		historyDtos.addAll(likeModels.stream()
				.map(likeModel -> HistoryDto.builder()
						.type(HistoryType.LIKE)
						.date(likeModel.getCreatedAt().toLocalDateTime())
						.user(userDAO.getUsernameById(likeModel.getLikerId()).orElse(""))
						.build())
				.toList());

		historyDtos.sort(Comparator.comparing(HistoryDto::getDate).reversed());

		return historyDtos;
	}

}
