package br.com.uninassau.LEI.ConectaPraia.dto;

public record ReviewResponseDTO(
    String id,
    String userName,
    int rating,
    String comment,
    String date
) {}
