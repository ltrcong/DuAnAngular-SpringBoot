package com.project.shopapple.services.role;

import com.project.shopapple.entities.Role;
import com.project.shopapple.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService {
    private final RoleRepository roleRepositotory;
    @Override
    public List<Role> getAllRoles() {
        return roleRepositotory.findAll();
    }
}
