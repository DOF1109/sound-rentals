package com.backend.soundrentals.controller;

import com.backend.soundrentals.dto.entrada.CalificacionEntradaDto;
import com.backend.soundrentals.dto.entrada.CaracteristicaEntradaDto;
import com.backend.soundrentals.dto.entrada.FavoritoEntradaDto;
import com.backend.soundrentals.dto.modificacion.CaracteristicaModificacionDto;
import com.backend.soundrentals.dto.salida.CalificacionSalidaDto;
import com.backend.soundrentals.dto.salida.CaracteristicaSalidaDto;
import com.backend.soundrentals.exceptions.BadRequestException;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.service.impl.CalificacionService;
import com.backend.soundrentals.service.impl.CaracteristicaService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/calificacion")

public class CalificacionController {

    private final Logger LOGGER = LoggerFactory.getLogger(CalificacionController.class);
    private final CalificacionService calificacionService;


    @PostMapping("/registrar")
    public ResponseEntity<CalificacionSalidaDto> registrarCalificacion(@Valid @RequestBody CalificacionEntradaDto calificacionEntradaDto) throws BadRequestException, ResourceNotFoundException {
        return new ResponseEntity<>(calificacionService.registrarCalificacion(calificacionEntradaDto), HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<CalificacionSalidaDto> obtenerCalificacionPorId(@PathVariable Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(calificacionService.buscarCalificacionPorId(id), HttpStatus.OK);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<CalificacionSalidaDto>> listarCalificaciones() {
        return new ResponseEntity<>(calificacionService.listarCalificaciones(), HttpStatus.OK);
    }

    @DeleteMapping("eliminar/{id}")
    public ResponseEntity<CalificacionSalidaDto> eliminarCalificacion(@PathVariable Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(calificacionService.eliminarCalificacion(id), HttpStatus.OK);
    }
}
