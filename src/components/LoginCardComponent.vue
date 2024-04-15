<template>
    <body>
        <div class="login-container">
      <div class="login-box">
        <h2>Login</h2>
        <form @submit.prevent="submitForm">
          <div class="input-group">
            <input type="email" placeholder="Correo" required>
          </div>
          <div class="input-group">
            <input type="password" placeholder="Contraseña" required>
          </div>
          <div class="login-options">
            <a href="#">¿Eres policía?</a>
            <a href="#">¿No tienes cuenta? Regístrate</a>
          </div>
          <button type="submit" class="login-btn">Iniciar sesión</button>
        </form>
      </div>
    </div>
         
    </body>
</template>
  
  <script>
  export default {
    methods: {
      submitForm() {

      }
    }
  }
  </script>
  
  <style scoped>
body

  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #263D59; 
  }
  
  .login-box {
    background-color: #2c2c2c; 
    padding: 2rem;
    border-radius: 10px;
    width: 639px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
  
  h2 {
    color: #fff;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .input-group {
    margin-bottom: 1rem;
  }
  
  .input-group input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 5px;
    border: none;
    margin-top: 0.5rem;
  }
  
  .login-options {
    color: #729fbf;
    margin-bottom: 2rem;
  }
  
  .login-options a {
    text-decoration: none;
    color: #729fbf; 
    display: block; 
    margin: 0.5rem 0;
  }
  
  .login-btn {
    background-color: #4a76a8; 
    color: white;
    border: none;
    padding: 0.7rem 1.5rem;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .login-btn:hover {
    background-color: #3a5a78; 
  }
  </style>
  