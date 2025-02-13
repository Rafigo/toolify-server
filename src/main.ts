import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: ["http://localhost:3000"],
  };

  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle("Toolify")
    .setDescription("Toolify API")
    .setVersion("1.0")
    .addTag("cv")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
