import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountsModule } from "@/modules/accounts/accounts.module";
import { PlanningPokerModule } from "@/modules/planning-poker/planning-poker.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import {
  AuthGuard,
  KeycloakConnectModule,
  PolicyEnforcementMode,
  ResourceGuard,
  RoleGuard,
  TokenValidation,
} from "nest-keycloak-connect";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    AccountsModule,
    PlanningPokerModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: "postgres",
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
        host: "localhost",
        port: 5432,
        database: "toolify-db",
        username: "postgres",
        password: "admin",
        logging: true,
      }),
    }),
    KeycloakConnectModule.register({
      authServerUrl: "http://localhost:8080", // might be http://localhost:8080/auth for older keycloak versions
      realm: "toolify-realm",
      clientId: "toolify-client",
      secret: "BJ8da63Bd6tN5umuH95zY2uy5Pz2eeVx",
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE, // optional
      //tokenValidation: TokenValidation.ONLINE, // optional
      bearerOnly: true, // optional
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /* {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    }, */
  ],
})
export class AppModule {}
