import { storage } from "./storage";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

async function seedAdmin() {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error("ADMIN_PASSWORD environment variable is required.");
    console.error("Usage: ADMIN_PASSWORD=your_secure_password npx tsx server/seed-admin.ts");
    process.exit(1);
  }

  try {
    const existingAdmin = await storage.getUserByUsername("admin");

    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(adminPassword, SALT_ROUNDS);

    const admin = await storage.createUser({
      username: "admin",
      password: hashedPassword,
      email: "admin@interesten.be",
      role: "admin",
      isActive: true
    });

    console.log("Admin user created successfully:", admin.username);
    console.log("\nPLEASE CHANGE THE PASSWORD AFTER FIRST LOGIN!");
    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin user:", error);
    process.exit(1);
  }
}

seedAdmin();
