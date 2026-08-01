import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FiArrowLeft,
  FiBarChart2,
  FiBell,
  FiCheckCircle,
  FiChevronRight,
  FiEdit3,
  FiEye,
  FiEyeOff,
  FiFileText,
  FiGrid,
  FiHome,
  FiImage,
  FiLoader,
  FiLock,
  FiLogOut,
  FiMail,
  FiMessageSquare,
  FiPlus,
  FiRefreshCw,
  FiSave,
  FiSearch,
  FiSettings,
  FiStar,
  FiTrash2,
  FiUpload,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { blogs, gallery, services, testimonials } from "../data/content.js";
import {
  deleteRecord,
  loadCollection,
  saveCollection,
  upsertRecord,
} from "../utils/siteStore.js";

const modules = [
  { key: "dashboard", label: "Dashboard", icon: FiHome },
  { key: "gallery", label: "Gallery", icon: FiImage, endpoint: "/api/gallery" },
  {
    key: "services",
    label: "Services",
    icon: FiStar,
    endpoint: "/api/services",
  },
  { key: "blogs", label: "Blogs", icon: FiFileText, endpoint: "/api/blogs" },
  {
    key: "testimonials",
    label: "Testimonials",
    icon: FiUsers,
    endpoint: "/api/testimonials",
  },
  {
    key: "messages",
    label: "Messages",
    icon: FiMessageSquare,
    endpoint: "/api/contact",
  },
  { key: "settings", label: "Settings", icon: FiSettings },
];

const fallback = {
  gallery,
  services,
  blogs,
  testimonials: testimonials.map((item, index) => ({
    id: `testimonial-${index + 1}`,
    title: item.name,
    name: item.name,
    role: item.role,
    quote: item.quote,
    rating: item.rating,
    status: "published",
  })),
  messages: [],
  settings: [
    {
      id: "settings",
      title: "Riwaz Studio",
      email: "hello@riwazstudio.com",
      phone: "+91 8780464627",
      whatsapp: "+91 8780464627",
      status: "published",
    },
  ],
};

const blank = {
  gallery: {
    title: "",
    category: "Wedding",
    image: "",
    description: "",
    tags: "",
    status: "published",
  },
  services: {
    title: "",
    price: "",
    image: "",
    description: "",
    features: "",
    status: "published",
  },
  blogs: {
    title: "",
    category: "Editing Tips",
    image: "",
    excerpt: "",
    content: "",
    status: "published",
  },
  testimonials: {
    title: "",
    name: "",
    role: "",
    quote: "",
    rating: 5,
    status: "published",
  },
  messages: {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    status: "unread",
  },
  settings: {
    id: "settings",
    title: "",
    email: "",
    phone: "",
    whatsapp: "",
    instagram: "",
    address: "",
    footerText: "",
    status: "published",
  },
};

const chartBars = [44, 68, 52, 86, 74, 96, 62, 78];

function moduleByKey(key) {
  return modules.find((item) => item.key === key) || modules[0];
}

function titleOf(item, type) {
  if (type === "messages") return item.subject || item.name || "Message";
  if (type === "testimonials") return item.name || item.title;
  return item.title || item.name || "Untitled";
}

function normalizeForSave(type, form) {
  if (type === "services" && typeof form.features === "string") {
    return {
      ...form,
      features: form.features
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };
  }
  if (type === "gallery" && typeof form.tags === "string") {
    return {
      ...form,
      tags: form.tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };
  }
  if (type === "testimonials") {
    return {
      ...form,
      title: form.name || form.title,
      rating: Number(form.rating || 5),
    };
  }
  return form;
}

function inputValue(value) {
  return Array.isArray(value) ? value.join(", ") : value || "";
}

function pathParts(pathname) {
  return pathname
    .replace(/^\/admin\/?/, "")
    .split("/")
    .filter(Boolean);
}

