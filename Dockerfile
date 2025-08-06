FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy jar file from the backend's target folder
COPY backend/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Run the jar
ENTRYPOINT ["java", "-jar", "app.jar"]
