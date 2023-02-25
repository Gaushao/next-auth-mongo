import { UsersUI } from "src/auth/ui";
import AuthProps from "src/auth/api/props";

export default UsersUI.Page;

export const getServerSideProps = AuthProps.users;
