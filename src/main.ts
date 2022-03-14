import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

require("dotenv").config();

async function start() {
  const PORT = process.env.PORT || 3800;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Share your code")
    .setDescription("Платформа для программистов")
    .setVersion("0.0.1")
    .addTag("ponchik009")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT, () => console.log(`Server starts on port ${PORT}`));
}

start();
