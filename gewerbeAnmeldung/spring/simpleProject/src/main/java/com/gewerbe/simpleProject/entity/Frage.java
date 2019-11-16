package com.gewerbe.simpleProject.entity;
import java.sql.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;


@Entity
@Table(name = "frage") //d.h. Es wird eine Tabelle namens 'person' erstellt die als Attribute die Variablen dieser Klasse hat
public class Frage {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotNull
	private String frage;
	
	@NotNull
	private String kategorie;
	
	@NotNull
    private String antwortTyp;
    
    @NotNull
    private String antwortOptionen;   // Als ein String erstellen und später splitten zu einzelnen Strings z.B. ("gbr, gmbh, ag, ohg, kg ")

    @NotNull
    private String hinweis;

	
	
	public Frage() {
		
	}
	
	
    public Frage(Integer id, String frage, String kategorie, String antwortTyp, String antwortOptionen, String hinweis) {
        this.id = id;
        this.frage = frage;
        this.kategorie = kategorie;
        this.antwortTyp = antwortTyp;
        this.antwortOptionen = antwortOptionen;
        this.hinweis = hinweis;
}

    
    
    
	
	
	public Integer getId() {
		return this.id;
	}
	
	
	public void setId(Integer id) {
		this.id = id;
	}

    public String getFrage() {
        return frage;
    }

    public void setFrage(String frage) {
        this.frage = frage;
    }

    public String getKategorie() {
        return kategorie;
    }

    public void setKategorie(String kategorie) {
        this.kategorie = kategorie;
    }

    public String getAntwortTyp() {
        return antwortTyp;
    }

    public void setAntwortTyp(String antwortTyp) {
        this.antwortTyp = antwortTyp;
    }

    public String getAntwortOptionen() {
        return antwortOptionen;
    }

    public void setAntwortOptionen(String antwortOptionen) {
        this.antwortOptionen = antwortOptionen;
    }

    public String getHinweis() {
        return hinweis;
    }

    public void setHinweis(String hinweis) {
        this.hinweis = hinweis;
    }

  
	
	
}
