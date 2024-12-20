package com.web.matcha.domain.utils;

import io.javalin.http.UploadedFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

public class FileUtils {

	public static String saveUploadedFile(UploadedFile uploadedFile) {
		String targetDir = "uploads/";

		String fileName = UUID.randomUUID().toString() + "-" + uploadedFile.filename();

		Path targetPath = Paths.get(targetDir + fileName);
		try {
			Files.createDirectories(targetPath.getParent());
			Files.copy(uploadedFile.content(), targetPath, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			throw new RuntimeException("Failed to save file: " + fileName, e);
		}

		return targetPath.toString();
	}
}
