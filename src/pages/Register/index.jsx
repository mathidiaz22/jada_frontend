import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import _ from "lodash";
import { Label } from "../../components/ui/Label";
import { LinkButton } from "../../components/ui/LinkButton";
import { validateRegisterInput } from "../../validators/validateReigster";
import axios from "axios";
import { SERVER_URL } from "../../utils/config";
import { message } from "../../utils/toast";
import { Spinner } from "../../components/ui/Spinner";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const sysRegister = async () => {
    const validated = validateRegisterInput({
      email,
      fullname,
      password,
      confirmPassword
    });
    if (!validated) return;

    try {
      setLoading(true);
      const { data } = await axios.post(`${SERVER_URL}/api/register`, {
        email,
        fullname,
        password
      });
      setLoading(false);
      switch (data.message) {
        case "user_exist":
          message({ type: "info", content: "User already exists" });
          break;

        case "register_success":
          setEmail("");
          setFullname("");
          setPassword("");
          setConfirmPassword("");
          message({ type: "success", content: "Registered successfully" });
          break;

        default:
          break;
      }
    } catch (error) {
      setLoading(false);
      message({ type: "error", content: error.message });
    }
  };

  return (
    <>
      <div className="min-h-screen flex">
        {/* Left Side - Sign Up Form */}
        <div className="w-1/2 p-8 flex flex-col justify-center items-center bg-white">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-4xl font-bold text-gray-900 tracking-tight">
                Welcome to Jada
              </h2>
              <p className="mt-2 text-gray-600">
                <span className="font-semibold text-indigo-600">
                  Free forever.
                </span>{" "}
                No credit card required.
              </p>
            </div>

            <div className="mt-8">
              <Button
                className={
                  "w-full gap-3 px-4 py-3 border border-gray-300  shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition duration-150"
                }
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </Button>

              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Or continue with email
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <Label htmlFor={"email"} className={"block"}>
                    Work email
                  </Label>
                  <Input
                    className="mt-1 block px-3"
                    placeholder="you@company.com"
                    type="email"
                    value={email}
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyUp={(key) => {
                      if (key === "Enter") sysRegister();
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor={"fullname"} className={"block"}>
                    Full Name
                  </Label>
                  <Input
                    className="mt-1 block px-3"
                    placeholder="Theo Henry"
                    type="text"
                    value={fullname}
                    id="fullname"
                    onChange={(e) => setFullname(e.target.value)}
                    onKeyUp={(key) => {
                      if (key === "Enter") sysRegister();
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor={"password"} className={"block"}>
                    Password
                  </Label>
                  <Input
                    className="mt-1 block px-3"
                    placeholder="***********"
                    type="password"
                    value={password}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyUp={(key) => {
                      if (key === "Enter") sysRegister();
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className={"block"}>
                    Confirmation
                  </Label>
                  <Input
                    className="mt-1 block px-3"
                    placeholder="***********"
                    type="password"
                    value={confirmPassword}
                    id="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyUp={(key) => {
                      if (key === "Enter") sysRegister();
                    }}
                  />
                </div>

                <Button
                  className={
                    "w-full  text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                  }
                  onClick={sysRegister}
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <LinkButton onClick={() => navigate("/")}>
                Sign in here
              </LinkButton>
            </p>
          </div>
        </div>

        {/* Right Side - Image & Benefits */}
        <div className="w-1/2 bg-indigo-50 p-8 flex flex-col justify-center">
          <div className="max-w-lg mx-auto">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
              alt="Professional woman smiling"
              className="rounded-lg shadow-xl mb-8 object-cover h-72 w-full"
            />

            <div className="space-y-6">
              <div className="space-y-4">
                {_.map(
                  [
                    "AI-powered workflow automation",
                    "Unlimited team collaboration",
                    "Real-time analytics dashboard",
                    "24/7 priority support"
                  ],
                  (benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  )
                )}
              </div>

              <blockquote className="mt-8 border-l-4 border-indigo-300 pl-4 italic">
                <p className="text-gray-700">
                  "Jada transformed how our team collaborates. We've seen a 40%
                  increase in productivity since implementing it. The best part?
                  It's completely free!"
                </p>
                <footer className="mt-2">
                  <p className="text-sm font-semibold text-gray-900">
                    Sarah Chen
                  </p>
                  <p className="text-sm text-gray-600">CTO at TechFlow</p>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
