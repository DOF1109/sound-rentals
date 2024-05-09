# Use a JDK image based on Java 17
FROM openjdk:17-oracle

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]