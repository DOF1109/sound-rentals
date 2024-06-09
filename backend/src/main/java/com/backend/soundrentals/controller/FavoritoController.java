package com.backend.soundrentals.controller;

import com.backend.soundrentals.dto.entrada.CaracteristicaEntradaDto;
import com.backend.soundrentals.dto.entrada.FavoritoEntradaDto;
import com.backend.soundrentals.dto.modificacion.CaracteristicaModificacionDto;
import com.backend.soundrentals.dto.salida.CaracteristicaSalidaDto;
import com.backend.soundrentals.dto.salida.FavoritoSalidaDto;
import com.backend.soundrentals.exceptions.BadRequestException;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.service.impl.CaracteristicaService;
import com.backend.soundrentals.service.impl.FavoritoService;
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
@RequestMapping("/favorito")

public class FavoritoController {

    private final Logger LOGGER = LoggerFactory.getLogger(FavoritoController.class);
    private final FavoritoService favoritoService;


    @PostMapping("/registrar")
    public ResponseEntity<FavoritoSalidaDto> registrarFavorito(@Valid @RequestBody FavoritoEntradaDto favoritoEntradaDto) throws BadRequestException, ResourceNotFoundException {
        return new ResponseEntity<>(favoritoService.registrarFavorito(favoritoEntradaDto), HttpStatus.CREATED);
    }


    @GetMapping("{id}")
    public ResponseEntity<FavoritoSalidaDto> obtenerFavoritoPorId(@PathVariable Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(favoritoService.buscarFavoritoPorId(id), HttpStatus.OK);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<FavoritoSalidaDto>> listarFavoritos() {
        return new ResponseEntity<>(favoritoService.listarFavoritos(), HttpStatus.OK);
    }

    @DeleteMapping("eliminar/{id}")
    public ResponseEntity<FavoritoSalidaDto> eliminarFavorito(@PathVariable Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(favoritoService.eliminarFavorito(id), HttpStatus.OK);
    }
}
