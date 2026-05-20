"use client";
import useBasicSettings from "@/hooks/useBasicSettings";
import showToast from "@/lib/toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { getSuccessMessage } from "@/utils/getSuccessMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail, Send, Shield, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import * as yup from "yup";
import { useSubscriberSubmitMutation } from "@/redux/api/publicApi/homepageApi";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function NewsletterSection() {
  const t = useTranslations("Frontend.homepage.newsletter");
  const { settings } = useBasicSettings();
  const recaptchaKey = settings?.google_recaptcha_site_key;
  const recaptchaStatus = settings?.google_recaptcha_status;

  const schema = useMemo(
    () =>
      yup.object({
        email: yup
          .string()
          .trim()
          .required(t("validation.emailRequired"))
          .email(t("validation.emailInvalid")),
      }),
    [t],
  );

  const [submitted, setSubmitted] = useState(false);
  const [recaptcha, setRecaptcha] = useState(null);
  const recaptchaRef = useRef(null);

  const [subscriberSubmit, { isLoading }] = useSubscriberSubmitMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data) => {
    console.log(recaptchaStatus, recaptcha);

    if (recaptchaStatus === false || recaptcha === null) {
      showToast.warning(t("recaptchaWarning"));
      return;
    }

    const formData = new FormData();
    formData.append("email", data.email);
    if (recaptcha) {
      formData.append("g-recaptcha-response", recaptcha);
    }

    try {
      const result = await subscriberSubmit(formData).unwrap();
      const successMessages = getSuccessMessage(result);

      showToast.success(successMessages.success[0]);

      setSubmitted(true);
      reset();
      setRecaptcha(null);
      recaptchaRef.current?.reset();
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      const errMessages = getErrorMessage(error);
      errMessages.errors.email.forEach((err) => showToast.error(err));

      setRecaptcha(null);
      recaptchaRef.current?.reset();
    }
  };

  // Memoize the bound submit handler so `handleSubmit` isn't invoked during
  // render — silences React 19's "ref read during render" warning since the
  // analyzer no longer sees a function being called inline in JSX.
  const submit = useMemo(
    () => handleSubmit(onSubmit),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleSubmit, recaptcha, recaptchaStatus],
  );

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28 bg-linear-to-b from-white via-emerald-50/30 to-slate-50 dark:from-[#091829] dark:via-walletium-dark-mid dark:to-[#0A0F1E]">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full pointer-events-none opacity-70 dark:opacity-40"
        style={{
          background:
            "radial-gradient(ellipse, rgba(14,190,152,0.18) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative"
        >
          {/* Subtle gradient border */}
          <div
            className="absolute -inset-px rounded-3xl pointer-events-none opacity-60"
            style={{
              background:
                "linear-gradient(135deg, rgba(14,190,152,0.35) 0%, transparent 45%, rgba(0,229,255,0.25) 100%)",
            }}
          />

          {/* Card */}
          <div className="relative px-6 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16 rounded-3xl bg-white/90 dark:bg-neutral-900/60 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-700/60 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.15)] dark:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Inner glow accents */}
            <div
              className="absolute top-0 -right-20 w-80 h-80 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(14,190,152,0.18) 0%, transparent 65%)",
                filter: "blur(60px)",
              }}
            />
            <div
              className="absolute bottom-0 -left-20 w-80 h-80 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 65%)",
                filter: "blur(60px)",
              }}
            />

            <div className="relative">
              {/* Icon badge */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-xl shadow-primary-500/30"
                style={{
                  background:
                    "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
                }}
              >
                <Mail size={28} color="white" strokeWidth={2.2} />
              </motion.div>

              {/* Eyebrow */}
              <p className="text-center text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 mb-3">
                {t("eyebrow")}
              </p>

              {/* Heading */}
              <h2 className="text-center font-serif font-black leading-tight mb-4 sm:mb-5 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl tracking-tight text-neutral-900 dark:text-white">
                {t("headingPrefix")}{" "}
                <span className="text-primary-600 dark:text-primary-400">
                  {t("headingHighlight")}
                </span>
              </h2>

              {/* Description */}
              <p className="text-center text-sm sm:text-base lg:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mb-8 sm:mb-10">
                {t("description")}
              </p>

              {/* Form or success state */}
              <div className="max-w-md mx-auto">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30"
                    >
                      <div
                        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
                        }}
                      >
                        <Check size={16} color="white" strokeWidth={3} />
                      </div>
                      <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                        {t("success")}
                      </span>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={submit}
                      noValidate
                    >
                      <div
                        className={`relative flex flex-col sm:flex-row gap-2 sm:gap-0 p-1.5 rounded-2xl bg-white dark:bg-neutral-800/80 border shadow-sm focus-within:shadow-lg focus-within:shadow-primary-500/10 transition-all duration-300 ${
                          errors.email
                            ? "border-red-400 dark:border-red-500/70"
                            : "border-neutral-200 dark:border-neutral-700 focus-within:border-primary-400 dark:focus-within:border-primary-500"
                        }`}
                      >
                        <div className="relative flex-1 flex items-center min-w-0">
                          <Mail
                            size={18}
                            className="absolute start-4 text-neutral-400 dark:text-neutral-500 pointer-events-none"
                          />
                          <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="email"
                                aria-label={t("emailAriaLabel")}
                                aria-invalid={!!errors.email}
                                placeholder={t("emailPlaceholder")}
                                className="w-full ps-11 pe-3 py-3 bg-transparent text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none"
                              />
                            )}
                          />
                        </div>
                        <motion.button
                          type="submit"
                          disabled={isLoading}
                          whileHover={{ scale: isLoading ? 1 : 1.02 }}
                          whileTap={{ scale: isLoading ? 1 : 0.98 }}
                          className="flex sm:inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-shadow duration-300 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                          style={{
                            background:
                              "linear-gradient(135deg, #0ebe98 0%, #00E5FF 100%)",
                          }}
                        >
                          {isLoading ? t("subscribing") : t("subscribe")}
                          <Send
                            size={16}
                            strokeWidth={2.5}
                            className="rtl:-scale-x-100"
                          />
                        </motion.button>
                      </div>

                      {errors.email && (
                        <p className="mt-2 ml-1 text-xs font-medium text-red-500 dark:text-red-400">
                          {errors.email.message}
                        </p>
                      )}

                      {recaptchaStatus && recaptchaKey && (
                        <div className="mt-5 flex justify-center">
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={recaptchaKey}
                            onChange={(value) => setRecaptcha(value)}
                            onExpired={() => setRecaptcha(null)}
                          />
                        </div>
                      )}
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* Trust microcopy */}
              <div className="mt-6 flex flex-col sm:flex-row gap-2.5 sm:gap-5 justify-center items-center text-xs text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Shield
                    size={14}
                    className="text-primary-500 dark:text-primary-400"
                  />
                  {t("trustNoSpam")}
                </span>
                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                <span className="flex items-center gap-1.5">
                  <Sparkles
                    size={14}
                    className="text-primary-500 dark:text-primary-400"
                  />
                  {t("trustUsers")}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
