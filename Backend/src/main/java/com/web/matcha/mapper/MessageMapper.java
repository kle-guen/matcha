package com.web.matcha.mapper;

import com.web.matcha.config.UserHolder;
import com.web.matcha.domain.model.MessageModel;
import com.web.matcha.web.dto.MessageDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(uses = { UtilsMapper.class })
public interface MessageMapper {


	@Mapping(target = "createdAt", source = "createdAt", qualifiedByName = "mapTimestampToLocalDateTime")
	MessageDto toMessageDto(MessageModel messageModel);

}
