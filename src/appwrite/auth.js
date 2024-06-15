/* THIS CODE CAN BE REUSED IN FUTURE FOR ANY OTHER BaaS Service */
/* Preventing vender lock-in */
/* while switching to another service just 
- update the constructor
- update the try-catch block according to given documentation 
- no need to change the function like createAccount or its params
*/
// ==================================================================================================================================================================================

// Import necessary configurations and Appwrite SDK modules
import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

// Define AuthService class to handle authentication
export class AuthService {
  // Initialize Appwrite Client and Account objects
  client = new Client();
  account;

  // Constructor to set Appwrite endpoint and project ID
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Set API endpoint
      .setProject(conf.appwriteProjectId); // Set project ID
    this.account = new Account(this.client); // Initialize Account service
  }

  async createAccount({ email, password, name }) {
    try {
      // Generate a unique ID and create account with Appwrite
      const userAccount = await this.account.create(
        ID.unique(), // Generate unique ID
        email,
        password,
        name
      );
      if (userAccount) {
        // If account creation succeeds, login the user
        return this.login({ email, password });
      } else {
        console.error("ACCOUNT CREATION FAILED :: createAccount()");
        return null;
      }
    } catch (err) {
      // Log and throw any errors that occur during account creation
      console.error("ACCOUNT CREATION ERROR :: createAccount()", err);
      throw err;
    }
  }

  async login({ email, password }) {
    try {
      // Use Appwrite to create a session with provided email and password
      return await this.account.createEmailPasswordSession(email, password);
    } catch (err) {
      // Log and throw any errors that occur during login
      console.error("ACCOUNT LOGIN ERROR :: login()", err);
      throw err;
    }
  }

  async getCurrentUser() {
    try {
      // Retrieve current user's account details from Appwrite
      return await this.account.get();
    } catch (err) {
      // Log and throw any errors that occur while fetching user details
      console.error("ACCOUNT GET ERROR :: getCurrentUser()", err);
      throw err;
    }
  }

  async logout() {
    try {
      // Delete all active sessions for the current user from Appwrite
      const info = await this.account.deleteSessions();
      console.log("USER LOGGED OUT");
      return info; // Return information about deleted sessions
    } catch (err) {
      // Log and throw any errors that occur during logout
      console.error("USER LOGOUT ERROR :: logout()", err);
      throw err;
    }
  }
}

// Create an instance of the AuthService class
const authService = new AuthService();
export default authService; // Export the authService instance

// ==================================================================================================================================================================================
/*  THIS CAN BE USED FOR A MINOR PROJECT
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("<PROJECT_ID>"); // Your project ID

const account = new Account(client);

const user = await account.create(
  "ID.unique()",
  "email@example.com",
  "password"
); 
*/
