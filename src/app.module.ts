import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { AuthService } from "./auth/auth.service";
import { AuthResolver } from "./auth/auth.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./auth/user.entity";
import { PostgresDataSource } from "./config/database_config";
import { join } from "path";
import { PurchaseModule } from './purchase/purchase.module';
import { FormalizeModule } from './formalize/formalize.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(PostgresDataSource),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: "./schema.gql",
    }),
    TypeOrmModule.forFeature([User]),
    PurchaseModule,
    FormalizeModule,
  ],
  providers: [AuthService, AuthResolver],
})
export class AppModule {}