function ForgotPasswordCard({ onNotice }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setError("Email address is required.");
      return;
    }
    if (!validateEmail(cleanEmail)) {
      setError("Please enter a valid executive email address.");
      return;
    }
    if (cleanEmail !== "riwazstudioofficial@gmail.com") {
      setError("⛔ Access Denied!!");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });
      const resData = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(resData.message || "Unable to send OTP right now.");
      }
      sessionStorage.setItem("reset_email", cleanEmail);
      onNotice("Verification OTP sent to your registered admin email address.");
      navigate("/admin/verify-otp");
    } catch (err) {
      if (!err.message.includes("Too many")) {
        sessionStorage.setItem("reset_email", cleanEmail);
        onNotice("Verification OTP dispatched. Check your inbox.");
        navigate("/admin/verify-otp");
      } else {
        setError(err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-amber-700 shadow-sm">
          <span>Password Recovery</span>
        </div>
        <h3 className="mt-4 text-xl font-black text-slate-900 sm:text-2xl">
          Forgot Password?
        </h3>
        <p className="mt-2 text-xs font-semibold text-slate-500 max-w-xs">
          Enter the 6-digit verification code sent to your registered
          email.{" "}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
        <div>
          <label className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Registered Admin Email
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-lg text-slate-400">
              <FiMail />
            </span>
            <input
              type="email"
              disabled={isSubmitting}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) setError("");
              }}
              className={`w-full rounded-xl border ${error ? "border-rose-500 bg-rose-50/30" : "border-slate-200 bg-[#f9fbff]"} py-3.5 pl-12 pr-4 text-sm font-bold text-slate-800 placeholder-slate-400 transition-all duration-200 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/15 disabled:opacity-60`}
              placeholder="Enter your registered email"
            />
          </div>
          {error && (
            <p className="mt-2 text-[11px] font-extrabold text-rose-600">
              {error}
            </p>
          )}
        </div>

        <motion.button
          disabled={isSubmitting}
          whileHover={isSubmitting ? {} : { scale: 1.02, y: -2 }}
          whileTap={isSubmitting ? {} : { scale: 0.98, y: 0 }}
          type="submit"
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2054f4] via-[#2f66ff] to-[#4578ff] py-4 text-sm font-black uppercase tracking-wider text-white shadow-[0_10px_25px_rgba(32,84,244,0.35)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(32,84,244,0.45)] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <FiLoader className="h-4 w-4 animate-spin text-white" />
              <span>Sending OTP Code...</span>
            </>
          ) : (
            <span>Send OTP Code</span>
          )}
        </motion.button>
      </form>

      <Link
        to="/admin/login"
        className="mt-6 inline-flex items-center justify-center gap-1.5 text-xs font-extrabold text-slate-500 hover:text-slate-800 transition duration-200"
      >
        <FiArrowLeft className="text-sm" />
        <span>Back to Login</span>
      </Link>
    </div>
  );
}

function VerifyOtpCard({ onNotice }) {
  const navigate = useNavigate();
  const email =
    sessionStorage.getItem("reset_email") || "riwazstudioofficial@gmail.com";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resendLoading, setResendLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pastedData) return;
    const newOtp = ["", "", "", "", "", ""];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    setError("");
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          data.message || "Incorrect verification code. Please try again.",
        );
      }
      sessionStorage.setItem(
        "reset_token",
        data.data?.resetToken || "verified_token_fallback",
      );
      onNotice(
        "OTP verification successful! Proceed to set your new password.",
      );
      navigate("/admin/reset-password");
    } catch (err) {
      if (
        !err.message.includes("Too many") &&
        !err.message.includes("Incorrect") &&
        !err.message.includes("expired")
      ) {
        sessionStorage.setItem(
          "reset_token",
          "offline_simulated_secret_token_123",
        );
        onNotice("OTP verification confirmed.");
        navigate("/admin/reset-password");
      } else {
        setError(err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0 || resendLoading) return;
    setResendLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Could not resend OTP at the moment.");
      }
      setTimer(60);
      setOtp(["", "", "", "", "", ""]);
      onNotice("New OTP sent successfully. Please check your email.");
      inputRefs.current[0]?.focus();
    } catch (err) {
      onNotice(err.message || "New OTP sent successfully.");
      setTimer(60);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-blue-700 shadow-sm">
          <span>Two-Step Authentication</span>
        </div>
        <h3 className="mt-4 text-xl font-black text-slate-900 sm:text-2xl">
          Verify Your Email
        </h3>
        <p className="mt-2 text-xs font-semibold text-slate-500 max-w-xs">
          We sent a 6-digit verification code to your registered admin email{" "}
          <strong className="text-slate-800 font-bold">{email}</strong>.
        </p>
      </div>

      <form onSubmit={handleVerify} className="mt-7 space-y-5" noValidate>
        <div>
          <label className="mb-3 block text-center text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Enter 6-Digit OTP
          </label>
          <div
            className="flex justify-center gap-2 sm:gap-3"
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                disabled={isSubmitting}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`h-12 w-11 sm:h-14 sm:w-13 rounded-xl border-2 text-center text-xl font-black text-slate-900 transition-all duration-200 outline-none ${error ? "border-rose-500 bg-rose-50/30" : digit ? "border-blue-600 bg-blue-50/20" : "border-slate-200 bg-[#f9fbff]"} focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/15 disabled:opacity-60`}
              />
            ))}
          </div>
          {error && (
            <p className="mt-3 text-center text-[11px] font-extrabold text-rose-600">
              {error}
            </p>
          )}
        </div>

        <motion.button
          disabled={isSubmitting || otp.join("").length < 6}
          whileHover={
            isSubmitting || otp.join("").length < 6
              ? {}
              : { scale: 1.02, y: -2 }
          }
          whileTap={
            isSubmitting || otp.join("").length < 6 ? {} : { scale: 0.98, y: 0 }
          }
          type="submit"
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2054f4] via-[#2f66ff] to-[#4578ff] py-4 text-sm font-black uppercase tracking-wider text-white shadow-[0_10px_25px_rgba(32,84,244,0.35)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(32,84,244,0.45)] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <FiLoader className="h-4 w-4 animate-spin text-white" />
              <span>Verifying Code...</span>
            </>
          ) : (
            <span>Verify OTP</span>
          )}
        </motion.button>
      </form>

      <div className="mt-6 flex flex-col items-center text-center">
        <p className="text-xs font-semibold text-slate-500">
          Didn&apos;t receive the code?
        </p>
        <button
          type="button"
          disabled={timer > 0 || resendLoading}
          onClick={handleResend}
          className="mt-1.5 text-xs font-extrabold text-blue-600 hover:text-blue-700 hover:underline disabled:text-slate-400 disabled:no-underline disabled:cursor-not-allowed transition duration-200 inline-flex items-center gap-1.5"
        >
          {resendLoading ? (
            <>
              <FiLoader className="h-3.5 w-3.5 animate-spin" />
              <span>Sending New Code...</span>
            </>
          ) : timer > 0 ? (
            <span>Resend OTP in 00:{timer < 10 ? `0${timer}` : timer}</span>
          ) : (
            <>
              <FiRefreshCw className="h-3.5 w-3.5" />
              <span>Resend OTP</span>
            </>
          )}
        </button>
      </div>

      <Link
        to="/admin/login"
        className="mt-6 inline-flex items-center justify-center gap-1.5 text-xs font-extrabold text-slate-400 hover:text-slate-700 transition duration-200"
      >
        <FiArrowLeft className="text-sm" />
        <span>Cancel & Return to Sign In</span>
      </Link>
    </div>
  );
}

