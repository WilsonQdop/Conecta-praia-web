package br.com.uninassau.LEI.ConectaPraia.domain;

import br.com.uninassau.LEI.ConectaPraia.domain.enums.TypeService;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
public class PostsService {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "serviceProvider_id")
    private ServiceProvider serviceProvider;

    @ManyToOne @JoinColumn(name = "entrepreneur_id")
    private Entrepreneur entrepreneur;

    @OneToMany(mappedBy = "postService", cascade = CascadeType.ALL)
    private List<Registered> subscriptions = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private TypeService ServiceType;

    private String title;
    private String location;
    private LocalDateTime dateHour;
    private BigDecimal value;
    private String valueDescription;   // "+ prancha", "aula + prancha"
    private String imageUrl;
    private LocalDateTime createdAt;

    @Column(columnDefinition = "TEXT")
    private String description;

    public UUID getId() {
        return id;
    }

    public List<Registered> getSubscriptions() {
        return subscriptions;
    }

    public void setSubscriptions(List<Registered> subscriptions) {
        this.subscriptions = subscriptions;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public ServiceProvider getServiceProvider() {
        return serviceProvider;
    }

    public void setServiceProvider(ServiceProvider serviceProvider) {
        this.serviceProvider = serviceProvider;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getDateHour() {
        return dateHour;
    }

    public void setDateHour(LocalDateTime dateHour) {
        this.dateHour = dateHour;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public String getValueDescription() {
        return valueDescription;
    }

    public void setValueDescription(String valueDescription) {
        this.valueDescription = valueDescription;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public TypeService getServiceType() {
        return ServiceType;
    }

    public void setServiceType(TypeService serviceType) {
        ServiceType = serviceType;
    }

    public Entrepreneur getEntrepreneur() {
        return entrepreneur;
    }

    public void setEntrepreneur(Entrepreneur entrepreneur) {
        this.entrepreneur = entrepreneur;
    }
}
