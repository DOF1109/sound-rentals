package com.backend.soundrentals.controller;

import com.backend.soundrentals.dto.entrada.DjEntradaDto;
import com.backend.soundrentals.dto.modificacion.DjModificacionDto;
import com.backend.soundrentals.dto.salida.DjSalidaDto;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.service.impl.DjService;
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
@RequestMapping("/dj")
public class DjController {

    private final Logger LOGGER = LoggerFactory.getLogger(DjController.class);
    private final DjService djService;


    @PostMapping("/registrar")
    public ResponseEntity<DjSalidaDto> registrarRecurso(@Valid @RequestBody DjEntradaDto djEntradaDto) {
        return new ResponseEntity<>(djService.registrarDj(djEntradaDto), HttpStatus.CREATED);
    }


    @GetMapping("{id}")
    public ResponseEntity<DjSalidaDto> obtenerRecursoPorId(@PathVariable Long id) throws ResourceNotFoundException{
        return new ResponseEntity<>(djService.buscarDjPorId(id), HttpStatus.OK);
    }


    @GetMapping("/listar")
    public ResponseEntity<List<DjSalidaDto>> listarRecursos() {
        return new ResponseEntity<>(djService.listarDjs(), HttpStatus.OK);
    }

    @PutMapping("actualizar")
    public ResponseEntity<DjSalidaDto> actualizarRecurso(@Valid @RequestBody DjModificacionDto djModificacionDto) throws ResourceNotFoundException {
        return new ResponseEntity<>(djService.actualizarDj(djModificacionDto), HttpStatus.OK);
    }

    @DeleteMapping("eliminar/{id}")
    public ResponseEntity<DjSalidaDto> eliminarOdontologo(@PathVariable Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(djService.eliminarDj(id), HttpStatus.OK);
    }
}
