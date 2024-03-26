import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { MongoClient } from "mongodb";
import { InterventionPlan } from "@common/interfaces/documents/intervention-plan.interface";
import { PLANS } from "./plans.stubs"
import { Objective } from "@common/interfaces/documents/objective.interface";
import { TypeValidator } from "../validator.service";
import { vs as uuid} from 'uuid';

@Injectable()
export class PlansService implements OnModuleInit {
    private db;
    private plansCollection;
    private readonly logger: Logger = new Logger(PlansService.name);

    async connectToDb(): Promise<void> {
        try {
            const client = new MongoClient(process.env.DATABASE_CONNECTION_STRING);
            await client.connect();
            this.db = client.db(process.env.DATABASE_NAME);
            this.plansCollection = this.db.collection('plans');
        } catch (error) {
            this.logger.error('Failed to connect to the database', error);
        }
    }

    async onModuleInit(): Promise<void> {
        try {
            await this.connectToDb();
            // await this.deleteAllPlans();
            const plans = await this.plansCollection.find().toArray();
            if (plans.length === 0) {
                await this.populateDB();
            }
        } catch (error) {
            this.logger.error('Failed to populate the database', error);
        }
    }

    async populateDB(): Promise<void> {

        await this.plansCollection.insertMany(PLANS);
    }

    async getAllPlans(): Promise<InterventionPlan> {
        try {
            const plans = await this.plansCollection.find().toArray();
            return Promise.resolve(plans);
        } catch (error) {
            return Promise.reject(`Failed to get users: ${error}`);
        }
    }

    async deleteAllPlans(): Promise<void> {
        try {
            await this.plansCollection.deleteMany({});
        } catch (error) {
            return Promise.reject(`Failed to delete all users: ${error}`);
        }
    }

    async getPlan(id: string): Promise<InterventionPlan> {
        try {
            const plan = await this.plansCollection.findOne({ id });
            return Promise.resolve(plan);
        } catch (error) {
            return Promise.reject(`Failed to get user: ${error}`);
        }
    }

    async createPlan(plan: InterventionPlan): Promise<InterventionPlan> {
        try {
            plan.id = uuid(20);
            if (!TypeValidator.isValidInterventionPlan(plan)) {
                this.logger.error('Invalid plan');
                return Promise.reject('Invalid plan');
            }
            const newPlan = await this.plansCollection.insertOne(plan);
            return Promise.resolve(newPlan);
        } catch (error) {
            return Promise.reject(`Failed to create user: ${error}`);
        }
    }

    async updatePlan(id: string, plan: InterventionPlan): Promise<void> {
        try {
            await this.plansCollection.updateOne({ id }, { $set: plan });

        } catch (error) {
            return Promise.reject(`Failed to update user: ${error}`);
        }
    }

    async deletePlan(id: string): Promise<void> {
        try {
            await this.plansCollection.deleteOne({ id });
        } catch (error) {
            return Promise.reject(`Failed to delete user: ${error}`);
        }
    }
}

