package com.backend.soundrentals.service.impl;

import com.backend.soundrentals.dto.entrada.RecursoEntradaDto;
import com.backend.soundrentals.dto.modificacion.RecursoModificacionDto;
import com.backend.soundrentals.dto.salida.RecursoSalidaDto;
import com.backend.soundrentals.entity.Recurso;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.repository.RecursoRepository;
import com.backend.soundrentals.service.IRecursoService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Service
public class RecursoService implements IRecursoService {

    private final RecursoRepository recursoRepository;
    private final Logger LOGGER = LoggerFactory.getLogger(Recurso.class);
    private ModelMapper modelMapper;

    @Override
    public RecursoSalidaDto registrarRecurso(RecursoEntradaDto recurso) {
        return null;
    }

    @Override
    public List<RecursoSalidaDto> listarRecursos() {
        return null;
    }

    @Override
    public RecursoSalidaDto buscarRecursoPorId(Long id) {
        return null;
    }

    @Override
    public RecursoSalidaDto actualizarRecurso(RecursoModificacionDto recursoModificacionEntradaDto) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public RecursoSalidaDto eliminarRecurso(Long id) throws ResourceNotFoundException {
        return null;
    }

    @PostConstruct
    private void configureMapping() {
        modelMapper.typeMap(RecursoEntradaDto.class, Recurso.class);
        modelMapper.typeMap(RecursoModificacionDto.class, Recurso.class);
        modelMapper.typeMap(Recurso.class, RecursoSalidaDto.class);
        modelMapper.typeMap(Recurso.class, RecursoModificacionDto.class);
    }
}
