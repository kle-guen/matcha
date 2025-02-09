package com.web.matcha.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.web.matcha.domain.enums.HistoryType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class HistoryDto {

	private HistoryType type;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime date;

	private String user;
}
