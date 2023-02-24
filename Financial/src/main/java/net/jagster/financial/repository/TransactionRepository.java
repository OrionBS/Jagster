package net.jagster.financial.repository;

import net.jagster.financial.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    Optional<Transaction> findTransactionByDescription(String description);

    Optional<Transaction> findTransactionByIdAndUserIdIgnoreCase(Long transactionId, String userId);

    /*List<Transaction> findTransactionsByAccount_Credential_Id(Integer account_credential_id, Sort sort);

    List<Transaction> findTransactionsByAccount_Id(Integer account_id, Sort sort);

    Optional<Transaction> findTransactionByAccount_Credential_IdAndId(Integer account_credential_id, Integer id);
*/
}
