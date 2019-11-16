package com.gewerbe.simpleProject.entity;
import java.sql.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;


@Entity
@Table(name = "person") //d.h. Es wird eine Tabelle namens 'person' erstellt die als Attribute die Variablen dieser Klasse hat
public class Person {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotNull
	private String vorname;
	
	@NotNull
	private String nachname;
	
	@NotNull
	private Date geburtsdatum;
	
	
	public Person() {
		
	}
	
	
	public Person(String vorname, String nachname, Date geburtsdatum) {

		this.vorname = vorname;
		this.nachname = nachname;
	
		this.geburtsdatum = geburtsdatum;
		
	}
	
	
	public String getVorname() {
		return this.vorname;
	}
	public String getNachname() {
		return this.nachname;
	}
	public Date getGeburtsdatum() {
		return this.geburtsdatum;
	}
	public Integer getId() {
		return this.id;
	}
	
	
	
	public void setVorname(String vorname) {
		 this.vorname = vorname;
	}
	public void setNachname(String nachname) {
		this.nachname = nachname;
	}
	public void setGeburtssdatum(Date geburtsdatum) {
		this.geburtsdatum = geburtsdatum;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	
	
}
