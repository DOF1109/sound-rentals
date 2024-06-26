package com.backend.soundrentals.service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import net.bytebuddy.build.Plugin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ResourceLoader resourceLoader;

    @Async
    public void sendHtmlEmail(String to, String subject, String type, Map<String,String> content) throws MessagingException,IOException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom("soundrentals24@gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);

        String htmlTemplate = switch (type) {
            case "user_register_notify" -> readFile("classpath:templates/user_register_notify/index.html");
            case "dj_notify" -> readFile("classpath:templates/dj_notify/index.html");
            case "user_reservation_notify" -> readFile("classpath:templates/user_reservation_notify/index.html");
            default -> "";
        };

        if (type.equals("user_reservation_notify")) {
            htmlTemplate = replacePlaceholders(htmlTemplate, content);
        }

        if(!Objects.equals(htmlTemplate, "")){
            helper.setText(htmlTemplate, true);
            mailSender.send(message);
        }
    }

    private String readFile(String path) throws IOException {
        Resource resource = (Resource) resourceLoader.getResource(path);
        try (InputStream inputStream = resource.getInputStream();
             BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
            return reader.lines().collect(Collectors.joining("\n"));
        }
    }

    private String replacePlaceholders(String template, Map<String, String> values) {
        for (Map.Entry<String, String> entry : values.entrySet()) {
            String placeholder = "${" + entry.getKey() + "}";
            template = template.replace(placeholder, entry.getValue());
        }
        return template;
    }
}
