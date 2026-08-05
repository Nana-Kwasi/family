import {
  BadgePercent,
  ScrollText,
  BookOpen,
  Boxes,
  ChartLine,
  Inbox,
  LayoutDashboard,
  Landmark,
  LifeBuoy,
  Mail,
  UserRound,
  MessagesSquare,
  Package,
  Settings,
  ShoppingBag,
  Sparkles,
  UserCircle,
  Users,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
  superAdminOnly?: boolean;
}

export interface AppModule {
  key: 'ai' | 'market' | 'culture';
  /** URL prefix owning every page in the module. */
  base: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  /** Tailwind classes for the launcher card's icon tile. */
  accent: string;
  nav: NavItem[];
  /** Set while a module is still being built — the card renders but does not navigate. */
  comingSoon?: boolean;
}

export const MODULES: AppModule[] = [
  {
    key: 'ai',
    base: '/ai',
    name: 'Mama Africa AI',
    tagline: 'Afia, the assistant',
    description:
      'The knowledge base behind Afia, every conversation she has had, and the model settings that drive her.',
    icon: Sparkles,
    accent: 'bg-brand-500/10 text-brand-600 dark:text-brand-300',
    nav: [
      { to: '/ai', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { to: '/ai/knowledge', label: 'Knowledge Base', icon: BookOpen },
      { to: '/ai/conversations', label: 'Conversations', icon: MessagesSquare },
      { to: '/ai/analytics', label: 'Analytics', icon: ChartLine },
      { to: '/ai/settings', label: 'AI Settings', icon: Settings },
    ],
  },
  {
    key: 'market',
    base: '/market',
    name: 'Mama Africa Market',
    tagline: 'The shop',
    description:
      'Products, images, bundles and promotions. Everything the store page shows is edited here rather than in the website code.',
    icon: ShoppingBag,
    accent: 'bg-amber-500/10 text-amber-600 dark:text-amber-300',
    nav: [
      { to: '/market', label: 'Overview', icon: LayoutDashboard, end: true },
      { to: '/market/products', label: 'Products', icon: Package },
      { to: '/market/bundles', label: 'Bundles', icon: Boxes },
      { to: '/market/promotions', label: 'Promotions', icon: BadgePercent },
      { to: '/market/policies', label: 'Policies', icon: ScrollText },
    ],
  },
  {
    key: 'culture',
    base: '/culture',
    name: 'Mama Africa Culture',
    tagline: 'Stories & heritage',
    description:
      'Stories and proverbs, the diaspora wall, every rating left on the site, and the newsletter list.',
    icon: Landmark,
    accent: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
    nav: [
      { to: '/culture', label: 'Overview', icon: LayoutDashboard, end: true },
      { to: '/culture/stories', label: 'Stories & Proverbs', icon: BookOpen },
      { to: '/culture/submissions', label: 'Submissions', icon: Inbox },
      { to: '/culture/subscribers', label: 'Subscribers', icon: Mail },
      { to: '/culture/support', label: 'Support inbox', icon: LifeBuoy },
      { to: '/culture/accounts', label: 'Website accounts', icon: UserRound },
    ],
  },
];

/**
 * Pages that belong to the console itself rather than to any one module. Appended to
 * whichever module's sidebar is showing, so the account is always one click away.
 */
export const ACCOUNT_NAV: NavItem[] = [
  { to: '/users', label: 'Users', icon: Users, superAdminOnly: true },
  { to: '/profile', label: 'Profile', icon: UserCircle },
];

/** The module owning a path, or undefined for the launcher and the account pages. */
export function moduleForPath(pathname: string): AppModule | undefined {
  return MODULES.find((m) => pathname === m.base || pathname.startsWith(`${m.base}/`));
}
