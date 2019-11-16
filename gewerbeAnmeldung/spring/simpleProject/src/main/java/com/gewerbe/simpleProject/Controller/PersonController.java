package com.gewerbe.simpleProject.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.transaction.annotation.*;
import com.gewerbe.simpleProject.entity.Person;
import com.gewerbe.simpleProject.repository.PersonRepository;



@RestController
public class PersonController {

	
	@Autowired
	PersonRepository personRepository;
	
	//@CrossOrigin(origins = "http://localhost:8080/person")

	@CrossOrigin
	@RequestMapping(
		method = RequestMethod.GET,
		path = "/person",
		produces = MediaType.APPLICATION_JSON_VALUE
	)
	public List<Person> getPerson() {
				
		List<Person> personsList = personRepository.findAll();
		
		
		return personsList;
	}


	@CrossOrigin
    @RequestMapping(
            method = RequestMethod.POST,
            path = "/person",
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public Person savePerson(@RequestBody Person person) {
        return personRepository.save(person);
	}


	@CrossOrigin
    @RequestMapping(
        method = RequestMethod.DELETE,
        path = "/person/{id}"
	)
	public void deletePerson(@PathVariable("id") Integer id) {
         personRepository.deleteById(id);
	}
	



	@CrossOrigin
	@RequestMapping(
		method = RequestMethod.PUT,
		path = "/person",
		consumes = MediaType.APPLICATION_JSON_VALUE
	)
	@Transactional
	public Integer updatePerson(@RequestBody Person person){

		return personRepository.updatePerson(person.getId(), person.getVorname(), person.getNachname(), person.getGeburtsdatum());
	}
	
}




/**
@RestController
public class PersonController {

	@RequestMapping(
		method = RequestMethod.GET,
		path = "/person",
		produces = MediaType.APPLICATION_JSON_VALUE
	)
	public Person getPerson() {
		
		List<String> skills = new ArrayList<String>();
		
		skills.add("Spring boot");
		skills.add("Java und Python");
		
		String vorname = "Jonas";
		String nachname = "Timmermann";
		
		Person person = new Person(vorname, nachname, skills);
		
		
		return person;
	}
	
}
**/
