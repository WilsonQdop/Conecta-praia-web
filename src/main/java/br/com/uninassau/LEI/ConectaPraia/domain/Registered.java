package br.com.uninassau.LEI.ConectaPraia.domain;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "registrados")
public class Registered {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "turista_id")
    private Tourist tourist;

    // Colunas distintas para evitar o conflito
    @ManyToOne
    @JoinColumn(name = "post_service_id")
    private PostsService postService;

    @ManyToOne
    @JoinColumn(name = "post_event_id")
    private PostsEvent postEvent;

    private LocalDateTime registeredAt;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Tourist getTourist() {
        return tourist;
    }

    public void setTourist(Tourist tourist) {
        this.tourist = tourist;
    }

    public PostsService getPostService() {
        return postService;
    }

    public void setPostService(PostsService postService) {
        this.postService = postService;
    }

    public PostsEvent getPostEvent() {
        return postEvent;
    }

    public void setPostEvent(PostsEvent postEvent) {
        this.postEvent = postEvent;
    }

    public LocalDateTime getRegisteredAt() {
        return registeredAt;
    }

    public void setRegisteredAt(LocalDateTime registeredAt) {
        this.registeredAt = registeredAt;
    }
}
