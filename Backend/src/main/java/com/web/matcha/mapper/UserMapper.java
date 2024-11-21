package com.web.matcha.mapper;

import com.web.matcha.domain.model.UserModel;
import com.web.matcha.web.dto.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {

	@Mapping(target = "verified", ignore = true)
	@Mapping(target = "lastLoginAt", ignore = true)
	UserModel toModel(UserDto userDto);

}
