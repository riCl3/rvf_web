import { getRecentWorks } from './actions'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const recentWorks = await getRecentWorks()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 opacity-10 pattern-grid-lg"></div>
        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-medium text-sm">
            Est. 1924
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            A Century of <span className="text-blue-400">Impact</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Dedication to community, sustainable growth, and brighter futures for over 100 years.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/roadmap"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-white text-slate-900 hover:bg-blue-50 transition-all duration-200"
            >
              View Our History
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 transition-all duration-200"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Works Section */}
      <section className="py-24 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Recent Works</h2>
            <p className="text-gray-600 text-lg">Our latest initiatives and projects.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {recentWorks.length === 0 ? (
            <div className="col-span-3 text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">No recent works found. Add some from the Admin Dashboard.</p>
            </div>
          ) : (
            recentWorks.map((work) => (
              <article key={work._id} className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="h-48 bg-gray-100 relative overflow-hidden">
                  {/* Placeholder for image - using pattern or gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur text-blue-700 text-xs font-bold uppercase tracking-wider rounded-md shadow-sm">
                      {work.category || 'Project'}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3 mb-6 flex-grow">
                    {work.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center text-sm text-gray-400">
                    <span>Added recently</span>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
