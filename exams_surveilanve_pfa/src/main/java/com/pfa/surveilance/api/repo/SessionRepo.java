package com.pfa.surveilance.api.repo;

import com.pfa.surveilance.api.model.Calendrier;
import com.pfa.surveilance.api.model.Section;
import com.pfa.surveilance.api.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface SessionRepo extends JpaRepository<Session, Long> {
    Optional<Session> findSessionById(Long id);
    void deleteSessionById(Long id);
}

