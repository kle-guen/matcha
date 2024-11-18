package com.web.matcha;

import com.web.matcha.config.RoutesConfig;
import io.javalin.Javalin;

public final class App {

    public static void main(String[] args) throws Exception {
        Javalin app = Javalin.create(config -> config.showJavalinBanner = false).start(7000);

        RoutesConfig.configure(app);
    }
}