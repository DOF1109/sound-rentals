package com.backend.soundrentals.service;

import com.backend.soundrentals.dto.entrada.RecursoEntradaDto;
import com.backend.soundrentals.dto.modificacion.RecursoModificacionDto;
import com.backend.soundrentals.dto.salida.RecursoSalidaDto;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IRecursoService{
    RecursoSalidaDto registrarRecurso(RecursoEntradaDto recurso);
    List<RecursoSalidaDto> listarRecursos();

    RecursoSalidaDto buscarRecursoPorId(Long id);
    RecursoSalidaDto actualizarRecurso(RecursoModificacionDto recursoModificacionEntradaDto) throws ResourceNotFoundException;
    RecursoSalidaDto eliminarRecurso(Long id) throws ResourceNotFoundException;

}
