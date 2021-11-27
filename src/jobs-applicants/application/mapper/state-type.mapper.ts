import { StateType } from "../../domain/enums/state-type.enum";

export class StateTypeMapper {
  public static toTypeString(state: StateType): string {
    switch (state) {
      case StateType.Pending:
        return 'pending';
      case StateType.Denied:
        return 'denied';
      case StateType.Accepted:
        return 'accepted';
      default:
        return 'not-found';
    }
  }
  public static toTypeState(state: string): StateType {
    switch (state) {
      case "pending":
        return StateType.Pending;
      case "denied":
        return StateType.Denied;
      case "accepted":
        return StateType.Accepted;
      default:
        return StateType.NotFound;
    }
  }
}
