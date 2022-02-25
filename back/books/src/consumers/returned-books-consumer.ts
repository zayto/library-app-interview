import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('returnedBooks')
export class ReturnedBooksConsumer {
  @OnQueueActive()
  onActive(job: Job): void {
    let jobData: any;
    try {
      jobData = JSON.stringify(job.data);
    } catch (error) {
      Logger.error(
        `Error while stringifying job data: ${error || error?.message}`,
      );
      return;
    }
    Logger.log(
      `Processing job ${job.id} of type ${job.name} with data ${jobData}...`,
    );
  }

  @Process('return')
  async return(job: Job<unknown>): Promise<{ done: boolean }> {
    Logger.log(`Handling book ${JSON.stringify(job.data)} inside queue`);
    // TODO: Call bookRefService and bookService using Redis events to remove the owner of the book
    // and update the quantities and statuses accordingly in the database and make the book
    // available once again

    await new Promise((res) => setTimeout(() => res(true), 3000));
    // TODO Not sure if we need to emit an event for the gateway to pickup and answer the client
    // I think we already answered the client with a "OK We'll handle your book" when we received
    // the request and added it to the queue
    Logger.log(
      `Done returning book with id=${(job.data as any)?.bookId} inside queue`,
    );
    return { done: true };
  }
}
