package com.gewerbe.simpleProject.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.transaction.annotation.*;
import com.gewerbe.simpleProject.entity.Frage;
import com.gewerbe.simpleProject.repository.FrageRepository;



@RestController
public class FrageController {

	
	@Autowired
	FrageRepository frageRepository;
	
	//@CrossOrigin(origins = "http://localhost:8080/person")

	@CrossOrigin
	@RequestMapping(
		method = RequestMethod.GET,
		path = "/frage",
		produces = MediaType.APPLICATION_JSON_VALUE
	)
	public List<Frage> getFrage() {
				
		List<Frage> frageList = frageRepository.findAll();
		
		
		return frageList;
	}


	@CrossOrigin
    @RequestMapping(
            method = RequestMethod.POST,
            path = "/frage",
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public Frage saveFrage(@RequestBody Frage frage) {
        return frageRepository.save(frage);
	}


	@CrossOrigin
    @RequestMapping(
        method = RequestMethod.DELETE,
        path = "/frage/{id}"
	)
	public void deleteFrage(@PathVariable("id") Integer id) {
         frageRepository.deleteById(id);
	}
	



	@CrossOrigin
	@RequestMapping(
		method = RequestMethod.PUT,
		path = "/frage",
		consumes = MediaType.APPLICATION_JSON_VALUE
	)
	@Transactional
	public Integer updateFrage(@RequestBody Frage frage){

		return frageRepository.updateFrage(frage.getId(), frage.getFrage(), frage.getKategorie(), frage.getAntwortTyp(), frage.getAntwortOptionen(), frage.getHinweis());
	}
	
}





