interface UserFc {
  name?: string | null;
  email?: string | null;
}
enum UserPermission {
  REGISTER = "REGISTER",
  UNREGISTER = "UNREGISTER",
  VIEW_USERS = "VIEW_USERS",
}

class SessionUser {
  static Face = class Face implements UserFc {};
  static Permission = UserPermission;
  static permissions: UserPermission[] = [];
  name = "";
  email = "";
  image = "";
  constructor(initial?: UserFc) {
    if (initial)
      return {
        ...this,
        ...initial,
      };
  }
}

enum SessionStatus {
  LOADING = "loading",
  AUTHENTICATED = "authenticated",
  UNAUTHENTICATED = "unauthenticated",
}

interface SessionFc {
  status: string;
  data: {
    user?: UserFc;
    expires: string;
  } | null;
}
class SessionData {
  expires = "";
  user = new SessionUser();
  constructor(data?: SessionFc["data"]) {
    if (data)
      return {
        ...this,
        ...data,
        user: new SessionUser(data?.user),
      };
  }
}

export default class Session {
  static Data = SessionData;
  static User = SessionUser;
  static Status = SessionStatus;
  status = SessionStatus.UNAUTHENTICATED;
  user = new SessionUser();
  constructor(initial?: SessionFc) {
    if (initial) {
      const { status, data } = initial;
      return {
        ...this,
        status,
        ...new SessionData(data),
      };
    }
  }
}
