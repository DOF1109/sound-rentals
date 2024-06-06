package com.backend.soundrentals.controller;

import com.backend.soundrentals.dto.entrada.CaracteristicaEntradaDto;
import com.backend.soundrentals.dto.entrada.EstiloEntradaDto;
import com.backend.soundrentals.dto.modificacion.CaracteristicaModificacionDto;
import com.backend.soundrentals.dto.modificacion.EstiloModificacionDto;
import com.backend.soundrentals.dto.salida.CaracteristicaSalidaDto;
import com.backend.soundrentals.dto.salida.EstiloSalidaDto;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.service.impl.CaracteristicaService;
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
@RequestMapping("/caracteristica")

public class CaracteristicaController {

    private final Logger LOGGER = LoggerFactory.getLogger(CaracteristicaController.class);
    private final CaracteristicaService caracteristicaService;


    @PostMapping("/registrar")
    public ResponseEntity<CaracteristicaSalidaDto> registrarCaracteristica(@Valid @RequestBody CaracteristicaEntradaDto caracteristicaEntradaDto) {
        return new ResponseEntity<>(caracteristicaService.registrarCaracteristica(caracteristicaEntradaDto), HttpStatus.CREATED);
    }


    @GetMapping("{id}")
    public ResponseEntity<CaracteristicaSalidaDto> obtenerEstiloPorId(@PathVariable Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(caracteristicaService.buscarCaracteristicaPorId(id), HttpStatus.OK);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<CaracteristicaSalidaDto>> listarEstilos() {
        return new ResponseEntity<>(caracteristicaService.listarCaracteristicas(), HttpStatus.OK);
    }

    @PutMapping("actualizar")
    public ResponseEntity<CaracteristicaSalidaDto> actualizarRecurso(@Valid @RequestBody CaracteristicaModificacionDto caracteristicaModificacionDto) throws ResourceNotFoundException {
        return new ResponseEntity<>(caracteristicaService.actualizarCaracteristica(caracteristicaModificacionDto), HttpStatus.OK);
    }

    @DeleteMapping("eliminar/{id}")
    public ResponseEntity<CaracteristicaSalidaDto> eliminarOdontologo(@PathVariable Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(caracteristicaService.eliminarCaracteristica(id), HttpStatus.OK);
    }
}
