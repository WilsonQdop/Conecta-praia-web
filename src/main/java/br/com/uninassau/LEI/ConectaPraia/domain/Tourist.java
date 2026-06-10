package br.com.uninassau.LEI.ConectaPraia.domain;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "turista")
@DiscriminatorValue("Turista")
public class Tourist extends User {

    private String avatarUrl;
    private String bio;

    @OneToMany(mappedBy = "tourist", cascade = CascadeType.ALL)
    private List<Registered> registeredList;


    public List<Registered> getRegisteredList() {
        return registeredList;
    }

    public void setRegisteredList(List<Registered> registeredList) {
        this.registeredList = registeredList;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
