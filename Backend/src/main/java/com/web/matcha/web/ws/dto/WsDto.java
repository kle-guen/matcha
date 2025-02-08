package com.web.matcha.web.ws.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class WsDto<T> {
	T data;
}
