package com.backend.soundrentals.service;

import com.backend.soundrentals.dto.entrada.ReservasEntradaDto;
import com.backend.soundrentals.dto.modificacion.ReservasModificacionDto;
import com.backend.soundrentals.dto.salida.ReservasSalidaDto;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;

import java.util.List;

public interface ReservaService {
    ReservasSalidaDto registrarReserva(ReservasEntradaDto reservasEntradaDto);
    List<ReservasSalidaDto> listarReservas();
    ReservasSalidaDto obtenerReservaPorId(Long id) throws ResourceNotFoundException;
    ReservasSalidaDto actualizarReserva(ReservasModificacionDto reservasModificacionDto) throws ResourceNotFoundException;
    ReservasSalidaDto eliminarReserva(Long id) throws ResourceNotFoundException;
}