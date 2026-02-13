# CLAUDE.md — Yoopi

This file provides guidance to Claude Code when working with this repository.

---

## 🎯 Projet

**Yoopi** — App mobile de deals de vols (tous types : low-cost, réguliers, long-courriers). On scanne les vols depuis une dizaine d'aéroports français et on envoie des notifications push quand un prix affiche une réduction de 30%+ par rapport à la moyenne historique. Modèle freemium + affiliation via deeplinks vers les plateformes de réservation.

**Cible :** Femmes 25-40 ans, style de vie nomade, budget moyen, qui rêvent de voyager plus mais ratent toujours les bons deals. Voir `docs/persona.md` pour le profil complet.

---

## Commands

```bash
# Development
yarn start                # Start Metro bundler
yarn ios                  # Build and run iOS
yarn android              # Build and run Android
yarn pod-install          # Install iOS CocoaPods dependencies

# Linting & Type Checking
yarn lint                 # Run all checks (ESLint + Prettier + TypeScript)
yarn lint:fix             # Auto-fix lint issues
yarn lint:rules           # ESLint only
yarn lint:code-format     # Prettier only
yarn lint:type-check      # TypeScript only

# Testing
yarn test                 # Run all Jest tests
yarn test -- --testPathPattern=src/screens/Example  # Run a single test file/folder
yarn test:report          # Generate coverage report
```

---

## Architecture

**React Native 0.84 app** (TypeScript, Yarn) targeting iOS and Android.
**Boilerplate:** TheCodingMachine React Native Boilerplate (bare workflow).
**Backend:** Supabase (Auth, DB PostgreSQL, Edge Functions, Realtime).

### Path Alias

`@/*` maps to `./src/*` (configured in tsconfig, babel, and jest).

### Navigation

React Navigation Stack (`src/navigation/`). Routes defined in `Paths` enum (`paths.ts`), typed via `RootStackParamList` (`types.ts`). Main navigator in `Application.tsx`.

### Component Structure (Atomic Design)

`src/components/` follows atomic design: `atoms/`, `molecules/`, `organisms/`, `templates/`. Each folder has a barrel `index.ts`.

### Data Fetching

- **HTTP client**: `ky` configured in `src/services/instance.ts` with base URL from `process.env.API_URL`
- **React Query**: Hooks in `src/hooks/domain/<entity>/` follow pattern: `useEntity.ts` (query hook) + `entityService.ts` (API calls) + `schema.ts` (Zod validation)
- **Supabase**: Client dans `src/services/supabase.ts` pour auth, DB, realtime
- QueryClient configured with no retries in `src/App.tsx`

### Theme System

Context-based provider (`src/theme/ThemeProvider/`) with MMKV persistence. Theme config in `src/theme/_config.ts` defines colors, sizes, border radii/widths. Generator files (`fonts.ts`, `gutters.ts`, `borders.ts`, `backgrounds.ts`) produce style objects from config. Access via `useTheme()` hook which returns `{ fonts, gutters, layout, backgrounds, borders, colors, variant, changeTheme, navigationTheme }`.

### Internationalization

i18next with `react-i18next`. Translation files in `src/translations/` (`en-EN.json`, `fr-FR.json`). Default/fallback language is French. Keys namespaced under `"yoopi"`. Language toggling via `useI18n()` hook.

### Testing

Jest with `@testing-library/react-native`. Wrap components with `TestAppWrapper` from `src/tests/TestAppWrapper.tsx`. Mocks live in `src/tests/__mocks__/`.

---

## Code Style

- ESLint strict + TypeScript strict (`noUnusedLocals` enabled)
- Imports sorted alphabetically by the `perfectionist` plugin
- Use `type` keyword for type definitions (not `interface`)
- No `console.log` (only `console.warn`/`console.error`)
- Single quotes (Prettier)

---

## 📁 Structure du projet — Fichiers à créer

> ⚠️ ON RESPECTE la structure du boilerplate. On ÉTEND, on ne CASSE pas.
> Les éléments marqués 📦 sont fournis par le boilerplate — NE PAS MODIFIER sauf raison documentée.
> Les éléments marqués 🆕 sont à créer pour Yoopi.

