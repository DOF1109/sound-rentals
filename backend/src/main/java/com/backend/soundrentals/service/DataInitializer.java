package com.backend.soundrentals.service;

import com.backend.soundrentals.entity.Ciudad;
import com.backend.soundrentals.entity.Dj;
import com.backend.soundrentals.entity.Estilo;
import com.backend.soundrentals.entity.Reserva;
import com.backend.soundrentals.repository.CiudadRepository;
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
    private CiudadRepository ciudadRepository;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {

        List<String> ciudadesArgentina = new ArrayList<>();
        ciudadesArgentina.add("La Plata");
        ciudadesArgentina.add("Mar del Plata");
        ciudadesArgentina.add("Bahía Blanca");
        ciudadesArgentina.add("Tandil");
        ciudadesArgentina.add("Olavarría");
        ciudadesArgentina.add("San Nicolás de los Arroyos");
        ciudadesArgentina.add("San Fernando del Valle de Catamarca");
        ciudadesArgentina.add("Andalgalá");
        ciudadesArgentina.add("Belén");
        ciudadesArgentina.add("Tinogasta");
        ciudadesArgentina.add("Santa María");
        ciudadesArgentina.add("Resistencia");
        ciudadesArgentina.add("Sáenz Peña");
        ciudadesArgentina.add("Villa Ángela");
        ciudadesArgentina.add("Charata");
        ciudadesArgentina.add("Castelli");
        ciudadesArgentina.add("Rawson");
        ciudadesArgentina.add("Comodoro Rivadavia");
        ciudadesArgentina.add("Trelew");
        ciudadesArgentina.add("Puerto Madryn");
        ciudadesArgentina.add("Esquel");
        ciudadesArgentina.add("Córdoba");
        ciudadesArgentina.add("Villa Carlos Paz");
        ciudadesArgentina.add("Río Cuarto");
        ciudadesArgentina.add("San Francisco");
        ciudadesArgentina.add("Villa María");
        ciudadesArgentina.add("Corrientes");
        ciudadesArgentina.add("Goya");
        ciudadesArgentina.add("Paso de los Libres");
        ciudadesArgentina.add("Bella Vista");
        ciudadesArgentina.add("Mercedes");
        ciudadesArgentina.add("Paraná");
        ciudadesArgentina.add("Concordia");
        ciudadesArgentina.add("Gualeguaychú");
        ciudadesArgentina.add("Concepción del Uruguay");
        ciudadesArgentina.add("Villaguay");
        ciudadesArgentina.add("Formosa");
        ciudadesArgentina.add("Clorinda");
        ciudadesArgentina.add("Pirané");
        ciudadesArgentina.add("El Colorado");
        ciudadesArgentina.add("Las Lomitas");

        long countCiudad = ciudadRepository.count();

        if(countCiudad==0){
            ciudadRepository.deleteAll();
            jdbcTemplate.execute("ALTER TABLE city AUTO_INCREMENT = 1");

            for (String ciudadNombre : ciudadesArgentina) {
                Ciudad ciudad = new Ciudad();
                ciudad.setNombre(ciudadNombre);

                ciudadRepository.save(ciudad);
            }
        }

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
    }
}