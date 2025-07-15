import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { z } from "zod";

import { useLoginWithEmail } from "@/auth/hooks/useAuthLoginEmail";
import { Form } from "@/components/_form/Form";
import { PasswordField } from "@/components/_rhf/Password";
import { TextField } from "@/components/_rhf/Text";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card/Card";
import { LoadingButton } from "@/components/LoadingButton/LoadingButton";
import { AuthLayout } from "@/layout/Auth";
import { AuthWithGoogle } from "@/pages/Auth/AuthGoogle/AuthWithGoogle";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password is required" }),
});

type SignUpSchemaForm = z.infer<typeof signUpSchema>;

export const LoginWithEmail = () => {
  const { t } = useTranslation("sign-in");

  const { mutateAsync, isPending } = useLoginWithEmail();

  const form = useForm<SignUpSchemaForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (formData: SignUpSchemaForm) => {
    mutateAsync(formData);
  };

  return (
    <AuthLayout>
      <div className="z-10 mx-auto flex w-full flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-6">
          <Card className="h-12 w-12 bg-white shadow-lg">
            <img src="/logo.png" alt="logo" />
          </Card>
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-heading-5">{t("title")}</h1>
            <p className="w-[380px] text-center text-md text-gray">
              {t("description")}
            </p>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full max-w-[440px]"
          >
            <div className="flex w-full flex-col items-center gap-6 p-8">
              <div className="flex w-full flex-col gap-5">
                <TextField
                  name="email"
                  label={t("emailLabel")}
                  placeholder={t("emailPlaceholder")}
                />
                <div className="flex w-full flex-col gap-1">
                  <PasswordField
                    name="password"
                    label={t("passwordLabel")}
                    helperText={t("passwordRequirement")}
                    placeholder={t("passwordPlaceholder")}
                  />
                  <div className="flex justify-end">
                    <Button variant="primary-link" size="link" asChild>
                      <Link to="/auth/forgot-password">Forgot password?</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col items-center gap-3">
                <LoadingButton
                  type="submit"
                  isLoading={isPending}
                  variant="primary"
                  size="lg"
                  className="w-full text-md"
                >
                  {t("signInButtonTitle")}
                </LoadingButton>

                <AuthWithGoogle />
              </div>
            </div>
          </form>
        </Form>

        <div className="flex flex-row items-center gap-1">
          <p className="text-center text-sm text-gray">{t("footerTitle")} </p>
          <Button variant="primary-link" size="link" asChild>
            <Link to="/auth/register">{t("urlTitle")}</Link>
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};
