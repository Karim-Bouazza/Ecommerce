"use client";

import { Button } from "@/components/ui/button";
import useUsers from "./hooks/core/useUsers";

export default function Administrateurs() {
  return (
    <div>
      <h1>Administrateurs</h1>
      <p>Gérez les administrateurs de votre plateforme ici.</p>
      <Button onClick={useUsers}>Ajouter un administrateur</Button>
    </div>
  );
}
