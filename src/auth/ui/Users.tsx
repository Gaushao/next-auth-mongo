import { CSSProperties } from "react";
import Session from "../class/session";

const overflow: CSSProperties = {
  overflow: "auto",
};

const border: CSSProperties = {
  border: "1px solid lightgray",
};

const row: CSSProperties = {
  backgroundColor: "lightgray",
};

const col: CSSProperties = {
  padding: "4px 8px",
  whiteSpace: "nowrap",
};

function isUrl(s: string) {
  let url;
  try {
    url = new URL(s);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

export default {
  Table({ users = [] }: { users: Session["user"][] }) {
    if (users.length === 0) return null;
    const keys = Object.keys(users[0]) as (keyof Session["user"])[];
    return (
      <div style={overflow}>
        <h3>/users</h3>
        <table style={border}>
          <thead>
            <tr>
              {keys.map((k) => (
                <th key={k} style={border}>
                  {k}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email} style={row}>
                {keys.map((p) => (
                  <td key={p} style={col}>
                    {isUrl(user[p]) ? (
                      <a href={user[p]} target="_blank">
                        {user[p]}
                      </a>
                    ) : (
                      user[p]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
