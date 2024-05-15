package com.backend.soundrentals.service.impl;

import com.backend.soundrentals.dto.entrada.DjEntradaDto;
import com.backend.soundrentals.dto.modificacion.DjModificacionDto;
import com.backend.soundrentals.dto.salida.DjSalidaDto;
import com.backend.soundrentals.dto.salida.EstiloSalidaDto;
import com.backend.soundrentals.entity.Dj;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.repository.DjRepository;
import com.backend.soundrentals.service.IRecursoService;
import com.backend.soundrentals.utils.JsonPrinter;
import lombok.AllArgsConstructor;
import lombok.Getter;
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
public class DjService implements IRecursoService {

    private final DjRepository djRepository;
    private final Logger LOGGER = LoggerFactory.getLogger(Dj.class);
    private ModelMapper modelMapper;

    @Override
    public DjSalidaDto registrarDj(DjEntradaDto recurso) {
        return null;
    }

    @Override
    public List<DjSalidaDto> listarDjs() {
        List<DjSalidaDto> djs = djRepository.findAll().stream()
                .map(d -> modelMapper.map(d, DjSalidaDto.class)).toList();
        LOGGER.info("Listado de djs: "+ JsonPrinter.toString(djs));
        return djs;
    }

    @Override
    public DjSalidaDto buscarDjPorId(Long id) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public DjSalidaDto actualizarDj(DjModificacionDto djModificacionDto) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public DjSalidaDto eliminarDj(Long id) throws ResourceNotFoundException {
        return null;
    }

    @PostConstruct
    private void configureMapping() {
        modelMapper.typeMap(DjEntradaDto.class, Dj.class);
        modelMapper.typeMap(DjModificacionDto.class, Dj.class);
        modelMapper.typeMap(Dj.class, DjSalidaDto.class);
        modelMapper.typeMap(Dj.class, DjModificacionDto.class);
    }
}
