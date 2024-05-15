package com.backend.soundrentals.service;

import com.backend.soundrentals.dto.entrada.DjEntradaDto;
import com.backend.soundrentals.dto.modificacion.DjModificacionDto;
import com.backend.soundrentals.dto.salida.DjSalidaDto;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IRecursoService{
    DjSalidaDto registrarDj(DjEntradaDto recurso);
    List<DjSalidaDto> listarDjs();
    DjSalidaDto buscarDjPorId(Long id) throws ResourceNotFoundException;
    DjSalidaDto actualizarDj(DjModificacionDto djModificacionDto) throws ResourceNotFoundException;
    DjSalidaDto eliminarDj(Long id) throws ResourceNotFoundException;

}
