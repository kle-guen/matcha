package com.web.matcha.service;


import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.dao.LikeDAO;
import com.web.matcha.domain.dao.PicturesDAO;
import com.web.matcha.domain.dao.ProfileDAO;
import com.web.matcha.domain.dao.UserDAO;
import com.web.matcha.domain.enums.SortResearchUsersEnum;
import com.web.matcha.domain.enums.TypeNotificationEnum;
import com.web.matcha.domain.model.InterestModel;
import com.web.matcha.domain.model.ProfileModel;
import com.web.matcha.domain.model.UserModel;
import com.web.matcha.mapper.MemberMapper;
import com.web.matcha.service.BlockService;
import com.web.matcha.service.NotificationService;
import com.web.matcha.web.dto.CompleteMemberDto;
import com.web.matcha.web.dto.MatchDto;
import com.web.matcha.web.dto.MemberDto;
import com.web.matcha.web.dto.ResearchMembersDto;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;

import java.util.List;
import java.util.Objects;
import java.util.Set;

@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;
    private final UserDAO userDAO;
    private final ProfileDAO profileDAO;
    private final LikeDAO likeDAO;
    private final PicturesDAO picturesDAO;
    private final NotificationService notificationService;
    private final BlockService blockService;

    public List<MemberDto> researchMembers(final ResearchMembersDto researchMembersDto, final SortResearchUsersEnum sortBy) {
        // Implement the logic for researching members
        return List.of(); // Placeholder
    }

    public List<MemberDto> suggestMembers(final SortResearchUsersEnum sortBy) {
        // Implement the logic for suggesting members
        return List.of(); // Placeholder
    }

    private Integer calculateScore(final ProfileModel profile, final ProfileModel currentUserProfile) {
        // Implement the logic for calculating score
        return 0; // Placeholder
    }

    public CompleteMemberDto getCompleteMember(final Integer memberId) throws Exception {
        if (blockService.isBlockedOrBlocker(memberId)) {
            throw new Exception("You can't get this member");
        }
        final UserModel userModel = userDAO.getUserById(memberId)
                .orElseThrow(() -> new Exception("User not found"));

        picturesDAO.getPicturesById(userModel.getId()).ifPresent(pictureModel -> userModel.getProfile().setPictureModel(pictureModel));

        final CompleteMemberDto completeMemberDto = memberMapper.toCompleteMember(userModel);
        completeMemberDto.setLiked(likeDAO.getLikesByLikerId(UserHolder.getUserId()).stream()
                .anyMatch(likeModel -> Objects.equals(likeModel.getLikedId(), memberId)));

        this.notificationService.sendNotificationToUser(memberId, TypeNotificationEnum.VISIT, userDAO.getUsernameById(UserHolder.getUserId())
                .orElseThrow(() -> new Exception("User not found")));
        return completeMemberDto;
    }

    public void reportMember(final Integer memberId) throws Exception {
        // Implement the logic for reporting a member
    }

    public void likeMember(final Integer memberId) throws Exception {
        if (blockService.isBlockedOrBlocker(memberId) || Objects.equals(UserHolder.getUserId(), memberId)) {
            throw new Exception("You can't like this member");
        }

        TypeNotificationEnum type = TypeNotificationEnum.LIKE;
        if (likeDAO.getLikesByLikerId(UserHolder.getUserId()).stream()
                .anyMatch(likeModel -> Objects.equals(likeModel.getLikedId(), memberId))) {
            likeDAO.unlikeUser(UserHolder.getUserId(), memberId);
            type = TypeNotificationEnum.UNLIKE;
        } else {
            likeDAO.likeUser(UserHolder.getUserId(), memberId);
            if (likeDAO.getLikesByLikerId(memberId).stream()
                    .anyMatch(likeModel -> Objects.equals(likeModel.getLikedId(), UserHolder.getUserId()))) {
                type = TypeNotificationEnum.MATCH;
            }
        }
        this.notificationService.sendNotificationToUser(memberId, type, userDAO.getUsernameById(UserHolder.getUserId())
                .orElseThrow(() -> new Exception("User not found")));
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
        // Implement the logic for sorting and mapping users
        return List.of(); // Placeholder
    }

    public List<MatchDto> getMatches() {
        // Implement the logic for getting matches
        return List.of(); // Placeholder
    }

    public Set<Integer> getConnectedMembers() {
        // Implement the logic for getting connected members
        return Set.of(); // Placeholder
    }
}