package com.project.shopapple.services.user;

import com.project.shopapple.components.JwtTokenUtils;
import com.project.shopapple.entities.Role;
import com.project.shopapple.entities.User;
import com.project.shopapple.exceptions.DataNotFoundException;
import com.project.shopapple.exceptions.PermissionDenyException;
import com.project.shopapple.models.UpdateUserDTO;
import com.project.shopapple.models.UserDTO;
import com.project.shopapple.repositories.RoleRepository;
import com.project.shopapple.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtils jwtTokenUtil;
    private final AuthenticationManager authenticationManager;

    @Override
    @Transactional
    public User createUser(UserDTO userDTO) throws Exception {
        String phoneNumber = userDTO.getPhoneNumber();
        //Kiểm tra xem phone number này đã tồn tại chưa
        if(userRepository.existsByPhoneNumber(phoneNumber)) {
            throw new DataIntegrityViolationException("This phone number alreadey exits");
        }
        Role role = roleRepository.findById(userDTO.getRoleId())
                .orElseThrow(() -> new DataNotFoundException("Role not found"));
        if(role.getName().toUpperCase().equals(Role.ADMIN)) {
            throw new PermissionDenyException("You cannot register a admin account");
        }
        //convert CustomerDTO => Customer
        User newUser = User.builder()
                .fullName(userDTO.getFullName())
                .phoneNumber(userDTO.getPhoneNumber())
                .gender(userDTO.getGender())
                .address(userDTO.getAddress())
                .password(userDTO.getPassword())
                .dateOfBirth(userDTO.getDateOfBirth())
                .facebookAccountID(userDTO.getFacebookAccountId())
                .googleAccountID(userDTO.getGoogleAccountId())
                .build();

        newUser.setRole(role);
        //kiểm tra nếu có id facebook và google thì không cần mật khẩu
        if(userDTO.getFacebookAccountId() == 0  && userDTO.getGoogleAccountId() == 0) {
            String password = userDTO.getPassword();
            String  encodedPassword = passwordEncoder.encode(password);
            newUser.setPassword(encodedPassword);
        }
        return userRepository.save(newUser);
    }

    @Override
    public String login(String phoneNumber, String password, Long roleId) throws Exception {
        Optional<User> optionalCustomer = userRepository.findByPhoneNumber(phoneNumber);
        if(optionalCustomer.isEmpty()){
            throw new DataNotFoundException("Invalid phone number / password");
        }
        User existingUser = optionalCustomer.get();
        //check password
        if(existingUser.getFacebookAccountID() == 0
                && existingUser.getGoogleAccountID() == 0){
            if(!passwordEncoder.matches(password, existingUser.getPassword())){
                throw new BadCredentialsException("Wrong phone number or password");
            }
        }

        Optional<Role> optionalRole = roleRepository.findById(roleId);
        if(optionalCustomer.isEmpty() || !roleId.equals(existingUser.getRole().getId())){
            throw new DataNotFoundException("khoong dung role");
        }


        if (!existingUser.isActive()) {
            throw new DataNotFoundException("Tai khoan chua duowjc kich hoajt");
        }

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                phoneNumber,password,
                existingUser.getAuthorities()
        );
        //authennticate with java spring sercurity
        authenticationManager.authenticate(authenticationToken);
        return jwtTokenUtil.generateToken(existingUser);
    }

    @Transactional
    @Override
    public User updateUser(Long userId, UpdateUserDTO updatedUserDTO) throws Exception {
        // Find the existing user by userId
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("User not found"));

        // Check if the phone number is being changed and if it already exists for another user
//        String newPhoneNumber = updatedUserDTO.getPhoneNumber();
//        if (!existingUser.getPhoneNumber().equals(newPhoneNumber) &&
//                userRepository.existsByPhoneNumber(newPhoneNumber)) {
//            throw new DataIntegrityViolationException("Phone number already exists");
//        }

        // Update user information based on the DTO
        if (updatedUserDTO.getFullName() != null) {
            existingUser.setFullName(updatedUserDTO.getFullName());
        }
//        if (newPhoneNumber != null) {
//            existingUser.setPhoneNumber(newPhoneNumber);
//        }
        if (updatedUserDTO.getGender() != null) {
            existingUser.setGender(updatedUserDTO.getGender());
        }

        if (updatedUserDTO.getAddress() != null) {
            existingUser.setAddress(updatedUserDTO.getAddress());
        }

        if (updatedUserDTO.getDateOfBirth() != null) {
            existingUser.setDateOfBirth(updatedUserDTO.getDateOfBirth());
        }
//        if (updatedUserDTO.getFacebookAccountId() > 0) {
//            existingUser.setFacebookAccountID(updatedUserDTO.getFacebookAccountId());
//        }
//        if (updatedUserDTO.getGoogleAccountId() > 0) {
//            existingUser.setGoogleAccountID(updatedUserDTO.getGoogleAccountId());
//        }

        // Update the password if it is provided in the DTO
        if (updatedUserDTO.getPassword() != null
                && !updatedUserDTO.getPassword().isEmpty()) {
            if(!updatedUserDTO.getPassword().equals(updatedUserDTO.getRetypePassword())) {
                throw new DataNotFoundException("Password and retype password not the same");
            }
            String newPassword = updatedUserDTO.getPassword();
            String encodedPassword = passwordEncoder.encode(newPassword);
            existingUser.setPassword(encodedPassword);
        }
        //existingUser.setRole(updatedRole);
        // Save the updated user
        return userRepository.save(existingUser);
    }


    @Override
    public User getUserDetailsFromToken(String token) throws Exception {
        if(jwtTokenUtil.isTokenExpired(token)) {
            throw new Exception("Token is expired");
        }
        String phoneNumber = jwtTokenUtil.extractPhoneNumber(token);
        Optional<User> user = userRepository.findByPhoneNumber(phoneNumber);

        if (user.isPresent()) {
            return user.get();
        } else {
            throw new Exception("User not found");
        }
    }
}
