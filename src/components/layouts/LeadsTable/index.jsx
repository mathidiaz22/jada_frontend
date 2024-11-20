import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "../../../utils/toast";
import { SERVER_URL } from "../../../utils/config";
import dateformat from "dateformat";

// const statusConfig = {
//   started_trial: {
//     icon: Clock,
//     text: "Started Trial",
//     className: "bg-blue-50 text-blue-700"
//   },
//   requires_followup: {
//     icon: AlertCircle,
//     text: "Requires Followup",
//     className: "bg-yellow-50 text-yellow-700"
//   },
//   paid: {
//     icon: CreditCard,
//     text: "Paid",
//     className: "bg-green-50 text-green-700"
//   },
//   expired: {
//     icon: CheckCircle,
//     text: "Expired",
//     className: "bg-gray-50 text-gray-700"
//   }
// };

const LeadsTable = () => {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const [compaignList, setCompaignList] = useState([]);

  useEffect(() => {
    // setLoading(true);
    axios
      .get(`${SERVER_URL}/api/campaign`)
      .then(({ data }) => {
        // setLoading(false);
        setCompaignList(data);
      })
      .catch((error) => {
        // setLoading(false);
        message({ type: "error", content: error.message });
      });
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-gray-900">Recent Leads</h3>
        <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>
      <div className="overflow-hidden">
        <div className="flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {_.map(compaignList, (item, index) => {
                    const id = item.id;

                    return (
                      <tr
                        key={index}
                        className="cursor-pointer"
                        onClick={() => {
                          navigate(`/campaign/${id}`);
                          sessionStorage.setItem("selectedLeadId", id);
                        }}
                      >
                        <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900">
                          {item.customer_name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                          {item.email}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium`}
                          >
                            <CheckCircle size={14} />
                            {item.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                          {dateformat(
                            item.created_at,
                            "ddd mmm dd yyyy HH:MM:ss"
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsTable;