```
src/
├── App.tsx                                    # 📦 Point d'entrée
│
├── components/
│   ├── atoms/
│   │   ├── AssetByVariant/                    # 📦 Images par thème
│   │   ├── IconByVariant/                     # 📦 Icônes par thème
│   │   ├── Skeleton/                          # 📦 Loading skeleton
│   │   ├── Button/                            # 🆕 CTA Gold, Vert, Rouge, Outline, Ghost
│   │   ├── Badge/                             # 🆕 Badges deals (Bon deal, Hot, Flash, Expire)
│   │   ├── Text/                              # 🆕 Wrapper typo (H1, H2, H3, Body, Caption, Label)
│   │   ├── Chip/                              # 🆕 Chips aéroports, filtres
│   │   ├── Toggle/                            # 🆕 Toggle on/off
│   │   └── index.ts
│   ├── molecules/
│   │   ├── DefaultError/                      # 📦 Écran d'erreur
│   │   ├── DealCard/                          # 🆕 Card de deal (route, prix, badge, %)
│   │   ├── PriceDisplay/                      # 🆕 Prix barré + prix réduit + badge %
│   │   ├── AirportChip/                       # 🆕 Chip sélection aéroport
│   │   ├── NotificationPreview/               # 🆕 Preview notif pour onboarding
│   │   └── index.ts
│   ├── organisms/
│   │   ├── ErrorBoundary/                     # 📦 Error boundary React
│   │   ├── DealList/                          # 🆕 Liste deals scrollable
│   │   ├── FeaturedCarousel/                  # 🆕 Carousel deals featured
│   │   ├── AirportSelector/                   # 🆕 Sélecteur multi-aéroports
│   │   ├── PaywallFeatures/                   # 🆕 Tableau gratuit vs premium
│   │   └── index.ts
│   └── templates/
│       ├── SafeScreen/                        # 📦 Wrapper SafeArea
│       ├── OnboardingTemplate/                # 🆕 Layout onboarding
│       └── index.ts
│
├── screens/
│   ├── Startup/Startup.tsx                    # 📦 Splash / redirect
│   ├── Onboarding/                            # 🆕
│   │   ├── BenefitsScreen.tsx                 # Écran 1 — Avant-goût deals
│   │   ├── UserExperienceScreen.tsx           # Écran 2 — Aéroport + devise
│   │   ├── SocialProofScreen.tsx              # Écran 3 — Partenaires
│   │   ├── AlertsPreviewScreen.tsx            # Écran 4 — Permission notifs
│   │   ├── FomoScreen.tsx                     # Écran 5 — FOMO / culpabilité
│   │   └── PaywallScreen.tsx                  # Écran 6 — Paywall
│   ├── Home/HomeScreen.tsx                    # 🆕 Deals du jour
│   ├── Alerts/AlertsScreen.tsx                # 🆕 Historique notifs
│   ├── Settings/SettingsScreen.tsx            # 🆕 Préférences + compte
│   ├── DealDetail/DealDetailScreen.tsx        # 🆕 Détail deal (premium only)
│   └── index.ts
│
├── navigation/
│   ├── Application.tsx                        # 📦 À adapter
│   ├── paths.ts                               # 📦 À étendre avec nos routes
│   ├── types.ts                               # 📦 À étendre avec nos types
│   └── stacks/                                # 🆕
│       ├── OnboardingStack.tsx
│       └── MainTabs.tsx
│
├── hooks/
│   ├── domain/
│   │   ├── deals/                             # 🆕 schema.ts + useDeals.ts + dealsService.ts
│   │   ├── preferences/                       # 🆕 schema.ts + usePreferences.ts + preferencesService.ts
│   │   ├── auth/                              # 🆕 schema.ts + useAuth.ts + authService.ts
│   │   ├── notifications/                     # 🆕 schema.ts + useNotifications.ts + notificationsService.ts
│   │   ├── premium/                           # 🆕 schema.ts + usePremium.ts + premiumService.ts
│   │   └── index.ts
│   ├── language/                              # 📦 Gestion langue
│   └── index.ts
│
├── services/
│   ├── instance.ts                            # 📦 Instance ky
│   └── supabase.ts                            # 🆕 Client Supabase initialisé
│
├── theme/                                     # 📦 Système de thème (surchargé avec palette Yoopi)
│
├── translations/                              # 📦 i18n (compléter fr-FR.json et en-EN.json)
│
├── constants/                                 # 🆕 À CRÉER
│   ├── airports.ts
│   ├── currencies.ts
│   ├── config.ts                              # Pricing, limites freemium
│   └── routes.ts
│
├── types/                                     # 🆕 À CRÉER
│   ├── deal.ts
│   ├── user.ts
│   └── airport.ts
│
└── utils/                                     # 🆕 À CRÉER
    ├── formatting.ts                          # Prix, dates, %, devises
    ├── deals.ts                               # Calcul économies, tri, filtrage
    └── validation.ts
```

