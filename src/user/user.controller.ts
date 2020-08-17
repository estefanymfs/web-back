import { Controller, Post, Get, Put, Delete, Res, HttpStatus ,Body, Param, NotFoundException, Query} from '@nestjs/common';
import { CreateUserDTO } from '../dto/user.dto';
import { UserService } from './user.service';
import { create } from 'domain';


@Controller('user')
export class UserController {
    constructor(private userService : UserService){
    }
//crear usuario
    @Post('/create')
    async createPost(@Res()res, @Body() createUserDTO: CreateUserDTO){
      const user = await this.userService.createUser(createUserDTO);
      return res.status(HttpStatus.OK).json({
            message: 'user created',
             user
        });
    }
    //listar usuario
    @Get('/')
    async getUsers(@Res() res){
        const users = await this.userService.getUsers();
        res.status(HttpStatus.OK).json({
            users
        });
    }
   
    @Get('/:userID')
    async getUser(@Res() res, @Param('userID') userID){
       const user = await this.userService.getUser(userID);
       if (!user)  throw new NotFoundException('User Does not exists');
       return res.status(HttpStatus.OK).json(user);
    }
    //borrar usuario
    @Delete('/delete')
    async deleteUser(@Res() res, @Query('userID') userID){
        const userDeleted = await this.userService.deleteUser(userID);
        if(!userDeleted) throw new NotFoundException('User Does not exits');
        return res.status(HttpStatus.OK).json({
            message: 'User Deleted Succesfully',
            userDeleted
        });
    }

     @Put('/update')
     async updateUser(@Res() res, @Body()createUserDTO: CreateUserDTO, @Query('userID') userID)
     {
       const updateUser = await this.userService.updateUser(userID, createUserDTO);
       if(!updateUser) throw new NotFoundException('User Does not exists');
       return res.status(HttpStatus.OK).json({
           message: 'User Updated Succesfully',
           updateUser
       });
     }
        
}
