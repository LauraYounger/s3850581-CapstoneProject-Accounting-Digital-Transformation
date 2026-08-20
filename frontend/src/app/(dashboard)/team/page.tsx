import type { Metadata } from 'next'
import image from 'next/image'

export const metadata: Metadata = {
  title: 'Our Team',
}

const teamMembers = [
  {
    name: 'Minh Hoang Tuan',
    role: 'Project Manager',
    image: '/team/minh.jpg',
    blurb:
      'blurb for Minh',
  },
  {
    name: 'Laura Younger',
    role: 'Developer',
    image: '/team/laura.jpg',
    blurb:
      'blurb for Laura',
  },
  {
    name: 'Motoki Kuwahara',
    role: 'Designer',
    image: '/team/motoki.jpg',
    blurb:
      'blurb for Motoki',
  },
  {
    name: 'My Huynh Ngoc Giang',
    role: 'Business Analyst',
    image: '/team/my.jpg',
    blurb:
      'blurb for My',
  }
]

export default function TeamPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
          Meet the team
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Our Team
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-500">
          Meet the people behind our Accounting Digital Transformation
          project.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <article
            key={member.name}
            className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex justify-center bg-zinc-100 p-8 dark:bg-zinc-800">
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                <span className="text-3xl font-semibold text-zinc-500">
                  {member.name
                    .split(' ')
                    .map((name) => name[0])
                    .join('')}
                </span>
              </div>
            </div>

            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold">{member.name}</h2>

              <p className="mt-1 text-sm font-medium text-zinc-500">
                {member.role}
              </p>

              <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {member.blurb}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}