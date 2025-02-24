package com.web.matcha.web.controller;

import lombok.RequiredArgsConstructor;

import java.io.File;
import java.io.FileInputStream;
import java.nio.file.Files;

import static spark.Spark.*;

@RequiredArgsConstructor
public class ImageController extends AbstractController {

    @Override
    public void registerRoutes() {
        get("/images/:fileName", this::getImage);
    }

    private Object getImage(spark.Request request, spark.Response response) throws Exception {
        String fileName = request.params(":fileName");
        File file = new File("uploads/" + fileName);

        if (!file.exists()) {
            response.status(404);
            return "Image not found";
        }

        String mimeType = Files.probeContentType(file.toPath());
        response.type(mimeType != null ? mimeType : "application/octet-stream");
        response.raw().setContentLengthLong(file.length());
        try (FileInputStream fileInputStream = new FileInputStream(file)) {
            Files.copy(file.toPath(), response.raw().getOutputStream());
        }
        return null;
    }
}