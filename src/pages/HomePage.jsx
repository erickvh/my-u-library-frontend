import { useAuth } from "../auth";

function HomePage() {
  const auth = useAuth();
  const user = auth.user;

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export { HomePage };
