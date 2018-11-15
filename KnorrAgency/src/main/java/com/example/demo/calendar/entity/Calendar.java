package com.example.demo.calendar.entity;

import java.util.ArrayList;
import java.util.List;

public class Calendar {
	
	private Long id;
	
 	private String title;
 	
    private String description;
    
    private String color;
    
    private String assignedColor;
    
    private Boolean hidden=false;
    
    private Boolean editable=true;
    
    private List<Event> eventStore = new ArrayList<Event>();

	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

	public String getColor() {
		return color;
	}

	public String getAssignedColor() {
		return assignedColor;
	}

	public Boolean getHidden() {
		return hidden;
	}

	public Boolean getEditable() {
		return editable;
	}

	public List<Event> getEventStore() {
		return eventStore;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public void setAssignedColor(String assignedColor) {
		this.assignedColor = assignedColor;
	}

	public void setHidden(Boolean hidden) {
		this.hidden = hidden;
	}

	public void setEditable(Boolean editable) {
		this.editable = editable;
	}

	public void setEventStore(List<Event> eventStore) {
		this.eventStore = eventStore;
	}
    
}
