import { Button } from "@/components/ui/button";

export default function GoogleButtonAuth({
  mode,
}: {
  mode: "login" | "register";
}) {
  return (
    // to-do
    <Button variant="outline" type="button">
      {mode === "login"
        ? "Login with Google comming soon"
        : "Register with Google comming soon"}
    </Button>
  );
}
