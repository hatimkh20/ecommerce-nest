// import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';

// import { UserService } from '../service/user.service';
// import { UserDTO } from '../dto/user.dto';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @Controller('user')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @Post('register')
//   async register(@Body() user: UserDTO): Promise<any> {
//     return this.userService.register(user);
//   }

//   @Post('login')
//   async login(@Body() userDTO: UserDTO) {
//     return this.userService.login(userDTO);
//   }

// }
