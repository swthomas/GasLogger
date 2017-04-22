package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import entities.Gas;

@Transactional
@Repository
public class GasDAOImpl implements GasDAO{

	@PersistenceContext
	private EntityManager em;
	
	@Override
	public List<Gas> index() {
		String q = "SELECT g FROM Gas g";
		return em.createQuery(q, Gas.class).getResultList();
	}

	@Override
	public Gas show(Integer id) {
		return em.find(Gas.class, id);
	}

	@Override
	public Gas create(Gas g) {
		em.persist(g);
		em.flush();
		return g;
	}

	@Override
	public Gas update(Gas g, Integer id) {
		Gas gas = em.find(Gas.class, id);
		gas.setCost(g.getCost());
		gas.setGallons(g.getGallons());
		gas.setMiles(g.getMiles());
		gas.setDate(g.getDate());
		gas.setOdometer(g.getOdometer());
		return gas;
	}

	@Override
	public Boolean destroy(Integer id) {
		em.remove(em.find(Gas.class, id));
		
		if (em.find(Gas.class, id) == null) {
			return true;
		}
			return false;
	}

}
