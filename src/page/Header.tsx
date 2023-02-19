import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PublicIcon from "@mui/icons-material/Public";

import Hooks from "src/auth/ui/hooks";

const { useSessionUser, useIsSessionStatus, useSignIn, useSignOut } = Hooks;

function Login() {
  const signIn = useSignIn();
  return (
    <Button color="inherit" onClick={() => signIn()}>
      login
    </Button>
  );
}

function Logout() {
  const { name } = useSessionUser();
  const signOut = useSignOut();
  return (
    <>
      <Link href={`/account`}>
        <Button
          sx={{
            color: "black",
            bgcolor: "white",
          }}
        >
          {name || "Register"}
        </Button>
      </Link>
      <Button color="inherit" onClick={() => signOut()}>
        logout
      </Button>
    </>
  );
}

function Auth() {
  const { authenticated } = useIsSessionStatus();
  if (authenticated) return <Logout />;
  return <Login />;
}

export default function PageHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <IconButton size="medium" edge="start" color="inherit">
              <PublicIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            next-auth-mongo
          </Typography>
          <Auth />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
