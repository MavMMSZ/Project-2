import { JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/Userdata';


class AuthService {
  getProfile() {
    // return the decoded token
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    // return a value that indicates if the user is logged in
    const token = this.getToken();
    console.log("token", token);
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    // return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }

  getToken(): string {
    // return the token
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    // set the token to localStorage
    // redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // remove the token from localStorage
    // redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
  Signup(idToken: string) {
    // set the token to localStorage
    // redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }
  getUser() {
    const token = this.getToken();

    // If the token exists and is not expired
    if (token && !this.isTokenExpired(token)) {
      // Decode the token to extract user information
      const decodedToken = jwtDecode<JwtPayload & UserData>(token);

      // Assuming the username is part of the decoded token
      // If your token has a different structure, adjust accordingly
      return decodedToken.username || 'Guest'; // Return the username or a fallback value
    }
    return 'Guest'; // If there's no token, return 'Guest'
  }
}


export default new AuthService();
