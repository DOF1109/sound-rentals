package com.backend.soundrentals.service;

import com.backend.soundrentals.dto.entrada.CaracteristicaEntradaDto;
import com.backend.soundrentals.dto.entrada.EstiloEntradaDto;
import com.backend.soundrentals.dto.modificacion.CaracteristicaModificacionDto;
import com.backend.soundrentals.dto.modificacion.EstiloModificacionDto;
import com.backend.soundrentals.dto.salida.CaracteristicaSalidaDto;
import com.backend.soundrentals.dto.salida.EstiloSalidaDto;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;

import java.util.List;

public interface ICaracteristicaService {
    CaracteristicaSalidaDto registrarCaracteristica(CaracteristicaEntradaDto caracteristica);
    List<CaracteristicaSalidaDto> listarCaracteristicas();
    CaracteristicaSalidaDto buscarCaracteristicaPorId(Long id) throws ResourceNotFoundException;
    CaracteristicaSalidaDto actualizarCaracteristica(CaracteristicaModificacionDto caracteristicaModificacionDto) throws ResourceNotFoundException;
    CaracteristicaSalidaDto eliminarCaracteristica(Long id) throws ResourceNotFoundException;

}
