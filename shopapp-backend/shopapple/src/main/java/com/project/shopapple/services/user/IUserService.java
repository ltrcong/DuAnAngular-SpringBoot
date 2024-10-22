package com.project.shopapple.services.user;

import com.project.shopapple.entities.User;
import com.project.shopapple.models.UpdateUserDTO;
import com.project.shopapple.models.UserDTO;

public interface IUserService {
    User createUser(UserDTO userDTO) throws Exception;
    String login(String phoneNumber, String password, Long roleId) throws Exception;
    User updateUser(Long userId, UpdateUserDTO updatedUserDTO) throws Exception;
    User getUserDetailsFromToken(String token) throws Exception;
}
