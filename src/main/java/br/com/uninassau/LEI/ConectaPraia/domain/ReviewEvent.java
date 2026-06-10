package br.com.uninassau.LEI.ConectaPraia.domain;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "avaliacao_evento")
public class ReviewEvent extends BaseReview {
    @ManyToOne
    @JoinColumn(name = "post_event_id")
    private PostsEvent postsEvent;

    public PostsEvent getPostsEvent() {
        return postsEvent;
    }

    public void setPostsEvent(PostsEvent postsEvent) {
        this.postsEvent = postsEvent;
    }
}


