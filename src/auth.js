export function getAuthForm() {
    return `
        <div style="color: #2196f3; display: inline;  font-weight: bold;">Email: js-app@mail.ru, password: 123456 </div>
        <form class="mui-form" id="auth-form">
            <div class="mui-textfield mui-textfield--float-label">
                <input type="email" id="email">
                <label for="email">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="password" id="password">
                <label for="password">Password</label>
            </div>
            <button type="submit" class="mui-btn mui-btn--accent">Login</button>
        </form>
    `
}

export function authWithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyCUXoYrXYmRq1tLc1Hx8LpPDcZBwYH8xnk'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'        
        }    
    })
    .then(response => response.json())
    .then(data => data.idToken)
}