package com.karyasanchay.itam.service;

import com.karyasanchay.itam.dto.UserDTO;
import com.karyasanchay.itam.entity.User;
import com.karyasanchay.itam.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private UserDTO mapToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole().name());
        if (user.getLocation() != null) {
            dto.setLocationName(user.getLocation().getName());
        }
        return dto;
    }
}
