import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import axios from "axios";
import { SERVER_URL } from "../../../utils/config";
import { message } from "../../../utils/toast";
import { Player } from "video-react";

const Preview = ({ lead_id }) => {
  // const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // setLoading(true);
    axios
      .get(`${SERVER_URL}/api/campaign?lead_id=${lead_id}`)
      .then(({ data }) => {
        // setLoading(false);
        setFormData(data);
      })
      .catch((error) => {
        // setLoading(false);
        message({ type: "error", content: error.message });
      });
  }, [lead_id]);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 mx-auto">
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 max-w-4xl mx-auto text-center">
            {formData.customer_name}, {formData.page_title}
          </h1>
        </div>

        <div className="grid md:grid-cols-[350px,1fr] gap-12 items-start">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="h-full">
              <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6 h-full">
                <div className="space-y-8">
                  <h2 className="text-xl text-center font-semibold text-gray-900">
                    {formData.company_name}
                  </h2>

                  <div className="flex items-center gap-4">
                    <img
                      src={formData.profile_picture}
                      alt={formData.customer_name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div className="w-24 h-24 bg-indigo-600 rounded-2xl flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 font-medium">
                    Prepared exclusively for {formData.customer_name} at Maids
                    in Black with love
                  </p>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                    {formData.button_one_text}
                  </button>
                  <button className="w-full py-3 px-6 border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-gray-300 transition-colors">
                    {formData.button_two_text}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Video Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {formData.video_title}
            </h2>

            {/* <div className="aspect-video rounded-2xl overflow-hidden shadow-xl flex items-center justify-center cursor-pointer transition-colors"> */}
            <Player src={formData.video_link} />
            {/* <Play className="w-16 h-16 text-white opacity-80" /> */}
            {/* </div> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Preview;
