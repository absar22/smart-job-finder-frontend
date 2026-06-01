
export default function CompaniesPage() {
  return (
    <main className="min-h-screen bg-primary py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-teal-light p-10">
          <h1 className="font-syne text-5xl font-bold text-teal mb-4">
            Companies
          </h1>

          <p className="text-lg text-gray-700 mb-8">
            Discover companies hiring talented developers, designers,
            and professionals across different industries.
          </p>

          <div className="bg-teal-lightest rounded-xl p-8 border border-teal-light">
            <h2 className="font-syne text-2xl font-semibold text-teal mb-3">
              Coming Soon 🚀
            </h2>

            <p className="text-gray-700 leading-relaxed">
              We're building a dedicated Companies section where job
              seekers can explore employers, view company profiles,
              discover open positions, and learn more about workplace
              culture before applying.
            </p>
          </div>

          <div className="mt-10">
            <h3 className="font-syne text-2xl font-semibold mb-4 text-teal">
              Planned Features
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-main-blue/10 p-4 rounded-lg">
                Company Profiles
              </div>

              <div className="bg-main-green/10 p-4 rounded-lg">
                Active Job Listings
              </div>

              <div className="bg-main-orange/10 p-4 rounded-lg">
                Industry & Location Filters
              </div>

              <div className="bg-main-blue/10 p-4 rounded-lg">
                Featured Employers
              </div>

              <div className="bg-main-green/10 p-4 rounded-lg">
                Hiring Insights
              </div>

              <div className="bg-main-orange/10 p-4 rounded-lg">
                Company Reviews & Information
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}