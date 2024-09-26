package com.web.matcha;

import com.google.gson.Gson;

import static spark.Spark.*;

public final class QueueStream {

    public static void main(String[] args) throws Exception {

        get("/users", (request, response) -> {
            response.type("application/json");
            return new Gson().toJson(new StandardResponse(
                    StatusResponse.SUCCESS, new Gson().toJsonTree(userService.getUsers())
            ));
        });

        String url = "jdbc:postgresql://localhost:5432/matcha";
        String user = "matcha";
        String password = "matcha";

    }
}