import { Controller, Post, Body } from '@nestjs/common';
import { UserDTO } from 'src/user/dto/user.dto';
import { AuthService } from '../service/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() user: UserDTO): Promise<any> {
    return this.authService.register(user);
  }

  @Post('/login')
  async login(@Body() userDTO: UserDTO) {
    return this.authService.login(userDTO);
  }
}
