"use client";
import useBasicSettings from "@/hooks/useBasicSettings";
import showToast from "@/lib/toast";
import { useContactSubmitMutation } from "@/redux/api/publicApi/homepageApi";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { getSuccessMessage } from "@/utils/getSuccessMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence, motion } from "framer-motion";
import {
  AtSign,
  Check,
  Clock,
  Globe2,
  MessageSquare,
  Send,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const PROMISES = [
  {
    Icon: Clock,
    title: "24-hour response",
    desc: "Most inquiries are answered within one business day.",
  },
  {
    Icon: ShieldCheck,
    title: "Secure & confidential",
    desc: "All messages are encrypted end-to-end.",
  },
  {
    Icon: Globe2,
    title: "Available worldwide",
    desc: "Support in 12+ languages across 120+ countries.",
  },
];

const schema = yup.object({
  name: yup.string().trim().required("Name is required"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Please enter a valid email address"),
  message: yup
    .string()
    .trim()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters"),
});

export function ContactForm() {
  const { settings } = useBasicSettings();
  const recaptchaKey = settings?.google_recaptcha_site_key;
  const recaptchaStatus = settings?.google_recaptcha_status;

  const [submitted, setSubmitted] = useState(false);
  const [recaptcha, setRecaptcha] = useState(null);
  const recaptchaRef = useRef(null);

  const [contactSubmit, { isLoading }] = useContactSubmitMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data) => {
    if (recaptchaStatus && recaptchaKey && !recaptcha) {
      showToast.warning("Please verify the reCAPTCHA");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);
    if (recaptcha) {
      formData.append("g-recaptcha-response", recaptcha);
    }

    try {
      const result = await contactSubmit(formData).unwrap();
      const successMessages = getSuccessMessage(result);
      showToast.success(successMessages.success[0]);

      setSubmitted(true);
      reset();
      setRecaptcha(null);
      recaptchaRef.current?.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      const errMessages = getErrorMessage(error);

      // Laravel-style field errors: { errors: { name: [...], email: [...], message: [...] } }
      if (errMessages?.errors) {
        Object.values(errMessages.errors)
          .flat()
          .forEach((m) => showToast.error(m));
      } else if (errMessages?.message) {
        showToast.error(errMessages.message);
      } else {
        showToast.error("Failed to send message. Please try again.");
      }

      setRecaptcha(null);
      recaptchaRef.current?.reset();
    }
  };

  // Memoize the bound submit handler — avoids invoking `handleSubmit`
  // during render and silences the React 19 "ref read in render" warning.
  const submit = useMemo(
    () => handleSubmit(onSubmit),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleSubmit, recaptcha, recaptchaStatus, recaptchaKey],
  );

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28 bg-linear-to-b from-white via-emerald-50/30 to-slate-50 dark:from-walletium-dark dark:via-walletium-dark-mid dark:to-[#091829]">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full pointer-events-none opacity-50 dark:opacity-30"
        style={{
          background:
            "radial-gradient(ellipse, rgba(14,190,152,0.16) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 relative"
          >
            <div
              className="absolute -inset-px rounded-3xl pointer-events-none opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, rgba(14,190,152,0.35) 0%, transparent 50%, rgba(0,229,255,0.25) 100%)",
              }}
            />
            <div className="relative p-6 sm:p-8 lg:p-10 rounded-3xl bg-white/90 dark:bg-neutral-900/60 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-700/60 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.12)] dark:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
              <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-primary-600 dark:text-primary-400 mb-3">
                Send a Message
              </span>
              <h2 className="font-serif font-black leading-tight mb-2 text-2xl sm:text-3xl lg:text-4xl tracking-tight text-neutral-900 dark:text-white">
                Feel free to get in touch with us
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
                Have a question, feedback, or partnership idea? Drop us a note —
                we read every message.
              </p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30"
                  >
                    <div
                      className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
                      }}
                    >
                      <Check size={18} color="white" strokeWidth={3} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary-700 dark:text-primary-300 mb-1">
                        Message sent successfully
                      </p>
                      <p className="text-xs text-primary-600/80 dark:text-primary-400/80">
                        We&apos;ll get back to you within 24 hours. Thanks for
                        reaching out!
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={submit}
                    noValidate
                    className="space-y-5"
                  >
                    {/* Name + Email row */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-bold tracking-wider uppercase mb-2 text-neutral-700 dark:text-neutral-300"
                        >
                          Name <span className="text-primary-500">*</span>
                        </label>
                        <div className="relative">
                          <User
                            size={16}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none"
                          />
                          <input
                            id="name"
                            type="text"
                            placeholder="Enter Name..."
                            aria-invalid={!!errors.name}
                            {...register("name")}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-primary-400 dark:focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10 focus:outline-none transition-all"
                          />
                        </div>
                        {errors.name && (
                          <p className="text-xs text-red-500 mt-1.5">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-bold tracking-wider uppercase mb-2 text-neutral-700 dark:text-neutral-300"
                        >
                          Email <span className="text-primary-500">*</span>
                        </label>
                        <div className="relative">
                          <AtSign
                            size={16}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none"
                          />
                          <input
                            id="email"
                            type="email"
                            placeholder="Enter Email..."
                            aria-invalid={!!errors.email}
                            {...register("email")}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-primary-400 dark:focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10 focus:outline-none transition-all"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1.5">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-bold tracking-wider uppercase mb-2 text-neutral-700 dark:text-neutral-300"
                      >
                        Message <span className="text-primary-500">*</span>
                      </label>
                      <div className="relative">
                        <MessageSquare
                          size={16}
                          className="absolute left-4 top-4 text-neutral-400 dark:text-neutral-500 pointer-events-none"
                        />
                        <textarea
                          id="message"
                          rows={6}
                          placeholder="Write Here..."
                          aria-invalid={!!errors.message}
                          {...register("message")}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-primary-400 dark:focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10 focus:outline-none transition-all resize-none"
                        />
                      </div>
                      {errors.message && (
                        <p className="text-xs text-red-500 mt-1.5">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* reCAPTCHA */}
                    {recaptchaStatus && recaptchaKey && (
                      <div className="flex justify-center sm:justify-start">
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={recaptchaKey}
                          onChange={setRecaptcha}
                          onExpired={() => setRecaptcha(null)}
                        />
                      </div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{
                        scale: isLoading ? 1 : 1.02,
                        y: isLoading ? 0 : -2,
                      }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{
                        background:
                          "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
                      }}
                    >
                      {isLoading ? "Sending…" : "Send Message"}
                      <Send size={16} strokeWidth={2.5} />
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Side panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 lg:sticky lg:top-24"
          >
            <div className="relative p-6 sm:p-8 rounded-3xl overflow-hidden bg-linear-to-br from-[#06141F] via-[#0A1F2E] to-[#06141F] text-white">
              {/* Decorative glows */}
              <div
                className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(14,190,152,0.35) 0%, transparent 65%)",
                  filter: "blur(50px)",
                }}
              />
              <div
                className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,229,255,0.25) 0%, transparent 65%)",
                  filter: "blur(50px)",
                }}
              />

              <div className="relative">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-5 bg-white/10 text-primary-300 border border-primary-400/30 backdrop-blur-sm">
                  <Sparkles size={11} /> Why Reach Out
                </span>
                <h3 className="font-serif font-black text-xl sm:text-2xl mb-3 tracking-tight">
                  We&apos;re here to help
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed mb-7">
                  Whether you have a quick question, need integration help, or
                  want to explore a partnership — our team is ready.
                </p>

                <ul className="space-y-5">
                  {PROMISES.map(({ Icon, title, desc }) => (
                    <li key={title} className="flex items-start gap-3.5">
                      <div
                        className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(14,190,152,0.25) 0%, rgba(0,229,255,0.15) 100%)",
                          border: "1px solid rgba(14,190,152,0.35)",
                        }}
                      >
                        <Icon
                          size={18}
                          className="text-primary-300"
                          strokeWidth={2}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold mb-0.5">{title}</p>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
