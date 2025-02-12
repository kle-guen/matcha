package com.web.matcha.web.controller;

import io.javalin.Javalin;
import io.javalin.http.Context;
import lombok.RequiredArgsConstructor;

import java.io.File;
import java.io.FileInputStream;
import java.nio.file.Files;

@RequiredArgsConstructor
public class ImageController extends AbstractController {

	@Override
	public void registerRoutes(final Javalin app) {
		app.get("/images/{fileName}", this::getImage);
	}

	private void getImage(final Context ctx) throws Exception {
		String fileName = ctx.pathParam("fileName");
		File file = new File("uploads/" + fileName);

		if (!file.exists()) {
			ctx.status(404).result("Image not found");
			return;
		}

		String mimeType = Files.probeContentType(file.toPath());
		ctx.contentType(mimeType != null ? mimeType : "application/octet-stream");
		ctx.result(new FileInputStream(file));
	}

}
