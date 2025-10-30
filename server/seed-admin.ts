import { storage } from "./storage";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

async function seedAdmin() {
  try {
    const existingAdmin = await storage.getUserByUsername("admin");
    
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", SALT_ROUNDS);

    const admin = await storage.createUser({
      username: "admin",
      password: hashedPassword,
      email: "admin@interesten.be",
      role: "admin",
      isActive: true
    });

    console.log("Admin user created successfully:", admin.username);
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("\nPLEASE CHANGE THE PASSWORD AFTER FIRST LOGIN!");
    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin user:", error);
    process.exit(1);
  }
}

seedAdmin();
