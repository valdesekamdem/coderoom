package com.dart.coderoom.rest;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import com.dart.coderoom.model.Compte;
import com.dart.coderoom.model.Student;
import com.dart.coderoom.model.User;
import com.dart.coderoom.model.UserType;

@Stateless
@Path("/comptes")
public class CompteEndpoint {
	
	@Inject
	private StudentEndpoint studentEndpoint;
	@Inject
	private UserEndpoint userEndpoint;
	
	private UserType userType;
	
	@POST
	@Consumes("application/json")
	public void create(Compte entity)
	{
		Student student = new Student();
		User user = new User();
		
		String name = entity.getName();
		String nickname = entity.getNickname();
		String email = entity.getEmail();
		String password = entity.getPassword();
		String userid = String.valueOf(student.getId());
		
		student.setName(name);
		student.setEmail(email);
		
		studentEndpoint.create(student);
	
		user.setUserid(userid);
		user.setNickname(nickname);
		user.setPassword(password);
		user.setUserType(userType.STUDENT);
		
		userEndpoint.create(user);
		
		//return Response.created(UriBuilder.fromResource(StudentEndpoint.class).path(String.valueOf(user.getId())).build()).build();
	
	}
}
