package com.web.matcha.domain.utils;

import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.UUID;

@Slf4j
public class FileUtils {

    private static final String TARGET_DIR = "uploads/";

    public static String saveUploadedFile(InputStream inputStream, String originalFilename) throws IOException {
        if (inputStream == null || originalFilename == null) {
            throw new IllegalArgumentException("Input stream and filename must not be null");
        }

        String fileName = UUID.randomUUID() + "-" + originalFilename;
        Path targetPath = Paths.get(TARGET_DIR + fileName);

        try {
            Files.createDirectories(targetPath.getParent());
            Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            log.error("Failed to save file: ", e);
            throw new IOException("Failed to save file: " + fileName, e);
        }

        return fileName;
    }

    public static String getBase64Image(String fileName) {
        if (fileName == null) {
            return null;
        }
        Path imagePath = Paths.get(TARGET_DIR + fileName);

        if (Files.exists(imagePath)) {
            try {
                byte[] imageBytes = Files.readAllBytes(imagePath);
                return Base64.getEncoder().encodeToString(imageBytes);
            } catch (IOException e) {
                log.error("Failed to read file: ", e);
                return null;
            }
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