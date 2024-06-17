package com.backend.soundrentals.service;

import com.backend.soundrentals.dto.entrada.CalificacionEntradaDto;
import com.backend.soundrentals.dto.salida.CalificacionSalidaDto;
import com.backend.soundrentals.dto.salida.CiudadSalidaDto;
import com.backend.soundrentals.exceptions.BadRequestException;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;

import java.util.List;

public interface ICiudadService {
    List<CiudadSalidaDto> listarCiudades();


}
