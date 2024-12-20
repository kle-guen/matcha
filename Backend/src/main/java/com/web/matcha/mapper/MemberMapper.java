package com.web.matcha.mapper;

import com.web.matcha.domain.model.UserModel;
import com.web.matcha.web.dto.CompleteMemberDto;
import com.web.matcha.web.dto.MemberDto;
import org.mapstruct.InheritConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface MemberMapper {

	@Mapping(target = "id", source = "id")
	@Mapping(target = "name", source = "firstName")
	@Mapping(target = "age", source = "profile.age")
	@Mapping(target = "nickname", source = "username")
	@Mapping(target = "sexe", source = "profile.gender")
	@Mapping(target = "description", source = "profile.biography")
	MemberDto toMember(UserModel userDto);

	@InheritConfiguration
	CompleteMemberDto toCompleteMember(UserModel userDto);



}
