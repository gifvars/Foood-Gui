import React, { useState } from 'react';
import {userManager} from "./oidConfig.ts";

const RegisterUser: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userType, setUserType] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [serverMessage, setServerMessage] = useState<string>("");

    const registerUser = async () => {
        try {

            const userData = {
                "firstName": firstName,
                "lastName": lastName,
                "userType": userType,
                "email": email,
                "password": password
            };

            console.log(JSON.stringify(userData) );

            //console.log('userManager.signinRedirectCallback(): ');
            //await userManager.signinRedirectCallback(); // sparar tokens i storage

            // console.log('userManager.getUser(): ');
            // 1. Hämta inloggad användare och token via PKCE-flödet
            //const user = await userManager.getUser();

            // if (!user || !user.access_token) {
            //     console.log('Error userManager.getUser(): ' + user);
            //     throw new Error("User not authenticated ");
            // }

            console.log('Before  api/v1/auth/register ');
            const response = await fetch('http://localhost:9090/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                   // "Authorization": `Bearer ${user.access_token}`, // PKCE-token från IdP
                },
                body: JSON.stringify( userData ),
            });

            if (!response.ok) {
                throw new Error('Något gick fel vid skickandet av meddelandet');
            }

            const result = await response.json();
            console.log('Svar från mikrotjänst: ', result);
            setServerMessage(result.respons);

            alert('Användare reistrerad skickat! ' + result);
        } catch (error) {
            console.error(error);
            alert(`Ett fel inträffade: ${(error as Error).message}`);
        }
    };


    const signIn = async () => {
        try {

            const userData = {
                "email": email,
                "password": password
            };

            console.log(JSON.stringify(userData ) );

            const response = await fetch('http://localhost:9090/api/v1/auth/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Något gick fel vid skickandet av meddelandet');
            }

            const result1 = await response.json();
            console.log("Result1 " +  result1);
            const accessToken = result1.data.access_token;
            console.log("AccessToken " +  accessToken);
            localStorage.setItem("accessToken", accessToken);

            console.log('Svar från mikrotjänst: ', accessToken);
            setServerMessage(accessToken);

            alert('Användare inloggad! ' + accessToken);

        } catch (error) {
            console.error(error);
            alert(`Ett fel inträffade: ${(error as Error).message}`);
        }
    };

    const registerOrder = async () => {
        try {

            const userData =
            {
                "userId": 333,
                "orderItems": [
                {
                    "productId": 222,
                    "quantity": 1,
                    "totalPrice": 1
                }
            ],
                "orderPrice": 1,
                "tax": 1,
                "discountAmount": 1,
                "orderStatus": "PENDING",
                "restaurantId": 1,
                "driverId": 1,
                "createdAt": "2025-11-19T09:28:05.375Z",
                "updatedAt": "2025-11-19T09:28:05.375Z"
            };

            console.log(JSON.stringify(userData ) );
            const accessToken = localStorage.getItem("accessToken");
            console.log("AccessToken " + accessToken);
            const response = await fetch('http://localhost:4000/foood/register/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify( userData ),
            });

            if (!response.ok) {
                throw new Error('Något gick fel vid skickandet av meddelandet');
            }

            const result = await response.json();
            console.log('Svar från mikrotjänst:', result);
            setServerMessage(result.respons);

            alert('Order registrerad! ' + accessToken);

        } catch (error) {
            console.error(error);
            alert(`Ett fel inträffade: ${(error as Error).message}`);
        }
    };

    const loginPKCE = async () => {
        console.log('UserManager.signinRedirect(): called... ');
        await userManager.signinRedirect(); // skickar användaren till Keycloak
    }

    return (
        <>
            <div>
                <h2>Registrera en användare</h2>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                       placeholder="First name"/>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                       placeholder="Last name"/>
                <input type="text" value={userType} onChange={(e) => setUserType(e.target.value)}
                       placeholder="User type"/>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                       placeholder="Email address"/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                       placeholder="Password"/>
            </div>
            <div>
                <button onClick={registerUser}>Skapa User</button>
                <div>Responsmeddelandet</div>
                <p>{serverMessage}</p>
            </div>
            <div>
                <button onClick={signIn}>Logga in</button>
                <div>Auth token</div>
                <p>{serverMessage}</p>
            </div>
            <div>
                <button onClick={registerOrder}>Regga en order</button>
            </div>
            <div>
                <button onClick={loginPKCE}>Login PKCE</button>
            </div>
        </>
    );
};

export default RegisterUser;
