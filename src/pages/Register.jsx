import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Loader2, Mail, Lock, User, ArrowRight, ArrowLeft } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import { useToast } from "../components/ui/use-toast";
import { useLang, T } from "../lib/LangContext";

export default function Register() {
  const { lang } = useLang();
  const t = T[lang];
  const navigate = useNavigate();
  const { registerWithEmail } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState(1); // 1: role, 2: info
  const [role, setRole] = useState("spectator"); // spectator | provider
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await registerWithEmail(form.email, form.password, {
        firstName: form.firstName,
        lastName: form.lastName,
        role: role
      });
      toast({
        title: t.registrationSuccess,
        description: role === "provider" ? t.providerRegisterPending : t.spectatorRegisterSuccess,
      });
      navigate("/profile");
    } catch (err) {
      setError(err.message || "An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = () => {
    setStep(2);
  };

  return (
    <AuthLayout
      icon={User}
      title={t.createAccount}
      subtitle={t.registerSub}
      footer={
        <>
          {t.alreadyHaveAccount}{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            {t.login}
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

        {step === 1 ? (
          <div className="space-y-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-left">
              {t.chooseRole}
            </p>
            <div className="grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={() => setRole("spectator")}
                className={`relative flex items-start gap-3.5 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  role === "spectator" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-foreground/20"
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${
                  role === "spectator" ? "border-primary" : "border-muted-foreground"
                }`}>
                  {role === "spectator" && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">{t.roleSpectator}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{t.roleSpectatorDesc}</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole("provider")}
                className={`relative flex items-start gap-3.5 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  role === "provider" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-foreground/20"
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${
                  role === "provider" ? "border-primary" : "border-muted-foreground"
                }`}>
                  {role === "provider" && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">{t.roleProvider}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{t.roleProviderDesc}</p>
                </div>
              </button>
            </div>

            <Button onClick={handleNextStep} className="w-full h-11 font-semibold cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90">
              {t.continue} <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5 mr-1" /> {t.back}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="firstName">{t.firstName}</Label>
                <Input
                  id="firstName"
                  required
                  disabled={isLoading}
                  value={form.firstName}
                  onChange={(e) => setForm(f => ({ ...f, firstName: e.target.value }))}
                  placeholder="Jean"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lastName">{t.lastName}</Label>
                <Input
                  id="lastName"
                  required
                  disabled={isLoading}
                  value={form.lastName}
                  onChange={(e) => setForm(f => ({ ...f, lastName: e.target.value }))}
                  placeholder="Koffi"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">{t.emailAddress}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  required
                  disabled={isLoading}
                  value={form.email}
                  onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  className="pl-10"
                  placeholder="jean.koffi@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">{t.password}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  required
                  disabled={isLoading}
                  value={form.password}
                  onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
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
                t.register
              )}
            </Button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