---

## 🎨 Design System — Yoopi

### RÈGLE ABSOLUE
> Chaque composant utilise `useTheme()` pour accéder aux styles.
> Les couleurs Yoopi sont configurées dans `src/theme/_config.ts`.
> JAMAIS de valeur hex en dur dans un composant.

### Couleurs (configurées dans `src/theme/_config.ts`)

```
GOLD — CTA principal, boutons, flash deals, premium
  50: #FFFAED  |  200: #FCE8B8  |  500: #FFB100 ⭐  |  600: #EEA721
  Dégradé linéaire de fond : #FFFAED → #FCE8B8

VERT — Économies, confiance, badges positifs
  500: #1F820A
  Variantes d'opacité (à utiliser en dur uniquement pour les overlays) :
    40%: rgba(31, 130, 10, 0.40)
    15%: rgba(31, 130, 10, 0.15)

ROUGE — Urgence, FOMO, deals expirants (PARCIMONIE)
  500: #D63030
  Variante d'opacité :
    15%: rgba(214, 48, 48, 0.15)

BLEU — Polices, texte principal
  900: #1A2332 (texte principal)
  700: #3D5166 (texte secondaire foncé)

NEUTRALS
  50: #F7F8FA  |  100: #EEF1F3  |  200: #DDE1E4  |  300: #BDC3C7
  400: #A0ADB4  |  500: #7F8C8D  |  600: #556B7F  |  700: #3D5166  |  800: #2C3E50

SPÉCIAUX
  Background: #FCFCF9 (jamais blanc pur)
  Card: #FFFFFF
  Border: #E8E5D8
```

