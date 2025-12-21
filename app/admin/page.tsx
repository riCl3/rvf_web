import { addMilestone, addRecentWork } from '../actions'

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto space-y-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">
                    Admin Dashboard
                </h1>

                {/* Milestone Form */}
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Add New Milestone
                    </h2>
                    <form action={addMilestone} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                                    className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors bg-gray-50 border p-3"
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
                                    className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors bg-gray-50 border p-3"
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
                                className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors bg-gray-50 border p-3"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
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
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                                    className="w-full rounded-lg border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 transition-colors bg-gray-50 border p-3"
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
                                    className="w-full rounded-lg border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 transition-colors bg-gray-50 border p-3"
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
                                className="w-full rounded-lg border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 transition-colors bg-gray-50 border p-3"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full md:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
                        >
                            Add Recent Work
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}