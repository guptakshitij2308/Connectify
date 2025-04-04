# Use Maven image to build the application
FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Use OpenJDK to run the built JAR
FROM amd64/openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/Connectify-Backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
