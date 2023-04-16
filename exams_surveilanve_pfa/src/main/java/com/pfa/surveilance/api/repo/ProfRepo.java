package com.pfa.surveilance.api.repo;

import com.pfa.surveilance.api.model.Prof;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository

public interface ProfRepo extends JpaRepository<Prof, Long> {

    Optional<Prof> findProfById(Long id);
    void deleteProfById(Long id);
}
