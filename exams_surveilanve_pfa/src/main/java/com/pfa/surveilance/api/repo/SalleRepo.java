package com.pfa.surveilance.api.repo;

import com.pfa.surveilance.api.model.Salle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository

public interface SalleRepo extends JpaRepository<Salle, Long> {
    Optional<Salle> findSalleById(Long id);
    @Query("SELECT DISTINCT s FROM Salle s WHERE LOWER(s.roomNumber) = LOWER(:roomNumber)")
    Salle findSalleByRoomNumber(String roomNumber);

    void deleteSalleById(Long id);
}
