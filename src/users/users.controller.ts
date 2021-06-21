import { User } from './users.model';
import { UserService } from './users.service';
import { Controller, Post, Body, Get, Param, Inject } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  addUser(@Body('name') name: string, @Body('email') email: string): any {
    this.print('Add User API Called');
    const user: User = new User(null, name, email);
    return this.userService.insert(user);
  }

  @Get('/:id')
  getUser(@Param('id') id): any {
    this.print('Get User API Called');
    return this.userService.fetch(id);
  }

  @Get()
  getAllUser(): any {
    this.print('Get All User API Called');
    return this.userService.fetchAll();
  }

  print(message: string) {
    console.log(new Date(), `: ${message}`);
  }
}
