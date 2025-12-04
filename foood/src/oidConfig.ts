
import { UserManager } from "oidc-client-ts";

export const userManager = new UserManager({
    authority: "http://localhost:8080/realms/foood", // Keycloak realm
    client_id: "auth-svc", // din klient i Keycloak
    redirect_uri: "http://localhost:5173/callback", // matchar Keycloak config
    response_type: "code", // PKCE-flöde
    scope: "openid profile email", // scopes du behöver
});
