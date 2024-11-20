import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { SiGooglechrome } from "react-icons/si";
import { CheckBox } from "../../components/ui/CheckBox";
import { LinkButton } from "../../components/ui/LinkButton";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { validateLoginInput } from "../../validators/validateLogin";
import { message } from "../../utils/toast";
import axios from "axios";
import { SERVER_URL } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/ui/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../reducers/authReducer";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const sysLogin = async () => {
    const validated = validateLoginInput({ email, password });
    if (!validated) return;

    try {
      setLoading(true);
      const { data } = await axios.post(`${SERVER_URL}/api/login`, {
        email,
        password
      });
      setLoading(false);
      switch (data.message) {
        case "user_closed":
          message({ type: "error", content: "User closed" });
          break;

        case "not_found":
          message({ type: "error", content: "User not found" });
          break;

        case "access_denied":
          message({ type: "error", content: "No permission to access" });
          break;

        case "password_err":
          message({ type: "error", content: "Password is incorrect" });
          break;

        case "login_success":
          if (data.otp_enabled) {
            dispatch(
              setCurrentUser({
                ...currentUser,
                loginSuccess: data.loginSuccess
                // email: email,
                // fullname: fullname,
                // rememberMe,
              })
            );
            navigate("/otp");
          } else {
            if (rememberMe) {
              window.localStorage.setItem("token", data.token);
            } else {
              window.sessionStorage.setItem("token", data.token);
            }
            window.location.reload();
          }
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
    <div className="min-h-screen from-purple-50 to-pink-50 flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1634655377962-e6e7b446e7e9?auto=format&fit=crop&q=80')] bg-cover bg-center">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-lg p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-purple-600 rounded-full flex items-center justify-center">
            <SiGooglechrome className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome Back to Jada
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to continue your journey
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
              <span className="px-4 bg-white/80 text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          <div className="mt-6">
            <div className="space-y-6 w-full">
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="email"
                    className={"pl-12 pr-4"}
                    placeholder="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyUp={(key) => {
                      if (key === "Enter") sysLogin();
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="password"
                    className={"pl-12 pr-4"}
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyUp={(key) => {
                      if (key === "Enter") sysLogin();
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckBox
                    onChange={(checked) => setRememberMe(checked)}
                    checked={rememberMe}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <LinkButton onClick={() => navigate("/forget_pwd")}>
                    Forgot your password?
                  </LinkButton>
                </div>
              </div>
              <Button
                className={
                  "w-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                }
                onClick={sysLogin}
              >
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    <span>Sign in</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <LinkButton onClick={() => navigate("/register")}>
            Sign up for free
          </LinkButton>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
