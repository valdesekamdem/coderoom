package com.dart.coderoom.ejb;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.apache.commons.codec.binary.Base64;

import com.dart.coderoom.exception.InvalidUsernameOrPasswordException;
import com.dart.coderoom.model.User;
import com.dart.coderoom.model.UserAuth;
import com.dart.coderoom.model.UserType;

public class UserEjb {
	
	@PersistenceContext(unitName = "coderoom-persistence-unit")
	private EntityManager em;
	
	private User getUser(User user) throws InvalidUsernameOrPasswordException {
		String nickname = user.getNickname();
		String password = user.getPassword();
		return getUser(nickname, password);
	}

	private User getUser(String nickname, String password)  throws InvalidUsernameOrPasswordException  {
		String query = "SELECT u FROM User u WHERE u.nickname = :nickname AND u.password = :password";
		TypedQuery<User> typeQuery = em.createQuery(query, User.class);
		typeQuery.setParameter("nickname", nickname);
		typeQuery.setParameter("password", password);
		List<User> users = typeQuery.getResultList();
		if(users.isEmpty()) throw new InvalidUsernameOrPasswordException();;
		return users.iterator().next();
	}
	
	private UserAuth encodedUser(User user){
		UserAuth userAuth = new UserAuth();
		String nickname = user.getNickname();
		String password = user.getPassword();
		String userid = user.getUserid();
		UserType userType = user.getUserType();
		String authStr = nickname + ":" + password;
		String authEncoded = Base64.encodeBase64String(authStr.getBytes());
		
		userAuth.setNickname(nickname);
		userAuth.setUserid(userid);
		userAuth.setToken(authEncoded);
		userAuth.setUserType(userType);
		return userAuth;
	}
	
	public UserAuth autheticateUser(String userName, String password) throws InvalidUsernameOrPasswordException {
		User user = getUser(userName, password);
		UserAuth encodedUser = encodedUser(user);
		return encodedUser;
	}
	
	public User decodedUser(String authEncoded) throws InvalidUsernameOrPasswordException {
		byte[] decodeBase64 = Base64.decodeBase64(authEncoded);
		String decoded = new String(decodeBase64);
		String[] credentials = decoded.split(":");
		User user = new User();
		user.setNickname(credentials[0]);
		user.setPassword(credentials[1]);
		return getUser(user);
	}
}
