import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantsModule } from './applicants/applicants.module';
import { JobsApplicationsModule } from './jobs-applicants/jobs-applications.module';

@Module({
  imports: [ApplicantsModule, JobsApplicationsModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
