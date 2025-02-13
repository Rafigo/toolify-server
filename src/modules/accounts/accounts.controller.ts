import {
  Controller,
  Get,
  Post,
  Param,
  ValidationPipe,
  Body,
  Headers,
  ParseIntPipe,
  Ip,
} from '@nestjs/common';
import { QueryRequired } from 'src/decorators/queryrequired';
import { CreateAccountDto } from '@/shared/dtos/create-account.dto';

/**
 * A class becomes a controller only when we associate this class to the @Controller decorator
 * A Controller = a simple class for which we associate the Controller decorator @Controller
 * In order that this Controller is linked to its module here AccountsModule, we must add it to the controllers attribute of the Module Decorator of the AccountsModule
 * To create automatically a Controller, run this command : nest generate controller accounts
 */
@Controller('accounts')
export class AccountsController {
  @Get('/:id')
  public getAccount(@Param('id', ParseIntPipe) idAccount: number) {
    return `We sent a GET request to retrieve the account of identifier ${idAccount}`;
  }

  // by supposing that an account is identified by an email
  @Get()
  public getAccountFromMail(@QueryRequired('email') email: string) {
    return `We sent a GET request to retrieve the account linked to this email ${email}`;
  }

  @Post()
  public createAccount(
    @Body(new ValidationPipe()) createAccountDto: CreateAccountDto,
  ) {
    return `We sent a POST request to create an account with this email ${createAccountDto.email}`;
  }
}
