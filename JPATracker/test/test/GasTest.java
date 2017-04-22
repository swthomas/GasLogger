package test;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Gas;


public class GasTest {
	private EntityManagerFactory emf = null;
	private EntityManager em = null;

	@Before
	public void setUp() throws Exception {
		emf = Persistence.createEntityManagerFactory("tracker");
		em = emf.createEntityManager();

	}

	@After
	public void tearDown() throws Exception {
		em.close();
		emf.close();
	}
	
	// --------------------------------Test go Here--------------------------------//
	
	@Test
	public void test_gas_gallons() {
		assertEquals("10.0",em.find(Gas.class, 1).getGallons().toString());
		
	}
	
	@Test
	public void test_gas_cost() {
		assertEquals("20.23",em.find(Gas.class, 1).getCost().toString());
	}
	
	@Test
	public void test_gas_miles() {
		assertEquals("330.0",em.find(Gas.class, 1).getMiles().toString());
	}
	
	//----------------------------------------------------------------------------// 
	
	@Test
	public void test_true_is_true() {
		boolean pass = true;
		assertEquals(pass, true);
	}
}
