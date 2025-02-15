FROM eclipse-temurin:21-alpine

WORKDIR /usr/src/app

COPY target/matcha-1.0-SNAPSHOT.jar ./app.jar

COPY src/main/resources/init.sql ./init.sql

EXPOSE 7000

ENTRYPOINT ["java", "-jar", "app.jar"]