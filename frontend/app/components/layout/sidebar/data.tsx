import {
  AudioWaveform,
  BookOpen,
  Package,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  Users,
  ShoppingCart,
} from "lucide-react";

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Clients et utilisateurs",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Tous les clients",
          url: "#",
        },
        {
          title: "Détails du client",
          url: "#",
        },
        {
          title: "Adresses de livraison",
          url: "#",
        },
        {
          title: "Groupes de clients",
          url: "#",
        },
        {
          title: "Administrateurs",
          url: "/admin/administrateurs",
        },
        {
          title: "Rôles et permissions",
          url: "/admin/roles-permissions",
        },
      ],
    },
    {
      title: "Produits",
      url: "#",
      icon: Package,
      items: [
        {
          title: "Tous les produits",
          url: "/admin/produits",
        },
        {
          title: "Catégories",
          url: "/admin/categories",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Commandes",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "Toutes les commandes",
          url: "/admin/commandes",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};
