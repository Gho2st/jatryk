import AdminPanel from "./Admin";

export const metadata = {
  title: "Panel Administratora - Jatryk",
  robots: "noindex, nofollow", // Zapobiega indeksowaniu przez Google
  alternates: {
    canonical: "/admin",
  },
};

export default function Page() {
  return (
    <>
      <AdminPanel />
    </>
  );
}
