package com.backend.soundrentals.service;

import com.backend.soundrentals.dto.entrada.CaracteristicaEntradaDto;
import com.backend.soundrentals.dto.entrada.FavoritoEntradaDto;
import com.backend.soundrentals.dto.modificacion.CaracteristicaModificacionDto;
import com.backend.soundrentals.dto.modificacion.FavoritoModificacionDto;
import com.backend.soundrentals.dto.salida.CaracteristicaSalidaDto;
import com.backend.soundrentals.dto.salida.FavoritoSalidaDto;
import com.backend.soundrentals.exceptions.BadRequestException;
import com.backend.soundrentals.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IFavoritoService {
    FavoritoSalidaDto registrarFavorito(FavoritoEntradaDto favorito) throws ResourceNotFoundException, BadRequestException;
    List<FavoritoSalidaDto> listarFavoritos();
    FavoritoSalidaDto buscarFavoritoPorId(Long id) throws ResourceNotFoundException;
    FavoritoSalidaDto eliminarFavorito(Long id) throws ResourceNotFoundException;

}
