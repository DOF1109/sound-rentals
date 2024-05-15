package com.backend.soundrentals.service;

import com.backend.soundrentals.dto.entrada.EstiloEntradaDto;
import com.backend.soundrentals.dto.modificacion.EstiloModificacionDto;
import com.backend.soundrentals.dto.salida.EstiloSalidaDto;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IEstiloService {
    EstiloSalidaDto registrarEstilo(EstiloEntradaDto estilo);
    List<EstiloSalidaDto> listarEstilos();
    EstiloSalidaDto buscarEstiloPorId(Long id) throws ResourceNotFoundException;
    EstiloSalidaDto actualizarEstilo(EstiloModificacionDto estiloModificacionDto) throws ResourceNotFoundException;
    EstiloSalidaDto eliminarEstilo(Long id) throws ResourceNotFoundException;

}
