import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Loader2, Mail, Lock } from "lucide-react";
import GoogleIcon from "../components/GoogleIcon";
import AuthLayout from "../components/AuthLayout";
import { useLang, T } from "../lib/LangContext";

export default function Login() {
  const { lang } = useLang();
  const t = T[lang];
  const navigate = useNavigate();
  const { loginWithEmail, loginWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await loginWithEmail(email, password);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      await loginWithGoogle();
      navigate("/profile");
    } catch (err) {
      setError(err.message || "An error occurred during Google login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      icon={Lock}
      title={t.welcomeBack}
      subtitle={t.loginSub}
      footer={
        <>
          {t.noAccount}{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            {t.register}
          </Link>
        </>
      }
    >
      <div className="space-y-6 text-left">
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs rounded-lg font-medium">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">{t.emailAddress}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                required
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t.password}</Label>
              <Link to="/reset-password" className="text-xs text-primary hover:underline">
                {t.forgotPassword}
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                required
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>
          <Button type="submit" disabled={isLoading} className="w-full h-11 font-semibold cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t.loading}
              </>
            ) : (
              t.login
            )}
          </Button>
        </form>
        <div className="relative flex items-center justify-center my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <span className="relative bg-card px-3 text-xs text-muted-foreground uppercase tracking-wide">
            {t.orContinueWith}
          </span>
        </div>
        <Button variant="outline" type="button" onClick={handleGoogleLogin} disabled={isLoading} className="w-full h-11 border-border font-semibold cursor-pointer">
          <GoogleIcon className="h-5 w-5 mr-2" />
          Google
        </Button>
      </div>
    </AuthLayout>
  );
}
