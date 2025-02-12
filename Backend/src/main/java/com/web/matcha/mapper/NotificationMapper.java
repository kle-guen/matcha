package com.web.matcha.mapper;

import com.web.matcha.domain.model.NotificationModel;
import com.web.matcha.web.dto.NotificationDto;
import org.mapstruct.InheritConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Mapper
public interface NotificationMapper {

	@InheritConfiguration
	@Mapping(target = "type", source = "type")
	@Mapping(target = "date", expression = "java(mapTimestampToLocalDateTime(notification.getCreatedAt()))")
	@Mapping(target = "username", source = "username")
	@Mapping(target = "isRead", source = "isRead")
	NotificationDto toDto(NotificationModel notification);

	@InheritConfiguration
	@Mapping(target = "type", source = "type")
	@Mapping(target = "createdAt", expression = "java(mapLocalDateTimeToTimestamp(notification.getDate()))")
	@Mapping(target = "username", source = "username")
	@Mapping(target = "isRead", source = "isRead")
	NotificationModel toModel(NotificationDto notification);

	default LocalDateTime mapTimestampToLocalDateTime(Timestamp timestamp) {
		return timestamp != null ? timestamp.toLocalDateTime() : null;
	}

	default Timestamp mapLocalDateTimeToTimestamp(LocalDateTime localDateTime) {
		return localDateTime != null ? Timestamp.valueOf(localDateTime) : null;
	}
}
