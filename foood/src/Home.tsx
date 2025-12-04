
import {userManager} from "./oidConfig.ts";

export default function Home() {
    const handleLogin = () => {
        userManager.signinRedirect();
    };

    const handleLogout = () => {
        userManager.signoutRedirect();
    };

    return (
        <div>
            <h1>Välkommen</h1>
        <button onClick={handleLogin}>Logga in</button>
        <button onClick={handleLogout}>Logga ut</button>
    </div>
);
}
