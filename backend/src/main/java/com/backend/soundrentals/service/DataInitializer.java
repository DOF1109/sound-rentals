package com.backend.soundrentals.service;

import com.backend.soundrentals.entity.Dj;
import com.backend.soundrentals.entity.Estilo;
import com.backend.soundrentals.entity.Reserva;
import com.backend.soundrentals.repository.DjRepository;
import com.backend.soundrentals.repository.EstiloRepository;
import com.backend.soundrentals.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
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
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
//        reservaRepository.deleteAll();
//        djRepository.deleteAll();
//        estiloRepository.deleteAll();
//
//        jdbcTemplate.execute("ALTER TABLE djs AUTO_INCREMENT = 1");
//        jdbcTemplate.execute("ALTER TABLE mstyle AUTO_INCREMENT = 1");
//        jdbcTemplate.execute("ALTER TABLE reserva AUTO_INCREMENT = 1");
//
//
//        Lista de estilos junto con sus URLs
//        Map<String, String> estilos = new HashMap<>();
//        estilos.put("Electrónica", "https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/electronica.webp?alt=media&token=cb5691cd-abf2-43ad-bb46-e4365385b267");
//        estilos.put("Pop y comercial", "https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/pop-comercial.webp?alt=media&token=9303f388-d50c-4a00-a8d6-da5e523c9fa5");
//        estilos.put("Urbana", "https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/urbana.webp?alt=media&token=92e011f7-59dd-4662-ada6-f06b5cde74ea");
//        estilos.put("Retro y clásica", "https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/retro-clasica.webp?alt=media&token=ef3f6a51-9f63-4c98-ad6c-077a615e4918");
//
//        // Verificar si ya existen estilos registrados
//        long countStyle = estiloRepository.count();
//        if (countStyle == 0) {
//            // Crear y guardar los estilos junto con sus URLs
//            estilos.forEach((estiloString, url) -> {
//                Estilo estilo = new Estilo();
//                estilo.setStyle(estiloString);
//                estilo.setUrl(url);
//                estiloRepository.save(estilo);
//            });
//        }
//
//
//        String[] FIRST_NAMES = {"Liam", "Olivia", "Noah", "Emma", "Oliver", "Ava", "William", "Sophia", "Elijah", "Isabella",
//                "James", "Mia", "Benjamin", "Charlotte", "Lucas", "Amelia", "Henry", "Harper", "Alexander", "Evelyn",
//                "Michael", "Abigail", "Ethan", "Emily", "Daniel", "Elizabeth", "Matthew", "Sofia", "Jackson", "Avery",
//                "Daniel", "Luna", "Ethan", "Grace", "Jacob", "Chloe", "Logan", "Zoe", "Mason", "Penelope",
//                "Jack", "Lily", "Luke", "Nora", "Owen", "Scarlett", "Levi", "Hazel", "Carter", "Violet",
//                "Sebastian", "Madison", "Wyatt", "Eleanor", "Henry", "Addison", "Leo", "Luna", "Gabriel", "Stella"};
//
//        String[] LAST_NAMES = {"Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
//                "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson",
//                "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King",
//                "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter",
//                "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins",
//                "Stewart", "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey"};
//        // Crear lista con las URLs
//        List<String> urls = new ArrayList<>();
//        urls.add("https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/dj_gallery%2Fimg1.jpg?alt=media&token=4eb5ce0b-f47f-46fd-bfcc-7a0500d95f61");
//        urls.add("https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/dj_gallery%2Fimg9.jpg?alt=media&token=adb875cc-cb77-492f-9cc9-e759fd8abaf2");
//        urls.add("https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/dj_gallery%2Fimg8.jpg?alt=media&token=a5dc659f-8148-400d-a89c-57e4e4a6c88f");
//        urls.add("https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/dj_gallery%2Fimg7.jpg?alt=media&token=df7d5cdc-36df-4789-b87a-3f6ffde7ec63");
//        urls.add("https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/dj_gallery%2Fimg6.jpg?alt=media&token=b3189ef0-3e87-4547-844e-4806c74c626d");
//        urls.add("https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/dj_gallery%2Fimg5.jpg?alt=media&token=fc1a072b-d4d3-4601-87f8-71694f6f58f4");
//        urls.add("https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/dj_gallery%2Fimg4.jpg?alt=media&token=d1626518-5f4e-467a-b2d0-053960242376");
//        urls.add("https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/dj_gallery%2Fimg3.jpg?alt=media&token=c08374a0-bc41-48d4-90ce-d017b0491e59");
//        urls.add("https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/dj_gallery%2Fimg20.jpg?alt=media&token=16d42849-5052-4007-9d8d-31f790c06880");
//        urls.add("https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/dj_gallery%2Fimg2.jpg?alt=media&token=29882482-5203-4371-9989-8ccc7d9f206c");
//        urls.add("https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/dj_gallery%2Fimg19.jpg?alt=media&token=55bd93f8-6261-4854-adfa-fca129fde6d5");
//        urls.add("https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/dj_gallery%2Fimg18.jpg?alt=media&token=bf5d4b2d-f0ad-4ab5-884c-f8f31cccce8d");
//        urls.add("https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/dj_gallery%2Fimg17.jpg?alt=media&token=5e315e3a-7017-4583-b974-9195d0fa3d5b");
//        urls.add("https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/dj_gallery%2Fimg16.jpg?alt=media&token=1c66c5c5-3853-4ecc-9575-79bbc6bff0d1");
//        urls.add("https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/dj_gallery%2Fimg14.jpg?alt=media&token=58049096-95bd-4142-b412-1b8f30727607");
//        urls.add("https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/dj_gallery%2Fimg12.jpg?alt=media&token=9824fb62-dcf8-460a-b98f-5160d443bb8d");
//        urls.add("https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/dj_gallery%2Fimg11.jpg?alt=media&token=2a2fe5b9-9d8b-45dd-aa79-3c3494ddd832");
//        urls.add("https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/dj_gallery%2Fimg10.jpg?alt=media&token=4dd4dc23-b83f-4a60-8907-ecbe152a62ef");
//        List<Long> styleIds = Arrays.asList(1L, 3L, 4L);
//
//        Random rand = new Random();
//
//        long countDj = djRepository.count();
//        if (countDj == 0) {
//            for (int i = 0; i < 13; i++) {
//                Dj dj = new Dj();
//                dj.setDni(1234567890);
//                dj.setName(FIRST_NAMES[i % FIRST_NAMES.length]);
//                dj.setLastname(LAST_NAMES[i % LAST_NAMES.length]);
//                dj.setPhone("3003332123");
//                dj.setEmail("dj@soundrentals.com");
//                dj.setUrlPic("https://firebasestorage.googleapis.com/v0/b/soundrentals-ef63b.appspot.com/o/dj_gallery%2Fdj_pic.png?alt=media&token=acd433bd-11db-42e5-9164-70532e1c6bf6");
//                dj.setUrlImg1(urls.get((int)(Math.random() * urls.size())));
//                dj.setUrlImg2(urls.get((int)(Math.random() * urls.size())));
//                dj.setUrlImg3(urls.get((int)(Math.random() * urls.size())));
//                dj.setUrlImg4(urls.get((int)(Math.random() * urls.size())));
//                dj.setUrlImg5(urls.get((int)(Math.random() * urls.size())));
//
//                // Asignar los estilos por defecto
//                List<Estilo> estilosParaASignar = estiloRepository.findAllById(styleIds);
//                dj.setEstilos(estilosParaASignar);
//
//                // Guardar el DJ
//                //djRepository.save(dj);
//            }
//        }

//        long countReserva = reservaRepository.count();
//        if (countReserva == 0) {
//            int cantidadReservas = 200;
//            for (int i=0;i<cantidadReservas;i++){
//                Long idRandomDj;
//                Dj djRandom;
//
//                do{
//                    idRandomDj = rand.nextLong(djRepository.count());
//                    djRandom = djRepository.findById(idRandomDj).orElse(null);
//                }while(djRandom==null);
//
//                Reserva reserva = new Reserva();
//                reserva.setFecha(LocalDate.now());
//                reserva.setDj(djRandom);
//                reservaRepository.save(reserva);
//            }
//        }
    }
}