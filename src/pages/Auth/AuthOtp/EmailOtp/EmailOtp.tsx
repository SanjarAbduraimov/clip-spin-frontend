import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { useVerifyEmail } from "@/auth/hooks/useVerifyEmail";
import { Checkbox } from "@/components/_form/Calendar/CheckBox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_form/Form";
import { Input } from "@/components/_form/Input";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card/Card";
import { Link } from "@/components/Link";
import { LoadingButton } from "@/components/LoadingButton/LoadingButton";
import { AuthLayout } from "@/layout/Auth";

const emailOTPSchema = z.object({
  full_name: z.string(),
  password: z.string(),
  phone_number: z.string().optional(),
  code: z.string().min(6),
});

type EmailOTPFormSchema = z.infer<typeof emailOTPSchema>;

interface EmailOtpProps {
  codeHash: string;
  email: string;
}
export const EmailOtp = ({ codeHash, email }: EmailOtpProps) => {
  const { t } = useTranslation("email-verification");

  const [checked, setChecked] = useState(false);

  const { mutateAsync, isPending } = useVerifyEmail();

  const navigate = useNavigate();
  const form = useForm<EmailOTPFormSchema>({
    resolver: zodResolver(emailOTPSchema),
    defaultValues: {},
  });
  const handleSubmit = async (values: EmailOTPFormSchema) => {
    if (!checked) {
      return null;
    }
    try {
      await mutateAsync({
        ...values,
        email,
        code: Number(values.code),
        code_hash: codeHash,
      });
      navigate("/");
    } catch (error) {
      // console.log(error);
    }

    return values;
  };

  return (
    <AuthLayout>
      <div className="z-10 mx-auto flex w-[400px] flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-6">
          <Card className="h-12 w-12 bg-white shadow-lg">
            <img src="/logo.png" alt="logo" />
          </Card>
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-center text-heading-5">{t("title")}</h1>
            <div>
              <p className="text-center text-md text-gray">
                {t("description")}
              </p>
            </div>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex w-full flex-col items-center justify-center gap-6"
          >
            <div className="flex w-full flex-col gap-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fullNameLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("fullNamePlaceholder")}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("passwordLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("passwordPlaceholder")}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("phoneNumberLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("phoneNumberPlaceholder")}
                        type="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("verificationCodeLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("verificationCodePlaceholder")}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => setChecked(!checked)}
                />
                <FormLabel>
                  I agree to the{" "}
                  <Link to="/terms-of-service">terms of usage</Link>
                </FormLabel>
              </div>
            </div>

            <LoadingButton
              type="submit"
              isLoading={isPending}
              variant="primary"
              size="lg"
              className="w-full text-md"
            >
              {t("buttonTitle")}
            </LoadingButton>
          </form>
        </Form>
        <Button
          variant="link"
          size="link"
          iconLeft={<ArrowLeft size={20} />}
          onClick={() => navigate("/auth/sign-in")}
        >
          {t("footerTitle")}
        </Button>
      </div>
    </AuthLayout>
  );
};
