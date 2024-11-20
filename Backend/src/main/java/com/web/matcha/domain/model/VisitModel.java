package com.web.matcha.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
public class VisitModel {
	int visitorId;

	int visitedId;

	Timestamp visitedAt;
}
