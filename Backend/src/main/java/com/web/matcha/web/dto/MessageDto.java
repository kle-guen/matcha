package com.web.matcha.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MessageDto {

	public Integer receiverId;

	public Integer senderId;

	public String content;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
	public LocalDateTime createdAt;

	public boolean isRead;

}
