import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Loader2, Mail, KeyRound, ArrowLeft } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import { useLang, T } from "../lib/LangContext";

export default function ResetPassword() {
  const { lang } = useLang();
  const t = T[lang];
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);
    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "An error occurred during password reset.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      icon={KeyRound}
      title={t.resetPassword}
      subtitle={t.resetPasswordSub}
      footer={
        <Link to="/login" className="inline-flex items-center text-sm font-semibold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1.5" /> {t.backToLogin}
        </Link>
      }
    >
      <div className="space-y-6 text-left">
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs rounded-lg font-medium">
            {error}
          </div>
        )}

        {success ? (
          <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-sm rounded-xl space-y-2">
            <p className="font-semibold">{t.resetEmailSent}</p>
            <p className="text-xs text-green-700 leading-relaxed">{t.resetEmailSentDesc}</p>
          </div>
        ) : (
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
            <Button type="submit" disabled={isLoading} className="w-full h-11 font-semibold cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t.loading}
                </>
              ) : (
                t.resetPassword
              )}
            </Button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
