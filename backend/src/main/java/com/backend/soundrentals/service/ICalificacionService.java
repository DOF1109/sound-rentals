package com.backend.soundrentals.service;

import com.backend.soundrentals.dto.entrada.CalificacionEntradaDto;
import com.backend.soundrentals.dto.entrada.CaracteristicaEntradaDto;
import com.backend.soundrentals.dto.modificacion.CalificacionModificacionDto;
import com.backend.soundrentals.dto.modificacion.CaracteristicaModificacionDto;
import com.backend.soundrentals.dto.salida.CalificacionSalidaDto;
import com.backend.soundrentals.dto.salida.CaracteristicaSalidaDto;
import com.backend.soundrentals.exceptions.BadRequestException;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;

import java.util.List;

public interface ICalificacionService {
    CalificacionSalidaDto registrarCalificacion(CalificacionEntradaDto calificacion) throws ResourceNotFoundException,BadRequestException;
    List<CalificacionSalidaDto> listarCalificaciones();
    CalificacionSalidaDto buscarCalificacionPorId(Long id) throws ResourceNotFoundException;
    CalificacionSalidaDto eliminarCalificacion(Long id) throws ResourceNotFoundException;

}
