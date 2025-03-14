package com.web.matcha.mapper;

import com.web.matcha.domain.enums.GenderEnum;
import com.web.matcha.domain.enums.SexualPreferenceEnum;
import com.web.matcha.domain.model.PictureModel;
import com.web.matcha.domain.model.ProfileModel;
import com.web.matcha.domain.model.UserModel;
import com.web.matcha.web.dto.CompleteMemberDto;
import com.web.matcha.web.dto.MatchDto;
import com.web.matcha.web.dto.MemberDto;
import com.web.matcha.web.dto.PicturesDto;
import org.mapstruct.InheritConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.AbstractMap;
import java.util.List;

@Mapper
public interface MemberMapper {

	PicturesDto toPicturesDto(PictureModel userDto);

	@Mapping(target = "id", source = "id")
	@Mapping(target = "name", source = "firstName")
	@Mapping(target = "age", source = "profile.birthdate", qualifiedByName = "mapAge")
	@Mapping(target = "nickname", source = "username")
	@Mapping(target = "sexe", source = "profile.gender", qualifiedByName = "mapGender")
	@Mapping(target = "description", source = "profile.description")
	@Mapping(target = "pictures", source = "profile.pictureModel")
	MemberDto toMember(UserModel userDto);

	@InheritConfiguration
	@Mapping(target = "city", source = "profile.city")
	@Mapping(target = "lookingFor", expression = "java(mapLookingFor(userDto.getProfile()))")
	@Mapping(target = "interests", source = "profile.interests")
	@Mapping(target = "fameRating", source = "profile.fameRating")
	CompleteMemberDto toCompleteMember(UserModel userDto);

	MatchDto toMatchDto(UserModel userDto);

	@Named("mapAge")
	default Integer mapAge(final Timestamp birthdate) {
		// Convertir le Timestamp en LocalDate
		LocalDate dateFromTimestamp = birthdate.toInstant()
				.atZone(ZoneId.systemDefault())
				.toLocalDate();

		// Obtenir la date actuelle
		LocalDate today = LocalDate.now();

		// Calculer la différence en années
		return Math.toIntExact(ChronoUnit.YEARS.between(dateFromTimestamp, today));
	}

	@Named("mapGender")
	default String mapGender(final GenderEnum gender) {
		return gender.toString();
	}

	default List<String> mapLookingFor(final ProfileModel profile) {
		final List<AbstractMap.SimpleEntry<SexualPreferenceEnum, GenderEnum>> sexualPreferences = SexualPreferenceEnum.searchedGender(profile.getSexualPreference(), profile.getGender());

		return sexualPreferences.stream()
				.map(entry -> {
					if (entry.getValue() == GenderEnum.FEMALE) {
						return "woman";
					}
					return "man";
				})
				.distinct()
				.toList();
	}
}
