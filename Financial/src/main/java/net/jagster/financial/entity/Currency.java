package net.jagster.financial.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "currency")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Currency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name", unique = false, nullable = false)
    private String name;
    @Column(name = "code", unique = true, nullable = false)
    private String code;
    @Column(name = "symbol", unique = false, nullable = false)
    private String symbol;
    @OneToMany(mappedBy = "currency", cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}, fetch = FetchType.LAZY)
    private List<Account> accounts = new ArrayList<>();
}
