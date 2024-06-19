package com.backend.soundrentals.service.impl;

import com.backend.soundrentals.dto.entrada.CiudadEntradaDto;
import com.backend.soundrentals.dto.entrada.DjEntradaDto;
import com.backend.soundrentals.dto.entrada.EstiloEntradaDto;
import com.backend.soundrentals.dto.modificacion.CiudadModificacionDto;
import com.backend.soundrentals.dto.modificacion.DjModificacionDto;
import com.backend.soundrentals.dto.salida.CalificacionSalidaDto;
import com.backend.soundrentals.dto.salida.CiudadSalidaDto;
import com.backend.soundrentals.dto.salida.DjSalidaDto;
import com.backend.soundrentals.entity.Caracteristica;
import com.backend.soundrentals.entity.Ciudad;
import com.backend.soundrentals.entity.Dj;
import com.backend.soundrentals.entity.Estilo;
import com.backend.soundrentals.exceptions.BadRequestException;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;
import com.backend.soundrentals.repository.*;
import com.backend.soundrentals.service.ICiudadService;
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
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@AllArgsConstructor
@Getter
@Setter
@Service
public class CiudadService implements ICiudadService {

    private final CiudadRepository ciudadRepository;
    private final Logger LOGGER = LoggerFactory.getLogger(Ciudad.class);
    private ModelMapper modelMapper;

    @Override
    public List<CiudadSalidaDto> listarCiudades() {
        List<CiudadSalidaDto> ciudades = ciudadRepository.findAll().stream()
                .map(c -> modelMapper.map(c, CiudadSalidaDto.class)).toList();

        LOGGER.info("Listando todas las ciudades");
        return ciudades;
    }

    @PostConstruct
    private void configureMapping() {
        modelMapper.typeMap(CiudadEntradaDto.class, Ciudad.class);
        modelMapper.typeMap(CiudadModificacionDto.class, Ciudad.class);
        modelMapper.typeMap(Ciudad.class, CiudadSalidaDto.class);
    }
}
