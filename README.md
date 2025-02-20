# Olive Garden AlcoholPolicy App

A full-stack web application designed to manage and track employee acknowledgments of alcohol service policies at Olive Garden. The platform ensures employees review the necessary regulations, sign their acknowledgment, and allows managers to verify compliance easily.

## Overview

In the food and beverage industry, especially in establishments like Olive Garden, compliance with alcohol service regulations is critical. This application addresses the challenge of ensuring that employees are aware of and adhere to alcohol service policies. It provides a user-friendly interface where employees can read the policy, digitally sign their agreement, and where managers can log in to review and search employee agreement records.

## Features

- **User Authentication:** Managers can securely log in and manage employee records.
- **Policy Agreement:** Employees can digitally sign their policy agreement using an interactive signature canvas.
- **Data Management:** Track and display employee policy agreement data, including signatures and timestamps.
- **Responsive & Interactive UI:** Built with Next.js, React, Tailwind CSS, and Framer Motion for smooth animations and responsive design.
- **API Integration:** Interacts with backend API endpoints to fetch and send employee and authentication data.
- **Database Support:** Utilizes PostgreSQL for data persistence with Prisma as the ORM.

## Installation

Instructions on how to get a copy of the project and running on your local machine.

### Prerequisites

- **Node.js:** Version 14 or higher
- **npm** or **yarn**
- **PostgreSQL:** Ensure PostgreSQL is installed and running (or use a managed service)
- **Docker:** (Optional) For containerized development/deployment

### Clone repository

```bash
git clone https://github.com/yourusername/olive-garden-alcoholpolicy-app.git
cd olive-garden-alcoholpolicy-app
```

### Install Dependencies

```bash
npm install
   # or
yarn install
```

### Set Up Database (Optional)

```bash
npx prisma migrate dev
```

### Run App

```bash
npm run dev
```

## Technologies

- **Frontend:** Next.js, React, Tailwind CSS, Framer Motion
- **Backend & API Integration:** Node.js (integrated within Next.js), custom API endpoints (see [Api.js](./Api.js))
- **Database:** PostgreSQL with Prisma ORM
- **Containerization:** Docker (for development and production environments)
- **Additional Libraries:** SignatureCanvas for digital signature capture, custom hooks for form validation, and Context API for user state management

## Usage

- **For Employees:** Visit the homepage to read the policy and digitally sign the agreement.
- **For Managers:** Use the login modal to access employee records and search for policy agreement data.

## Deployment

The Olive Garden AlcoholPolicy App can be deployed on various platforms:

- **Vercel**
- **Heroku**
- **AWS**

## Testing

This project uses **Jest** for testing. To run the tests, follow these steps:

1.**Install Dependencies**

Make sure all development dependencies (including Jest) are installed:

```bash
npm install
# or
yarn install
```

2. **Run Tests**

Execute all test cases

```bash
   npm test
   # or
   yarn test
```

3. **View Test Coverage (Optional)**
   Generate a coverage report to see which parts of the code are tested:

```bash
   npm test -- --coverage
```

## Contributing

Contributions are welcome! Please follow these steps:

- Fork the repository
- Create a new branch (git checkout -b feature/your-feature).
- Commit your changes and push the branch.
- Open a pull request detailing your changes.
- Ensure your code follows the existing style and includes relevant tests
