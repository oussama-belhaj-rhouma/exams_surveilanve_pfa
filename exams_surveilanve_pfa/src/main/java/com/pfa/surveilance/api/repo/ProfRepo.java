package com.pfa.surveilance.api.repo;

import com.pfa.surveilance.api.model.Prof;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository

public interface ProfRepo extends JpaRepository<Prof, Long> {

    Optional<Prof> findProfById(Long id);
    @Query("SELECT DISTINCT p FROM Prof p WHERE LOWER(p.username) = LOWER(:username)")
    Optional<Prof> findProfByUsername(String username);
    void deleteProfById(Long id);

    Optional<Prof> findByUsername(String username);
}
