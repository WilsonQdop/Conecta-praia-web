package br.com.uninassau.LEI.ConectaPraia.domain;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "empreendedor")
@DiscriminatorValue("Empreendedor")
public class Entrepreneur extends User {

    private String nameFantasia;
    private String cnpj;
    private String avatarUrl;
    private String bio;

    @OneToMany(mappedBy = "entrepreneur", cascade = CascadeType.ALL)
    private List<ServiceProvider> services;

    public String getNameFantasia() {
        return nameFantasia;
    }

    public void setNameFantasia(String nameFantasia) {
        this.nameFantasia = nameFantasia;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public List<ServiceProvider> getServices() {
        return services;
    }

    public void setServices(List<ServiceProvider> services) {
        this.services = services;
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
