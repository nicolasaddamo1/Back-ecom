import { Role } from "src/roles.enum";
import { Roles } from "src/decorators/roles.decorator";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./users.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Body, Controller,Delete,Get, Param, ParseIntPipe, ParseUUIDPipe, Put, Query, UseGuards} from "@nestjs/common";

@ApiTags("Users: ")
@Controller("users")

export class UsersController {
    constructor(private readonly usersService: UsersService) {}
        @ApiBearerAuth()
        @Get()
        @Roles(Role.Admin)
        @UseGuards(AuthGuard,RolesGuard)
        getUsers(@Query("page",ParseIntPipe) page: number, @Query("limit", ParseIntPipe) limit: number) {

            return this.usersService.getUsers(page, limit);
            
        }
        @ApiBearerAuth()
        @Get(":id")
        @UseGuards(AuthGuard)
        getUsersById( @Param("id", ParseUUIDPipe) id: string) {
            return this.usersService.getUserById(id);
        }

        @ApiBearerAuth()
        @Put(":id")
        @UseGuards(AuthGuard)
        updateUser(@Param("id", ParseUUIDPipe) id: string, @Body() user: CreateUserDto) {
            const {confirmPassword, ...userWithoutPass} = user
            return this.usersService.updateUser(id, userWithoutPass);
        }
        @ApiBearerAuth()
        @Delete(":id")
        @UseGuards(AuthGuard)
        deleteUser(@Param("id", ParseUUIDPipe) id: string) {
            return this.usersService.deleteUser(id);
        }
    }