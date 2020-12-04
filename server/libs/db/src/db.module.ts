import { Global, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { DbService } from './db.service';
import { User } from './models/user.model';
import { Course } from './models/course.model';
import { Episode } from './models/episode.model';

const models = TypegooseModule.forFeature([
  User,
  Course,
  Episode
])

// 定义全局模型
@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/node-vue', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }), models
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule { }
