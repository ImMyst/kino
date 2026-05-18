# 🎥 Kino

Une application web moderne pour découvrir les sorties cinéma de la semaine.

## Description

Kino est une application de découverte de films qui affiche les sorties cinéma organisées par semaine. Elle utilise l'API TMDB (The Movie Database) pour récupérer les informations sur les films à venir, leurs affiches, distributions et détails.

## Fonctionnalités

- Affichage des sorties cinéma par semaine
- Navigation entre les semaines (précédente/suivante)
- Préchargement des semaines adjacentes pour une navigation fluide
- Badge "NEW" pour les films sortant dans les 7 prochains jours
- Pages de détails pour chaque film avec distribution et informations complètes
- Design responsive avec support du mode sombre
- Animations fluides et transitions

## Stack technique

- **Framework** : React 19 avec TanStack Router (SSR)
- **Data fetching** : TanStack Query (React Query)
- **Styling** : Tailwind CSS v4
- **Build** : Vite
- **Déploiement** : Netlify
- **Package manager** : Bun
- **API** : TMDB (The Movie Database)
- **Typing** : TypeScript
- **Testing** : Vitest
- **Linting/Formatting** : oxlint, oxfmt
