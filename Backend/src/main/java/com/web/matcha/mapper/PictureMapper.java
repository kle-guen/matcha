package com.web.matcha.mapper;

import com.web.matcha.domain.model.PictureModel;
import com.web.matcha.web.dto.PictureDto;
import org.mapstruct.Mapper;

@Mapper
public interface PictureMapper {

	PictureDto toDto(PictureModel pictureModel);
}