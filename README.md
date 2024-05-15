<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/samuelfr7/tickets">
   <h3 align="center">Tickets</h3>
  </a>

  <p align="center">
    👨‍💻 This is a simple helpdesk web application.
    <br />
    <br />
    <br />
  </p>
</div>

### Built With

- [SvelteKit](https://kit.svelte.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [DrizzleORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- [Lucia](https://lucia-auth.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- PostgreSQL

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/samuelfr7/tickets.git
   ```
2. Copy env example
   ```sh
   cp .env.example .env.local
   ```
3. Fill env variables
4. Install packages
   ```sh
   pnpm install
   ```
5. Migrate database
   ```sh
   pnpm db:migrate
   ```
6. Fill your database
   ```sh
   pnpm db:seed
   ```
7. Start the server
   ```sh
   pnpm dev
   ```
8. See the application running on http://localhost:5173

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/samuelfr7/tickets](https://github.com/samuelfr7/tickets)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[stars-shield]: https://img.shields.io/github/stars/samuelfr7/tickets.svg?style=for-the-badge
[stars-url]: https://github.com/samuelfr7/tickets/stargazers
[issues-shield]: https://img.shields.io/github/issues/samuelfr7/tickets.svg?style=for-the-badge
[issues-url]: https://github.com/samuelfr7/tickets/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/samuelfr7
