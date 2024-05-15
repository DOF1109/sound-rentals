package com.backend.soundrentals.service;

import com.backend.soundrentals.dto.entrada.ReservaEntradaDto;
import com.backend.soundrentals.dto.modificacion.ReservaModificacionDto;
import com.backend.soundrentals.dto.salida.ReservaSalidaDto;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IReservaService {
    ReservaSalidaDto registrarReserva(ReservaEntradaDto reservasEntradaDto);
    List<ReservaSalidaDto> listarReservas();
    ReservaSalidaDto obtenerReservaPorId(Long id) throws ResourceNotFoundException;
    ReservaSalidaDto actualizarReserva(ReservaModificacionDto reservaModificacionDto) throws ResourceNotFoundException;
    ReservaSalidaDto eliminarReserva(Long id) throws ResourceNotFoundException;
}