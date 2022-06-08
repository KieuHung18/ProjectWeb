package com.company.security;

import java.util.Base64;

public class Encoder {

public String base64Decode(String encodedString) {
	byte[] decodedBytes = Base64.getDecoder().decode(encodedString);
	return new String(decodedBytes);
}

public String base64Encode(String input) {
    return Base64.getEncoder().encodeToString(input.getBytes());

}

}