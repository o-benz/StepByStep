import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PlansService } from '@app/services/document/plans.service';


@ApiTags('Plan')
@Controller('plans')
export class PlansController {
    constructor(private readonly plansService: PlansService) {}

    @Get('/')
    async allPlans(@Res() response: Response) {
        try {
            const allPlans = await this.plansService.getAllPlans();
            return response.status(HttpStatus.OK).json(allPlans);
        } catch (error) {
            return response.status(HttpStatus.NOT_FOUND).json({ message: error.message });
        }
    }

    @Get('/:id')
    async getPlan(@Param('id') id: string, @Res() response: Response) {
        try {
            const plan = await this.plansService.getPlan(id);
            return response.status(HttpStatus.OK).json(plan);
        } catch (error) {
            return response.status(HttpStatus.NOT_FOUND).json({ message: error.message });
        }
    }

    @Post('/')
    async createPlan(@Body() plan: any, @Res() response: Response) {
        try {
            const newPlan = await this.plansService.createPlan(plan);
            return response.status(HttpStatus.CREATED).json(newPlan);
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }

    @Patch('/:id')
    async updatePlan(@Param('id') id: string, @Body() plan: any, @Res() response: Response) {
        try {
            delete plan._id;
            delete plan.id;
            const updatedPlan = await this.plansService.updatePlan(id, plan);
            return response.status(HttpStatus.OK).json(updatedPlan);
        } catch (error) {
            return response.status(HttpStatus.NOT_FOUND).json({ message: error.message });
        }
    }

    @Delete('/')
    async deleteAllPlans(@Res() response: Response) {
        try {
            const deletedPlans = await this.plansService.deleteAllPlans();
            return response.status(HttpStatus.OK).json(deletedPlans);
        } catch (error) {
            return response.status(HttpStatus.NOT_FOUND).json({ message: error.message });
        }
    }

    @Delete('/:id')
    async deletePlan(@Param('id') id: string, @Res() response: Response) {
        try {
            const deletedPlan = await this.plansService.deletePlan(id);
            return response.status(HttpStatus.OK).json(deletedPlan);
        } catch (error) {
            return response.status(HttpStatus.NOT_FOUND).json({ message: error.message });
        }
    }
}
