import { getFeaturedProjects, getProjects, getPageSection, getGalleryImages } from './actions'
import Link from 'next/link'
import { IContent } from '@/models/Content'
import ProjectCard from '@/components/ProjectCard'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const recentWorks = await getProjects()
  const featuredWorks = await getFeaturedProjects()
  const galleryImages = await getGalleryImages()
  const heroSection = await getPageSection('Hero')
  const benefitsSection = await getPageSection('Benefits')
  const statsSection = await getPageSection('Stats')

  const heroData = heroSection?.metadata || {}
  const benefitsData = benefitsSection?.metadata || {}
  const statsData = statsSection?.metadata || {}

  // Defaults if no data found
  const headline = heroData.headline || "A Century of Impact"
  const subheadline = heroData.subheadline || "Dedication to community, sustainable growth, and brighter futures for over 100 years."
  const establishedText = heroData.establishedText || "Established 1924"

  const featuredWork = featuredWorks.length > 0 ? featuredWorks[0] : null

  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-32 md:py-48 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 opacity-10 pattern-grid-lg"></div>
        {/* Decorative circle */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

        <div className="relative max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-medium text-sm">
            {establishedText}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            {/* Split headline for visual or just render as is. Simple render for now/ */}
            {headline}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {subheadline}
          </p>
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/roadmap"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-white text-slate-900 hover:bg-blue-50 hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Our History
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Post Information Section */}
      {featuredWork && (
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col lg:flex-row">
            <div className="lg:w-1/2 relative bg-gray-200 min-h-[400px]">
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${featuredWork.image || '/placeholder.png'})` }}
              />
              <div className="absolute top-6 left-6">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold leading-none text-white bg-blue-600 shadow-sm uppercase tracking-wider">
                  Featured Project
                </span>
              </div>
            </div>
            <div className="lg:w-1/2 p-12 flex flex-col justify-center">
              <span className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-2">{featuredWork.category}</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{featuredWork.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {featuredWork.description}
              </p>
              <Link href="/donate" className="inline-flex items-center font-bold text-blue-600 hover:text-blue-800 transition-colors gap-2 group">
                Support this Project
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Mission Stats (Placeholder-ish) */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-1">{statsData.stat1Value || "100+"}</div>
            <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">{statsData.stat1Label || "Years Active"}</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-1">{statsData.stat2Value || "50k+"}</div>
            <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">{statsData.stat2Label || "Lives Impacted"}</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-1">{statsData.stat3Value || "20+"}</div>
            <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">{statsData.stat3Label || "Countries"}</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-1">{statsData.stat4Value || "100%"}</div>
            <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">{statsData.stat4Label || "Commitment"}</div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Projects</h2>
            <p className="text-gray-600 text-lg">Click on any project to view detailed information.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {recentWorks.length === 0 ? (
            <div className="col-span-3 text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">No projects found. Add projects from the Admin Dashboard.</p>
            </div>
          ) : (
            recentWorks.map((work: IContent) => (
              <ProjectCard key={work._id} project={work} />
            ))
          )}
        </div>
      </section>

      {/* Gallery Section */}
      {galleryImages.length > 0 && (
        <section id="gallery" className="py-24 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((img: IContent) => (
                <div key={img._id} className="relative aspect-square group overflow-hidden rounded-2xl cursor-pointer">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${img.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Volunteer Section */}
      <section id="volunteer" className="bg-blue-50 py-24 px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-blue-600 p-12 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-700 opacity-50 pattern-dots"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">{benefitsData.headline || "Join Our Mission"}</h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                {benefitsData.subheadline || "We are always looking for passionate individuals to help us make a difference. Whether you can spare a few hours a week or want to lead a project, your contribution matters."}
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {benefitsData.benefit1 || "Community Outreach"}
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {benefitsData.benefit2 || "Event Planning"}
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {benefitsData.benefit3 || "Fundraising"}
                </li>
              </ul>
              <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors inline-block w-max">
                Become a Volunteer
              </button>
            </div>
          </div>
          <div className="md:w-1/2 p-12 flex items-center justify-center bg-gray-50 overflow-hidden relative">
            {benefitsData.image ? (
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${benefitsData.image})` }}></div>
            ) : (
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Volunteer Network</h3>
                <p className="text-gray-500">Join over 5,000 volunteers making a change worldwide.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Support Our Cause</h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Your contribution directly funds our educational programs, health initiatives, and community development projects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-8 border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group">
            <div className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">₹500</div>
            <p className="text-gray-500 text-sm">Provides school supplies for one child</p>
          </div>
          <div className="p-8 border-2 border-blue-600 bg-blue-50 rounded-2xl transform scale-105 shadow-md cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">POPULAR</div>
            <div className="text-3xl font-bold text-blue-700 mb-2">₹1000</div>
            <p className="text-gray-600 text-sm">Provides clean water for a family for a month</p>
          </div>
          <div className="p-8 border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group">
            <div className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">₹2000</div>
            <p className="text-gray-500 text-sm">Funds a community health workshop</p>
          </div>
        </div>

        <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all hover:scale-105">
          Donate Securely
        </button>
      </section>
    </div>
  )
}
