#
# Build stage
#
FROM maven:3.8.4-openjdk-17 as BUILD
COPY src /home/app/src
COPY pom.xml /home/app
WORKDIR /home/app
RUN mvn clean package

#
# Package stage
#
FROM openjdk:17-oracle
COPY --from=build /home/app/target/*.jar /usr/local/lib/app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "/usr/local/lib/app.jar"]
