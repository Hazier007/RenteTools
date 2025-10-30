import { storage } from "./storage";

async function seedAdmin() {
  try {
    const existingAdmin = await storage.getUserByUsername("admin");
    
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    const admin = await storage.createUser({
      username: "admin",
      password: "admin123",
      email: "admin@interesten.be",
      role: "admin",
      isActive: true
    });

    console.log("Admin user created successfully:", admin.username);
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("\nPLEASE CHANGE THE PASSWORD AFTER FIRST LOGIN!");
  } catch (error) {
    console.error("Failed to create admin user:", error);
  }
}

seedAdmin();
