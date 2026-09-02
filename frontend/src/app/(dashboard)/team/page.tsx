import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Team',
}

const teamMembers = [
  {
    name: 'Minh Hoang Tuan',
    role: 'Project Manager',
    shortRole: 'PM',
    blurb:
      'Manages the project timeline, coordinates team tasks, and ensures deliverables stay organised and on schedule.',
  },
  {
    name: 'My Huynh Ngoc Giang',
    role: 'Business Analyst',
    shortRole: 'BA',
    blurb:
      'Gathers and documents client requirements, and bridges communication between stakeholders and the development team.',
  },
  {
    name: 'Motoki Kuwahara',
    role: 'UX Designer',
    shortRole: 'UX',
    blurb:
      'Designs the user interface and experience, creating wireframes, prototypes, and accessible user-focused layouts.',
  },
  {
    name: 'Laura Younger',
    role: 'Developer',
    shortRole: 'DEV 1',
    blurb:
      'Develops and implements front-end and back-end features, and contributes to the overall technical development of the project.',
  },
  {
    name: 'Nathan Phan',
    role: 'Developer',
    shortRole: 'DEV 2',
    blurb:
      'Supports feature development, writes tests, and helps maintain code quality across the project.',
  },
]

export default function TeamPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#26282d] px-5 py-10 sm:px-8 lg:px-12">
      {/* background - style pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(120,125,140,0.22)_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* background - style */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* team page heading */}
        <header className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 shadow-lg shadow-blue-500/20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6 text-white"
              aria-hidden="true"
            >
              <circle cx="9" cy="8" r="4" />
              <path d="M2 21a7 7 0 0 1 14 0" />
              <circle cx="17" cy="9" r="3" />
              <path d="M15 16a6 6 0 0 1 7 5" />
            </svg>
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
            Meet the team
          </p>

          <h1 className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Accounting Digital Transformation
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Capstone project — client proposal platform.
          </p>
        </header>

        {/* Team members cards */}
        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="group rounded-2xl border border-zinc-700 bg-[#181a1f] p-6 shadow-xl shadow-black/20 transition duration-200 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/5"
            >
              {/* member avatar/image */}
              <div className="mb-5 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-zinc-600 bg-[#101114]">
                  <span className="text-sm font-semibold text-zinc-400">
                    {member.name
                      .split(' ')
                      .map((name) => name[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                </div>

                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-400">
                  {member.shortRole}
                </span>
              </div>

              {/* Member info */}
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {member.name}
                </h2>

                <p className="mt-1 text-sm font-medium text-zinc-400">
                  {member.role}
                </p>

                <div className="my-4 h-px w-full bg-zinc-800" />

                <p className="text-sm leading-6 text-zinc-400">
                  {member.blurb}
                </p>
              </div>

              {/* Card footer */}
              <div className="mt-5 flex items-center text-sm font-medium text-blue-400">
                <span>Team member</span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}