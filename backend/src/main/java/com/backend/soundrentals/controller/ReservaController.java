package com.backend.soundrentals.controller;

import com.backend.soundrentals.dto.entrada.ReservaEntradaDto;
import com.backend.soundrentals.dto.modificacion.ReservaModificacionDto;
import com.backend.soundrentals.dto.salida.ReservaSalidaDto;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.service.impl.ReservaService;
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
    private final ReservaService reservasService;

    @PostMapping("/registrar")
    public ResponseEntity<ReservaSalidaDto> registrarReserva(@Valid @RequestBody ReservaEntradaDto reservasEntradaDto) {
        return new ResponseEntity<>(reservasService.registrarReserva(reservasEntradaDto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservaSalidaDto> obtenerReservaPorId(@PathVariable Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(reservasService.obtenerReservaPorId(id), HttpStatus.OK);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ReservaSalidaDto>> listarReservas() {
        return new ResponseEntity<>(reservasService.listarReservas(), HttpStatus.OK);
    }

    @PutMapping("/actualizar")
    public ResponseEntity<ReservaSalidaDto> actualizarReserva(@Valid @RequestBody ReservaModificacionDto reservasModificacionDto) throws ResourceNotFoundException {
        return new ResponseEntity<>(reservasService.actualizarReserva(reservasModificacionDto), HttpStatus.OK);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarReserva(@PathVariable Long id) throws ResourceNotFoundException {
        reservasService.eliminarReserva(id);
        return new ResponseEntity<>("Reserva eliminada correctamente", HttpStatus.OK);
    }
}