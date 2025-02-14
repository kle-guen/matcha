package com.web.matcha.mapper;

import com.web.matcha.domain.model.NotificationModel;
import com.web.matcha.web.dto.NotificationDto;
import org.mapstruct.InheritConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Mapper(uses = {UtilsMapper.class})
public interface NotificationMapper {

	@InheritConfiguration
	@Mapping(target = "type", source = "type")
	@Mapping(target = "date", source = "createdAt", qualifiedByName = "mapTimestampToLocalDateTime")
	@Mapping(target = "username", source = "username")
	@Mapping(target = "isRead", source = "isRead")
	NotificationDto toDto(NotificationModel notification);

	@InheritConfiguration
	@Mapping(target = "type", source = "type")
	@Mapping(target = "createdAt", source = "date", qualifiedByName = "mapLocalDateTimeToTimestamp")
	@Mapping(target = "username", source = "username")
	@Mapping(target = "isRead", source = "isRead")
	NotificationModel toModel(NotificationDto notification);
}
