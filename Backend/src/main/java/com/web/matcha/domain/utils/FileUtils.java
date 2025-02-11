package com.web.matcha.domain.utils;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.UploadedFile;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.UUID;

@Slf4j
public class FileUtils {

	private static final String TARGET_DIR = "uploads/";

	public static String saveUploadedFile(UploadedFile uploadedFile) {
		if (uploadedFile == null) {
			return null;
		}

		String fileName = UUID.randomUUID() + "-" + uploadedFile.filename();

		Path targetPath = Paths.get(TARGET_DIR + fileName);
		try {
			Files.createDirectories(targetPath.getParent());
			Files.copy(uploadedFile.content(), targetPath, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			log.error("Failed to save file: ",e);
			throw new BadRequestResponse("Failed to save file: " + fileName);
		}

		return fileName;
	}

	public static String getBase64Image(String fileName) {
		if (fileName == null) {
			return null;
		}
		Path imagePath = Paths.get(TARGET_DIR + fileName);

		if (Files.exists(imagePath)) {
			byte[] imageBytes = null;
			try {
				imageBytes = Files.readAllBytes(imagePath);
			} catch (IOException e) {
				return null;
			}
			return Base64.getEncoder().encodeToString(imageBytes);
		}
		return null;
	}

	public static void deleteFileByFilename(String fileName) {
		if (fileName == null) {
			return;
		}
		Path filePath = Paths.get(TARGET_DIR + fileName);
		try {
			Files.deleteIfExists(filePath);
		} catch (IOException e) {
			log.error("Failed to delete file: ", e);
		}
	}
}
