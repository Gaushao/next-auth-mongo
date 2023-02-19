interface UserFc {
  name?: string | null;
  email?: string | null;
}
enum SessionUserUserRole {
  NONE = "NONE",
  GUEST = "GUEST",
  REGISTERED = "REGISTERED",
}
class SessionUser {
  static Role = SessionUserUserRole;
  static Face = class Face implements UserFc {};
  name = "";
  email = "";
  get role() {
    switch (true) {
      case this.email === "":
        return SessionUser.Role.NONE;
      case this.name === "":
        return SessionUser.Role.GUEST;
    }
    return SessionUser.Role.REGISTERED;
  }
  constructor(initial?: UserFc) {
    if (initial)
      return {
        ...this,
        ...initial,
      };
  }
}

enum SessionStatus {
  loading = "loading",
  authenticated = "authenticated",
  unauthenticated = "unauthenticated",
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
  static USER = new SessionUser();
  static Status = SessionStatus;
  status = SessionStatus.unauthenticated;
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
