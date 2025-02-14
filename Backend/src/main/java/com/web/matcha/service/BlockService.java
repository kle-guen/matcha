package com.web.matcha.service;

import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.dao.BlockDAO;
import lombok.RequiredArgsConstructor;

import java.util.Objects;

@RequiredArgsConstructor
public class BlockService {

	private final BlockDAO blockDAO;

	public boolean isBlockedOrBlocker(final Integer memberId) {
		return blockDAO.getBlockedAndBlockerByUserId(UserHolder.getUserId()).stream()
				.anyMatch(blockModel -> Objects.equals(blockModel.getBlockedId(), memberId)
						|| Objects.equals(blockModel.getBlockerId(), memberId));
	}

	public void blockMember(final Integer memberId) {
		if (blockDAO.getBlockedByUserId(UserHolder.getUserId()).stream()
				.anyMatch(blockModel -> Objects.equals(blockModel.getBlockedId(), memberId))) {
			blockDAO.unblockUser(UserHolder.getUserId(), memberId);
		} else {
			blockDAO.blockUser(UserHolder.getUserId(), memberId);
		}
	}
}
