package data;

import java.util.List;

import entities.Gas;

public interface GasDAO {
	public List<Gas> index();
	public Gas show(Integer id);
	public Gas create(Gas g);
	public Gas update(Gas g, Integer id);
	public Boolean destroy(Integer id);
}
