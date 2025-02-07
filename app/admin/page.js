import AdminPanel from "./Admin";

export const metadata = {
  title: "Panel Administratora - Jatryk",
  alternates: {
    canonical: "/admin",
  },

  description: "Panel Admina strony grafika Patryka Jędrzejka - Jatryk",
};

export default function Page() {
  return <AdminPanel />;
}
