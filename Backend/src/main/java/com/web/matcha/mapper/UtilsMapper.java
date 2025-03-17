package com.web.matcha.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Mapper
public interface UtilsMapper {

	@Named("mapTimestampToLocalDateTime")
	default LocalDateTime mapTimestampToLocalDateTime(Timestamp timestamp) {
		return timestamp != null ? timestamp.toLocalDateTime() : null;
	}

	@Named("mapLocalDateTimeToTimestamp")
	default Timestamp mapLocalDateTimeToTimestamp(LocalDateTime localDateTime) {
		return localDateTime != null ? Timestamp.valueOf(localDateTime) : null;
	}

}
