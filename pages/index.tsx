import hooks from "src/auth/ui/hooks";

const MARGIN = { marginTop: 64 };

export default function Home() {
  const { name, email } = hooks.useSessionUser();
  const status = hooks.useSessionStatus();
  const user = name === "" ? email : name;
  return (
    <div style={MARGIN}>
      <div>
        Hello <strong>{user === "" ? "Guest" : user}</strong>,
      </div>
      <div>
        your session status is <strong>{status}</strong>.
      </div>
    </div>
  );
}
