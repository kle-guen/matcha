package com.web.matcha.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.web.matcha.domain.enums.TypeNotificationEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class NotificationDto {

	private TypeNotificationEnum type;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime date;

	private String username;

	private Boolean isRead;

}
