import { useState } from "react";
import CampaignForm from "../../components/layouts/CampaignForm";
import Preview from "../../components/layouts/Preview";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useLocation } from "react-router-dom";
import { Link2 } from "lucide-react";
import { LinkButton } from "../../components/ui/LinkButton";
import axios from "axios";
import { BASE_URL, SERVER_URL } from "../../utils/config";
import { message } from "../../utils/toast";
import copy from "copy-to-clipboard";

const CampaignPage = () => {
  const [activeTab, setActiveTab] = useState("edit");
  const location = useLocation();
  const lead_id = location.pathname.split("/").pop();

  const copyPublicLink = () => {
    axios
      .get(`${SERVER_URL}/api/campaign/encrypt_lead?lead_id=${lead_id}`)
      .then(({ data }) => {
        const encryptedLead = data.encryptedLead;
        const encryptedLink = `${BASE_URL}/profile/${encryptedLead}`;
        copy(encryptedLink);
        message({ type: "success", content: "Link copied" });
      })
      .catch((error) => {
        message({ type: "error", content: error.message });
      });
  };

  return (
    <DashboardLayout>
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Campaign Editor</h1>
          <p className="text-gray-600 flex justify-between">
            <span>Customize your landing page appearance</span>
            {activeTab === "preview" && (
              <LinkButton onClick={copyPublicLink} className="pr-8">
                <Link2 />
              </LinkButton>
            )}
          </p>
        </div>

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("edit")}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === "edit"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === "preview"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Preview
              </button>
            </nav>
          </div>
        </div>

        <div
          className="overflow-y-auto"
          style={{ height: window.innerHeight - 247 }}
        >
          {activeTab === "edit" ? (
            <CampaignForm lead_id={lead_id} />
          ) : (
            <Preview lead_id={lead_id} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CampaignPage;
