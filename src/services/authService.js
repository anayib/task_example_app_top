// This is where the actual login logic resides. 
// It contains functions that handle authentication-related API calls 
// (e.g., login, logout, token storage), and may also handle token validation

async function login({ userName, password }) {
  
  try {
    const validCredentials = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(userName === 'Saul' && password === '123');
      }, 2000);
    });

    
    if (validCredentials) {
      localStorage.setItem('authToken', 'asfas58934hnsdf');
    }

    return validCredentials; // Return the validity directly
  } catch (error) {
    console.error('Error during login:', error.message); // More descriptive error message
    throw error; // Rethrow the error for further handling
  }
}


const logout = () => {
  localStorage.removeItem('authToken');
};

const isAuthenticated = () => {
  return !!localStorage.getItem('authToken')
}

export { login, logout, isAuthenticated }