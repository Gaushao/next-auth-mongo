import { UsersUI } from "src/auth/ui";
import AuthProps from "src/auth/api/props";

export default function UsersPage({ users }: { users: any }) {
  return <UsersUI.Table users={users} />;
}

export const getServerSideProps = AuthProps.getUsers;
