import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import {
  Caregiver,
  Resident,
  User,
} from "@common/interfaces/stakeholders/users";
import { MongoClient } from "mongodb";
import { USERS } from "./users.stub";
import { UserRoles } from "@common/enums/user-roles.enum";
import { v4 as uuid } from "uuid";

@Injectable()
export class UserService implements OnModuleInit {
  private db;
  private usersCollection;
  private readonly logger: Logger = new Logger(UserService.name);

  async connectToDb(): Promise<void> {
    try {
      const client = new MongoClient(process.env.DATABASE_CONNECTION_STRING);
      await client.connect();
      this.db = client.db(process.env.DATABASE_NAME);
      this.usersCollection = this.db.collection("users");
    } catch (error) {
      this.logger.error("Failed to connect to the database", error);
    }
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.connectToDb();
      // await this.deleteAllUsers();
      const users = await this.usersCollection.find().toArray();
      if (users.length === 0) {
        await this.populateDB();
      }
    } catch (error) {
      this.logger.error("Failed to populate the database", error);
    }
  }

  async populateDB(): Promise<void> {
    await this.usersCollection.insertMany(USERS);
  }

  async getAllResidents(): Promise<Resident> {
    try {
      const residents = await this.usersCollection
        .find({ role: UserRoles.Resident })
        .toArray();
      return Promise.resolve(residents);
    } catch (error) {
      return Promise.reject(`Failed to get residents: ${error}`);
    }
  }

  async getAllCaregivers(): Promise<Caregiver> {
    try {
      const caregivers = await this.usersCollection
        .find({ role: UserRoles.Caregiver })
        .toArray();
      return Promise.resolve(caregivers);
    } catch (error) {
      return Promise.reject(`Failed to get caregivers: ${error}`);
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.usersCollection.findOne({ email });
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(`Failed to get user: ${error}`);
    }
  }

  async getAllUsers(): Promise<User> {
    try {
      const users = await this.usersCollection.find().toArray();
      return Promise.resolve(users);
    } catch (error) {
      return Promise.reject(`Failed to get users: ${error}`);
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.usersCollection.findOne({ id });
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(`Failed to get user: ${error}`);
    }
  }

  async createUser(user: User): Promise<void> {
    try {
      user.id = uuid(20);
      await this.usersCollection.insertOne(user);
    } catch (error) {
      return Promise.reject(`Failed to add user: ${error}`);
    }
  }

  async updateUser(id: string, user: User): Promise<void> {
    try {
      await this.usersCollection.updateOne({ id }, { $set: user });
    } catch (error) {
      return Promise.reject(`Failed to update user: ${error}`);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.usersCollection.deleteOne({ id });
    } catch (error) {
      return Promise.reject(`Failed to delete user: ${error}`);
    }
  }

  async deleteAllUsers(): Promise<void> {
    try {
      await this.usersCollection.deleteMany({});
    } catch (error) {
      return Promise.reject(`Failed to delete all users: ${error}`);
    }
  }
}
