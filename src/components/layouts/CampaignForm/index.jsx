import React, { useEffect, useState } from "react";
import { Label } from "../../ui/Label";
import { Input } from "../../ui/Input";
import axios from "axios";
import { SERVER_URL } from "../../../utils/config";
import { message } from "../../../utils/toast";
import { useNavigate } from "react-router-dom";

const CampaignForm = ({ lead_id }) => {
  // const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // setLoading(true);
    axios
      .get(`${SERVER_URL}/api/campaign?lead_id=${lead_id}`)
      .then(({ data }) => {
        // setLoading(false);
        if (Object.keys(data).length === 0) {
          const selectedLeadId = sessionStorage.getItem("selectedLeadId");
          if (selectedLeadId) {
            navigate(`/campaign/${selectedLeadId}`);
          } else {
            navigate("/");
          }
        } else {
          setFormData(data);
          sessionStorage.setItem("selectedLeadId", data.id);
        }
      })
      .catch((error) => {
        // setLoading(false);
        message({ type: "error", content: error.message });
      });
  }, [lead_id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    axios
      .put(`${SERVER_URL}/api/campaign/${lead_id}`, {
        query: {
          [e.target.name]: e.target.value
        }
      })
      .then(({ data }) => {
        console.log(data);
        // setFormData({ ...formData, ...data.query });
        // setFormData({ ...formData, [e.target.name]: e.target.value });
      });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <img
                src={formData.profile_picture}
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover border-4 border-indigo-100"
              />
            </div>
            <div className="flex-1">
              <Label className={"block"} htmlFor={"profile_picture"}>
                Profile Picture URL
              </Label>
              <Input
                name="profile_picture"
                id="profile_picture"
                className={"pl-12 px-4"}
                placeholder="Enter image URL"
                type="text"
                value={formData.profile_picture}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1">
            <Label className={"block"} htmlFor={"company_name"}>
              Company Name
            </Label>
            <Input
              name="company_name"
              id="customer_name"
              className={"pl-12 px-4"}
              placeholder="Enter company name"
              type="text"
              value={formData.company_name}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className={"block"} htmlFor={"customer_name"}>
                Customer Name
              </Label>
              <Input
                name="customer_name"
                id="customer_name"
                className={"pl-12 px-4"}
                placeholder="Enter customer name"
                type="text"
                value={formData.customer_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className={"block"} htmlFor={"page_title"}>
                Page Title
              </Label>
              <Input
                name="page_title"
                id="page_title"
                className={"pl-12 px-4"}
                placeholder="Enter page title"
                type="text"
                value={formData.page_title}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className={"block"} htmlFor={"button_one_text"}>
                Button One Text
              </Label>
              <Input
                name="button_one_text"
                id="button_one_text"
                className={"pl-12 px-4"}
                placeholder="Enter first button text"
                type="text"
                value={formData.button_one_text}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className={"block"} htmlFor={"button_two_text"}>
                Button Two Text
              </Label>
              <Input
                name="button_two_text"
                id="button_two_text"
                className={"pl-12 px-4"}
                placeholder="Enter second button text"
                type="text"
                value={formData.button_two_text}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className={"block"} htmlFor={"video_link"}>
                Video Link
              </Label>
              <Input
                name="video_link"
                id="video_link"
                className={"pl-12 px-4"}
                placeholder="Enter video URL"
                type="text"
                value={formData.video_link}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className={"block"} htmlFor={"video_title"}>
                Video Title
              </Label>
              <Input
                name="video_title"
                id="video_title"
                className={"pl-12 px-4"}
                placeholder="Enter video title"
                type="text"
                value={formData.video_title}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignForm;
