package entities;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Gas {
	
	// fields
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private Double gallons;
	
	private Double odometer;
	
	private Double miles;
	
	private Double cost;
	
	private Date date;

	// gets and sets
	
	public Double getGallons() {
		return gallons;
	}

	public void setGallons(Double gallons) {
		this.gallons = gallons;
	}

	public Double getOdometer() {
		return odometer;
	}

	public void setOdometer(Double odometer) {
		this.odometer = odometer;
	}

	public Double getMiles() {
		return miles;
	}

	public void setMiles(Double miles) {
		this.miles = miles;
	}

	public Double getCost() {
		return cost;
	}

	public void setCost(Double cost) {
		this.cost = cost;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Integer getId() {
		return id;
	}

	// toString
	
	@Override
	public String toString() {
		return "Gas [id=" + id + ", gallons=" + gallons + ", odometer=" + odometer + ", miles=" + miles + ", cost="
				+ cost + ", date=" + date + "]";
	}	
	
}
