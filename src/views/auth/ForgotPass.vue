<template>
    <!-- samia al-->
    <div class="login-container">
        <div class="login-card">
            <div class="login-content">
                <div class="left-side">
                    <img :src="logo" alt="Logo" class="logo" />
                 
                    <p>Enter the email address associated with your account and we'll
                        send you a link to reset your password
                    </p>
                    <form @submit.prevent="handleLogin">
                        <div class="input-group">
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                v-model="email"
                            />
                        </div>
                        
                        <button type="submit" class="login-button">Continue</button>

                        <div class="login-options">
                            <p>Back to 
                            <a href="/" class="forgot-password">Login</a>
                        </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import logo from '../../assets/images/login.jpeg';
import { ref } from 'vue'; 

export default {
    setup() {
        const logoImage = logo;
        const email = ref(''); 
        const password = ref(''); 
       

        // Handle login function
        const handleLogin = () => {
          
            console.log('Email:', email.value);
            console.log('Password:', password.value);
            
           
        };

        return {
            logo: logoImage,
            email,
            password,
        
            handleLogin
        };
    },
};
</script>

<style scoped>

.login-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F5F7FF;
    padding: 20px;
    overflow-x: hidden;
}

.login-card {
    background-color: white;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin: auto;
    max-height: 100%;
    overflow: auto;
}

.login-content {
    width: 100%;
}

.left-side {
    text-align: left;
    padding: 20px;
}

.left-side h3 {
    margin-bottom: 2px;
    font-size: 18px;
    font-weight: normal;
}

.left-side p {
    margin-bottom: 20px;
    color: #666;
}

.input-group {
    margin-bottom: 20px;
}

.input-group input {
    width: 90%;
    padding: 15px;
    border: 1px solid #ddd;
    font-size: 16px;
    transition: border-color 0.3s ease;
}

.login-button {
    background-color: #38637d;
    color: white;
    border: none;
    padding: 15px;
    width: 100%;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    
}

.login-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-left: 35%;
}


.forgot-password {
    color: #6e45e2;
    text-decoration: none;
    font-size: 14px;
}

.forgot-password:hover {
    text-decoration: underline;
}

.logo {
    width: 130px;
    height: auto;
    margin-bottom: 0px;
}

@media (max-width: 768px) {
    .left-side {
        padding: 15px;
    }

    .forgot-password {
        font-size: 12px;
    }

    .login-button {
        padding: 12px;
    }
}
</style>
