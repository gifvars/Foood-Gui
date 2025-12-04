
import { useEffect } from "react";
import { userManager } from "./authConfig";

export default function LoginCallback() {
    useEffect(() => {
        userManager.signinRedirectCallback().then(() => {
            window.location.href = "/"; // tillbaka till startsidan
        }).catch((err: unknown) => {

            if (err instanceof Error) {
                console.error("Callback error:", err.message);
            } else {
                console.error("Unknown error:", err);
            }

        });
    }, []);

    return <p>Loggar in Callback...</p>;
}
