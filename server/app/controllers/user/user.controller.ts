import { UserService } from "@app/services/user/user.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Response } from "express";
import { User } from "@common/interfaces/stakeholders/users";

@ApiTags("User")
@Controller("users")
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get("/")
  async allUsers(@Res() response: Response) {
    try {
      const allUsers = await this.usersService.getAllUsers();
      response.status(HttpStatus.OK).json(allUsers);
    } catch (error) {
      response.status(HttpStatus.NOT_FOUND).send(error.message);
    }
  }

  @Get("/residents")
  async allResidents(@Res() response: Response) {
    try {
      const allUsers = await this.usersService.getAllResidents();
      response.status(HttpStatus.OK).json(allUsers);
    } catch (error) {
      response.status(HttpStatus.NOT_FOUND).send(error.message);
    }
  }

  @Get("/caregivers")
  async allCaregivers(@Res() response: Response) {
    try {
      const allUsers = await this.usersService.getAllCaregivers();
      response.status(HttpStatus.OK).json(allUsers);
    } catch (error) {
      response.status(HttpStatus.NOT_FOUND).send(error.message);
    }
  }

  @Get("/:id")
  async getUser(@Param("id") id: string, @Res() response: Response) {
    try {
      const user = await this.usersService.getUserById(id);
      response.status(HttpStatus.OK).json(user);
    } catch (error) {
      response.status(HttpStatus.NOT_FOUND).send(error.message);
    }
  }

  @Get("/email/:email")
  async getUserByEmail(
    @Param("email") email: string,
    @Res() response: Response
  ) {
    try {
      const user = await this.usersService.getUserByEmail(email);
      response.status(HttpStatus.OK).json(user);
    } catch (error) {
      response.status(HttpStatus.NOT_FOUND).send(error.message);
    }
  }

  @Post("/")
  async createUser(@Body() data: any, @Res() response: Response) {
    try {
      const user = await this.usersService.createUser(data as User);
      response.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }

  @Patch("/:id")
  async updateUser(
    @Param("id") id: string,
    @Body() data: any,
    @Res() response: Response
  ) {
    try {
      delete data._id;
      delete data.id;
      const user = await this.usersService.updateUser(id, data as User);
      response.status(HttpStatus.OK).json(user);
    } catch (error) {
      response.status(HttpStatus.NOT_FOUND).send(error.message);
    }
  }

  @Delete("/")
  async deleteUser(@Res() response: Response) {
    try {
      const user = await this.usersService.deleteAllUsers();
      response.status(HttpStatus.OK).json(user);
    } catch (error) {
      response.status(HttpStatus.NOT_FOUND).send(error.message);
    }
  }

  @Delete("/:id")
  async deleteUserById(@Param("id") id: string, @Res() response: Response) {
    try {
      const user = await this.usersService.deleteUser(id);
      response.status(HttpStatus.OK).json(user);
    } catch (error) {
      response.status(HttpStatus.NOT_FOUND).send(error.message);
    }
  }
}
