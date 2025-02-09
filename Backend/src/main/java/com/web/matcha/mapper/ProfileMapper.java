package com.web.matcha.mapper;

import com.web.matcha.domain.model.ProfileModel;
import com.web.matcha.web.dto.ProfileDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ProfileMapper {

	@Mapping(target = "latitude", source = "location.latitude")
	@Mapping(target = "longitude", source = "location.longitude")
	@Mapping(target = "city", source = "location.city")
	@Mapping(target = "interests", ignore = true)
	ProfileModel toModel(ProfileDto profileDto);
}