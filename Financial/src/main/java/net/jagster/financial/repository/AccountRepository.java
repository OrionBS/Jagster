package net.jagster.financial.repository;

import net.jagster.financial.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

/*
    Optional<Account> findAccountByCredential_IdAndNameIgnoreCase(Integer credential_id, String name);

    List<Account> findAccountsByCredential_Id(Integer credential_id, Sort sort);

    Optional<Account> findAccountByCredential_IdAndId(Integer credential_id, Integer id);

    boolean existsAccountByCredential_IdAndId(Integer credential_id, Integer id);
*/
    Optional<Account> findAccountByIdAndUserIdIgnoreCase(Long id, String userId);

    List<Account> findAccountsByUserIdIgnoreCase(String userId);

    Optional<Account> findAccountByName(String name);

    Optional<Account> findAccountByUserIdIgnoreCaseAndNameIgnoreCase(String userId, String name);

}
