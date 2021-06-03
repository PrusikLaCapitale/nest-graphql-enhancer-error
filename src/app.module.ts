import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { HttpExceptionFilter } from './app-exception.filter';
import { ErrorInterceptor } from './error.interceptor';
import { RequestLogInterceptor } from './request-log.interceptor';
import { PostResolver } from './resolver/post.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      path: "/graphql",
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ req }),
    })
  ],
  controllers: [],
  providers: [
    PostResolver,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLogInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor
    }
  ],
})
export class AppModule {}
