package com.web.matcha.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BlockModel {
	int blockerId;
	int blockedId;
}