### Règles couleurs
- **Gold (#FFB100)** = CTA principal. Tout bouton qu'on veut que l'utilisateur clique.
- **Vert (#1F820A)** = Économies, confiance. Prix réduits, badges "bon deal".
- **Rouge (#D63030)** = Urgence pure. PARCIMONIE.
- **Bleu (#1A2332)** = Couleur des polices.
- **Fond crème (#FCFCF9)** = Toujours. Jamais de blanc pur en background.

### Typographies

```
Polices installées dans assets/fonts/ :
  PlusJakartaSans-Bold.ttf
  PlusJakartaSans-ExtraBold.ttf
  PlusJakartaSans-Medium.ttf
  PlusJakartaSans-SemiBold.ttf
  DMSans-Regular.ttf
  DMSans-Medium.ttf
  DMSans-SemiBold.ttf

Couleur texte par défaut : #1A2332 (blue900)

H1:      PlusJakartaSans-ExtraBold  32px  letterSpacing -1
H2:      PlusJakartaSans-Bold       24px  letterSpacing -0.5
H3:      PlusJakartaSans-Bold       18px
Body:    DMSans-Regular             15px  lineHeight 24
Caption: DMSans-Medium              13px  (couleur #7F8C8D)
Label:   PlusJakartaSans-Bold       11px  letterSpacing 1  UPPERCASE
```

### Espacement (gutters)
```
xs: 4  |  sm: 8  |  md: 16  |  lg: 24  |  xl: 32  |  2xl: 48  |  3xl: 64
```

### Border Radius
```
sm: 8  |  md: 12  |  lg: 16  |  xl: 20  |  full: 9999
```

### Boutons

| Type | Fond | Texte | Usage |
|------|------|-------|-------|
| CTA Principal | #FFB100 | #1A2332 | "Voir le deal", "Commencer", "S'abonner" |
| CTA Secondaire | #1F820A | Blanc | "Activer les alertes" |
| Urgence | #D63030 | Blanc | "Réserver maintenant" |
| Outline | Bordure #BDC3C7 | #1A2332 | Actions secondaires |
| Ghost | Transparent | #7F8C8D | "Peut-être plus tard", "Skip" |

### Badges deals

| Badge | Fond | Texte |
|-------|------|-------|
| Bon deal | vert clair rgba(31,130,10,0.15) | #1F820A |
| Hot deal | rouge clair rgba(214,48,48,0.15) | #D63030 |
| Flash | #FFFAED | #EEA721 |
| Expire | rouge clair rgba(214,48,48,0.15) | #D63030 |

---

## 🖼️ Assets disponibles

### Icônes SVG — `src/theme/assets/icons/`
```
arrow-down.svg       arrow-left.svg       arrow-right.svg
bell-semi-lite.svg   bell-white.svg       check.svg
chevrons-right.svg   house-semi-lite.svg  house-white.svg
minus.svg            pass.svg             plane-takeoff.svg
plus.svg             question.svg         search.svg
setting-semi-lite.svg  settings.svg       settings-small.svg
settings-white.svg   user.svg
```

### Images PNG (1x/2x/3x) — `src/theme/assets/images/`
```
mascot/
  oiseau-argent.png      (+ @2x, @3x)
  oiseau-heureux.png     (+ @2x, @3x)
  oiseau-surpris.png     (+ @2x, @3x)

flags/
  bresil.png   europe.png   france.png   indonesie.png
  japon.png    portugal.png  thailand.png  usa.png
  (chacun avec @2x et @3x)

partners/
  google-flight.png   kiwi.png   opodo.png   skyscanner.png
  (chacun avec @2x et @3x)
```

### Screenshots design — `docs/screens/`
```
onboarding-1-benefits.png    onboarding-4-alerts.png
onboarding-2-experience.png  onboarding-5-fomo.png
onboarding-3-social-proof.png  onboarding-6-paywall.png
home.png  alerts.png  settings.png  deal-detail.png
```

---

## 💰 Modèle Freemium

### Gratuit
- Navigation complète visible (tous les écrans, tous les deals affichés)
- **⛔ Clic sur un deal → redirige vers le Paywall**
- L'utilisateur voit la valeur mais ne peut pas accéder au détail / lien de réservation

### Premium — 79,99€ à vie OU 19,99€/mois
- Tous les aéroports
- Deals illimités (accès complet détail + lien réservation)
- Destinations favorites (5 max)
- Accès prioritaire (1h d'avance)
- Alertes push en temps réel

### Constantes

```typescript
// src/constants/config.ts
export const PRICING = {
  LIFETIME: 79.99,
  MONTHLY: 19.99,
} as const;

export const PREMIUM_LIMITS = {
  FAVORITES_MAX: 5,
  PRIORITY_ADVANCE_MINUTES: 60,
} as const;
```

---

## 💱 Devises supportées

```typescript
// src/constants/currencies.ts
export const CURRENCIES = [
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: 'USD', symbol: '$', name: 'Dollar US', flag: '🇺🇸' },
  { code: 'GBP', symbol: '£', name: 'Livre Sterling', flag: '🇬🇧' },
] as const;
```

---

## ✈️ Aéroports

```typescript
// src/constants/airports.ts
export const AIRPORTS = [
  { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris' },
  { code: 'ORY', name: 'Orly', city: 'Paris' },
  { code: 'MRS', name: 'Marseille-Provence', city: 'Marseille' },
  { code: 'LYS', name: 'Lyon-Saint Exupéry', city: 'Lyon' },
  { code: 'NCE', name: 'Nice Côte d\'Azur', city: 'Nice' },
  { code: 'TLS', name: 'Toulouse-Blagnac', city: 'Toulouse' },
  { code: 'BOD', name: 'Bordeaux-Mérignac', city: 'Bordeaux' },
  { code: 'NTE', name: 'Nantes Atlantique', city: 'Nantes' },
  { code: 'SXB', name: 'Strasbourg', city: 'Strasbourg' },
  { code: 'BVA', name: 'Beauvais-Tillé', city: 'Beauvais (Paris)' },
] as const;
```

---

## 📱 Écrans MVP

### Onboarding (6 écrans)
1. **BenefitsScreen** — Avant-goût : différentes réductions affichées, cards deals alléchantes
2. **UserExperienceScreen** — Choix aéroport de départ + choix devise (EUR/USD/GBP)
3. **SocialProofScreen** — Logos partenaires, chiffres clés communauté
4. **AlertsPreviewScreen** — Permission notifs + preview notifications alléchantes
5. **FomoScreen** — Deal expiré + chiffres membres vs non-membres (culpabilité)
6. **PaywallScreen** — 79,99€ à vie / 19,99€/mois, features, CTA Gold

### Tabs principales (3)
1. **HomeScreen** — Featured carousel + liste deals + chips aéroports
2. **AlertsScreen** — Historique notifications
3. **SettingsScreen** — Préférences (aéroport, devise, favoris) + compte

### Modale
- **DealDetailScreen** — Prix, dates, compagnie, % réduction, deeplink (premium only)

### Comportement freemium dans les tabs
- Gratuit : **voit tout** (deals, prix, destinations)
- Clic sur un deal → **redirigé vers Paywall**
- Premium : accès complet détail + lien de réservation

---

## 📐 Patterns de code à suivre

### Domain hooks (reproduire pour chaque domaine)

```typescript
// src/hooks/domain/deals/schema.ts — Types + validation Zod
import { z } from 'zod';

export const dealSchema = z.object({
  id: z.string(),
  origin: z.string(),
  destination: z.string(),
  originalPrice: z.number(),
  dealPrice: z.number(),
  discountPercent: z.number(),
  airline: z.string(),
  stops: z.number(),
  departureDate: z.string(),
  returnDate: z.string(),
  expiresAt: z.string(),
  badge: z.enum(['good_deal', 'hot', 'flash', 'expire']),
});

export type DealItem = z.infer<typeof dealSchema>;
```

```typescript
// src/hooks/domain/deals/dealsService.ts — Appels API
import { supabase } from '@/services/supabase';
import { dealSchema } from './schema';

export async function fetchDeals(airportCode: string) {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('origin', airportCode);
  if (error) throw error;
  return data.map(d => dealSchema.parse(d));
}
```

```typescript
// src/hooks/domain/deals/useDeals.ts — React Query hook
import { useQuery } from '@tanstack/react-query';
import { fetchDeals } from './dealsService';

export function useDeals(airportCode: string) {
  return useQuery({
    queryKey: ['deals', airportCode],
    queryFn: () => fetchDeals(airportCode),
  });
}
```

### Composants — utiliser useTheme()

```typescript
import { useTheme } from '@/theme';

export default function DealCard({ deal, onPress, locked = false }: DealCardProps) {
  const { colors, fonts, gutters, layout, backgrounds } = useTheme();
  // Utiliser les tokens du thème, JAMAIS de valeurs en dur
}
```

---

## ⚠️ Règles strictes

1. **JAMAIS** de `any` en TypeScript
2. **JAMAIS** de couleur hex en dur — toujours via `useTheme()` ou `src/theme/`
3. **JAMAIS** de font size en dur — toujours via le système de fonts du thème
4. **JAMAIS** de margin/padding magique — toujours via `gutters`
5. **JAMAIS** de logique métier dans les composants — toujours dans `hooks/domain/`
6. **JAMAIS** modifier les fichiers 📦 BOILERPLATE sans raison documentée
7. **TOUJOURS** suivre le pattern `schema.ts` (Zod) + `useXxx.ts` + `xxxService.ts`
8. **TOUJOURS** gérer les états : loading, error, empty, success
9. **TOUJOURS** gérer le comportement freemium : clic deal → paywall si gratuit
10. **TOUJOURS** utiliser `useTheme()` pour accéder aux styles
11. **TOUJOURS** utiliser `type` (pas `interface`)
12. **TOUJOURS** single quotes, pas de `console.log`

---

## 🔗 Fichiers de référence

- Design system complet : `docs/design-system.md`
- Persona cible : `docs/persona.md`
- Captures Figma : `docs/screens/`
- Doc boilerplate : https://thecodingmachine.github.io/react-native-boilerplate/

---

## 🔧 Variables d'environnement

```bash
# .env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJxxxxx
API_URL=https://xxxxx
```

> Accès via babel-plugin-inline-dotenv : `process.env.SUPABASE_URL`
