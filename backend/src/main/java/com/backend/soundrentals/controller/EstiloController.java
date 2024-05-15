package com.backend.soundrentals.controller;

import com.backend.soundrentals.dto.entrada.EstiloEntradaDto;
import com.backend.soundrentals.dto.modificacion.EstiloModificacionDto;
import com.backend.soundrentals.dto.salida.EstiloSalidaDto;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.service.impl.EstiloService;
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
@RequestMapping("/style")

public class EstiloController {

    private final Logger LOGGER = LoggerFactory.getLogger(EstiloController.class);
    private final EstiloService estiloService;


    @PostMapping("/registrar")
    public ResponseEntity<EstiloSalidaDto> registrarEstilo(@Valid @RequestBody EstiloEntradaDto estiloEntradaDto) {
        return new ResponseEntity<>(estiloService.registrarEstilo(estiloEntradaDto), HttpStatus.CREATED);
    }


    @GetMapping("{id}")
    public ResponseEntity<EstiloSalidaDto> obtenerEstiloPorId(@PathVariable Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(estiloService.buscarEstiloPorId(id), HttpStatus.OK);
    }


    @GetMapping("/listar")
    public ResponseEntity<List<EstiloSalidaDto>> listarEstilos() {
        return new ResponseEntity<>(estiloService.listarEstilos(), HttpStatus.OK);
    }

    @PutMapping("actualizar")
    public ResponseEntity<EstiloSalidaDto> actualizarRecurso(@Valid @RequestBody EstiloModificacionDto estiloModificacionDto) throws ResourceNotFoundException {
        return new ResponseEntity<>(estiloService.actualizarEstilo(estiloModificacionDto), HttpStatus.OK);
    }

    @DeleteMapping("eliminar/{id}")
    public ResponseEntity<EstiloSalidaDto> eliminarOdontologo(@PathVariable Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(estiloService.eliminarEstilo(id), HttpStatus.OK);
    }
}
