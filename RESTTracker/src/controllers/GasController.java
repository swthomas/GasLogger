package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.GasDAO;
import entities.Gas;

@RestController
public class GasController {

	@Autowired
	private GasDAO gasDAO;
	
	//test ping
	
	@RequestMapping(path = "ping", method = RequestMethod.GET)
	public String ping() {
		System.out.println("Inside TestController - ping");
	  return "pong";
	}	

	// methods for Quiz
	
	@RequestMapping(value="gas", method= RequestMethod.GET)
	public List<Gas> index() {
		return gasDAO.index();
	}
	
	@RequestMapping(value="gas/{id}", method= RequestMethod.GET)
	public Gas index(@PathVariable Integer id) {
		return gasDAO.show(id);
	}
	
	@RequestMapping(value="gas", method=RequestMethod.POST)
	public Gas create(@RequestBody String jsonGas) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			Gas mGas = mapper.readValue(jsonGas, Gas.class);
			return gasDAO.create(mGas);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@RequestMapping(value="gas/{id}", method=RequestMethod.PUT)
	public Gas update(@RequestBody String jsonGas, @PathVariable Integer id) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			Gas mGas = mapper.readValue(jsonGas, Gas.class);
			return gasDAO.update(mGas, id);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@RequestMapping(value="gas/{id}", method=RequestMethod.DELETE)
	public Boolean destroy(@PathVariable Integer id) {
		return gasDAO.destroy(id);
	}

}