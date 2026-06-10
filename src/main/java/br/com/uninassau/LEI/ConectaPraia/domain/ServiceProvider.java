package br.com.uninassau.LEI.ConectaPraia.domain;

import br.com.uninassau.LEI.ConectaPraia.domain.enums.TypeService;
import br.com.uninassau.LEI.ConectaPraia.domain.enums.TypeStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "servicos")
public abstract class ServiceProvider {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne @JoinColumn(name = "entrepreneur_id")
    private Entrepreneur entrepreneur;

    private String name;
    private String description;
    private String imageUrl;
    private String location;
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private TypeService service;
    @Enumerated(EnumType.STRING)
    private TypeStatus status;

    @OneToMany(mappedBy = "serviceProvider", cascade = CascadeType.ALL)
    private List<PostsService> postsServices;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Entrepreneur getEntrepreneur() {
        return entrepreneur;
    }

    public void setEntrepreneur(Entrepreneur entrepreneur) {
        this.entrepreneur = entrepreneur;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public TypeService getService() {
        return service;
    }

    public void setService(TypeService service) {
        this.service = service;
    }

    public TypeStatus getStatus() {
        return status;
    }

    public void setStatus(TypeStatus status) {
        this.status = status;
    }

    public List<PostsService> getPosts() {
        return postsServices;
    }

    public void setPosts(List<PostsService> postsServices) {
        this.postsServices = postsServices;
    }
}
