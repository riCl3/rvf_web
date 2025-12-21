import { getMilestones } from '../actions'

export const dynamic = 'force-dynamic'

export default async function RoadmapPage() {
    const milestones = await getMilestones()

    return (
        <div className="min-h-screen bg-neutral-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl mb-4">
                        Our 100-Year Journey
                    </h1>
                    <p className="text-xl text-gray-600">
                        A century of dedication, impact, and change.
                    </p>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 md:left-1/2 md:-ml-0.5" />

                    <div className="space-y-12">
                        {milestones.length === 0 ? (
                            <p className="text-center text-gray-500 py-10">No milestones added yet.</p>
                        ) : (
                            milestones.map((milestone: any, index: number) => (
                                <div key={milestone._id} className="relative flex flex-col md:flex-row items-center group">
                                    {/* Dot */}
                                    <div className="absolute left-4 -ml-3 md:left-1/2 md:-ml-3 w-6 h-6 rounded-full border-4 border-white bg-blue-600 shadow-md z-10" />

                                    {/* Content */}
                                    <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-last md:text-left'} w-full`}>
                                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-3">
                                                {milestone.year}
                                            </span>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {milestone.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Spacer for the other side on desktop */}
                                    <div className="hidden md:block md:w-1/2" />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
