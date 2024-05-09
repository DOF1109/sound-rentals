package com.backend.soundrentals.controller;

import com.backend.soundrentals.dto.entrada.RecursoEntradaDto;
import com.backend.soundrentals.dto.modificacion.RecursoModificacionDto;
import com.backend.soundrentals.dto.salida.RecursoSalidaDto;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.service.impl.RecursoService;
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
@RequestMapping("/recursos")
public class RecursoController {

    private final Logger LOGGER = LoggerFactory.getLogger(RecursoController.class);
    private final RecursoService recursoService;


    @PostMapping("/registrar")
    public ResponseEntity<RecursoSalidaDto> registrarRecurso(@Valid @RequestBody RecursoEntradaDto recursoEntradaDto) {
        return new ResponseEntity<>(recursoService.registrarRecurso(recursoEntradaDto), HttpStatus.CREATED);
    }


    @GetMapping("{id}")
    public ResponseEntity<RecursoSalidaDto> obtenerRecursoPorId(@PathVariable Long id) {
        return new ResponseEntity<>(recursoService.buscarRecursoPorId(id), HttpStatus.OK);
    }


    @GetMapping("/listar")
    public ResponseEntity<List<RecursoSalidaDto>> listarRecursos() {
        return new ResponseEntity<>(recursoService.listarRecursos(), HttpStatus.OK);
    }

    @PutMapping("actualizar")
    public ResponseEntity<RecursoSalidaDto> actualizarRecurso(@Valid @RequestBody RecursoModificacionDto recursoModificacionDto) throws ResourceNotFoundException {
        return new ResponseEntity<>(recursoService.actualizarRecurso(recursoModificacionDto), HttpStatus.OK);
    }

    @DeleteMapping("eliminar/{id}")
    public ResponseEntity<RecursoSalidaDto> eliminarOdontologo(@PathVariable Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(recursoService.eliminarRecurso(id), HttpStatus.OK);
    }
}
