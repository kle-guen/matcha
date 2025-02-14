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
	@Mapping(target = "isRead", source = "messageModel", qualifiedByName = "mapRead")
	MessageDto toMessageDto(MessageModel messageModel);

	@Named("mapRead")
	default boolean mapRead(MessageModel messageModel) {
		return messageModel.isRead() || messageModel.getSenderId() == UserHolder.getUserId();
	}

}
