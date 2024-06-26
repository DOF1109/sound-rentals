package com.backend.soundrentals.controller;

import com.backend.soundrentals.dto.entrada.DjEntradaDto;
import com.backend.soundrentals.dto.modificacion.DjModificacionDto;
import com.backend.soundrentals.dto.salida.DjSalidaDto;
import com.backend.soundrentals.exceptions.BadRequestException;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.exceptions.UsernameAlreadyExistsException;
import com.backend.soundrentals.service.impl.DjService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/dj")
public class DjController {

    private final Logger LOGGER = LoggerFactory.getLogger(DjController.class);
    private final DjService djService;


    @PostMapping("/registrar")
    public ResponseEntity<DjSalidaDto> registrarRecurso(@Valid @RequestBody DjEntradaDto djEntradaDto) throws BadRequestException, ResourceNotFoundException {
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

    @GetMapping("top10")
    public ResponseEntity<List<DjSalidaDto>> obtenerTop10Djs(){
        return new ResponseEntity<>(djService.listarTop10(), HttpStatus.OK);
    }

    @GetMapping("/buscador")
    public ResponseEntity<List<DjSalidaDto>> buscadorPorCiudadFecha(
            @RequestParam(required = false) Long ciudadId,
            @RequestParam(required = false) Long styleId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin
    ) throws ResourceNotFoundException {
        List<DjSalidaDto> resultado = djService.buscarDjPorCiudadFecha(ciudadId,styleId, fechaInicio, fechaFin);
        return new ResponseEntity<>(resultado, HttpStatus.OK);
    }

    @GetMapping("/style/{id}")
    public ResponseEntity<List<DjSalidaDto>> obtenerDjsPorEStilo(@PathVariable Long id)  {
        return new ResponseEntity<>(djService.listarDjsPorEstilo(id), HttpStatus.OK);
    }

    @PutMapping("actualizar")
    public ResponseEntity<DjSalidaDto> actualizarRecurso(@Valid @RequestBody DjModificacionDto djModificacionDto) throws ResourceNotFoundException {
        return new ResponseEntity<>(djService.actualizarDj(djModificacionDto), HttpStatus.OK);
    }

    @DeleteMapping("eliminar/{id}")
    public ResponseEntity<DjSalidaDto> eliminarDj(@PathVariable Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(djService.eliminarDj(id), HttpStatus.OK);
    }
}
