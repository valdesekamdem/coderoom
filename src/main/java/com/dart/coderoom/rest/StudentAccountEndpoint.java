package com.dart.coderoom.rest;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import com.dart.coderoom.model.StudentAccount;
import com.dart.coderoom.model.Student;
import com.dart.coderoom.model.User;
import com.dart.coderoom.model.UserType;

@Stateless
@Path("/studentAccounts")
public class StudentAccountEndpoint {
	
	@Inject
	private StudentEndpoint studentEndpoint;
	@Inject
	private UserEndpoint userEndpoint;
	
	private UserType userType;
	
	@POST
	@Consumes("application/json")
	public void create(StudentAccount entity)
	{
		Student student = new Student();
		User user = new User();
		
		String name = entity.getName();
		String nickname = entity.getNickname();
		String email = entity.getEmail();
		String password = entity.getPassword();
		
		student.setName(name);
		student.setEmail(email);
		
		studentEndpoint.create(student);

		String userid = String.valueOf(student.getId());
		user.setUserid(userid);
		user.setNickname(nickname);
		user.setPassword(password);
		user.setUserType(userType.STUDENT);
		
		userEndpoint.create(user);
		//return Response.created(UriBuilder.fromResource(StudentEndpoint.class).path(String.valueOf(user.getId())).build()).build();
	
	}
}
