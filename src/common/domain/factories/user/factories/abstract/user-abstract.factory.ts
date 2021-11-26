import { CreateFromParams } from '../params/create-from.params';
import { WithIdParams } from '../params/with-id.params';

export abstract class UserAbstractFactory {
  public abstract createFrom(params: CreateFromParams): any;
  public abstract withId(params: WithIdParams): any;
}
