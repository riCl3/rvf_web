import SubmitButton from '@/components/SubmitButton'
import {
    addMilestone,
    addRecentWork,
    deleteContent,
    getMilestones,
    getRecentWorks,
    toggleFeatured,
    updateContactInfo,
    updatePageSection,
    getContactInfo,
    getPageSection
} from '../actions'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
    const milestones = await getMilestones()
    const works = await getRecentWorks()
    const contactInfo = await getContactInfo()
    const heroSection = await getPageSection('Hero')
    const benefitsSection = await getPageSection('Benefits')

    const contactMetadata = contactInfo?.metadata || {}
    const heroMetadata = heroSection?.metadata || {}
    const benefitsMetadata = benefitsSection?.metadata || {}

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
            <div className="max-w-7xl mx-auto space-y-12">

                <header className="pb-8">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg">Manage your website content, projects, and settings.</p>
                </header>

                {/* --- SECTIONS: Using a simple vertical layout for now with distinct headers --- */}

                {/* 1. GENERAL SETTINGS (Contact Info) */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-2xl font-bold text-gray-800">General Settings</h2>
                        <p className="text-gray-500 text-sm">Update contact contact details and social links.</p>
                    </div>
                    <div className="p-8">
                        <form action={updateContactInfo} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input type="email" name="email" defaultValue={contactMetadata.email} placeholder="contact@ngo.org" className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3 focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input type="tel" name="phone" defaultValue={contactMetadata.phone} placeholder="+1 234 567 890" className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3 focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Physical Address</label>
                                <input type="text" name="address" defaultValue={contactMetadata.address} placeholder="123 Charity Lane, City" className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3 focus:ring-blue-500 focus:border-blue-500" />
                            </div>

                            {/* Socials */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                                <input type="url" name="facebook" defaultValue={contactMetadata.facebook} placeholder="https://facebook.com/..." className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3 focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Twitter/X URL</label>
                                <input type="url" name="twitter" defaultValue={contactMetadata.twitter} placeholder="https://twitter.com/..." className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3 focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
                                <input type="url" name="instagram" defaultValue={contactMetadata.instagram} placeholder="https://instagram.com/..." className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3 focus:ring-blue-500 focus:border-blue-500" />
                            </div>

                            <div className="md:col-span-2 pt-4">
                                <SubmitButton className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors">
                                    Save General Settings
                                </SubmitButton>
                            </div>
                        </form>
                    </div>
                </section>

                {/* 2. HOMEPAGE CONTENT */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-2xl font-bold text-gray-800">Homepage Sections</h2>
                        <p className="text-gray-500 text-sm">Customize the text on your homepage.</p>
                    </div>
                    <div className="p-8 space-y-8">
                        {/* Hero Section Form */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-l-4 border-blue-500 pl-3">Hero Banner</h3>
                            <form action={updatePageSection} className="space-y-4">
                                <input type="hidden" name="sectionTitle" value="Hero" />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Main Headline</label>
                                    <input type="text" name="headline" defaultValue={heroMetadata.headline || "A Century of Impact"} className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3 font-bold text-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subheadline / Tagline</label>
                                    <textarea name="subheadline" rows={3} defaultValue={heroMetadata.subheadline || "Dedication to community, sustainable growth, and brighter futures for over 100 years."} className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Establishment Text (Badge)</label>
                                    <input type="text" name="establishedText" defaultValue={heroMetadata.establishedText || "Established 1924"} className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3" />
                                </div>
                                <SubmitButton className="bg-gray-900 hover:bg-black text-white px-5 py-2 rounded-lg text-sm font-medium">Update Hero Section</SubmitButton>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Benefits Section Form - NEW */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mt-8">
                    <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-2xl font-bold text-gray-800">Benefits Section</h2>
                        <p className="text-gray-500 text-sm">Customize the "Join Our Mission" section.</p>
                    </div>
                    <div className="p-8">
                        <form action={updatePageSection} className="space-y-4">
                            <input type="hidden" name="sectionTitle" value="Benefits" />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
                                <input type="text" name="headline" defaultValue={benefitsMetadata.headline || "Join Our Mission"} className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3 font-bold" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subheadline</label>
                                <textarea name="subheadline" rows={2} defaultValue={benefitsMetadata.subheadline || "We are always looking for passionate individuals."} className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Benefit 1</label>
                                    <input type="text" name="benefit1" defaultValue={benefitsMetadata.benefit1 || "Community Outreach"} className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Benefit 2</label>
                                    <input type="text" name="benefit2" defaultValue={benefitsMetadata.benefit2 || "Event Planning"} className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Benefit 3</label>
                                    <input type="text" name="benefit3" defaultValue={benefitsMetadata.benefit3 || "Fundraising"} className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3" />
                                </div>
                            </div>
                            <div className="pt-4">
                                <SubmitButton className="bg-gray-900 hover:bg-black text-white px-5 py-2 rounded-lg text-sm font-medium">Update Benefits Section</SubmitButton>
                            </div>
                        </form>
                    </div>
                </section>

                {/* 3. RECENT WORKS / PROJECTS */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Add Recent Work */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Add Project / Recent Work</h2>
                            <p className="text-gray-500 text-sm">Add new initiatives to your portfolio.</p>
                        </div>
                        <form action={addRecentWork} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                                <input type="text" name="title" required placeholder="Clean Water Initiative" className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3 focus:ring-emerald-500 focus:border-emerald-500" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select name="category" required className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3">
                                        <option value="Health">Health</option>
                                        <option value="Education">Education</option>
                                        <option value="Environment">Environment</option>
                                        <option value="Community">Community</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                                    <input type="url" name="image" placeholder="https://example.com/image.jpg" className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea name="description" rows={3} required className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3" />
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                                <input type="checkbox" name="isFeatured" id="isFeatured" className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300" />
                                <label htmlFor="isFeatured" className="text-sm font-medium text-emerald-900 cursor-pointer select-none">Mark as Featured Post? (Displayed prominently)</label>
                            </div>

                            <SubmitButton className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-emerald-200">
                                Publish Project
                            </SubmitButton>
                        </form>
                    </div>

                    {/* Milestone Form */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Add Milestone</h2>
                            <p className="text-gray-500 text-sm">Add significant events to the roadmap.</p>
                        </div>
                        <form action={addMilestone} className="space-y-5">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                                    <input type="number" name="year" required placeholder="2024" className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                    <input type="text" name="title" required placeholder="Foundation Day" className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea name="description" rows={3} required className="w-full text-gray-900 rounded-lg border-gray-200 bg-gray-50 border p-3" />
                            </div>
                            <SubmitButton className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-200">
                                Add Milestone
                            </SubmitButton>
                        </form>
                    </div>
                </div>

                {/* 4. MANAGE CONTENT LISTS */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Projects List with Featured Toggle */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="font-bold text-gray-900">Manage Projects</h3>
                            <span className="text-xs font-medium px-2 py-1 bg-gray-200 rounded-full text-gray-600">{works.length} items</span>
                        </div>
                        <ul className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                            {works.length === 0 && <li className="p-6 text-gray-500 italic text-center">No projects added yet.</li>}
                            {!works && <li className="p-6 text-gray-500 italic text-center">No projects added yet.</li>}
                            {works?.map((w: any) => (
                                <li key={w._id} className="p-4 hover:bg-gray-50 transition-colors group">
                                    <div className="flex gap-4 items-start">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 bg-cover bg-center border border-gray-200" style={{ backgroundImage: `url(${w.image || '/placeholder.png'})` }}>
                                            {!w.image && <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No Img</div>}
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-gray-900 line-clamp-1">{w.title}</h4>
                                                <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">{w.category}</span>
                                            </div>
                                            <p className="text-sm text-gray-500 line-clamp-1 mb-2">{w.description}</p>

                                            <div className="flex items-center justify-between mt-2">
                                                {/* Toggle Featured */}
                                                <form action={toggleFeatured.bind(null, w._id, w.isFeatured || false)}>
                                                    <button type="submit" className={`text-xs font-semibold px-2 py-1 rounded transition-colors flex items-center gap-1 ${w.isFeatured ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                                                        {w.isFeatured ? '★ Featured' : '☆ Not Featured'}
                                                    </button>
                                                </form>

                                                {/* Delete */}
                                                <form action={deleteContent.bind(null, w._id)}>
                                                    <button className="text-red-600 hover:text-red-900 text-xs font-medium px-2 py-1 hover:bg-red-50 rounded">
                                                        Delete
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Milestones List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="font-bold text-gray-900">Manage Milestones</h3>
                            <span className="text-xs font-medium px-2 py-1 bg-gray-200 rounded-full text-gray-600">{milestones.length} items</span>
                        </div>
                        <ul className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                            {(!milestones || milestones.length === 0) && <li className="p-6 text-gray-500 italic text-center">No milestones found.</li>}
                            {milestones?.map((m: any) => (
                                <li key={m._id} className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-start gap-4">
                                    <div>
                                        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded mb-1">{m.year}</span>
                                        <h4 className="font-medium text-gray-900 text-sm">{m.title}</h4>
                                        <p className="text-xs text-gray-500 line-clamp-2 mt-1">{m.description}</p>
                                    </div>
                                    <form action={deleteContent.bind(null, m._id)}>
                                        <button className="text-red-400 hover:text-red-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </form>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}