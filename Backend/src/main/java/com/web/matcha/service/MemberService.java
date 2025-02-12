package com.web.matcha.service;

import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.dao.BlockDAO;
import com.web.matcha.domain.dao.LikeDAO;
import com.web.matcha.domain.dao.PicturesDAO;
import com.web.matcha.domain.dao.ProfileDAO;
import com.web.matcha.domain.dao.UserDAO;
import com.web.matcha.domain.dao.VisitDAO;
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

	private final VisitDAO visitDAO;

	private final PicturesDAO picturesDAO;

	public List<MemberDto> researchMembers(final ResearchMembersDto researchMembersDto, final SortResearchUsersEnum sortBy) {
		final ProfileModel currentUserProfile = profileDAO.getProfileById(UserHolder.getUserId())
				.orElseThrow(() -> new NotFoundResponse("Profile of current user not found"));
		final List<UserModel> userModels = userDAO.researchMembers(researchMembersDto, currentUserProfile);
		userModels.forEach(userModel -> picturesDAO.getPicturesById(userModel.getId()).ifPresent(pictureModel -> userModel.getProfile().setPictureModel(pictureModel)));

		if (CollectionUtils.isEmpty(userModels)) {
			return List.of();
		}
		userModels.removeIf(userModel -> isBlockedOrBlocker(userModel.getId()));

		return sortAndMapUsers(userModels, sortBy, currentUserProfile);
	}

	public List<MemberDto> suggestMembers(final SortResearchUsersEnum sortBy) {
		final ProfileModel currentUserProfile = profileDAO.getProfileById(UserHolder.getUserId())
				.orElseThrow(() -> new NotFoundResponse("Profile of current user not found"));
		final List<UserModel> userModels = userDAO.researchMembers(new ResearchMembersDto(), currentUserProfile);

		userModels.forEach(userModel -> picturesDAO.getPicturesById(userModel.getId()).ifPresent(pictureModel -> userModel.getProfile().setPictureModel(pictureModel)));

		if (CollectionUtils.isEmpty(userModels)) {
			return List.of();
		}
		userModels.removeIf(userModel -> isBlockedOrBlocker(userModel.getId()));

		userModels.sort(Comparator.comparing(userModel -> calculateScore(userModel.getProfile(), currentUserProfile)));

		return sortAndMapUsers(userModels.subList(0, Math.min(userModels.size(), 20)), sortBy, currentUserProfile);
	}


	private Integer calculateScore(final ProfileModel profile, final ProfileModel currentUserProfile) {
		final Integer distanceScore = profileDAO.getDistance(profile.getLatitude(), profile.getLongitude(), currentUserProfile.getLatitude(), currentUserProfile.getLongitude());
		final Integer ageScore = memberMapper.mapAge(profile.getBirthdate()) - memberMapper.mapAge(currentUserProfile.getBirthdate()) * 5;
		final int interestScore = countCommonInterests(profile.getInterests(), currentUserProfile.getInterests()) * 5;

		return distanceScore + ageScore - interestScore;
	}

	public CompleteMemberDto getCompleteMember(final Integer memberId) {
		if (isBlockedOrBlocker(memberId)) {
			throw new ForbiddenResponse("You can't get this member");
		}
		final UserModel userModel = userDAO.getUserById(memberId)
				.orElseThrow(() -> new NotFoundResponse("User not found"));

		picturesDAO.getPicturesById(userModel.getId()).ifPresent(pictureModel -> userModel.getProfile().setPictureModel(pictureModel));

		final CompleteMemberDto completeMemberDto = memberMapper.toCompleteMember(userModel);
		completeMemberDto.setLiked(likeDAO.getLikesByLikerId(UserHolder.getUserId()).stream()
				.anyMatch(likeModel -> Objects.equals(likeModel.getLikedId(), memberId)));

		visitDAO.addVisit(UserHolder.getUserId(), memberId);

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
		if (likeDAO.getLikesByLikerId(UserHolder.getUserId()).stream()
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

	private Integer countCommonInterests(final List<InterestModel> interests1, final List<InterestModel> interests2) {
		final List<String> codeInterests2 = interests2.stream()
				.map(InterestModel::getCode)
				.toList();

		final List<String> codeInterests1 = interests1.stream()
				.map(InterestModel::getCode)
				.toList();

		return CollectionUtils.intersection(codeInterests1, codeInterests2).size();
	}

	private List<MemberDto> sortAndMapUsers(final List<UserModel> userModels, final SortResearchUsersEnum sortBy, final ProfileModel currentUserProfile) {
		if (sortBy != null) {
			switch (sortBy) {
				case AGE:
					userModels.sort(Comparator.comparing(userModel -> userModel.getProfile().getBirthdate()));
					Collections.reverse(userModels);
					break;
				case FAME_RATING:
					userModels.sort(Comparator.comparing(userModel -> userModel.getProfile().getFameRating()));
					Collections.reverse(userModels);
					break;
				case COMMON_INTERESTS:
					userModels.sort(Comparator.comparing(userModel -> countCommonInterests(userModel.getProfile().getInterests(), currentUserProfile.getInterests())));
					Collections.reverse(userModels);
					break;
				case DISTANCE:
					userModels.sort(Comparator.comparing(userModel -> profileDAO.getDistance(userModel.getProfile().getLatitude(), userModel.getProfile().getLongitude(), currentUserProfile.getLatitude(), currentUserProfile.getLongitude())));
					break;
			}
		}

		return userModels.stream()
				.map(memberMapper::toMember)
				.toList();
	}
}
