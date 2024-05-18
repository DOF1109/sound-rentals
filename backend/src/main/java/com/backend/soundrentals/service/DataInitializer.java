package com.backend.soundrentals.service;

import com.backend.soundrentals.entity.Dj;
import com.backend.soundrentals.entity.Estilo;
import com.backend.soundrentals.entity.Reserva;
import com.backend.soundrentals.repository.DjRepository;
import com.backend.soundrentals.repository.EstiloRepository;
import com.backend.soundrentals.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.*;
import java.util.Random;
import java.util.concurrent.atomic.AtomicReference;

@Component
public class DataInitializer implements CommandLineRunner {
    @Autowired
    private EstiloRepository estiloRepository;
    @Autowired
    private DjRepository djRepository;
    @Autowired
    private ReservaRepository reservaRepository;

    @Override
    public void run(String... args) throws Exception {
        // Lista de estilos junto con sus URLs
        Map<String, String> estilos = new HashMap<>();
        estilos.put("Electrónica", "https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/electronica.webp?alt=media&token=cb5691cd-abf2-43ad-bb46-e4365385b267");
        estilos.put("Pop y comercial", "https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/pop-comercial.webp?alt=media&token=9303f388-d50c-4a00-a8d6-da5e523c9fa5");
        estilos.put("Urbana", "https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/urbana.webp?alt=media&token=92e011f7-59dd-4662-ada6-f06b5cde74ea");
        estilos.put("Retro y clásica", "https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/retro-clasica.webp?alt=media&token=ef3f6a51-9f63-4c98-ad6c-077a615e4918");

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
                dj.setDni(1234567890);

                // Obtener estilos aleatorios y asegurarse de que estén en estado "managed"
                List<Estilo> estilosParaASignar = estiloRepository.findAllById(styleIds);
                dj.getEstilos().addAll(estilosParaASignar);

                // Guardar el DJ
                djRepository.save(dj);
            }
        }

        long countReserva = reservaRepository.count();
        if (countReserva == 0) {
            int cantidadReservas = 200;
            for (int i=0;i<cantidadReservas;i++){
                Random rand = new Random();
                Long idRandomDj;
                Dj djRandom;

                do{
                    idRandomDj = rand.nextLong(djRepository.count());
                    djRandom = djRepository.findById(idRandomDj).orElse(null);
                }while(djRandom==null);

                Reserva reserva = new Reserva();
                reserva.setFecha(LocalDate.now());
                reserva.setDj(djRandom);
                reservaRepository.save(reserva);
            }
        }
    }
}
