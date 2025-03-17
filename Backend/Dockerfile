FROM eclipse-temurin:21-alpine

WORKDIR /usr/src/app

COPY target/matcha-1.0-SNAPSHOT.jar ./app.jar

RUN mkdir -p /usr/src/app/uploads

EXPOSE 7000

ENTRYPOINT ["java", "-jar", "app.jar"]