import { Module } from "@nestjs/common";
import { BlogController } from "./blog.controller";
import { BlogService } from "./blog.service";
import { BlogFileRepository, BlogMongoRepository } from "./blog.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Blog, BlogSchema } from "./blog.schema";



@Module({
  imports: [
    // 몽고디비 연결 설정
    MongooseModule.forRoot(
      'mongodb+srv://junhuilim:213132123@dsaf/blog',
    ),
    MongooseModule.forFeature([{name: Blog.name, schema: BlogSchema}]),
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogFileRepository, BlogMongoRepository],
})
export class AppModule {}