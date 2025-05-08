export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">About Greenhouse Plant Growth Analysis</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-3">Project Overview</h2>
          <p className="text-gray-700">
            This project analyzes plant growth metrics to classify greenhouse environments into traditional
            and IoT-based categories. By examining various plant growth parameters, we can determine the
            effectiveness of different greenhouse management approaches.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-3">Classification System</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-green-600 mb-2">Traditional Greenhouse (SA, SB, SC)</h3>
              <p className="text-gray-700">
                Represents conventional greenhouse environments with standard monitoring and control systems.
                The subcategories (A, B, C) indicate different levels of plant growth performance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-green-600 mb-2">IoT-based Greenhouse (TA, TB, TC)</h3>
              <p className="text-gray-700">
                Represents modern greenhouses equipped with IoT sensors and automated control systems.
                The subcategories (A, B, C) indicate different levels of plant growth performance with
                smart technology integration.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-3">Measured Parameters</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Chlorophyll content (photosynthetic pigment)</li>
            <li>Plant height growth rate</li>
            <li>Wet weight of vegetative growth</li>
            <li>Leaf area per plant</li>
            <li>Number of leaves per plant</li>
            <li>Root measurements (diameter, length, weight)</li>
            <li>Dry matter content in various plant parts</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-3">How to Use</h2>
          <p className="text-gray-700">
            Enter the required plant growth metrics in the prediction form. The system will analyze
            these parameters and classify the greenhouse environment into either a traditional or
            IoT-based category, along with a specific performance class (A, B, or C).
          </p>
        </section>
      </div>
    </div>
  );
}