import ProtectedPage from "src/components/protectedPage";

export default function Page() {
  return (
    <ProtectedPage>
      <h1 className="text-5xl p-4 text-center bg-primary">
        This is a protected page
      </h1>
    </ProtectedPage>
  );
}
