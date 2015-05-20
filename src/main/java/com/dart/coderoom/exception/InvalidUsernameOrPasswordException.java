/**
 * 
 */
package com.dart.coderoom.exception;

/**
 * @author valdese
 *
 */
public class InvalidUsernameOrPasswordException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String message = "Sorry your username or password might be incorrect";
	public InvalidUsernameOrPasswordException() {
	}
	
	@Override
	public String getMessage() {
		return message;
	}
}
