package com.met.PizzaForHappiness.Entities;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "sizes")
public class Sizes {

@GeneratedValue(strategy = GenerationType.IDENTITY)	
@Id	
private int sizeId;

@ManyToOne
@JoinColumn(name = "menuIdFk")
private Menu menu;

private String size;


@Temporal(TemporalType.TIMESTAMP)
@Column(insertable = false)
private Date createdTimestamp;
	
@OneToMany(mappedBy = "sizes", cascade = {CascadeType.REMOVE})
private List<Variants> variants;

public Sizes() {}

public Sizes(int sizeId, Menu menu, String size) {
	super();
	this.sizeId = sizeId;
	this.menu = menu;
	this.size = size;
}

public int getSizeId() {
	return sizeId;
}

public void setSizeId(int sizeId) {
	this.sizeId = sizeId;
}

//public Menu getMenu() {
//	return menu;
//}

public void setMenu(Menu menu) {
	this.menu = menu;
}

public String getSize() {
	return size;
}

public void setSize(String size) {
	this.size = size;
}

public List<Variants> getVariants() {
	return variants;
}

public void setVariants(List<Variants> variants) {
	this.variants = variants;
}

@Override
public String toString() {
	return "Size [sizeId=" + sizeId + ", menu=" + menu + ", size=" + size + ", createdTimestamp=" + createdTimestamp
			+ ", variants=" + variants + "]";
}









}
