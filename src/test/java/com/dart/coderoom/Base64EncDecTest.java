package com.dart.coderoom;

import java.util.StringTokenizer;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.StringUtils;
import org.junit.Assert;
import org.junit.Test;

public class Base64EncDecTest {
	
	@Test
	public void testEncDec(){
		//declare userName/password
		String userName = "toto";
		String password= "umschlag";
		//join the userName and password
		String join = userName+":"+password;
		//encode to a base64
		String encodeBase64String = Base64.encodeBase64String(join.getBytes());
		//Decode to a byte array
		byte[] decodeBase64 = Base64.decodeBase64(encodeBase64String);
		//Get the decoded string
		String decoded = new String(decodeBase64);
		//Assert decoded equal to the join
		Assert.assertTrue(join.equals(decoded));
		//split the decoded string
		String[] credentials = decoded.split(":");
		String uname = credentials[0];
		String pword = credentials[1];
		//assert credentials equals
		Assert.assertTrue(userName.equals(uname));
		Assert.assertTrue(password.equals(pword));
	}
}
