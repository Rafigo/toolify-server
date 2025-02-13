import { Module } from "@nestjs/common";
import { AccountsController } from './accounts.controller';

/**
 *  A class becomes really a NestJs module only when this class is linked with the decorator Module
 *  A Module = a simple class for which we associate the Module decorator @Module
 *  In order that this Module is taken account by our application, we must connect this module to the main app module (imports attribute array of the Module decorator of the AppModule class)
 *  To create automatically a Module, run the following command : nest generate module accounts
 */
@Module({
  controllers: [AccountsController]
})
export class AccountsModule{}