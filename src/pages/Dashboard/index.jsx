import DashboardLayout from "../../components/layouts/DashboardLayout";
import AnalyticsCard from "../../components/layouts/AnalyticsCard";
import LeadsTable from "../../components/layouts/LeadsTable";
import { Bell } from "lucide-react";
import _ from "lodash";

const DashboardPage = () => {
  const analytics = [
    {
      title: "Total Views",
      value: "24.5K",
      change: 12,
      changeText: "vs. previous week",
    },
    {
      title: "Click-through Rate",
      value: "4.3%",
      change: 2.1,
      changeText: "vs. previous week",
    },
    {
      title: "Conversions",
      value: "1,233",
      change: -0.4,
      changeText: "vs. previous week",
    },
    {
      title: "Avg. Watch Time",
      value: "2:31",
      change: 8.5,
      changeText: "vs. previous week",
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex-1 p-8">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces"
              alt="Sarah"
              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Morning Sarah,
              </h1>
              <p className="text-gray-600">Here is your campaign data</p>
            </div>
          </div>
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              3
            </span>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          {analytics.map((item, index) => (
            <AnalyticsCard key={index} {...item} />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <LeadsTable />
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">
              Top Performing Pages
            </h3>
            <div className="space-y-4">
              {_.map(
                [
                  { title: "Marketing Workshop", views: "8.2K views" },
                  { title: "Product Demo", views: "6.4K views" },
                  { title: "Customer Success Story", views: "5.9K views" },
                ],
                (page, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-900">
                        {page.title}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">{page.views}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
