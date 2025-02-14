package com.web.matcha.web.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SendMessageDto {

	public Integer receiverId;

	public String content;

}
