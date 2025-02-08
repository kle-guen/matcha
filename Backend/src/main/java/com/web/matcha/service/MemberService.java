package com.web.matcha.service;

import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.dao.BlockDAO;
import com.web.matcha.domain.dao.LikeDAO;
import com.web.matcha.domain.dao.ProfileDAO;
import com.web.matcha.domain.dao.UserDAO;
import com.web.matcha.domain.enums.SortResearchUsersEnum;
import com.web.matcha.domain.model.InterestModel;
import com.web.matcha.domain.model.ProfileModel;
import com.web.matcha.domain.model.UserModel;
import com.web.matcha.mapper.MemberMapper;
import com.web.matcha.web.dto.CompleteMemberDto;
import com.web.matcha.web.dto.MemberDto;
import com.web.matcha.web.dto.ResearchMembersDto;
import io.javalin.http.ForbiddenResponse;
import io.javalin.http.NotFoundResponse;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
public class MemberService {

	private final MemberMapper memberMapper;

	private final UserDAO userDAO;

	private final ProfileDAO profileDAO;

	private final BlockDAO blockDAO;

	private final LikeDAO likeDAO;

	public List<MemberDto> researchMembers(final ResearchMembersDto researchMembersDto, final SortResearchUsersEnum sortBy, final Boolean isAscending) {
		final List<UserModel> userModels = userDAO.researchMembers(researchMembersDto);

		if (CollectionUtils.isEmpty(userModels)) {
			return List.of();
		}

		//Remove if member is blocked by the user or has blocked the user
		userModels.removeIf(userModel -> isBlockedOrBlocker(userModel.getId()));

		if (sortBy != null) {
			switch (sortBy) {
				case AGE:
					userModels.sort(Comparator.comparing(userModel -> userModel.getProfile().getBirthdate()));
					break;
				case FAME_RATING:
					userModels.sort(Comparator.comparing(userModel -> userModel.getProfile().getFameRating()));
					break;
				case COMMON_INTERESTS:
					userModels.sort(Comparator.comparing(userModel -> countCommonInterests(userModel.getProfile().getInterests())));
					break;
				case DISTANCE:
					userModels.sort(Comparator.comparing(userModel -> getDistance(userModel.getProfile().getLatitude(), userModel.getProfile().getLongitude())));
					break;
			}
			if (!isAscending) {
				Collections.reverse(userModels);
			}
		}

		return userModels.stream()
				.map(memberMapper::toMember)
				.toList();
	}

	private Integer getDistance(final Float latitude, final Float longitude) {
		ProfileModel profileModel = profileDAO.getProfileById(UserHolder.getUserId())
				.orElseThrow(() -> new NotFoundResponse("Profile not found"));

		return profileDAO.getDistance(profileModel.getLatitude(), profileModel.getLongitude(), latitude, longitude);
	}

	private Integer countCommonInterests(final List<InterestModel> interests) {
		List<String> userInterest = profileDAO.getProfileById(UserHolder.getUserId())
				.orElseThrow(() -> new NotFoundResponse("Profile not found"))
				.getInterests().stream()
				.map(InterestModel::getCode)
				.toList();

		List<String> memberInterests = interests.stream()
				.map(InterestModel::getCode)
				.toList();

		return CollectionUtils.intersection(userInterest, memberInterests).size();
	}

	public CompleteMemberDto getCompleteMember(final Integer memberId) {
		final UserModel userModels = userDAO.getUserById(memberId)
				.orElseThrow(() -> new NotFoundResponse("User not found"));
		final CompleteMemberDto completeMemberDto = memberMapper.toCompleteMember(userModels);
		completeMemberDto.setLiked(likeDAO.getLikesByUserId(UserHolder.getUserId()).stream()
				.anyMatch(likeModel -> Objects.equals(likeModel.getLikedId(), memberId)));
		return completeMemberDto;
	}

	public void blockMember(final Integer memberId) {
		if (blockDAO.getBlockedByUserId(UserHolder.getUserId()).stream()
				.anyMatch(blockModel -> Objects.equals(blockModel.getBlockedId(), memberId))) {
			blockDAO.unblockUser(UserHolder.getUserId(), memberId);
		} else {
			blockDAO.blockUser(UserHolder.getUserId(), memberId);
		}
	}

	public void reportMember(final Integer memberId) {
		//TODO: Implement: Envoi email administrateur || Stockage BDD ?
	}

	public void likeMember(final Integer memberId) {
		if (isBlockedOrBlocker(memberId)) {
			throw new ForbiddenResponse("You can't like this member");
		}
		if (likeDAO.getLikesByUserId(UserHolder.getUserId()).stream()
				.anyMatch(likeModel -> Objects.equals(likeModel.getLikedId(), memberId))) {
			likeDAO.unlikeUser(UserHolder.getUserId(), memberId);
		} else {
			likeDAO.likeUser(UserHolder.getUserId(), memberId);
		}
	}

	private boolean isBlockedOrBlocker(final Integer memberId) {
		return blockDAO.getBlockedAndBlockerByUserId(UserHolder.getUserId()).stream()
				.anyMatch(blockModel -> Objects.equals(blockModel.getBlockedId(), memberId)
						|| Objects.equals(blockModel.getBlockerId(), memberId));
	}
}
