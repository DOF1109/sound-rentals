package com.backend.soundrentals.controller;

import com.backend.soundrentals.dto.entrada.ReservasEntradaDto;
import com.backend.soundrentals.dto.modificacion.ReservasModificacionDto;
import com.backend.soundrentals.dto.salida.ReservasSalidaDto;
import com.backend.soundrentals.exceptions.ReservasNotFoundException;
import com.backend.soundrentals.service.impl.ReservasService;
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
@RequestMapping("/reservas")
public class ReservaController {

    private final Logger LOGGER = LoggerFactory.getLogger(ReservaController.class);
    private final ReservasService reservasService;

    @PostMapping("/registrar")
    public ResponseEntity<ReservasSalidaDto> registrarReserva(@Valid @RequestBody ReservasEntradaDto reservasEntradaDto) {
        return new ResponseEntity<>(reservasService.registrarReserva(reservasEntradaDto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservasSalidaDto> obtenerReservaPorId(@PathVariable Long id) throws ReservasNotFoundException {
        return new ResponseEntity<>(reservasService.obtenerReservaPorId(id), HttpStatus.OK);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ReservasSalidaDto>> listarReservas() {
        return new ResponseEntity<>(reservasService.listarReservas(), HttpStatus.OK);
    }

    @PutMapping("/actualizar")
    public ResponseEntity<ReservasSalidaDto> actualizarReserva(@Valid @RequestBody ReservasModificacionDto reservasModificacionDto) throws ReservasNotFoundException {
        return new ResponseEntity<>(reservasService.actualizarReserva(reservasModificacionDto), HttpStatus.OK);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarReserva(@PathVariable Long id) throws ReservasNotFoundException {
        reservasService.eliminarReserva(id);
        return new ResponseEntity<>("Reserva eliminada correctamente", HttpStatus.OK);
    }
}