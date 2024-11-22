package com.web.matcha.mapper;

import com.web.matcha.domain.model.InterestModel;
import com.web.matcha.web.dto.InterestDto;
import org.mapstruct.Mapper;

@Mapper
public interface InterestMapper {

	InterestDto toDto(InterestModel interestModel);

}