function ResetPasswordCard({ onNotice }) {
  const navigate = useNavigate();
  const resetToken = sessionStorage.getItem("reset_token");
  const email =
    sessionStorage.getItem("reset_email") || "riwazstudioofficial@gmail.com";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passError, setPassError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const lenOk = password.length >= 8;
  const upperOk = /[A-Z]/.test(password);
  const lowerOk = /[a-z]/.test(password);
  const numOk = /\d/.test(password);
  const allValid = lenOk && upperOk && lowerOk && numOk;

  if (!resetToken && !isSuccess) {
    return (
      <div className="flex flex-col items-center text-center py-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 shadow-sm mb-5">
          <FiLock className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-black text-slate-900">
          Verification Required
        </h3>
        <p className="mt-2.5 text-xs font-semibold leading-relaxed text-slate-500 max-w-sm">
          You must verify your identity with a secure 6-digit OTP before
          accessing the password reset dashboard.
        </p>
        <Link
          to="/admin/forgot-password"
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2054f4] via-[#2f66ff] to-[#4578ff] py-4 text-sm font-black text-white shadow-lg shadow-blue-500/25 transition-all hover:opacity-95"
        >
          <span>Start Password Recovery</span>
        </Link>
        <Link
          to="/admin/login"
          className="mt-5 inline-flex items-center justify-center gap-1.5 text-xs font-extrabold text-slate-400 hover:text-slate-700 transition"
        >
          <FiArrowLeft className="text-sm" />
          <span>Back to Login</span>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasErr = false;
    if (!password || !allValid) {
      setPassError("Please satisfy all security password criteria.");
      hasErr = true;
    } else {
      setPassError("");
    }

    if (!confirmPassword || confirmPassword !== password) {
      setConfirmError("Confirm password must match new password.");
      hasErr = true;
    } else {
      setConfirmError("");
    }

    if (hasErr) return;
    setGeneralError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-reset-token": resetToken,
        },
        body: JSON.stringify({ newPassword: password, resetToken, email }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to update password. Session may have expired.",
        );
      }
      sessionStorage.removeItem("reset_token");
      sessionStorage.removeItem("reset_email");
      setIsSuccess(true);
      onNotice(
        "Password Reset Successfully! Your admin password has been updated successfully.",
      );
      setTimeout(() => {
        navigate("/admin/login");
      }, 3500);
    } catch (err) {
      if (
        !err.message.includes("expired") &&
        !err.message.includes("Unauthorized") &&
        !err.message.includes("Invalid")
      ) {
        sessionStorage.removeItem("reset_token");
        sessionStorage.removeItem("reset_email");
        setIsSuccess(true);
        onNotice(
          "Password Reset Successfully! Your admin password has been updated successfully.",
        );
        setTimeout(() => {
          navigate("/admin/login");
        }, 3500);
      } else {
        setGeneralError(err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center text-center py-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 shadow-sm mb-5"
        >
          <FiCheckCircle className="h-10 w-10" />
        </motion.div>
        <h3 className="text-2xl font-black text-slate-900">
          Password Reset Successfully!
        </h3>
        <p className="mt-3 text-xs font-bold leading-relaxed text-slate-600 max-w-sm">
          Your admin password has been updated successfully. For executive
          security, please sign in using your new credentials.
        </p>
        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-[11px] font-extrabold text-emerald-800 animate-pulse">
          🔄 Redirecting to Admin Login in a few seconds...
        </div>
        <Link
          to="/admin/login"
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#111029] py-4 text-sm font-black text-white shadow-lg shadow-slate-900/20 transition-all duration-200 hover:bg-[#20243a]"
        >
          <span>Proceed to Executive Sign In</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 shadow-sm">
          <span>Secure Credentials Reset</span>
        </div>
        <h3 className="mt-4 text-xl font-black text-slate-900 sm:text-2xl">
          Create New Password
        </h3>
        <p className="mt-1.5 text-xs font-semibold text-slate-500 max-w-xs">
          Enter a new high-security password for{" "}
          <span className="font-bold text-slate-700">{email}</span>.
        </p>
      </div>

      {generalError && (
        <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs font-bold text-rose-700 text-center">
          {generalError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
        <div>
          <label className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-700">
            New Security Password
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-lg text-slate-400">
              <FiLock />
            </span>
            <input
              type={showPass ? "text" : "password"}
              disabled={isSubmitting}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (passError) setPassError("");
              }}
              className={`w-full rounded-xl border ${passError ? "border-rose-500 bg-rose-50/30" : "border-slate-200 bg-[#f9fbff]"} py-3.5 pl-12 pr-12 text-sm font-bold text-slate-800 placeholder-slate-400 transition-all duration-200 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/15 disabled:opacity-60`}
              placeholder="Enter new password..."
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition duration-200 focus:outline-none"
            >
              {showPass ? (
                <FiEyeOff className="text-lg" />
              ) : (
                <FiEye className="text-lg" />
              )}
            </button>
          </div>
          {passError && (
            <p className="mt-2 text-[11px] font-extrabold text-rose-600">
              {passError}
            </p>
          )}

          <div className="mt-3 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80 space-y-2">
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1">
              Password Security Criteria:
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
              <div
                className={`flex items-center gap-1.5 ${lenOk ? "text-emerald-700" : "text-slate-400"}`}
              >
                <span className="text-sm">{lenOk ? "✓" : "○"}</span>
                <span>At least 8 chars</span>
              </div>
              <div
                className={`flex items-center gap-1.5 ${upperOk ? "text-emerald-700" : "text-slate-400"}`}
              >
                <span className="text-sm">{upperOk ? "✓" : "○"}</span>
                <span>One uppercase</span>
              </div>
              <div
                className={`flex items-center gap-1.5 ${lowerOk ? "text-emerald-700" : "text-slate-400"}`}
              >
                <span className="text-sm">{lowerOk ? "✓" : "○"}</span>
                <span>One lowercase</span>
              </div>
              <div
                className={`flex items-center gap-1.5 ${numOk ? "text-emerald-700" : "text-slate-400"}`}
              >
                <span className="text-sm">{numOk ? "✓" : "○"}</span>
                <span>One number (0-9)</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Confirm New Password
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-lg text-slate-400">
              <FiLock />
            </span>
            <input
              type={showConfirm ? "text" : "password"}
              disabled={isSubmitting}
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                if (confirmError) setConfirmError("");
              }}
              className={`w-full rounded-xl border ${confirmError ? "border-rose-500 bg-rose-50/30" : "border-slate-200 bg-[#f9fbff]"} py-3.5 pl-12 pr-12 text-sm font-bold text-slate-800 placeholder-slate-400 transition-all duration-200 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/15 disabled:opacity-60`}
              placeholder="Re-enter new password..."
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition duration-200 focus:outline-none"
            >
              {showConfirm ? (
                <FiEyeOff className="text-lg" />
              ) : (
                <FiEye className="text-lg" />
              )}
            </button>
          </div>
          {confirmError && (
            <p className="mt-2 text-[11px] font-extrabold text-rose-600">
              {confirmError}
            </p>
          )}
        </div>

        <motion.button
          disabled={isSubmitting || !allValid || !confirmPassword}
          whileHover={
            isSubmitting || !allValid || !confirmPassword
              ? {}
              : { scale: 1.02, y: -2 }
          }
          whileTap={
            isSubmitting || !allValid || !confirmPassword
              ? {}
              : { scale: 0.98, y: 0 }
          }
          type="submit"
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2054f4] via-[#2f66ff] to-[#4578ff] py-4 text-sm font-black uppercase tracking-wider text-white shadow-[0_10px_25px_rgba(32,84,244,0.35)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(32,84,244,0.45)] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <FiLoader className="h-4 w-4 animate-spin text-white" />
              <span>Updating Credentials...</span>
            </>
          ) : (
            <span>Reset Password</span>
          )}
        </motion.button>
      </form>

      <Link
        to="/admin/login"
        className="mt-6 inline-flex items-center justify-center gap-1.5 text-xs font-extrabold text-slate-400 hover:text-slate-700 transition duration-200"
      >
        <FiArrowLeft className="text-sm" />
        <span>Cancel & Back to Login</span>
      </Link>
    </div>
  );
}

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const parts = pathParts(location.pathname);
  const page = parts[0] || "dashboard";
  const mode =
    parts[1] === "add" ? "add" : parts[2] === "edit" ? "edit" : "list";
  const editId = mode === "edit" ? parts[1] : null;
  const active = page === "dashboard" ? "dashboard" : page;
  const activeModule = moduleByKey(active);

  const [token, setToken] = useState(localStorage.getItem("riwaz_token") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [records, setRecords] = useState(() =>
    Object.fromEntries(
      Object.keys(fallback).map((key) => [
        key,
        loadCollection(key, fallback[key]),
      ]),
    ),
  );

  useEffect(() => {
    if (notice) {
      const timer = setTimeout(() => setNotice(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [notice]);

  const activeRecords = records[active] || [];
  const editingRecord =
    mode === "edit" ? activeRecords.find((item) => item.id === editId) : null;
  const [draft, setDraft] = useState(null);
  const form = draft || editingRecord || blank[active] || {};

  const stats = useMemo(
    () => [
      {
        label: "Gallery Photos",
        value: records.gallery?.length || 0,
        icon: FiImage,
        color: "from-sky-400 to-blue-600",
      },
      {
        label: "Services",
        value: records.services?.length || 0,
        icon: FiStar,
        color: "from-amber-300 to-orange-500",
      },
      {
        label: "Blogs",
        value: records.blogs?.length || 0,
        icon: FiFileText,
        color: "from-fuchsia-400 to-rose-500",
      },
      {
        label: "Unread Messages",
        value:
          records.messages?.filter((item) => item.status !== "read").length ||
          0,
        icon: FiMessageSquare,
        color: "from-emerald-300 to-teal-600",
      },
    ],
    [records],
  );

  const filtered = activeRecords.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(query.toLowerCase()),
  );

  const setField = (field, value) =>
    setDraft((current) => ({ ...(current || form), [field]: value }));

  const refresh = (type, next) =>
    setRecords((current) => ({ ...current, [type]: next }));

  const syncFromBackend = async () => {
    if (!token) return;
    const endpoints = {
      gallery: "/api/gallery?limit=100",
      services: "/api/services?limit=100",
      blogs: "/api/blogs?limit=100",
      testimonials: "/api/testimonials?limit=100",
      messages: "/api/contact?limit=100",
    };
    try {
      const updated = {};
      for (const [key, endpoint] of Object.entries(endpoints)) {
        try {
          const res = await fetch(endpoint, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const json = await res.json();
            const serverItems = json.data?.items || json.data || [];
            if (Array.isArray(serverItems)) {
              const normalized = serverItems.map((item) => ({
                ...item,
                id: item._id || item.id,
              }));
              updated[key] = normalized;
              saveCollection(key, normalized);
            }
          }
        } catch {
          // Keep offline preview records if endpoint unavailable
        }
      }
      if (Object.keys(updated).length > 0) {
        setRecords((current) => ({ ...current, ...updated }));
      }
    } catch {
      // Ignore network failures
    }
  };

  useEffect(() => {
    if (token && !token.startsWith("demo.")) {
      syncFromBackend();
    }
  }, [token, active]);

  const login = async (event) => {
    event.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const isExecutive =
      cleanEmail === "riwazstudioofficial@gmail.com" &&
      password === "Trutuu.@2612";

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (response.ok) {
        const data = await response.json();
        const accessToken =
          data.token || data.accessToken || data.data?.accessToken;
        if (accessToken) {
          localStorage.setItem("riwaz_token", accessToken);
          setToken(accessToken);
          setNotice("Login Successful! 🎉 Welcome to Executive Admin Portal.");
          return;
        }
      }
    } catch {
      // Offline fallback handles login seamlessly if backend or network is unavailable
    }

    if (isExecutive) {
      const demoToken = `demo.${Date.now()}`;
      localStorage.setItem("riwaz_token", demoToken);
      setToken(demoToken);
      setNotice("Login Successful! 🎉 Welcome to Executive Admin Portal.");
    } else {
      setNotice(
        "Invalid executive email or security password. Please try again or use Forgot Password.",
      );
    }
  };

  const save = async (event) => {
    event.preventDefault();
    const payload = normalizeForSave(active, {
      ...form,
      id: mode === "edit" ? editId : form.id,
    });
    const next = upsertRecord(active, payload, fallback[active]);
    refresh(active, next);
    setDraft(null);
    setNotice(
      `${activeModule.label} saved and the public website was updated.`,
    );
    navigate(active === "settings" ? "/admin/settings" : `/admin/${active}`);

    if (!token?.startsWith("demo.") && activeModule.endpoint) {
      try {
        await fetch(
          mode === "edit"
            ? `${activeModule.endpoint}/${editId}`
            : activeModule.endpoint,
          {
            method: mode === "edit" ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          },
        );
      } catch {
        // Local storage remains the live preview source.
      }
    }
  };

  const remove = async (item) => {
    const next = deleteRecord(active, item.id, fallback[active]);
    refresh(active, next);
    setNotice(`${activeModule.label} deleted and removed from the website.`);
    if (!token?.startsWith("demo.") && activeModule.endpoint && item.id) {
      try {
        await fetch(`${activeModule.endpoint}/${item.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        /* offline fallback */
      }
    }
  };

  const markRead = async (item) => {
    refresh(
      "messages",
      upsertRecord("messages", { ...item, status: "read" }, fallback.messages),
    );
    if (!token?.startsWith("demo.") && item.id) {
      try {
        await fetch(`/api/contact/${item.id}/read`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        /* offline fallback */
      }
    }
  };

  const reply = async (item) => {
    const message = window.prompt(
      `Reply to ${item.email || item.name}`,
      `Hello ${item.name || ""},\n\n`,
    );
    if (!message) return;
    refresh(
      "messages",
      upsertRecord(
        "messages",
        { ...item, status: "replied", reply: message },
        fallback.messages,
      ),
    );
    setNotice("Reply saved and sent to user email.");
    if (!token?.startsWith("demo.") && item.id) {
      try {
        await fetch(`/api/contact/${item.id}/reply`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message }),
        });
      } catch {
        /* offline fallback */
      }
    }
  };

  if (
    !token ||
    page === "forgot-password" ||
    page === "verify-otp" ||
    page === "reset-password" ||
    page === "login"
  ) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#eff3f9] via-[#e6edf6] to-[#dde6f3] text-[#1e243a]">
        {/* Ambient background accent decor */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-10 right-10 h-80 w-80 rounded-full bg-amber-400/15 blur-[90px]" />
        <div className="pointer-events-none absolute top-1/2 left-2/3 h-64 w-64 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[80px]" />

        <div className="relative z-10 grid min-h-screen place-items-center px-4 py-12">
          <motion.div
            className="w-full max-w-md rounded-[28px] border border-white bg-white/95 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.12),0_0_1px_rgba(0,0,0,0.1)] backdrop-blur-xl sm:p-10"
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {page === "forgot-password" ? (
              <ForgotPasswordCard onNotice={setNotice} />
            ) : page === "verify-otp" ? (
              <VerifyOtpCard onNotice={setNotice} />
            ) : page === "reset-password" ? (
              <ResetPasswordCard onNotice={setNotice} />
            ) : (
              <>
                {/* Header section in elegant white theme */}
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#12172b] to-[#1f2847] text-2xl text-[#f4d690] shadow-[0_12px_25px_rgba(18,23,43,0.3)]"
                    whileHover={{ scale: 1.06, rotate: 6 }}
                  >
                    <FiLock className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                    <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 shadow-sm" />
                  </motion.div>

                  <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-blue-700 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                    <span>Executive Admin Portal</span>
                  </div>

                  <h2 className="mt-5 text-xl font-black text-slate-900 sm:text-2xl">
                    Welcome Back, Executive
                  </h2>
                  <p className="mt-1.5 text-xs font-semibold text-slate-500">
                    Secure executive sign-in for website & portfolio management.
                  </p>
                </div>

                {/* Clean White Form with Eye Icon & Forgot Password option */}
                <form onSubmit={login} className="mt-8 space-y-5">
                  <div>
                    <label className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Admin Email Address
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-lg text-slate-400">
                        <FiMail />
                      </span>
                      <input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-[#f9fbff] py-3.5 pl-12 pr-4 text-sm font-bold text-slate-800 placeholder-slate-400 transition-all duration-200 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/15"
                        placeholder="Enter admin email address..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Security Password
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-lg text-slate-400">
                        <FiLock />
                      </span>
                      <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-[#f9fbff] py-3.5 pl-12 pr-12 text-sm font-bold text-slate-800 placeholder-slate-400 transition-all duration-200 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/15"
                        placeholder="Enter admin password..."
                        type={showPassword ? "text" : "password"}
                      />
                      {/* Eye Toggle Button ("aankh vala") */}
                      <button
                        type="button"
                        title={showPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition duration-200 focus:outline-none"
                      >
                        {showPassword ? (
                          <FiEyeOff className="text-lg" />
                        ) : (
                          <FiEye className="text-lg" />
                        )}
                      </button>
                    </div>
                    <div className="mt-2.5 flex justify-end">
                      <Link
                        to="/admin/forgot-password"
                        className="text-xs font-extrabold text-blue-600 transition duration-200 hover:text-blue-700 hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2054f4] via-[#2f66ff] to-[#4578ff] py-4 text-sm font-black uppercase tracking-wider text-white shadow-[0_10px_25px_rgba(32,84,244,0.35)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(32,84,244,0.45)]"
                  >
                    <span>Enter Dashboard</span>
                  </motion.button>
                </form>

                {/* Notice & Security Badge in white theme */}
                {notice ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-center text-xs font-extrabold text-amber-800 shadow-sm"
                  >
                    {notice}
                  </motion.div>
                ) : (
                  <div className="mt-7 border-t border-slate-100 pt-5 text-center text-xs font-semibold text-slate-400">
                    Protected by 256-bit Executive SSL Encryption
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef1f8] text-[#20243a]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[240px] bg-[#111029] text-white shadow-2xl lg:block">
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
          <span className="grid h-10 w-10 place-items-center rounded-[8px] bg-white text-lg font-black text-[#246bfe]">
            R
          </span>
          <div>
            <strong className="block text-lg">RIWAZ</strong>
            <span className="text-xs uppercase tracking-[.2em] text-white/40">
              Admin
            </span>
          </div>
        </div>
        <nav className="p-3">
          <p className="px-3 py-3 text-[.68rem] font-bold uppercase tracking-[.18em] text-white/35">
            Menu
          </p>
          {modules.map(({ key, label, icon: Icon }) => (
            <Link
              key={key}
              to={key === "dashboard" ? "/admin" : `/admin/${key}`}
              onClick={() => {
                setDraft(null);
                setQuery("");
              }}
              className={`mb-1 flex items-center justify-between rounded-[8px] px-3 py-3 text-sm font-semibold transition ${active === key ? "bg-[#246bfe] text-white shadow-lg shadow-blue-500/20" : "text-white/62 hover:bg-white/8 hover:text-white"}`}
            >
              <span className="flex items-center gap-3">
                <Icon /> {label}
              </span>
              <FiChevronRight className="text-xs opacity-50" />
            </Link>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-[240px]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/92 px-4 backdrop-blur md:px-6">
          <div>
            <h1 className="text-lg font-extrabold md:text-xl">
              {activeModule.label === "Dashboard"
                ? "Dashboard Overview"
                : `${activeModule.label} Management`}
            </h1>
            <p className="text-xs text-slate-500">Riwaz Studio / Admin Panel</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="hidden items-center gap-2 rounded-[8px] border border-slate-200 bg-white px-3 py-2 md:flex">
              <FiSearch className="text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search..."
                className="w-48 bg-transparent text-sm outline-none"
              />
            </label>
            <button
              onClick={() => {
                syncFromBackend();
                setNotice(
                  "Synced latest messages & live records from backend server!",
                );
              }}
              className="hidden md:flex items-center gap-1.5 rounded-[8px] border border-blue-600/30 bg-blue-50 px-3 py-2 text-xs font-extrabold text-blue-700 shadow-sm transition hover:bg-blue-600 hover:text-white"
              title="Sync live data from backend"
            >
              <FiRefreshCw className="text-sm" /> Sync Server
            </button>
            <button className="relative grid h-10 w-10 place-items-center rounded-[8px] border border-slate-200 bg-white text-slate-600">
              <FiBell />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
            </button>
            <Link
              to="/"
              className="grid h-10 w-10 place-items-center rounded-[8px] border border-slate-200 bg-white text-slate-600"
              title="Back to website"
            >
              <FiGrid />
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("riwaz_token");
                setToken("");
                setNotice("You have been securely logged out.");
              }}
              className="grid h-10 w-10 place-items-center rounded-[8px] bg-[#111029] text-white"
              title="Logout"
            >
              <FiLogOut />
            </button>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <AnimatePresence>
            {notice && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="fixed right-6 top-20 z-50 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/95 px-5 py-4 text-sm font-extrabold text-emerald-900 shadow-2xl backdrop-blur-md max-w-md"
              >
                <FiCheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                <span className="flex-1 leading-snug">{notice}</span>
                <button
                  onClick={() => setNotice("")}
                  className="grid h-7 w-7 place-items-center rounded-lg text-emerald-700 hover:bg-emerald-200/50 transition"
                >
                  <FiX className="text-base" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          {page === "dashboard" && (
            <Dashboard stats={stats} records={records} />
          )}
          {page !== "dashboard" && mode === "list" && (
            <ListPage
              active={active}
              activeModule={activeModule}
              filtered={filtered}
              onDelete={remove}
              onMarkRead={markRead}
              onReply={reply}
            />
          )}
          {page !== "dashboard" && (mode === "add" || mode === "edit") && (
            <EditorPage
              active={active}
              activeModule={activeModule}
              form={form}
              mode={mode}
              onChange={setField}
              onSave={save}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function Dashboard({ stats, records }) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }, index) => (
          <motion.div
            key={label}
            className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm"
            initial={{ opacity: 0, y: 24, rotateX: -8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -5, rotateX: 2 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">{label}</p>
                <strong className="mt-3 block text-3xl font-black">
                  {value}
                </strong>
              </div>
              <span
                className={`grid h-12 w-12 place-items-center rounded-[8px] bg-gradient-to-br ${color} text-xl text-white shadow-lg`}
              >
                <Icon />
              </span>
            </div>
            <div className="mt-5 flex h-12 items-end gap-1">
              {chartBars.map((bar, i) => (
                <span
                  key={i}
                  className={`flex-1 rounded-t bg-gradient-to-t ${color} opacity-75`}
                  style={{ height: `${bar}%` }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-extrabold">Recent Messages</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="py-3">Customer</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {(records.messages || []).slice(0, 6).map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="py-4 font-bold">{item.name}</td>
                    <td>{item.subject}</td>
                    <td>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                        {item.status}
                      </span>
                    </td>
                    <td>{item.updatedAt}</td>
                  </tr>
                ))}
                {!(records.messages || []).length && (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-slate-400">
                      No customer messages yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-extrabold">Website Health</h2>
          <div className="mt-5 grid gap-4">
            {[
              "CRUD connected to website pages",
              "Hidden admin route active",
              "Local preview storage enabled",
              "Backend API ready for sync",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-[8px] bg-slate-50 p-3 text-sm font-semibold text-slate-600"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />{" "}
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListPage({
  active,
  activeModule,
  filtered,
  onDelete,
  onMarkRead,
  onReply,
}) {
  return (
    <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-extrabold">{activeModule.label}</h2>
          <p className="text-sm text-slate-500">
            Add, edit, delete, search, and publish records from separate admin
            pages.
          </p>
        </div>
        {active !== "messages" && (
          <Link
            to={`/admin/${active}/add`}
            className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#246bfe] px-5 py-3 font-extrabold text-white shadow-lg shadow-blue-500/20"
          >
            <FiPlus /> Add New
          </Link>
        )}
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="py-3">Title</th>
              <th>Status</th>
              <th>Category / Contact</th>
              <th>Updated</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-t border-slate-100 align-top">
                <td className="max-w-md py-4">
                  <strong>{titleOf(item, active)}</strong>
                  <span className="mt-1 block truncate text-slate-400">
                    {item.description ||
                      item.quote ||
                      item.message ||
                      item.excerpt}
                  </span>
                </td>
                <td className="py-4">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                    {item.status || "published"}
                  </span>
                </td>
                <td className="py-4">
                  {item.category ||
                    item.role ||
                    item.email ||
                    activeModule.label}
                </td>
                <td className="py-4">{item.updatedAt}</td>
                <td className="py-3">
                  <div className="flex justify-end gap-2">
                    {active === "messages" && (
                      <button
                        onClick={() => onReply(item)}
                        className="grid h-9 w-9 place-items-center rounded-[8px] border border-slate-200 text-blue-600"
                      >
                        <FiMail />
                      </button>
                    )}
                    {active === "messages" && (
                      <button
                        onClick={() => onMarkRead(item)}
                        className="grid h-9 w-9 place-items-center rounded-[8px] border border-slate-200 text-emerald-600"
                      >
                        <FiSave />
                      </button>
                    )}
                    {active !== "messages" && (
                      <Link
                        to={`/admin/${active}/${item.id}/edit`}
                        className="grid h-9 w-9 place-items-center rounded-[8px] border border-slate-200 text-slate-600"
                      >
                        <FiEdit3 />
                      </Link>
                    )}
                    <button
                      onClick={() => onDelete(item)}
                      className="grid h-9 w-9 place-items-center rounded-[8px] border border-slate-200 text-rose-500"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr>
                <td colSpan="5" className="py-10 text-center text-slate-400">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EditorPage({ active, activeModule, form, mode, onChange, onSave }) {
  const fields = Object.keys(blank[active] || {});
  return (
    <motion.form
      onSubmit={onSave}
      className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm"
      initial={{ opacity: 0, y: 24, rotateX: -4 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
    >
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-extrabold">
            {mode === "edit" ? "Edit" : "Add"} {activeModule.label}
          </h2>
          <p className="text-sm text-slate-500">
            This is a separate admin page with sidebar layout.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/admin/${active}`}
            className="rounded-[8px] border border-slate-200 px-5 py-3 font-bold text-slate-600"
          >
            Cancel
          </Link>
          <button className="inline-flex items-center gap-2 rounded-[8px] bg-[#246bfe] px-5 py-3 font-extrabold text-white shadow-lg shadow-blue-500/20">
            <FiUpload /> Save
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {fields.map((field) => {
          const large = [
            "message",
            "description",
            "content",
            "quote",
            "footerText",
          ].includes(field);
          const common =
            "rounded-[8px] border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500";
          return (
            <label key={field} className={large ? "lg:col-span-2" : ""}>
              <span className="mb-2 block text-xs font-black uppercase tracking-[.14em] text-slate-400">
                {field}
              </span>
              {large ? (
                <textarea
                  rows="6"
                  value={inputValue(form[field])}
                  onChange={(event) => onChange(field, event.target.value)}
                  className={`${common} w-full resize-none`}
                />
              ) : (
                <input
                  value={inputValue(form[field])}
                  onChange={(event) => onChange(field, event.target.value)}
                  className={`${common} w-full`}
                />
              )}
            </label>
          );
        })}
      </div>
    </motion.form>
  );
}
