package org.mifos.mmoney.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class AuthController {

    @PostMapping("/authentication")
    public ResponseEntity<String> authenticate(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String tenantIdentifier) {

        // TODO: Replace this with a real authentication check (DB or service)
        if ("mifos".equals(username) && "password".equals(password)) {
            String token = Base64.getEncoder()
                    .encodeToString((username + ":" + password).getBytes());

            String responseJson = String.format(
                    "{\"base64EncodedAuthenticationKey\":\"%s\",\"authenticated\":true,\"username\":\"%s\"}",
                    token, username
            );
            return ResponseEntity.ok(responseJson);
        } else {
            return ResponseEntity
                    .status(401)
                    .body("{\"error\":\"Invalid credentials\"}");
        }
    }
}

