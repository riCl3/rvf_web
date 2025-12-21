import { addMilestone, addRecentWork, deleteContent, getMilestones, getRecentWorks } from '../actions'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
    const milestones = await getMilestones()
    const works = await getRecentWorks()

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto space-y-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">
                    Admin Dashboard
                </h1>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Milestone Form */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                            Add New Milestone
                        </h2>
                        <form action={addMilestone} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                                        Year
                                    </label>
                                    <input
                                        type="number"
                                        name="year"
                                        id="year"
                                        placeholder="1924"
                                        required
                                        className="w-full text-gray-900 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors bg-gray-50 border p-3"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="m_title" className="block text-sm font-medium text-gray-700 mb-2">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="m_title"
                                        placeholder="Foundation Established"
                                        required
                                        className="w-full text-gray-900 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors bg-gray-50 border p-3"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="m_desc" className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    id="m_desc"
                                    rows={4}
                                    required
                                    className="w-full text-gray-900 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors bg-gray-50 border p-3"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
                            >
                                Add Milestone
                            </button>
                        </form>
                    </div>

                    {/* Recent Work Form */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                            Add Recent Work
                        </h2>
                        <form action={addRecentWork} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label htmlFor="w_title" className="block text-sm font-medium text-gray-700 mb-2">
                                        Project Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="w_title"
                                        placeholder="Clean Water Initiative"
                                        required
                                        className="w-full text-gray-900 rounded-lg border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 transition-colors bg-gray-50 border p-3"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        id="category"
                                        required
                                        className="w-full text-gray-900 rounded-lg border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 transition-colors bg-gray-50 border p-3"
                                    >
                                        <option value="">Select a category</option>
                                        <option value="Health">Health</option>
                                        <option value="Education">Education</option>
                                        <option value="Environment">Environment</option>
                                        <option value="Community">Community</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="w_desc" className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    id="w_desc"
                                    rows={4}
                                    required
                                    className="w-full text-gray-900 rounded-lg border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 transition-colors bg-gray-50 border p-3"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
                            >
                                Add Recent Work
                            </button>
                        </form>
                    </div>
                </div>

                {/* Manage Content Section */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-gray-900">Manage Content</h2>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Milestones List */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                <h3 className="font-semibold text-gray-900">Existing Milestones</h3>
                            </div>
                            <ul className="divide-y divide-gray-100">
                                {milestones.length === 0 && <li className="px-6 py-4 text-gray-500 text-sm">No milestones found.</li>}
                                {milestones.map((m) => (
                                    <li key={m._id} className="px-6 py-4 flex justify-between items-start gap-4 hover:bg-gray-50 transition-colors">
                                        <div>
                                            <div className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded inline-block mb-1">{m.year}</div>
                                            <h4 className="font-medium text-gray-900">{m.title}</h4>
                                            <p className="text-sm text-gray-500 line-clamp-1">{m.description}</p>
                                        </div>
                                        <form action={deleteContent.bind(null, m._id)}>
                                            <button className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 bg-red-50 hover:bg-red-100 rounded-md transition-colors">
                                                Delete
                                            </button>
                                        </form>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Recent Works List */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                <h3 className="font-semibold text-gray-900">Existing Projects</h3>
                            </div>
                            <ul className="divide-y divide-gray-100">
                                {works.length === 0 && <li className="px-6 py-4 text-gray-500 text-sm">No projects found.</li>}
                                {works.map((w) => (
                                    <li key={w._id} className="px-6 py-4 flex justify-between items-start gap-4 hover:bg-gray-50 transition-colors">
                                        <div>
                                            <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded inline-block mb-1">{w.category}</div>
                                            <h4 className="font-medium text-gray-900">{w.title}</h4>
                                            <p className="text-sm text-gray-500 line-clamp-1">{w.description}</p>
                                        </div>
                                        <form action={deleteContent.bind(null, w._id)}>
                                            <button className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 bg-red-50 hover:bg-red-100 rounded-md transition-colors">
                                                Delete
                                            </button>
                                        </form>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}