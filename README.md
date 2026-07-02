<div align="center">

# 👥 WealthHealth Frontend

Frontend d'une application de gestion des employés développée avec **React**, **TypeScript** et **Vite**.

Cette application consomme l'API WealthHealth afin de gérer les employés d'une entreprise via une interface moderne, responsive et sécurisée.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge)
![Ant Design](https://img.shields.io/badge/Ant_Design-0170FE?style=for-the-badge&logo=antdesign&logoColor=white)

</div>

---

# 📖 Présentation

WealthHealth est une application de gestion des employés permettant d'administrer facilement les informations du personnel d'une entreprise.

Ce dépôt correspond au **frontend** de l'application. Il communique avec une API REST afin de gérer les employés, l'authentification des utilisateurs ainsi que les données nécessaires à l'application.

Le projet a été développé avec **React**, **TypeScript** et **Vite** afin de proposer une interface moderne, performante et maintenable.

---

# 🎯 Objectifs

Ce projet m'a permis de mettre en pratique :

- Développement d'une SPA avec React
- TypeScript
- Gestion du routage avec React Router
- Authentification JWT
- Formulaires avec React Hook Form
- Validation avec Yup
- Gestion du contexte utilisateur avec Context API
- Communication avec une API REST

---

# ✨ Fonctionnalités

- 🔐 Authentification
- 👥 Consultation des employés
- ➕ Création d'un employé
- ✏️ Modification d'un employé
- ❌ Suppression d'un employé
- 📄 Consultation des informations d'un employé
- 📝 Validation des formulaires
- 🔒 Routes protégées
- 📱 Interface responsive

---

# 🏗️ Architecture

```text
             React Application

          Pages / Components

                    │

              Context API

                    │

                Services API

                    │

        Node.js / Express API

                    │

                  MySQL
```

---

# 🛠️ Stack technique

## Frontend

- React
- TypeScript
- Vite
- React Router
- React Hook Form
- Yup

## UI

- Ant Design

## Communication

- Fetch API
- JWT Authentication

---

# 📂 Structure du projet

```text
src

├── components
│   ├── CreateEmployeeForm
│   ├── EditEmployeeForm
│   ├── FormLogin
│   ├── Header
│   ├── Input
│   ├── PrivateRoute
│   └── TabEmployees
│
├── pages
│   ├── Home
│   ├── CurrentEmployee
│   └── EditEmployee
│
├── context
├── hook
├── types
└── services.ts
```

L'application est organisée autour de composants réutilisables, de pages dédiées et d'une couche de services centralisant les appels à l'API.

---

# 🔐 Authentification

L'application utilise une authentification basée sur **JWT**.

Les routes sensibles sont protégées grâce à un composant **PrivateRoute**.

---

# 🚀 Installation

## Cloner le projet

```bash
git clone https://github.com/jeremymillet/WealthHealth-remaster.git
```

## Installer les dépendances

```bash
npm install
```

## Lancer le projet

```bash
npm run dev
```

L'application est accessible sur :

```
http://localhost:5173
```

---

# 🔗 Backend

Cette application utilise l'API disponible ici :

➡️ https://github.com/jeremymillet/WealthHealth-remaster-api

---

# 📸 Captures d'écran

Des captures de l'application seront ajoutées prochainement.


# 👨‍💻 Auteur

**Jérémy Millet**

Développeur Full Stack

📫 À la recherche d'un poste de développeur Backend / Full Stack.
