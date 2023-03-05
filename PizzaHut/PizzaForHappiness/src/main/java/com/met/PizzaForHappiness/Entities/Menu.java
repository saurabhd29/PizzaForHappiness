package com.met.PizzaForHappiness.Entities;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "menu") 
public class Menu {
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int menuId;
	private String name;
	private String description;
	private String imageAddress;
	private String type;
	private String category;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(insertable = false)
	private Date createdTimestamp;
	
	
	@OneToMany(cascade= {CascadeType.REMOVE}, mappedBy = "menu")
	private List<Sizes> sizes;
	
	public Menu() {}

	
	
	public Menu(int menuId, String name, String description, String imageAddress, String type, String category) {
		super();
		this.menuId = menuId;
		this.name = name;
		this.description = description;
		this.imageAddress = imageAddress;
		this.type = type;
		this.category = category;
	}






	public int getMenuId() {
		return menuId;
	}

	public void setMenuId(int menuId) {
		this.menuId = menuId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImageAddress() {
		return imageAddress;
	}

	public void setImageAddress(String imageAddress) {
		this.imageAddress = imageAddress;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Date getCreatedTimestamp() {
		return createdTimestamp;
	}

	public void setCreatedTimestamp(Date createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}

	public List<Sizes> getSize() {
		return sizes;
	}

	public void setSize(List<Sizes> sizes) {
		this.sizes = sizes;
	}



	@Override
	public String toString() {
		return "Menu [menuId=" + menuId + ", name=" + name + ", description=" + description + ", imageAddress="
				+ imageAddress + ", type=" + type + ", category=" + category + "]";
	}
	
	
	
	
	
	
	
	

}
