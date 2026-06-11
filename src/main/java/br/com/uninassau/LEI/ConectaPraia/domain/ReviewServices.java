package br.com.uninassau.LEI.ConectaPraia.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "avaliacao_servico")
public class ReviewServices extends BaseReview {
    @ManyToOne
    @JoinColumn(name = "post_service_id")
    private PostsService postsService;

    public PostsService getPostsService() {
        return postsService;
    }

    public void setPostsService(PostsService postsService) {
        this.postsService = postsService;
    }
}


