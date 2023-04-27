package com.pfa.surveilance.security.Repo;

import com.pfa.surveilance.security.Models.ERole;
import com.pfa.surveilance.security.Models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}