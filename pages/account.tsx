import AuthProps from "src/auth/api/props";
import { AccountUI } from "src/auth/ui";

export default AccountUI.Page;

export const getServerSideProps = AuthProps.session;
