import ProtectedPage from "src/utils/protectedPage";

export default function Page() {
  return (
    <ProtectedPage>
      <h1>This is a protected page</h1>
    </ProtectedPage>
  );
}
