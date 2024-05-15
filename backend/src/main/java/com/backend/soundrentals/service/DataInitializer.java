package com.backend.soundrentals.service;

import com.backend.soundrentals.entity.Dj;
import com.backend.soundrentals.entity.Estilo;
import com.backend.soundrentals.repository.DjRepository;
import com.backend.soundrentals.repository.EstiloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.Random;
import java.util.concurrent.atomic.AtomicReference;

@Component
public class DataInitializer implements CommandLineRunner {
    @Autowired
    private EstiloRepository estiloRepository;
    @Autowired
    private DjRepository djRepository;

    @Override
    public void run(String... args) throws Exception {
        // Lista de estilos junto con sus URLs
        Map<String, String> estilos = new HashMap<>();
        estilos.put("DJ de música electrónica", "https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/image-2.webp?alt=media&token=fddea6e6-b879-44c4-84ba-51b4cda4204a");
        estilos.put("DJ de música pop y comercial", "https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/image-3.webp?alt=media&token=7a2a2517-6dd9-4e63-874d-61da174fb9bf");
        estilos.put("DJ de música urbana (Hip-hop, Reggaetón)", "https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/image-2.webp?alt=media&token=fddea6e6-b879-44c4-84ba-51b4cda4204a");
        estilos.put("DJ de música retro y clásica", "https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/image-3.webp?alt=media&token=7a2a2517-6dd9-4e63-874d-61da174fb9bf");

        // Verificar si ya existen estilos registrados
        long countStyle = estiloRepository.count();
        if (countStyle == 0) {
            // Crear y guardar los estilos junto con sus URLs
            estilos.forEach((estiloString, url) -> {
                Estilo estilo = new Estilo();
                estilo.setStyle(estiloString);
                estilo.setUrl(url);
                estiloRepository.save(estilo);
            });
        }

        //Registrar 20 djs
        String[] FIRST_NAMES = {"Liam", "Olivia", "Noah", "Emma", "Oliver", "Ava", "William", "Sophia", "Elijah", "Isabella",
                "James", "Mia", "Benjamin", "Charlotte", "Lucas", "Amelia", "Henry", "Harper", "Alexander", "Evelyn",
                "Michael", "Abigail", "Ethan", "Emily", "Daniel", "Elizabeth", "Matthew", "Sofia", "Jackson", "Avery",
                "Daniel", "Luna", "Ethan", "Grace", "Jacob", "Chloe", "Logan", "Zoe", "Mason", "Penelope",
                "Jack", "Lily", "Luke", "Nora", "Owen", "Scarlett", "Levi", "Hazel", "Carter", "Violet",
                "Sebastian", "Madison", "Wyatt", "Eleanor", "Henry", "Addison", "Leo", "Luna", "Gabriel", "Stella"};

        String[] LAST_NAMES = {"Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
                "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson",
                "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King",
                "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter",
                "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins",
                "Stewart", "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey"};
        List<Long> styleIds = Arrays.asList(1L, 3L, 4L);

        long countDj = djRepository.count();
        if (countDj == 0) {
            for (int i = 0; i < FIRST_NAMES.length; i++) {
                Dj dj = new Dj();
                dj.setName(FIRST_NAMES[i % FIRST_NAMES.length]);
                dj.setLastname(LAST_NAMES[i % LAST_NAMES.length]);
                dj.setDni("1234567890");

                // Obtener estilos aleatorios y asegurarse de que estén en estado "managed"
                List<Estilo> estilosParaASignar = estiloRepository.findAllById(styleIds);
                dj.getEstilos().addAll(estilosParaASignar);

                // Guardar el DJ
                djRepository.save(dj);
            }
        }
    }
}
