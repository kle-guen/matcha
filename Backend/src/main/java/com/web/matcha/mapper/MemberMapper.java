package com.web.matcha.mapper;

import com.web.matcha.domain.enums.GenderEnum;
import com.web.matcha.domain.model.UserModel;
import com.web.matcha.web.dto.CompleteMemberDto;
import com.web.matcha.web.dto.MemberDto;
import org.mapstruct.InheritConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;

@Mapper
public interface MemberMapper {

	@Mapping(target = "id", source = "id")
	@Mapping(target = "name", source = "firstName")
	@Mapping(target = "age", source = "profile.birthdate", qualifiedByName = "mapAge")
	@Mapping(target = "nickname", source = "username")
	@Mapping(target = "sexe", source = "profile.gender", qualifiedByName = "mapGender")
	@Mapping(target = "description", source = "profile.description")
	MemberDto toMember(UserModel userDto);

	@InheritConfiguration
	CompleteMemberDto toCompleteMember(UserModel userDto);

	@Named("mapAge")
	default String mapAge(final Timestamp birthdate) {
		// Convertir le Timestamp en LocalDate
		LocalDate dateFromTimestamp = birthdate.toInstant()
				.atZone(ZoneId.systemDefault())
				.toLocalDate();

		// Obtenir la date actuelle
		LocalDate today = LocalDate.now();

		// Calculer la différence en années
		return Long.toString(ChronoUnit.YEARS.between(dateFromTimestamp, today));
	}

	@Named("mapGender")
	default String mapGender(final GenderEnum gender) {
		return gender.toString();
	}

}
