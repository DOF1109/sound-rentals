package com.backend.soundrentals.controller;

import com.backend.soundrentals.dto.entrada.DjEntradaDto;
import com.backend.soundrentals.dto.modificacion.DjModificacionDto;
import com.backend.soundrentals.dto.salida.CiudadSalidaDto;
import com.backend.soundrentals.dto.salida.DjSalidaDto;
import com.backend.soundrentals.exceptions.BadRequestException;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.service.impl.CiudadService;
import com.backend.soundrentals.service.impl.DjService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/ciudad")
public class CiudadController {

    private final Logger LOGGER = LoggerFactory.getLogger(CiudadController.class);
    private final CiudadService ciudadService;

    @GetMapping("/listar")
    public ResponseEntity<List<CiudadSalidaDto>> listarRecursos() {
        return new ResponseEntity<>(ciudadService.listarCiudades(), HttpStatus.OK);
    }

}
